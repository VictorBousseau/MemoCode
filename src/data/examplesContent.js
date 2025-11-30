import { Code } from 'lucide-react';

export const examplesContent = {
    themes: [
        {
            id: 'snippets_utiles',
            title: 'Snippets Utiles',
            description: 'Bouts de code réutilisables et recettes',
            categories: [
                {
                    id: 'general',
                    title: 'Général',
                    description: 'Fonctions utilitaires diverses.',
                    snippets: [
                        {
                            id: 'placeholder',
                            title: 'À venir...',
                            description: 'Cette section sera bientôt remplie avec des exemples concrets.',
                            code: `# Exemple de structure pour vos futurs snippets :
def ma_super_fonction():
    """
    Une fonction qui fait gagner du temps.
    """
    pass`
                        }
                    ]
                }
            ]
        },
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
X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42)

# Entraînement (Random Forest)
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Prédictions
y_pred = model.fit(X_train, y_train).predict(X_test)

# Évaluation
print("Rapport de Classification :")
print(classification_report(y_test, y_pred))

plt.figure(figsize=(6, 5))
sns.heatmap(confusion_matrix(y_test, y_pred), annot=True, fmt='d', cmap='Blues')
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
            id: 'python_date',
            title: 'Python Date',
            description: 'Manipulation de dates et jours fériés en France',
            categories: [
                {
                    id: 'date_features',
                    title: 'Features Temporelles',
                    description: 'Création de variables dérivées des dates (Jours fériés, ouvrés, etc.)',
                    snippets: [
                        {
                            id: 'french_calendar',
                            title: 'Calendrier Français & Jours Fériés',
                            description: 'Gestion des jours fériés, veilles, lendemains et jours ouvrés.',
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
                            title: 'Vacances Scolaires (Zones A, B, C)',
                            description: 'Récupérer les vacances officielles depuis l\'API du gouvernement.',
                            code: `import pandas as pd
import requests
import io

# 1. Récupération des données (API Gouvernement)
# Dataset : "Le calendrier scolaire" sur data.education.gouv.fr
url = "https://data.education.gouv.fr/api/explore/v2.1/catalog/datasets/fr-en-calendrier-scolaire/exports/csv?lang=fr&timezone=Europe%2FParis&use_labels=true&delimiter=%3B"

print("Téléchargement des données...")
# On lit le CSV directement depuis l'URL
df_holidays = pd.read_csv(url, sep=';')

# 2. Nettoyage et Préparation
# On garde les colonnes utiles
cols = ['Description', 'Zones', 'Date de début', 'Date de fin', 'Annee_scolaire']
df_holidays = df_holidays[cols].copy()

# Conversion en datetime (UTC pour éviter les soucis de timezone)
df_holidays['start'] = pd.to_datetime(df_holidays['Date de début'], utc=True).dt.date
df_holidays['end'] = pd.to_datetime(df_holidays['Date de fin'], utc=True).dt.date

# 3. Filtrage par Zone (Ex: Zone C = Créteil, Montpellier, Paris, Toulouse, Versailles)
# Zones disponibles : 'Zone A', 'Zone B', 'Zone C'
ma_zone = 'Zone C'
df_zone = df_holidays[df_holidays['Zones'] == ma_zone].reset_index(drop=True)

print(f"Vacances récupérées pour {ma_zone} : {len(df_zone)} périodes.")

# 4. Application sur notre DataFrame
# Créons un DataFrame exemple
dates = pd.date_range(start='2025-01-01', end='2025-12-31', freq='D')
df = pd.DataFrame({'date': dates})
df['date_only'] = df['date'].dt.date

def est_en_vacances(date_ref, holidays_df):
    # Vérifie si la date est comprise dans une des périodes de vacances
    # Note : Pour de gros volumes, préférer une jointure par intervalle ou une structure optimisée
    mask = (holidays_df['start'] <= date_ref) & (holidays_df['end'] >= date_ref)
    return mask.any()

df['en_vacances'] = df['date_only'].apply(lambda x: est_en_vacances(x, df_zone))

# Aperçu
print(df[df['en_vacances']].head(10))`
                        }
                    ]
                }
            ]
        }
    ]
};
