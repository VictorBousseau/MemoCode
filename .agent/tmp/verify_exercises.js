import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Fix for __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const cwd = process.cwd();

console.log('\n📝 Vérification Exercices ↔ Solutions\n');

const exercisesDir = path.join(cwd, 'public', 'exercises', 'python');

try {
    const files = fs.readdirSync(exercisesDir);

    const modules = new Map();
    files.forEach(file => {
        const match = file.match(/^(\d+)-([\w-]+)-(exercice|solution)\.py$/);
        if (match) {
            const [, num, name, type] = match;
            const moduleId = `${num}-${name}`;
            if (!modules.has(moduleId)) {
                modules.set(moduleId, { exercice: false, solution: false, exFile: '', solFile: '' });
            }
            modules.get(moduleId)[type] = true;
            if (type === 'exercice') modules.get(moduleId).exFile = file;
            if (type === 'solution') modules.get(moduleId).solFile = file;
        }
    });

    console.log(`Total modules avec fichiers: ${modules.size}\n`);

    let complete = 0;
    let incomplete = 0;

    modules.forEach((files, moduleId) => {
        if (files.exercice && files.solution) {
            // complete
            complete++;
        } else if (files.exercice && !files.solution) {
            console.log(`  ⚠️  ${moduleId}: Exercice UNIQUEMENT (manque solution)`);
            incomplete++;
        } else if (!files.exercice && files.solution) {
            console.log(`  ⚠️  ${moduleId}: Solution UNIQUEMENT (manque exercice)`);
            incomplete++;
        }
    });

    console.log(`\n📊 Résumé Structure:`);
    console.log(`   Modules complets: ${complete}`);
    console.log(`   Modules incomplets: ${incomplete}`);


    console.log('\n📏 Vérification de la qualité des exercices\n');

    files.filter(f => f.endsWith('-exercice.py')).forEach(file => {
        const filepath = path.join(exercisesDir, file);
        const content = fs.readFileSync(filepath, 'utf-8');
        const lines = content.split('\n').length;
        const todoCount = (content.match(/TODO/g) || []).length;

        if (lines < 20) {
            console.log(`  ⚠️  ${file}: Fichier très court (${lines} lignes)`);
        }
        if (todoCount === 0) {
            console.log(`  ⚠️  ${file}: Aucun TODO trouvé`);
        }
    });
} catch (e) {
    console.error("Erreur lors de la lecture du répertoire:", e.message);
}
