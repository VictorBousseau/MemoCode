import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, LogIn } from 'lucide-react';

/**
 * ConditionalAccess Component
 * Shows content if user is authenticated, otherwise displays a login prompt
 */
export default function ConditionalAccess({ children, featureName = "cette fonctionnalité" }) {
    const { user, loading } = useAuth();

    // Show loading state while checking authentication
    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">Vérification...</p>
                </div>
            </div>
        );
    }

    // If user is authenticated, show the content
    if (user) {
        return <>{children}</>;
    }

    // If not authenticated, show login prompt
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-[60vh] flex items-center justify-center px-4"
        >
            <div className="max-w-md w-full text-center">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-6"
                >
                    <Lock className="w-10 h-10 text-blue-600 dark:text-blue-400" />
                </motion.div>

                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    Connexion requise
                </h2>

                <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                    Vous devez être connecté pour accéder à {featureName}.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to="/login"
                        className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                        <LogIn className="w-5 h-5 mr-2" />
                        Se connecter
                    </Link>

                    <Link
                        to="/signup"
                        className="inline-flex items-center justify-center px-6 py-3 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-semibold rounded-lg border-2 border-gray-300 dark:border-gray-600 transition duration-200"
                    >
                        Créer un compte
                    </Link>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                    <Link
                        to="/"
                        className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    >
                        ← Retour à l'accueil
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}
