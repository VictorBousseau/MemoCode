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
                            markdown: `💡 **Pourquoi COUNTROWS ?**
Contrairement à \`COUNT(colonne)\` qui ignore les BLANKs (comme \`df['col'].count()\`), \`COUNTROWS('Table')\` compte simplement les lignes de la table (comme \`len(df)\`). C'est plus rapide et plus sûr pour compter un volume de sinistres.`,
                            code: `Nombre de Sinistres = COUNTROWS('Sinistres')`
                        },
                        {
                            id: 'distinct_count',
                            title: 'Compter les uniques (DISTINCTCOUNT)',
                            description: 'Équivalent de df[\'col\'].nunique().',
                            code: `Nombre Assurés Uniques = DISTINCTCOUNT('Portefeuille'[ID_Assuré])`
                        },
                        {
                            id: 'divide',
                            title: 'Division Sécurisée (DIVIDE)',
                            description: 'Gérer la division par zéro automatiquement.',
                            markdown: `💡 **Pourquoi DIVIDE ?**
L'opérateur \`/\` plante ou renvoie Infinity si le dénominateur est 0.
\`DIVIDE(N, D, 0)\` est l'équivalent d'un \`np.where(D == 0, 0, N / D)\`. Indispensable pour les ratios S/P.`,
                            code: `Ratio S/P = DIVIDE([Montant Sinistres], [Primes Acquises], 0)`
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
                            code: `Part de Marché = 
VAR SinistresAgence = [Montant Sinistres]
VAR SinistresGlobal = CALCULATE([Montant Sinistres], ALL('Agence'))
RETURN
    DIVIDE(SinistresAgence, SinistresGlobal)`
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
                            code: `Prime Totale Ajustée = 
SUMX(
    'Portefeuille',
    'Portefeuille'[Prime de Base] * 'Portefeuille'[Coeff Bonus-Malus]
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
                            markdown: `⚠️ **Attention** : Toutes les fonctions de Time Intelligence (\`TOTALYTD\`, \`SAMEPERIODLASTYEAR\`...) nécessitent une **Table Date** dédiée, marquée comme telle dans le modèle, et reliée à votre table de faits.`
                        },
                        {
                            id: 'totalytd',
                            title: 'Cumul Annuel (YTD)',
                            description: 'Primes encaissées depuis le 1er janvier.',
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
                            markdown: `Pour une table avec \`EmployeeID\` et \`ManagerID\`.`,
                            code: `Chemin Complet = PATH('Employés'[EmployeeID], 'Employés'[ManagerID])
-- Résultat : "1|5|12" (Le chef du chef du chef)`
                        },
                        {
                            id: 'path_item',
                            title: 'Extraire un Niveau (PATHITEM)',
                            description: 'Récupérer le N-ième manager.',
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
                            markdown: `Un sinistre a deux dates : **Survenance** et **Déclaration**.
Mais on ne peut avoir qu'une seule relation active vers la table **Temps**.
La relation active est souvent sur la **Survenance**.
Comment analyser par **Date de Déclaration** sans dupliquer la table Temps ?`
                        },
                        {
                            id: 'userelationship_code',
                            title: 'Solution : USERELATIONSHIP',
                            description: 'Activer une relation inactive à la demande.',
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
                    title: '4. Tips & Bonnes Pratiques',
                    description: 'Le best-of pour briller en DAX.',
                    snippets: [
                        {
                            id: 'measure_branching',
                            title: 'Utiliser des Mesures Explicites',
                            description: 'Ne jamais réécrire une agrégation dans CALCULATE.',
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
                            markdown: `🏷️ **Titre Intelligent**
Créez une mesure pour le titre, puis dans le visuel > Général > Titre > (fx) > Sélectionnez la mesure.`,
                            code: `Titre Dynamique = 
"Analyse des Ventes : " & 
SELECTEDVALUE('Geo'[Pays], "Monde Entier")`
                        }
                    ]
                }
            ]
        }
    ]
};
