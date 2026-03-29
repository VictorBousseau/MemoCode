import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    ChevronLeft, ChevronRight, BookOpen,
    Menu, X, CheckCircle, Download, FileCode
} from 'lucide-react';
import { getCourse, getChapter } from '../data/courses/index';
import { getChapterContent as getPythonChapterContent } from '../data/courses/python/chapters';
import { getChapterContent as getBayesianChapterContent } from '../data/courses/bayesian/chapters';
import { getChapterContent as getMongodbChapterContent } from '../data/courses/mongodb/chapters';
import { dataEngineeringChapters, getDataEngineeringChapterContent } from '../data/courses/data-engineering/chapters';
import { dataEngineeringChaptersAdvanced, getDataEngineeringAdvancedChapterContent } from '../data/courses/data-engineering/chapters-advanced';
import { EXERCISE_FILES, getExerciseFolder } from '../data/exerciseFiles';
import CourseSidebar from './CourseSidebar';
import MarkdownRenderer from './MarkdownRenderer';

// Get chapter content based on course
const getChapterContent = (courseId, chapterId) => {
    if (courseId === 'python') {
        return getPythonChapterContent(chapterId);
    } else if (courseId === 'bayesian') {
        return getBayesianChapterContent(chapterId);
    } else if (courseId === 'mongodb') {
        return getMongodbChapterContent(chapterId);
    } else if (courseId === 'data-engineering') {
        return getDataEngineeringChapterContent(chapterId) || getDataEngineeringAdvancedChapterContent(chapterId);
    }
    return null;
};

export default function CourseDetail() {
    const { courseId, chapterId } = useParams();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [completedChapters, setCompletedChapters] = useState([]);

    const course = getCourse(courseId);
    const currentChapterInfo = chapterId ? getChapter(courseId, chapterId) : course?.chapters[0];
    const currentChapterId = chapterId || course?.chapters[0]?.id;
    const chapterContent = getChapterContent(courseId, currentChapterId);

    // Load completed chapters from localStorage
    useEffect(() => {
        const stored = localStorage.getItem(`course_progress_${courseId}`);
        if (stored) {
            setCompletedChapters(JSON.parse(stored));
        }
    }, [courseId]);

    const currentIndex = course?.chapters.findIndex(ch => ch.id === currentChapterId) || 0;
    const prevChapter = course?.chapters[currentIndex - 1];
    const nextChapter = course?.chapters[currentIndex + 1];

    const markCompleted = () => {
        if (!completedChapters.includes(currentChapterId)) {
            const updated = [...completedChapters, currentChapterId];
            setCompletedChapters(updated);
            localStorage.setItem(`course_progress_${courseId}`, JSON.stringify(updated));
        }
    };

    if (!course) {
        return (
            <div className="text-center py-16">
                <p className="text-zinc-400">Cours non trouvé</p>
                <Link to="/courses" className="text-blue-400 hover:underline mt-4 inline-block">
                    Retour aux cours
                </Link>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen">
            <CourseSidebar
                course={course}
                courseId={courseId}
                currentChapterId={currentChapterId}
                completedChapters={completedChapters}
                sidebarOpen={sidebarOpen}
            />

            {/* Mobile overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main Content */}
            <main className="flex-1 min-w-0">
                {/* Floating Top Bar */}
                <div className="sticky top-4 z-20 px-4 md:px-8 pointer-events-none">
                    <div className="bg-zinc-900/80 backdrop-blur-md border border-zinc-800 rounded-2xl shadow-xl p-3 flex items-center justify-between pointer-events-auto max-w-4xl mx-auto">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="p-2 hover:bg-zinc-800 rounded-xl transition-colors text-zinc-400 hover:text-white"
                        >
                            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                        <div className="flex items-center gap-3 bg-zinc-950/50 px-4 py-1.5 rounded-full border border-zinc-800/50">
                            <span className="text-xs text-zinc-500 font-medium uppercase tracking-wider hidden sm:inline">Chapitre</span>
                            <span className="text-sm font-bold text-white">
                                {currentIndex + 1}
                                <span className="text-zinc-600 mx-1.5">/</span>
                                <span className="text-zinc-500">{course.chapters.length}</span>
                            </span>
                        </div>
                        <div className="w-9"></div>
                    </div>
                </div>

                {/* Chapter Content */}
                <div className="max-w-4xl mx-auto p-6 lg:p-10">
                    {chapterContent ? (
                        <motion.article
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="prose prose-invert prose-zinc max-w-none"
                        >
                            <MarkdownRenderer>{chapterContent}</MarkdownRenderer>

                            {/* Exercise Download Section */}
                            {EXERCISE_FILES[currentChapterId] && (
                                <div className="mt-12 p-6 bg-zinc-800/50 border border-zinc-700 rounded-xl">
                                    <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                                        <FileCode className="w-5 h-5 text-green-400" />
                                        Fichiers d'exercices
                                    </h3>
                                    <p className="text-zinc-400 text-sm mb-4">
                                        Téléchargez les fichiers pour pratiquer localement sur votre machine.
                                    </p>
                                    <div className="flex flex-wrap gap-3">
                                        <a
                                            href={`${import.meta.env.BASE_URL}exercises/${getExerciseFolder(courseId)}/${EXERCISE_FILES[currentChapterId].exercice}`}
                                            download
                                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors"
                                        >
                                            <Download className="w-4 h-4" />
                                            Exercice (TODO)
                                        </a>
                                        <a
                                            href={`${import.meta.env.BASE_URL}exercises/${getExerciseFolder(courseId)}/${EXERCISE_FILES[currentChapterId].solution}`}
                                            download
                                            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg transition-colors"
                                        >
                                            <Download className="w-4 h-4" />
                                            Solution
                                        </a>
                                    </div>
                                </div>
                            )}
                        </motion.article>
                    ) : (
                        <div className="text-center py-16">
                            <BookOpen className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
                            <h2 className="text-xl font-bold text-white mb-2">
                                Contenu en cours de rédaction
                            </h2>
                            <p className="text-zinc-400">
                                Ce chapitre sera bientôt disponible. Revenez plus tard !
                            </p>
                        </div>
                    )}

                    {/* Navigation */}
                    <div className="flex items-center justify-between mt-12 pt-6 border-t border-zinc-800">
                        {prevChapter ? (
                            <Link
                                to={`/courses/${courseId}/${prevChapter.id}`}
                                className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors"
                            >
                                <ChevronLeft className="w-5 h-5" />
                                <span className="hidden sm:inline">Précédent</span>
                            </Link>
                        ) : (
                            <div />
                        )}

                        <button
                            onClick={markCompleted}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${completedChapters.includes(currentChapterId)
                                ? 'bg-green-600/20 text-green-400 border border-green-500/30'
                                : 'bg-blue-600 hover:bg-blue-500 text-white'
                                }`}
                        >
                            {completedChapters.includes(currentChapterId) ? (
                                <span className="flex items-center gap-2">
                                    <CheckCircle className="w-5 h-5" />
                                    Terminé
                                </span>
                            ) : (
                                'Marquer comme terminé'
                            )}
                        </button>

                        {nextChapter ? (
                            <Link
                                to={`/courses/${courseId}/${nextChapter.id}`}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors"
                            >
                                <span className="hidden sm:inline">Suivant</span>
                                <ChevronRight className="w-5 h-5" />
                            </Link>
                        ) : (
                            <Link
                                to="/courses"
                                className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg transition-colors"
                            >
                                Terminer le cours
                            </Link>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
