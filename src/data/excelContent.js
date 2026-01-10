export const excelContent = {
    themes: [
        {
            id: 'admin_basics',
            title: '1. Bases Administratives',
            description: 'Les fondamentaux pour l\'administratif au quotidien',
            categories: [
                {
                    id: 'formulas_basics',
                    title: 'Formules Essentielles',
                    description: 'Calculs simples et logiques de base',
                    snippets: [
                        {
                            id: 'sum_avg',
                            title: 'Somme et Moyenne',
                            description: 'Les calculs les plus fréquents.',
                            level: 'beginner',
                            tags: ['formules', 'math', 'bases'],
                            code: `=SOMME(A1:A10)       ' Additionne les cellules de A1 à A10
=MOYENNE(B2:B20)     ' Calcule la moyenne de la plage
=NB(C1:C100)         ' Compte le nombre de cellules contenant des nombres
=NBVAL(D1:D100)      ' Compte le nombre de cellules non vides (texte ou nombre)`
                        },
                        {
                            id: 'if_logic',
                            title: 'La fonction SI (Logique)',
                            description: 'Prendre une décision basée sur une condition.',
                            level: 'beginner',
                            tags: ['formules', 'logique', 'si'],
                            code: `=SI(A2>10; "Validé"; "Refusé")
' Si la valeur en A2 est supérieure à 10, affiche "Validé", sinon "Refusé"

=SI(B2=""; "Manquant"; B2)
' Si B2 est vide, écrit "Manquant", sinon garde la valeur de B2`
                        },
                        {
                            id: 'text_basics',
                            title: 'Manipulation de Texte Simple',
                            description: 'Coller des textes ou changer la casse.',
                            level: 'beginner',
                            tags: ['texte', 'concatener', 'majuscule'],
                            code: `=CONCATENER(A2; " "; B2)   ' Colle le contenu de A2, un espace, et B2
=A2 & " " & B2             ' Méthode plus rapide avec le symbole &

=MAJUSCULE(A2)             ' Met tout en MAJUSCULES
=MINUSCULE(A2)             ' Met tout en minuscules
=NOMPROPRE(A2)             ' Met la Première Lettre En Majuscule`
                        },
                        {
                            id: 'date_basics',
                            title: 'Gestion des Dates',
                            description: 'Calculer des dates et délais.',
                            level: 'beginner',
                            tags: ['dates', 'temps', 'delai'],
                            code: `=AUJOURDHUI()            ' Affiche la date du jour (se met à jour auto)
=MAINTENANT()            ' Affiche la date et l'heure actuelles

=FIN.MOIS(A2; 1)         ' Donne le dernier jour du mois suivant la date en A2
=DATEDIF(A2; B2; "y")    ' Calcule le nbr d'années complètes entre deux dates (Age)`
                        }
                    ]
                },
                {
                    id: 'formatting',
                    title: 'Mise en Forme & Impression',
                    description: 'Rendre les tableaux lisibles et imprimables',
                    snippets: [
                        {
                            id: 'cond_formatting',
                            title: 'Mise en Forme Conditionnelle',
                            description: 'Colorer automatiquement selon la valeur.',
                            level: 'beginner',
                            tags: ['format', 'couleur', 'visuel'],
                            markdown: `### Mettre en évidence les données
1. Sélectionnez vos données (ex: colonne "Montant")
2. Onglet **Accueil** > **Mise en forme conditionnelle**
3. Choisissez une règle :
   * **Règles de mise en surbrillance** > *Supérieur à...* (pour alerter sur les gros montants)
   * **Barres de données** (pour visualiser des proportions directement dans la cellule)
   * **Nuances de couleurs** (pour faire une carte de chaleur)`
                        },
                        {
                            id: 'print_area',
                            title: 'Définir la Zone d\'impression',
                            description: 'Imprimer seulement ce qui est utile.',
                            level: 'beginner',
                            tags: ['impression', 'pdf', 'mise-en-page'],
                            markdown: `### Éviter d'imprimer 50 pages vides
1. Sélectionnez exactement le tableau que vous voulez imprimer
2. Onglet **Mise en page** > **Zone d'impression** > **Définir**
3. Astuce : Dans l'onglet **Mise en page**, cliquez sur **Mise à l'échelle : Ajuster à : 1 page en largeur** pour que tout tienne sur une feuille.`
                        },
                        {
                            id: 'freeze_panes',
                            title: 'Figer les Volets',
                            description: 'Garder les titres visibles en scrollant.',
                            level: 'beginner',
                            tags: ['affichage', 'titres', 'visibilité'],
                            markdown: `### Garder la 1ère ligne visible
1. Allez dans l'onglet **Affichage**
2. Cliquez sur **Figer les volets**
3. Choisissez **Figer la ligne supérieure**

*Pour figer à la fois les lignes du haut et les colonnes de gauche :*
1. Cliquez sur la cellule **juste en dessous et à droite** de ce que vous voulez figer (ex: B2 pour figer la ligne 1 et la colonne A)
2. **Figer les volets** > **Figer les volets**`
                        }
                    ]
                }
            ]
        },
        {
            id: 'data_manipulation',
            title: '2. Manipulation de Données',
            description: 'Trier, filtrer et nettoyer des bases de données',
            categories: [
                {
                    id: 'sort_filter',
                    title: 'Trier et Filtrer',
                    description: 'Retrouver l\'information rapidement',
                    snippets: [
                        {
                            id: 'filter_basics',
                            title: 'Mettre des Filtres',
                            description: 'La base de l\'exploration de données.',
                            level: 'beginner',
                            tags: ['filtre', 'trier', 'données'],
                            markdown: `### Activer les filtres
1. Cliquez sur une cellule de votre tableau
2. Raccourci : **CTRL + MAJ + L** (ou Onglet **Données** > **Filtrer**)
3. Utilisez les petites flèches en haut des colonnes pour :
   * Trier par ordre alphabétique / croissant
   * Cocher/décocher des valeurs spécifiques
   * Faire des "Filtres textuels" (ex: "Contient...")`
                        }
                    ]
                },
                {
                    id: 'cleaning_excel',
                    title: 'Nettoyage de Données',
                    description: 'Préparer des fichiers "sales".',
                    snippets: [
                        {
                            id: 'remove_duplicates',
                            title: 'Supprimer les Doublons',
                            description: 'Nettoyer une liste.',
                            level: 'intermediate',
                            tags: ['doublons', 'nettoyage', 'unique'],
                            markdown: `### Retirer les lignes répétées
1. Sélectionnez votre tableau
2. Onglet **Données** > **Supprimer les doublons**
3. Cochez les colonnes qui définissent un doublon (souvent toutes, ou juste "Email" ou "ID")
4. Validez.`
                        },
                        {
                            id: 'text_to_columns',
                            title: 'Convertir (Texte en Colonnes)',
                            description: 'Séparer Prénom/Nom ou refaire une date.',
                            level: 'intermediate',
                            tags: ['convertir', 'csv', 'séparer'],
                            markdown: `### Cas classique : Tout est dans la colonne A (format CSV)
1. Sélectionnez la colonne A
2. Onglet **Données** > **Convertir**
3. Choisissez **Délimité**
4. Cochez le séparateur (Virgule, Point-virgule, Espace...)
5. Terminez.

*Astuce : Utile aussi quand des dates sont reconnues comme du texte. À l'étape 3, choisissez "Date : JJ/MM/AAAA".*`
                        }
                    ]
                },
                {
                    id: 'lookup_functions',
                    title: 'Recherche & Croisements',
                    description: 'Lier deux tableaux entre eux (VLOOKUP).',
                    snippets: [
                        {
                            id: 'vlookup',
                            title: 'RECHERCHEV (Classique)',
                            description: 'Récupérer une info dans une autre table.',
                            level: 'intermediate',
                            tags: ['recherche', 'jointure', 'vlookup'],
                            code: `=RECHERCHEV(H2; A:C; 3; FAUX)
' H2 : La valeur qu'on cherche (ex: "ID_Client")
' A:C : La table où on cherche (la clé DOIT être en 1ère colonne, ici A)
' 3   : On veut récupérer la valeur de la 3ème colonne (C)
' FAUX: On veut une correspondance EXACTE (très important)`
                        },
                        {
                            id: 'xlookup',
                            title: 'RECHERCHEX (Moderne)',
                            description: 'Plus puissant et plus simple que RechercheV (Excel 2021+).',
                            level: 'advanced',
                            tags: ['recherchex', 'xlookup', 'moderne'],
                            code: `=RECHERCHEX(H2; A:A; C:C; "Pas trouvé")
' H2 : La valeur cherchée
' A:A : La colonne où chercher la clé
' C:C : La colonne dont on veut le résultat
' "Pas trouvé" : (Optionnel) Ce qu'on affiche si ça n'existe pas
' Avantage : Pas besoin de compter les colonnes, marche vers la gauche.`
                        }
                    ]
                },
                {
                    id: 'pivot_tables',
                    title: 'Tableaux Croisés Dynamiques (TCD)',
                    description: 'Analyser et synthétiser les données.',
                    snippets: [
                        {
                            id: 'create_tcd',
                            title: 'Créer un TCD',
                            description: 'Faire des statistiques en 3 clics.',
                            level: 'intermediate',
                            tags: ['tcd', 'pivot', 'analyse'],
                            markdown: `### Synthétiser une grosse base
1. Cliquez dans votre grand tableau
2. Onglet **Insertion** > **Tableau Croisé Dynamique**
3. Validez
4. Dans le volet à droite, glissez :
   * **Lignes** : Une catégorie (ex: "Mois" ou "Vendeur")
   * **Valeurs** : Un chiffre (ex: "Chiffre d'Affaires"). *Vérifiez que c'est bien "Somme" et pas "Nombre".*`
                        }
                    ]
                }
            ]
        },
        {
            id: 'shortcuts',
            title: '3. Raccourcis Utiles',
            description: 'Gagner du temps clavier en main',
            categories: [
                {
                    id: 'shortcuts_nav',
                    title: 'Navigation & Sélection',
                    description: 'Bouger vite dans le tableau',
                    snippets: [
                        {
                            id: 'move_fast',
                            title: 'Déplacement Rapide',
                            description: 'Aller au bout du monde.',
                            level: 'beginner',
                            tags: ['raccourci', 'navigation', 'clavier'],
                            markdown: `| Raccourci | Action |
| :--- | :--- |
| **CTRL + Flèches** | Aller à la dernière cellule remplie dans cette direction |
| **CTRL + Début** | Retourner tout en haut (A1) |
| **CTRL + Fin** | Aller à la toute dernière cellule utilisée |
| **PG.SUIV / PG.PREC** | Changer d'onglet (Feuille suivante / précédente) |`
                        },
                        {
                            id: 'select_fast',
                            title: 'Sélection Rapide',
                            description: 'Tout prendre d\'un coup.',
                            level: 'beginner',
                            tags: ['raccourci', 'sélection', 'clavier'],
                            markdown: `| Raccourci | Action |
| :--- | :--- |
| **CTRL + A** | Tout sélectionner (le tableau actuel) |
| **MAJ + Flèches** | Étendre la sélection cellule par cellule |
| **CTRL + MAJ + Flèches** | Sélectionner tout jusqu'à la fin (Ex: toute la colonne) |
| **MAJ + Espace** | Sélectionner la ligne entière |
| **CTRL + Espace** | Sélectionner la colonne entière |`
                        }
                    ]
                },
                {
                    id: 'shortcuts_edit',
                    title: 'Édition & Format',
                    description: 'Modifier sans la souris',
                    snippets: [
                        {
                            id: 'edit_common',
                            title: 'Édition Courante',
                            description: 'Copier, coller et plus.',
                            level: 'beginner',
                            tags: ['raccourci', 'édition', 'format'],
                            markdown: `| Raccourci | Action |
| :--- | :--- |
| **F2** | Modifier la cellule active (rentrer dedans) |
| **F4** | Répéter la dernière action OU Figer les dollars ($A$1) dans une formule |
| **ALT + ENTRÉE** | Revenir à la ligne DANS une cellule |
| **CTRL + ;** | Insérer la date du jour |
| **CTRL + :** | Insérer l'heure actuelle |
| **CTRL + %** | Mettre en format Pourcentage |
| **CTRL + MAJ + 1** | Mettre en format Nombre (avec séparateur milliers) |`
                        }
                    ]
                }
            ]
        }
    ]
};
