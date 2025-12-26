import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import {
    ChevronLeft, ChevronRight, BookOpen, Clock,
    Menu, X, CheckCircle, Circle
} from 'lucide-react';
import { getCourse, getChapter } from '../data/courses/index';
import { getChapterContent } from '../data/courses/python/chapters';

export default function CourseDetail() {
    const { courseId, chapterId } = useParams();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [completedChapters, setCompletedChapters] = useState([]);

    const course = getCourse(courseId);
    const currentChapterInfo = chapterId ? getChapter(courseId, chapterId) : course?.chapters[0];
    const currentChapterId = chapterId || course?.chapters[0]?.id;
    const chapterContent = getChapterContent(currentChapterId);

    // Load completed chapters from localStorage
    useEffect(() => {
        const stored = localStorage.getItem(`course_progress_${courseId}`);
        if (stored) {
            setCompletedChapters(JSON.parse(stored));
        }
    }, [courseId]);

    // Get current chapter index
    const currentIndex = course?.chapters.findIndex(ch => ch.id === currentChapterId) || 0;
    const prevChapter = course?.chapters[currentIndex - 1];
    const nextChapter = course?.chapters[currentIndex + 1];

    // Mark chapter as completed
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
            {/* Sidebar */}
            <aside
                className={`fixed lg:sticky top-0 left-0 h-screen bg-zinc-900 border-r border-zinc-800 transition-all duration-300 z-40 ${sidebarOpen ? 'w-80' : 'w-0 lg:w-16'
                    } overflow-hidden`}
            >
                <div className="p-4 h-full flex flex-col">
                    {/* Course Title */}
                    <div className={`mb-6 ${!sidebarOpen && 'lg:hidden'}`}>
                        <Link
                            to="/courses"
                            className="flex items-center gap-2 text-zinc-400 hover:text-white mb-4"
                        >
                            <ChevronLeft className="w-4 h-4" />
                            <span>Tous les cours</span>
                        </Link>
                        <h2 className="text-lg font-bold text-white flex items-center gap-2">
                            {course.icon} {course.title}
                        </h2>
                        <div className="flex items-center gap-2 text-sm text-zinc-400 mt-1">
                            <Clock className="w-4 h-4" />
                            <span>{course.duration}</span>
                        </div>
                    </div>

                    {/* Progress */}
                    <div className={`mb-4 ${!sidebarOpen && 'lg:hidden'}`}>
                        <div className="flex justify-between text-sm text-zinc-400 mb-1">
                            <span>Progression</span>
                            <span>{completedChapters.length}/{course.chapters.length}</span>
                        </div>
                        <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all"
                                style={{ width: `${(completedChapters.length / course.chapters.length) * 100}%` }}
                            />
                        </div>
                    </div>

                    {/* Chapters List */}
                    <nav className={`flex-1 overflow-y-auto space-y-1 ${!sidebarOpen && 'lg:hidden'}`}>
                        {course.chapters.map((chapter, index) => {
                            const isCompleted = completedChapters.includes(chapter.id);
                            const isCurrent = chapter.id === currentChapterId;

                            return (
                                <Link
                                    key={chapter.id}
                                    to={`/courses/${courseId}/${chapter.id}`}
                                    className={`flex items-start gap-3 p-3 rounded-lg transition-colors ${isCurrent
                                            ? 'bg-blue-600/20 border border-blue-500/30'
                                            : 'hover:bg-zinc-800'
                                        }`}
                                >
                                    <div className="flex-shrink-0 mt-0.5">
                                        {isCompleted ? (
                                            <CheckCircle className="w-5 h-5 text-green-500" />
                                        ) : (
                                            <Circle className={`w-5 h-5 ${isCurrent ? 'text-blue-400' : 'text-zinc-600'}`} />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className={`text-sm font-medium truncate ${isCurrent ? 'text-white' : 'text-zinc-300'
                                            }`}>
                                            {chapter.title}
                                        </p>
                                        <p className="text-xs text-zinc-500">{chapter.duration}</p>
                                    </div>
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            </aside>

            {/* Mobile overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main Content */}
            <main className="flex-1 min-w-0">
                {/* Top Bar */}
                <div className="sticky top-0 bg-zinc-950/90 backdrop-blur-sm border-b border-zinc-800 z-20">
                    <div className="flex items-center justify-between p-4">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
                        >
                            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                        <div className="flex items-center gap-2 text-sm text-zinc-400">
                            <span>Chapitre {currentIndex + 1} / {course.chapters.length}</span>
                        </div>
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
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                components={{
                                    code({ node, inline, className, children, ...props }) {
                                        const match = /language-(\w+)/.exec(className || '');
                                        return !inline && match ? (
                                            <SyntaxHighlighter
                                                style={oneDark}
                                                language={match[1]}
                                                PreTag="div"
                                                className="rounded-xl !bg-zinc-900 !p-4"
                                                {...props}
                                            >
                                                {String(children).replace(/\n$/, '')}
                                            </SyntaxHighlighter>
                                        ) : (
                                            <code className="bg-zinc-800 px-1.5 py-0.5 rounded text-blue-300" {...props}>
                                                {children}
                                            </code>
                                        );
                                    },
                                    table({ children }) {
                                        return (
                                            <div className="overflow-x-auto">
                                                <table className="min-w-full border-collapse border border-zinc-700">
                                                    {children}
                                                </table>
                                            </div>
                                        );
                                    },
                                    th({ children }) {
                                        return (
                                            <th className="border border-zinc-700 bg-zinc-800 px-4 py-2 text-left">
                                                {children}
                                            </th>
                                        );
                                    },
                                    td({ children }) {
                                        return (
                                            <td className="border border-zinc-700 px-4 py-2">
                                                {children}
                                            </td>
                                        );
                                    },
                                    blockquote({ children }) {
                                        return (
                                            <blockquote className="border-l-4 border-blue-500 bg-blue-500/10 pl-4 py-2 my-4 rounded-r-lg">
                                                {children}
                                            </blockquote>
                                        );
                                    }
                                }}
                            >
                                {chapterContent}
                            </ReactMarkdown>
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
