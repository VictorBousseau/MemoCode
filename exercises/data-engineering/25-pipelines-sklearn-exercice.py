# =================================================
# Module 25 : Pipelines sklearn - EXERCICES
# =================================================

import pandas as pd
import numpy as np
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer

# Données d'exemple
np.random.seed(42)
df = pd.DataFrame({
    'age': [25, None, 35, 45, 28],
    'salaire': [30000, 45000, None, 55000, 35000],
    'departement': ['IT', 'RH', 'IT', 'Finance', 'RH']
})

X = df.copy()

# Exercice 1 : Pipeline simple
# ------------------------------
# TODO: Créer un pipeline pour imputation + scaling
numeric_pipeline = Pipeline([
    ('imputer', SimpleImputer(strategy='median')),
    ('scaler', StandardScaler())
])

# TODO: Appliquer sur les colonnes numériques
X_numeric = None  # numeric_pipeline.fit_transform(X[['age', 'salaire']])

print("Pipeline numérique appliqué")


# Exercice 2 : ColumnTransformer
# --------------------------------
# TODO: Créer un preprocessor qui traite numériques et catégorielles différemment
numeric_features = ['age', 'salaire']
categorical_features = ['departement']

preprocessor = ColumnTransformer(
    transformers=[
        ('num', numeric_pipeline, numeric_features),
        # ('cat', OneHotEncoder(), categorical_features)
    ])

# X_transformed = preprocessor.fit_transform(X)


# Exercice 3 : Pipeline complet avec modèle
# -------------------------------------------
from sklearn.linear_model import LogisticRegression

# TODO: Créer un pipeline complet: preprocessing + modèle
full_pipeline = Pipeline([
    # ('preprocessor', preprocessor),
    # ('classifier', LogisticRegression())
])

print("Exercices de pipelines sklearn")
