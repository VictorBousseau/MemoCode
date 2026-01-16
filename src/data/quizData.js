// Quiz Data Structure for MemoCode
// Contains quizzes for Python, SQL, DAX, etc.

// ----------------------------------------------------------------------
// PYTHON QUESTION BANKS
// ----------------------------------------------------------------------

const pythonQuestionBanks = {
    // PANDAS BASICS (20 questions)
    pandas_basics: [
        { id: 'p_b1', type: 'mcq', question: 'Quelle est la structure de données principale de pandas ?', options: ['List', 'Dictionary', 'DataFrame', 'Array'], correctAnswer: 2, explanation: 'Le DataFrame est la structure principale.' },
        { id: 'p_b2', type: 'code-completion', question: 'Complétez pour importer pandas :', code: 'import pandas as __', correctAnswer: 'pd', explanation: 'L\'alias standard est pd.' },
        { id: 'p_b3', type: 'mcq', question: 'Comment lire un fichier CSV ?', options: ['pd.read_csv()', 'pd.import_csv()', 'pd.load_csv()', 'pd.csv()'], correctAnswer: 0, explanation: 'pd.read_csv() est la fonction standard.' },
        { id: 'p_b4', type: 'code-completion', question: 'Complétez pour afficher les 5 premières lignes :', code: 'df.____()', correctAnswer: 'head', explanation: 'head() affiche les premières lignes.' },
        { id: 'p_b5', type: 'mcq', question: 'Comment sélectionner une colonne "Age" ?', options: ['df.get("Age")', 'df["Age"]', 'df.select("Age")', 'df("Age")'], correctAnswer: 1, explanation: 'La syntaxe standard est df["colonne"].' },
        { id: 'p_b6', type: 'true-false', question: 'Un DataFrame peut contenir différents types de données.', correctAnswer: true, explanation: 'Oui, contrairement aux arrays NumPy.' },
        { id: 'p_b7', type: 'mcq', question: 'Attribut pour voir les dimensions du DataFrame ?', options: ['df.size', 'df.shape', 'df.dim', 'df.len'], correctAnswer: 1, explanation: 'df.shape retourne (lignes, colonnes).' },
        { id: 'p_b8', type: 'code-completion', question: 'Méthode pour les statistiques descriptives :', code: 'df.________()', correctAnswer: 'describe', explanation: 'describe() donne moyenne, min, max, etc.' },
        { id: 'p_b9', type: 'mcq', question: 'Comment supprimer une colonne ?', options: ['df.remove()', 'df.delete()', 'df.drop()', 'del df'], correctAnswer: 2, explanation: 'df.drop(columns=...) est la méthode recommandée.' },
        { id: 'p_b10', type: 'code-completion', question: 'Complétez pour trier par "Date" :', code: 'df.__________("Date")', correctAnswer: 'sort_values', explanation: 'sort_values() trie le DataFrame.' },
        { id: 'p_b11', type: 'mcq', question: 'Comment gérer les valeurs manquantes ?', options: ['fillna()', 'fixna()', 'replacena()', 'nonull()'], correctAnswer: 0, explanation: 'fillna() remplit les valeurs manquantes.' },
        { id: 'p_b12', type: 'mcq', question: 'Méthode pour supprimer les doublons ?', options: ['unique()', 'drop_duplicates()', 'distinct()', 'dedup()'], correctAnswer: 1, explanation: 'drop_duplicates() supprime les lignes dupliquées.' },
        { id: 'p_b13', type: 'code-completion', question: 'Complétez pour grouper par "Ville" :', code: 'df._______("Ville")', correctAnswer: 'groupby', explanation: 'groupby() crée des groupes de données.' },
        { id: 'p_b14', type: 'true-false', question: 'loc[] utilise des labels (noms).', correctAnswer: true, explanation: 'Vrai, loc utilise les labels, iloc utilise les index.' },
        { id: 'p_b15', type: 'code-completion', question: 'Sélectionner par position (index) :', code: 'df.____[0]', correctAnswer: 'iloc', explanation: 'iloc utilise la position entière.' },
        { id: 'p_b16', type: 'mcq', question: 'Quelle méthode permet de renommer des colonnes ?', options: ['rename()', 'change_columns()', 'set_columns()', 'modify()'], correctAnswer: 0, explanation: 'rename() permet de changer le nom des colonnes.' },
        { id: 'p_b17', type: 'code-completion', question: 'Complétez pour voir les valeurs manquantes :', code: 'df.______()', correctAnswer: 'isna', explanation: 'isna() (ou isnull()) retourne un DataFrame de booléens.' },
        { id: 'p_b18', type: 'true-false', question: 'iloc[] permet de sélectionner par nom de colonne.', correctAnswer: false, explanation: 'Faux, iloc utilise les positions numériques. loc utilise les labels.' },
        { id: 'p_b19', type: 'mcq', question: 'Comment exporter un DataFrame vers Excel ?', options: ['to_excel()', 'export_excel()', 'save_excel()', 'write_excel()'], correctAnswer: 0, explanation: 'to_excel() exporte vers un fichier Excel.' },
        { id: 'p_b20', type: 'code-completion', question: 'Complétez pour voir les types de données :', code: 'df.______', correctAnswer: 'dtypes', explanation: 'dtypes affiche le type de chaque colonne.' }
    ],

    // PANDAS INTERMEDIATE (20 questions)
    pandas_intermediate: [
        { id: 'p_i1', type: 'mcq', question: 'Quelle méthode applique une fonction sur chaque ligne ?', options: ['map()', 'apply()', 'transform()', 'run()'], correctAnswer: 1, explanation: 'apply() permet d\'appliquer une fonction.' },
        { id: 'p_i2', type: 'code-completion', question: 'Fusionner deux DataFrames (jointure) :', code: 'pd._____(df1, df2, on="key")', correctAnswer: 'merge', explanation: 'merge() réalise des jointures type SQL.' },
        { id: 'p_i3', type: 'mcq', question: 'Comment gérer les dates ?', options: ['to_datetime()', 'parse_date()', 'read_date()', 'convert_date()'], correctAnswer: 0, explanation: 'pd.to_datetime() convertit en objets datetime.' },
        { id: 'p_i4', type: 'code-completion', question: 'Tableau croisé dynamique :', code: 'df.___________(index="A", columns="B", values="C")', correctAnswer: 'pivot_table', explanation: 'pivot_table() crée un tableau croisé.' },
        { id: 'p_i5', type: 'mcq', question: 'Quelle méthode concatène verticalement ?', options: ['pd.concat()', 'pd.append()', 'pd.join()', 'pd.stack()'], correctAnswer: 0, explanation: 'pd.concat([df1, df2]) est la méthode standard.' },
        { id: 'p_i6', type: 'mcq', question: 'Quelle méthode permet de filtrer avec une syntaxe SQL-like ?', options: ['query()', 'filter()', 'where()', 'select()'], correctAnswer: 0, explanation: 'query() permet d\'utiliser des expressions comme "age > 18".' },
        { id: 'p_i7', type: 'code-completion', question: 'Complétez pour créer une colonne conditionnelle :', code: 'df["new"] = np.______(condition, value_if_true, value_if_false)', correctAnswer: 'where', explanation: 'np.where() applique une condition if-else vectorisée.' },
        { id: 'p_i8', type: 'true-false', question: 'La méthode map() fonctionne uniquement sur les Series, pas sur les DataFrames.', correctAnswer: true, explanation: 'Vrai, map() est une méthode de Series. Pour DataFrame, utilisez applymap().' },
        { id: 'p_i9', type: 'mcq', question: 'Comment extraire l\'année d\'une colonne de dates ?', options: ['dt.year', 'year()', 'extract_year()', 'get_year()'], correctAnswer: 0, explanation: 'L\'accesseur .dt permet d\'accéder aux propriétés datetime.' },
        { id: 'p_i10', type: 'code-completion', question: 'Complétez pour joindre sur plusieurs colonnes :', code: 'pd.merge(df1, df2, ____=["col1", "col2"])', correctAnswer: 'on', explanation: 'Le paramètre on accepte une liste de colonnes.' },
        { id: 'p_i11', type: 'mcq', question: 'Quelle est la différence entre concat() et merge() ?', options: ['concat empile, merge joint', 'identiques', 'concat est plus rapide', 'merge empile'], correctAnswer: 0, explanation: 'concat() empile (vertical/horizontal), merge() joint sur des clés.' },
        { id: 'p_i12', type: 'code-completion', question: 'Complétez pour réinitialiser l\'index :', code: 'df._________(drop=True)', correctAnswer: 'reset_index', explanation: 'reset_index() recrée un index séquentiel 0, 1, 2...' },
        { id: 'p_i13', type: 'true-false', question: 'groupby().agg() peut appliquer plusieurs fonctions différentes sur différentes colonnes.', correctAnswer: true, explanation: 'Vrai, on peut passer un dictionnaire {colonne: fonction}.' },
        { id: 'p_i14', type: 'mcq', question: 'Comment transformer une colonne texte en minuscules ?', options: ['str.lower()', 'lowercase()', 'to_lower()', 'lower()'], correctAnswer: 0, explanation: 'L\'accesseur .str donne accès aux méthodes de chaînes.' },
        { id: 'p_i15', type: 'code-completion', question: 'Complétez pour diviser une colonne sur un séparateur :', code: 'df["col"].str.______(",")', correctAnswer: 'split', explanation: 'str.split() divise une chaîne en liste.' },
        { id: 'p_i16', type: 'mcq', question: 'Comment remplacer des valeurs spécifiques ?', options: ['replace()', 'substitute()', 'change()', 'swap()'], correctAnswer: 0, explanation: 'replace() permet de remplacer une ou plusieurs valeurs.' },
        { id: 'p_i17', type: 'code-completion', question: 'Complétez pour filtrer les lignes contenant "Paris" :', code: 'df[df["ville"].str.______("Paris")]', correctAnswer: 'contains', explanation: 'str.contains() vérifie si une chaîne contient un motif.' },
        { id: 'p_i18', type: 'true-false', question: 'La méthode value_counts() retourne les résultats triés par fréquence décroissante.', correctAnswer: true, explanation: 'Vrai, par défaut value_counts() trie du plus fréquent au moins fréquent.' },
        { id: 'p_i19', type: 'mcq', question: 'Comment créer une nouvelle colonne avec une valeur constante ?', options: ['df["col"] = value', 'df.set()', 'df.add_column()', 'df.insert()'], correctAnswer: 0, explanation: 'L\'assignation simple df["nouvelle"] = valeur fonctionne.' },
        { id: 'p_i20', type: 'code-completion', question: 'Complétez pour arrondir les valeurs numériques :', code: 'df["prix"].______(2)', correctAnswer: 'round', explanation: 'round() arrondit à n décimales.' }
    ],

    // PANDAS ADVANCED (20 questions)
    pandas_advanced: [
        { id: 'p_a1', type: 'mcq', question: 'Optimisation mémoire : quel type pour les catégories ?', options: ['object', 'string', 'category', 'factor'], correctAnswer: 2, explanation: 'Le type "category" économise beaucoup de mémoire.' },
        { id: 'p_a2', type: 'code-completion', question: 'Fenêtre glissante (rolling window) :', code: 'df._______(window=3).mean()', correctAnswer: 'rolling', explanation: 'rolling() permet des calculs sur fenêtre glissante.' },
        { id: 'p_a3', type: 'mcq', question: 'Comment remodeler de large à long ?', options: ['melt()', 'pivot()', 'stack()', 'unpivot()'], correctAnswer: 0, explanation: 'melt() transforme les colonnes en lignes (format long).' },
        { id: 'p_a4', type: 'mcq', question: 'Quel est l\'intérêt de MultiIndex ?', options: ['Hiérarchie de données', 'Plus rapide', 'Moins de mémoire', 'Meilleur tri'], correctAnswer: 0, explanation: 'MultiIndex permet de créer des index à plusieurs niveaux hiérarchiques.' },
        { id: 'p_a5', type: 'code-completion', question: 'Complétez pour une somme cumulative :', code: 'df["cumsum"] = df["value"]._______()', correctAnswer: 'cumsum', explanation: 'cumsum() calcule la somme cumulative.' },
        { id: 'p_a6', type: 'true-false', question: 'eval() permet d\'optimiser des opérations arithmétiques complexes.', correctAnswer: true, explanation: 'Vrai, eval() est plus rapide pour les expressions complexes.' },
        { id: 'p_a7', type: 'mcq', question: 'Quelle méthode permet de transposer un DataFrame ?', options: ['T', 'transpose()', 'flip()', 'rotate()'], correctAnswer: 0, explanation: 'df.T ou df.transpose() inverse lignes et colonnes.' },
        { id: 'p_a8', type: 'code-completion', question: 'Complétez pour un échantillonnage aléatoire de 100 lignes :', code: 'df.______(100)', correctAnswer: 'sample', explanation: 'sample() tire aléatoirement n lignes.' },
        { id: 'p_a9', type: 'mcq', question: 'Comment lire un fichier Parquet ?', options: ['read_parquet()', 'load_parquet()', 'import_parquet()', 'parquet_read()'], correctAnswer: 0, explanation: 'pd.read_parquet() lit le format Parquet (rapide et compact).' },
        { id: 'p_a10', type: 'true-false', question: 'Les méthodes avec inplace=True modifient le DataFrame directement et retournent None.', correctAnswer: true, explanation: 'Vrai, inplace=True modifie l\'objet sans créer de copie.' },
        { id: 'p_a11', type: 'code-completion', question: 'Complétez pour créer des intervalles (bins) :', code: 'pd.______(df["age"], bins=5)', correctAnswer: 'cut', explanation: 'cut() découpe des valeurs continues en intervalles.' },
        { id: 'p_a12', type: 'mcq', question: 'Comment paralléliser des opérations Pandas ?', options: ['Dask/Modin', 'multiprocessing', 'Threading', 'parallel=True'], correctAnswer: 0, explanation: 'Dask et Modin sont des alternatives parallélisées de Pandas.' },
        { id: 'p_a13', type: 'code-completion', question: 'Complétez pour définir un index personnalisé :', code: 'df._______("id_column")', correctAnswer: 'set_index', explanation: 'set_index() définit une colonne comme nouvel index.' },
        { id: 'p_a14', type: 'mcq', question: 'Quelle méthode permet de détecter les outliers avec l\'IQR ?', options: ['quantile()', 'outliers()', 'iqr()', 'detect()'], correctAnswer: 0, explanation: 'quantile() calcule les percentiles pour identifier les outliers.' },
        { id: 'p_a15', type: 'true-false', question: 'pd.cut() crée des intervalles de même largeur, qcut() des intervalles avec le même nombre d\'éléments.', correctAnswer: true, explanation: 'Vrai, cut() divise uniformément, qcut() crée des quantiles.' },
        { id: 'p_a16', type: 'code-completion', question: 'Complétez pour renvoyer les n premières valeurs les plus grandes :', code: 'df["col"].______(5)', correctAnswer: 'nlargest', explanation: 'nlargest() retourne les n plus grandes valeurs.' },
        { id: 'p_a17', type: 'mcq', question: 'Comment créer une colonne avec un décalage temporel (lag) ?', options: ['shift()', 'lag()', 'offset()', 'delay()'], correctAnswer: 0, explanation: 'shift() décale les valeurs vers le haut ou le bas.' },
        { id: 'p_a18', type: 'code-completion', question: 'Complétez pour interpoler les valeurs manquantes :', code: 'df["col"].________()', correctAnswer: 'interpolate', explanation: 'interpolate() estime les valeurs manquantes par interpolation.' },
        { id: 'p_a19', type: 'mcq', question: 'Quelle méthode permet d\'appliquer une fonction différente à chaque colonne ?', options: ['agg()', 'apply()', 'transform()', 'map()'], correctAnswer: 0, explanation: 'agg() avec un dictionnaire {col: func} permet des agrégations personnalisées.' },
        { id: 'p_a20', type: 'true-false', question: 'Un DataFrame peut avoir plusieurs colonnes avec le même nom.', correctAnswer: true, explanation: 'Vrai, mais c\'est déconseillé car cela complique les sélections.' }
    ]
};

// ----------------------------------------------------------------------
// SQL QUESTION BANKS
// ----------------------------------------------------------------------

const sqlQuestionBanks = {
    sql_basics: [
        { id: 'sql_b1', type: 'mcq', question: 'Quelle commande SQL permet de sélectionner toutes les colonnes d\'une table ?', options: ['GET *', 'SELECT *', 'FETCH *', 'RETRIEVE *'], correctAnswer: 1, explanation: 'SELECT * sélectionne toutes les colonnes d\'une table.' },
        { id: 'sql_b2', type: 'code-completion', question: 'Complétez pour sélectionner la colonne name :', code: 'SELECT _____ FROM employees;', correctAnswer: 'name', explanation: 'On spécifie le nom de la colonne après SELECT.' },
        { id: 'sql_b3', type: 'mcq', question: 'Quelle clause filtre les résultats d\'une requête SELECT ?', options: ['FILTER', 'WHERE', 'HAVING', 'IF'], correctAnswer: 1, explanation: 'WHERE filtre les lignes dans une requête SELECT.' },
        { id: 'sql_b4', type: 'code-completion', question: 'Complétez pour filtrer les employés du département IT :', code: 'SELECT * FROM employees WHERE department_id = _____;', correctAnswer: '1', explanation: 'Le département IT a l\'id 1 dans notre base.' },
        { id: 'sql_b5', type: 'mcq', question: 'Quelle fonction compte le nombre de lignes ?', options: ['SUM()', 'COUNT()', 'TOTAL()', 'NUMBER()'], correctAnswer: 1, explanation: 'COUNT() compte le nombre de lignes.' },
        { id: 'sql_b6', type: 'mcq', question: 'Quel mot-clé supprime les doublons dans les résultats ?', options: ['UNIQUE', 'DISTINCT', 'DIFFERENT', 'SINGLE'], correctAnswer: 1, explanation: 'SELECT DISTINCT retourne des valeurs uniques.' },
        { id: 'sql_b7', type: 'code-completion', question: 'Trier les résultats par date décroissante :', code: 'ORDER BY date _____', correctAnswer: 'DESC', explanation: 'DESC trie du plus grand au plus petit.' },
        { id: 'sql_b8', type: 'mcq', question: 'Comment limiter le nombre de résultats retournés ?', options: ['TOP 10', 'LIMIT 10', 'MAX 10', 'STOP 10'], correctAnswer: 1, explanation: 'LIMIT (ou TOP selon le SGBD) restreint le nombre de lignes.' },
        { id: 'sql_b9', type: 'code-completion', question: 'Sélectionner si l\'âge est entre 20 et 30 :', code: 'WHERE age _____ 20 AND 30', correctAnswer: 'BETWEEN', explanation: 'BETWEEN permet de filtrer sur une plage inclusive.' },
        { id: 'sql_b10', type: 'mcq', question: 'Quel opérateur vérifie une valeur NULL ?', options: ['= NULL', 'IS NULL', 'EQUALS NULL', '== NULL'], correctAnswer: 1, explanation: 'On doit toujours utiliser IS NULL, jamais = NULL.' },
        { id: 'sql_b11', type: 'code-completion', question: 'Renommer une colonne dans le résultat :', code: 'SELECT name _____ nom_complet FROM users', correctAnswer: 'AS', explanation: 'AS permet de donner un alias à une colonne.' },
        { id: 'sql_b12', type: 'mcq', question: 'Quel symbole représente n\'importe quelle chaîne de caractères avec LIKE ?', options: ['*', '?', '%', '#'], correctAnswer: 2, explanation: '% remplace 0 à N caractères.' },
        { id: 'sql_b13', type: 'true-false', question: 'La clause WHERE s\'applique après le GROUP BY.', correctAnswer: false, explanation: 'Faux, WHERE filtre avant l\'agrégation. HAVING filtre après.' },
        { id: 'sql_b14', type: 'code-completion', question: 'Chercher les noms commençant par "A" :', code: 'WHERE name LIKE \'_____%\'', correctAnswer: 'A', explanation: 'Le patron \'A%\' matche tout ce qui commence par A.' },
        { id: 'sql_b15', type: 'mcq', question: 'Quelle fonction retourne la valeur maximale ?', options: ['TOP()', 'MAXIMUM()', 'MAX()', 'HIGH()'], correctAnswer: 2, explanation: 'MAX() retourne la valeur la plus élevée.' },
        { id: 'sql_b16', type: 'code-completion', question: 'Filtrer sur une liste de valeurs :', code: 'WHERE country _____ (\'France\', \'Germany\')', correctAnswer: 'IN', explanation: 'IN vérifie si la valeur est dans la liste.' },
        { id: 'sql_b17', type: 'mcq', question: 'Quel opérateur combine deux conditions qui doivent être toutes deux vraies ?', options: ['OR', 'AND', 'BOTH', 'PLUS'], correctAnswer: 1, explanation: 'AND exige que les deux conditions soient remplies.' },
        { id: 'sql_b18', type: 'true-false', question: 'COUNT(colonne) compte les valeurs NULL.', correctAnswer: false, explanation: 'Faux, COUNT(colonne) ignore les NULL. COUNT(*) compte tout.' },
        { id: 'sql_b19', type: 'code-completion', question: 'Exclure une valeur spécifique :', code: 'WHERE status _____ \'deleted\'', correctAnswer: '!=', explanation: '!= ou <> signifie "différent de".' },
        { id: 'sql_b20', type: 'mcq', question: 'Comment écrire un commentaire sur une ligne en SQL standard ?', options: ['//', '#', '--', '/*'], correctAnswer: 2, explanation: '-- introduit un commentaire jusqu\'à la fin de la ligne.' }
    ],
    sql_intermediate: [
        { id: 'sql_i1', type: 'mcq', question: 'Quel type de JOIN retourne toutes les lignes de la table de gauche ?', options: ['INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'FULL JOIN'], correctAnswer: 1, explanation: 'LEFT JOIN retourne toutes les lignes de la table de gauche.' },
        { id: 'sql_i2', type: 'code-completion', question: 'Complétez pour joindre employees et departments :', code: 'SELECT * FROM employees e _____ departments d ON e.department_id = d.id;', correctAnswer: 'JOIN', explanation: 'JOIN (ou INNER JOIN) lie les deux tables.' },
        { id: 'sql_i3', type: 'mcq', question: 'Dans un JOIN, ON spécifie :', options: ['Les colonnes à sélectionner', 'La condition de jointure', 'L\'ordre de tri', 'Le nombre de lignes'], correctAnswer: 1, explanation: 'ON définit la condition qui lie les tables.' },
        { id: 'sql_i4', type: 'code-completion', question: 'Complétez pour joindre sales et employees :', code: 'SELECT s.*, e.name FROM sales s JOIN employees e ON s.employee_id = _____;', correctAnswer: 'e.id', explanation: 'On joint sur la clé primaire de employees (e.id).' },
        { id: 'sql_i5', type: 'mcq', question: 'Quelle différence entre INNER JOIN et LEFT JOIN ?', options: ['Aucune', 'LEFT JOIN inclut les lignes sans correspondance', 'INNER JOIN est plus rapide', 'LEFT JOIN trie les résultats'], correctAnswer: 1, explanation: 'LEFT JOIN inclut toutes les lignes de gauche, même sans correspondance.' },
        { id: 'sql_i6', type: 'mcq', question: 'Quelle clause est utilisée pour filtrer des groupes (agrégats) ?', options: ['WHERE', 'HAVING', 'GROUP FILTER', 'FILTER'], correctAnswer: 1, explanation: 'HAVING filtre les résultats après le GROUP BY.' },
        { id: 'sql_i7', type: 'code-completion', question: 'Calculer le total des ventes par vendeur :', code: 'SELECT salesman, SUM(amount) FROM sales _____ salesman', correctAnswer: 'GROUP BY', explanation: 'GROUP BY regroupe les lignes ayant la même valeur.' },
        { id: 'sql_i8', type: 'mcq', question: 'Quel opérateur combine les résultats de deux requêtes en gardant les doublons ?', options: ['UNION', 'UNION ALL', 'JOIN', 'MERGE'], correctAnswer: 1, explanation: 'UNION ALL concatène les résultats sans éliminer les doublons.' },
        { id: 'sql_i9', type: 'code-completion', question: 'Remplacer une valeur NULL par \'N/A\' :', code: 'SELECT _____(phone, \'N/A\') FROM customers', correctAnswer: 'COALESCE', explanation: 'COALESCE retourne le premier argument non NULL.' },
        { id: 'sql_i10', type: 'mcq', question: 'Quelle instruction permet de faire une logique conditionnelle (If/Else) ?', options: ['IF ... ELSE', 'SWITCH', 'CASE WHEN', 'CHOOSE'], correctAnswer: 2, explanation: 'CASE WHEN ... THEN ... END est la structure conditionnelle standard.' },
        { id: 'sql_i11', type: 'true-false', question: 'Un FULL OUTER JOIN retourne les lignes correspondantes et non correspondantes des deux tables.', correctAnswer: true, explanation: 'C\'est la combinaison d\'un LEFT et d\'un RIGHT JOIN.' },
        { id: 'sql_i12', type: 'code-completion', question: 'Sous-requête : Trouver les produits plus chers que la moyenne :', code: 'WHERE price > (SELECT _____(price) FROM products)', correctAnswer: 'AVG', explanation: 'On compare le prix à la moyenne calculée dans la sous-requête.' },
        { id: 'sql_i13', type: 'mcq', question: 'Quel type de jointure produit un produit cartésien (toutes les combinaisons) ?', options: ['INNER JOIN', 'CROSS JOIN', 'NATURAL JOIN', 'OUTER JOIN'], correctAnswer: 1, explanation: 'CROSS JOIN combine chaque ligne de A avec chaque ligne de B.' },
        { id: 'sql_i14', type: 'code-completion', question: 'Compter le nombre de villes distinctes :', code: 'SELECT COUNT(_____ city) FROM users', correctAnswer: 'DISTINCT', explanation: 'COUNT(DISTINCT ...) compte les valeurs uniques.' },
        { id: 'sql_i15', type: 'mcq', question: 'Comment concaténer deux chaînes de caractères (standard SQL) ?', options: ['s1 + s2', 'CONCAT(s1, s2)', 's1 || s2', 's1 & s2'], correctAnswer: 2, explanation: '|| est l\'opérateur standard, bien que CONCAT() soit très répandu.' },
        { id: 'sql_i16', type: 'true-false', question: 'On peut utiliser un alias défini dans SELECT directement dans le WHERE.', correctAnswer: false, explanation: 'Le WHERE est exécuté avant le SELECT, l\'alias n\'existe pas encore.' },
        { id: 'sql_i17', type: 'code-completion', question: 'Filtrer les groupes ayant plus de 10 commandes :', code: 'GROUP BY user_id HAVING _____(id) > 10', correctAnswer: 'COUNT', explanation: 'HAVING COUNT(id) > 10 filtre les groupes.' },
        { id: 'sql_i18', type: 'mcq', question: 'Quelle jointure retourne uniquement les lignes qui ne sont PAS dans l\'autre table ?', options: ['INNER JOIN', 'LEFT JOIN avec IS NULL', 'EXCLUSIVE JOIN', 'OUTER JOIN'], correctAnswer: 1, explanation: 'Un LEFT JOIN suivi d\'un WHERE cle IS NULL filtre les correspondances.' },
        { id: 'sql_i19', type: 'code-completion', question: 'Extraire l\'année d\'une date :', code: 'SELECT _____(year FROM order_date)', correctAnswer: 'EXTRACT', explanation: 'EXTRACT(part FROM date) est la fonction standard.' },
        { id: 'sql_i20', type: 'mcq', question: 'Une sous-requête corrélée :', options: ['S\'exécute une seule fois', 'Dépend des colonnes de la requête principale', 'Ne peut pas retourner de NULL', 'Est toujours plus rapide'], correctAnswer: 1, explanation: 'Elle utilise des valeurs de la requête externe et s\'exécute pour chaque ligne.' }
    ]
};

// ----------------------------------------------------------------------
// PYTHON BASICS QUESTION BANK
// ----------------------------------------------------------------------

const pythonBasicsQuestionBanks = {
    python_basics: [
        { id: 'py_b1', type: 'mcq', question: 'Quel est le type de `x = 5` ?', options: ['str', 'int', 'float', 'number'], correctAnswer: 1, explanation: 'x = 5 crée un entier (int).' },
        { id: 'py_b2', type: 'code-completion', question: 'Complétez pour afficher :', code: '______("Hello")', correctAnswer: 'print', explanation: 'print() affiche du texte en console.' },
        { id: 'py_b3', type: 'mcq', question: 'Comment créer une liste ?', options: ['[]', '{}', '()', '<>'], correctAnswer: 0, explanation: '[] crée une liste vide ou [1, 2, 3] une liste avec valeurs.' },
        { id: 'py_b4', type: 'true-false', question: 'Les chaînes Python sont mutables.', correctAnswer: false, explanation: 'Faux, les strings Python sont immutables.' },
        { id: 'py_b5', type: 'code-completion', question: 'Complétez pour la longueur :', code: '______(ma_liste)', correctAnswer: 'len', explanation: 'len() retourne la longueur d\'un objet.' },
        { id: 'py_b6', type: 'mcq', question: 'Quelle est la différence entre `==` et `is` ?', options: ['== valeur, is identité', 'identiques', '== strict', 'is comparaison'], correctAnswer: 0, explanation: '== compare les valeurs, is compare l\'identité mémoire.' },
        { id: 'py_b7', type: 'true-false', question: 'Un tuple est modifiable après création.', correctAnswer: false, explanation: 'Faux, les tuples sont immutables.' },
        { id: 'py_b8', type: 'code-completion', question: 'Complétez pour itérer :', code: 'for i in ______(10):', correctAnswer: 'range', explanation: 'range(10) génère les nombres de 0 à 9.' },
        { id: 'py_b9', type: 'mcq', question: 'Comment accéder au dernier élément d\'une liste ?', options: ['liste[-1]', 'liste[end]', 'liste.last()', 'liste[len-1]'], correctAnswer: 0, explanation: 'L\'index -1 accède au dernier élément.' },
        { id: 'py_b10', type: 'code-completion', question: 'Complétez pour définir une fonction :', code: '___ ma_fonction():', correctAnswer: 'def', explanation: 'def est le mot-clé pour définir une fonction.' },
        { id: 'py_b11', type: 'mcq', question: 'Quelle structure de données garantit l\'unicité ?', options: ['set', 'list', 'tuple', 'dict'], correctAnswer: 0, explanation: 'Un set ne peut contenir que des valeurs uniques.' },
        { id: 'py_b12', type: 'true-false', question: 'Les dictionnaires maintiennent l\'ordre d\'insertion (Python 3.7+).', correctAnswer: true, explanation: 'Vrai depuis Python 3.7, les dicts sont ordonnés.' },
        { id: 'py_b13', type: 'code-completion', question: 'Complétez pour ajouter à une liste :', code: 'ma_liste.______(element)', correctAnswer: 'append', explanation: 'append() ajoute un élément à la fin de la liste.' },
        { id: 'py_b14', type: 'mcq', question: 'Comment gérer une exception ?', options: ['try/except', 'catch', 'handle', 'error'], correctAnswer: 0, explanation: 'try/except est la structure de gestion d\'erreurs en Python.' },
        { id: 'py_b15', type: 'true-false', question: '`None` est équivalent à `False`.', correctAnswer: false, explanation: 'Faux, None est évalué comme False mais n\'est pas égal à False.' },
        { id: 'py_b16', type: 'code-completion', question: 'Complétez pour convertir en entier :', code: '______("42")', correctAnswer: 'int', explanation: 'int() convertit une chaîne ou float en entier.' },
        { id: 'py_b17', type: 'mcq', question: 'Quelle méthode joint les éléments d\'une liste ?', options: ['join()', 'concat()', 'merge()', 'combine()'], correctAnswer: 0, explanation: '",".join(liste) joint avec une virgule.' },
        { id: 'py_b18', type: 'true-false', question: 'Python utilise l\'indentation pour définir les blocs.', correctAnswer: true, explanation: 'Vrai, l\'indentation est syntaxiquement obligatoire.' },
        { id: 'py_b19', type: 'code-completion', question: 'Complétez pour une boucle while :', code: '___ x < 10:', correctAnswer: 'while', explanation: 'while crée une boucle conditionnelle.' },
        { id: 'py_b20', type: 'mcq', question: 'Comment créer un dictionnaire vide ?', options: ['{}', 'dict()', '[]', 'les deux premières'], correctAnswer: 3, explanation: '{} et dict() créent tous deux un dictionnaire vide.' }
    ]
};

// ----------------------------------------------------------------------
// POWER QUERY M QUESTION BANK
// ----------------------------------------------------------------------

const mQuestionBanks = {
    m_basics: [
        { id: 'm_b1', type: 'mcq', question: 'Quel mot-clé commence une requête Power Query ?', options: ['let', 'start', 'begin', 'query'], correctAnswer: 0, explanation: 'let introduit les étapes de transformation.' },
        { id: 'm_b2', type: 'code-completion', question: 'Complétez pour terminer une requête :', code: '___ MonResultat', correctAnswer: 'in', explanation: 'in spécifie le résultat final de la requête.' },
        { id: 'm_b3', type: 'true-false', question: 'Power Query M est sensible à la casse.', correctAnswer: true, explanation: 'Vrai, Table.AddColumn est différent de table.addcolumn.' },
        { id: 'm_b4', type: 'mcq', question: 'Comment charger une table Excel ?', options: ['Excel.Workbook()', 'Load.Excel()', 'Import.Excel()', 'Read.Excel()'], correctAnswer: 0, explanation: 'Excel.Workbook() charge un fichier Excel.' },
        { id: 'm_b5', type: 'code-completion', question: 'Complétez pour filtrer :', code: 'Table.________(Source, each [Age] > 18)', correctAnswer: 'SelectRows', explanation: 'SelectRows filtre les lignes selon une condition.' },
        { id: 'm_b6', type: 'mcq', question: 'Quelle fonction supprime des colonnes ?', options: ['Table.RemoveColumns()', 'Table.Drop()', 'Table.Delete()', 'Remove.Columns()'], correctAnswer: 0, explanation: 'Table.RemoveColumns() supprime une ou plusieurs colonnes.' },
        { id: 'm_b7', type: 'true-false', question: '`each` est un raccourci pour `(_) =>`.', correctAnswer: true, explanation: 'Vrai, each est un sucre syntaxique pour une fonction lambda.' },
        { id: 'm_b8', type: 'code-completion', question: 'Complétez pour renommer :', code: 'Table.________(Source, {{"Old", "New"}})', correctAnswer: 'RenameColumns', explanation: 'RenameColumns renomme les colonnes via paires ancienne/nouvelle.' },
        { id: 'm_b9', type: 'mcq', question: 'Comment ajouter une colonne personnalisée ?', options: ['Table.AddColumn()', 'Table.NewColumn()', 'Add.Column()', 'Table.Insert()'], correctAnswer: 0, explanation: 'Table.AddColumn() ajoute une colonne calculée.' },
        { id: 'm_b10', type: 'true-false', question: 'Les étapes Power Query sont exécutées séquentiellement.', correctAnswer: true, explanation: 'Vrai, chaque étape utilise le résultat de la précédente.' },
        { id: 'm_b11', type: 'code-completion', question: 'Complétez pour fusionner :', code: 'Table.________(Table1, Table2, "Key")', correctAnswer: 'NestedJoin', explanation: 'NestedJoin fusionne deux tables sur une clé commune.' },
        { id: 'm_b12', type: 'mcq', question: 'Quelle fonction convertit en majuscules ?', options: ['Text.Upper()', 'ToUpper()', 'Text.UpperCase()', 'Upper()'], correctAnswer: 0, explanation: 'Text.Upper() convertit en majuscules.' },
        { id: 'm_b13', type: 'true-false', question: 'Power Query peut se connecter à des sources web.', correctAnswer: true, explanation: 'Vrai, via Web.Contents() ou d\'autres connecteurs.' },
        { id: 'm_b14', type: 'code-completion', question: 'Complétez pour grouper :', code: 'Table.________(Source, {"Ville"}, {{"Total", each List.Sum([Ventes])}})', correctAnswer: 'Group', explanation: 'Table.Group agrège les données par groupe.' },
        { id: 'm_b15', type: 'mcq', question: 'Comment remplacer des valeurs ?', options: ['Table.ReplaceValue()', 'Replace()', 'Table.Change()', 'Substitute()'], correctAnswer: 0, explanation: 'Table.ReplaceValue() remplace les occurrences d\'une valeur.' },
        { id: 'm_b16', type: 'true-false', question: 'M Language supporte les commentaires avec `//`.', correctAnswer: true, explanation: 'Vrai, // introduit un commentaire sur une ligne.' },
        { id: 'm_b17', type: 'code-completion', question: 'Complétez pour trier :', code: 'Table.________(Source, {{"Date", Order.Descending}})', correctAnswer: 'Sort', explanation: 'Table.Sort trie selon une ou plusieurs colonnes.' },
        { id: 'm_b18', type: 'mcq', question: 'Quelle fonction extrait le premier élément d\'une liste ?', options: ['List.First()', 'List[0]', 'First()', 'Get.First()'], correctAnswer: 0, explanation: 'List.First() retourne le premier élément.' },
        { id: 'm_b19', type: 'true-false', question: 'On peut créer des fonctions personnalisées en M.', correctAnswer: true, explanation: 'Vrai, les functions custom sont supportées.' },
        { id: 'm_b20', type: 'code-completion', question: 'Complétez pour transposer :', code: 'Table.________(Source)', correctAnswer: 'Transpose', explanation: 'Table.Transpose inverse lignes et colonnes.' }
    ]
};

// ----------------------------------------------------------------------
// NOSQL QUESTION BANK
// ----------------------------------------------------------------------

const nosqlQuestionBanks = {
    nosql_basics: [
        { id: 'no_b1', type: 'mcq', question: 'Quelle structure utilise MongoDB ?', options: ['Documents JSON', 'Tables SQL', 'Graphes', 'Colonnes'], correctAnswer: 0, explanation: 'MongoDB stocke les données en documents BSON (similaire à JSON).' },
        { id: 'no_b2', type: 'code-completion', question: 'Complétez pour insérer :', code: 'db.collection.______({nom: "Alice"})', correctAnswer: 'insertOne', explanation: 'insertOne() insère un document unique.' },
        { id: 'no_b3', type: 'true-false', question: 'MongoDB nécessite un schéma fixe.', correctAnswer: false, explanation: 'Faux, MongoDB est schemaless (flexible).' },
        { id: 'no_b4', type: 'mcq', question: 'Comment rechercher tous les documents ?', options: ['find()', 'findAll()', 'select()', 'get()'], correctAnswer: 0, explanation: 'find() sans argument retourne tous les documents.' },
        { id: 'no_b5', type: 'code-completion', question: 'Complétez pour filtrer (supérieur à) :', code: 'db.users.find({age: {___: 18}})', correctAnswer: '$gt', explanation: '$gt (greater than) filtre les valeurs supérieures.' },
        { id: 'no_b6', type: 'mcq', question: 'Qu\'est-ce qu\'un document MongoDB ?', options: ['Objet JSON', 'Ligne SQL', 'Fichier', 'Table'], correctAnswer: 0, explanation: 'Un document est un objet clé-valeur au format BSON.' },
        { id: 'no_b7', type: 'true-false', question: 'MongoDB supporte les jointures natives.', correctAnswer: true, explanation: 'Vrai, via $lookup dans les pipelines d\'agrégation.' },
        { id: 'no_b8', type: 'code-completion', question: 'Complétez pour mettre à jour :', code: 'db.collection.______({_id: 1}, {$set: {status: "actif"}})', correctAnswer: 'updateOne', explanation: 'updateOne() met à jour un seul document.' },
        { id: 'no_b9', type: 'mcq', question: 'Quelle est la clé primaire par défaut ?', options: ['_id', 'id', 'pk', 'key'], correctAnswer: 0, explanation: '_id est automatiquement créé comme clé primaire.' },
        { id: 'no_b10', type: 'true-false', question: 'Les collections MongoDB sont équivalentes aux tables SQL.', correctAnswer: true, explanation: 'Vrai, conceptuellement les collections groupent des documents.' },
        { id: 'no_b11', type: 'code-completion', question: 'Complétez pour supprimer :', code: 'db.users.______({age: {$lt: 18}})', correctAnswer: 'deleteMany', explanation: 'deleteMany() supprime plusieurs documents.' },
        { id: 'no_b12', type: 'mcq', question: 'Comment compter les documents ?', options: ['countDocuments()', 'count()', 'size()', 'length()'], correctAnswer: 0, explanation: 'countDocuments() compte le nombre de documents.' },
        { id: 'no_b13', type: 'true-false', question: '`$match` équivaut à WHERE en SQL.', correctAnswer: true, explanation: 'Vrai, $match filtre les documents dans un pipeline.' },
        { id: 'no_b14', type: 'code-completion', question: 'Complétez pour trier (décroissant) :', code: 'db.users.find().____({age: -1})', correctAnswer: 'sort', explanation: 'sort({champ: -1}) trie par ordre décroissant.' },
        { id: 'no_b15', type: 'mcq', question: 'Quelle opération groupe les documents ?', options: ['$group', '$aggregate', '$collect', '$groupBy'], correctAnswer: 0, explanation: '$group agrège les documents dans un pipeline.' },
        { id: 'no_b16', type: 'true-false', question: 'MongoDB stocke les données en BSON (Binary JSON).', correctAnswer: true, explanation: 'Vrai, BSON est plus performant que JSON texte.' },
        { id: 'no_b17', type: 'code-completion', question: 'Complétez pour limiter les résultats :', code: 'db.users.find().______(10)', correctAnswer: 'limit', explanation: 'limit() restreint le nombre de documents retournés.' },
        { id: 'no_b18', type: 'mcq', question: 'Comment créer un index ?', options: ['createIndex()', 'addIndex()', 'index()', 'makeIndex()'], correctAnswer: 0, explanation: 'createIndex() optimise les requêtes sur un champ.' },
        { id: 'no_b19', type: 'true-false', question: 'MongoDB est un système relationnel.', correctAnswer: false, explanation: 'Faux, MongoDB est une base NoSQL orientée document.' },
        { id: 'no_b20', type: 'code-completion', question: 'Complétez pour projeter (exclure _id) :', code: 'db.users.find({}, {nom: 1, _____: 0})', correctAnswer: '_id', explanation: 'Projeter avec 0 exclut le champ du résultat.' }
    ],
    mongodb_aggregate: [
        { id: 'mg_a1', type: 'mcq', question: 'Quelle étape équivaut à WHERE en SQL ?', options: ['$match', '$project', '$group', '$filter'], correctAnswer: 0, explanation: '$match filtre les documents comme WHERE.' },
        { id: 'mg_a2', type: 'code-completion', question: 'Complétez pour regrouper par ville :', code: 'db.Gyms.aggregate([{ ____: { "_id": "$Ville" } }])', correctAnswer: '"$group"', explanation: '$group regroupe les documents sur une clé.' },
        { id: 'mg_a3', type: 'mcq', question: 'Quelle étape équivaut à SELECT en SQL ?', options: ['$match', '$project', '$group', '$sort'], correctAnswer: 1, explanation: '$project sélectionne et transforme les champs.' },
        { id: 'mg_a4', type: 'true-false', question: '$match devrait être placé en premier dans le pipeline.', correctAnswer: true, explanation: 'Vrai, pour réduire le volume de données dès le début.' },
        { id: 'mg_a5', type: 'code-completion', question: 'Complétez pour compter les documents :', code: '{ "$group": { "_id": null, "total": { "____": 1 } } }', correctAnswer: '$sum', explanation: '$sum: 1 compte les documents.' },
        { id: 'mg_a6', type: 'mcq', question: 'Comment calculer une moyenne dans $group ?', options: ['$avg', '$mean', '$average', '$mid'], correctAnswer: 0, explanation: '$avg calcule la moyenne des valeurs.' },
        { id: 'mg_a7', type: 'true-false', question: '$unwind transforme 1 document en plusieurs documents.', correctAnswer: true, explanation: 'Vrai, $unwind éclate un tableau en documents individuels.' },
        { id: 'mg_a8', type: 'code-completion', question: 'Complétez pour éclater le tableau Seances :', code: '{ "____": "$Seances" }', correctAnswer: '$unwind', explanation: '$unwind éclate chaque élément du tableau en document.' },
        { id: 'mg_a9', type: 'mcq', question: 'Quelle fonction convertit en minuscules dans $project ?', options: ['$toLower', '$lowercase', '$lower', '$min'], correctAnswer: 0, explanation: '$toLower convertit une chaîne en minuscules.' },
        { id: 'mg_a10', type: 'true-false', question: 'Après $unwind, on accède aux champs avec Seances[0].Jour.', correctAnswer: false, explanation: 'Faux, après $unwind c\'est $Seances.Jour (plus de tableau).' },
        { id: 'mg_a11', type: 'code-completion', question: 'Complétez pour trier par âge décroissant :', code: '{ "$sort": { "Age": ____ } }', correctAnswer: '-1', explanation: '-1 = ordre décroissant, 1 = ordre croissant.' },
        { id: 'mg_a12', type: 'mcq', question: 'Comment renommer un champ dans $project ?', options: ['"nouveauNom": "$ancienChamp"', 'rename()', '$rename', '$alias'], correctAnswer: 0, explanation: 'On assigne le champ source au nouveau nom.' },
        { id: 'mg_a13', type: 'true-false', question: '_id: null dans $group regroupe tous les documents.', correctAnswer: true, explanation: 'Vrai, c\'est l\'équivalent de COUNT(*) sans GROUP BY.' },
        { id: 'mg_a14', type: 'code-completion', question: 'Complétez pour obtenir le minimum :', code: '{ "$group": { "_id": "$Ville", "minAge": { "____": "$Age" } } }', correctAnswer: '$min', explanation: '$min retourne la valeur minimale du groupe.' },
        { id: 'mg_a15', type: 'mcq', question: 'Quel $match après $group équivaut à HAVING en SQL ?', options: ['Le 2ème $match', 'Le 1er $match', '$filter', '$having'], correctAnswer: 0, explanation: 'Un $match après $group filtre les groupes (HAVING).' },
        { id: 'mg_a16', type: 'true-false', question: '$project peut créer de nouveaux champs calculés.', correctAnswer: true, explanation: 'Vrai, on peut ajouter des calculs comme { total: { $add: ["$a", "$b"] } }.' },
        { id: 'mg_a17', type: 'code-completion', question: 'Complétez pour limiter à 5 résultats :', code: '{ "____": 5 }', correctAnswer: '$limit', explanation: '$limit restreint le nombre de documents.' },
        { id: 'mg_a18', type: 'mcq', question: 'Comment concaténer des chaînes dans $project ?', options: ['$concat', '$join', '$merge', '$add'], correctAnswer: 0, explanation: '$concat: ["$a", " ", "$b"] concatène les chaînes.' },
        { id: 'mg_a19', type: 'true-false', question: 'On peut avoir plusieurs $match dans un même pipeline.', correctAnswer: true, explanation: 'Vrai, on peut filtrer avant et après $group par exemple.' },
        { id: 'mg_a20', type: 'code-completion', question: 'Complétez pour un groupe par multiple champs :', code: '{ "$group": { "_id": { "ville": "$Ville", "____": "$Jour" } } }', correctAnswer: '"jour"', explanation: 'La clé _id peut être un objet pour grouper sur plusieurs champs.' }
    ],
    mongodb_advanced: [
        { id: 'mg_adv1', type: 'mcq', question: 'Quelle étape effectue une jointure en MongoDB ?', options: ['$lookup', '$join', '$merge', '$link'], correctAnswer: 0, explanation: '$lookup est l\'équivalent de LEFT JOIN.' },
        { id: 'mg_adv2', type: 'code-completion', question: 'Complétez le paramètre pour la collection à joindre :', code: '{ "$lookup": { "____": "Sportifs", "localField": "id", ... } }', correctAnswer: '"from"', explanation: 'from spécifie la collection à joindre.' },
        { id: 'mg_adv3', type: 'true-false', question: 'Le résultat de $lookup est toujours un tableau.', correctAnswer: true, explanation: 'Vrai, même avec 0 ou 1 élément, c\'est un tableau.' },
        { id: 'mg_adv4', type: 'mcq', question: 'Comment stocker un résultat de find() dans une variable ?', options: ['toArray()', 'save()', 'store()', 'export()'], correctAnswer: 0, explanation: 'toArray() convertit le curseur en tableau JavaScript.' },
        { id: 'mg_adv5', type: 'code-completion', question: 'Complétez pour récupérer les valeurs uniques :', code: 'db.Sportifs.________("Age")', correctAnswer: 'distinct', explanation: 'distinct() retourne les valeurs uniques d\'un champ.' },
        { id: 'mg_adv6', type: 'true-false', question: 'findOne() retourne un tableau de documents.', correctAnswer: false, explanation: 'Faux, findOne() retourne un seul document ou null.' },
        { id: 'mg_adv7', type: 'mcq', question: 'Comment éviter le piège des conditions sur tableau ?', options: ['$elemMatch', '$all', '$in', '$match'], correctAnswer: 0, explanation: '$elemMatch garantit que toutes les conditions s\'appliquent au même élément.' },
        { id: 'mg_adv8', type: 'code-completion', question: 'Complétez pour extraire des IDs avec JavaScript :', code: 'ids = resultats.____(e => e.IdSportif)', correctAnswer: 'map', explanation: 'map() transforme chaque élément du tableau.' },
        { id: 'mg_adv9', type: 'true-false', question: 'En JSON, deux clés identiques écrasent la première.', correctAnswer: true, explanation: 'Vrai, { "a": 1, "a": 2 } donne { "a": 2 }.' },
        { id: 'mg_adv10', type: 'mcq', question: 'Quel opérateur vérifie qu\'un tableau contient TOUS les éléments ?', options: ['$all', '$in', '$elemMatch', '$contains'], correctAnswer: 0, explanation: '$all vérifie que le tableau contient tous les éléments demandés.' },
        { id: 'mg_adv11', type: 'code-completion', question: 'Complétez pour accéder au résultat d\'agrégation :', code: 'result = db.col.aggregate([...]).____()[0]', correctAnswer: 'toArray', explanation: 'toArray() puis [0] pour accéder au premier résultat.' },
        { id: 'mg_adv12', type: 'true-false', question: '$first et $last dépendent de l\'ordre des documents dans le groupe.', correctAnswer: true, explanation: 'Vrai, utilisez $sort avant $group pour garantir l\'ordre.' },
        { id: 'mg_adv13', type: 'mcq', question: 'Quelle différence entre $push et $addToSet ?', options: ['$addToSet évite les doublons', '$push est plus rapide', '$addToSet trie', 'Aucune'], correctAnswer: 0, explanation: '$addToSet n\'ajoute que les valeurs uniques.' },
        { id: 'mg_adv14', type: 'code-completion', question: 'Complétez pour déclarer une variable dans $lookup pipeline :', code: '{ "$lookup": { "____": { "age": "$Age" }, "pipeline": [...] } }', correctAnswer: '"let"', explanation: 'let déclare des variables accessibles dans le pipeline.' },
        { id: 'mg_adv15', type: 'true-false', question: '$$variable dans $lookup accède aux variables déclarées dans let.', correctAnswer: true, explanation: 'Vrai, $$ préfixe les variables déclarées dans let.' },
        { id: 'mg_adv16', type: 'mcq', question: 'Quel est l\'ordre optimal du pipeline ?', options: ['$match → $project → $unwind → $group', '$group → $match → $unwind', '$unwind → $match → $group', '$project → $unwind → $group'], correctAnswer: 0, explanation: 'Filtrer d\'abord, projeter, puis éclater et grouper.' },
        { id: 'mg_adv17', type: 'code-completion', question: 'Complétez pour remplacer le document racine :', code: '{ "____": { "newRoot": "$Jeunes" } }', correctAnswer: '$replaceRoot', explanation: '$replaceRoot remplace le document par un sous-document.' },
        { id: 'mg_adv18', type: 'true-false', question: '_id est affiché par défaut dans les projections find().', correctAnswer: true, explanation: 'Vrai, il faut explicitement mettre _id: 0 pour le masquer.' },
        { id: 'mg_adv19', type: 'mcq', question: 'Comment gérer la casse dans les requêtes ?', options: ['$toLower ou $in avec variantes', '$ignoreCase', 'case: false', 'insensitive()'], correctAnswer: 0, explanation: 'Utiliser $toLower ou lister les variantes dans $in.' },
        { id: 'mg_adv20', type: 'code-completion', question: 'Complétez pour filtrer les groupes non vides après $lookup :', code: '{ "$match": { "MemeAge": { "____": [] } } }', correctAnswer: '"$ne"', explanation: '$ne: [] garde seulement les documents avec tableau non vide.' }
    ]
};


// ----------------------------------------------------------------------
// R QUESTION BANK
// ----------------------------------------------------------------------

const rQuestionBanks = {
    r_basics: [
        { id: 'r_b1', type: 'mcq', question: 'Comment assigner une valeur en R ?', options: ['<-', '=', '->', 'les deux premières'], correctAnswer: 3, explanation: '<- et = fonctionnent tous deux pour l\'assignation.' },
        { id: 'r_b2', type: 'code-completion', question: 'Complétez pour créer un vecteur :', code: 'v <- _____(1, 2, 3, 4, 5)', correctAnswer: 'c', explanation: 'c() (combine) crée un vecteur.' },
        { id: 'r_b3', type: 'true-false', question: 'Les index R commencent à 0.', correctAnswer: false, explanation: 'Faux, R utilise l\'indexation à partir de 1.' },
        { id: 'r_b4', type: 'mcq', question: 'Comment importer un CSV ?', options: ['read.csv()', 'import.csv()', 'load.csv()', 'csv.read()'], correctAnswer: 0, explanation: 'read.csv() lit un fichier CSV.' },
        { id: 'r_b5', type: 'code-completion', question: 'Complétez pour voir la structure :', code: '_____(df)', correctAnswer: 'str', explanation: 'str() affiche la structure compacte d\'un objet.' },
        { id: 'r_b6', type: 'mcq', question: 'Quelle fonction affiche les 6 premières lignes ?', options: ['head()', 'top()', 'first()', 'show()'], correctAnswer: 0, explanation: 'head() affiche les 6 premières lignes par défaut.' },
        { id: 'r_b7', type: 'true-false', question: 'Un dataframe R peut contenir différents types.', correctAnswer: true, explanation: 'Vrai, chaque colonne peut avoir un type différent.' },
        { id: 'r_b8', type: 'code-completion', question: 'Complétez pour installer un package :', code: '_____("dplyr")', correctAnswer: 'install.packages', explanation: 'install.packages() installe un package depuis CRAN.' },
        { id: 'r_b9', type: 'mcq', question: 'Comment charger une bibliothèque ?', options: ['library()', 'import()', 'load()', 'use()'], correctAnswer: 0, explanation: 'library() charge un package installé.' },
        { id: 'r_b10', type: 'true-false', question: '`%>%` est l\'opérateur pipe (tidyverse).', correctAnswer: true, explanation: 'Vrai, %>% chaîne les opérations (depuis magrittr).' },
        { id: 'r_b11', type: 'code-completion', question: 'Complétez pour filtrer (dplyr) :', code: 'df %>% _____(age > 18)', correctAnswer: 'filter', explanation: 'filter() sélectionne les lignes selon une condition.' },
        { id: 'r_b12', type: 'mcq', question: 'Quelle fonction calcule la moyenne ?', options: ['mean()', 'average()', 'avg()', 'median()'], correctAnswer: 0, explanation: 'mean() calcule la moyenne arithmétique.' },
        { id: 'r_b13', type: 'true-false', question: '`NA` représente une valeur manquante.', correctAnswer: true, explanation: 'Vrai, NA signifie "Not Available".' },
        { id: 'r_b14', type: 'code-completion', question: 'Complétez pour sélectionner des colonnes :', code: 'df %>% _____(nom, age)', correctAnswer: 'select', explanation: 'select() choisit les colonnes à conserver.' },
        { id: 'r_b15', type: 'mcq', question: 'Comment créer un graphique de base ?', options: ['plot()', 'graph()', 'draw()', 'chart()'], correctAnswer: 0, explanation: 'plot() crée des graphiques simples.' },
        { id: 'r_b16', type: 'true-false', question: 'ggplot2 utilise la grammaire des graphiques.', correctAnswer: true, explanation: 'Vrai, ggplot2 suit les principes de Wilkinson.' },
        { id: 'r_b17', type: 'code-completion', question: 'Complétez pour grouper (dplyr) :', code: 'df %>% ______(ville) %>% summarise(total = sum(ventes))', correctAnswer: 'group_by', explanation: 'group_by() crée des groupes pour les agrégations.' },
        { id: 'r_b18', type: 'mcq', question: 'Quelle fonction combine des vecteurs en colonnes ?', options: ['cbind()', 'rbind()', 'merge()', 'join()'], correctAnswer: 0, explanation: 'cbind() (column bind) combine en colonnes.' },
        { id: 'r_b19', type: 'true-false', question: 'R est principalement orienté objet.', correctAnswer: false, explanation: 'Faux, R est avant tout fonctionnel, avec support OOP.' },
        { id: 'r_b20', type: 'code-completion', question: 'Complétez pour un résumé statistique :', code: '_____(df)', correctAnswer: 'summary', explanation: 'summary() affiche min, max, moyenne, médiane, etc.' }
    ]
};

// ----------------------------------------------------------------------
// GIT QUESTION BANK
// ----------------------------------------------------------------------

const gitQuestionBanks = {
    git_basics: [
        { id: 'git_b1', type: 'mcq', question: 'Quelle commande initialise un nouveau dépôt Git ?', options: ['git start', 'git init', 'git create', 'git new'], correctAnswer: 1, explanation: 'git init initialise un dépôt Git vide.' },
        { id: 'git_b2', type: 'code-completion', question: 'Complétez pour voir l\'état des fichiers :', code: 'git ______', correctAnswer: 'status', explanation: 'git status affiche les fichiers modifiés et stagés.' },
        { id: 'git_b3', type: 'mcq', question: 'Comment ajouter tous les fichiers modifiés au staging ?', options: ['git add .', 'git add all', 'git stage *', 'git commit -a'], correctAnswer: 0, explanation: 'git add . ajoute tous les fichiers du répertoire courant.' },
        { id: 'git_b4', type: 'code-completion', question: 'Complétez pour créer un commit :', code: 'git ______ -m "message"', correctAnswer: 'commit', explanation: 'git commit crée un nouveau commit avec les fichiers stagés.' },
        { id: 'git_b5', type: 'true-false', question: 'Un commit Git enregistre seulement les fichiers modifiés, pas tout le projet.', correctAnswer: true, explanation: 'Vrai, Git enregistre les changements de manière incrémentale.' },
        { id: 'git_b6', type: 'mcq', question: 'Quelle commande affiche l\'historique des commits ?', options: ['git history', 'git log', 'git commits', 'git show'], correctAnswer: 1, explanation: 'git log affiche l\'historique chronologique des commits.' },
        { id: 'git_b7', type: 'code-completion', question: 'Complétez pour créer une nouvelle branche :', code: 'git ______ nom-branche', correctAnswer: 'branch', explanation: 'git branch nom crée une nouvelle branche.' },
        { id: 'git_b8', type: 'mcq', question: 'Comment basculer vers une autre branche ?', options: ['git switch', 'git checkout', 'git change', 'les deux premières'], correctAnswer: 3, explanation: 'git switch et git checkout permettent tous deux de changer de branche.' },
        { id: 'git_b9', type: 'true-false', question: 'git pull combine git fetch et git merge.', correctAnswer: true, explanation: 'Vrai, pull récupère et fusionne automatiquement.' },
        { id: 'git_b10', type: 'code-completion', question: 'Complétez pour fusionner une branche :', code: 'git ______ nom-branche', correctAnswer: 'merge', explanation: 'git merge fusionne une branche dans la branche courante.' },
        { id: 'git_b11', type: 'mcq', question: 'Comment annuler les modifications d\'un fichier non stagé ?', options: ['git undo', 'git restore', 'git revert', 'git reset'], correctAnswer: 1, explanation: 'git restore annule les modifications d\'un fichier.' },
        { id: 'git_b12', type: 'code-completion', question: 'Complétez pour cloner un dépôt :', code: 'git ______ url', correctAnswer: 'clone', explanation: 'git clone télécharge un dépôt distant.' },
        { id: 'git_b13', type: 'true-false', question: 'Le fichier .gitignore permet d\'exclure des fichiers du versioning.', correctAnswer: true, explanation: 'Vrai, .gitignore liste les fichiers à ignorer.' },
        { id: 'git_b14', type: 'mcq', question: 'Quelle commande affiche les différences non stagées ?', options: ['git diff', 'git changes', 'git delta', 'git compare'], correctAnswer: 0, explanation: 'git diff affiche les modifications non stagées.' },
        { id: 'git_b15', type: 'code-completion', question: 'Complétez pour pousser vers le dépôt distant :', code: 'git ______ origin main', correctAnswer: 'push', explanation: 'git push envoie les commits vers le dépôt distant.' },
        { id: 'git_b16', type: 'mcq', question: 'Comment voir les branches locales ?', options: ['git branch', 'git list', 'git branches', 'git show'], correctAnswer: 0, explanation: 'git branch sans argument liste les branches locales.' },
        { id: 'git_b17', type: 'true-false', question: 'Un merge fast-forward ne crée pas de commit de merge.', correctAnswer: true, explanation: 'Vrai, fast-forward déplace simplement le pointeur.' },
        { id: 'git_b18', type: 'code-completion', question: 'Complétez pour récupérer les modifications distantes :', code: 'git ______', correctAnswer: 'pull', explanation: 'git pull récupère et fusionne les changements distants.' },
        { id: 'git_b19', type: 'mcq', question: 'Comment supprimer une branche locale ?', options: ['git branch -d', 'git delete', 'git remove', 'git drop'], correctAnswer: 0, explanation: 'git branch -d supprime une branche fusionnée.' },
        { id: 'git_b20', type: 'true-false', question: 'git stash permet de sauvegarder temporairement des modifications.', correctAnswer: true, explanation: 'Vrai, stash met de côté les changements en cours.' }
    ]
};

// ----------------------------------------------------------------------
// NUMPY QUESTION BANK
// ----------------------------------------------------------------------

const numpyQuestionBanks = {
    numpy_basics: [
        { id: 'np_b1', type: 'mcq', question: 'Comment importer NumPy ?', options: ['import numpy as np', 'import np', 'from numpy import *', 'include numpy'], correctAnswer: 0, explanation: 'La convention est import numpy as np.' },
        { id: 'np_b2', type: 'code-completion', question: 'Complétez pour créer un array :', code: 'arr = np.____([1, 2, 3])', correctAnswer: 'array', explanation: 'np.array() crée un array NumPy depuis une liste.' },
        { id: 'np_b3', type: 'mcq', question: 'Quelle est la différence entre une liste et un array NumPy ?', options: ['Arrays sont plus rapides', 'Listes sont typées', 'Aucune', 'Arrays sont mutables'], correctAnswer: 0, explanation: 'Arrays NumPy sont optimisés et beaucoup plus rapides.' },
        { id: 'np_b4', type: 'code-completion', question: 'Complétez pour créer un array de zéros :', code: 'np.______(5)', correctAnswer: 'zeros', explanation: 'np.zeros() crée un array rempli de zéros.' },
        { id: 'np_b5', type: 'true-false', question: 'Un array NumPy peut contenir différents types de données.', correctAnswer: false, explanation: 'Faux, tous les éléments doivent avoir le même type.' },
        { id: 'np_b6', type: 'mcq', question: 'Comment créer un array de 1 à 10 ?', options: ['np.arange(1, 11)', 'np.range(1, 10)', 'np.array(1:10)', 'np.seq(1, 10)'], correctAnswer: 0, explanation: 'np.arange(1, 11) génère 1 à 10 inclus.' },
        { id: 'np_b7', type: 'code-completion', question: 'Complétez pour voir la forme d\'un array :', code: 'arr.______', correctAnswer: 'shape', explanation: 'shape retourne les dimensions (lignes, colonnes).' },
        { id: 'np_b8', type: 'mcq', question: 'Comment créer une matrice identité 3x3 ?', options: ['np.eye(3)', 'np.identity(3)', 'np.ones((3,3))', 'les deux premières'], correctAnswer: 3, explanation: 'np.eye() et np.identity() créent tous deux une matrice identité.' },
        { id: 'np_b9', type: 'true-false', question: 'Le broadcasting permet d\'opérer sur des arrays de tailles différentes.', correctAnswer: true, explanation: 'Vrai, NumPy étend automatiquement les dimensions compatibles.' },
        { id: 'np_b10', type: 'code-completion', question: 'Complétez pour redimensionner un array :', code: 'arr.______(2, 3)', correctAnswer: 'reshape', explanation: 'reshape() change la forme sans modifier les données.' },
        { id: 'np_b11', type: 'mcq', question: 'Comment sélectionner la première ligne d\'une matrice ?', options: ['arr[0]', 'arr[0, :]', 'arr.row(0)', 'les deux premières'], correctAnswer: 3, explanation: 'arr[0] et arr[0, :] sélectionnent tous deux la première ligne.' },
        { id: 'np_b12', type: 'code-completion', question: 'Complétez pour la moyenne d\'un array :', code: 'np.______(arr)', correctAnswer: 'mean', explanation: 'np.mean() calcule la moyenne des éléments.' },
        { id: 'np_b13', type: 'true-false', question: 'np.dot() calcule le produit scalaire.', correctAnswer: true, explanation: 'Vrai, dot() effectue le produit matriciel/scalaire.' },
        { id: 'np_b14', type: 'mcq', question: 'Comment créer un array de nombres aléatoires entre 0 et 1 ?', options: ['np.random.rand(5)', 'np.random(5)', 'np.rand(5)', 'np.random.random(5)'], correctAnswer: 0, explanation: 'np.random.rand() et random() fonctionnent tous deux.' },
        { id: 'np_b15', type: 'code-completion', question: 'Complétez pour l\'écart-type :', code: 'np.______(arr)', correctAnswer: 'std', explanation: 'np.std() calcule l\'écart-type (standard deviation).' },
        { id: 'np_b16', type: 'mcq', question: 'Comment transposer une matrice ?', options: ['arr.T', 'arr.transpose()', 'np.transpose(arr)', 'toutes les réponses'], correctAnswer: 3, explanation: 'Toutes ces méthodes transposent une matrice.' },
        { id: 'np_b17', type: 'true-false', question: 'np.where() fonctionne comme un if-else vectorisé.', correctAnswer: true, explanation: 'Vrai, where() applique une condition sur tout l\'array.' },
        { id: 'np_b18', type: 'code-completion', question: 'Complétez pour concaténer verticalement :', code: 'np.____([arr1, arr2])', correctAnswer: 'vstack', explanation: 'vstack() empile verticalement (vertical stack).' },
        { id: 'np_b19', type: 'mcq', question: 'Comment trouver l\'indice du maximum ?', options: ['np.argmax()', 'np.maxindex()', 'np.index_max()', 'np.max().index'], correctAnswer: 0, explanation: 'argmax() retourne l\'indice de la valeur max.' },
        { id: 'np_b20', type: 'true-false', question: 'Les opérations NumPy sont plus rapides que les boucles Python natives.', correctAnswer: true, explanation: 'Vrai, NumPy est optimisé en C et vectorisé.' }
    ]
};

// ----------------------------------------------------------------------
// VISUALIZATION QUESTION BANK
// ----------------------------------------------------------------------

const vizQuestionBanks = {
    viz_basics: [
        { id: 'viz_b1', type: 'mcq', question: 'Comment importer Matplotlib ?', options: ['import matplotlib.pyplot as plt', 'import plt', 'from matplotlib import *', 'import matplotlib'], correctAnswer: 0, explanation: 'La convention est import matplotlib.pyplot as plt.' },
        { id: 'viz_b2', type: 'code-completion', question: 'Complétez pour afficher un graphique :', code: 'plt.______()', correctAnswer: 'show', explanation: 'plt.show() affiche le graphique créé.' },
        { id: 'viz_b3', type: 'mcq', question: 'Quelle fonction crée un graphique linéaire ?', options: ['plt.plot()', 'plt.line()', 'plt.graph()', 'plt.draw()'], correctAnswer: 0, explanation: 'plt.plot() crée un graphique linéaire.' },
        { id: 'viz_b4', type: 'code-completion', question: 'Complétez pour ajouter un titre :', code: 'plt.______("Titre")', correctAnswer: 'title', explanation: 'plt.title() définit le titre du graphique.' },
        { id: 'viz_b5', type: 'true-false', question: 'plt.xlabel() définit le label de l\'axe des abscisses.', correctAnswer: true, explanation: 'Vrai, xlabel() nomme l\'axe horizontal.' },
        { id: 'viz_b6', type: 'mcq', question: 'Comment créer un histogramme ?', options: ['plt.hist()', 'plt.histogram()', 'plt.bar()', 'plt.bins()'], correctAnswer: 0, explanation: 'plt.hist() crée un histogramme de distribution.' },
        { id: 'viz_b7', type: 'code-completion', question: 'Complétez pour un nuage de points :', code: 'plt.______(x, y)', correctAnswer: 'scatter', explanation: 'plt.scatter() crée un scatter plot.' },
        { id: 'viz_b8', type: 'mcq', question: 'Quelle bibliothèque est construite sur Matplotlib ?', options: ['Seaborn', 'Plotly', 'Bokeh', 'Altair'], correctAnswer: 0, explanation: 'Seaborn est une surcouche statistique de Matplotlib.' },
        { id: 'viz_b9', type: 'true-false', question: 'plt.figure(figsize=(10, 6)) change la taille du graphique.', correctAnswer: true, explanation: 'Vrai, figsize définit la taille (largeur, hauteur).' },
        { id: 'viz_b10', type: 'code-completion', question: 'Complétez pour un barplot Seaborn :', code: 'sns.______(data=df, x="cat", y="val")', correctAnswer: 'barplot', explanation: 'sns.barplot() crée un diagramme en barres.' },
        { id: 'viz_b11', type: 'mcq', question: 'Comment créer une grille de sous-graphiques 2x2 ?', options: ['plt.subplots(2, 2)', 'plt.grid(2, 2)', 'plt.subplot(2, 2)', 'plt.layout(2, 2)'], correctAnswer: 0, explanation: 'plt.subplots(2, 2) crée une grille 2x2.' },
        { id: 'viz_b12', type: 'code-completion', question: 'Complétez pour une heatmap Seaborn :', code: 'sns.______(data)', correctAnswer: 'heatmap', explanation: 'sns.heatmap() crée une carte de chaleur.' },
        { id: 'viz_b13', type: 'true-false', question: 'plt.legend() ajoute une légende au graphique.', correctAnswer: true, explanation: 'Vrai, legend() affiche la légende des courbes.' },
        { id: 'viz_b14', type: 'mcq', question: 'Comment sauvegarder un graphique ?', options: ['plt.savefig()', 'plt.save()', 'plt.export()', 'plt.write()'], correctAnswer: 0, explanation: 'plt.savefig() sauvegarde en image (PNG, SVG, etc.).' },
        { id: 'viz_b15', type: 'code-completion', question: 'Complétez pour un boxplot Seaborn :', code: 'sns.______(data=df, x="cat", y="val")', correctAnswer: 'boxplot', explanation: 'sns.boxplot() crée une boîte à moustaches.' },
        { id: 'viz_b16', type: 'mcq', question: 'Comment changer la palette de couleurs Seaborn ?', options: ['sns.set_palette()', 'sns.color()', 'sns.theme()', 'sns.style()'], correctAnswer: 0, explanation: 'set_palette() définit les couleurs par défaut.' },
        { id: 'viz_b17', type: 'true-false', question: 'plt.grid(True) affiche une grille sur le graphique.', correctAnswer: true, explanation: 'Vrai, grid() active la grille de fond.' },
        { id: 'viz_b18', type: 'code-completion', question: 'Complétez pour un pairplot Seaborn :', code: 'sns.______(df)', correctAnswer: 'pairplot', explanation: 'pairplot() affiche toutes les relations bivariées.' },
        { id: 'viz_b19', type: 'mcq', question: 'Quelle fonction ajoute du texte à un point spécifique ?', options: ['plt.text()', 'plt.annotate()', 'plt.label()', 'les deux premières'], correctAnswer: 3, explanation: 'text() et annotate() ajoutent du texte sur le graphique.' },
        { id: 'viz_b20', type: 'true-false', question: 'Seaborn nécessite que les données soient au format tidy (long).', correctAnswer: true, explanation: 'Vrai, Seaborn fonctionne mieux avec des données "tidy".' }
    ]
};

// ----------------------------------------------------------------------
// PYSPARK QUESTION BANK
// ----------------------------------------------------------------------

const pysparkQuestionBanks = {
    pyspark_basics: [
        { id: 'ps_b1', type: 'mcq', question: 'Qu\'est-ce qu\'une SparkSession ?', options: ['Point d\'entrée Spark', 'Type de DataFrame', 'Moteur SQL', 'Cluster manager'], correctAnswer: 0, explanation: 'SparkSession est le point d\'entrée de toute application Spark.' },
        { id: 'ps_b2', type: 'code-completion', question: 'Complétez pour créer une SparkSession :', code: 'spark = SparkSession.______.appName("App").getOrCreate()', correctAnswer: 'builder', explanation: 'builder() démarre la construction de la session.' },
        { id: 'ps_b3', type: 'mcq', question: 'Quelle est la différence entre transformation et action ?', options: ['Transformation lazy, action exécute', 'Identiques', 'Action lazy', 'Transformation rapide'], correctAnswer: 0, explanation: 'Transformations sont lazy, actions déclenchent l\'exécution.' },
        { id: 'ps_b4', type: 'code-completion', question: 'Complétez pour afficher les données :', code: 'df.______(10)', correctAnswer: 'show', explanation: 'show() affiche les n premières lignes.' },
        { id: 'ps_b5', type: 'true-false', question: 'PySpark utilise le même API que Pandas.', correctAnswer: false, explanation: 'Faux, l\'API est similaire mais différent (distribué).' },
        { id: 'ps_b6', type: 'mcq', question: 'Comment lire un CSV en PySpark ?', options: ['spark.read.csv()', 'pd.read_csv()', 'spark.load_csv()', 'spark.csv()'], correctAnswer: 0, explanation: 'spark.read.csv() lit un fichier CSV.' },
        { id: 'ps_b7', type: 'code-completion', question: 'Complétez pour filtrer :', code: 'df.______(col("age") > 18)', correctAnswer: 'filter', explanation: 'filter() ou where() filtrent les lignes.' },
        { id: 'ps_b8', type: 'mcq', question: 'Quel format est optimisé pour Spark ?', options: ['Parquet', 'CSV', 'JSON', 'XML'], correctAnswer: 0, explanation: 'Parquet est columnaire et compressé, idéal pour Spark.' },
        { id: 'ps_b9', type: 'true-false', question: 'withColumn() crée ou modifie une colonne.', correctAnswer: true, explanation: 'Vrai, withColumn() ajoute ou remplace une colonne.' },
        { id: 'ps_b10', type: 'code-completion', question: 'Complétez pour compter les lignes :', code: 'df.______()', correctAnswer: 'count', explanation: 'count() est une action qui retourne le nombre de lignes.' },
        { id: 'ps_b11', type: 'mcq', question: 'Comment importer les fonctions SQL ?', options: ['from pyspark.sql.functions import *', 'import pyspark.functions', 'from spark import sql', 'import sql'], correctAnswer: 0, explanation: 'Les fonctions sont dans pyspark.sql.functions.' },
        { id: 'ps_b12', type: 'code-completion', question: 'Complétez pour grouper :', code: 'df.______("ville").count()', correctAnswer: 'groupBy', explanation: 'groupBy() crée des groupes pour agrégation.' },
        { id: 'ps_b13', type: 'true-false', question: 'Les DataFrames Spark sont mutables.', correctAnswer: false, explanation: 'Faux, les DataFrames Spark sont immutables.' },
        { id: 'ps_b14', type: 'mcq', question: 'Comment renommer une colonne ?', options: ['withColumnRenamed()', 'rename()', 'changeColumn()', 'setName()'], correctAnswer: 0, explanation: 'withColumnRenamed() renomme une colonne existante.' },
        { id: 'ps_b15', type: 'code-completion', question: 'Complétez pour sélectionner des colonnes :', code: 'df.______("nom", "age")', correctAnswer: 'select', explanation: 'select() choisit les colonnes à garder.' },
        { id: 'ps_b16', type: 'mcq', question: 'Qu\'est-ce qu\'une partition en Spark ?', options: ['Division des données', 'Type de fichier', 'Fonction SQL', 'Cluster'], correctAnswer: 0, explanation: 'Une partition est un morceau de données distribué.' },
        { id: 'ps_b17', type: 'true-false', question: 'cache() améliore les performances en gardant les données en mémoire.', correctAnswer: true, explanation: 'Vrai, cache() stocke le DataFrame en RAM.' },
        { id: 'ps_b18', type: 'code-completion', question: 'Complétez pour joindre deux DataFrames :', code: 'df1.______(df2, "id")', correctAnswer: 'join', explanation: 'join() fusionne deux DataFrames sur une clé.' },
        { id: 'ps_b19', type: 'mcq', question: 'Comment supprimer une colonne ?', options: ['drop()', 'remove()', 'delete()', 'dropColumn()'], correctAnswer: 0, explanation: 'drop() supprime une ou plusieurs colonnes.' },
        { id: 'ps_b20', type: 'true-false', question: 'PySpark peut être utilisé pour du streaming en temps réel.', correctAnswer: true, explanation: 'Vrai, Spark Structured Streaming gère le temps réel.' }
    ]
};

// ----------------------------------------------------------------------
// DAX QUESTION BANK
// ----------------------------------------------------------------------

const daxQuestionBanks = {
    dax_basics: [
        { id: 'dax_b1', type: 'mcq', question: 'Qu\'est-ce que DAX ?', options: ['Langage de formules', 'Base de données', 'Outil de viz', 'Format de fichier'], correctAnswer: 0, explanation: 'DAX (Data Analysis Expressions) est un langage de formules.' },
        { id: 'dax_b2', type: 'code-completion', question: 'Complétez pour une somme :', code: 'Total = ____([Ventes])', correctAnswer: 'SUM', explanation: 'SUM() additionne toutes les valeurs d\'une colonne.' },
        { id: 'dax_b3', type: 'mcq', question: 'Quelle est la différence entre mesure et colonne calculée ?', options: ['Mesure dynamique, colonne statique', 'Identiques', 'Mesure stockée', 'Colonne temporaire'], correctAnswer: 0, explanation: 'Les mesures sont calculées selon le contexte, les colonnes sont fixes.' },
        { id: 'dax_b4', type: 'code-completion', question: 'Complétez pour une moyenne :', code: 'MoyenneVentes = ____([Ventes])', correctAnswer: 'AVERAGE', explanation: 'AVERAGE() calcule la moyenne d\'une colonne.' },
        { id: 'dax_b5', type: 'true-false', question: 'Les mesures sont calculées à la volée selon le contexte.', correctAnswer: true, explanation: 'Vrai, les mesures s\'adaptent aux filtres appliqués.' },
        { id: 'dax_b6', type: 'mcq', question: 'Quelle fonction compte les lignes ?', options: ['COUNTROWS()', 'COUNT()', 'ROWS()', 'TOTAL()'], correctAnswer: 0, explanation: 'COUNTROWS() compte le nombre de lignes d\'une table.' },
        { id: 'dax_b7', type: 'code-completion', question: 'Complétez pour filtrer :', code: 'CALCULATE([Mesure], ______(Produit[Categorie] = "Vêtements"))', correctAnswer: 'FILTER', explanation: 'FILTER() applique une condition sur une table.' },
        { id: 'dax_b8', type: 'mcq', question: 'Quelle fonction retourne la valeur max ?', options: ['MAX()', 'MAXIMUM()', 'TOP()', 'HIGHEST()'], correctAnswer: 0, explanation: 'MAX() retourne la valeur maximale.' },
        { id: 'dax_b9', type: 'true-false', question: 'RELATED() permet d\'accéder à une colonne d\'une table liée.', correctAnswer: true, explanation: 'Vrai, RELATED() suit les relations entre tables.' },
        { id: 'dax_b10', type: 'code-completion', question: 'Complétez pour compter les valeurs distinctes :', code: '______(Colonne)', correctAnswer: 'DISTINCTCOUNT', explanation: 'DISTINCTCOUNT() compte les valeurs uniques.' },
        { id: 'dax_b11', type: 'mcq', question: 'Comment créer une mesure conditionnelle ?', options: ['IF()', 'WHEN()', 'CASE()', 'SWITCH()'], correctAnswer: 0, explanation: 'IF() ou SWITCH() permettent les conditions.' },
        { id: 'dax_b12', type: 'code-completion', question: 'Complétez pour enlever tous les filtres :', code: 'CALCULATE([Mesure], ______()', correctAnswer: 'ALL', explanation: 'ALL() supprime tous les filtres d\'une table ou colonne.' },
        { id: 'dax_b13', type: 'true-false', question: 'CALCULATE() modifie le contexte de filtre.', correctAnswer: true, explanation: 'Vrai, CALCULATE() est la fonction centrale pour modifier le contexte.' },
        { id: 'dax_b14', type: 'mcq', question: 'Quelle fonction cumule des valeurs ?', options: ['TOTALYTD()', 'CUMULATE()', 'RUNNINGTOTAL()', 'ACCUMULATE()'], correctAnswer: 0, explanation: 'TOTALYTD() calcule le total depuis le début de l\'année.' },
        { id: 'dax_b15', type: 'code-completion', question: 'Complétez pour diviser en sécurité :', code: '____([Numérateur], [Dénominateur])', correctAnswer: 'DIVIDE', explanation: 'DIVIDE() gère la division par zéro automatiquement.' },
        { id: 'dax_b16', type: 'mcq', question: 'Comment obtenir l\'année d\'une date ?', options: ['YEAR()', 'GETYEAR()', 'DATE.YEAR()', 'EXTRACT()'], correctAnswer: 0, explanation: 'YEAR() extrait l\'année d\'une date.' },
        { id: 'dax_b17', type: 'true-false', question: 'Les colonnes calculées occupent de l\'espace de stockage.', correctAnswer: true, explanation: 'Vrai, elles sont stockées dans le modèle.' },
        { id: 'dax_b18', type: 'code-completion', question: 'Complétez pour créer une table calculée :', code: 'NouvelleTable = ______(TableSource, [Colonne] > 100)', correctAnswer: 'FILTER', explanation: 'FILTER() crée une table filtrée.' },
        { id: 'dax_b19', type: 'mcq', question: 'Quelle fonction retourne la date actuelle ?', options: ['TODAY()', 'NOW()', 'CURRENTDATE()', 'DATE()'], correctAnswer: 0, explanation: 'TODAY() retourne la date du jour.' },
        { id: 'dax_b20', type: 'true-false', question: 'EARLIER() permet d\'accéder au contexte de ligne précédent.', correctAnswer: true, explanation: 'Vrai, EARLIER() référence le contexte externe dans les colonnes calculées.' }
    ]
};

// ----------------------------------------------------------------------
// QUIZ CATEGORIES
// ----------------------------------------------------------------------

export const QUIZ_CATEGORIES = {
    python: { id: 'python', label: 'Python', icon: '🐍', color: 'blue' },
    sql: { id: 'sql', label: 'SQL', icon: '🗄️', color: 'green' },
    powerbi: { id: 'powerbi', label: 'Power BI', icon: '📊', color: 'yellow' },
    git: { id: 'git', label: 'Git', icon: '🔧', color: 'orange' },
    pyspark: { id: 'pyspark', label: 'PySpark', icon: '⚡', color: 'purple' },
    nosql: { id: 'nosql', label: 'NoSQL', icon: '📦', color: 'emerald' },
    r: { id: 'r', label: 'R', icon: '📈', color: 'indigo' }
};

// ----------------------------------------------------------------------
// QUIZ DEFINITIONS
// ----------------------------------------------------------------------

export const quizzes = {
    python: [
        {
            id: 'pandas_basics',
            title: 'Pandas - Les Bases',
            description: 'Structures de données, lecture de fichiers, sélection basique',
            category: 'python',
            difficulty: 'beginner',
            tags: ['pandas', 'data-science', 'basics'],
            estimatedTime: 5,
            questionCount: 5,
            questionBank: 'pandas_basics'
        },
        {
            id: 'pandas_intermediate',
            title: 'Pandas - Intermédiaire',
            description: 'Nettoyage, manipulation, apply, merge',
            category: 'python',
            difficulty: 'intermediate',
            tags: ['pandas', 'data-science'],
            estimatedTime: 10,
            questionCount: 5,
            questionBank: 'pandas_intermediate'
        },
        {
            id: 'pandas_advanced',
            title: 'Pandas - Avancé',
            description: 'Optimisation, time series, reshaping complexe',
            category: 'python',
            difficulty: 'advanced',
            tags: ['pandas', 'data-science', 'advanced'],
            estimatedTime: 15,
            questionCount: 5,
            questionBank: 'pandas_advanced'
        },
        {
            id: 'python_basics',
            title: 'Python - Les Bases',
            description: 'Variables, types, structures de données, boucles',
            category: 'python',
            difficulty: 'beginner',
            tags: ['python', 'basics', 'fundamentals'],
            estimatedTime: 5,
            questionCount: 5,
            questionBank: 'python_basics'
        }
    ],
    sql: [
        {
            id: 'sql_basics',
            title: 'SQL - Les Bases',
            description: 'SELECT, WHERE, fonctions de base',
            category: 'sql',
            difficulty: 'beginner',
            tags: ['sql', 'basics'],
            estimatedTime: 5,
            questionCount: 5,
            questionBank: 'sql_basics'
        },
        {
            id: 'sql_intermediate',
            title: 'SQL - Intermédiaire',
            description: 'Jointures, Group By, Having, Sous-requêtes',
            category: 'sql',
            difficulty: 'intermediate',
            tags: ['sql', 'joins', 'aggregation'],
            estimatedTime: 10,
            questionCount: 5,
            questionBank: 'sql_intermediate'
        }
    ],
    powerquery: [
        {
            id: 'm_basics',
            title: 'Power Query M - Les Bases',
            description: 'Syntaxe M, transformations, fonctions de base',
            category: 'powerbi',
            difficulty: 'beginner',
            tags: ['m', 'power-query', 'etl'],
            estimatedTime: 5,
            questionCount: 5,
            questionBank: 'm_basics'
        }
    ],
    nosql: [
        {
            id: 'nosql_basics',
            title: 'NoSQL (MongoDB) - Les Bases',
            description: 'Documents, collections, requêtes de base',
            category: 'nosql',
            difficulty: 'beginner',
            tags: ['nosql', 'mongodb', 'database'],
            estimatedTime: 5,
            questionCount: 5,
            questionBank: 'nosql_basics'
        },
        {
            id: 'mongodb_aggregate',
            title: 'MongoDB - Pipeline d\'Agrégation',
            description: '$match, $group, $project, $unwind, $sort',
            category: 'nosql',
            difficulty: 'intermediate',
            tags: ['mongodb', 'aggregation', 'pipeline'],
            estimatedTime: 10,
            questionCount: 5,
            questionBank: 'mongodb_aggregate'
        },
        {
            id: 'mongodb_advanced',
            title: 'MongoDB - Avancé',
            description: '$lookup, variables, sous-requêtes, pièges',
            category: 'nosql',
            difficulty: 'advanced',
            tags: ['mongodb', 'lookup', 'advanced'],
            estimatedTime: 15,
            questionCount: 5,
            questionBank: 'mongodb_advanced'
        }
    ],
    r: [
        {
            id: 'r_basics',
            title: 'R - Les Bases',
            description: 'Vecteurs, dataframes, dplyr, ggplot2',
            category: 'r',
            difficulty: 'beginner',
            tags: ['r', 'data-science', 'statistics'],
            estimatedTime: 5,
            questionCount: 5,
            questionBank: 'r_basics'
        }
    ],
    git: [
        {
            id: 'git_basics',
            title: 'Git - Les Bases',
            description: 'Init, commit, branch, merge, push/pull',
            category: 'git',
            difficulty: 'beginner',
            tags: ['git', 'version-control', 'basics'],
            estimatedTime: 5,
            questionCount: 5,
            questionBank: 'git_basics'
        }
    ],
    numpy: [
        {
            id: 'numpy_basics',
            title: 'NumPy - Les Bases',
            description: 'Arrays, indexing, operations, broadcasting',
            category: 'python',
            difficulty: 'beginner',
            tags: ['numpy', 'python', 'data-science'],
            estimatedTime: 5,
            questionCount: 5,
            questionBank: 'numpy_basics'
        }
    ],
    visualization: [
        {
            id: 'viz_basics',
            title: 'Visualisation - Matplotlib/Seaborn',
            description: 'Graphiques, heatmaps, subplots, customisation',
            category: 'python',
            difficulty: 'beginner',
            tags: ['matplotlib', 'seaborn', 'visualization'],
            estimatedTime: 5,
            questionCount: 5,
            questionBank: 'viz_basics'
        }
    ],
    pyspark: [
        {
            id: 'pyspark_basics',
            title: 'PySpark - Les Bases',
            description: 'SparkSession, transformations, actions, DataFrames',
            category: 'pyspark',
            difficulty: 'beginner',
            tags: ['pyspark', 'spark', 'big-data'],
            estimatedTime: 5,
            questionCount: 5,
            questionBank: 'pyspark_basics'
        }
    ],
    dax: [
        {
            id: 'dax_basics',
            title: 'DAX - Les Bases',
            description: 'Mesures, colonnes calculées, CALCULATE, contexte',
            category: 'powerbi',
            difficulty: 'beginner',
            tags: ['dax', 'power-bi', 'formulas'],
            estimatedTime: 5,
            questionCount: 5,
            questionBank: 'dax_basics'
        }
    ]
};

// ----------------------------------------------------------------------
// HELPER FUNCTIONS
// ----------------------------------------------------------------------

// Helper to select random questions from a bank
function selectRandomQuestions(questionBank, count = 5) {
    if (!questionBank) return [];
    const shuffled = [...questionBank].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, questionBank.length));
}

// Get all quizzes
export function getAllQuizzes() {
    return Object.values(quizzes).flat();
}

// Get quizzes by language
export function getQuizzesByLanguage(language) {
    if (!language) return [];
    return quizzes[language.toLowerCase()] || [];
}

// Get quizzes by category
export function getQuizzesByCategory(categoryId) {
    if (!categoryId || categoryId === 'all') return getAllQuizzes();
    return getAllQuizzes().filter(q => q.category === categoryId);
}

// Get quiz by ID with random questions
export function getQuizById(quizId) {
    const allQuizzes = getAllQuizzes();
    const quiz = allQuizzes.find(q => q.id === quizId);

    if (!quiz) return null;

    // Load questions from bank if specified
    if (quiz.questionBank) {
        let bank = pythonQuestionBanks[quiz.questionBank] ||
            sqlQuestionBanks[quiz.questionBank] ||
            pythonBasicsQuestionBanks[quiz.questionBank] ||
            mQuestionBanks[quiz.questionBank] ||
            nosqlQuestionBanks[quiz.questionBank] ||
            rQuestionBanks[quiz.questionBank] ||
            gitQuestionBanks[quiz.questionBank] ||
            numpyQuestionBanks[quiz.questionBank] ||
            vizQuestionBanks[quiz.questionBank] ||
            pysparkQuestionBanks[quiz.questionBank] ||
            daxQuestionBanks[quiz.questionBank];

        if (bank) {
            const selectedQuestions = selectRandomQuestions(bank, quiz.questionCount || 5);
            return { ...quiz, questions: selectedQuestions };
        }
    }

    return quiz;
}

// Get quizzes by difficulty
export function getQuizzesByDifficulty(difficulty) {
    return getAllQuizzes().filter(q => q.difficulty === difficulty);
}

// Get quizzes by tag
export function getQuizzesByTag(tag) {
    return getAllQuizzes().filter(q => q.tags.includes(tag));
}

// Get question bank stats
export function getQuestionBankStats(bankName) {
    const bank = pythonQuestionBanks[bankName] || sqlQuestionBanks[bankName];
    if (!bank) return null;

    return {
        total: bank.length,
        byType: {
            mcq: bank.filter(q => q.type === 'mcq').length,
            codeCompletion: bank.filter(q => q.type === 'code-completion').length,
            trueFalse: bank.filter(q => q.type === 'true-false').length
        }
    };
}

// Get all questions from a question bank (for flashcards)
export function getAllQuestionsFromBank(bankName) {
    return pythonQuestionBanks[bankName] || sqlQuestionBanks[bankName] || [];
}
