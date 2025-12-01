import { Code } from 'lucide-react';

export const examplesContent = {
    themes: [

        {
            id: 'simulation',
            title: 'Simulation',
            description: 'Modélisation et Méthodes Numériques',
            categories: [
                {
                    id: 'ode',
                    title: 'Équations Différentielles',
                    description: 'Résolution numérique d\'EDO.',
                    snippets: [
                        {
                            id: 'euler',
                            title: 'Méthode d\'Euler (Ordre 1)',
                            description: 'La méthode la plus simple et intuitive.',
                            level: 'beginner',
                            tags: ['math', 'ode', 'euler', 'python'],
                            code: `import numpy as np
import matplotlib.pyplot as plt

def euler_method(f, y0, t0, tf, h):
    """
    Résout y' = f(t, y) avec la méthode d'Euler.
    
    --- 🧠 INTUITION ---
    C'est l'approche la plus naïve : on regarde la pente au point actuel
    et on trace une ligne droite jusqu'au point suivant.
    
    Formule : y_next = y + h * pente
    
    --- ⚠️ LIMITES ---
    Comme on suppose que la pente est constante sur tout l'intervalle h,
    l'erreur s'accumule vite. C'est une méthode d'ordre 1 (erreur proportionnelle à h).
    """
    t_values = np.arange(t0, tf + h, h)
    y_values = [y0]

    for t in t_values[:-1]:
        y = y_values[-1]
        
        # On avance tout droit en suivant la pente actuelle
        y_next = y + h * f(t, y)
        
        y_values.append(y_next)

    return t_values, np.array(y_values)`
                        },
                        {
                            id: 'rk2',
                            title: 'Runge-Kutta 2 (RK2 / Point Milieu)',
                            description: 'Plus précis qu\'Euler, moins coûteux que RK4.',
                            level: 'intermediate',
                            tags: ['math', 'ode', 'rk2', 'python'],
                            code: `def runge_kutta_2(f, y0, t0, tf, h):
    """
    Résout y' = f(t, y) avec la méthode RK2 (Point Milieu).
    
    --- 🧠 INTUITION ---
    Euler se trompe car la pente change pendant le trajet.
    RK2 essaie d'anticiper ce changement.
    
    1. On fait un demi-pas avec Euler pour estimer la pente au milieu.
    2. On utilise cette pente du milieu pour faire le vrai pas entier.
    
    --- ⚗️ FORMULE ---
    k1 = h * f(t, y)          -> Pente au début
    k2 = h * f(t + h, y + k1) -> Pente estimée à la fin (ou milieu selon variante)
    
    y_next = y + 0.5 * (k1 + k2) -> Moyenne des deux pentes
    """
    t_values = np.arange(t0, tf + h, h)
    y_values = [y0]

    for t in t_values[:-1]:
        y = y_values[-1]
        
        # 1. Pente au début
        k1 = h * f(t, y)
        
        # 2. Pente à la fin (estimée avec k1)
        k2 = h * f(t + h, y + k1)
        
        # Moyenne des deux pentes (Méthode de Heun / Trapèze)
        y_next = y + 0.5 * (k1 + k2)
        
        y_values.append(y_next)

    return t_values, np.array(y_values)`
                        },
                        {
                            id: 'rk4',
                            title: 'Runge-Kutta 4 (RK4)',
                            description: 'Méthode standard pour résoudre les équations différentielles.',
                            level: 'advanced',
                            tags: ['math', 'ode', 'rk4', 'python'],
                            code: `import numpy as np
import matplotlib.pyplot as plt

def runge_kutta_4(f, y0, t0, tf, h):
    """
    Résout l'équation différentielle y' = f(t, y) avec la méthode RK4.
    
    --- 🧠 INTUITION (Comment ça marche ?) ---
    Contrairement à la méthode d'Euler qui suit bêtement la pente du début,
    RK4 est "intelligente" : elle tâte le terrain à 4 endroits pour décider où aller.
    
    --- 🔍 LES 4 PENTES (k1 à k4) ---
    k1 : Pente au DÉBUT de l'intervalle.
         -> C'est la prédiction basique (comme Euler).
         
    k2 : Pente au MILIEU (estimation 1).
         -> On avance de h/2 avec la pente k1, et on regarde la pente là-bas.
         
    k3 : Pente au MILIEU (estimation 2).
         -> On refait une estimation au milieu, mais en utilisant k2 (correction).
         
    k4 : Pente à la FIN.
         -> On utilise k3 pour estimer la pente tout à la fin du pas h.
         
    --- ⚗️ LA FORMULE MAGIQUE ---
    On fait une MOYENNE PONDÉRÉE de ces 4 pentes :
    y_next = y + (h / 6) * (k1 + 2*k2 + 2*k3 + k4)
    
    Notez que les pentes du milieu (k2 et k3) comptent DOUBLE car elles sont
    généralement plus représentatives de la dynamique sur l'intervalle.
    
    --- 📝 ARGUMENTS ---
    f  : La fonction dérivée (la physique du système). y' = f(t, y)
    y0 : État initial (ex: position de départ).
    t0 : Temps de début.
    tf : Temps de fin.
    h  : Pas de temps (plus il est petit, plus c'est précis).
    """
    t_values = np.arange(t0, tf + h, h)
    y_values = [y0]
    y = y0
    
    for t in t_values[:-1]:
        # 1. Pente au début
        k1 = h * f(t, y)
        
        # 2. Pente au milieu (avec k1)
        k2 = h * f(t + 0.5 * h, y + 0.5 * k1)
        
        # 3. Pente au milieu (avec k2)
        k3 = h * f(t + 0.5 * h, y + 0.5 * k2)
        
        # 4. Pente à la fin (avec k3)
        k4 = h * f(t + h, y + k3)
        
        # Moyenne pondérée
        y = y + (k1 + 2 * k2 + 2 * k3 + k4) / 6
        y_values.append(y)
        
    return t_values, np.array(y_values)

# --- Exemple : Croissance Exponentielle ---
# dy/dt = r * y
def modele_croissance(t, y):
    return 0.1 * y

# Simulation
t, y = runge_kutta_4(modele_croissance, y0=100, t0=0, tf=50, h=0.1)

# Plot
plt.plot(t, y, label='RK4')
plt.plot(t, 100 * np.exp(0.1 * t), '--', label='Exact')
plt.legend(); plt.show()`
                        }
                    ]
                }
            ]
        },
        {
            id: 'optimisation',
            title: 'Optimisation',
            description: 'Recherche Opérationnelle avec GurobiPy',
            categories: [
                {
                    id: 'gurobi',
                    title: 'GurobiPy',
                    description: 'Solveur d\'optimisation linéaire et mixte.',
                    snippets: [
                        {
                            id: 'knapsack',
                            title: 'Problème du Sac à Dos (Knapsack)',
                            description: 'Maximiser la valeur des objets dans un sac de capacité limitée.',
                            level: 'advanced',
                            tags: ['optimization', 'gurobi', 'knapsack', 'python'],
                            code: `import numpy as np
import gurobipy as gp
from gurobipy import GRB

def generate_knapsack(num_items):
    # Fix seed value
    rng = np.random.default_rng(seed=0)
    # Item values, weights
    values = rng.uniform(low=1, high=25, size=num_items)
    weights = rng.uniform(low=5, high=100, size=num_items)
    # Knapsack capacity
    capacity = 0.7 * weights.sum()

    return values, weights, capacity


def solve_knapsack_model(values, weights, capacity):
    num_items = len(values)
    # Turn values and weights numpy arrays to dict
    items = range(num_items)
    val = {i: float(values[i]) for i in items}
    wgt = {i: float(weights[i]) for i in items}

    with gp.Env() as env:
        with gp.Model(name="knapsack", env=env) as model:
            # Define decision variables using the Model.addVars() method
            x = model.addVars(items, vtype=GRB.BINARY, name="x")

            # Define objective function using the Model.setObjective() method
            # Build the LinExpr using the tupledict.prod() method
            model.setObjective(x.prod(val) , GRB.MAXIMIZE) # Maximise la somme des valeurs des objets choisis

            # Define capacity constraint using the Model.addConstr() method
            model.addConstr(x.prod(wgt) <= capacity, name="capacity") # La somme des poids <= capacité
            model.optimize()

data = generate_knapsack(10000)
solve_knapsack_model(*data)`
                        },
                        {
                            id: 'lot_sizing',
                            title: 'Lot Sizing (Planification de Production)',
                            description: 'Minimiser les coûts de production, stock et setup.',
                            level: 'advanced',
                            tags: ['optimization', 'gurobi', 'production', 'python'],
                            code: `import json
import gurobipy as gp
from gurobipy import GRB
from pathlib import Path

# Note: Les données sont disponibles sur GitHub M2_Optimisation_Algorithmes_et_Data

# ----- Load data from JSON -----
# with open("data/data/lot_sizing_data.json", "r") as f:
#     data = json.load(f)

# Exemple de données pour que le code soit exécutable
data = {
    "name": "LotSizing", "H": 5, "Qmin": 0, "Qmax": 100, "I0": 0,
    "demand": [10, 20, 15, 30, 10],
    "var_cost": [2, 2, 2, 3, 3],
    "setup_cost": [50, 50, 50, 50, 50],
    "hold_cost": [1, 1, 1, 1, 1]
}

name = data["name"]
H    = int(data["H"])
d    = [float(val) for val in data["demand"]]
c    = [float(val) for val in data["var_cost"]]
f    = [float(val) for val in data["setup_cost"]]
h    = [float(val) for val in data["hold_cost"]]
Qmin = float(data["Qmin"])
Qmax = float(data["Qmax"])
I0   = float(data["I0"])

# Basic validation
assert len(d) == H and len(c) == H and len(f) == H and len(h) == H
assert 0 <= Qmin <= Qmax

# ----- Build model -----
with gp.Env() as env, gp.Model(name, env=env) as model:
    x = model.addVars(H, lb=0.0, vtype=GRB.INTEGER, name="x") # Quantité produite
    y = model.addVars(H, vtype=GRB.BINARY, name="y")          # Setup (Produit ou pas ?)
    I = model.addVars(H, lb=0.0, vtype=GRB.INTEGER, name="I") # Stock

    # Objectif : Minimiser Coût Var + Coût Fixe + Coût Stock
    model.setObjective(
        gp.quicksum(x[t]*c[t] + f[t]*y[t] + h[t]*I[t] for t in range(H)),
        GRB.MINIMIZE
    )

    # Constraints
    # Équilibre des flux (Période 0)
    model.addConstr(I[0] == I0 + x[0] - d[0], name="balance_0")

    # Équilibre des flux (Périodes suivantes)
    model.addConstrs(
        (I[t] == I[t-1] + x[t] - d[t] for t in range(1, H)),
        name="Inventory_Balance"
    ) 

    # Capacité Max (Big M)
    model.addConstrs(
        (x[t] <= Qmax*y[t] for t in range(H)),
        name="Max_Production"
    )

    # Capacité Min
    model.addConstrs(
        (x[t] >= Qmin*y[t] for t in range(H)),
        name="Min_Production"
    )

    # Optimize
    model.optimize()

    if model.SolCount:
        print(f"Total cost = {model.ObjVal:.2f}")
        for t in range(H):
            print(f"t={t:2d}: y={int(y[t].X)} x={x[t].X:.1f} I={I[t].X:.1f}")`
                        }
                    ]
                }
            ]
        },
        {
            id: 'data_science',
            title: 'Data Science',
            description: 'Projets complets de Machine Learning',
            categories: [
                {
                    id: 'shoppers_intention',
                    title: 'Projet Complet (Shoppers Intention)',
                    description: 'Prédiction de l\'intention d\'achat (Classification)',
                    snippets: [
                        {
                            id: 'eda',
                            title: '1. Exploration des Données (EDA)',
                            description: 'Chargement, analyse de la target et corrélations. [Télécharger le dataset](/MemoCode/data/online_shoppers_intention.csv)',
                            level: 'intermediate',
                            tags: ['data-science', 'eda', 'pandas', 'seaborn'],
                            code: `import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# Chargement des données
# Assurez-vous d'avoir le fichier 'online_shoppers_intention.csv'
df = pd.read_csv('online_shoppers_intention.csv')

print("Dimensions du dataset :", df.shape)
print(df.head())

# Distribution de la target 'Revenue'
plt.figure(figsize=(6, 4))
sns.countplot(x='Revenue', data=df)
plt.title('Distribution de la Target (Revenue)')
plt.show()

# Matrice de corrélation
plt.figure(figsize=(12, 10))
sns.heatmap(df.corr(numeric_only=True), annot=False, cmap='coolwarm')
plt.title('Matrice de Corrélation')
plt.show()`
                        },
                        {
                            id: 'ds_preprocessing',
                            title: '2. Preprocessing & Feature Engineering',
                            description: 'Encodage, gestion des valeurs manquantes et SMOTE.',
                            level: 'intermediate',
                            tags: ['data-science', 'preprocessing', 'sklearn', 'python'],
                            code: `from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.impute import SimpleImputer
from imblearn.over_sampling import SMOTE

# 1. Gestion des valeurs manquantes (si nécessaire)
# Remplacement des NaN par la médiane pour les colonnes numériques
numeric_cols = df.select_dtypes(include=['float64', 'int64']).columns
imputer = SimpleImputer(strategy='median')
df[numeric_cols] = imputer.fit_transform(df[numeric_cols])

# 2. Encodage des variables catégorielles
le = LabelEncoder()
categorical_cols = df.select_dtypes(include=['object', 'bool']).columns

for col in categorical_cols:
    df[col] = le.fit_transform(df[col])

# 3. Séparation Features (X) / Target (y)
X = df.drop('Revenue', axis=1)
y = df['Revenue']

# 4. Scaling (Standardisation)
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# 5. Gestion du déséquilibre de classe (SMOTE)
# La classe 'Revenue=True' est souvent minoritaire
smote = SMOTE(random_state=42)
X_resampled, y_resampled = smote.fit_resample(X_scaled, y)

print(f"Taille originale : {X.shape}, Taille après SMOTE : {X_resampled.shape}")`
                        },
                        {
                            id: 'modeling',
                            title: '3. Modélisation & Évaluation',
                            description: 'Entraînement d\'un modèle et analyse des performances.',
                            level: 'intermediate',
                            tags: ['data-science', 'modeling', 'sklearn', 'python'],
                            code: `from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, confusion_matrix

# Split Train / Test
X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size = 0.2, random_state = 42)

# Entraînement(Random Forest)
model = RandomForestClassifier(n_estimators = 100, random_state = 42)
model.fit(X_train, y_train)

# Prédictions
y_pred = model.fit(X_train, y_train).predict(X_test)

# Évaluation
print("Rapport de Classification :")
print(classification_report(y_test, y_pred))

plt.figure(figsize = (6, 5))
sns.heatmap(confusion_matrix(y_test, y_pred), annot = True, fmt = 'd', cmap = 'Blues')
plt.title('Matrice de Confusion')
plt.ylabel('Vrai label')
plt.xlabel('Label prédit')
plt.show()`
                        }
                    ]
                },
                {
                    id: 'marketing',
                    title: 'Marketing & Client',
                    description: 'Segmentation et analyse comportementale.',
                    snippets: [
                        {
                            id: 'rfm_segmentation',
                            title: 'Segmentation RFM',
                            description: 'Segmenter les clients par Récence, Fréquence et Montant.',
                            level: 'intermediate',
                            tags: ['marketing', 'rfm', 'segmentation', 'python'],
                            markdown: `### 🎯 Objectif de la Segmentation RFM

La segmentation **RFM** (Recency, Frequency, Monetary) est une méthode éprouvée du marketing pour identifier et classer vos clients en fonction de leur comportement d'achat.

**Pourquoi utiliser RFM ?**
- 📊 **Identifier vos meilleurs clients** : Qui génère le plus de valeur ?
- 🎯 **Cibler vos actions marketing** : Personnaliser vos campagnes selon le segment
- 💰 **Optimiser le ROI** : Concentrer vos efforts là où ils rapportent le plus

**Les 3 Dimensions :**
1. **Récence (R)** : Depuis combien de temps le client n'a pas acheté ? (Plus c'est récent, mieux c'est)
2. **Fréquence (F)** : Combien de fois le client a acheté ? (Plus il achète, mieux c'est)
3. **Montant (M)** : Combien le client dépense au total ? (Plus il dépense, mieux c'est)

**La Logique de Scoring :**
Chaque dimension est notée de **1 à 5** (5 = meilleur). Un client noté **555** est un **Champion** 🏆 (récent, fréquent, gros montant), tandis qu'un client **111** est **à risque** ⚠️.`,
                            code: `import pandas as pd
import numpy as np
import datetime as dt

# --- 1. Génération de Données de Vente ---
np.random.seed(42)
n_transactions = 1000
dates = pd.date_range(end=dt.datetime.today(), periods=365).to_list()

df = pd.DataFrame({
    'transaction_id': range(n_transactions),
    'customer_id': np.random.randint(1, 200, size=n_transactions), # 200 clients uniques
    'date': np.random.choice(dates, size=n_transactions),
    'amount': np.random.exponential(scale=50, size=n_transactions).round(2) + 10 # Montant > 10€
})

# --- 2. Calcul RFM (Agrégation par Client) ---
# On définit "maintenant" comme le jour après la dernière transaction
now = df['date'].max() + dt.timedelta(days=1)

rfm = df.groupby('customer_id').agg({
    'date': lambda x: (now - x.max()).days,  # R (Recency) : Nombre de jours depuis le dernier achat
    'transaction_id': 'count',                # F (Frequency) : Nombre d'achats total
    'amount': 'sum'                           # M (Monetary) : Somme totale dépensée
}).rename(columns={'date': 'R', 'transaction_id': 'F', 'amount': 'M'})

# --- 3. Scoring par Quintiles (Division en 5 groupes) ---
# Chaque client reçoit un score de 1 à 5 pour chaque dimension

# R_Score : ATTENTION, pour la Récence, plus le nombre de jours est PETIT, mieux c'est
# Donc on inverse : un client qui a acheté récemment (R petit) aura un score de 5
rfm['R_Score'] = pd.qcut(rfm['R'], 5, labels=[5, 4, 3, 2, 1])

# F_Score : Plus le client achète souvent, meilleur est le score (1 à 5)
# rank(method='first') évite les erreurs si plusieurs clients ont la même fréquence
rfm['F_Score'] = pd.qcut(rfm['F'].rank(method='first'), 5, labels=[1, 2, 3, 4, 5])

# M_Score : Plus le client dépense, meilleur est le score (1 à 5)
rfm['M_Score'] = pd.qcut(rfm['M'], 5, labels=[1, 2, 3, 4, 5])

# --- 4. Création du Segment RFM (Concaténation des Scores) ---
# Exemple : Un client avec R=5, F=5, M=4 aura le segment "554"
rfm['RFM_Segment'] = rfm['R_Score'].astype(str) + rfm['F_Score'].astype(str) + rfm['M_Score'].astype(str)

# Score_Total : Somme des 3 scores (de 3 à 15)
# Utilisé pour classer facilement les clients
rfm['Score_Total'] = rfm[['R_Score', 'F_Score', 'M_Score']].sum(axis=1)

# --- 5. Segmentation Business (Labels Parlants) ---
def segment_customer(score):
    """
    Transforme le score numérique en label business actionnable
    
    - Champions (13-15) : Vos meilleurs clients. Récompensez-les (programme VIP).
    - Fidèles (10-12) : Clients réguliers. Encouragez-les à devenir Champions.
    - À Réveiller (7-9) : Inactifs mais potentiel. Relancez avec une offre ciblée.
    - À Risque (3-6) : En perte de vitesse. Action urgente avant qu'ils partent.
    """
    if score >= 13: return '🏆 Champions'
    elif score >= 10: return '💎 Fidèles'
    elif score >= 7:  return '💤 À Réveiller'
    else:             return '⚠️ À Risque'

rfm['Segment_Label'] = rfm['Score_Total'].apply(segment_customer)

# --- 6. Affichage des Résultats ---
print(rfm[['R', 'F', 'M', 'R_Score', 'F_Score', 'M_Score', 'Score_Total', 'Segment_Label']].head(10))
print("\\n--- Distribution des Segments ---")
print(rfm['Segment_Label'].value_counts())`
                        }
                    ]
                },
                {
                    id: 'production_ml',
                    title: 'Mise en Production (MLOps)',
                    description: 'Pipelines robustes et Transformers personnalisés.',
                    snippets: [
                        {
                            id: 'sklearn_custom_pipeline',
                            title: 'Pipeline Sklearn Custom',
                            description: 'Créer un Transformer personnalisé pour nettoyer et enrichir les données.',
                            level: 'advanced',
                            tags: ['mlops', 'sklearn', 'pipeline', 'python'],
                            markdown: `### 🔧 Objectif : Pipeline de Preprocessing Robuste

Un **Pipeline Scikit-Learn** permet d'enchaîner plusieurs étapes de transformation de données de manière **automatique**, **reproductible** et **déployable** en production.

**Pourquoi créer des Transformers personnalisés ?**
- 🧹 **Nettoyage métier** : Standardiser les données textuelles (casse, espaces, valeurs manquantes)
- 🚀 **Feature Engineering** : Créer des variables calculées (ex: prix au m²)
- 🔄 **Réutilisabilité** : Appliquer les mêmes transformations sur Train ET Test (évite le Data Leakage)
- 📦 **Production** : Sauvegarder le pipeline complet avec \`joblib\` ou \`pickle\`

**Architecture d'un Transformer Custom :**
1. Hériter de \`BaseEstimator\` et \`TransformerMixin\`
2. Implémenter \`fit()\` : Apprendre des statistiques (si nécessaire)
3. Implémenter \`transform()\` : Appliquer les transformations

**Avantages du Pipeline :**
- ✅ Pas de risque d'oublier une étape sur les nouvelles données
- ✅ Code propre et maintenable
- ✅ Compatible avec GridSearchCV pour le tuning des hyperparamètres`,
                            code: `import pandas as pd
from sklearn.base import BaseEstimator, TransformerMixin
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler

# --- Données Exemple : Catalogue Immobilier ---
# Problèmes typiques : Texte sale, valeurs manquantes, unités incohérentes
df = pd.DataFrame({
    'description': [' Produit A ', 'produit B', 'PRODUIT A', None, 'Produit C'],
    'prix': [100, 200, 100, 50, None],  # Prix en milliers d'euros
    'surface': [50, 60, 50, 100, 20]     # Surface en m²
})

# --- Transformer Personnalisé 1 : Nettoyage de Texte ---
class TextCleaner(BaseEstimator, TransformerMixin):
    """
    Nettoie une colonne texte en :
    1. Remplaçant les NaN par 'inconnu'
    2. Supprimant les espaces superflus
    3. Normalisant la casse (minuscule ou majuscule)
    
    Paramètres :
    - column (str) : Nom de la colonne à nettoyer
    - case (str) : 'lower' (défaut) ou 'upper' pour la normalisation
    """
    def __init__(self, column, case='lower'):
        self.column = column
        self.case = case
    
    def fit(self, X, y=None):
        # Ce transformer ne "apprend" rien des données, il applique juste des règles
        return self
    
    def transform(self, X):
        X_copy = X.copy()  # IMPORTANT : Toujours copier pour ne pas modifier l'original
        
        # 1. Gestion des valeurs manquantes (NaN -> 'inconnu')
        X_copy[self.column] = X_copy[self.column].fillna('inconnu')
        
        # 2. Suppression des espaces en début/fin de chaîne
        X_copy[self.column] = X_copy[self.column].str.strip()
        
        # 3. Normalisation de la casse (ex: "Produit A" -> "produit a")
        if self.case == 'lower':
            X_copy[self.column] = X_copy[self.column].str.lower()
        elif self.case == 'upper':
            X_copy[self.column] = X_copy[self.column].str.upper()
        
        return X_copy

# --- Transformer Personnalisé 2 : Feature Engineering ---
class PricePerSqm(BaseEstimator, TransformerMixin):
    """
    Crée une nouvelle colonne 'prix_m2' (Prix au mètre carré).
    Métier : Indicateur clé en immobilier pour comparer les biens.
    
    Gère automatiquement :
    - Division par zéro (si surface = 0, on considère 1 pour éviter l'erreur)
    """
    def fit(self, X, y=None):
        return self  # Pas d'apprentissage nécessaire
    
    def transform(self, X):
        X_copy = X.copy()
        
        # Calcul du prix au m² avec gestion de la division par zéro
        # replace(0, 1) : Si surface = 0, on la remplace par 1 (évite division par 0)
        X_copy['prix_m2'] = X_copy['prix'] / X_copy['surface'].replace(0, 1)
        
        return X_copy

# --- Construction du Pipeline Complet ---
# L'ORDRE des étapes est CRUCIAL : chaque étape reçoit la sortie de la précédente

data_pipeline = Pipeline([
    # Étape 1 : Nettoyage du texte (standardisation des descriptions)
    ('clean_text', TextCleaner(column='description', case='lower')),
    
    # Étape 2 : Feature Engineering métier (création du prix au m²)
    # Cette variable peut être très prédictive pour un modèle ML
    ('feature_eng', PricePerSqm()),
    
    # Étape 3 (optionnel, commenté ici) : Imputation des valeurs manquantes numériques
    # ('impute_num', SimpleImputer(strategy='median')),
    
    # Étape 4 (optionnel) : Scaling pour les algorithmes sensibles (SVM, KNN...)
    # ('scaler', StandardScaler())
])

# --- Exécution du Pipeline ---
# fit_transform() applique toutes les étapes séquentiellement
df_transformed = data_pipeline.fit_transform(df)

# --- Résultat ---
print("=== Données Transformées ===")
print(df_transformed)

# --- Utilisation en Production ---
# 1. Sauvegarder le pipeline avec joblib
# import joblib
# joblib.dump(data_pipeline, 'preprocessing_pipeline.pkl')

# 2. Charger et appliquer sur de nouvelles données
# pipeline_loaded = joblib.load('preprocessing_pipeline.pkl')
# new_data_transformed = pipeline_loaded.transform(new_data)`
                        }
                    ]
                }
            ]
        },
        {
            id: 'python_date',
            title: 'Dates (Python)',
            description: 'Manipulation de dates et séries temporelles.',
            categories: [

                {
                    id: 'practical_cases',
                    title: 'Cas Pratiques',
                    description: 'Exemples concrets et avancés.',
                    snippets: [
                        {
                            id: 'french_calendar',
                            title: 'Calendrier Français (Fériés & Ponts)',
                            description: 'Détecter les jours fériés, les ponts et les retours de vacances.',
                            level: 'intermediate',
                            tags: ['python', 'dates', 'holidays', 'pandas'],
                            code: `import pandas as pd
import holidays
from datetime import timedelta

# 1. Création d'un jeu de données exemple
dates = pd.date_range(start='2025-01-01', end='2025-12-31', freq='D')
df = pd.DataFrame({'date': dates})

# 2. Ajout du nom du jour (en français)
days_fr = {
    0: 'Lundi', 1: 'Mardi', 2: 'Mercredi', 3: 'Jeudi', 
    4: 'Vendredi', 5: 'Samedi', 6: 'Dimanche'
}
df['jour_nom'] = df['date'].dt.dayofweek.map(days_fr)

# 3. Jours Fériés (France)
# Nécessite : pip install holidays
fr_holidays = holidays.France(years=[2025])
df['jour_ferie'] = df['date'].apply(lambda x: x in fr_holidays)

# 4. Veille et Lendemain de jour férié
# Shift(-1) -> La valeur de demain vient ici (donc si demain est férié, ici c'est veille)
df['veille_jour_ferie'] = df['jour_ferie'].shift(-1).fillna(False)
df['lendemain_jour_ferie'] = df['jour_ferie'].shift(1).fillna(False)

# 5. Jour Ouvré (Lundi-Vendredi ET Pas férié)
df['jour_ouvre'] = (df['date'].dt.dayofweek < 5) & (~df['jour_ferie'])

# 6. Jour Ouvré Lendemain de Férié (Retour au travail)
# Logique : C'est un jour ouvré, et le jour précédent (ou la séquence de jours précédents) était férié/weekend.
def is_return_from_holiday(idx, df):
    if not df.loc[idx, 'jour_ouvre']:
        return False
    
    # On regarde en arrière
    prev_idx = idx - 1
    while prev_idx >= 0:
        if df.loc[prev_idx, 'jour_ouvre']:
            return False # On a trouvé un jour ouvré avant, donc ce n'est pas un retour de vacances
        if df.loc[prev_idx, 'jour_ferie']:
            return True # On a trouvé un férié sans croiser de jour ouvré -> C'est un retour !
        prev_idx -= 1
        
    return False

df['jour_ouvre_lendemain_ferie'] = [is_return_from_holiday(i, df) for i in range(len(df))]

# Aperçu
print(df[['date', 'jour_nom', 'jour_ferie', 'jour_ouvre', 'jour_ouvre_lendemain_ferie']].head(15))`
                        },
                        {
                            id: 'school_holidays',
                            title: 'Vacances Scolaires - Référentiel Complet',
                            description: 'Générer un calendrier par département sur une période donnée.',
                            level: 'advanced',
                            tags: ['python', 'dates', 'api', 'pandas'],
                            markdown: `### 📚 Objectif de cette Fonction

Cette fonction génère un **référentiel complet** des vacances scolaires pour tous les départements français sur une période donnée.

**Entrées** :
- Date de début (ex: '2024-01-01')
- Date de fin (ex: '2026-01-01')

**Sortie** :
Un DataFrame avec une ligne pour **chaque jour** et **chaque département**, indiquant :
- Si c'est une période de vacances scolaires
- Le nom des vacances (ex: "Vacances de Noël")

**Cas d'usage** :
- Analyser l'impact des vacances sur les ventes
- Planifier des campagnes marketing
- Prévoir la charge de travail (éducation, transport, tourisme)`,
                            code: `import pandas as pd
import requests
import io

# --- 1. CONFIGURATION ---
BASE_URL = "https://data.education.gouv.fr/api/explore/v2.1/catalog/datasets/fr-en-calendrier-scolaire/exports/csv"

DEPARTMENTS_ZONES = {
    '01': 'Zone A', '03': 'Zone A', '07': 'Zone A', '15': 'Zone A', '16': 'Zone A', 
    '17': 'Zone A', '19': 'Zone A', '21': 'Zone A', '23': 'Zone A', '24': 'Zone A', 
    '25': 'Zone A', '26': 'Zone A', '33': 'Zone A', '38': 'Zone A', '39': 'Zone A', 
    '40': 'Zone A', '42': 'Zone A', '47': 'Zone A', '58': 'Zone A', '63': 'Zone A', 
    '64': 'Zone A', '69': 'Zone A', '70': 'Zone A', '71': 'Zone A', '73': 'Zone A', 
    '74': 'Zone A', '79': 'Zone A', '86': 'Zone A', '87': 'Zone A', '90': 'Zone A',
    '02': 'Zone B', '04': 'Zone B', '05': 'Zone B', '06': 'Zone B', '08': 'Zone B', 
    '10': 'Zone B', '13': 'Zone B', '14': 'Zone B', '18': 'Zone B', '22': 'Zone B', 
    '27': 'Zone B', '28': 'Zone B', '29': 'Zone B', '35': 'Zone B', '36': 'Zone B', 
    '37': 'Zone B', '41': 'Zone B', '44': 'Zone B', '45': 'Zone B', '49': 'Zone B', 
    '50': 'Zone B', '51': 'Zone B', '52': 'Zone B', '53': 'Zone B', '54': 'Zone B', 
    '55': 'Zone B', '56': 'Zone B', '57': 'Zone B', '59': 'Zone B', '60': 'Zone B', 
    '61': 'Zone B', '62': 'Zone B', '67': 'Zone B', '68': 'Zone B', '72': 'Zone B', 
    '76': 'Zone B', '80': 'Zone B', '83': 'Zone B', '84': 'Zone B', '85': 'Zone B', 
    '88': 'Zone B',
    '09': 'Zone C', '11': 'Zone C', '12': 'Zone C', '30': 'Zone C', '31': 'Zone C', 
    '32': 'Zone C', '34': 'Zone C', '46': 'Zone C', '48': 'Zone C', '65': 'Zone C', 
    '66': 'Zone C', '75': 'Zone C', '77': 'Zone C', '78': 'Zone C', '81': 'Zone C', 
    '82': 'Zone C', '91': 'Zone C', '92': 'Zone C', '93': 'Zone C', '94': 'Zone C', 
    '95': 'Zone C',
    '2A': 'Zone B', '2B': 'Zone B'
}

# --- 2. FONCTION APPEL API ---
def get_vacances_from_api(date_debut, date_fin):
    print(f"Appel API pour la période : {date_debut} à {date_fin}...")
    
    # Filtre sur les dates
    where_query = f'end_date >= "{date_debut}" AND start_date <= "{date_fin}"'
    
    params = {
        'lang': 'fr',
        'timezone': 'Europe/Paris',
        'delimiter': ';',
        'where': where_query,
        'limit': -1
    }
    
    try:
        response = requests.get(BASE_URL, params=params)
        response.raise_for_status()
        
        df = pd.read_csv(io.StringIO(response.text), sep=';')
        
        # Renommage des colonnes pour standardisation
        mapping_cols = {
            'zones': 'Zones',
            'description': 'Description',
            'start_date': 'Date de début',
            'end_date': 'Date de fin'
        }
        df = df.rename(columns=mapping_cols)
        
        if 'Zones' not in df.columns:
            print("ATTENTION: Colonnes reçues :", df.columns.tolist())
            return pd.DataFrame()
            
        return df

    except Exception as e:
        print(f"Erreur API/Connexion : {e}")
        return pd.DataFrame()

# --- 3. GÉNÉRATION DU RÉFÉRENTIEL ---
def generer_referentiel_par_dates(date_debut_str, date_fin_str):
    
    # A. Récupération
    df_api = get_vacances_from_api(date_debut_str, date_fin_str)
    
    if df_api.empty:
        print("Aucune donnée. Arrêt.")
        return pd.DataFrame()

    # B. Nettoyage
    df_api = df_api[df_api['Zones'].isin(['Zone A', 'Zone B', 'Zone C'])].copy()
    
    df_api['start'] = pd.to_datetime(df_api['Date de début'], utc=True).dt.date
    df_api['end'] = pd.to_datetime(df_api['Date de fin'], utc=True).dt.date
    
    # C. "Aplatir" le calendrier
    print("Traitement des périodes...")
    holiday_rows = []
    for _, row in df_api.iterrows():
        if row['end'] > row['start']:
            dates = pd.date_range(start=row['start'], end=row['end'] - pd.Timedelta(days=1))
            for d in dates:
                holiday_rows.append({
                    'date': d.date(),
                    'zone': row['Zones'],
                    'nom_vacances': row['Description'],
                    'vacances_scolaires': True
                })
    
    df_vacances_flat = pd.DataFrame(holiday_rows)
    
    if df_vacances_flat.empty:
        print("Attention: Les données API sont vides après filtrage.")
        return pd.DataFrame()

    # D. Structure complète (Cartésien Jours * Départements)
    print("Création du calendrier complet...")
    all_dates = pd.date_range(start=date_debut_str, end=date_fin_str)
    all_depts = list(DEPARTMENTS_ZONES.keys())
    
    index = pd.MultiIndex.from_product([all_dates, all_depts], names=['date', 'departement'])
    df_final = pd.DataFrame(index=index).reset_index()
    
    df_final['date'] = df_final['date'].dt.date
    df_final['zone'] = df_final['departement'].map(DEPARTMENTS_ZONES)
    
    # E. Fusion
    df_final = pd.merge(
        df_final,
        df_vacances_flat,
        on=['date', 'zone'],
        how='left'
    )
    
    # F. Remplissage
    df_final['vacances_scolaires'] = df_final['vacances_scolaires'].fillna(False)
    df_final['nom_vacances'] = df_final['nom_vacances'].fillna('Période scolaire')
    
    df_final = df_final.drop(columns=['zone'])
    
    return df_final.drop_duplicates().reset_index(drop=True)

# --- 4. EXÉCUTION ---
DEBUT = '2024-01-01'
FIN = '2026-01-01'

df_referentiel = generer_referentiel_par_dates(DEBUT, FIN)

print("-" * 30)
if not df_referentiel.empty:
    print(f"Référentiel généré : {len(df_referentiel)} lignes")
    print(df_referentiel.head())
    
    # Test Rapide
    print("Test Paris Noël 2024:")
    print(df_referentiel[
        (df_referentiel['departement'] == '75') & 
        (df_referentiel['date'] == pd.to_datetime('2024-12-25').date())
    ])`
                        }
                    ]
                }
            ]
        },
        {
            id: 'tips',
            title: 'Tips & Productivité',
            description: 'Raccourcis et astuces pour gagner du temps.',
            categories: [
                {
                    id: 'windows_shortcuts',
                    title: 'Raccourcis Windows Essentiels',
                    description: 'Les raccourcis universels pour tous les outils.',
                    snippets: [
                        {
                            id: 'clipboard_shortcuts',
                            title: 'Copier/Coller & Presse-papiers',
                            description: 'Manipulation du texte et du contenu.',
                            level: 'beginner',
                            tags: ['tips', 'windows', 'shortcuts', 'clipboard'],
                            markdown: `### 📋 Presse-papiers

#### Basiques
- **Copier** : \`Ctrl + C\`
- **Couper** : \`Ctrl + X\`
- **Coller** : \`Ctrl + V\`
- **Annuler** : \`Ctrl + Z\`
- **Rétablir** : \`Ctrl + Y\` (ou \`Ctrl + Shift + Z\`)

#### Avancés
- **Presse-papiers multiple** : \`Windows + V\` (Windows 10+)
  - Historique des 25 derniers éléments copiés
  - Très utile pour copier plusieurs cellules Excel
- **Coller sans formatage** : \`Ctrl + Shift + V\` (dans certaines apps)

💡 **Astuce** : Dans Excel, après un \`Ctrl + C\`, utilisez \`Ctrl + Alt + V\` pour ouvrir le menu "Collage spécial"`
                        },
                        {
                            id: 'navigation_shortcuts',
                            title: 'Navigation & Recherche',
                            description: 'Se déplacer efficacement.',
                            level: 'beginner',
                            tags: ['tips', 'windows', 'shortcuts', 'navigation'],
                            markdown: `### 🔍 Navigation Rapide

#### Recherche
- **Rechercher dans un fichier** : \`Ctrl + F\`
- **Rechercher et remplacer** : \`Ctrl + H\`
- **Rechercher le suivant** : \`F3\` (ou \`Ctrl + G\`)

#### Navigation dans le texte
- **Début de ligne** : \`Home\`
- **Fin de ligne** : \`End\`
- **Début du document** : \`Ctrl + Home\`
- **Fin du document** : \`Ctrl + End\`
- **Mot suivant/précédent** : \`Ctrl + ←/→\`

#### Sélection
- **Sélectionner tout** : \`Ctrl + A\`
- **Sélectionner jusqu'au début** : \`Shift + Home\`
- **Sélectionner jusqu'à la fin** : \`Shift + End\`
- **Sélectionner mot par mot** : \`Ctrl + Shift + ←/→\`

💡 **Astuce Excel** : \`Ctrl + Shift + Fin\` sélectionne jusqu'à la dernière cellule utilisée`
                        },
                        {
                            id: 'file_management',
                            title: 'Gestion de Fichiers',
                            description: 'Fichiers et dossiers.',
                            level: 'beginner',
                            tags: ['tips', 'windows', 'shortcuts', 'files'],
                            markdown: `### 📁 Fichiers & Dossiers

#### Actions de base
- **Nouveau fichier/dossier** : \`Ctrl + N\` (contexte dépendant)
- **Ouvrir** : \`Ctrl + O\`
- **Enregistrer** : \`Ctrl + S\`
- **Enregistrer sous** : \`Ctrl + Shift + S\`
- **Fermer** : \`Ctrl + W\` (ou \`Ctrl + F4\`)
- **Imprimer** : \`Ctrl + P\`

#### Explorateur Windows
- **Ouvrir l'Explorateur** : \`Windows + E\`
- **Créer un nouveau dossier** : \`Ctrl + Shift + N\`
- **Renommer** : \`F2\`
- **Supprimer** : \`Suppr\` (Corbeille) ou \`Shift + Suppr\` (Définitif ⚠️)
- **Actualiser** : \`F5\`
- **Barre d'adresse** : \`Ctrl + L\` ou \`Alt + D\`

#### Multi-sélection
- **Sélection continue** : Clic puis \`Shift + Clic\`
- **Sélection multiple** : \`Ctrl + Clic\` (un par un)`
                        },
                        {
                            id: 'window_management',
                            title: 'Gestion des Fenêtres',
                            description: 'Organiser l\'espace de travail.',
                            level: 'beginner',
                            tags: ['tips', 'windows', 'shortcuts', 'multitasking'],
                            markdown: `### 🪟 Multi-fenêtrage

#### Basculer entre applications
- **Basculer** : \`Alt + Tab\` (maintenir Alt et presser Tab)
- **Vue des tâches** : \`Windows + Tab\`
- **Fermer une fenêtre** : \`Alt + F4\`
- **Minimiser toutes les fenêtres** : \`Windows + D\`

#### Ancrage des fenêtres (Snap)
- **Ancrer à gauche** : \`Windows + ←\`
- **Ancrer à droite** : \`Windows + →\`
- **Maximiser** : \`Windows + ↑\`
- **Minimiser** : \`Windows + ↓\`

#### Bureaux virtuels (Windows 10+)
- **Nouveau bureau** : \`Windows + Ctrl + D\`
- **Fermer le bureau actuel** : \`Windows + Ctrl + F4\`
- **Basculer entre bureaux** : \`Windows + Ctrl + ←/→\`

💡 **Astuce** : Ancrer 2 fenêtres côte à côte pour comparer des données facilement`
                        }
                    ]
                },
                {
                    id: 'excel_productivity',
                    title: 'Excel - Raccourcis Avancés',
                    description: 'Manipulation ultra-rapide de données.',
                    snippets: [
                        {
                            id: 'excel_navigation',
                            title: 'Navigation Ultra-Rapide',
                            description: 'Se déplacer dans de grandes tables.',
                            level: 'intermediate',
                            tags: ['tips', 'excel', 'shortcuts', 'navigation'],
                            markdown: `### ⚡ Navigation Express dans Excel

#### Sauts intelligents
- **Aller à la fin des données** : \`Ctrl + ↓\` (colonne), \`Ctrl + →\` (ligne)
- **Revenir au début** : \`Ctrl + Home\`
- **Aller à la dernière cellule** : \`Ctrl + End\`

#### Sélection rapide
- **Sélectionner jusqu'à la fin** : \`Ctrl + Shift + ↓/→\`
- **Sélectionner toute la colonne** : \`Ctrl + Espace\`
- **Sélectionner toute la ligne** : \`Shift + Espace\`
- **Sélectionner tout le tableau** : \`Ctrl + A\` (ou \`Ctrl + Shift + *\`)

#### Onglets
- **Onglet suivant** : \`Ctrl + Page Down\`
- **Onglet précédent** : \`Ctrl + Page Up\`

💡 **Pro Tip** : \`Ctrl + Shift + L\` active/désactive les filtres automatiques`
                        },
                        {
                            id: 'excel_editing',
                            title: 'Édition & Formules',
                            description: 'Éditer efficacement.',
                            level: 'intermediate',
                            tags: ['tips', 'excel', 'shortcuts', 'editing'],
                            markdown: `### ✏️ Édition Rapide

#### Mode édition
- **Éditer la cellule** : \`F2\`
- **Éditer dans la barre de formule** : Cliquez dans la barre
- **Annuler l'édition** : \`Echap\`
- **Valider et descendre** : \`Entrée\`
- **Valider et rester** : \`Ctrl + Entrée\`

#### Copier/Remplir
- **Recopier vers le bas** : \`Ctrl + D\` (Fill Down)
- **Recopier vers la droite** : \`Ctrl + R\` (Fill Right)
- **Incrémenter** : Glisser avec la poignée de recopie (coin bas-droit)

#### Insertion/Suppression
- **Insérer des cellules** : \`Ctrl + Shift + +\`
- **Supprimer des cellules** : \`Ctrl + -\`
- **Insérer une ligne** : Sélectionner ligne puis \`Ctrl + Shift + +\`

#### Formules
- **Somme automatique** : \`Alt + =\`
- **Références absolues** : \`F4\` (bascule entre A1, $A$1, $A1, A$1)
- **Afficher les formules** : \`Ctrl + \\\`\`

💡 **Astuce** : Double-clic sur la poignée de recopie remplit jusqu'à la fin des données adjacentes`
                        },
                        {
                            id: 'excel_formatting',
                            title: 'Formatage Rapide',
                            description: 'Mettre en forme sans la souris.',
                            level: 'intermediate',
                            tags: ['tips', 'excel', 'shortcuts', 'formatting'],
                            markdown: `### 🎨 Formatage Express

#### Mise en forme du texte
- **Gras** : \`Ctrl + B\` (Bold)
- **Italique** : \`Ctrl + I\`
- **Souligné** : \`Ctrl + U\`
- **Barré** : \`Ctrl + 5\`

#### Formats de nombres
- **Format nombre** : \`Ctrl + Shift + 1\` (1 234,56)
- **Format pourcentage** : \`Ctrl + Shift + 5\` (12%)
- **Format date** : \`Ctrl + Shift + 3\` (jj-mmm-aa)
- **Format monétaire** : \`Ctrl + Shift + 4\` (€)

#### Bordures
- **Bordure extérieure** : \`Ctrl + Shift + 7\`
- **Supprimer les bordures** : \`Ctrl + Shift + _\`

#### Autres
- **Ajuster la largeur de colonne** : Sélectionner puis \`Alt + H, O, I\` (auto-fit)
- **Masquer une colonne** : \`Ctrl + 0\`
- **Masquer une ligne** : \`Ctrl + 9\`

💡 **Pro Tip** : \`Ctrl + 1\` ouvre la boîte de dialogue de formatage complète`
                        }
                    ]
                },
                {
                    id: 'vscode_shortcuts',
                    title: 'VS Code - Pour les Développeurs',
                    description: 'Raccourcis pour coder plus vite.',
                    snippets: [
                        {
                            id: 'vscode_essentials',
                            title: 'Raccourcis Essentiels VS Code',
                            description: 'Les indispensables pour développer.',
                            level: 'intermediate',
                            tags: ['tips', 'vscode', 'shortcuts', 'coding'],
                            markdown: `### 💻 VS Code - Les Must-Have

#### Édition
- **Commenter/Décommenter** : \`Ctrl + /\`
- **Dupliquer une ligne** : \`Ctrl + D\` (sélection) ou \`Shift + Alt + ↓\`
- **Déplacer une ligne** : \`Alt + ↑/↓\`
- **Supprimer une ligne** : \`Ctrl + Shift + K\`
- **Indenter** : \`Ctrl + ]\` / \`Ctrl + [\`

#### Multi-curseurs
- **Ajouter un curseur** : \`Alt + Clic\`
- **Multi-curseurs sur même mot** : \`Ctrl + D\` (répétez)
- **Multi-curseurs sur toutes occurrences** : \`Ctrl + Shift + L\`
- **Colonne de curseurs** : \`Ctrl + Alt + ↑/↓\`

#### Navigation
- **Palette de commandes** : \`Ctrl + Shift + P\` (ou \`F1\`)
- **Chercher un fichier** : \`Ctrl + P\`
- **Aller à la ligne** : \`Ctrl + G\`
- **Aller à la définition** : \`F12\`
- **Retour arrière** : \`Alt + ←\`

#### Terminal
- **Ouvrir le terminal** : \`Ctrl + \\\`\`
- **Nouveau terminal** : \`Ctrl + Shift + \\\`\`

💡 **Pro Tip** : \`Ctrl + K, Ctrl + S\` ouvre la liste complète des raccourcis`
                        }
                    ]
                }
            ]
        }
    ]
};
