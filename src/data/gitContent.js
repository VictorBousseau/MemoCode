import { GitBranch, Settings, UploadCloud, RefreshCw, Lock } from 'lucide-react';

export const gitContent = {
    themes: [
        {
            id: 'git_basics',
            title: 'Git & GitHub',
            description: 'Version Control & Collaboration',
            categories: [
                {
                    id: 'config_init',
                    title: '1. Configuration & Initialisation',
                    description: 'À faire une seule fois (ou presque).',
                    snippets: [
                        {
                            id: 'git_config',
                            title: 'Configuration de l\'identité',
                            description: 'Indispensable pour que vos commits vous soient attribués.',
                            level: 'beginner',
                            tags: ['git', 'config', 'setup'],
                            code: `# Définir votre nom (apparaîtra dans l'historique)
git config --global user.name "Votre Prénom Nom"

# Définir votre email (doit correspondre à celui de GitHub)
git config --global user.email "votre.email@exemple.com"

# Vérifier la configuration
git config --list`
                        },
                        {
                            id: 'git_init',
                            title: 'Démarrer un projet (Init)',
                            description: 'Transformer un dossier classique en dépôt Git.',
                            level: 'beginner',
                            tags: ['git', 'init', 'setup'],
                            code: `# 1. Se placer dans le dossier du projet
cd mon_projet

# 2. Initialiser Git
git init

# Résultat : Un dossier caché .git est créé. Git surveille maintenant les fichiers.`
                        },
                        {
                            id: 'git_clone',
                            title: 'Cloner un projet existant',
                            description: 'Récupérer un projet depuis GitHub sur votre machine.',
                            level: 'beginner',
                            tags: ['git', 'clone', 'setup'],
                            code: `# Cloner via HTTPS (le plus simple)
git clone https://github.com/utilisateur/nom-du-projet.git

# Se déplacer dans le dossier créé
cd nom-du-projet`
                        }
                    ]
                },
                {
                    id: 'workflow',
                    title: '2. Workflow Quotidien',
                    description: 'Add, Commit, Status, Log',
                    snippets: [
                        {
                            id: 'git_status',
                            title: 'Vérifier l\'état (Status)',
                            description: 'A utiliser tout le temps ! Pour savoir ce qui a changé.',
                            level: 'beginner',
                            tags: ['git', 'status', 'workflow'],
                            code: `git status

# Rouge : Fichiers modifiés mais pas encore prêts à être commités (Working Directory)
# Vert : Fichiers prêts à être commités (Staging Area)`
                        },
                        {
                            id: 'git_add',
                            title: 'Préparer les fichiers (Add)',
                            description: 'Passer du "Rouge" au "Vert" (Staging).',
                            level: 'beginner',
                            tags: ['git', 'add', 'workflow'],
                            code: `# Ajouter un fichier spécifique
git add mon_fichier.py

# Ajouter TOUS les fichiers modifiés (le plus courant)
git add .`
                        },
                        {
                            id: 'git_commit',
                            title: 'Enregistrer les changements (Commit)',
                            description: 'Créer un point de sauvegarde avec un message.',
                            level: 'beginner',
                            tags: ['git', 'commit', 'workflow'],
                            code: `# Créer un commit avec un message clair
git commit -m "Ajout de la fonction de nettoyage des données"

# Bonnes pratiques :
# - Un commit par tâche logique
# - Message impératif ("Add feature" pas "Added feature")`
                        },
                        {
                            id: 'git_log',
                            title: 'Voir l\'historique (Log)',
                            description: 'Qui a fait quoi et quand ?',
                            level: 'advanced',
                            tags: ['git', 'log', 'history'],
                            code: `# Historique simple
git log

# Historique compact et joli (très utile)
git log --oneline --graph --all`
                        }
                    ]
                },
                {
                    id: 'branches',
                    title: '3. Branches & Fusion',
                    description: 'Travailler en parallèle sans casser le code principal.',
                    snippets: [
                        {
                            id: 'create_switch',
                            title: 'Créer et Changer de branche',
                            description: 'Ne travaillez jamais directement sur "main" ou "master" !',
                            level: 'intermediate',
                            tags: ['git', 'branch', 'workflow'],
                            code: `# Créer une nouvelle branche et basculer dessus (recommandé)
git checkout -b feature/nouvelle-analyse

# Ou en deux temps (ancienne méthode)
# git branch feature/nouvelle-analyse
# git checkout feature/nouvelle-analyse

# Revenir sur la branche principale
git checkout main`
                        },
                        {
                            id: 'git_merge',
                            title: 'Fusionner (Merge)',
                            description: 'Ramener les changements d\'une branche vers le main.',
                            level: 'intermediate',
                            tags: ['git', 'merge', 'workflow'],
                            code: `# 1. Se placer sur la branche qui REÇOIT (souvent main)
git checkout main

# 2. Mettre à jour le main (bon réflexe)
git pull origin main

# 3. Fusionner votre branche de travail
git merge feature/nouvelle-analyse`
                        }
                    ]
                },
                {
                    id: 'remote_auth',
                    title: '4. Remote & Authentification',
                    description: 'Push, Pull et Sécurité (Tokens)',
                    snippets: [
                        {
                            id: 'remote_add',
                            title: 'Lier à GitHub (Remote)',
                            description: 'Si vous avez fait "git init" en local, il faut le lier à un repo GitHub vide.',
                            level: 'beginner',
                            tags: ['git', 'remote', 'setup'],
                            code: `# Ajouter l'adresse du dépôt distant (appelé "origin")
git remote add origin https://github.com/votre-user/votre-projet.git

# Vérifier
git remote -v`
                        },
                        {
                            id: 'auth_token',
                            title: 'Authentification (Token vs Password)',
                            description: 'Depuis 2021, les mots de passe ne fonctionnent plus pour le Push !',
                            subCategory: 'Sécurité & Accès',
                            level: 'intermediate',
                            tags: ['git', 'auth', 'security'],
                            code: `# Option 1 : Personal Access Token (PAT) - Le plus courant
# 1. Allez sur GitHub -> Settings -> Developer settings -> Personal access tokens -> Tokens (classic)
# 2. Générez un token (cochez 'repo' pour un accès complet au code)
# 3. Copiez le token (il ne s'affichera qu'une fois !)
# 4. Lors du premier 'git push', utilisez ce token comme mot de passe.

# Astuce Windows : Le "Credential Manager" de Windows va le mémoriser pour vous.`
                        },
                        {
                            id: 'git_push',
                            title: 'Envoyer vers GitHub (Push)',
                            description: 'Mettre à jour le dépôt distant.',
                            subCategory: 'Synchronisation',
                            level: 'beginner',
                            tags: ['git', 'push', 'workflow'],
                            code: `# Premier push (pour lier la branche locale à la distante)
git push -u origin main

# Les fois suivantes
git push`
                        },
                        {
                            id: 'git_pull',
                            title: 'Récupérer les changements (Pull)',
                            description: 'Mettre à jour votre local depuis GitHub.',
                            subCategory: 'Synchronisation',
                            level: 'beginner',
                            tags: ['git', 'pull', 'workflow'],
                            code: `# Récupérer et fusionner les changements
git pull origin main

# Si vous avez des conflits, Git vous préviendra.`
                        }
                    ]
                }
            ],
        },
        {
            id: 'git_advanced',
            title: 'Git Avancé',
            description: 'Pour un historique propre et maîtrisé.',
            categories: [
                {
                    id: 'clean_history',
                    title: '1. Historique Propre',
                    description: 'Rebase et Cherry-pick.',
                    snippets: [
                        {
                            id: 'rebase_vs_merge',
                            title: 'Rebase vs Merge',
                            description: 'Garder un historique linéaire.',
                            level: 'advanced',
                            tags: ['git', 'rebase', 'merge', 'history'],
                            markdown: `### 🌿 Merge vs Rebase
**Merge** : Crée un commit de fusion ("Merge branch..."). Préserve la réalité historique mais peut polluer le graphe.
**Rebase** : Réécrit l'histoire. Place vos commits **à la suite** de la branche cible.

\`\`\`bash
# Se placer sur sa branche
git checkout ma-feature

# Rebaser sur main (Mettre mes changements APRES ceux de main)
git rebase main
\`\`\`
⚠️ **Règle d'or** : Ne jamais rebaser une branche partagée (déjà pushée) !`
                        },
                        {
                            id: 'cherry_pick',
                            title: 'Cherry-Pick',
                            description: 'Picorer un commit spécifique.',
                            level: 'advanced',
                            tags: ['git', 'cherry-pick', 'advanced'],
                            code: `# Vous voulez juste le commit "Fix bug" de la branche "dev" sur votre branche "main"
# sans tout fusionner.

git cherry-pick <hash_du_commit>`
                        }
                    ]
                },
                {
                    id: 'ignoring',
                    title: '2. Ignorer des fichiers (.gitignore)',
                    description: 'Ne polluez pas votre dépôt !',
                    snippets: [
                        {
                            id: 'gitignore_guide',
                            title: 'Guide : Créer son .gitignore',
                            description: 'Pas à pas pour exclure les fichiers indésirables.',
                            level: 'intermediate',
                            tags: ['git', 'gitignore', 'setup'],
                            markdown: `### 📝 La Procédure
1.  Créez un fichier nommé exactement \`.gitignore\` à la racine du projet.
2.  Listez les fichiers/dossiers à ignorer (un par ligne).

### ⚠️ Le Piège Classique
Si un fichier a **déjà été commité** (suivi par Git), l'ajouter au .gitignore ne suffit pas ! Il continuera d'être suivi.
Il faut le retirer de l'index Git (sans le supprimer de votre disque) :
\`\`\`bash
git rm --cached mon_fichier_secret.json
git commit -m "Stop tracking secret file"
\`\`\``,
                            code: `# Exemple de contenu .gitignore standard Python :

# 1. Fichiers Système (Inutiles pour les autres)
.DS_Store
Thumbs.db

# 2. Environnements Virtuels (Lourds, on les recrée)
.venv/
env/
__pycache__/

# 3. Secrets & Config Locale (DANGER !)
.env
config_local.json
secrets.yaml

# 4. Dossiers de Build/Dist
dist/
build/`
                        }
                    ]
                }
            ]
        },
        {
            id: 'git_panic',
            title: 'Sauvetage (Panic Mode)',
            description: 'Quand ça tourne mal...',
            categories: [
                {
                    id: 'stash',
                    title: '1. Mettre de côté (Stash)',
                    description: 'Sauvegarder temporairement sans commiter.',
                    snippets: [
                        {
                            id: 'git_stash',
                            title: 'Git Stash',
                            description: 'Très utile quand on doit changer de branche en urgence.',
                            level: 'advanced',
                            tags: ['git', 'stash', 'save'],
                            code: `# Mettre de côté les modifications en cours
git stash

# Récupérer ce qu'on a mis de côté
git stash pop

# Voir la liste des stashs
git stash list`
                        }
                    ]
                },
                {
                    id: 'undo',
                    title: '2. Annuler des choses',
                    description: 'Reset et Revert.',
                    snippets: [
                        {
                            id: 'git_reset',
                            title: 'Git Reset (Attention !)',
                            description: 'Revenir en arrière dans l\'historique.',
                            level: 'advanced',
                            tags: ['git', 'reset', 'undo'],
                            code: `# Soft Reset : Annule le commit mais GARDE les fichiers modifiés (Staging)
git reset --soft HEAD~1

# Hard Reset : Annule TOUT (Commit + Fichiers). Destructeur !
git reset --hard HEAD~1`
                        },
                        {
                            id: 'git_revert',
                            title: 'Git Revert (Safe)',
                            description: 'Annuler un commit en créant un commit inverse.',
                            level: 'advanced',
                            tags: ['git', 'revert', 'undo'],
                            code: `# Crée un nouveau commit qui annule les changements du commit spécifié
git revert <commit_hash>

# C'est la bonne façon d'annuler si on a déjà pushé !`
                        }
                    ]
                }
            ]
        }
    ]
};
