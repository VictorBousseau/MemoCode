# =================================================
# Module 25 : Pipelines sklearn - SOLUTION
# =================================================

import pandas as pd
import numpy as np
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer

np.random.seed(42)
df = pd.DataFrame({
    'age': [25, None, 35, 45, 28],
    'salaire': [30000, 45000, None, 55000, 35000],
    'departement': ['IT', 'RH', 'IT', 'Finance', 'RH']
})

X = df.copy()

# Exercice 1 : Pipeline simple
numeric_pipeline = Pipeline([
    ('imputer', SimpleImputer(strategy='median')),
    ('scaler', StandardScaler())
])

X_numeric = numeric_pipeline.fit_transform(X[['age', 'salaire']])
print("Pipeline numérique:\n", X_numeric)


# Exercice 2 : ColumnTransformer
numeric_features = ['age', 'salaire']
categorical_features = ['departement']

preprocessor = ColumnTransformer(
    transformers=[
        ('num', numeric_pipeline, numeric_features),
        ('cat', OneHotEncoder(handle_unknown='ignore'), categorical_features)
    ])

X_transformed = preprocessor.fit_transform(X)
print("Données transformées shape:", X_transformed.shape)


# Exercice 3 : Pipeline complet avec modèle
from sklearn.linear_model import LogisticRegression

full_pipeline = Pipeline([
    ('preprocessor', preprocessor),
    ('classifier', LogisticRegression())
])

print("Pipeline complet créé:", full_pipeline)
