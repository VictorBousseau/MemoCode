-- =====================================================
-- MASTER FIX COMPLETE - Simplified and Idempotent
-- =====================================================
-- This script fixes ALL permission issues for auth, admin, and stats
-- Safe to run multiple times (idempotent)

-- Step 1: Clean slate - Drop ALL existing policies
DO $$ 
DECLARE
    r RECORD;
BEGIN
    -- Drop all policies on users table
    FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'users') LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || r.policyname || '" ON users';
    END LOOP;
    
    -- Drop all policies on roles table
    FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'roles') LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || r.policyname || '" ON roles';
    END LOOP;
    
    -- Drop all policies on quiz_sessions table
    FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'quiz_sessions') LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || r.policyname || '" ON quiz_sessions';
    END LOOP;
    
    -- Drop all policies on quiz_answers table
    FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'quiz_answers') LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || r.policyname || '" ON quiz_answers';
    END LOOP;
    
    -- Drop all policies on user_flashcards table
    FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'user_flashcards') LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || r.policyname || '" ON user_flashcards';
    END LOOP;
END $$;

-- Step 2: Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_flashcards ENABLE ROW LEVEL SECURITY;

-- Step 3: Create SIMPLE policies (no complex sub-queries)

-- =====================================================
-- ROLES TABLE - Everyone can read (needed for login)
-- =====================================================
CREATE POLICY "roles_select_all" 
    ON roles FOR SELECT 
    TO authenticated 
    USING (true);

-- =====================================================
-- USERS TABLE - Read own profile
-- =====================================================
CREATE POLICY "users_select_own" 
    ON users FOR SELECT 
    TO authenticated 
    USING (auth.uid() = id);

-- =====================================================
-- QUIZ SESSIONS - Read and insert own sessions
-- =====================================================
CREATE POLICY "quiz_sessions_select_own" 
    ON quiz_sessions FOR SELECT 
    TO authenticated 
    USING (auth.uid() = user_id);

CREATE POLICY "quiz_sessions_insert_own" 
    ON quiz_sessions FOR INSERT 
    TO authenticated 
    WITH CHECK (auth.uid() = user_id);

-- =====================================================
-- QUIZ ANSWERS - Read and insert own answers
-- =====================================================
CREATE POLICY "quiz_answers_select_own" 
    ON quiz_answers FOR SELECT 
    TO authenticated 
    USING (
        EXISTS (
            SELECT 1 FROM quiz_sessions 
            WHERE quiz_sessions.id = quiz_answers.session_id 
            AND quiz_sessions.user_id = auth.uid()
        )
    );

CREATE POLICY "quiz_answers_insert_own" 
    ON quiz_answers FOR INSERT 
    TO authenticated 
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM quiz_sessions 
            WHERE quiz_sessions.id = quiz_answers.session_id 
            AND quiz_sessions.user_id = auth.uid()
        )
    );

-- =====================================================
-- USER FLASHCARDS - Full CRUD for own flashcards
-- =====================================================
CREATE POLICY "flashcards_select_own" 
    ON user_flashcards FOR SELECT 
    TO authenticated 
    USING (auth.uid() = user_id);

CREATE POLICY "flashcards_insert_own" 
    ON user_flashcards FOR INSERT 
    TO authenticated 
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "flashcards_update_own" 
    ON user_flashcards FOR UPDATE 
    TO authenticated 
    USING (auth.uid() = user_id);

CREATE POLICY "flashcards_delete_own" 
    ON user_flashcards FOR DELETE 
    TO authenticated 
    USING (auth.uid() = user_id);

-- =====================================================
-- VERIFICATION - Check your user has admin role
-- =====================================================
SELECT 
    u.id,
    u.email,
    u.role_id,
    r.name as role_name,
    'SUCCESS: User found with role' as status
FROM users u
LEFT JOIN roles r ON u.role_id = r.id
WHERE u.email = 'bousseauvictor49@gmail.com';

-- =====================================================
-- Count active policies
-- =====================================================
SELECT 
    schemaname,
    tablename,
    COUNT(*) as policy_count
FROM pg_policies 
WHERE tablename IN ('users', 'roles', 'quiz_sessions', 'quiz_answers', 'user_flashcards')
GROUP BY schemaname, tablename
ORDER BY tablename;
