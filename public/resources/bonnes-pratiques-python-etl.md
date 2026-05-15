# Bonnes Pratiques — Python comme ETL (Pandas, NumPy & co.)

## Table des matières

1. [Lecture des données](#1-lecture-des-données)
2. [Filtrage](#2-filtrage)
3. [Sélection / Renommage de colonnes](#3-sélection--renommage-de-colonnes)
4. [Transformation de colonnes](#4-transformation-de-colonnes)
5. [Agrégation](#5-agrégation)
6. [Jointures](#6-jointures)
7. [Tri](#7-tri)
8. [Gestion des doublons et valeurs manquantes](#8-gestion-des-doublons-et-valeurs-manquantes)
9. [Pivot / Unpivot](#9-pivot--unpivot)
10. [Écriture / Export](#10-écriture--export)
11. [Optimisation & bonnes habitudes](#11-optimisation--bonnes-habitudes)

---

## 1. Lecture des données

```python
import pandas as pd

# CSV
df = pd.read_csv("data.csv", sep=";", encoding="utf-8", dtype={"code_postal": str})

# Excel
df = pd.read_excel("data.xlsx", sheet_name="Feuil1", skiprows=2)

# Parquet (recommandé pour les gros volumes)
df = pd.read_parquet("data.parquet")

# SQL
from sqlalchemy import create_engine
engine = create_engine("postgresql://user:pwd@host:5432/db")
df = pd.read_sql("SELECT * FROM table", engine)

# JSON
df = pd.read_json("data.json", orient="records")
```

**Bonne pratique** : toujours préciser `dtype` pour les colonnes ambiguës (codes postaux, identifiants numériques) afin d'éviter les conversions automatiques.

---

## 2. Filtrage

### Filtrage simple

```python
# ✅ Recommandé — clair et performant
df_filtered = df[df["age"] > 30]
df_filtered = df[df["ville"] == "Paris"]

# ✅ .query() — lisible pour les filtres complexes
df_filtered = df.query("age > 30 and ville == 'Paris'")

# ✅ .loc[] — filtrage + sélection de colonnes en une seule opération
df_filtered = df.loc[df["age"] > 30, ["nom", "age", "ville"]]
```

### Filtrage multiple

```python
# ✅ Recommandé — conditions combinées avec & | ~
df_filtered = df[(df["age"] > 30) & (df["ville"] == "Paris")]
df_filtered = df[(df["age"] > 30) | (df["ville"] == "Lyon")]
df_filtered = df[~df["ville"].isin(["Paris", "Lyon"])]  # exclusion

# ✅ .isin() pour filtrer sur une liste de valeurs
villes = ["Paris", "Lyon", "Marseille"]
df_filtered = df[df["ville"].isin(villes)]

# ✅ .between() pour les intervalles
df_filtered = df[df["age"].between(25, 35)]

# ✅ .str pour les filtres textuels
df_filtered = df[df["nom"].str.contains("dupont", case=False, na=False)]
df_filtered = df[df["email"].str.endswith("@gmail.com")]
```

### Ce qu'il faut éviter

```python
# ❌ Boucle for pour filtrer — extrêmement lent
result = []
for i, row in df.iterrows():
    if row["age"] > 30:
        result.append(row)

# ❌ .apply() pour un simple filtre — inutile et lent
df_filtered = df[df.apply(lambda row: row["age"] > 30, axis=1)]
```

---

## 3. Sélection / Renommage de colonnes

### Sélection

```python
# ✅ Sélection par liste
df_sub = df[["nom", "age", "ville"]]

# ✅ .filter() — sélection par motif
df_sub = df.filter(like="prix")       # colonnes contenant "prix"
df_sub = df.filter(regex="^date_")    # colonnes commençant par "date_"

# ✅ Exclure des colonnes
df_sub = df.drop(columns=["colonne_inutile", "temp"])
```

### Renommage

```python
# ✅ Renommage explicite — le plus clair
df = df.rename(columns={"ancien_nom": "nouveau_nom", "col2": "col2_renommee"})

# ✅ Renommage en masse avec une fonction
df.columns = df.columns.str.lower().str.replace(" ", "_").str.replace("é", "e")

# ✅ Renommage avec un dictionnaire (utile en pipeline)
mapping = {"firstName": "prenom", "lastName": "nom", "birthDate": "date_naissance"}
df = df.rename(columns=mapping)
```

### Ce qu'il faut éviter

```python
# ❌ Assigner les colonnes manuellement une par une
df.columns = ["a", "b", "c", "d"]  # fragile si l'ordre change
```

---

## 4. Transformation de colonnes

### Création / modification

```python
# ✅ Opération vectorisée (NumPy sous le capot) — le plus rapide
df["prix_ttc"] = df["prix_ht"] * 1.20

# ✅ np.where() pour les conditions simples
import numpy as np
df["categorie"] = np.where(df["age"] >= 18, "adulte", "mineur")

# ✅ np.select() pour les conditions multiples
conditions = [
    df["age"] < 18,
    df["age"].between(18, 64),
    df["age"] >= 65
]
choix = ["mineur", "adulte", "senior"]
df["tranche"] = np.select(conditions, choix, default="inconnu")

# ✅ .map() pour le mapping de valeurs
mapping_region = {"75": "IDF", "13": "PACA", "69": "ARA"}
df["region"] = df["departement"].map(mapping_region)

# ✅ .assign() pour le chaînage (style fonctionnel)
df = (df
    .assign(prix_ttc=lambda x: x["prix_ht"] * 1.20)
    .assign(remise=lambda x: x["prix_ttc"] * 0.10)
)
```

### Conversion de types

```python
# ✅ Conversions explicites
df["date"] = pd.to_datetime(df["date"], format="%d/%m/%Y")
df["montant"] = pd.to_numeric(df["montant"], errors="coerce")  # NaN si invalide
df["code"] = df["code"].astype(str)

# ✅ Catégories pour réduire la mémoire
df["statut"] = df["statut"].astype("category")
```

### Ce qu'il faut éviter

```python
# ❌ .apply() avec axis=1 pour des opérations vectorisables
df["total"] = df.apply(lambda row: row["qte"] * row["prix"], axis=1)
# ✅ Préférer : df["total"] = df["qte"] * df["prix"]

# ❌ Boucle iterrows() pour transformer des données
for i, row in df.iterrows():
    df.at[i, "upper_nom"] = row["nom"].upper()
# ✅ Préférer : df["upper_nom"] = df["nom"].str.upper()
```

---

## 5. Agrégation

### Agrégation simple

```python
# ✅ .groupby() + .agg() — le standard
df_agg = df.groupby("ville").agg(
    nb_clients=("id", "count"),
    age_moyen=("age", "mean"),
    ca_total=("montant", "sum")
).reset_index()

# ✅ Agrégation avec plusieurs fonctions sur une colonne
df_agg = df.groupby("ville")["montant"].agg(["sum", "mean", "max"]).reset_index()

# ✅ Named aggregation (pandas >= 0.25) — le plus lisible
df_agg = df.groupby("ville").agg(
    total=pd.NamedAgg(column="montant", aggfunc="sum"),
    moyenne=pd.NamedAgg(column="montant", aggfunc="mean")
).reset_index()
```

### Agrégation avancée

```python
# ✅ Fonctions personnalisées
df_agg = df.groupby("ville").agg(
    ecart=("montant", lambda x: x.max() - x.min()),
    pct_positif=("montant", lambda x: (x > 0).mean() * 100)
).reset_index()

# ✅ .transform() — ajouter le résultat d'agrégat à chaque ligne
df["ca_ville"] = df.groupby("ville")["montant"].transform("sum")
df["pct_ca"] = df["montant"] / df["ca_ville"] * 100

# ✅ .value_counts() pour les fréquences
freq = df["ville"].value_counts().reset_index()
freq.columns = ["ville", "nb_occurrences"]

# ✅ pd.crosstab() pour les tableaux croisés
ct = pd.crosstab(df["ville"], df["categorie"], margins=True)
```

### Ce qu'il faut éviter

```python
# ❌ Boucle sur les groupes
result = {}
for ville in df["ville"].unique():
    subset = df[df["ville"] == ville]
    result[ville] = subset["montant"].sum()
# ✅ Préférer : df.groupby("ville")["montant"].sum()
```

---

## 6. Jointures

### Types de jointures

```python
# ✅ pd.merge() — jointure standard (comme SQL)
df_merged = pd.merge(df_commandes, df_clients, on="client_id", how="left")

# Jointure sur des colonnes de noms différents
df_merged = pd.merge(
    df_commandes, df_clients,
    left_on="id_client", right_on="client_id",
    how="inner"
)

# Jointure sur plusieurs clés
df_merged = pd.merge(df1, df2, on=["annee", "mois", "produit"], how="left")

# ✅ Suffixes pour éviter les conflits de noms
df_merged = pd.merge(df1, df2, on="id", suffixes=("_gauche", "_droite"))
```

### Référence des types de `how`

| `how`     | Équivalent SQL  | Comportement                              |
|-----------|-----------------|-------------------------------------------|
| `inner`   | INNER JOIN      | Uniquement les correspondances            |
| `left`    | LEFT JOIN       | Tout le DataFrame gauche                  |
| `right`   | RIGHT JOIN      | Tout le DataFrame droit                   |
| `outer`   | FULL OUTER JOIN | Tout des deux côtés                       |
| `cross`   | CROSS JOIN      | Produit cartésien                         |

### Autres méthodes de combinaison

```python
# ✅ pd.concat() — empiler des DataFrames (UNION)
df_union = pd.concat([df1, df2, df3], ignore_index=True)

# ✅ .join() — jointure sur index (rapide si les index sont déjà prêts)
df_joined = df1.set_index("id").join(df2.set_index("id"), how="left")

# ✅ Vérifier les doublons AVANT la jointure (évite les multiplications de lignes)
assert df_clients["client_id"].is_unique, "Doublons détectés dans la table de référence !"
```

### Ce qu'il faut éviter

```python
# ❌ Jointure avec une boucle
for i, row in df1.iterrows():
    match = df2[df2["id"] == row["id"]]
    if not match.empty:
        df1.at[i, "nom"] = match.iloc[0]["nom"]
# ✅ Préférer : pd.merge(df1, df2, on="id", how="left")

# ❌ Ignorer le validate pour les jointures critiques
# ✅ Utiliser validate pour détecter les problèmes
df_merged = pd.merge(df1, df2, on="id", how="left", validate="m:1")
# Valeurs possibles : "1:1", "1:m", "m:1", "m:m"
```

---

## 7. Tri

```python
# ✅ .sort_values()
df_sorted = df.sort_values("date", ascending=False)
df_sorted = df.sort_values(["ville", "age"], ascending=[True, False])

# ✅ .nsmallest() / .nlargest() — plus rapide que sort + head
top10 = df.nlargest(10, "montant")
bottom5 = df.nsmallest(5, "age")

# ✅ Tri catégoriel personnalisé
ordre = ["bronze", "argent", "or", "platine"]
df["niveau"] = pd.Categorical(df["niveau"], categories=ordre, ordered=True)
df_sorted = df.sort_values("niveau")
```

---

## 8. Gestion des doublons et valeurs manquantes

### Doublons

```python
# ✅ Détecter
doublons = df[df.duplicated(subset=["nom", "date"], keep=False)]

# ✅ Supprimer
df_clean = df.drop_duplicates(subset=["nom", "date"], keep="last")
```

### Valeurs manquantes

```python
# ✅ Diagnostic
df.isnull().sum()                  # compte par colonne
df.isnull().mean().round(3) * 100  # pourcentage par colonne

# ✅ Remplissage
df["ville"] = df["ville"].fillna("Inconnu")
df["montant"] = df["montant"].fillna(df["montant"].median())

# ✅ Remplissage par groupe
df["montant"] = df.groupby("ville")["montant"].transform(
    lambda x: x.fillna(x.median())
)

# ✅ Suppression
df_clean = df.dropna(subset=["colonnes_critiques"])
```

---

## 9. Pivot / Unpivot

```python
# ✅ Pivot — lignes vers colonnes
df_pivot = df.pivot_table(
    index="ville",
    columns="mois",
    values="montant",
    aggfunc="sum",
    fill_value=0
)

# ✅ Unpivot (melt) — colonnes vers lignes
df_melted = df.melt(
    id_vars=["ville"],
    value_vars=["jan", "fev", "mar"],
    var_name="mois",
    value_name="montant"
)

# ✅ pd.crosstab() — tableau croisé rapide
ct = pd.crosstab(df["ville"], df["categorie"], values=df["montant"], aggfunc="sum")
```

---

## 10. Écriture / Export

```python
# CSV
df.to_csv("output.csv", sep=";", index=False, encoding="utf-8-sig")  # utf-8-sig pour Excel FR

# Excel
df.to_excel("output.xlsx", index=False, sheet_name="Résultats")

# Parquet (recommandé pour les pipelines)
df.to_parquet("output.parquet", index=False, engine="pyarrow")

# SQL
df.to_sql("nom_table", engine, if_exists="replace", index=False, chunksize=5000)

# Export multi-feuilles Excel
with pd.ExcelWriter("rapport.xlsx", engine="openpyxl") as writer:
    df_ventes.to_excel(writer, sheet_name="Ventes", index=False)
    df_clients.to_excel(writer, sheet_name="Clients", index=False)
```

---

## 11. Optimisation & bonnes habitudes

### Performance

| Pratique | Impact |
|----------|--------|
| Opérations vectorisées (`+`, `*`, `np.where`) | 10-100x plus rapide que `.apply()` |
| Éviter `iterrows()` / `itertuples()` | Toujours chercher une alternative vectorisée |
| Utiliser `.astype("category")` | Réduit la mémoire pour les colonnes à faible cardinalité |
| Lire en Parquet plutôt qu'en CSV | Lecture 2-5x plus rapide, compression native |
| `pd.eval()` / `df.query()` | Plus rapide sur les très gros DataFrames |
| Charger uniquement les colonnes utiles | `usecols=["col1", "col2"]` dans `read_csv` |

### Structure d'un pipeline ETL propre

```python
import pandas as pd
import numpy as np

def extract(path: str) -> pd.DataFrame:
    """Lecture et typage des données brutes."""
    return pd.read_csv(path, sep=";", dtype={"code": str})

def transform(df: pd.DataFrame) -> pd.DataFrame:
    """Nettoyage, enrichissement et agrégation."""
    return (df
        .rename(columns=str.lower)
        .drop_duplicates(subset=["id"])
        .assign(
            date=lambda x: pd.to_datetime(x["date"], format="%d/%m/%Y"),
            montant_ttc=lambda x: x["montant_ht"] * 1.20,
            categorie=lambda x: np.where(x["montant_ht"] > 1000, "premium", "standard")
        )
        .query("montant_ht > 0")
        .groupby("ville").agg(
            nb_commandes=("id", "count"),
            ca_total=("montant_ttc", "sum")
        )
        .reset_index()
        .sort_values("ca_total", ascending=False)
    )

def load(df: pd.DataFrame, output: str) -> None:
    """Export des résultats."""
    df.to_parquet(output, index=False)

# --- Pipeline ---
if __name__ == "__main__":
    raw = extract("data/commandes.csv")
    result = transform(raw)
    load(result, "output/rapport.parquet")
    print(f"{len(result)} lignes exportées.")
```

### Checklist ETL

- [ ] Vérifier les types après lecture (`df.dtypes`, `df.info()`)
- [ ] Vérifier les doublons sur les clés avant jointure
- [ ] Utiliser `validate` dans `pd.merge()` pour les jointures critiques
- [ ] Logger le nombre de lignes à chaque étape (extract → transform → load)
- [ ] Préférer Parquet pour le stockage intermédiaire
- [ ] Ne jamais modifier le DataFrame source — travailler sur des copies ou en chaînage
- [ ] Utiliser des noms de colonnes explicites et en snake_case

---

> **Règle d'or** : si tu écris une boucle `for` sur un DataFrame, il existe probablement une méthode vectorisée pour le faire 100x plus vite.
