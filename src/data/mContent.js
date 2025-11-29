export const mContent = {
    themes: [
        {
            id: 'power_query_ui',
            title: 'Tutoriels Interface (UI)',
            description: 'Guides pas-à-pas pour les actions courantes via l\'interface.',
            categories: [
                {
                    id: 'columns_ui',
                    title: '1. Colonnes & Transformations',
                    description: 'Manipulations classiques sans coder.',
                    snippets: [
                        {
                            id: 'conditional_col',
                            title: 'Colonne Conditionnelle',
                            description: 'Créer une colonne basée sur des règles (If/Else).',
                            markdown: `### 📝 Marche à suivre
1. Allez dans l'onglet **Ajouter une colonne**.
2. Cliquez sur **Colonne conditionnelle**.
3. Dans la fenêtre :
   - Nommez votre nouvelle colonne (ex: "Catégorie Age").
   - **Si** [Age] est supérieur à 18 **Alors** "Majeur".
   - **Sinon** "Mineur".
4. Validez. Power Query génère le code \`Table.AddColumn\` pour vous.`
                        },
                        {
                            id: 'unpivot',
                            title: 'Dépivoter (Unpivot)',
                            description: 'Passer de colonnes larges (Jan, Fév, Mars) à des lignes.',
                            markdown: `### 🔄 Transformer des colonnes en lignes
Souvent utile quand vous avez une colonne par mois/année.

1. Sélectionnez les colonnes qui **ne doivent pas bouger** (les identifiants, ex: Produit, Pays).
2. Faites un **Clic Droit** sur l'entête d'une de ces colonnes.
3. Choisissez **Dépivoter les autres colonnes**.
4. Résultat : Vous obtenez deux nouvelles colonnes "Attribut" (les mois) et "Valeur" (les montants).`
                        },
                        {
                            id: 'split_col',
                            title: 'Fractionner une colonne',
                            description: 'Séparer du texte (ex: Nom Prénom).',
                            markdown: `### ✂️ Découper du texte
1. Sélectionnez la colonne à couper.
2. Onglet **Accueil** > **Fractionner la colonne**.
3. Choisissez **Par délimiteur**.
4. Sélectionnez le séparateur (Espace, Virgule, Tiret...).
5. Validez.`
                        }
                    ]
                },
                {
                    id: 'combine_ui',
                    title: '2. Combiner des Données',
                    description: 'Fusionner et Ajouter (Merge & Append).',
                    snippets: [
                        {
                            id: 'merge_queries',
                            title: 'Fusionner (Merge / VLOOKUP)',
                            description: 'Joindre deux tables via une clé commune.',
                            markdown: `### 🔗 Fusionner des requêtes
1. Onglet **Accueil** > **Fusionner des requêtes**.
2. Sélectionnez la première table (en haut) et la deuxième (en bas).
3. Cliquez sur la colonne commune dans les deux tables (la clé de jointure).
4. Choisissez le type de jointure (ex: **Externe gauche** pour garder tout le monde de la 1ère table).
5. Une fois la colonne "Table" créée, cliquez sur les deux petites flèches en haut à droite de la cellule pour **développer** et choisir les champs à récupérer.`
                        }
                    ]
                },
                {
                    id: 'advanced_ui',
                    title: '3. Transformations Avancées',
                    description: 'Regrouper, Pivoter et Combiner.',
                    snippets: [
                        {
                            id: 'groupby_ui',
                            title: 'Regrouper par (Group By)',
                            description: 'Agréger les données (Somme, Compte, Max...).',
                            markdown: `### 📊 Agréger des lignes
1. Sélectionnez la colonne de regroupement (ex: "Pays").
2. Onglet **Accueil** > **Regrouper par**.
3. Choisissez l'opération (ex: Somme) et la colonne à calculer (ex: "Ventes").
4. Validez.`
                        },
                        {
                            id: 'pivot_ui',
                            title: 'Pivoter (Pivot Column)',
                            description: 'Passer de lignes à colonnes (Inverse de Unpivot).',
                            markdown: `### 🔄 Transformer des lignes en colonnes
Utile pour créer des tableaux croisés.

1. Sélectionnez la colonne qui deviendra les entêtes (ex: "Mois").
2. Onglet **Transformer** > **Colonne de tableau croisé dynamique**.
3. Dans "Colonne de valeurs", choisissez les chiffres (ex: "Montant").
4. Validez.`
                        },
                        {
                            id: 'combine_files',
                            title: 'Combiner des fichiers',
                            description: 'Traiter tout un dossier d\'un coup.',
                            markdown: `### 📁 Importer un dossier
1. **Obtenir les données** > **Dossier**.
2. Sélectionnez le chemin.
3. Cliquez sur **Combiner et Transformer**.
4. Power Query va appliquer les transformations faites sur le "Premier Fichier" à **tous** les fichiers du dossier automatiquement.`
                        }
                    ]
                }
            ]
        },
        {
            id: 'm_language',
            title: 'Décoder le Code M',
            description: 'Comprendre ce qui se passe dans l\'Éditeur Avancé.',
            categories: [
                {
                    id: 'm_structure',
                    title: '1. Structure & Syntaxe',
                    description: 'Comment lire le code M.',
                    snippets: [
                        {
                            id: 'let_in',
                            title: 'Bloc let ... in',
                            description: 'La structure fondamentale d\'une requête.',
                            code: `let
    // "let" contient la liste des étapes
    Source = Excel.Workbook(File.Contents("data.xlsx")),
    
    // Chaque étape fait référence à la précédente (ici "Source")
    Sheet1 = Source{[Item="Sheet1",Kind="Sheet"]}[Data],
    
    // Les noms d'étapes avec espaces doivent être entre #"..."
    #"En-têtes Promus" = Table.PromoteHeaders(Sheet1)
in
    // "in" définit ce qui est renvoyé à la fin (généralement la dernière étape)
    #"En-têtes Promus"`
                        },
                        {
                            id: 'step_reference',
                            title: 'Référencer une étape',
                            description: 'Pourquoi voit-on des #"..." partout ?',
                            markdown: `### 🏷️ Les noms d'étapes
En M, chaque ligne est une variable.
- Si le nom est simple : \`Source\`
- Si le nom contient des espaces ou caractères spéciaux : \`#"Type Modifié"\`

C'est pour cela que vous voyez souvent :
\`\`\`powerquery
= Table.SelectRows(#"Etape Précédente", each [Age] > 18)
\`\`\`
`
                        }
                    ]
                },
                {
                    id: 'm_types',
                    title: '2. Les Types de Données',
                    description: 'Listes, Enregistrements et Tables.',
                    snippets: [
                        {
                            id: 'lists_records',
                            title: 'Listes {} et Records []',
                            description: 'Les briques de base du M.',
                            code: `// Une Liste (List) : Entre accolades {}
MaListe = {1, 2, 3, "A", "B"}

// Un Enregistrement (Record) : Entre crochets []
// C'est comme une ligne unique avec des champs nommés
MonRecord = [ Nom = "Dupont", Age = 30, Ville = "Paris" ]

// Accéder aux données :
Item1 = MaListe{0}      // Index base 0 -> 1
Nom = MonRecord[Nom]    // -> "Dupont"`
                        },
                        {
                            id: 'each_keyword',
                            title: 'Le mot-clé "each"',
                            description: 'Comprendre les fonctions simplifiées.',
                            markdown: `### 🔄 Que veut dire \`each\` ?
C'est un raccourci syntaxique pour créer une fonction qui prend un paramètre (la ligne en cours).

\`\`\`powerquery
// Version longue
Table.AddColumn(Source, "Double", (row) => row[Valeur] * 2)

// Version avec "each" (plus courante)
// "_" représente la ligne en cours (le record)
Table.AddColumn(Source, "Double", each _[Valeur] * 2)

// Raccourci ultime (si le contexte est clair)
Table.AddColumn(Source, "Double", each [Valeur] * 2)
\`\`\`
`
                        }
                    ]
                },
                {
                    id: 'common_functions',
                    title: '3. Fonctions Utiles',
                    description: 'Quelques fonctions à connaître.',
                    snippets: [
                        {
                            id: 'date_funcs',
                            title: 'Dates',
                            description: 'Manipuler le temps.',
                            code: `// Obtenir la date du jour
Date.From(DateTime.LocalNow())

// Extraire des parties
Date.Year([MaDate])
Date.Month([MaDate])
Date.StartOfMonth([MaDate])

// Calculer une durée
Duration.Days(Date.From(DateTime.LocalNow()) - [DateNaissance])`
                        },
                        {
                            id: 'text_funcs',
                            title: 'Texte',
                            description: 'Nettoyer et modifier.',
                            code: `// Majuscule / Minuscule
Text.Upper("bonjour")
Text.Lower("BONJOUR")

// Remplacer
Text.Replace("123-456", "-", "")

// Longueur
Text.Length("Mot")

// Contient (sensible à la casse !)
Text.Contains("Hello World", "World")`
                        }
                    ]
                },
                {
                    id: 'error_handling',
                    title: '4. Gestion des Erreurs',
                    description: 'Try ... Otherwise et Inspection.',
                    snippets: [
                        {
                            id: 'try_otherwise',
                            title: 'Try ... Otherwise',
                            description: 'Gérer les erreurs sans planter la requête.',
                            code: `// Si [Montant] / [Quantité] échoue (ex: div par 0), renvoie 0
try [Montant] / [Quantité] otherwise 0`
                        },
                        {
                            id: 'error_record',
                            title: 'Inspecter l\'erreur (Record)',
                            description: 'Récupérer le détail de l\'erreur.',
                            code: `// "try" seul renvoie un Record complet [HasError, Error, Value]
Resultat = try [Montant] / [Quantité]

// On peut tester s'il y a une erreur
if Resultat[HasError] then "Erreur : " & Resultat[Error][Message] else Resultat[Value]`
                        },
                        {
                            id: 'replace_errors',
                            title: 'Remplacer les erreurs',
                            description: 'Nettoyer une table entière.',
                            code: `// Équivalent du "Remplacer les erreurs" de l'interface
// Remplace les erreurs de la colonne "Montant" par 0
Table.ReplaceErrorValues(Source, {{"Montant", 0}})`
                        },
                        {
                            id: 'preventive_filtering',
                            title: 'Filtrage Préventif',
                            description: 'Exclure les lignes en erreur AVANT conversion.',
                            markdown: `### 🛡️ Mieux vaut prévenir que guérir
Au lieu de gérer l'erreur après coup, filtrez les lignes qui vont planter.

**Cas concret :** Vous devez convertir une colonne "Date" qui contient parfois "N/A" ou "Inconnu".

\`\`\`powerquery
// On garde uniquement les lignes où la conversion en Date est possible
Table.SelectRows(Source, each (try Date.From([MaColonneDate]))[HasError] = false)
\`\`\`
Cela évite de casser toute la requête pour quelques lignes mal formées.`
                        }
                    ]
                }
            ]
        },
        {
            id: 'm_advanced',
            title: 'Power Query Avancé',
            description: 'Fonctions personnalisées et Optimisation.',
            categories: [
                {
                    id: 'functions_params',
                    title: '1. Fonctions & Paramètres',
                    description: 'Rendre le code dynamique.',
                    snippets: [
                        {
                            id: 'create_function',
                            title: 'Créer une Fonction (UI & Code)',
                            description: 'Comment définir une fonction réutilisable.',
                            markdown: `### 🛠️ Créer une fonction
1. **Clic droit** dans le panneau de gauche > **Nouvelle requête** > **Autres sources** > **Requête vide**.
2. Ouvrez l'**Éditeur Avancé**.
3. Remplacez le code par votre fonction :

\`\`\`powerquery
(PrixHT as number) as number =>
let
    TVA = 0.20,
    PrixTTC = PrixHT * (1 + TVA)
in
    PrixTTC
\`\`\`
4. Renommez la requête (ex: \`CalculTVA\`). Elle a maintenant une icône "fx".`
                        },
                        {
                            id: 'invoke_function',
                            title: 'Appeler la Fonction',
                            description: 'Utiliser votre fonction dans une colonne.',
                            code: `// Méthode 1 : Via l'interface
// Onglet "Ajouter une colonne" > "Invoquer une fonction personnalisée"
// Sélectionnez "CalculTVA" et mappez le paramètre "PrixHT" à votre colonne [Montant].

// Méthode 2 : En M direct
Table.AddColumn(Source, "Montant TTC", each CalculTVA([Montant]))`
                        },
                        {
                            id: 'parameters',
                            title: 'Utiliser des Paramètres',
                            description: 'Filtrer dynamiquement (Année, Chemin fichier...).',
                            markdown: `### 🎛️ Les Paramètres
Utile pour changer une valeur partout sans modifier le code.

**Création :**
1. **Accueil** > **Gérer les paramètres** > **Nouveau paramètre**.
2. Nom : \`AnneeCible\`, Type : \`Nombre\`, Valeur : \`2023\`.

**Utilisation :**
\`\`\`powerquery
// Filtrer la table sur ce paramètre
Table.SelectRows(Source, each [Annee] = AnneeCible)
\`\`\`
Si vous changez la valeur du paramètre, toutes les requêtes qui l'utilisent se mettent à jour.`
                        }
                    ]
                },
                {
                    id: 'performance',
                    title: '2. Performance',
                    description: 'Optimiser les requêtes.',
                    snippets: [
                        {
                            id: 'query_folding',
                            title: 'Query Folding (Pliage)',
                            description: 'Laisser la base de données travailler.',
                            markdown: `### 🚀 Le Query Folding
C'est la capacité de Power Query à traduire vos étapes M en SQL natif.

**Pourquoi c'est important ?**
- Si le pliage fonctionne : Le serveur SQL filtre les données AVANT de les envoyer. (Rapide)
- Si le pliage casse : Power Query télécharge TOUT et filtre en local. (Lent)

**Ce qui casse le pliage :**
- Fonctions M complexes sans équivalent SQL.
- Index ajouté trop tôt.
- Changement de types de données complexes.`
                        },
                        {
                            id: 'table_buffer',
                            title: 'Table.Buffer (Optimisation)',
                            description: 'Accélérer les jointures (Merges).',
                            markdown: `### ⚡ Booster vos Fusions (Merges)
**Le Problème :**
Vous avez une grosse table de faits (Ventes, 1M lignes) et vous fusionnez avec une petite table de dimension (Produits, 100 lignes).
Parfois, Power Query recharge la table Produits **pour chaque ligne** de Ventes. C'est très lent.

**La Solution :**
Mettez la petite table en mémoire RAM avec \`Table.Buffer\`.

\`\`\`powerquery
let
    SourceVentes = ...,
    SourceProduits = ...,
    
    // On force le chargement en mémoire de la petite table
    ProduitsBuffer = Table.Buffer(SourceProduits),
    
    // La fusion se fait maintenant en mémoire (beaucoup plus rapide)
    Fusion = Table.NestedJoin(SourceVentes, "ID_Prod", ProduitsBuffer, "ID_Prod", "Produits", JoinKind.LeftOuter)
in
    Fusion
\`\`\`

⚠️ **Attention :** Ne faites JAMAIS ça sur la grosse table (Ventes), sinon vous allez saturer la mémoire de votre PC.`
                        },
                        {
                            id: 'best_practices',
                            title: 'Bonnes & Mauvaises Pratiques',
                            description: 'Ce qui tue la performance sur les gros volumes.',
                            markdown: `### 🛑 À NE PAS FAIRE (Performance Killers)
1.  **Fusionner deux grosses tables (Fact-to-Fact)** : C'est très coûteux en mémoire. Essayez de le faire en SQL ou modélisez en étoile (Star Schema) dans Power BI.
2.  **Trier (Sort) des millions de lignes** : Inutile si c'est pour un rapport agrégé. Ne triez qu'à la toute fin si nécessaire.
3.  **Group By massif** : Si vous avez 10M de lignes, le Group By en Power Query sera lent. Préférez une vue SQL ou laissez le moteur DAX de Power BI faire l'agrégation.

### ✅ À FAIRE ABSOLUMENT
1.  **Filtrer tôt** : Supprimez les lignes et colonnes inutiles dès la première étape. Moins de données = plus de vitesse.
2.  **Utiliser des Vues SQL** : Si possible, faites vos jointures et nettoyages lourds dans une Vue SQL. Power Query n'aura qu'à lire le résultat "propre".
3.  **Types de données** : Mettez les bons types (Date, Nombre) le plus tôt possible pour permettre le Query Folding.`
                        },
                        {
                            id: 'volume_optimization',
                            title: 'Optimisation du Volume',
                            description: 'Réduire la taille du modèle (Cardinalité).',
                            markdown: `### 📉 Réduire la taille du fichier
La taille d'un modèle Power BI dépend surtout de la **Cardinalité** (nombre de valeurs uniques dans une colonne).

**1. La Cardinalité : L'ennemi n°1**
- Une colonne avec 1 million de lignes mais seulement 2 valeurs uniques (ex: "Oui"/"Non") prend très peu de place.
- Une colonne avec 1 million de lignes et 1 million de valeurs uniques (ex: ID, GUID) prend énormément de place.
👉 **Conseil :** Supprimez les IDs techniques s'ils ne servent pas aux relations.

**2. Le Piège du DateTime**
- Une colonne \`DateTime\` (01/01/2023 14:05:32) a une cardinalité énorme (chaque seconde est unique).
👉 **Conseil :** Séparez en deux colonnes : une \`Date\` (faible cardinalité) et une \`Heure\` (si vraiment nécessaire).

**3. Colonnes Inutiles**
- Ne gardez que ce qui est affiché dans le rapport ou utilisé dans les calculs. Tout le reste doit disparaître.`
                        }
                    ]
                },
                {
                    id: 'modeling',
                    title: '3. Modélisation & Relations',
                    description: 'Préparer les données pour le modèle en étoile.',
                    snippets: [
                        {
                            id: 'relationships_best_practices',
                            title: 'Bonnes Pratiques Relationnelles',
                            description: '1-à-Plusieurs vs Plusieurs-à-Plusieurs.',
                            markdown: `### 🌟 Le Modèle en Étoile (Star Schema)
C'est la structure idéale pour Power BI.

**✅ Relation 1-à-Plusieurs (1:*)**
- C'est le standard. Une table de **Dimension** (Produits, Clients) filtre une table de **Faits** (Ventes).
- **Côté "1" (Dimension)** : La clé doit être UNIQUE. Utilisez \`Supprimer les doublons\` dans Power Query pour le garantir.
- **Côté "*" (Faits)** : La clé peut apparaître plusieurs fois.

**⚠️ Relation Plusieurs-à-Plusieurs (*:*)**
- À éviter si possible. Cela arrive quand vous essayez de lier deux tables de Faits directement (ex: Ventes Budget vs Ventes Réelles).
- **Risques** : Ambiguïté dans les filtres, performances dégradées, résultats inattendus.
- **Solution** : Créez une table de Dimension commune (ex: Table "Dates" ou "Produits") qui filtrera les deux tables de Faits.`
                        }
                    ]
                }
            ]
        }
    ]
};
