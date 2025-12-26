import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    User,
    Shield,
    ShieldCheck,
    ShieldX,
    Search,
    RefreshCw,
    ChevronDown,
    Check
} from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';

/**
 * UserManagement - Admin component for managing users and roles
 */
export default function UserManagement() {
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [editingUser, setEditingUser] = useState(null);

    useEffect(() => {
        fetchUsers();
        fetchRoles();
    }, []);

    const fetchRoles = async () => {
        try {
            const { data, error } = await supabase
                .from('roles')
                .select('*')
                .order('name');

            if (error) throw error;
            setRoles(data || []);
        } catch (error) {
            console.error('Error fetching roles:', error);
        }
    };

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('users')
                .select(`
                    id,
                    email,
                    created_at,
                    role_id,
                    roles (
                        id,
                        name,
                        permissions
                    )
                `)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setUsers(data || []);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateUserRole = async (userId, roleId) => {
        try {
            const { error } = await supabase
                .from('users')
                .update({ role_id: roleId })
                .eq('id', userId);

            if (error) throw error;

            // Update local state
            setUsers(users.map(user => {
                if (user.id === userId) {
                    const newRole = roles.find(r => r.id === roleId);
                    return { ...user, role_id: roleId, roles: newRole };
                }
                return user;
            }));

            setEditingUser(null);
        } catch (error) {
            console.error('Error updating user role:', error);
        }
    };

    const filteredUsers = users.filter(user =>
        user.email?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getRoleIcon = (roleName) => {
        switch (roleName) {
            case 'admin':
                return <ShieldCheck className="w-4 h-4 text-yellow-400" />;
            case 'user':
                return <Shield className="w-4 h-4 text-blue-400" />;
            case 'restricted':
                return <ShieldX className="w-4 h-4 text-zinc-400" />;
            default:
                return <User className="w-4 h-4 text-zinc-400" />;
        }
    };

    const getRoleBadgeClass = (roleName) => {
        switch (roleName) {
            case 'admin':
                return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
            case 'user':
                return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
            case 'restricted':
                return 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30';
            default:
                return 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30';
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Gestion des Utilisateurs</h2>
                <button
                    onClick={fetchUsers}
                    className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-zinc-300 transition-colors"
                >
                    <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                    Actualiser
                </button>
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                <input
                    type="text"
                    placeholder="Rechercher par email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-500 focus:border-blue-500 focus:outline-none"
                />
            </div>

            {/* Users Table */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-zinc-800">
                            <th className="text-left px-6 py-4 text-sm font-medium text-zinc-400">Email</th>
                            <th className="text-left px-6 py-4 text-sm font-medium text-zinc-400">Rôle</th>
                            <th className="text-left px-6 py-4 text-sm font-medium text-zinc-400">Inscrit le</th>
                            <th className="text-left px-6 py-4 text-sm font-medium text-zinc-400">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-12 text-center text-zinc-400">
                                    <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-2" />
                                    Chargement...
                                </td>
                            </tr>
                        ) : filteredUsers.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-12 text-center text-zinc-400">
                                    Aucun utilisateur trouvé
                                </td>
                            </tr>
                        ) : (
                            filteredUsers.map((user) => (
                                <motion.tr
                                    key={user.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="border-b border-zinc-800 last:border-0 hover:bg-zinc-800/50"
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-medium">
                                                {user.email?.charAt(0).toUpperCase()}
                                            </div>
                                            <span className="text-white">{user.email}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getRoleBadgeClass(user.roles?.name)}`}>
                                            {getRoleIcon(user.roles?.name)}
                                            {user.roles?.name || 'N/A'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-zinc-400 text-sm">
                                        {new Date(user.created_at).toLocaleDateString('fr-FR')}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="relative">
                                            <button
                                                onClick={() => setEditingUser(editingUser === user.id ? null : user.id)}
                                                className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-sm text-zinc-300 transition-colors"
                                            >
                                                Changer le rôle
                                                <ChevronDown className={`w-4 h-4 transition-transform ${editingUser === user.id ? 'rotate-180' : ''}`} />
                                            </button>

                                            {editingUser === user.id && (
                                                <div className="absolute right-0 bottom-full mb-2 w-48 bg-zinc-800 border border-zinc-700 rounded-lg shadow-xl z-50">
                                                    {roles.map((role) => (
                                                        <button
                                                            key={role.id}
                                                            onClick={() => updateUserRole(user.id, role.id)}
                                                            className={`w-full flex items-center justify-between px-4 py-3 hover:bg-zinc-700 transition-colors ${user.role_id === role.id ? 'bg-zinc-700' : ''
                                                                }`}
                                                        >
                                                            <span className="flex items-center gap-2">
                                                                {getRoleIcon(role.name)}
                                                                <span className="text-white capitalize">{role.name}</span>
                                                            </span>
                                                            {user.role_id === role.id && (
                                                                <Check className="w-4 h-4 text-green-400" />
                                                            )}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                </motion.tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Stats */}
            <div className="flex gap-4 text-sm text-zinc-400">
                <span>Total: {users.length} utilisateurs</span>
                <span>•</span>
                <span>Admins: {users.filter(u => u.roles?.name === 'admin').length}</span>
                <span>•</span>
                <span>Users: {users.filter(u => u.roles?.name === 'user').length}</span>
            </div>
        </div>
    );
}
