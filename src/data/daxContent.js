export const daxContent = {
    themes: [
        {
            id: 'dax_basics',
            title: 'DAX (Power BI)',
            description: 'Data Analysis Expressions',
            categories: [
                {
                    id: 'fundamentals',
                    title: 'Fondamentaux',
                    description: 'Les fonctions indispensables',
                    snippets: [
                        {
                            id: 'calculate',
                            title: 'CALCULATE',
                            description: 'La fonction la plus importante. Modifie le contexte de filtre.',
                            code: `Ventes Rouges = 
CALCULATE(
    SUM(Ventes[Montant]),
    Produits[Couleur] = "Rouge"
)`
                        },
                        {
                            id: 'related',
                            title: 'RELATED',
                            description: 'Accéder aux colonnes d\'une autre table (comme un VLOOKUP).',
                            code: `Prix Unitaire = RELATED(Produits[Prix])`
                        }
                    ]
                },
                {
                    id: 'time_intelligence',
                    title: 'Time Intelligence',
                    description: 'Manipuler le temps (YTD, YoY)',
                    snippets: [
                        {
                            id: 'totalytd',
                            title: 'TOTALYTD (Année à date)',
                            description: 'Cumul depuis le début de l\'année.',
                            code: `Ventes YTD = 
TOTALYTD(
    SUM(Ventes[Montant]),
    'Date'[Date]
)`
                        },
                        {
                            id: 'sameperiodlastyear',
                            title: 'SAMEPERIODLASTYEAR',
                            description: 'Comparer avec la même période l\'année précédente.',
                            code: `Ventes Année Précédente = 
CALCULATE(
    SUM(Ventes[Montant]),
    SAMEPERIODLASTYEAR('Date'[Date])
)`
                        }
                    ]
                }
            ]
        }
    ]
};
