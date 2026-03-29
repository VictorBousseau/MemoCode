import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Clock, CheckCircle, Circle } from 'lucide-react';

export default React.memo(function CourseSidebar({ course, courseId, currentChapterId, completedChapters, sidebarOpen }) {
    return (
        <aside
            className={`fixed lg:sticky top-4 left-4 h-[calc(100vh-2rem)] bg-zinc-900 rounded-3xl border border-zinc-800 transition-all duration-300 z-40 ${sidebarOpen ? 'w-80 shadow-2xl' : 'w-0 lg:w-20'
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
                <nav className={`flex-1 overflow-y-auto ${!sidebarOpen && 'lg:hidden'}`}>
                    {course.parts ? (
                        course.parts.map((part, partIndex) => {
                            const partChapters = course.chapters.filter(ch =>
                                part.modules.some(m => ch.id.startsWith(m))
                            );
                            const partColors = [
                                'from-blue-500 to-cyan-500',
                                'from-purple-500 to-pink-500',
                                'from-green-500 to-emerald-500',
                                'from-orange-500 to-yellow-500',
                                'from-red-500 to-rose-500',
                                'from-indigo-500 to-violet-500',
                                'from-teal-500 to-cyan-500'
                            ];
                            const colorClass = partColors[partIndex % partColors.length];

                            return (
                                <div key={part.id} className="mb-4">
                                    <div className="flex items-center gap-2 px-2 mb-2">
                                        <div className={`w-1 h-4 rounded-full bg-gradient-to-b ${colorClass}`}></div>
                                        <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                                            {part.title}
                                        </span>
                                    </div>
                                    <div className="space-y-1">
                                        {partChapters.map((chapter) => {
                                            const isCompleted = completedChapters.includes(chapter.id);
                                            const isCurrent = chapter.id === currentChapterId;
                                            const moduleNum = chapter.id.split('-')[0];

                                            return (
                                                <Link
                                                    key={chapter.id}
                                                    to={`/courses/${courseId}/${chapter.id}`}
                                                    className={`group flex items-center gap-3 p-3 rounded-2xl transition-all duration-200 ${isCurrent
                                                        ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/10 border border-blue-500/30'
                                                        : isCompleted
                                                            ? 'bg-green-500/5 hover:bg-green-500/15'
                                                            : 'hover:bg-zinc-800/50'
                                                        }`}
                                                >
                                                    <span className={`flex-shrink-0 w-6 text-sm font-bold transition-all ${isCurrent
                                                        ? 'text-blue-400'
                                                        : isCompleted
                                                            ? 'text-green-400'
                                                            : 'text-zinc-500 group-hover:text-zinc-300'
                                                        }`}>
                                                        {isCompleted ? (
                                                            <CheckCircle className="w-5 h-5" />
                                                        ) : (
                                                            moduleNum
                                                        )}
                                                    </span>
                                                    <div className="flex-1 min-w-0">
                                                        <p className={`text-sm font-medium truncate transition-colors ${isCurrent
                                                            ? 'text-white'
                                                            : isCompleted
                                                                ? 'text-green-300'
                                                                : 'text-zinc-300 group-hover:text-white'
                                                            }`}>
                                                            {chapter.title.replace(/Module \d+ : /, '')}
                                                        </p>
                                                        <div className="flex items-center gap-2 mt-0.5">
                                                            <Clock className="w-3 h-3 text-zinc-500" />
                                                            <span className="text-xs text-zinc-500">{chapter.duration}</span>
                                                        </div>
                                                    </div>
                                                    {isCurrent && (
                                                        <div className="w-1.5 h-8 rounded-full bg-gradient-to-b from-blue-400 to-purple-500"></div>
                                                    )}
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="space-y-1">
                            {course.chapters.map((chapter) => {
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
                                            <p className={`text-sm font-medium truncate ${isCurrent ? 'text-white' : 'text-zinc-300'}`}>
                                                {chapter.title}
                                            </p>
                                            <p className="text-xs text-zinc-500">{chapter.duration}</p>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    )}
                </nav>
            </div>
        </aside>
    );
});
