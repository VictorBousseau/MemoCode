# =================================================
# Module 23 : EDA Visualisation - EXERCICES
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
# --------------------------
# TODO: Créer un histogramme de la distribution des salaires
# plt.figure(figsize=(10, 6))
# plt.hist(df['salaire'], bins=20, edgecolor='black')
# plt.title('Distribution des salaires')
# plt.xlabel('Salaire')
# plt.ylabel('Fréquence')
# plt.show()


# Exercice 2 : Box plot
# -----------------------
# TODO: Créer un boxplot du salaire par département
# df.boxplot(column='salaire', by='departement')
# plt.title('Salaire par département')
# plt.show()


# Exercice 3 : Scatter plot
# ---------------------------
# TODO: Créer un scatter plot age vs salaire
# plt.scatter(df['age'], df['salaire'])
# plt.xlabel('Âge')
# plt.ylabel('Salaire')
# plt.show()


# Exercice 4 : Bar chart
# ------------------------
# TODO: Créer un graphique en barres du nombre d'employés par département
comptage = df['departement'].value_counts()
# comptage.plot(kind='bar')
# plt.title('Employés par département')
# plt.show()

print("Exercices de visualisation - décommentez les graphiques pour les afficher")
print("Comptage par département:\n", comptage)
