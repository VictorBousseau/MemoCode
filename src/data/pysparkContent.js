export const pysparkContent = {
    themes: [
        {
            id: 'pyspark_basics',
            title: 'PySpark',
            description: 'Big Data Processing',
            categories: [
                {
                    id: 'setup',
                    title: 'Setup & Session',
                    description: 'Initialiser Spark',
                    snippets: [
                        {
                            id: 'spark_session',
                            title: 'Créer une SparkSession',
                            description: 'Point d\'entrée unique pour programmer avec Spark.',
                            code: `from pyspark.sql import SparkSession

spark = SparkSession.builder \\
    .appName("MonProjetData") \\
    .getOrCreate()

# Vérifier la version
print(spark.version)`
                        }
                    ]
                },
                {
                    id: 'dataframe_ops',
                    title: 'Opérations DataFrame',
                    description: 'Manipulations de base',
                    snippets: [
                        {
                            id: 'read_csv',
                            title: 'Lire un CSV',
                            description: 'Charger des données dans un DataFrame.',
                            code: `# Lire un CSV avec en-têtes et inférence de schéma
df = spark.read.csv("data.csv", header=True, inferSchema=True)

df.show(5)
df.printSchema()`
                        },
                        {
                            id: 'select_filter',
                            title: 'Select & Filter',
                            description: 'Sélectionner des colonnes et filtrer des lignes.',
                            code: `# Sélectionner des colonnes
df.select("nom", "age").show()

# Filtrer (équivalent du WHERE en SQL)
df.filter(df.age > 21).show()`
                        },
                        {
                            id: 'groupby_agg',
                            title: 'GroupBy & Aggregation',
                            description: 'Agréger des données.',
                            code: `from pyspark.sql.functions import avg, count

# Grouper par 'ville' et calculer la moyenne d'âge
df.groupBy("ville").agg(
    avg("age").alias("age_moyen"),
    count("*").alias("nb_personnes")
).show()`
                        }
                    ]
                }
            ]
        }
    ]
};
