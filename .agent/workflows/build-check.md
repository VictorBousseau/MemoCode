---
description: Vérifier que le build fonctionne sans erreur
---

# Workflow de vérification du build

## 1. Exécuter le build
// turbo
```bash
npm run build
```

## 2. Analyse des résultats
- Si le build réussit : informer l'utilisateur que tout est OK et afficher les statistiques du bundle
- Si le build échoue : analyser les erreurs et proposer des corrections

## 3. (Optionnel) Prévisualisation du build
Si l'utilisateur le souhaite, lancer la prévisualisation :
```bash
npm run preview
```
