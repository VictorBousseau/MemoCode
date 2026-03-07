# Prompt Claude Code — Enrichissement DAX de MémoCode

## Contexte de l'application

MémoCode est un site de snippets de code personnel (victorbousseau.github.io/MemoCode).
La section DAX est déjà structurée avec :
- Des **onglets** : "DAX Essentiels", "Time Intelligence", "Expert & Best Practices"
- Une **sidebar** avec des catégories numérotées (ex: "1. Agrégations Sécurisées", "2. Le Moteur : CALCULATE", "3. Les Itérateurs (Fonctions X)", "4. Tips & Raccourcis")
- Des **snippets** au format : Titre (NomFonction) + badge difficulté coloré (vert = Débutant, orange = Avancé) + tags (#dax #fonctiontype) + sous-titre court + bloc note explicative avec emoji 💡 + bloc de code DAX
- Des **snippets déjà présents** : COUNTROWS, DISTINCTCOUNT, DIVIDE (dans Agrégations Sécurisées)

## Étape 1 — Lire la structure existante

Avant d'écrire quoi que ce soit, lis les fichiers du projet pour comprendre :
1. Le format exact des snippets (JSON, JS objet, HTML direct ?)
2. Comment les badges de difficulté "Débutant" / "Avancé" sont implémentés (classes CSS, attributs data-, etc.)
3. Comment les catégories et onglets sont structurés en code
4. Les noms exacts des catégories existantes pour éviter les doublons

## Étape 2 — Ajouter les snippets par catégorie

Utilise ce dataset fictif pour TOUS les exemples (cohérence pédagogique) :
Table "Portefeuille" : ID_Contrat, Region, Produit, Cotisation, Sinistre, Objectif

---

### ONGLET : DAX Essentiels

#### Catégorie "Agrégations Sécurisées" (existante — compléter sans doublons)

Ajoute les snippets suivants si non déjà présents :

**SUM** | Badge: Débutant | Tags: #dax #sum #aggregation
- Sous-titre: "Additionner une colonne numérique."
- Note 💡: "SUM respecte le filter context : un slicer sur la Région ne retournera que les cotisations de cette région. Préférer SUM à SUMX quand aucun calcul ligne à ligne n'est nécessaire."
- Code: `Total Cotisations = SUM('Portefeuille'[Cotisation])`

**AVERAGE** | Badge: Débutant | Tags: #dax #average #aggregation
- Sous-titre: "Calculer la moyenne d'une colonne."
- Note 💡: "AVERAGE divise la somme par le nombre de lignes visibles. Sensible aux valeurs aberrantes — envisager AVERAGEX avec un FILTER pour les exclure."
- Code: `Cotisation Moyenne = AVERAGE('Portefeuille'[Cotisation])`

**MIN / MAX** | Badge: Débutant | Tags: #dax #min #max #aggregation
- Sous-titre: "Valeur minimale ou maximale d'une colonne."
- Note 💡: "Utile pour les bornes de KPI. Dans un tableau croisé, MIN/MAX retournent le min/max pour chaque contexte de ligne."
- Code:
```
Cotisation Min = MIN('Portefeuille'[Cotisation])
Cotisation Max = MAX('Portefeuille'[Cotisation])
```

**COUNT** | Badge: Débutant | Tags: #dax #count #aggregation
- Sous-titre: "Compter les valeurs numériques non-vides."
- Note 💡: "⚠️ COUNT ignore les BLANK et ne compte que les colonnes numériques. Pour compter les lignes (même avec des BLANK), utiliser COUNTROWS. Pour les colonnes texte, utiliser COUNTA."
- Code: `Nb Contrats Numériques = COUNT('Portefeuille'[Cotisation])`

---

#### Catégorie "Les Itérateurs (Fonctions X)" (existante — à alimenter)

**SUMX** | Badge: Débutant | Tags: #dax #sumx #iterator
- Sous-titre: "Calculer ligne à ligne puis sommer."
- Note 💡: "SUMX crée un row context : il évalue l'expression pour chaque ligne de la table, puis somme les résultats. Indispensable quand le calcul dépend de plusieurs colonnes (ex : marge = cotisation - sinistre)."
- Code:
```
Marge Nette =
SUMX(
    'Portefeuille',
    'Portefeuille'[Cotisation] - 'Portefeuille'[Sinistre]
)
```

**AVERAGEX** | Badge: Débutant | Tags: #dax #averagex #iterator
- Sous-titre: "Moyenne d'une expression calculée ligne à ligne."
- Note 💡: "Contrairement à AVERAGE qui moyenne une colonne existante, AVERAGEX permet de moyenner un calcul (ex: taux de sinistralité par contrat)."
- Code:
```
Taux Sinistralité Moyen =
AVERAGEX(
    'Portefeuille',
    DIVIDE('Portefeuille'[Sinistre], 'Portefeuille'[Cotisation])
)
```

**MINX / MAXX** | Badge: Avancé | Tags: #dax #minx #maxx #iterator
- Sous-titre: "Min ou max d'une expression calculée ligne à ligne."
- Note 💡: "Utile pour trouver la meilleure/pire performance calculée, pas une valeur brute de colonne."
- Code:
```
Marge Min = MINX('Portefeuille', 'Portefeuille'[Cotisation] - 'Portefeuille'[Sinistre])
Marge Max = MAXX('Portefeuille', 'Portefeuille'[Cotisation] - 'Portefeuille'[Sinistre])
```

**COUNTX** | Badge: Avancé | Tags: #dax #countx #iterator
- Sous-titre: "Compter les lignes où une expression est non-vide."
- Note 💡: "COUNTX compte les résultats non-BLANK de l'expression. Ici : compter les contrats en perte (sinistre > cotisation)."
- Code:
```
Contrats en Perte =
COUNTX(
    'Portefeuille',
    IF('Portefeuille'[Sinistre] > 'Portefeuille'[Cotisation], 1)
)
```

---

#### Catégorie "Le Moteur : CALCULATE" (existante — à alimenter)

**CALCULATE** | Badge: Avancé | Tags: #dax #calculate #context
- Sous-titre: "Modifier le filter context d'une expression."
- Note 💡: "CALCULATE est la fonction la plus importante de DAX. Elle évalue une expression APRÈS avoir modifié le filter context. Le filtre passé en argument REMPLACE le context existant sur cette colonne (sauf avec KEEPFILTERS)."
- Code:
```
Cotisations Nord =
CALCULATE(
    SUM('Portefeuille'[Cotisation]),
    'Portefeuille'[Region] = "Nord"
)
```

**CALCULATETABLE** | Badge: Avancé | Tags: #dax #calculatetable #context
- Sous-titre: "Retourner une table filtrée (version table de CALCULATE)."
- Note 💡: "Comme CALCULATE mais retourne une table au lieu d'un scalaire. Utilisé dans des mesures intermédiaires ou avec COUNTROWS/SUMX."
- Code:
```
Contrats Haute Valeur =
CALCULATETABLE(
    'Portefeuille',
    'Portefeuille'[Cotisation] > 5000
)
```

**FILTER** | Badge: Avancé | Tags: #dax #filter #context
- Sous-titre: "Filtrer une table selon une condition complexe."
- Note 💡: "FILTER retourne une table et crée un row context. À utiliser dans CALCULATE quand le filtre est complexe (plusieurs colonnes, expressions calculées). Pour des filtres simples sur une colonne, préférer la syntaxe directe dans CALCULATE."
- Code:
```
Cotisations Rentables =
CALCULATE(
    SUM('Portefeuille'[Cotisation]),
    FILTER('Portefeuille', 'Portefeuille'[Sinistre] < 'Portefeuille'[Cotisation])
)
```

**ALL** | Badge: Avancé | Tags: #dax #all #context #removefilter
- Sous-titre: "Supprimer tous les filtres sur une table ou colonne."
- Note 💡: "ALL ignore les slicers et filtres visuels. Classiquement utilisé pour calculer un % du total : dénominateur = CALCULATE(SUM(...), ALL(Table))."
- Code:
```
% des Cotisations =
DIVIDE(
    SUM('Portefeuille'[Cotisation]),
    CALCULATE(SUM('Portefeuille'[Cotisation]), ALL('Portefeuille'))
)
```

**ALLEXCEPT** | Badge: Avancé | Tags: #dax #allexcept #context
- Sous-titre: "Supprimer tous les filtres sauf sur certaines colonnes."
- Note 💡: "ALLEXCEPT('Table', Col1, Col2) supprime tous les filtres de la table SAUF sur Col1 et Col2. Utile pour stabiliser un total par groupe tout en conservant une dimension."
- Code:
```
Cotisations Région (stable) =
CALCULATE(
    SUM('Portefeuille'[Cotisation]),
    ALLEXCEPT('Portefeuille', 'Portefeuille'[Region])
)
```

**ALLSELECTED** | Badge: Avancé | Tags: #dax #allselected #context
- Sous-titre: "Respecter les slicers mais ignorer les filtres visuels."
- Note 💡: "ALLSELECTED garde les filtres posés par l'utilisateur (slicers) mais ignore les filtres internes au visuel (ex: filtres de lignes d'un tableau). Idéal pour les % dans un tableau avec slicers."
- Code:
```
% Cotisations (sélection) =
DIVIDE(
    SUM('Portefeuille'[Cotisation]),
    CALCULATE(SUM('Portefeuille'[Cotisation]), ALLSELECTED('Portefeuille'))
)
```

**REMOVEFILTERS** | Badge: Avancé | Tags: #dax #removefilters #context
- Sous-titre: "Supprimer explicitement tous les filtres (alias clair de ALL)."
- Note 💡: "REMOVEFILTERS est fonctionnellement équivalent à ALL mais sémantiquement plus lisible — il exprime clairement l'intention de supprimer des filtres. Préféré dans le code de production."
- Code:
```
Total Global =
CALCULATE(
    SUM('Portefeuille'[Cotisation]),
    REMOVEFILTERS('Portefeuille')
)
```

**KEEPFILTERS** | Badge: Avancé | Tags: #dax #keepfilters #context
- Sous-titre: "Ajouter un filtre sans écraser les filtres existants."
- Note 💡: "Par défaut, CALCULATE remplace les filtres existants sur une colonne. KEEPFILTERS empêche cet écrasement : le filtre s'ajoute à l'intersection. Evite des bugs silencieux avec les slicers."
- Code:
```
Cotisations Nord (slicer safe) =
CALCULATE(
    SUM('Portefeuille'[Cotisation]),
    KEEPFILTERS('Portefeuille'[Region] = "Nord")
)
```

**USERELATIONSHIP** | Badge: Avancé | Tags: #dax #userelationship #model
- Sous-titre: "Activer une relation inactive pour un calcul spécifique."
- Note 💡: "Quand le modèle contient plusieurs relations entre deux tables (ex: Date commande et Date sinistre vers la même table Calendrier), une seule est active. USERELATIONSHIP active temporairement une relation inactive le temps du calcul."
- Code:
```
Sinistres par Date Clôture =
CALCULATE(
    SUM('Portefeuille'[Sinistre]),
    USERELATIONSHIP('Portefeuille'[DateCloture], 'Calendrier'[Date])
)
```

---

#### Nouvelle catégorie : "Logique & Conditions"

**IF** | Badge: Débutant | Tags: #dax #if #logic
- Sous-titre: "Condition simple vrai/faux."
- Note 💡: "IF dans une mesure s'applique au niveau du filter context (pas ligne par ligne). Pour du ligne à ligne, utiliser IF dans une colonne calculée ou dans un SUMX/COUNTX."
- Code:
```
Statut Contrat =
IF(
    'Portefeuille'[Sinistre] > 'Portefeuille'[Cotisation],
    "Déficitaire",
    "Rentable"
)
```

**SWITCH(TRUE())** | Badge: Débutant | Tags: #dax #switch #logic
- Sous-titre: "Classification multi-conditions lisible."
- Note 💡: "SWITCH(TRUE(), ...) est le pattern idiomatique DAX pour remplacer les IF imbriqués. Les conditions sont évaluées dans l'ordre — dès qu'une est vraie, SWITCH retourne le résultat associé."
- Code:
```
Catégorie Cotisation =
SWITCH(
    TRUE(),
    'Portefeuille'[Cotisation] >= 10000, "Haute",
    'Portefeuille'[Cotisation] >= 5000,  "Moyenne",
    "Faible"
)
```

**AND / OR / NOT** | Badge: Débutant | Tags: #dax #and #or #logic
- Sous-titre: "Combiner des conditions logiques."
- Note 💡: "En DAX, && et || sont les équivalents opérateurs de AND() et OR(). Préférer && et || pour la lisibilité dans les expressions complexes."
- Code:
```
Contrat à Risque =
IF(
    'Portefeuille'[Sinistre] > 'Portefeuille'[Cotisation] &&
    'Portefeuille'[Cotisation] < 'Portefeuille'[Objectif],
    "Risque élevé",
    "OK"
)
```

**IFERROR / COALESCE** | Badge: Débutant | Tags: #dax #iferror #coalesce #errorhandling
- Sous-titre: "Gérer les erreurs et les valeurs nulles."
- Note 💡: "IFERROR capture toute erreur de calcul. COALESCE retourne la première valeur non-BLANK parmi ses arguments — plus léger qu'un IF(ISBLANK(...)). Pour les divisions, préférer DIVIDE() qui gère nativement le zéro."
- Code:
```
Taux Sécurisé = IFERROR(DIVIDE([Sinistres], [Cotisations]), 0)
Cotisation Fallback = COALESCE('Portefeuille'[Cotisation], 0)
```

**SELECTEDVALUE** | Badge: Débutant | Tags: #dax #selectedvalue #context
- Sous-titre: "Récupérer la valeur sélectionnée dans un slicer."
- Note 💡: "SELECTEDVALUE retourne la valeur de la colonne si et seulement si une seule valeur est sélectionnée dans le filter context. Sinon retourne la valeur de remplacement. Parfait pour les titres dynamiques."
- Code:
```
Titre Région =
SELECTEDVALUE(
    'Portefeuille'[Region],
    "Toutes régions"
)
```

**HASONEVALUE / ISINSCOPE** | Badge: Avancé | Tags: #dax #hasonevalue #isinscope #context
- Sous-titre: "Détecter le niveau de granularité dans un visuel."
- Note 💡: "HASONEVALUE vérifie qu'une seule valeur est dans le context. ISINSCOPE détecte si une colonne est active dans une hiérarchie (matrice). Utiles pour adapter le comportement d'une mesure selon le niveau d'affichage."
- Code:
```
KPI Adaptatif =
IF(
    ISINSCOPE('Portefeuille'[Produit]),
    SUM('Portefeuille'[Cotisation]),
    BLANK()
)
```

---

### ONGLET : Expert & Best Practices

#### Nouvelle catégorie : "Variables & Performance"

**VAR / RETURN** | Badge: Avancé | Tags: #dax #var #return #performance
- Sous-titre: "Stocker des calculs intermédiaires pour la lisibilité et la performance."
- Note 💡: "VAR évalue l'expression UNE seule fois au moment de la déclaration, puis la réutilise. Cela améliore la performance (pas de recalcul) ET la lisibilité. C'est une bonne pratique systématique dès qu'une valeur est réutilisée."
- Code:
```
Analyse Marge =
VAR CotisationTotale = SUM('Portefeuille'[Cotisation])
VAR SinistreTotale   = SUM('Portefeuille'[Sinistre])
VAR Marge            = CotisationTotale - SinistreTotale
VAR TauxMarge        = DIVIDE(Marge, CotisationTotale)
RETURN
    TauxMarge
```

#### Nouvelle catégorie : "Patterns Avancés"

**% du Total avec ALL** | Badge: Avancé | Tags: #dax #all #pattern #percentage
- Sous-titre: "Pattern classique : part de chaque ligne dans le total global."
- Note 💡: "Le numérateur garde le filter context du visuel. Le dénominateur utilise ALL() pour effacer tous les filtres et obtenir le total absolu. Ce pattern fonctionne dans toutes les versions de Power BI."
- Code:
```
Part des Cotisations =
VAR Numerateur   = SUM('Portefeuille'[Cotisation])
VAR Denominateur = CALCULATE(SUM('Portefeuille'[Cotisation]), ALL('Portefeuille'))
RETURN DIVIDE(Numerateur, Denominateur)
```

**% de la Sélection avec ALLSELECTED** | Badge: Avancé | Tags: #dax #allselected #pattern #percentage
- Sous-titre: "Part d'une ligne dans la sélection courante du slicer."
- Note 💡: "Différence clé avec ALL : le dénominateur ici tient compte des slicers. Si l'utilisateur filtre sur Nord+Sud, le total = cotisations Nord+Sud. Idéal pour les analyses comparatives."
- Code:
```
Part dans Sélection =
VAR Numerateur   = SUM('Portefeuille'[Cotisation])
VAR Denominateur = CALCULATE(SUM('Portefeuille'[Cotisation]), ALLSELECTED('Portefeuille'))
RETURN DIVIDE(Numerateur, Denominateur)
```

**EARLIER — Colonne calculée** | Badge: Avancé | Tags: #dax #earlier #rowcontext #calculatedcolumn
- Sous-titre: "Comparer chaque ligne à l'ensemble dans une colonne calculée."
- Note 💡: "⚠️ EARLIER ne fonctionne QUE dans une colonne calculée, jamais dans une mesure. Il accède au row context externe dans un iterator imbriqué. Dans la pratique moderne, préférer VAR pour capter la valeur de la ligne courante."
- Code:
```
-- Colonne calculée (pas une mesure !)
Rang par Région =
COUNTROWS(
    FILTER(
        'Portefeuille',
        'Portefeuille'[Region] = EARLIER('Portefeuille'[Region]) &&
        'Portefeuille'[Cotisation] >= EARLIER('Portefeuille'[Cotisation])
    )
)

-- Équivalent moderne avec VAR (recommandé)
Rang par Région V2 =
VAR CotisationCourante = 'Portefeuille'[Cotisation]
VAR RegionCourante     = 'Portefeuille'[Region]
RETURN
    COUNTROWS(
        FILTER(
            'Portefeuille',
            'Portefeuille'[Region] = RegionCourante &&
            'Portefeuille'[Cotisation] >= CotisationCourante
        )
    )
```

---

## Étape 3 — Contraintes à respecter

1. **Aucun doublon** : vérifier avant chaque ajout que la fonction n'existe pas déjà
2. **Respecter le style existant** scrupuleusement : mêmes classes CSS, mêmes structures de données
3. **Ne pas modifier** les snippets existants (COUNTROWS, DISTINCTCOUNT, DIVIDE)
4. **Ne pas toucher** aux autres sections du site (Python, SQL, M, etc.)
5. **Pas de refactoring** du code existant — ajouts ciblés uniquement
6. Les explications sont **en français**
7. Les noms de tables/colonnes dans les exemples utilisent le **contexte assurance** (Portefeuille, Cotisation, Sinistre, Region, Produit, Objectif)
