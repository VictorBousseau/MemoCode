export const pysparkContent = {
    themes: [
        {
            id: 'pyspark_basics',
            title: 'PySpark',
            description: 'Manipulation de Données à Grande Échelle',
            categories: [
                {
                    id: 'setup',
                    title: '1. Setup & Session',
                    description: 'Initialisation de l\'environnement Spark.',
                    snippets: [
                        {
                            id: 'spark_session',
                            title: 'Créer une SparkSession',
                            description: 'Point d\'entrée unique pour programmer avec Spark.',
                            code: `from pyspark.sql import SparkSession

# Création de la session (Pattern Builder)
spark = SparkSession.builder \\
    .appName("MonProjetData") \\
    .master("local[*]") \\  # Utilise tous les cœurs du CPU local
    .config("spark.sql.shuffle.partitions", "4") \\ # Optimisation pour petit volume
    .getOrCreate()

# Vérifier la version
print(spark.version)`
                        }
                    ]
                },
                {
                    id: 'io',
                    title: '2. Chargement & Export',
                    description: 'Lecture et écriture (CSV, Parquet, JSON).',
                    snippets: [
                        {
                            id: 'read_csv',
                            title: 'Lire un CSV',
                            description: 'Chargement avec options classiques.',
                            code: `# Lire un CSV
df = spark.read.csv(
    "data.csv", 
    header=True,       # La première ligne contient les noms de colonnes
    inferSchema=True,  # Deviner les types (Attention : coûteux sur gros volumes)
    sep=";"            # Définir le séparateur
)

df.show(5)`
                        },
                        {
                            id: 'read_parquet',
                            title: 'Lire/Écrire Parquet',
                            description: 'Format colonnaire optimisé (recommandé).',
                            code: `# Lire du Parquet
df = spark.read.parquet("data/users.parquet")

# Écrire en Parquet
# mode("overwrite") : écrase si le dossier existe déjà
# partitionBy("date") : organise les fichiers par dossiers de date
df.write \\
    .mode("overwrite") \\
    .partitionBy("date") \\
    .parquet("output/users_processed")`
                        }
                    ]
                },
                {
                    id: 'exploration',
                    title: '3. Exploration & Schema',
                    description: 'Comprendre la structure des données.',
                    snippets: [
                        {
                            id: 'inspect',
                            title: 'Inspecter le DataFrame',
                            description: 'Aperçu des données et métadonnées.',
                            code: `# Afficher les 20 premières lignes (tronquées)
df.show()

# Afficher sans tronquer les colonnes
df.show(5, truncate=False)

# Afficher le schéma (arborescence)
df.printSchema()

# Lister les colonnes
print(df.columns)

# Compter les lignes
print(f"Nombre de lignes : {df.count()}")`
                        },
                        {
                            id: 'summary',
                            title: 'Statistiques Rapides',
                            description: 'Équivalent du describe() de Pandas.',
                            code: `# Statistiques descriptives (count, mean, stddev, min, max)
df.describe().show()

# Pour des colonnes spécifiques
df.select("age", "salaire").describe().show()`
                        }
                    ]
                },
                {
                    id: 'columns',
                    title: '4. Manipulation de Colonnes',
                    description: 'Select, WithColumn, Rename, Cast.',
                    snippets: [
                        {
                            id: 'select_alias',
                            title: 'Sélection & Alias',
                            description: 'Choisir et renommer à la volée.',
                            code: `from pyspark.sql.functions import col

# Sélection simple
df.select("nom", "age").show()

# Avec Alias
df.select(
    col("nom").alias("last_name"),
    col("age")
).show()`
                        },
                        {
                            id: 'with_column',
                            title: 'Ajouter/Modifier (withColumn)',
                            description: 'Créer une nouvelle colonne ou en modifier une existante.',
                            code: `from pyspark.sql.functions import col, lit

# Ajouter une colonne constante
df = df.withColumn("pays", lit("France"))

# Créer une colonne calculée
df = df.withColumn("age_futur", col("age") + 1)

# Modifier une colonne existante (écrasement)
df = df.withColumn("nom", col("nom"))`
                        },
                        {
                            id: 'cast_rename',
                            title: 'Cast & Rename',
                            description: 'Changer les types et les noms.',
                            code: `# Renommer une colonne
df = df.withColumnRenamed("ancien_nom", "nouveau_nom")

# Changer le type (Cast)
df = df.withColumn("age", col("age").cast("integer"))
df = df.withColumn("date_str", col("date").cast("string"))`
                        },
                        {
                            id: 'when_otherwise',
                            title: 'Conditionnel (Case When)',
                            description: 'Logique if-else sur une colonne.',
                            code: `from pyspark.sql.functions import when, col

# Créer une catégorie selon l'âge
df = df.withColumn("categorie_age", 
    when(col("age") < 18, "Mineur")
    .when((col("age") >= 18) & (col("age") < 65), "Adulte")
    .otherwise("Senior")
)`
                        }
                    ]
                },
                {
                    id: 'filtering',
                    title: '5. Filtrage & Nettoyage',
                    description: 'Filter, Drop, Nulls.',
                    snippets: [
                        {
                            id: 'filter',
                            title: 'Filtrer (Where)',
                            description: 'Filtrer les lignes selon des conditions.',
                            code: `from pyspark.sql.functions import col

# Filtrage simple
df_adultes = df.filter(col("age") >= 18)

# Conditions multiples (& = ET, | = OU, ~ = NON)
df_cible = df.filter(
    (col("age") > 25) & 
    (col("ville") == "Paris")
)

# Filtrer sur une liste de valeurs (isin)
villes_top = ["Paris", "Lyon", "Marseille"]
df_top = df.filter(col("ville").isin(villes_top))`
                        },
                        {
                            id: 'cleaning',
                            title: 'Gestion des Nulls & Doublons',
                            description: 'Nettoyer les données.',
                            code: `# Supprimer les doublons
df = df.dropDuplicates()

# Supprimer les doublons sur des colonnes spécifiques
df = df.dropDuplicates(["id_client"])

# Supprimer les lignes avec des valeurs nulles (toutes les colonnes)
df = df.dropna()

# Remplacer les nulls (fillna)
df = df.fillna({
    "ville": "Inconnue",
    "age": 0
})`
                        }
                    ]
                },
                {
                    id: 'aggregation',
                    title: '6. Agrégations (GroupBy)',
                    description: 'Calculs statistiques par groupes.',
                    snippets: [
                        {
                            id: 'groupby_agg',
                            title: 'GroupBy & Agg',
                            description: 'La méthode standard pour agréger.',
                            code: `from pyspark.sql.functions import count, avg, max, sum, col

# Grouper par département
df_stats = df.groupBy("departement").agg(
    count("*").alias("nb_employes"),
    avg("salaire").alias("salaire_moyen"),
    max("salaire").alias("salaire_max"),
    sum("bonus").alias("total_bonus")
)

df_stats.show()`
                        }
                    ]
                },
                {
                    id: 'joins',
                    title: '7. Jointures (Joins)',
                    description: 'Fusionner des DataFrames.',
                    snippets: [
                        {
                            id: 'joins_basics',
                            title: 'Les Jointures',
                            description: 'Inner, Left, Right, Full et Multi-clés.',
                            code: `# Syntaxe : df1.join(df2, on, how)

# 1. Jointure simple (même nom de colonne)
df_result = df_users.join(df_orders, "user_id", "inner")

# 2. Jointure avec noms différents
df_result = df_users.join(
    df_orders, 
    df_users.id == df_orders.customer_id, 
    "left"
)

# 3. Jointure complexe (Plusieurs clés + Condition)
# On joint sur 'id' ET 'date', en filtrant ceux qui ont un montant > 100
df_complex = df_a.join(
    df_b,
    (df_a.id == df_b.id) & 
    (df_a.date == df_b.date) & 
    (df_b.montant > 100),
    "inner"
)

# Types courants : "inner", "left", "right", "outer", "cross"`
                        }
                    ]
                },
                {
                    id: 'sql_interaction',
                    title: '8. SQL & Views',
                    description: 'Utiliser le SQL standard sur les DataFrames.',
                    snippets: [
                        {
                            id: 'spark_sql',
                            title: 'Utiliser SQL',
                            description: 'Interroger les DataFrames avec SQL.',
                            code: `# 1. Créer une vue temporaire (référence le DataFrame)
df.createOrReplaceTempView("users_view")

# 2. Exécuter une requête SQL
df_sql = spark.sql("""
    SELECT 
        ville, 
        count(*) as nb 
    FROM users_view 
    WHERE age > 18 
    GROUP BY ville
""")

df_sql.show()`
                        }
                    ]
                }
            ]
        },
        {
            id: 'pyspark_advanced',
            title: 'PySpark Avancé',
            description: 'Fonctions de Fenêtrage et Optimisation',
            categories: [
                {
                    id: 'window_functions',
                    title: '1. Window Functions',
                    description: 'Calculs sur des fenêtres glissantes (Ranking, Lead/Lag).',
                    snippets: [
                        {
                            id: 'window_spec',
                            title: 'Définir une Fenêtre',
                            description: 'La base : PartitionBy et OrderBy.',
                            code: `from pyspark.sql.window import Window
from pyspark.sql.functions import col

# 1. Partitionner par département
window_dept = Window.partitionBy("departement")

# 2. Partitionner par département et trier par salaire (décroissant)
window_dept_salary = Window \\
    .partitionBy("departement") \\
    .orderBy(col("salaire").desc())

# 3. Fenêtre glissante (Rows between)
# Ex: 1 ligne avant, la ligne courante, 1 ligne après
window_sliding = Window \\
    .partitionBy("departement") \\
    .orderBy("date") \\
    .rowsBetween(-1, 1)`
                        },
                        {
                            id: 'ranking',
                            title: 'Classement (Rank, RowNumber)',
                            description: 'Attribuer un rang à chaque ligne.',
                            code: `from pyspark.sql.functions import rank, dense_rank, row_number

# row_number() : 1, 2, 3, 4 (Unique, même si égalité)
# rank()       : 1, 2, 2, 4 (Saut de rang si égalité)
# dense_rank() : 1, 2, 2, 3 (Pas de saut de rang)

df = df.withColumn(
    "rang_salaire", 
    rank().over(window_dept_salary)
)

# Garder uniquement le mieux payé de chaque département
df_best = df.filter(col("rang_salaire") == 1)`
                        },
                        {
                            id: 'analytic',
                            title: 'Analytique (Lead, Lag)',
                            description: 'Accéder aux lignes précédentes ou suivantes.',
                            code: `from pyspark.sql.functions import lag, lead

# lag(col, n) : Valeur de la ligne n précédente
# lead(col, n) : Valeur de la ligne n suivante

# Calculer l'évolution du salaire par rapport au précédent
df = df.withColumn(
    "salaire_precedent", 
    lag("salaire", 1).over(window_dept_salary)
)

df = df.withColumn(
    "diff_salaire", 
    col("salaire") - col("salaire_precedent")
)`
                        },
                        {
                            id: 'running_total',
                            title: 'Cumul (Running Total)',
                            description: 'Somme cumulée ou moyenne mobile.',
                            code: `from pyspark.sql.functions import sum, avg

# Somme cumulée des ventes par date
window_cumsum = Window.orderBy("date").rowsBetween(Window.unboundedPreceding, Window.currentRow)

df = df.withColumn(
    "ventes_cumulees", 
    sum("ventes").over(window_cumsum)
)

# Moyenne mobile sur 3 jours (hier, aujourd'hui, demain)
window_moving = Window.orderBy("date").rowsBetween(-1, 1)

df = df.withColumn(
    "moyenne_mobile", 
    avg("ventes").over(window_moving)
)`
                        }
                    ]
                },
                {
                    id: 'udfs',
                    title: '2. UDFs (User Defined Functions)',
                    description: 'Fonctions personnalisées (Standard & Pandas).',
                    snippets: [
                        {
                            id: 'standard_udf',
                            title: 'UDF Standard (Python)',
                            description: 'Fonction Python classique (Lent, à éviter si possible).',
                            code: `from pyspark.sql.functions import udf
from pyspark.sql.types import StringType

# 1. Définir la fonction Python
def reverse_string(s):
    return s[::-1] if s else None

# 2. Enregistrer comme UDF Spark
# Il faut préciser le type de retour !
reverse_udf = udf(reverse_string, StringType())

# 3. Utiliser dans le DataFrame
df = df.withColumn("nom_inverse", reverse_udf(col("nom")))`
                        },
                        {
                            id: 'pandas_udf',
                            title: 'Pandas UDF (Vectorisé)',
                            description: 'Beaucoup plus rapide pour la Data Science (Apache Arrow).',
                            code: `from pyspark.sql.functions import pandas_udf
import pandas as pd

# @pandas_udf(returnType)
# La fonction reçoit une pd.Series et renvoie une pd.Series
@pandas_udf("double")
def scale_score(scores: pd.Series) -> pd.Series:
    return (scores - scores.mean()) / scores.std()

# Utilisation
df = df.withColumn("score_scaled", scale_score(col("score")))`
                        }
                    ]
                },
                {
                    id: 'optimization',
                    title: '3. Optimisation & Performance',
                    description: 'Cache, Broadcast et Partitioning.',
                    snippets: [
                        {
                            id: 'cache_persist',
                            title: 'Cache & Persist',
                            description: 'Garder les données en mémoire pour réutilisation.',
                            code: `from pyspark import StorageLevel

# Cache (Mémoire seulement)
# Utile si le DataFrame est petit et réutilisé plusieurs fois (ex: ML training)
df.cache()

# Persist (Choix du stockage)
# MEMORY_AND_DISK : Si ça ne rentre pas en RAM, ça va sur le disque
df.persist(StorageLevel.MEMORY_AND_DISK)

# Action pour déclencher le cache
df.count()

# Libérer la mémoire
df.unpersist()`
                        },
                        {
                            id: 'broadcast',
                            title: 'Broadcast Join',
                            description: 'Optimiser les jointures avec une petite table.',
                            code: `from pyspark.sql.functions import broadcast

# Force l'envoi de la petite table (df_small) sur tous les nœuds
# Évite le "Shuffle" coûteux des grosses données
# Idéal pour joindre une table de faits (Big) avec une dimension (Small)
df_result = df_big.join(broadcast(df_small), "id")`
                        }
                    ]
                },
                {
                    id: 'ml_utils',
                    title: '4. Préparation ML',
                    description: 'Sampling, Split et Vector Assembler.',
                    snippets: [
                        {
                            id: 'random_split',
                            title: 'Train / Test Split',
                            description: 'Séparer les données pour le Machine Learning.',
                            code: `# Diviser en 80% Train et 20% Test
# seed=42 assure la reproductibilité
train_df, test_df = df.randomSplit([0.8, 0.2], seed=42)

print(f"Train: {train_df.count()}, Test: {test_df.count()}")`
                        },
                        {
                            id: 'sampling',
                            title: 'Échantillonnage (Sampling)',
                            description: 'Travailler sur un sous-ensemble.',
                            code: `# Prendre 10% des données au hasard
# withReplacement=False (pas de remise)
sample_df = df.sample(withReplacement=False, fraction=0.1, seed=42)

# Stratified Sampling (Échantillonnage stratifié)
# Ex: Garder les proportions de la colonne 'target'
fractions = {0: 0.1, 1: 0.1} # 10% de chaque classe
stratified_df = df.stat.sampleBy("target", fractions, seed=42)`
                        },
                        {
                            id: 'vector_assembler',
                            title: 'Vector Assembler',
                            description: 'Préparer les features pour Spark ML.',
                            code: `from pyspark.ml.feature import VectorAssembler

# Spark ML attend une seule colonne "features" (vecteur)
assembler = VectorAssembler(
    inputCols=["age", "salaire", "nb_clics"],
    outputCol("features")
)

df_ml = assembler.transform(df)
df_ml.select("features", "label").show(5)`
                        }
                    ]
                },
                {
                    id: 'complex_types',
                    title: '5. Types Complexes',
                    description: 'Arrays, Maps et JSON.',
                    snippets: [
                        {
                            id: 'explode',
                            title: 'Explode (Array to Rows)',
                            description: 'Transformer une liste en plusieurs lignes.',
                            code: `from pyspark.sql.functions import explode, split

# Ex: colonne 'tags' = "sport,news,tech"
df = df.withColumn("tags_list", split(col("tags"), ","))

# Crée une ligne par tag
df_exploded = df.select(
    "id", 
    explode("tags_list").alias("tag")
)`
                        },
                        {
                            id: 'structs',
                            title: 'Structs & JSON',
                            description: 'Manipuler des données imbriquées.',
                            code: `from pyspark.sql.functions import col, get_json_object, from_json, schema_of_json

# Accéder à un champ dans une Struct
df.select(col("info_client.adresse.ville"))

# Parser du JSON (String -> Struct)
# Nécessite un schéma
json_schema = "nom STRING, age INT"
df = df.withColumn("data_struct", from_json(col("json_string"), json_schema))

# Extraire un champ spécifique d'un JSON (sans schéma complet)
df = df.withColumn("ville", get_json_object(col("json_string"), "$.adresse.ville"))`
                        }
                    ]
                }
            ]
        }
    ]
};
