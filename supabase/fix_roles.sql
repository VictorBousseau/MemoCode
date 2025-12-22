-- Script de correction pour assigner les rôles aux utilisateurs existants
-- À exécuter dans le SQL Editor de Supabase

-- 1. Vérifier que la colonne role_id existe
-- (Si cette requête renvoie une erreur, la colonne n'existe pas)
SELECT id, email, role_id FROM users;

-- 2. Mettre à jour tous les utilisateurs existants sans rôle
UPDATE users
SET role_id = (SELECT id FROM roles WHERE name = 'user')
WHERE role_id IS NULL;

-- 3. Vérifier que ça a fonctionné
SELECT 
    u.id,
    u.email,
    u.role_id,
    r.name as role_name
FROM users u
LEFT JOIN roles r ON u.role_id = r.id;

-- 4. Optionnel : Promouvoir un utilisateur en admin (remplacez l'email)
-- UPDATE users
-- SET role_id = (SELECT id FROM roles WHERE name = 'admin')
-- WHERE email = 'votre@email.com';
