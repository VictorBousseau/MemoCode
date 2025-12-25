-- =====================================================
-- MASTER FIX: RLS POLICIES & TABLES
-- =====================================================
-- Run this entire script in Supabase SQL Editor to fix 
-- all permission issues for Login, Admin, and Stats.

-- 1. FIX USERS & ROLES
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;

-- Users policies
DROP POLICY IF EXISTS "Users can read own profile" ON users;
CREATE POLICY "Users can read own profile" ON users FOR SELECT TO authenticated USING (auth.uid() = id);

DROP POLICY IF EXISTS "Admins can read all users" ON users;
CREATE POLICY "Admins can read all users" ON users FOR SELECT TO authenticated USING (
    EXISTS (SELECT 1 FROM users u JOIN roles r ON u.role_id = r.id WHERE u.id = auth.uid() AND r.name = 'admin')
);

DROP POLICY IF EXISTS "Admins can update role_id" ON users;
CREATE POLICY "Admins can update role_id" ON users FOR UPDATE TO authenticated USING (
    EXISTS (SELECT 1 FROM users u JOIN roles r ON u.role_id = r.id WHERE u.id = auth.uid() AND r.name = 'admin')
);

-- Roles policies
DROP POLICY IF EXISTS "Authenticated users can read roles" ON roles;
CREATE POLICY "Authenticated users can read roles" ON roles FOR SELECT TO authenticated USING (true);


-- 2. FIX QUIZ SESSIONS
CREATE TABLE IF NOT EXISTS public.quiz_sessions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    quiz_id TEXT NOT NULL,
    quiz_title TEXT,
    score INTEGER NOT NULL,
    total_questions INTEGER NOT NULL,
    percentage INTEGER NOT NULL,
    time_spent_seconds INTEGER,
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

ALTER TABLE quiz_sessions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read own quiz sessions" ON quiz_sessions;
CREATE POLICY "Users can read own quiz sessions" ON quiz_sessions FOR SELECT TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own quiz sessions" ON quiz_sessions;
CREATE POLICY "Users can insert own quiz sessions" ON quiz_sessions FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);


-- 3. FIX QUIZ ANSWERS
CREATE TABLE IF NOT EXISTS public.quiz_answers (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    session_id UUID REFERENCES public.quiz_sessions(id) ON DELETE CASCADE,
    question_id TEXT NOT NULL,
    user_answer TEXT,
    is_correct BOOLEAN,
    answered_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

ALTER TABLE quiz_answers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read own quiz answers" ON quiz_answers;
CREATE POLICY "Users can read own quiz answers" ON quiz_answers FOR SELECT TO authenticated USING (
    EXISTS (SELECT 1 FROM quiz_sessions s WHERE s.id = quiz_answers.session_id AND s.user_id = auth.uid())
);

DROP POLICY IF EXISTS "Users can insert own quiz answers" ON quiz_answers;
CREATE POLICY "Users can insert own quiz answers" ON quiz_answers FOR INSERT TO authenticated WITH CHECK (
    EXISTS (SELECT 1 FROM quiz_sessions s WHERE s.id = quiz_answers.session_id AND s.user_id = auth.uid())
);


-- 4. FIX USER FLASHCARDS
CREATE TABLE IF NOT EXISTS public.user_flashcards (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    flashcard_id TEXT NOT NULL,
    status TEXT DEFAULT 'new', -- new, learning, review, mastered
    next_review TIMESTAMP WITH TIME ZONE,
    interval INTEGER DEFAULT 0,
    ease_factor FLOAT DEFAULT 2.5,
    streak INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    UNIQUE(user_id, flashcard_id)
);

ALTER TABLE user_flashcards ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read own flashcards" ON user_flashcards;
CREATE POLICY "Users can read own flashcards" ON user_flashcards FOR SELECT TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own flashcards" ON user_flashcards;
CREATE POLICY "Users can insert own flashcards" ON user_flashcards FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own flashcards" ON user_flashcards;
CREATE POLICY "Users can update own flashcards" ON user_flashcards FOR UPDATE TO authenticated USING (auth.uid() = user_id);


-- 5. VERIFY CONFIGURATION
SELECT 'Roles Policy Active' as check_name, count(*) as count FROM pg_policies WHERE tablename = 'roles'
UNION ALL
SELECT 'Users Policy Active', count(*) FROM pg_policies WHERE tablename = 'users'
UNION ALL
SELECT 'Quiz Policy Active', count(*) FROM pg_policies WHERE tablename = 'quiz_sessions';
