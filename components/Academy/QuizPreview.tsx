"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, BrainCircuit } from "lucide-react";
import { useTranslations } from "next-intl";
import { QUESTIONS, Question } from "./data/questions";

interface QuizPreviewProps {
    onComplete?: (success: boolean) => void;
}

export default function QuizPreview({ onComplete }: QuizPreviewProps) {
    const t = useTranslations("Academy.quiz");
    const [selected, setSelected] = useState<number | null>(null);
    const [submitted, setSubmitted] = useState(false);
    const [dailyQuestion, setDailyQuestion] = useState<Question | null>(null);

    useEffect(() => {
        // Select a random question for daily challenge
        // In a real app, this might stick to the same question for the day using Date as seed
        const randomQ = QUESTIONS[Math.floor(Math.random() * QUESTIONS.length)];
        setDailyQuestion(randomQ);
    }, []);

    const handleSelect = (idx: number) => {
        if (!submitted) setSelected(idx);
    };

    const handleSubmit = () => {
        if (selected !== null && dailyQuestion) {
            setSubmitted(true);
            if (onComplete) {
                onComplete(selected === dailyQuestion.correct);
            }
        }
    };

    if (!dailyQuestion) return null; // Loading state could be added

    const isCorrect = selected === dailyQuestion.correct;

    return (
        <div className="border border-[var(--primary-500)]/30 rounded p-6 bg-black/40 backdrop-blur relative overflow-hidden">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
                <BrainCircuit className="text-[var(--secondary-500)] w-6 h-6 animate-pulse" />
                <div>
                    <h3 className="text-sm font-bold text-white tracking-widest">{t('title')}</h3>
                    <p className="text-[10px] text-[var(--text-muted)] font-mono">DAILY_CHALLENGE // RANDOM</p>
                </div>
            </div>

            {/* Question */}
            <p className="text-white mb-6 font-mono leading-relaxed">
                {dailyQuestion.text}
            </p>

            {/* Options */}
            <div className="space-y-3 mb-6">
                {dailyQuestion.options.map((option, idx) => (
                    <motion.button
                        key={idx}
                        onClick={() => handleSelect(idx)}
                        whileHover={!submitted ? { x: 5, backgroundColor: "rgba(255,255,255,0.05)" } : {}}
                        className={`w-full text-left p-3 border rounded text-xs font-mono transition-all flex items-center justify-between
                   ${selected === idx
                                ? "border-[var(--primary-500)] bg-[var(--primary-500)]/10 text-[var(--primary-500)]"
                                : "border-white/10 text-[var(--text-muted)] hover:border-white/30"
                            }
                   ${submitted && idx === dailyQuestion.correct ? "!border-[var(--success)] !bg-[var(--success)]/10 !text-[var(--success)]" : ""}
                   ${submitted && selected === idx && idx !== dailyQuestion.correct ? "!border-[var(--error)] !bg-[var(--error)]/10 !text-[var(--error)]" : ""}
                `}
                    >
                        <span>{option}</span>
                        {submitted && idx === dailyQuestion.correct && <CheckCircle className="w-4 h-4" />}
                        {submitted && selected === idx && idx !== dailyQuestion.correct && <XCircle className="w-4 h-4" />}
                    </motion.button>
                ))}
            </div>

            {/* Action */}
            <AnimatePresence>
                {!submitted ? (
                    <motion.button
                        onClick={handleSubmit}
                        disabled={selected === null}
                        className={`w-full py-2 bg-[var(--primary-500)] text-black font-bold text-xs tracking-widest uppercase rounded hover:shadow-[0_0_20px_var(--primary-500)] transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        {t('submit')}
                    </motion.button>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`text-center font-mono text-xs font-bold p-2 border rounded ${isCorrect ? "border-[var(--success)] text-[var(--success)]" : "border-[var(--error)] text-[var(--error)]"}`}
                    >
                        {isCorrect ? t('correct') : t('wrong')}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
