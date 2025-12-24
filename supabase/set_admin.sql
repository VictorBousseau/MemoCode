-- =====================================================
-- Fix User Role to Admin
-- =====================================================
-- Run this in Supabase SQL Editor to set your user as admin

-- First, find your admin role ID
DO $$
DECLARE
    admin_role_id UUID;
BEGIN
    -- Get the admin role ID
    SELECT id INTO admin_role_id FROM roles WHERE name = 'admin';
    
    IF admin_role_id IS NULL THEN
        RAISE EXCEPTION 'Admin role not found. Please run schema.sql first.';
    END IF;
    
    -- Update the user with email 'bousseauvictor49@gmail.com' to admin
    UPDATE users 
    SET role_id = admin_role_id 
    WHERE email = 'bousseauvictor49@gmail.com';
    
    RAISE NOTICE 'User updated to admin role successfully!';
END $$;

-- Verify the update
SELECT u.email, r.name as role_name 
FROM users u 
JOIN roles r ON u.role_id = r.id 
WHERE u.email = 'bousseauvictor49@gmail.com';
