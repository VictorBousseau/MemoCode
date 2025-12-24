-- =====================================================
-- MemoCode - User Flashcards Migration
-- =====================================================
-- Run this in Supabase SQL Editor to add user flashcards table

-- Create user_flashcards table for storing user-created flashcards
CREATE TABLE IF NOT EXISTS user_flashcards (
    id VARCHAR(100) PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    question_id VARCHAR(100),
    question TEXT NOT NULL,
    code TEXT,
    answer TEXT NOT NULL,
    explanation TEXT,
    type VARCHAR(50),
    topic VARCHAR(100) DEFAULT 'general',
    difficulty VARCHAR(20) DEFAULT 'beginner',
    reviewed_at TIMESTAMPTZ,
    times_reviewed INTEGER DEFAULT 0,
    correct_count INTEGER DEFAULT 0,
    incorrect_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_user_flashcards_user ON user_flashcards(user_id);
CREATE INDEX IF NOT EXISTS idx_user_flashcards_topic ON user_flashcards(topic);
CREATE INDEX IF NOT EXISTS idx_user_flashcards_created ON user_flashcards(created_at DESC);

-- Enable RLS
ALTER TABLE user_flashcards ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own flashcards"
    ON user_flashcards FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own flashcards"
    ON user_flashcards FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own flashcards"
    ON user_flashcards FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own flashcards"
    ON user_flashcards FOR DELETE
    USING (auth.uid() = user_id);

-- Admins can view all flashcards
CREATE POLICY "Admins can view all flashcards"
    ON user_flashcards FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM users
            JOIN roles ON users.role_id = roles.id
            WHERE users.id = auth.uid()
            AND roles.name = 'admin'
        )
    );

-- =====================================================
-- MIGRATION COMPLETE
-- =====================================================
