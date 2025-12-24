-- =====================================================
-- Fix Roles Table RLS - Allow Authenticated Users to Read
-- =====================================================
-- Run this in Supabase SQL Editor

-- Enable RLS on roles table if not already enabled
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;

-- Allow all authenticated users to read roles (needed for role fetching)
DROP POLICY IF EXISTS "Authenticated users can read roles" ON roles;
CREATE POLICY "Authenticated users can read roles"
    ON roles FOR SELECT
    TO authenticated
    USING (true);

-- Also ensure users table has a policy for authenticated users to read their own data
DROP POLICY IF EXISTS "Users can read own profile" ON users;
CREATE POLICY "Users can read own profile"
    ON users FOR SELECT
    TO authenticated
    USING (auth.uid() = id);

-- Verify roles exist
SELECT * FROM roles;

-- Verify your user has correct role_id
SELECT u.id, u.email, u.role_id, r.name as role_name
FROM users u
LEFT JOIN roles r ON u.role_id = r.id
WHERE u.email = 'bousseauvictor49@gmail.com';
