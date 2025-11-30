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
                            id: 'preprocessing',
                            title: '2. Preprocessing & Feature Engineering',
                            description: 'Encodage, gestion des valeurs manquantes et SMOTE.',
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
                    code: `import pandas as pd
import numpy as np
import datetime as dt

# --- 1. Génération de Données de Vente -- -
        np.random.seed(42)
n_transactions = 1000
dates = pd.date_range(end = dt.datetime.today(), periods = 365).to_list()

df = pd.DataFrame({
            'transaction_id': range(n_transactions),
            'customer_id': np.random.randint(1, 200, size = n_transactions), # 200 clients
    'date': np.random.choice(dates, size = n_transactions),
            'amount': np.random.exponential(scale = 50, size = n_transactions).round(2) + 10 # Montant > 10
        })

# -- - 2. Calcul RFM-- -
# Récence: Jours depuis le dernier achat
# Fréquence: Nombre d'achats
# Montant: Somme totale dépensée
now = df['date'].max() + dt.timedelta(days = 1)

rfm = df.groupby('customer_id').agg({
            'date': lambda x: (now - x.max()).days, # Recency
    'transaction_id': 'count',              # Frequency
    'amount': 'sum'                         # Monetary
        }).rename(columns = { 'date': 'R', 'transaction_id': 'F', 'amount': 'M' })

# -- - 3. Scoring(Quintiles)-- -
# On note de 1 à 5(5 est le meilleur)
rfm['R_Score'] = pd.qcut(rfm['R'], 5, labels = [5, 4, 3, 2, 1]) # Plus c'est récent (petit), mieux c'est
rfm['F_Score'] = pd.qcut(rfm['F'].rank(method = 'first'), 5, labels = [1, 2, 3, 4, 5])
rfm['M_Score'] = pd.qcut(rfm['M'], 5, labels = [1, 2, 3, 4, 5])

# Score RFM global(Concaténation)
rfm['RFM_Segment'] = rfm['R_Score'].astype(str) + rfm['F_Score'].astype(str) + rfm['M_Score'].astype(str)
rfm['Score_Total'] = rfm[['R_Score', 'F_Score', 'M_Score']].sum(axis = 1)

# -- - 4. Segmentation-- -
        def segment_customer(score):
if score >= 13: return '🏆 Champions'
    elif score >= 10: return '💎 Fidèles'
    elif score >= 7: return '💤 À Réveiller'
    else: return '⚠️ À Risque'

rfm['Segment_Label'] = rfm['Score_Total'].apply(segment_customer)

print(rfm[['R', 'F', 'M', 'Segment_Label']].head(10))
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
                    code: `import pandas as pd
from sklearn.base import BaseEstimator, TransformerMixin
from sklearn.pipeline import Pipeline
    from sklearn.impute import SimpleImputer
    from sklearn.preprocessing import StandardScaler

# --- Données Exemple-- -
    df = pd.DataFrame({
        'description': [' Produit A ', 'produit B', 'PRODUIT A', None, 'Produit C'],
        'prix': [100, 200, 100, 50, None],
        'surface': [50, 60, 50, 100, 20]
    })

# -- - Transformer Personnalisé: Nettoyage Texte-- -
    class TextCleaner(BaseEstimator, TransformerMixin):
    def __init__(self, column, case='lower'):
self.column = column
self.case = case
    
    def fit(self, X, y = None):
return self # Rien à apprendre
    
    def transform(self, X):
X_copy = X.copy()
        # 1. Gestion NaN
X_copy[self.column] = X_copy[self.column].fillna('inconnu')
        # 2. Strip whitespace
X_copy[self.column] = X_copy[self.column].str.strip()
        # 3. Case normalization
if self.case == 'lower':
    X_copy[self.column] = X_copy[self.column].str.lower()
return X_copy

# -- - Transformer Personnalisé: Feature Engineering-- -
    class PricePerSqm(BaseEstimator, TransformerMixin):
    def fit(self, X, y = None):
return self
        
    def transform(self, X):
X_copy = X.copy()
        # On évite la division par zéro
X_copy['prix_m2'] = X_copy['prix'] / X_copy['surface'].replace(0, 1)
return X_copy

# -- - Construction du Pipeline-- -
# L'ordre est crucial !
data_pipeline = Pipeline([
    # Étape 1 : Nettoyage du texte
        ('clean_text', TextCleaner(column = 'description')),
    
    # Étape 2 : Imputation des valeurs manquantes(numériques)
    # Note: SimpleImputer renvoie un array numpy, on le garde pour la fin ou on utilise set_output
    # Ici, on simplifie en supposant que le pipeline gère le DF
    
    # Étape 3 : Création de feature métier
        ('feature_eng', PricePerSqm())
])

# Exécution
df_transformed = data_pipeline.fit_transform(df)
print(df_transformed)`
                }
            ]
        },
        {
            id: 'python_date',
            title: 'Dates (Python)',
            description: 'Manipulation de dates et séries temporelles.',
            categories: [
                {
                    id: 'datetime_basics',
                    title: 'Module datetime',
                    description: 'Les bases de la manipulation de dates.',
                    snippets: [
                        {
                            id: 'current_date',
                            title: 'Date et Heure Actuelles',
                            description: 'Récupérer la date et l\'heure courantes.',
                            code: `from datetime import datetime

now = datetime.now()
print(f"Date et heure : {now}")
print(f"Année : {now.year}")
print(f"Mois : {now.month}")
print(f"Jour : {now.day}")`
                        },
                        {
                            id: 'formatting',
                            title: 'Formatage (strftime)',
                            description: 'Convertir une date en chaîne de caractères.',
                            code: `from datetime import datetime

now = datetime.now()
formatted = now.strftime("%Y-%m-%d %H:%M:%S")
print(f"Format ISO : {formatted}")

custom = now.strftime("%d/%m/%Y à %Hh%M")
print(f"Format français : {custom}")`
                        },
                        {
                            id: 'parsing',
                            title: 'Parsing (strptime)',
                            description: 'Convertir une chaîne en objet date.',
                            code: `from datetime import datetime

date_str = "25/12/2023"
date_obj = datetime.strptime(date_str, "%d/%m/%Y")
print(f"Objet date : {date_obj}")
print(f"Type : {type(date_obj)}")`
                        },
                        {
                            id: 'timedelta',
                            title: 'Calculs (timedelta)',
                            description: 'Ajouter ou soustraire du temps.',
                            code: `from datetime import datetime, timedelta

now = datetime.now()
tomorrow = now + timedelta(days=1)
next_week = now + timedelta(weeks=1)
past = now - timedelta(hours=2, minutes=30)

print(f"Demain : {tomorrow}")
print(f"Semaine prochaine : {next_week}")
print(f"Il y a 2h30 : {past}")`
                        }
                    ]
                },
                {
                    id: 'pandas_dates',
                    title: 'Séries Temporelles (Pandas)',
                    description: 'Manipulation avancée avec Pandas.',
                    snippets: [
                        {
                            id: 'date_range',
                            title: 'Générer une plage de dates',
                            description: 'Créer une séquence de dates.',
                            code: `import pandas as pd

# Jours
dates_d = pd.date_range(start='2023-01-01', periods=5, freq='D')
print("Jours :")
print(dates_d)

# Mois
dates_m = pd.date_range(start='2023-01-01', periods=5, freq='M')
print("\nMois :")
print(dates_m)`
                        },
                        {
                            id: 'resampling',
                            title: 'Rééchantillonnage (Resample)',
                            description: 'Changer la fréquence des données (ex: jour -> mois).',
                            code: `import pandas as pd
import numpy as np

# Données journalières
rng = pd.date_range('2023-01-01', periods=100, freq='D')
ts = pd.Series(np.random.randn(len(rng)), index=rng)

# Moyenne mensuelle
monthly_mean = ts.resample('M').mean()
print(monthly_mean)`
                        },
                        {
                            id: 'school_holidays',
                            title: 'Vacances Scolaires (France)',
                            description: 'Détecter les vacances scolaires (Zone A, B, C).',
                            code: `import holidays
from datetime import date

fr_holidays = holidays.France(years=2023)

d = date(2023, 7, 14)
if d in fr_holidays:
    print(f"{d} est férié : {fr_holidays.get(d)}")
else:
    print(f"{d} n'est pas férié.")`
                        }
                    ]
                }
            ]
        }
    ]
};
