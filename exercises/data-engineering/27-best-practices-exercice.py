# =================================================
# Module 27 : Bonnes Pratiques - EXERCICES
# =================================================

import pandas as pd
import numpy as np

# Ce fichier résume les bonnes pratiques en Data Engineering

# 1. STRUCTURE DE PROJET
# ------------------------
# projet/
# ├── data/
# │   ├── raw/           # Données brutes (jamais modifiées)
# │   ├── processed/     # Données nettoyées
# │   └── output/        # Résultats
# ├── notebooks/         # Exploration
# ├── src/               # Code source
# ├── tests/             # Tests unitaires
# └── requirements.txt   # Dépendances


# 2. VALIDATION DES DONNÉES
# ---------------------------
def validate_dataframe(df, expected_columns, expected_dtypes=None):
    """
    TODO: Implémenter une fonction de validation
    Vérifier: colonnes présentes, types, valeurs nulles
    """
    # Vérifier les colonnes
    missing_cols = set(expected_columns) - set(df.columns)
    if missing_cols:
        raise ValueError(f"Colonnes manquantes: {missing_cols}")
    
    # Vérifier les types (si spécifiés)
    # ...
    
    return True


# 3. LOGGING
# ------------
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# TODO: Ajouter du logging à vos pipelines
# logger.info("Début du traitement")
# logger.warning("Valeurs manquantes détectées")
# logger.error("Erreur dans le fichier")


# 4. FONCTIONS RÉUTILISABLES
# ----------------------------
def clean_text_column(series):
    """Nettoyer une colonne texte"""
    return (series
            .str.strip()
            .str.lower()
            .str.replace(r'[^\w\s]', '', regex=True))


def detect_outliers_iqr(series, factor=1.5):
    """Détecter les outliers par méthode IQR"""
    Q1, Q3 = series.quantile([0.25, 0.75])
    IQR = Q3 - Q1
    return (series < Q1 - factor * IQR) | (series > Q3 + factor * IQR)


# 5. TESTS UNITAIRES
# --------------------
def test_clean_text_column():
    """Exemple de test unitaire"""
    test_data = pd.Series(['  HELLO  ', 'World!'])
    result = clean_text_column(test_data)
    expected = pd.Series(['hello', 'world'])
    assert result.equals(expected), "Test échoué!"
    print("Test passé!")


# Exécuter les tests
test_clean_text_column()

print("Bonnes pratiques en Data Engineering")
