-- =====================================================
-- Fix Users and Roles RLS Policies
-- =====================================================
-- Run this in Supabase SQL Editor

-- Enable RLS on users table
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Allow users to read their own profile
DROP POLICY IF EXISTS "Users can read own profile" ON users;
CREATE POLICY "Users can read own profile"
    ON users FOR SELECT
    TO authenticated
    USING (auth.uid() = id);

-- Also allow admins to read all users (for admin dashboard)
DROP POLICY IF EXISTS "Admins can read all users" ON users;
CREATE POLICY "Admins can read all users"
    ON users FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM users u
            JOIN roles r ON u.role_id = r.id
            WHERE u.id = auth.uid() AND r.name = 'admin'
        )
    );

-- Enable RLS on roles table
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;

-- Allow all authenticated users to read roles
DROP POLICY IF EXISTS "Authenticated users can read roles" ON roles;
CREATE POLICY "Authenticated users can read roles"
    ON roles FOR SELECT
    TO authenticated
    USING (true);

-- Verify your user has correct role
SELECT 
    u.id, 
    u.email, 
    u.role_id, 
    r.name as role_name,
    r.permissions
FROM users u
LEFT JOIN roles r ON u.role_id = r.id
WHERE u.email = 'bousseauvictor49@gmail.com';
