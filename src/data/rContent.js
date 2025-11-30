export const rContent = {
    themes: [
        {
            id: 'r_basics',
            title: 'R (Tidyverse)',
            description: 'Manipulation de données moderne',
            categories: [
                {
                    id: 'dplyr_basics',
                    title: 'Dplyr Basics',
                    description: 'Les verbes essentiels',
                    snippets: [
                        {
                            id: 'select_filter',
                            title: 'Select & Filter',
                            description: 'Choisir colonnes et lignes.',
                            level: 'beginner',
                            tags: ['r', 'dplyr', 'filter', 'select'],
                            code: `library(dplyr)

# Sélectionner des colonnes
df %>% select(nom, age)

# Filtrer des lignes
df %>% filter(age > 21)`
                        },
                        {
                            id: 'mutate',
                            title: 'Mutate',
                            description: 'Créer ou modifier des colonnes.',
                            level: 'beginner',
                            tags: ['r', 'dplyr', 'mutate'],
                            code: `# Créer une nouvelle colonne
df %>% mutate(age_double = age * 2)`
                        },
                        {
                            id: 'groupby_summarize',
                            title: 'GroupBy & Summarize',
                            description: 'Agréger des données.',
                            level: 'intermediate',
                            tags: ['r', 'dplyr', 'group-by', 'summarise'],
                            code: `# Moyenne d'âge par ville
df %>% 
  group_by(ville) %>% 
  summarise(
    age_moyen = mean(age, na.rm = TRUE),
    nb = n()
  )`
                        }
                    ]
                }
            ]
        }
    ]
};
