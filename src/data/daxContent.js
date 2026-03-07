export const daxContent = {
    themes: [
        {
            id: 'dax_essentials',
            title: 'DAX Essentiels',
            description: 'Les fondations solides (Agrégations, Calculate, Itérateurs).',
            categories: [
                {
                    id: 'aggregations',
                    title: '1. Agrégations Sécurisées',
                    description: 'Compter et Diviser sans erreur.',
                    snippets: [
                        {
                            id: 'count_rows',
                            title: 'Compter le volume (COUNTROWS)',
                            description: 'Le standard pour compter les lignes.',
                            level: 'beginner',
                            tags: ['dax', 'count', 'aggregation'],
                            markdown: `💡 **Pourquoi COUNTROWS ?**
Contrairement à \`COUNT(colonne)\` qui ignore les BLANKs (comme \`df['col'].count()\`), \`COUNTROWS('Table')\` compte simplement les lignes de la table (comme \`len(df)\`). C'est plus rapide et plus sûr pour compter un volume de sinistres.`,
                            code: `Nombre de Sinistres = COUNTROWS('Sinistres')`
                        },
                        {
                            id: 'distinct_count',
                            title: 'Compter les uniques (DISTINCTCOUNT)',
                            description: 'Équivalent de df[\'col\'].nunique().',
                            level: 'beginner',
                            tags: ['dax', 'distinct-count', 'aggregation'],
                            code: `Nombre Assurés Uniques = DISTINCTCOUNT('Portefeuille'[ID_Assuré])`
                        },
                        {
                            id: 'divide',
                            title: 'Division Sécurisée (DIVIDE)',
                            description: 'Gérer la division par zéro automatiquement.',
                            level: 'beginner',
                            tags: ['dax', 'divide', 'math'],
                            markdown: `💡 **Pourquoi DIVIDE ?**
L'opérateur \`/\` plante ou renvoie Infinity si le dénominateur est 0.
\`DIVIDE(N, D, 0)\` est l'équivalent d'un \`np.where(D == 0, 0, N / D)\`. Indispensable pour les ratios S/P.`,
                            code: `Ratio S/P = DIVIDE([Montant Sinistres], [Primes Acquises], 0)`
                        },
                        {
                            id: 'sum_basic',
                            title: 'Somme (SUM)',
                            description: 'Additionner une colonne numérique.',
                            level: 'beginner',
                            tags: ['dax', 'sum', 'aggregation'],
                            markdown: `💡 **SUM et le filter context**
SUM respecte le filter context : un slicer sur la Région ne retournera que les cotisations de cette région. Préférer SUM à SUMX quand aucun calcul ligne à ligne n'est nécessaire.`,
                            code: `Total Cotisations = SUM('Portefeuille'[Cotisation])`
                        },
                        {
                            id: 'average_basic',
                            title: 'Moyenne (AVERAGE)',
                            description: 'Calculer la moyenne d\'une colonne.',
                            level: 'beginner',
                            tags: ['dax', 'average', 'aggregation'],
                            markdown: `💡 **AVERAGE et les valeurs aberrantes**
AVERAGE divise la somme par le nombre de lignes visibles. Sensible aux valeurs aberrantes — envisager AVERAGEX avec un FILTER pour les exclure.`,
                            code: `Cotisation Moyenne = AVERAGE('Portefeuille'[Cotisation])`
                        },
                        {
                            id: 'min_max',
                            title: 'Min / Max (MIN, MAX)',
                            description: 'Valeur minimale ou maximale d\'une colonne.',
                            level: 'beginner',
                            tags: ['dax', 'min', 'max', 'aggregation'],
                            markdown: `💡 **MIN/MAX dans un tableau croisé**
Utile pour les bornes de KPI. Dans un tableau croisé, MIN/MAX retournent le min/max pour chaque contexte de ligne.`,
                            code: `Cotisation Min = MIN('Portefeuille'[Cotisation])
Cotisation Max = MAX('Portefeuille'[Cotisation])`
                        },
                        {
                            id: 'count_numeric',
                            title: 'Compter les numériques (COUNT)',
                            description: 'Compter les valeurs numériques non-vides.',
                            level: 'beginner',
                            tags: ['dax', 'count', 'aggregation'],
                            markdown: `⚠️ **COUNT vs COUNTROWS vs COUNTA**
COUNT ignore les BLANK et ne compte que les colonnes numériques. Pour compter les lignes (même avec des BLANK), utiliser COUNTROWS. Pour les colonnes texte, utiliser COUNTA.`,
                            code: `Nb Contrats Numériques = COUNT('Portefeuille'[Cotisation])`
                        }
                    ]
                },
                {
                    id: 'calculate_context',
                    title: '2. Le Moteur : CALCULATE',
                    description: 'Le "WHERE" dynamique de Power BI.',
                    snippets: [
                        {
                            id: 'calculate_concept',
                            title: 'Concept : CALCULATE',
                            description: 'Comprendre la modification de contexte.',
                            level: 'intermediate',
                            tags: ['dax', 'calculate', 'context'],
                            markdown: `🧠 **Le Cerveau du DAX**
\`CALCULATE\` est la seule fonction qui peut **modifier le contexte de filtre** d'une mesure.
C'est l'équivalent d'un filtre dynamique que vous appliquez par-dessus les filtres choisis par l'utilisateur (Slicers).

**Analogie Pandas :**
\`\`\`python
# Mesure de base
df['Montant'].sum()

# Avec CALCULATE(..., Filter)
df[df['Type'] == 'Auto']['Montant'].sum()
\`\`\``
                        },
                        {
                            id: 'calculate_simple',
                            title: 'CALCULATE Simple',
                            description: 'Surcharger un filtre.',
                            level: 'intermediate',
                            tags: ['dax', 'calculate', 'filter'],
                            code: `Montant Sinistres Auto = 
CALCULATE(
    [Montant Sinistres], 
    'Sinistres'[Type] = "Auto"
)`
                        },
                        {
                            id: 'all_function',
                            title: 'Ignorer les filtres (ALL)',
                            description: 'Calculer des parts de marché (Ratio vs Global).',
                            level: 'intermediate',
                            tags: ['dax', 'all', 'filter'],
                            code: `Part de Marché =
VAR SinistresAgence = [Montant Sinistres]
VAR SinistresGlobal = CALCULATE([Montant Sinistres], ALL('Agence'))
RETURN
    DIVIDE(SinistresAgence, SinistresGlobal)`
                        },
                        {
                            id: 'calculatetable_function',
                            title: 'Table filtrée (CALCULATETABLE)',
                            description: 'Retourner une table filtrée (version table de CALCULATE).',
                            level: 'advanced',
                            tags: ['dax', 'calculatetable', 'context'],
                            markdown: `💡 **CALCULATETABLE vs CALCULATE**
Comme CALCULATE mais retourne une table au lieu d'un scalaire. Utilisé dans des mesures intermédiaires ou avec COUNTROWS/SUMX.`,
                            code: `Contrats Haute Valeur =
CALCULATETABLE(
    'Portefeuille',
    'Portefeuille'[Cotisation] > 5000
)`
                        },
                        {
                            id: 'filter_core',
                            title: 'Filtrer une table (FILTER)',
                            description: 'Filtrer une table selon une condition complexe.',
                            level: 'advanced',
                            tags: ['dax', 'filter', 'context'],
                            markdown: `💡 **Quand utiliser FILTER ?**
FILTER retourne une table et crée un row context. À utiliser dans CALCULATE quand le filtre est complexe (plusieurs colonnes, expressions calculées). Pour des filtres simples sur une colonne, préférer la syntaxe directe dans CALCULATE.`,
                            code: `Cotisations Rentables =
CALCULATE(
    SUM('Portefeuille'[Cotisation]),
    FILTER('Portefeuille', 'Portefeuille'[Sinistre] < 'Portefeuille'[Cotisation])
)`
                        },
                        {
                            id: 'allexcept_function',
                            title: 'Filtres partiels (ALLEXCEPT)',
                            description: 'Supprimer tous les filtres sauf sur certaines colonnes.',
                            level: 'advanced',
                            tags: ['dax', 'allexcept', 'context'],
                            markdown: `💡 **ALLEXCEPT**
ALLEXCEPT('Table', Col1, Col2) supprime tous les filtres de la table SAUF sur Col1 et Col2. Utile pour stabiliser un total par groupe tout en conservant une dimension.`,
                            code: `Cotisations Région (stable) =
CALCULATE(
    SUM('Portefeuille'[Cotisation]),
    ALLEXCEPT('Portefeuille', 'Portefeuille'[Region])
)`
                        },
                        {
                            id: 'allselected_function',
                            title: 'Respecter les slicers (ALLSELECTED)',
                            description: 'Respecter les slicers mais ignorer les filtres visuels.',
                            level: 'advanced',
                            tags: ['dax', 'allselected', 'context'],
                            markdown: `💡 **ALLSELECTED vs ALL**
ALLSELECTED garde les filtres posés par l'utilisateur (slicers) mais ignore les filtres internes au visuel (ex: filtres de lignes d'un tableau). Idéal pour les % dans un tableau avec slicers.`,
                            code: `% Cotisations (sélection) =
DIVIDE(
    SUM('Portefeuille'[Cotisation]),
    CALCULATE(SUM('Portefeuille'[Cotisation]), ALLSELECTED('Portefeuille'))
)`
                        },
                        {
                            id: 'removefilters_function',
                            title: 'Supprimer les filtres (REMOVEFILTERS)',
                            description: 'Supprimer explicitement tous les filtres (alias clair de ALL).',
                            level: 'advanced',
                            tags: ['dax', 'removefilters', 'context'],
                            markdown: `💡 **REMOVEFILTERS vs ALL**
REMOVEFILTERS est fonctionnellement équivalent à ALL mais sémantiquement plus lisible — il exprime clairement l'intention de supprimer des filtres. Préféré dans le code de production.`,
                            code: `Total Global =
CALCULATE(
    SUM('Portefeuille'[Cotisation]),
    REMOVEFILTERS('Portefeuille')
)`
                        },
                        {
                            id: 'keepfilters_function',
                            title: 'Filtres additifs (KEEPFILTERS)',
                            description: 'Ajouter un filtre sans écraser les filtres existants.',
                            level: 'advanced',
                            tags: ['dax', 'keepfilters', 'context'],
                            markdown: `💡 **KEEPFILTERS**
Par défaut, CALCULATE remplace les filtres existants sur une colonne. KEEPFILTERS empêche cet écrasement : le filtre s'ajoute à l'intersection. Évite des bugs silencieux avec les slicers.`,
                            code: `Cotisations Nord (slicer safe) =
CALCULATE(
    SUM('Portefeuille'[Cotisation]),
    KEEPFILTERS('Portefeuille'[Region] = "Nord")
)`
                        }
                    ]
                },
                {
                    id: 'iterators',
                    title: '3. Les Itérateurs (Fonctions "X")',
                    description: 'SUMX, AVERAGEX... Le "Row Context".',
                    snippets: [
                        {
                            id: 'iterators_concept',
                            title: 'Concept : Agrégation vs Itération',
                            description: 'Pourquoi SUM ne suffit pas toujours.',
                            level: 'intermediate',
                            tags: ['dax', 'iterator', 'sumx'],
                            markdown: `🔄 **SUM vs SUMX**
*   \`SUM\` : Fait la somme d'une colonne. (Rapide, mais basique).
*   \`SUMX\` : Itère ligne par ligne, effectue un calcul, PUIS fait la somme.

**Analogie Pandas :**
*   \`SUM\` -> \`df['col'].sum()\`
*   \`SUMX\` -> \`df.apply(lambda row: row['a'] * row['b'], axis=1).sum()\``
                        },
                        {
                            id: 'sumx_example',
                            title: 'Exemple SUMX',
                            description: 'Calcul ligne par ligne avant agrégation.',
                            level: 'intermediate',
                            tags: ['dax', 'sumx', 'iterator'],
                            code: `Prime Totale Ajustée =
SUMX(
    'Portefeuille',
    'Portefeuille'[Prime de Base] * 'Portefeuille'[Coeff Bonus-Malus]
)`
                        },
                        {
                            id: 'averagex_example',
                            title: 'Moyenne calculée (AVERAGEX)',
                            description: 'Moyenne d\'une expression calculée ligne à ligne.',
                            level: 'beginner',
                            tags: ['dax', 'averagex', 'iterator'],
                            markdown: `💡 **AVERAGEX vs AVERAGE**
Contrairement à AVERAGE qui moyenne une colonne existante, AVERAGEX permet de moyenner un calcul (ex: taux de sinistralité par contrat).`,
                            code: `Taux Sinistralité Moyen =
AVERAGEX(
    'Portefeuille',
    DIVIDE('Portefeuille'[Sinistre], 'Portefeuille'[Cotisation])
)`
                        },
                        {
                            id: 'minx_maxx_example',
                            title: 'Min/Max calculé (MINX, MAXX)',
                            description: 'Min ou max d\'une expression calculée ligne à ligne.',
                            level: 'advanced',
                            tags: ['dax', 'minx', 'maxx', 'iterator'],
                            markdown: `💡 **MINX/MAXX vs MIN/MAX**
Utile pour trouver la meilleure/pire performance calculée, pas une valeur brute de colonne.`,
                            code: `Marge Min = MINX('Portefeuille', 'Portefeuille'[Cotisation] - 'Portefeuille'[Sinistre])
Marge Max = MAXX('Portefeuille', 'Portefeuille'[Cotisation] - 'Portefeuille'[Sinistre])`
                        },
                        {
                            id: 'countx_example',
                            title: 'Compter avec condition (COUNTX)',
                            description: 'Compter les lignes où une expression est non-vide.',
                            level: 'advanced',
                            tags: ['dax', 'countx', 'iterator'],
                            markdown: `💡 **COUNTX et les expressions**
COUNTX compte les résultats non-BLANK de l'expression. Ici : compter les contrats en perte (sinistre > cotisation).`,
                            code: `Contrats en Perte =
COUNTX(
    'Portefeuille',
    IF('Portefeuille'[Sinistre] > 'Portefeuille'[Cotisation], 1)
)`
                        }
                    ]
                },
                {
                    id: 'tips',
                    title: '4. Tips & Raccourcis',
                    description: 'Astuces pour gagner du temps.',
                    snippets: [
                        {
                            id: 'keyboard_shortcuts',
                            title: 'Raccourcis Clavier (DAX Studio / Power BI)',
                            description: 'Les raccourcis essentiels pour éditer du code DAX.',
                            level: 'beginner',
                            tags: ['dax', 'tips', 'shortcuts', 'productivity'],
                            markdown: `### ⌨️ Raccourcis Indispensables

#### Commentaires
- **Commenter** : \`Ctrl + K, C\` (ou \`Ctrl + /\`)
- **Décommenter** : \`Ctrl + K, U\` (ou \`Ctrl + /\` à nouveau)

💡 Très utile pour tester différentes versions d'une mesure.

#### Édition
- **Dupliquer une ligne** : \`Ctrl + D\`
- **Déplacer une ligne** : \`Alt + ↑\` / \`Alt + ↓\`
- **Suppression rapide** : \`Ctrl + Shift + K\` (supprime la ligne entière)

#### Navigation
- **Rechercher** : \`Ctrl + F\`
- **Remplacer** : \`Ctrl + H\`
- **Aller à la ligne** : \`Ctrl + G\`

#### Formatage (DAX Studio)
- **Formater le code** : \`F6\` (DAX Studio uniquement)
- **Indentation** : \`Tab\` / \`Shift + Tab\``
                        },
                        {
                            id: 'dax_formatter',
                            title: 'Formater son Code DAX',
                            description: 'Rendre le code lisible et maintenable.',
                            level: 'beginner',
                            tags: ['dax', 'tips', 'formatting', 'best-practices'],
                            markdown: `### 🎨 Pourquoi Formater ?

Un code DAX bien formaté est **10x plus facile** à déboguer et maintenir.

**Outils recommandés :**
1. **DAX Formatter** (en ligne) : [daxformatter.com](https://www.daxformatter.com)
2. **DAX Studio** : Formatage intégré (F6)
3. **Tabular Editor** : Formatage automatique

**Bonnes pratiques :**
- Une ligne par argument de fonction
- Indentation cohérente (4 espaces)
- Variables nommées explicitement
- Commentaires pour la logique complexe`,
                            code: `// ❌ MAL FORMATÉ
Ratio = DIVIDE(CALCULATE(SUM(Ventes[Montant]),Ventes[Statut]="Payé"),CALCULATE(SUM(Ventes[Montant]),ALL(Ventes[Statut])))

// ✅ BIEN FORMATÉ
Ratio = 
VAR VentesPayees = 
    CALCULATE(
        SUM(Ventes[Montant]),
        Ventes[Statut] = "Payé"
    )
VAR VentesTotales = 
    CALCULATE(
        SUM(Ventes[Montant]),
        ALL(Ventes[Statut])
    )
RETURN
    DIVIDE(VentesPayees, VentesTotales)`
                        },
                        {
                            id: 'dax_variables',
                            title: 'Utiliser les Variables (VAR)',
                            description: 'Clarté + Performance en un seul mot-clé.',
                            level: 'intermediate',
                            tags: ['dax', 'tips', 'var', 'performance'],
                            markdown: `### 🚀 Double Bénéfice des Variables

**1. Lisibilité** : Nommer les étapes intermédiaires
**2. Performance** : DAX calcule chaque VAR une seule fois (pas de recalcul)

**Règle d'or :**
> Si vous utilisez la même expression 2+ fois → VAR obligatoire !

**Exemple typique :**`,
                            code: `// ❌ SANS VAR : [Montant Total] est calculé 2 fois !
Rentabilité % = 
DIVIDE(
    [Montant Total] - [Coûts],
    [Montant Total]
)

// ✅ AVEC VAR : [Montant Total] n'est calculé qu'UNE fois
Rentabilité % =
VAR Total = [Montant Total]
VAR Profit = Total - [Coûts]
RETURN
    DIVIDE(Profit, Total)`
                        }
                    ]
                },
                {
                    id: 'logic_conditions',
                    title: '5. Logique & Conditions',
                    description: 'IF, SWITCH, opérateurs logiques et gestion des erreurs.',
                    snippets: [
                        {
                            id: 'if_function',
                            title: 'Condition simple (IF)',
                            description: 'Condition simple vrai/faux.',
                            level: 'beginner',
                            tags: ['dax', 'if', 'logic'],
                            markdown: `💡 **IF dans une mesure**
IF dans une mesure s'applique au niveau du filter context (pas ligne par ligne). Pour du ligne à ligne, utiliser IF dans une colonne calculée ou dans un SUMX/COUNTX.`,
                            code: `Statut Contrat =
IF(
    'Portefeuille'[Sinistre] > 'Portefeuille'[Cotisation],
    "Déficitaire",
    "Rentable"
)`
                        },
                        {
                            id: 'switch_true',
                            title: 'Multi-conditions (SWITCH TRUE)',
                            description: 'Classification multi-conditions lisible.',
                            level: 'beginner',
                            tags: ['dax', 'switch', 'logic'],
                            markdown: `💡 **Pattern SWITCH(TRUE())**
SWITCH(TRUE(), ...) est le pattern idiomatique DAX pour remplacer les IF imbriqués. Les conditions sont évaluées dans l'ordre — dès qu'une est vraie, SWITCH retourne le résultat associé.`,
                            code: `Catégorie Cotisation =
SWITCH(
    TRUE(),
    'Portefeuille'[Cotisation] >= 10000, "Haute",
    'Portefeuille'[Cotisation] >= 5000,  "Moyenne",
    "Faible"
)`
                        },
                        {
                            id: 'and_or_logic',
                            title: 'Opérateurs logiques (AND, OR, NOT)',
                            description: 'Combiner des conditions logiques.',
                            level: 'beginner',
                            tags: ['dax', 'and', 'or', 'logic'],
                            markdown: `💡 **&& et || vs AND() et OR()**
En DAX, && et || sont les équivalents opérateurs de AND() et OR(). Préférer && et || pour la lisibilité dans les expressions complexes.`,
                            code: `Contrat à Risque =
IF(
    'Portefeuille'[Sinistre] > 'Portefeuille'[Cotisation] &&
    'Portefeuille'[Cotisation] < 'Portefeuille'[Objectif],
    "Risque élevé",
    "OK"
)`
                        },
                        {
                            id: 'iferror_coalesce',
                            title: 'Gestion des erreurs (IFERROR, COALESCE)',
                            description: 'Gérer les erreurs et les valeurs nulles.',
                            level: 'beginner',
                            tags: ['dax', 'iferror', 'coalesce', 'error-handling'],
                            markdown: `💡 **IFERROR vs COALESCE vs DIVIDE**
IFERROR capture toute erreur de calcul. COALESCE retourne la première valeur non-BLANK parmi ses arguments — plus léger qu'un IF(ISBLANK(...)). Pour les divisions, préférer DIVIDE() qui gère nativement le zéro.`,
                            code: `Taux Sécurisé = IFERROR(DIVIDE([Sinistres], [Cotisations]), 0)
Cotisation Fallback = COALESCE('Portefeuille'[Cotisation], 0)`
                        },
                        {
                            id: 'selectedvalue_function',
                            title: 'Valeur du slicer (SELECTEDVALUE)',
                            description: 'Récupérer la valeur sélectionnée dans un slicer.',
                            level: 'beginner',
                            tags: ['dax', 'selectedvalue', 'context'],
                            markdown: `💡 **SELECTEDVALUE**
SELECTEDVALUE retourne la valeur de la colonne si et seulement si une seule valeur est sélectionnée dans le filter context. Sinon retourne la valeur de remplacement. Parfait pour les titres dynamiques.`,
                            code: `Titre Région =
SELECTEDVALUE(
    'Portefeuille'[Region],
    "Toutes régions"
)`
                        },
                        {
                            id: 'hasonevalue_isinscope',
                            title: 'Granularité du visuel (HASONEVALUE, ISINSCOPE)',
                            description: 'Détecter le niveau de granularité dans un visuel.',
                            level: 'advanced',
                            tags: ['dax', 'hasonevalue', 'isinscope', 'context'],
                            markdown: `💡 **HASONEVALUE vs ISINSCOPE**
HASONEVALUE vérifie qu'une seule valeur est dans le context. ISINSCOPE détecte si une colonne est active dans une hiérarchie (matrice). Utiles pour adapter le comportement d'une mesure selon le niveau d'affichage.`,
                            code: `KPI Adaptatif =
IF(
    ISINSCOPE('Portefeuille'[Produit]),
    SUM('Portefeuille'[Cotisation]),
    BLANK()
)`
                        }
                    ]
                }
            ]
        },
        {
            id: 'dax_time',
            title: 'Time Intelligence',
            description: 'Comparer N vs N-1, YTD, MTD.',
            categories: [
                {
                    id: 'time_intelligence',
                    title: '1. Fonctions Temporelles',
                    description: 'Comparer N vs N-1, YTD, etc.',
                    snippets: [
                        {
                            id: 'time_prereq',
                            title: 'Pré-requis : Table Date',
                            description: 'Indispensable pour ces fonctions.',
                            level: 'intermediate',
                            tags: ['dax', 'time-intelligence', 'date-table'],
                            markdown: `⚠️ **Attention** : Toutes les fonctions de Time Intelligence (\`TOTALYTD\`, \`SAMEPERIODLASTYEAR\`...) nécessitent une **Table Date** dédiée, marquée comme telle dans le modèle, et reliée à votre table de faits.`
                        },
                        {
                            id: 'totalytd',
                            title: 'Cumul Annuel (YTD)',
                            description: 'Primes encaissées depuis le 1er janvier.',
                            level: 'intermediate',
                            tags: ['dax', 'ytd', 'time-intelligence'],
                            code: `Primes YTD = 
TOTALYTD(
    [Primes Acquises],
    'Temps'[Date]
)`
                        },
                        {
                            id: 'sameperiod',
                            title: 'Comparaison N-1',
                            description: 'Pour calculer l\'évolution.',
                            level: 'intermediate',
                            tags: ['dax', 'same-period', 'time-intelligence'],
                            code: `Primes N-1 = 
CALCULATE(
    [Primes Acquises],
    SAMEPERIODLASTYEAR('Temps'[Date])
)

Evolution Primes = DIVIDE([Primes Acquises] - [Primes N-1], [Primes N-1])`
                        },
                        {
                            id: 'dateadd',
                            title: 'Décalage Flexible (DATEADD)',
                            description: 'Comparer au mois ou trimestre précédent.',
                            level: 'intermediate',
                            tags: ['dax', 'dateadd', 'time-intelligence'],
                            code: `Primes Trimestre Précédent = 
CALCULATE(
    [Primes Acquises],
    DATEADD('Temps'[Date], -1, QUARTER)
)`
                        }
                    ]
                }
            ]
        },
        {
            id: 'dax_expert',
            title: 'Expert & Best Practices',
            description: 'Patterns avancés, Optimisation et UX.',
            categories: [
                {
                    id: 'virtual_tables',
                    title: '1. Tables Virtuelles & GroupBy',
                    description: 'SUMMARIZE et ADDCOLUMNS.',
                    snippets: [
                        {
                            id: 'groupby_problem',
                            title: 'Le Problème : Moyenne des Sommes',
                            description: 'Comment faire un panier moyen par agence ?',
                            level: 'advanced',
                            tags: ['dax', 'virtual-table', 'summarize'],
                            markdown: `🤔 **Le défi**
Si vous faites \`AVERAGE(Ventes)\`, vous faites la moyenne de toutes les lignes.
Mais si vous voulez la **moyenne des chiffres d'affaires par Agence**, il faut d'abord grouper par Agence, sommer les ventes, PUIS faire la moyenne.

**En Pandas :**
\`df.groupby('Agence')['Ventes'].sum().mean()\``
                        },
                        {
                            id: 'virtual_table_solution',
                            title: 'La Solution : Table Virtuelle',
                            description: 'Le pattern ultime pour les calculs complexes.',
                            level: 'advanced',
                            tags: ['dax', 'addcolumns', 'summarize'],
                            code: `Panier Moyen Agence = 
VAR TableVirtuelle = 
    ADDCOLUMNS(
        SUMMARIZE('Portefeuille', 'Agence'[NomAgence]),
        "@CA_Agence", [Primes Acquises]
    )

RETURN
    AVERAGEX(TableVirtuelle, [@CA_Agence])`
                        }
                    ]
                },
                {
                    id: 'advanced_patterns',
                    title: '2. Patterns Data Science',
                    description: 'Moyenne Mobile et Classement.',
                    snippets: [
                        {
                            id: 'moving_average',
                            title: 'Moyenne Mobile (Lissage)',
                            description: 'Lisser la volatilité sur 3 mois.',
                            level: 'advanced',
                            tags: ['dax', 'moving-average', 'time-intelligence'],
                            code: `Sinistres Lissés (3 mois) = 
CALCULATE(
    [Montant Sinistres],
    DATESINPERIOD(
        'Temps'[Date],
        LASTDATE('Temps'[Date]),
        -3,
        MONTH
    )
) / 3`
                        },
                        {
                            id: 'rankx',
                            title: 'Classement Dynamique (RANKX)',
                            description: 'Top N Agences.',
                            level: 'advanced',
                            tags: ['dax', 'rankx', 'ranking'],
                            code: `Rang Agence = 
RANKX(
    ALL('Agence'[NomAgence]), -- ALL est crucial pour comparer à toutes les agences
    [Primes Acquises],
    ,
    DESC
)`
                        }
                    ]
                },

                {
                    id: 'context_transition',
                    title: '3. Context Transition',
                    description: 'Le concept le plus complexe et puissant.',
                    snippets: [
                        {
                            id: 'context_transition_concept',
                            title: 'Row Context -> Filter Context',
                            description: 'Comment une ligne devient un filtre.',
                            level: 'advanced',
                            tags: ['dax', 'context-transition', 'concept'],
                            markdown: `🧠 **Le Concept Clé**
Le **Context Transition** est le mécanisme par lequel un **Row Context** (itération ligne par ligne) est transformé en un **Filter Context** équivalent.

Il est déclenché automatiquement par \`CALCULATE\`.

**Exemple :**
Dans une colonne calculée \`[Ventes Max]\` :
\`\`\`dax
= CALCULATE( MAX(Ventes[Montant]) )
\`\`\`
1. On est dans une colonne calculée -> Row Context (on voit la ligne actuelle).
2. \`CALCULATE\` invoque le Context Transition.
3. Le Row Context (ex: Produit="A", Date="2023-01-01") devient un Filter Context.
4. Le calcul \`MAX\` se fait uniquement sur les lignes filtrées par ce nouveau contexte.`
                        },
                        {
                            id: 'context_transition_measure',
                            title: 'Appeler une Mesure',
                            description: 'Une mesure a un CALCULATE implicite.',
                            level: 'advanced',
                            tags: ['dax', 'context-transition', 'measure'],
                            markdown: `⚠️ **Piège Classique**
Appeler une mesure dans un itérateur (comme \`SUMX\`) déclenche le Context Transition, car une mesure est toujours entourée d'un \`CALCULATE\` implicite.

\`\`\`dax
-- Ce code déclenche le Context Transition pour chaque ligne de 'Produit'
SUMX(
    'Produit',
    [Total Ventes] -- = CALCULATE(SUM(Ventes[Montant]))
)
\`\`\``
                        }
                    ]
                },
                {
                    id: 'semi_additive',
                    title: '4. Semi-Additive Measures',
                    description: 'Stocks et Soldes (Opening/Closing).',
                    snippets: [
                        {
                            id: 'semi_additive_concept',
                            title: 'Le Problème des Stocks',
                            description: 'On ne somme pas des stocks dans le temps.',
                            level: 'advanced',
                            tags: ['dax', 'semi-additive', 'inventory'],
                            markdown: `📉 **Pourquoi Semi-Additif ?**
*   **Additif** : Les ventes (On peut sommer sur les régions ET sur le temps).
*   **Semi-Additif** : Les stocks (On peut sommer sur les régions, mais **PAS sur le temps**).
    *   Stock Janvier : 100
    *   Stock Février : 120
    *   Stock Total : 220 ? ❌ NON ! C'est 120 (le dernier stock).`
                        },
                        {
                            id: 'closing_balance',
                            title: 'Closing Balance (Stock Fin)',
                            description: 'Prendre la valeur de la dernière date.',
                            level: 'advanced',
                            tags: ['dax', 'closing-balance', 'inventory'],
                            code: `Stock Fin de Période = 
CALCULATE(
    SUM('Stock'[Quantité]),
    LASTDATE('Temps'[Date])
)`
                        },
                        {
                            id: 'opening_balance',
                            title: 'Opening Balance (Stock Début)',
                            description: 'Prendre la valeur de la veille du début.',
                            level: 'advanced',
                            tags: ['dax', 'opening-balance', 'inventory'],
                            code: `Stock Début de Période = 
CALCULATE(
    SUM('Stock'[Quantité]),
    PREVIOUSDAY(FIRSTDATE('Temps'[Date]))
)`
                        }
                    ]
                },
                {
                    id: 'hierarchies',
                    title: '5. Hiérarchies Parent-Enfant',
                    description: 'Gérer les organigrammes (PATH).',
                    snippets: [
                        {
                            id: 'path_function',
                            title: 'Aplatir la Hiérarchie (PATH)',
                            description: 'Créer une chaîne de tous les parents.',
                            level: 'advanced',
                            tags: ['dax', 'path', 'hierarchy'],
                            markdown: `Pour une table avec \`EmployeeID\` et \`ManagerID\`.`,
                            code: `Chemin Complet = PATH('Employés'[EmployeeID], 'Employés'[ManagerID])
-- Résultat : "1|5|12" (Le chef du chef du chef)`
                        },
                        {
                            id: 'path_item',
                            title: 'Extraire un Niveau (PATHITEM)',
                            description: 'Récupérer le N-ième manager.',
                            level: 'advanced',
                            tags: ['dax', 'pathitem', 'hierarchy'],
                            markdown: `### 📊 Exemple Concret
Imaginons une chaîne hiérarchique avec des **Identifiants Employés (ID)** :
*   **CEO** (ID = 1)
*   **Directeur** (ID = 5) -> Son chef est le 1
*   **Manager** (ID = 12) -> Son chef est le 5

Le chemin (\`PATH\`) calculé pour le Manager (12) est donc : \`"1|5|12"\`.

| Niveau | Fonction | Résultat | Rôle |
| :--- | :--- | :--- | :--- |
| **1** | \`PATHITEM(Path, 1)\` | **1** | CEO |
| **2** | \`PATHITEM(Path, 2)\` | **5** | Directeur |
| **3** | \`PATHITEM(Path, 3)\` | **12** | Manager |
 
### 🎯 À quoi ça sert ?
Une fois ces colonnes calculées (\`Niveau 1\`, \`Niveau 2\`...), vous pouvez :
1.  **Créer une Matrice** : Mettez *Niveau 1*, *Niveau 2*, *Niveau 3* en lignes pour permettre le "Drill Down".
2.  **Filtrer toute une branche** :
    \`\`\`dax
    -- Calculer les ventes de toute l'équipe du Directeur 5
    Ventes Equipe Directeur = 
    CALCULATE(
        [Total Ventes],
        'Employés'[Niveau 2] = "5" 
        -- Filtre automatiquement le Directeur 5 ET ses Managers (12...)
    )
    \`\`\``,
                            code: `Niveau 1 (CEO) = PATHITEM([Chemin Complet], 1)
Niveau 2 (Directeur) = PATHITEM([Chemin Complet], 2)
Niveau 3 (Manager) = PATHITEM([Chemin Complet], 3)`
                        }
                    ]
                },
                {
                    id: 'relationships',
                    title: '6. Relations Multiples',
                    description: 'USERELATIONSHIP pour les dates multiples.',
                    snippets: [
                        {
                            id: 'userelationship_concept',
                            title: 'Problème : Dates Multiples',
                            description: 'Survenance vs Déclaration.',
                            level: 'advanced',
                            tags: ['dax', 'userelationship', 'relationship'],
                            markdown: `Un sinistre a deux dates : **Survenance** et **Déclaration**.
Mais on ne peut avoir qu'une seule relation active vers la table **Temps**.
La relation active est souvent sur la **Survenance**.
Comment analyser par **Date de Déclaration** sans dupliquer la table Temps ?`
                        },
                        {
                            id: 'userelationship_code',
                            title: 'Solution : USERELATIONSHIP',
                            description: 'Activer une relation inactive à la demande.',
                            level: 'advanced',
                            tags: ['dax', 'userelationship', 'relationship'],
                            code: `Sinistres (Vue Déclaration) = 
CALCULATE(
    [Montant Sinistres],
    USERELATIONSHIP('Sinistres'[DateDeclaration], 'Temps'[Date])
)`
                        }
                    ]
                },
                {
                    id: 'tips_practices',
                    title: '7. Tips & Bonnes Pratiques',
                    description: 'Le best-of pour briller en DAX.',
                    snippets: [
                        {
                            id: 'measure_branching',
                            title: 'Utiliser des Mesures Explicites',
                            description: 'Ne jamais réécrire une agrégation dans CALCULATE.',
                            level: 'intermediate',
                            tags: ['dax', 'best-practice', 'measure'],
                            markdown: `💡 **La Règle d'Or : Measure Branching**

Il ne faut jamais écrire l'agrégation directement dans un \`CALCULATE\`.
Créez d'abord une mesure de base, puis réutilisez-la.

**Pourquoi ?**
1.  **Maintenance** : Si la définition du KPI change (ex: on exclut les statuts "Brouillon"), vous ne modifiez que la mesure de base.
2.  **Lisibilité** : \`[Nb Propos]\` est plus clair que \`DISTINCTCOUNT('Table'[ID])\`.
3.  **Performance** : Le moteur DAX optimise mieux la réutilisation.`,
                            code: `-- ❌ À éviter (Code dupliqué et rigide)
CALCULATE(
    DISTINCTCOUNT('Propositions'[ID_Propo]), 
    'Propositions'[Statut] = "Gagné"
)

-- ✅ Bonne pratique (Réutilisation)
-- 1. On crée la mesure de base
[Nb Propos] = DISTINCTCOUNT('Propositions'[ID_Propo])

-- 2. On l'utilise dans le contexte
[Nb Propos Gagnés] = CALCULATE(
    [Nb Propos], 
    'Propositions'[Statut] = "Gagné"
)`
                        },
                        {
                            id: 'variables_var',
                            title: 'Variables (VAR / RETURN)',
                            description: 'Performance et Lisibilité.',
                            level: 'intermediate',
                            tags: ['dax', 'variables', 'var'],
                            markdown: `💡 **Pourquoi utiliser des Variables ?**

1.  **Performance** : Une variable est calculée **une seule fois**, même si elle est utilisée plusieurs fois dans le RETURN.
2.  **Débogage** : Permet de décomposer une formule complexe étape par étape.
3.  **Lisibilité** : Donne un nom explicite aux étapes intermédiaires.`,
                            code: `Croissance YoY = 
VAR _VentesAnneeN = [Ventes Total]
VAR _VentesAnneeN_1 = CALCULATE([Ventes Total], SAMEPERIODLASTYEAR('Temps'[Date]))
VAR _Difference = _VentesAnneeN - _VentesAnneeN_1

RETURN
    DIVIDE(_Difference, _VentesAnneeN_1, 0)`
                        },
                        {
                            id: 'filter_columns',
                            title: 'Filtrer les Colonnes, pas les Tables',
                            description: 'Optimisation majeure de performance.',
                            level: 'intermediate',
                            tags: ['dax', 'filter', 'performance'],
                            markdown: `⚠️ **Attention à FILTER()**

\`FILTER('Table', ...)\` scanne **toute la table** (toutes les colonnes). C'est très lent sur les gros volumes.
Préférez filtrer uniquement la colonne nécessaire avec \`VALUES\` ou \`ALL\`.`,
                            code: `-- ❌ LENT (Charge toute la table en mémoire)
CALCULATE(
    [Mesure],
    FILTER('Grosses Ventes', 'Grosses Ventes'[Region] = "Europe")
)

-- ✅ RAPIDE (Ne scanne que la colonne Region)
CALCULATE(
    [Mesure],
    KEEPFILTERS('Grosses Ventes'[Region] = "Europe")
)
-- OU
CALCULATE(
    [Mesure],
    FILTER(
        VALUES('Grosses Ventes'[Region]), 
        'Grosses Ventes'[Region] = "Europe"
    )
)`
                        },
                        {
                            id: 'dynamic_format',
                            title: 'Formatage Dynamique',
                            description: 'Changer le format selon la valeur.',
                            level: 'intermediate',
                            tags: ['dax', 'format', 'dynamic'],
                            markdown: `💡 **Format Strings**
Vous pouvez utiliser la fonction \`FORMAT\` pour convertir un nombre en texte formaté.
Utile pour des cartes (KPIs) ou des titres, mais attention : le résultat est du **TEXTE** (ne peut pas être mis sur un axe Y).`,
                            code: `Label KPI = 
VAR _Val = [Mon KPI]
RETURN
    SWITCH(TRUE(),
        _Val >= 1000000, FORMAT(_Val, "#,0.0,, M€"),
        _Val >= 1000, FORMAT(_Val, "#,0.0, k€"),
        FORMAT(_Val, "#,0 €")
    )`
                        },
                        {
                            id: 'conditional_color',
                            title: 'Couleur Dynamique (FX)',
                            description: 'Contrôler la couleur des barres.',
                            level: 'intermediate',
                            tags: ['dax', 'color', 'visualization'],
                            markdown: `🎨 **Mise en Forme Conditionnelle**
Créez une mesure qui renvoie un code couleur Hex ou un nom de couleur.
Ensuite, dans le visuel > Colonnes > Couleur (fx) > Style du format : "Valeur du champ" > Sélectionnez cette mesure.`,
                            code: `Couleur KPI = 
IF(
    [Variation vs N-1] >= 0,
    "#10b981", -- Vert (Positif)
    "#ef4444"  -- Rouge (Négatif)
)`
                        },
                        {
                            id: 'dynamic_title',
                            title: 'Titre de Visuel Dynamique',
                            description: 'Afficher la sélection en cours.',
                            level: 'intermediate',
                            tags: ['dax', 'title', 'visualization'],
                            markdown: `🏷️ **Titre Intelligent**
Créez une mesure pour le titre, puis dans le visuel > Général > Titre > (fx) > Sélectionnez la mesure.`,
                            code: `Titre Dynamique = 
"Analyse des Ventes : " & 
SELECTEDVALUE('Geo'[Pays], "Monde Entier")`
                        }
                    ]
                },
                {
                    id: 'dynamic_features',
                    title: '8. Fonctionnalités Dynamiques (Expert)',
                    description: 'Calculation Groups & Field Parameters.',
                    snippets: [
                        {
                            id: 'calculation_groups',
                            title: 'Calculation Groups',
                            description: 'Changer la logique de calcul dynamiquement (YTD, MTD...).',
                            level: 'advanced',
                            tags: ['dax', 'calculation-groups', 'dynamic'],
                            markdown: `🚀 **La Révolution des Calculation Groups**
Au lieu de créer 3 mesures pour chaque KPI (\`Ventes\`, \`Ventes YTD\`, \`Ventes YoY\`), vous créez un **Groupe de Calcul**.

**Exemple d'Item de Calcul (YTD) :**
\`\`\`dax
CALCULATE(
    SELECTEDMEASURE(), -- Remplace la mesure utilisée dans le visuel
    DATESYTD('Temps'[Date])
)
\`\`\`
Ensuite, l'utilisateur choisit "YTD" dans un segment, et **toutes** les mesures du graphique passent en YTD.`
                        },
                        {
                            id: 'field_parameters',
                            title: 'Field Parameters',
                            description: 'Laisser l\'utilisateur choisir l\'axe ou la mesure.',
                            level: 'advanced',
                            tags: ['dax', 'field-parameters', 'dynamic'],
                            markdown: `🎛️ **Paramètres de Champs**
Permet de changer dynamiquement les axes ou les légendes d'un graphique.

**Comment faire :**
1. Onglet **Modélisation** > **Nouveau paramètre** > **Champs**.
2. Sélectionnez les champs (ex: Pays, Produit, Segment).
3. Cela crée une table spéciale.
4. Mettez cette colonne dans l'axe X de votre graphique.

L'utilisateur peut maintenant cliquer sur "Pays" ou "Produit" pour changer l'analyse instantanément.`
                        }
                    ]
                },
                {
                    id: 'patterns_avances',
                    title: '9. Patterns Avancés',
                    description: '% du total, % de la sélection et EARLIER.',
                    snippets: [
                        {
                            id: 'percent_total_all',
                            title: '% du Total (ALL)',
                            description: 'Part de chaque ligne dans le total global.',
                            level: 'advanced',
                            tags: ['dax', 'all', 'pattern', 'percentage'],
                            markdown: `💡 **Pattern % du Total**
Le numérateur garde le filter context du visuel. Le dénominateur utilise ALL() pour effacer tous les filtres et obtenir le total absolu. Ce pattern fonctionne dans toutes les versions de Power BI.`,
                            code: `Part des Cotisations =
VAR Numerateur   = SUM('Portefeuille'[Cotisation])
VAR Denominateur = CALCULATE(SUM('Portefeuille'[Cotisation]), ALL('Portefeuille'))
RETURN DIVIDE(Numerateur, Denominateur)`
                        },
                        {
                            id: 'percent_selection_allselected',
                            title: '% de la Sélection (ALLSELECTED)',
                            description: 'Part d\'une ligne dans la sélection courante du slicer.',
                            level: 'advanced',
                            tags: ['dax', 'allselected', 'pattern', 'percentage'],
                            markdown: `💡 **Différence clé avec ALL**
Le dénominateur ici tient compte des slicers. Si l'utilisateur filtre sur Nord+Sud, le total = cotisations Nord+Sud. Idéal pour les analyses comparatives.`,
                            code: `Part dans Sélection =
VAR Numerateur   = SUM('Portefeuille'[Cotisation])
VAR Denominateur = CALCULATE(SUM('Portefeuille'[Cotisation]), ALLSELECTED('Portefeuille'))
RETURN DIVIDE(Numerateur, Denominateur)`
                        },
                        {
                            id: 'earlier_pattern',
                            title: 'Rang dans une colonne calculée (EARLIER)',
                            description: 'Comparer chaque ligne à l\'ensemble dans une colonne calculée.',
                            level: 'advanced',
                            tags: ['dax', 'earlier', 'row-context', 'calculated-column'],
                            markdown: `⚠️ **EARLIER — Colonnes calculées uniquement**
EARLIER ne fonctionne QUE dans une colonne calculée, jamais dans une mesure. Il accède au row context externe dans un iterator imbriqué. Dans la pratique moderne, préférer VAR pour capter la valeur de la ligne courante.`,
                            code: `-- Colonne calculée (pas une mesure !)
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
    )`
                        }
                    ]
                }
            ]
        }
    ]
};
