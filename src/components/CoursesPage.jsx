import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Clock, Users, ChevronRight } from 'lucide-react';
import { getAllCourses } from '../data/courses/index';

export default function CoursesPage() {
    const courses = getAllCourses();

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-white mb-3">📚 Cours</h1>
                <p className="text-zinc-400 text-lg">
                    Apprenez avec des cours structurés et des exercices pratiques
                </p>
            </div>

            {/* Courses Grid */}
            <div className="grid gap-6 md:grid-cols-2">
                {courses.map((course, index) => (
                    <motion.div
                        key={course.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                        <Link
                            to={`/courses/${course.id}`}
                            className="block bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 hover:border-blue-500/50 transition-all group"
                        >
                            {/* Course Header */}
                            <div className="flex items-start gap-4 mb-4">
                                <div className={`text-5xl`}>
                                    {course.icon}
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                                        {course.title}
                                    </h2>
                                    <p className="text-sm text-zinc-400 mt-1">
                                        {course.description}
                                    </p>
                                </div>
                            </div>

                            {/* Course Meta */}
                            <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-zinc-500">
                                <div className="flex items-center gap-1.5">
                                    <Clock className="w-4 h-4" />
                                    <span>{course.duration}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <BookOpen className="w-4 h-4" />
                                    <span>{course.chapters.length} chapitres</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Users className="w-4 h-4" />
                                    <span>{course.level}</span>
                                </div>
                            </div>

                            {/* Chapters Preview */}
                            <div className="space-y-2 mb-4">
                                {course.chapters.slice(0, 3).map((chapter) => (
                                    <div
                                        key={chapter.id}
                                        className="flex items-center gap-2 text-sm text-zinc-400"
                                    >
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                        <span className="truncate">{chapter.title}</span>
                                    </div>
                                ))}
                                {course.chapters.length > 3 && (
                                    <div className="text-sm text-zinc-500 pl-4">
                                        +{course.chapters.length - 3} autres chapitres...
                                    </div>
                                )}
                            </div>

                            {/* CTA */}
                            <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
                                <span className="text-blue-400 font-medium group-hover:text-blue-300 transition-colors">
                                    Commencer le cours
                                </span>
                                <ChevronRight className="w-5 h-5 text-blue-400 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>

            {/* Coming Soon */}
            <div className="text-center py-8 border-t border-zinc-800">
                <p className="text-zinc-500">
                    🚀 D'autres cours arrivent bientôt : SQL, JavaScript, Pandas...
                </p>
            </div>
        </div>
    );
}
