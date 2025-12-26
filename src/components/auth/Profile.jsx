import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
    User, Mail, Shield, Key, Save, AlertCircle, CheckCircle,
    ChevronLeft, LogOut, Loader2, Eye, EyeOff, Settings
} from 'lucide-react';
import StatsSection from '../StatsSection';

export default function Profile() {
    const { user, userRole, signOut, updatePassword, isAdmin } = useAuth();
    const navigate = useNavigate();

    // Password change state
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [passwordStatus, setPasswordStatus] = useState('idle'); // idle, loading, success, error
    const [passwordError, setPasswordError] = useState('');

    const handleSignOut = () => {
        console.log('🚪 Logout clicked');
        signOut(); // Don't await - instant logout
        navigate('/');
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();

        // Validation
        if (newPassword.length < 6) {
            setPasswordError('Le mot de passe doit contenir au moins 6 caractères.');
            setPasswordStatus('error');
            return;
        }

        if (newPassword !== confirmPassword) {
            setPasswordError('Les mots de passe ne correspondent pas.');
            setPasswordStatus('error');
            return;
        }

        setPasswordStatus('loading');
        setPasswordError('');

        try {
            const { error } = await updatePassword(newPassword);
            if (error) throw error;

            setPasswordStatus('success');
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');

            // Hide form after success
            setTimeout(() => {
                setShowPasswordForm(false);
                setPasswordStatus('idle');
            }, 2000);
        } catch (error) {
            console.error('Password update error:', error);
            setPasswordError(error.message || 'Erreur lors de la mise à jour du mot de passe.');
            setPasswordStatus('error');
        }
    };

    // Get user creation date
    const createdAt = user?.created_at ? new Date(user.created_at).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }) : 'Non disponible';

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-y-auto">
            {/* Header */}
            <header className="bg-zinc-900/80 backdrop-blur-sm border-b border-zinc-800 sticky top-0 z-50">
                <div className="container mx-auto px-4 py-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link
                                to="/"
                                className="flex items-center gap-2 px-3 py-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
                            >
                                <ChevronLeft className="w-5 h-5" />
                                <span className="hidden sm:inline">Retour</span>
                            </Link>
                            <div className="hidden sm:block h-6 w-px bg-zinc-700" />
                            <div className="flex items-center gap-2">
                                <User className="w-6 h-6 text-blue-400" />
                                <h1 className="text-xl font-bold text-white">Mon Profil</h1>
                            </div>
                        </div>
                        <button
                            onClick={handleSignOut}
                            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm font-medium cursor-pointer"
                        >
                            <LogOut className="w-4 h-4" />
                            <span className="hidden sm:inline">Déconnexion</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8 max-w-2xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                >
                    {/* User Info Card */}
                    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                            <User className="w-5 h-5 text-blue-400" />
                            Informations du compte
                        </h2>

                        <div className="space-y-4">
                            {/* Email */}
                            <div className="flex items-center gap-3 p-3 bg-zinc-800/50 rounded-lg">
                                <Mail className="w-5 h-5 text-zinc-400" />
                                <div>
                                    <p className="text-xs text-zinc-500">Email</p>
                                    <p className="text-white">{user?.email}</p>
                                </div>
                            </div>

                            {/* Role */}
                            <div className="flex items-center gap-3 p-3 bg-zinc-800/50 rounded-lg">
                                <Shield className="w-5 h-5 text-zinc-400" />
                                <div>
                                    <p className="text-xs text-zinc-500">Rôle</p>
                                    <p className="text-white capitalize">{userRole || 'Utilisateur'}</p>
                                </div>
                            </div>

                            {/* Admin Dashboard Button - Only visible for admins */}
                            {isAdmin() && (
                                <Link
                                    to="/admin"
                                    className="flex items-center justify-center gap-2 w-full p-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-medium rounded-lg transition-all"
                                >
                                    <Settings className="w-5 h-5" />
                                    Accéder au Tableau de Bord Admin
                                </Link>
                            )}

                            {/* Member Since */}
                            <div className="flex items-center gap-3 p-3 bg-zinc-800/50 rounded-lg">
                                <User className="w-5 h-5 text-zinc-400" />
                                <div>
                                    <p className="text-xs text-zinc-500">Membre depuis</p>
                                    <p className="text-white">{createdAt}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Password Change Card */}
                    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                                <Key className="w-5 h-5 text-blue-400" />
                                Sécurité
                            </h2>
                            {!showPasswordForm && (
                                <button
                                    onClick={() => setShowPasswordForm(true)}
                                    className="text-sm text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
                                >
                                    Modifier le mot de passe
                                </button>
                            )}
                        </div>

                        {showPasswordForm ? (
                            <motion.form
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                onSubmit={handlePasswordChange}
                                className="space-y-4"
                            >
                                {/* New Password */}
                                <div>
                                    <label className="block text-sm font-medium text-zinc-300 mb-1">
                                        Nouveau mot de passe
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showNewPassword ? 'text' : 'password'}
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            required
                                            minLength={6}
                                            className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-colors pr-10"
                                            placeholder="Minimum 6 caractères"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowNewPassword(!showNewPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white cursor-pointer"
                                        >
                                            {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>

                                {/* Confirm Password */}
                                <div>
                                    <label className="block text-sm font-medium text-zinc-300 mb-1">
                                        Confirmer le mot de passe
                                    </label>
                                    <input
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                        className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
                                        placeholder="Répétez le mot de passe"
                                    />
                                </div>

                                {/* Error/Success Messages */}
                                {passwordStatus === 'error' && (
                                    <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                        {passwordError}
                                    </div>
                                )}

                                {passwordStatus === 'success' && (
                                    <div className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 text-sm">
                                        <CheckCircle className="w-4 h-4 flex-shrink-0" />
                                        Mot de passe mis à jour avec succès !
                                    </div>
                                )}

                                {/* Buttons */}
                                <div className="flex gap-3">
                                    <button
                                        type="submit"
                                        disabled={passwordStatus === 'loading'}
                                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white font-medium rounded-lg transition-colors cursor-pointer"
                                    >
                                        {passwordStatus === 'loading' ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                Mise à jour...
                                            </>
                                        ) : (
                                            <>
                                                <Save className="w-4 h-4" />
                                                Enregistrer
                                            </>
                                        )}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowPasswordForm(false);
                                            setPasswordStatus('idle');
                                            setPasswordError('');
                                        }}
                                        className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-medium rounded-lg transition-colors cursor-pointer"
                                    >
                                        Annuler
                                    </button>
                                </div>
                            </motion.form>
                        ) : (
                            <p className="text-zinc-500 text-sm">
                                Votre mot de passe est sécurisé. Vous pouvez le modifier à tout moment.
                            </p>
                        )}
                    </div>

                    {/* Statistics Section */}
                    <StatsSection />
                </motion.div>
            </main>
        </div>
    );
}
