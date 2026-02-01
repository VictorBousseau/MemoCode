# =================================================
# Module 27 : Bonnes Pratiques - SOLUTION
# =================================================

import pandas as pd
import numpy as np
import logging

# Configuration du logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


# FONCTIONS UTILITAIRES COMPLÈTES
# ---------------------------------

def validate_dataframe(df, expected_columns, expected_dtypes=None):
    """Valider un DataFrame"""
    logger.info(f"Validation du DataFrame ({len(df)} lignes)")
    
    # Vérifier les colonnes
    missing_cols = set(expected_columns) - set(df.columns)
    if missing_cols:
        logger.error(f"Colonnes manquantes: {missing_cols}")
        raise ValueError(f"Colonnes manquantes: {missing_cols}")
    
    # Vérifier les types
    if expected_dtypes:
        for col, dtype in expected_dtypes.items():
            if col in df.columns and not pd.api.types.is_dtype_equal(df[col].dtype, dtype):
                logger.warning(f"Type incorrect pour {col}: {df[col].dtype} vs {dtype}")
    
    # Rapport sur les valeurs nulles
    null_counts = df[expected_columns].isnull().sum()
    if null_counts.any():
        logger.warning(f"Valeurs nulles: {null_counts[null_counts > 0].to_dict()}")
    
    logger.info("Validation terminée")
    return True


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


def create_data_report(df):
    """Créer un rapport sur les données"""
    report = {
        'shape': df.shape,
        'columns': list(df.columns),
        'dtypes': df.dtypes.to_dict(),
        'null_counts': df.isnull().sum().to_dict(),
        'null_percentage': (df.isnull().sum() / len(df) * 100).to_dict()
    }
    return report


# EXEMPLE D'UTILISATION
# -----------------------
df = pd.DataFrame({
    'nom': ['  Alice  ', 'Bob!', 'Charlie'],
    'age': [25, 30, None],
    'salaire': [35000, 45000, 150000]
})

# Validation
try:
    validate_dataframe(df, ['nom', 'age', 'salaire'])
except ValueError as e:
    logger.error(f"Validation échouée: {e}")

# Nettoyage
df['nom'] = clean_text_column(df['nom'])

# Détection d'outliers
outliers = detect_outliers_iqr(df['salaire'])
logger.info(f"Outliers détectés: {outliers.sum()}")

# Rapport
report = create_data_report(df)
print("Rapport:\n", report)
