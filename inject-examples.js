const fs = require('fs');

// Lire le fichier des exemples
let examplesContent = fs.readFileSync('src/data/pythonExamples.js', 'utf8');

// Nettoyer le contenu pour ne garder que l'objet
// Enlever "export const pythonExamples = " au début et le ";" final
examplesContent = examplesContent.replace('export const pythonExamples = ', '').trim();
if (examplesContent.endsWith(';')) {
    examplesContent = examplesContent.slice(0, -1);
}

// Lire le fichier principal
let mainContent = fs.readFileSync('src/data/pythonContent.js', 'utf8');

// Identifier le bloc à remplacer
// On cherche le bloc qui commence par { id: 'examples' ... et finit avant { id: 'arrays'
// C'est un peu délicat avec regex, donc on va utiliser une approche plus simple :
// On sait que j'ai inséré un bloc spécifique. Je vais chercher ce bloc.
// Le bloc commence à la ligne où il y a "id: 'examples'," précédé d'une accolade ouvrante.

// Pour éviter les erreurs, je vais chercher le texte exact que je veux remplacer ou utiliser des marqueurs.
// Je sais que le bloc se trouve entre le snippet "jupyter" et "arrays".

// Cherchons la fin du snippet jupyter
const jupyterEnd = `
                        }
                    ]
                },`;

const arraysStart = `
                {
                    id: 'arrays',`;

// On construit une regex qui capture tout entre jupyterEnd et arraysStart
// Note: on doit échapper les caractères spéciaux pour la regex
// Mais le bloc à remplacer est CLAIREMENT le bloc 'examples' actuel (le snippet de test)

// Je vais lire le fichier ligne par ligne pour trouver les index
const lines = mainContent.split('\n');
let startIndex = -1;
let endIndex = -1;

for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes("id: 'examples',")) {
        // On remonte pour trouver l'accolade ouvrante du bloc
        startIndex = i - 1; // Supposons que l'accolade est juste avant
        break;
    }
}

for (let i = startIndex; i < lines.length; i++) {
    if (lines[i].includes("id: 'arrays',")) {
        endIndex = i - 1; // L'accolade ouvrante de arrays est à i-1, donc le bloc précédent finit avant
        // On veut s'arrêter à la virgule ou l'accolade fermante du bloc précédent
        // Le bloc précédent finit par "},"
        break;
    }
}

if (startIndex !== -1 && endIndex !== -1) {
    // On remplace les lignes
    // On doit s'assurer que examplesContent a la bonne indentation
    const indentedContent = examplesContent.split('\n').map((line, idx) => {
        if (idx === 0) return '                ' + line;
        return '                ' + line; // Indentation standard de 16 espaces pour ce niveau
    }).join('\n'); // Mais examplesContent a déjà son indentation interne...

    // En fait examplesContent a déjà une indentation de 4 espaces par défaut (dans le fichier source)
    // Ici on est imbriqué dans pythonContent -> themes -> categories.
    // pythonContent (0) -> themes (4) -> theme object (8) -> categories (12) -> category object (16)

    // Le contenu de pythonExamples.js commence à colonne 0.
    // Ligne 1: { ...
    // Ligne 2:     id: ...

    // Donc on doit ajouter 16 espaces à chaque ligne.
    const indentedBlock = examplesContent.split('\n').map(line => '                ' + line).join('\n');

    // Remplacement
    // On doit remplacer de startIndex (inclus) jusqu'à endIndex (exclus, car endIndex est le début de arrays - 1)
    // Attendons, endIndex pointe sur la ligne AVANT { id: arrays }. Cette ligne contient "}," normalement.

    // Vérifions la ligne lines[endIndex]
    // C'est probablement la ligne contenant "}," de mon bloc de test.

    // Remplaçons !
    const newLines = [
        ...lines.slice(0, startIndex),
        indentedBlock + ',',
        ...lines.slice(endIndex + 1) // +1 pour sauter la ligne "}," qu'on remplace ? Non, arrays commence après.
    ];

    // Ah attention, ma logique d'index est risquée sans voir les lignes exactes.
    // Simplifions : on va utiliser replace() sur le STRING contenu du bloc 'examples' que je connais.

    const blockToRemoveRegex = /                \{\s+id: 'examples',[\s\S]+?                \},/m;

    // On remplace par le nouveau contenu, en s'assurant qu'il est bien formaté
    const newContent = mainContent.replace(blockToRemoveRegex, indentedBlock + ',');

    if (newContent !== mainContent) {
        fs.writeFileSync('src/data/pythonContent.js', newContent);
        console.log("✅ Remplacement réussi !");
    } else {
        console.log("❌ Impossible de trouver le bloc à remplacer via regex.");
        // Fallback: on utilise la position JUPYTER -> ARRAYS
        // On cherche l'insertion point
        const markerBefore = `import mon_module_perso\r\n# Si vous modifiez mon_module_perso.py, les changements sont pris en compte immédiatement!\`\r\n                        }\r\n                    ]\r\n                },`;
        // C'est trop complexe avec les saut de lignes exacts (\r\n vs \n).
    }
} else {
    console.log("❌ Indices non trouvés.");
}
