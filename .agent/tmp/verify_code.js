import { COURSES } from '../../src/data/courses/index.js';

const getPythonContent = async (id) => {
    try {
        const ch = await import('../../src/data/courses/python/chapters.js');
        const adv = await import('../../src/data/courses/python/chapters-advanced.js');
        return ch.pythonChapters?.[id] || adv.pythonChaptersAdvanced?.[id] || null;
    } catch { return null; }
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

console.log('\n🔍 Vérification des exemples de CODE dans les chapitres\n');

(async () => {
    for (const [courseId, course] of Object.entries(COURSES)) {
        console.log(`\n📚 ${course.title}`);
        console.log('='.repeat(50));

        const getContent = getContentFunction[courseId];
        if (!getContent) continue;

        for (const chapter of course.chapters) {
            const content = await getContent(chapter.id);

            if (content) {
                const codeBlocks = (content.match(/```/g) || []).length / 2;
                const inlineCode = (content.match(/`[^`]+`/g) || []).length;

                if (codeBlocks === 0) {
                    console.log(`  ⚠️  ${chapter.id}: AUCUN bloc de code`);
                } else {
                    // process.stdout.write('.');
                }
            }
        }
    }
    console.log('\n');
})();
