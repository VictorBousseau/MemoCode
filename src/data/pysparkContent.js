import { Flame, Database, Server, Zap, Layers, Box } from 'lucide-react';

export const pysparkContent = {
    themes: [
        {
            id: 'pyspark_basics',
            title: 'PySpark Basics',
            description: 'Traitement Big Data distribué.',
            categories: [
                {
                    id: 'setup',
                    title: '1. Initialisation & Lecture',
                    description: 'Démarrer Spark et charger des données.',
                    snippets: [
                        {
                            id: 'spark_session',
                            title: 'Créer une SparkSession',
                            description: 'Le point d\'entrée de toute application Spark.',
                            level: 'beginner',
                            tags: ['pyspark', 'session', 'setup'],
                            code: `from pyspark.sql import SparkSession

spark = SparkSession.builder \\
    .appName("MonApp") \\
    .getOrCreate()

# Vérifier la version
print(spark.version)`
                        },
                        {
                            id: 'pyspark_read_csv',
                            title: 'Lire un CSV',
                            description: 'Charger un fichier avec inférence de schéma.',
                            level: 'beginner',
                            tags: ['pyspark', 'read', 'csv'],
                            code: `df = spark.read.csv(
    "data.csv",
    header=True,
    inferSchema=True
)

df.show(5)
df.printSchema()`
                        },
                        {
                            id: 'read_parquet',
                            title: 'Lire du Parquet',
                            description: 'Le format optimisé pour Spark.',
                            level: 'beginner',
                            tags: ['pyspark', 'read', 'parquet'],
                            code: `df = spark.read.parquet("data.parquet")

# Parquet conserve le schéma, pas besoin d'inferSchema !`
                        }
                    ]
                },
                {
                    id: 'dataframe_ops',
                    title: '2. Manipulations de base',
                    description: 'Select, Filter, WithColumn.',
                    snippets: [
                        {
                            id: 'pyspark_select_filter',
                            title: 'Sélectionner et Filtrer',
                            description: 'Les bases du DataFrame API.',
                            level: 'beginner',
                            tags: ['pyspark', 'select', 'filter'],
                            code: `from pyspark.sql.functions import col

# Sélectionner
df.select("name", "age").show()

# Filtrer (WHERE)
df.filter(col("age") > 18).show()
# OU
df.where("age > 18").show()`
                        },
                        {
                            id: 'add_column',
                            title: 'Ajouter une colonne (withColumn)',
                            description: 'Créer ou modifier une colonne.',
                            level: 'beginner',
                            tags: ['pyspark', 'with-column', 'transform'],
                            code: `from pyspark.sql.functions import lit

# Ajouter une constante
df = df.withColumn("status", lit("Active"))

# Calculer une nouvelle colonne
df = df.withColumn("age_double", col("age") * 2)`
                        },
                        {
                            id: 'drop_column',
                            title: 'Supprimer une colonne',
                            description: 'Nettoyer le DataFrame.',
                            level: 'beginner',
                            tags: ['pyspark', 'drop', 'transform'],
                            code: `df = df.drop("age_double")`
                        }
                    ]
                }
            ]
        },
        {
            id: 'pyspark_intermediate',
            title: 'Intermédiaire',
            description: 'Agrégations, Joins et Performance.',
            categories: [
                {
                    id: 'sql_functions',
                    title: '1. Fonctions SQL',
                    description: 'Group By et Window Functions.',
                    snippets: [
                        {
                            id: 'agg_groupby',
                            title: 'Agrégations',
                            description: 'Compter, Sommer, Moyenne.',
                            level: 'intermediate',
                            tags: ['pyspark', 'group-by', 'aggregation'],
                            code: `from pyspark.sql.functions import count, avg, max

df.groupBy("department") \\
    .agg(
        count("*").alias("count"),
        avg("salary").alias("avg_salary"),
        max("salary").alias("max_salary")
    ) \\
    .show()`
                        },
                        {
                            id: 'pyspark_joins',
                            title: 'Jointures',
                            description: 'Combiner deux DataFrames.',
                            level: 'intermediate',
                            tags: ['pyspark', 'join', 'merge'],
                            code: `# Inner Join
df_joined = df1.join(df2, on="id", how="inner")

# Left Join
df_joined = df1.join(df2, df1.id == df2.user_id, how="left")`
                        },
                        {
                            id: 'window_funcs',
                            title: 'Window Functions',
                            description: 'Calculs sur des fenêtres glissantes.',
                            level: 'intermediate',
                            tags: ['pyspark', 'window', 'advanced'],
                            code: `from pyspark.sql.window import Window
from pyspark.sql.functions import row_number, rank

windowSpec = Window.partitionBy("department").orderBy(col("salary").desc())

df.withColumn("rank", rank().over(windowSpec)).show()`
                        }
                    ]
                },
                {
                    id: 'performance',
                    title: '2. Performance',
                    description: 'Optimiser l\'exécution.',
                    snippets: [
                        {
                            id: 'cache_persist',
                            title: 'Cache & Persist',
                            description: 'Garder les données en mémoire.',
                            level: 'intermediate',
                            tags: ['pyspark', 'cache', 'performance'],
                            code: `# Mettre en cache (Mémoire seulement)
df.cache()

# Forcer le calcul (Action)
df.count()

# Vider le cache
df.unpersist()`
                        },
                        {
                            id: 'partitions',
                            title: 'Repartition & Coalesce',
                            description: 'Gérer le parallélisme.',
                            level: 'intermediate',
                            tags: ['pyspark', 'partition', 'performance'],
                            code: `# Augmenter le nombre de partitions (Shuffle)
df = df.repartition(100)

# Réduire le nombre de partitions (Pas de Shuffle, plus rapide)
df = df.coalesce(1)`
                        }
                    ]
                }
            ]
        },
        {
            id: 'pyspark_advanced',
            title: 'Avancé',
            description: 'UDFs et Streaming.',
            categories: [
                {
                    id: 'udf',
                    title: '1. UDF (User Defined Functions)',
                    description: 'Étendre Spark avec du Python.',
                    snippets: [
                        {
                            id: 'simple_udf',
                            title: 'UDF Standard (Lent)',
                            description: 'À éviter sur gros volumes (sérialisation Python).',
                            level: 'advanced',
                            tags: ['pyspark', 'udf', 'python'],
                            code: `from pyspark.sql.functions import udf
from pyspark.sql.types import StringType

def upper_case(s):
    return s.upper()

upper_udf = udf(upper_case, StringType())

df.withColumn("upper_name", upper_udf(col("name"))).show()`
                        },
                        {
                            id: 'pandas_udf',
                            title: 'Pandas UDF (Rapide)',
                            description: 'Utilise Arrow pour la performance.',
                            level: 'advanced',
                            tags: ['pyspark', 'pandas-udf', 'performance'],
                            code: `from pyspark.sql.functions import pandas_udf
import pandas as pd

@pandas_udf("double")
def plus_one(s: pd.Series) -> pd.Series:
    return s + 1

df.withColumn("age_plus_one", plus_one(col("age"))).show()`
                        }
                    ]
                },
                {
                    id: 'streaming',
                    title: '2. Structured Streaming',
                    description: 'Traitement en temps réel.',
                    snippets: [
                        {
                            id: 'read_stream',
                            title: 'Lire un Stream',
                            description: 'Surveiller un dossier.',
                            level: 'advanced',
                            tags: ['pyspark', 'streaming', 'read'],
                            code: `df_stream = spark.readStream \\
    .schema(schema) \\
    .csv("input_folder")`
                        },
                        {
                            id: 'write_stream',
                            title: 'Écrire un Stream',
                            description: 'Démarrer le traitement.',
                            level: 'advanced',
                            tags: ['pyspark', 'streaming', 'write'],
                            code: `query = df_stream.writeStream \\
    .outputMode("append") \\
    .format("console") \\
    .start()

query.awaitTermination()`
                        }
                    ]
                }
            ]
        }
    ]
};
