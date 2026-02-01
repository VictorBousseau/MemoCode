import { COURSES } from '../../src/data/courses/index.js';

console.log('--- VÉRIFICATION STRUCTURE ---');

Object.entries(COURSES).forEach(([courseId, course]) => {
    console.log(`\n📚 Vérification du cours: ${course.title}`);
    try {
        console.log(`   Total chapitres déclarés: ${course.chapters.length}`);

        const declaredModules = new Set();
        if (course.parts) {
            course.parts.forEach(part => {
                part.modules.forEach(mod => declaredModules.add(mod));
            });
        }

        const chapterIds = course.chapters.map(ch => ch.id.split('-')[0]);
        const missingModules = [];

        chapterIds.forEach(id => {
            // Pour python, les IDs sont numériques (00, 01...).
            // Si course.parts n'existe pas, on saute cette vérif.
            if (course.parts && !declaredModules.has(id)) {
                missingModules.push(id);
            }
        });

        if (course.parts) {
            if (missingModules.length > 0) {
                console.log(`   ⚠️  Modules manquants dans parts: ${missingModules.join(', ')}`);
            } else {
                console.log(`   ✅ Tous les modules sont déclarés`);
            }
        }

        if (course.parts) {
            const unusedParts = [];
            course.chapters.forEach(ch => {
                const fullPartTitle = course.parts.find(p => p.title.includes(ch.part))?.title;
                if (!fullPartTitle && ch.part) {
                    unusedParts.push(ch.part);
                }
            });

            if (unusedParts.length > 0) {
                console.log(`   ⚠️  Parties non trouvées: ${[...new Set(unusedParts)].join(', ')}`);
            } else {
                console.log(`   ✅ Toutes les parties sont valides`);
            }
        }
    } catch (e) {
        console.error(`Erreur lors de la vérification de ${courseId}:`, e.message);
    }
});
console.log('\n✨ Vérification terminée\n');
