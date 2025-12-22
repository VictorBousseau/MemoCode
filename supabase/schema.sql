-- =====================================================
-- MemoCode v2 - Database Schema
-- =====================================================
-- This script creates all tables and policies for the MemoCode application

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- 1. ROLES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) UNIQUE NOT NULL,
    permissions JSONB NOT NULL DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default roles
INSERT INTO roles (name, permissions) VALUES
('admin', '{
    "canAccessQuiz": true,
    "canAccessFlashcards": true,
    "canAccessPlayground": true,
    "canCreateContent": true,
    "canManageUsers": true,
    "canSeeAllUsers": true
}'),
('user', '{
    "canAccessQuiz": true,
    "canAccessFlashcards": true,
    "canAccessPlayground": true,
    "canCreateContent": false,
    "canManageUsers": false
}'),
('restricted', '{
    "canAccessQuiz": true,
    "canAccessFlashcards": false,
    "canAccessPlayground": false,
    "canCreateContent": false,
    "canManageUsers": false
}')
ON CONFLICT (name) DO NOTHING;

-- =====================================================
-- 2. USERS TABLE (extends Supabase auth.users)
-- =====================================================
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL,
    role_id UUID REFERENCES roles(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 3. QUIZ QUESTIONS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS quiz_questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category VARCHAR(100) NOT NULL,
    difficulty VARCHAR(20) CHECK (difficulty IN ('easy', 'medium', 'hard')),
    question TEXT NOT NULL,
    options JSONB NOT NULL,
    correct_answer VARCHAR(10) NOT NULL,
    explanation TEXT,
    created_by UUID REFERENCES users(id),
    is_public BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_quiz_category ON quiz_questions(category);
CREATE INDEX IF NOT EXISTS idx_quiz_difficulty ON quiz_questions(difficulty);
CREATE INDEX IF NOT EXISTS idx_quiz_public ON quiz_questions(is_public);

-- =====================================================
-- 4. QUIZ RESULTS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS quiz_results (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    question_id UUID REFERENCES quiz_questions(id) ON DELETE CASCADE NOT NULL,
    user_answer VARCHAR(10) NOT NULL,
    is_correct BOOLEAN NOT NULL,
    time_spent_seconds INTEGER,
    completed_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_quiz_results_user ON quiz_results(user_id);
CREATE INDEX IF NOT EXISTS idx_quiz_results_question ON quiz_results(question_id);

-- =====================================================
-- 5. FLASHCARDS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS flashcards (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category VARCHAR(100) NOT NULL,
    front TEXT NOT NULL,
    back TEXT NOT NULL,
    code_example TEXT,
    difficulty VARCHAR(20) CHECK (difficulty IN ('easy', 'medium', 'hard')),
    tags JSONB DEFAULT '[]',
    created_by UUID REFERENCES users(id),
    is_public BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_flashcards_category ON flashcards(category);
CREATE INDEX IF NOT EXISTS idx_flashcards_public ON flashcards(is_public);

-- =====================================================
-- 6. USER PROGRESS TABLE (Flashcard tracking)
-- =====================================================
CREATE TABLE IF NOT EXISTS user_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    flashcard_id UUID REFERENCES flashcards(id) ON DELETE CASCADE NOT NULL,
    last_reviewed TIMESTAMPTZ,
    ease_factor FLOAT DEFAULT 2.5,
    next_review_date TIMESTAMPTZ DEFAULT NOW(),
    review_count INTEGER DEFAULT 0,
    success_rate FLOAT DEFAULT 0.0,
    UNIQUE(user_id, flashcard_id)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_user_progress_user ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_next_review ON user_progress(next_review_date);

-- =====================================================
-- 7. FEEDBACK TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS feedback (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    type VARCHAR(50) CHECK (type IN ('bug', 'feature_request', 'question', 'other')) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    page_url TEXT,
    user_agent TEXT,
    status VARCHAR(50) CHECK (status IN ('new', 'in_progress', 'resolved', 'closed')) DEFAULT 'new',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index
CREATE INDEX IF NOT EXISTS idx_feedback_status ON feedback(status);
CREATE INDEX IF NOT EXISTS idx_feedback_user ON feedback(user_id);

-- =====================================================
-- 8. TRIGGERS FOR updated_at
-- =====================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_feedback_updated_at BEFORE UPDATE ON feedback
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- 9. ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE flashcards ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- USERS TABLE POLICIES
-- =====================================================
-- Users can view their own profile
CREATE POLICY "Users can view own profile"
    ON users FOR SELECT
    USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
    ON users FOR UPDATE
    USING (auth.uid() = id);

-- =====================================================
-- QUIZ QUESTIONS POLICIES
-- =====================================================
-- Everyone can view public questions
CREATE POLICY "Anyone can view public quiz questions"
    ON quiz_questions FOR SELECT
    USING (is_public = true OR auth.uid() IS NOT NULL);

-- Admins can manage all questions
CREATE POLICY "Admins can manage quiz questions"
    ON quiz_questions FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM users
            JOIN roles ON users.role_id = roles.id
            WHERE users.id = auth.uid()
            AND roles.name = 'admin'
        )
    );

-- =====================================================
-- QUIZ RESULTS POLICIES
-- =====================================================
-- Users can view their own results
CREATE POLICY "Users can view own quiz results"
    ON quiz_results FOR SELECT
    USING (auth.uid() = user_id);

-- Users can insert their own results
CREATE POLICY "Users can insert own quiz results"
    ON quiz_results FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Admins can view all results
CREATE POLICY "Admins can view all quiz results"
    ON quiz_results FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM users
            JOIN roles ON users.role_id = roles.id
            WHERE users.id = auth.uid()
            AND roles.name = 'admin'
        )
    );

-- =====================================================
-- FLASHCARDS POLICIES
-- =====================================================
-- Everyone can view public flashcards
CREATE POLICY "Anyone can view public flashcards"
    ON flashcards FOR SELECT
    USING (is_public = true OR auth.uid() IS NOT NULL);

-- Admins can manage all flashcards
CREATE POLICY "Admins can manage flashcards"
    ON flashcards FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM users
            JOIN roles ON users.role_id = roles.id
            WHERE users.id = auth.uid()
            AND roles.name = 'admin'
        )
    );

-- =====================================================
-- USER PROGRESS POLICIES
-- =====================================================
-- Users can view their own progress
CREATE POLICY "Users can view own progress"
    ON user_progress FOR SELECT
    USING (auth.uid() = user_id);

-- Users can manage their own progress
CREATE POLICY "Users can manage own progress"
    ON user_progress FOR ALL
    USING (auth.uid() = user_id);

-- =====================================================
-- FEEDBACK POLICIES
-- =====================================================
-- Users can view their own feedback
CREATE POLICY "Users can view own feedback"
    ON feedback FOR SELECT
    USING (auth.uid() = user_id OR user_id IS NULL);

-- Anyone (even non-authenticated) can submit feedback
CREATE POLICY "Anyone can submit feedback"
    ON feedback FOR INSERT
    WITH CHECK (true);

-- Admins can view and manage all feedback
CREATE POLICY "Admins can manage all feedback"
    ON feedback FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM users
            JOIN roles ON users.role_id = roles.id
            WHERE users.id = auth.uid()
            AND roles.name = 'admin'
        )
    );

-- =====================================================
-- 10. FUNCTION TO CREATE USER ON SIGNUP
-- =====================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
    default_role_id UUID;
BEGIN
    -- Get the 'user' role ID
    SELECT id INTO default_role_id FROM public.roles WHERE name = 'user' LIMIT 1;
    
    -- Insert new user with default role
    INSERT INTO public.users (id, email, role_id)
    VALUES (NEW.id, NEW.email, default_role_id);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger when a new user signs up via Supabase Auth
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =====================================================
-- SCHEMA CREATION COMPLETE
-- =====================================================
