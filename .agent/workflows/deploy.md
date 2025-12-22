---
description: Commit, push et déploiement sur GitHub Pages
---

# Workflow de déploiement

## 1. Vérifier les modifications
```bash
git status
```

## 2. Ajouter tous les fichiers modifiés
```bash
git add .
```

## 3. Créer un commit
Demander à l'utilisateur le message de commit, puis exécuter :
```bash
git commit -m "MESSAGE_DU_COMMIT"
```

## 4. Push vers GitHub
```bash
git push origin main
```

## 5. Build et déploiement sur GitHub Pages
```bash
npm run deploy
```

## 6. Confirmation
Informer l'utilisateur que le déploiement est terminé et que le site sera disponible sous quelques minutes à l'adresse : https://[username].github.io/MemoCode/
