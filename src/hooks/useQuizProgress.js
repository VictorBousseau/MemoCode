import { useState, useEffect, useCallback } from 'react';
import { getQuizById } from '../data/quizData';
import { useQuizSync } from './useQuizSync';

const STORAGE_KEY = 'memocode_quiz_progress';

/**
 * Custom hook for managing quiz progress and state
 */
export function useQuizProgress(quizId) {
    const [quiz, setQuiz] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [showFeedback, setShowFeedback] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [startTime, setStartTime] = useState(null);

    // Supabase sync hook
    const { saveQuizResult: syncToSupabase } = useQuizSync();

    // Load quiz data
    useEffect(() => {
        if (quizId) {
            const quizData = getQuizById(quizId);
            setQuiz(quizData);
            setStartTime(Date.now());
        }
    }, [quizId]);

    // Load saved progress from localStorage
    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                const allProgress = JSON.parse(stored);
                const quizProgress = allProgress[quizId];
                if (quizProgress && !quizProgress.completed) {
                    setAnswers(quizProgress.answers || {});
                    setCurrentQuestionIndex(quizProgress.currentQuestion || 0);
                }
            } catch (e) {
                console.error('Failed to load quiz progress:', e);
            }
        }
    }, [quizId]);

    // Save progress to localStorage
    const saveProgress = useCallback((updatedAnswers, questionIndex, completed = false) => {
        const stored = localStorage.getItem(STORAGE_KEY);
        const allProgress = stored ? JSON.parse(stored) : {};

        allProgress[quizId] = {
            answers: updatedAnswers,
            currentQuestion: questionIndex,
            completed,
            lastUpdated: Date.now()
        };

        localStorage.setItem(STORAGE_KEY, JSON.stringify(allProgress));
    }, [quizId]);

    // Submit an answer
    const submitAnswer = useCallback((questionId, answer) => {
        const updatedAnswers = {
            ...answers,
            [questionId]: {
                answer,
                timestamp: Date.now()
            }
        };

        setAnswers(updatedAnswers);
        setShowFeedback(true);
        saveProgress(updatedAnswers, currentQuestionIndex);
    }, [answers, currentQuestionIndex, saveProgress]);

    // Go to next question
    const nextQuestion = useCallback(() => {
        if (!quiz) return;

        if (currentQuestionIndex < quiz.questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
            setShowFeedback(false);
        } else {
            // Quiz completed
            setIsCompleted(true);
            saveProgress(answers, currentQuestionIndex, true);
            saveQuizResult();
        }
    }, [quiz, currentQuestionIndex, answers, saveProgress]);

    // Go to previous question
    const previousQuestion = useCallback(() => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
            setShowFeedback(false);
        }
    }, [currentQuestionIndex]);

    // Calculate score
    const calculateScore = useCallback(() => {
        if (!quiz) return { score: 0, total: 0, percentage: 0 };

        let correct = 0;
        quiz.questions.forEach(question => {
            const userAnswer = answers[question.id]?.answer;
            if (userAnswer === undefined) return;

            let isCorrect = false;
            switch (question.type) {
                case 'mcq':
                    isCorrect = userAnswer === question.correctAnswer;
                    break;
                case 'code-completion':
                    isCorrect = String(userAnswer).trim().toLowerCase() === String(question.correctAnswer).toLowerCase();
                    break;
                case 'true-false':
                    isCorrect = userAnswer === question.correctAnswer;
                    break;
                default:
                    break;
            }

            if (isCorrect) correct++;
        });

        const total = quiz.questions.length;
        const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;

        return { score: correct, total, percentage };
    }, [quiz, answers]);

    // Save quiz result to history (syncs to Supabase if logged in)
    const saveQuizResult = useCallback(async () => {
        const result = calculateScore();
        const timeSpent = startTime ? Math.round((Date.now() - startTime) / 1000) : 0;

        const quizResult = {
            quizId,
            quizTitle: quiz?.title,
            ...result,
            timeSpent,
            answers
        };

        // Sync to Supabase (handles localStorage fallback internally)
        await syncToSupabase(quizResult);
    }, [quizId, quiz, calculateScore, startTime, answers, syncToSupabase]);

    // Reset quiz
    const resetQuiz = useCallback(() => {
        setCurrentQuestionIndex(0);
        setAnswers({});
        setShowFeedback(false);
        setIsCompleted(false);
        setStartTime(Date.now());
        saveProgress({}, 0, false);
    }, [saveProgress]);

    // Get current question
    const currentQuestion = quiz?.questions[currentQuestionIndex];

    // Check if current question is answered
    const isCurrentQuestionAnswered = currentQuestion ?
        answers[currentQuestion.id] !== undefined : false;

    // Check if answer is correct
    const isAnswerCorrect = useCallback((questionId) => {
        const question = quiz?.questions.find(q => q.id === questionId);
        if (!question) return false;

        const userAnswer = answers[questionId]?.answer;
        if (userAnswer === undefined) return false;

        switch (question.type) {
            case 'mcq':
                return userAnswer === question.correctAnswer;
            case 'code-completion':
                return String(userAnswer).trim().toLowerCase() === String(question.correctAnswer).toLowerCase();
            case 'true-false':
                return userAnswer === question.correctAnswer;
            default:
                return false;
        }
    }, [quiz, answers]);

    return {
        quiz,
        currentQuestion,
        currentQuestionIndex,
        answers,
        showFeedback,
        isCompleted,
        isCurrentQuestionAnswered,
        submitAnswer,
        nextQuestion,
        previousQuestion,
        resetQuiz,
        calculateScore,
        isAnswerCorrect,
        progress: {
            answered: Object.keys(answers).length,
            total: quiz?.questions.length || 0,
            percentage: quiz ? Math.round((Object.keys(answers).length / quiz.questions.length) * 100) : 0
        }
    };
}
