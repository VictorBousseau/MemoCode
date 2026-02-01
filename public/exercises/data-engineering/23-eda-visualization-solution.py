# =================================================
# Module 23 : EDA Visualisation - SOLUTION
# =================================================

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

np.random.seed(42)
df = pd.DataFrame({
    'age': np.random.randint(18, 65, 100),
    'salaire': np.random.normal(45000, 15000, 100),
    'experience': np.random.randint(0, 30, 100),
    'departement': np.random.choice(['IT', 'RH', 'Finance'], 100)
})

# Exercice 1 : Histogramme
plt.figure(figsize=(10, 6))
plt.hist(df['salaire'], bins=20, edgecolor='black', color='steelblue')
plt.title('Distribution des salaires')
plt.xlabel('Salaire')
plt.ylabel('Fréquence')
plt.savefig('histogramme.png')
plt.close()


# Exercice 2 : Box plot
fig, ax = plt.subplots(figsize=(10, 6))
df.boxplot(column='salaire', by='departement', ax=ax)
plt.title('Salaire par département')
plt.suptitle('')
plt.savefig('boxplot.png')
plt.close()


# Exercice 3 : Scatter plot
plt.figure(figsize=(10, 6))
plt.scatter(df['age'], df['salaire'], alpha=0.5)
plt.xlabel('Âge')
plt.ylabel('Salaire')
plt.title('Relation âge/salaire')
plt.savefig('scatter.png')
plt.close()


# Exercice 4 : Bar chart
comptage = df['departement'].value_counts()
plt.figure(figsize=(10, 6))
comptage.plot(kind='bar', color='steelblue')
plt.title('Employés par département')
plt.xlabel('Département')
plt.ylabel('Nombre')
plt.savefig('barchart.png')
plt.close()

print("Graphiques sauvegardés: histogramme.png, boxplot.png, scatter.png, barchart.png")
