-- =====================================================
-- MemoCode - Quiz Sessions Migration
-- =====================================================
-- Run this in Supabase SQL Editor to add quiz session tracking

-- Create quiz_sessions table for tracking completed quizzes
CREATE TABLE IF NOT EXISTS quiz_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    quiz_id VARCHAR(100) NOT NULL,
    quiz_title VARCHAR(255),
    score INTEGER NOT NULL DEFAULT 0,
    total_questions INTEGER NOT NULL DEFAULT 0,
    percentage INTEGER NOT NULL DEFAULT 0,
    time_spent_seconds INTEGER,
    completed_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_quiz_sessions_user ON quiz_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_quiz_sessions_quiz ON quiz_sessions(quiz_id);
CREATE INDEX IF NOT EXISTS idx_quiz_sessions_completed ON quiz_sessions(completed_at DESC);

-- Optional: Quiz answers for detailed analytics
CREATE TABLE IF NOT EXISTS quiz_answers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID REFERENCES quiz_sessions(id) ON DELETE CASCADE NOT NULL,
    question_id VARCHAR(100) NOT NULL,
    user_answer TEXT,
    is_correct BOOLEAN,
    answered_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_quiz_answers_session ON quiz_answers(session_id);

-- Enable RLS
ALTER TABLE quiz_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_answers ENABLE ROW LEVEL SECURITY;

-- RLS Policies for quiz_sessions
CREATE POLICY "Users can view own quiz sessions"
    ON quiz_sessions FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own quiz sessions"
    ON quiz_sessions FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Admins can view all sessions
CREATE POLICY "Admins can view all quiz sessions"
    ON quiz_sessions FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM users
            JOIN roles ON users.role_id = roles.id
            WHERE users.id = auth.uid()
            AND roles.name = 'admin'
        )
    );

-- RLS Policies for quiz_answers
CREATE POLICY "Users can view own quiz answers"
    ON quiz_answers FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM quiz_sessions
            WHERE quiz_sessions.id = quiz_answers.session_id
            AND quiz_sessions.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can insert own quiz answers"
    ON quiz_answers FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM quiz_sessions
            WHERE quiz_sessions.id = quiz_answers.session_id
            AND quiz_sessions.user_id = auth.uid()
        )
    );

-- =====================================================
-- MIGRATION COMPLETE
-- =====================================================
