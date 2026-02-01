import { COURSES } from '../../src/data/courses/index.js';

const getPythonContent = async (id) => {
    try {
        const ch = await import('../../src/data/courses/python/chapters.js');
        const adv = await import('../../src/data/courses/python/chapters-advanced.js');
        return ch.pythonChapters?.[id] || adv.pythonChaptersAdvanced?.[id] || null;
    } catch (e) { return null; }
};

const getBayesianContent = async (id) => {
    try {
        const ch = await import('../../src/data/courses/bayesian/chapters.js');
        return ch.bayesianChapters?.[id] || null;
    } catch { return null; }
};

const getMongodbContent = async (id) => {
    try {
        const ch = await import('../../src/data/courses/mongodb/chapters.js');
        return ch.mongodbChapters?.[id] || null;
    } catch { return null; }
};

const getContentFunction = {
    'python': getPythonContent,
    'bayesian': getBayesianContent,
    'mongodb': getMongodbContent
};

let totalChapters = 0;
let chaptersWithContent = 0;
let chaptersWithoutContent = [];

console.log('\n🔍 Vérification du CONTENU des chapitres');

(async () => {
    for (const [courseId, course] of Object.entries(COURSES)) {
        console.log(`\n📚 ${course.title}`);
        console.log('='.repeat(50));

        const getContent = getContentFunction[courseId];
        if (!getContent) {
            console.log(`Skipping content check for ${courseId} (no loader defined)`);
            continue;
        }

        for (const chapter of course.chapters) {
            totalChapters++;
            const content = await getContent(chapter.id);

            if (!content || content.trim().length === 0) {
                console.log(`  ❌ ${chapter.id}: VIDE ou MANQUANT`);
                chaptersWithoutContent.push(`${courseId}/${chapter.id}`);
            } else {
                const minLength = 500;
                if (content.length < minLength) {
                    console.log(`  ⚠️  ${chapter.id}: Contenu court (${content.length} chars)`);
                } else {
                    // process.stdout.write('.');
                    chaptersWithContent++;
                }
            }
        }
    }

    console.log(`\n\n📊 RÉSUMÉ CONTENT:`);
    console.log(`   Total chapitres: ${totalChapters}`);
    console.log(`   Avec contenu complet: ${chaptersWithContent}`);
    console.log(`   Sans contenu: ${chaptersWithoutContent.length}`);
    if (chaptersWithoutContent.length > 0) {
        console.log(`\n⚠️  Chapitres sans contenu:`);
        chaptersWithoutContent.forEach(ch => console.log(`     - ${ch}`));
    }
})();
