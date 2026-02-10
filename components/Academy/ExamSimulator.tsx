import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Timer, CheckCircle, XCircle, AlertTriangle, ChevronRight, Save, Award } from "lucide-react";
import { QUESTIONS, Question } from "./data/questions";
import { useRouter } from "next/navigation"; // If needed, but we might just use callback

interface ExamSimulatorProps {
    mode: 'quick' | 'real';
    onClose: () => void;
    onComplete: (score: number) => void;
    onRedirect?: (moduleId: string) => void;
}

export default function ExamSimulator({ mode, onClose, onComplete, onRedirect }: ExamSimulatorProps) {
    const t = useTranslations("Academy.dashboard.exam");

    // Setup initial state based on mode
    const [activeQuestions, setActiveQuestions] = useState<Question[]>([]);
    const [currentQ, setCurrentQ] = useState(0);
    const [answers, setAnswers] = useState<number[]>([]);
    const [timeLeft, setTimeLeft] = useState(mode === 'quick' ? 300 : 3600); // 5 min vs 60 min
    const [finished, setFinished] = useState(false);
    const [showSaveForm, setShowSaveForm] = useState(false);
    const [reviewMode, setReviewMode] = useState(false);
    const [flags, setFlags] = useState<boolean[]>([]);
    const [examClass, setExamClass] = useState<'AB' | 'C' | null>(mode === 'quick' ? 'AB' : null);

    useEffect(() => {
        // Initialize questions with weighted distribution
        // Target: 20% Regulations, 40% Technical, 40% Operating

        const regs = QUESTIONS.filter(q => q.category === 'regulations');
        const tech = QUESTIONS.filter(q => q.category === 'technical');
        const ops = QUESTIONS.filter(q => q.category === 'operating');

        const shuffle = (array: Question[]) => [...array].sort(() => 0.5 - Math.random());

        let selected: Question[] = [];

        if (mode === 'quick') {
            // Quick mode (10 questions): 2 Regs, 4 Tech, 4 Ops
            selected = [
                ...shuffle(regs).slice(0, 2),
                ...shuffle(tech).slice(0, 4),
                ...shuffle(ops).slice(0, 4)
            ];
        } else {
            // Real mode (50 questions): 10 Regs, 20 Tech, 20 Ops
            // If not enough questions, fill with available ones
            selected = [
                ...shuffle(regs).slice(0, 10),
                ...shuffle(tech).slice(0, 20),
                ...shuffle(ops).slice(0, 20)
            ];
        }

        // Shuffle the final selection so categories are mixed
        selected = shuffle(selected);

        setActiveQuestions(selected);
        setAnswers(new Array(selected.length).fill(-1));
        setFlags(new Array(selected.length).fill(false));
    }, [mode, examClass]);

    useEffect(() => {
        if (!finished && timeLeft > 0 && activeQuestions.length > 0) {
            const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
            return () => clearInterval(timer);
        } else if (timeLeft === 0 && !finished && activeQuestions.length > 0) {
            finishExam();
        }
    }, [timeLeft, finished, activeQuestions]);

    const handleAnswer = (optionIdx: number) => {
        if (finished) return;
        const newAnswers = [...answers];
        newAnswers[currentQ] = optionIdx;
        setAnswers(newAnswers);
    };

    const toggleFlag = () => {
        if (finished) return;
        const newFlags = [...flags];
        newFlags[currentQ] = !newFlags[currentQ];
        setFlags(newFlags);
    };

    const finishExam = () => {
        setFinished(true);
    };

    const calculateStats = () => {
        let correctCount = 0;
        const categoryStats = {
            regulations: { total: 0, correct: 0 },
            technical: { total: 0, correct: 0 },
            operating: { total: 0, correct: 0 }
        };

        answers.forEach((ans, idx) => {
            const q = activeQuestions[idx];
            if (categoryStats[q.category]) {
                categoryStats[q.category].total++;
                if (ans === q.correct) {
                    correctCount++;
                    categoryStats[q.category].correct++;
                }
            }
        });

        const percentage = Math.round((correctCount / activeQuestions.length) * 100);
        let earnedLicense: string | null = null;

        if (examClass === 'AB') {
            if (percentage >= 75) earnedLicense = "A";
            else if (percentage >= 60) earnedLicense = "B";
        } else if (examClass === 'C') {
            if (percentage >= 60) earnedLicense = "C";
        }

        return {
            score: percentage,
            passed: earnedLicense !== null,
            earnedLicense: earnedLicense || "", // Ensure string type for translation
            categoryStats
        };
    };

    const handleCloseResult = (save: boolean) => {
        const { score } = calculateStats();
        if (save) {
            // Mock save logic - in real app this would go to DB
            const savedScores = localStorage.getItem("academy_scores");
            const newScore = { date: new Date().toISOString(), score, mode };
            const scores = savedScores ? JSON.parse(savedScores) : [];
            scores.push(newScore);
            localStorage.setItem("academy_scores", JSON.stringify(scores));
        }
        onComplete(score);
        onClose();
    };

    const handleRedirect = (category: string) => {
        // Map category to module ID
        // regulations -> regulations
        // technical -> technical
        // operating -> operating
        if (onRedirect) {
            onRedirect(category);
        }
        onClose();
    };

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    if (mode === 'real' && !examClass) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm">
                <div className="max-w-md w-full border border-[var(--primary-500)] bg-black p-8 rounded-lg relative overflow-hidden text-center">
                    <div className="absolute inset-0 bg-scan-line pointer-events-none opacity-5"></div>
                    <h2 className="text-2xl font-bold text-white mb-8 tracking-widest">{t('selectClass')}</h2>

                    <button
                        onClick={() => setExamClass('AB')}
                        className="w-full p-4 mb-4 border border-[var(--primary-500)] text-[var(--primary-500)] hover:bg-[var(--primary-500)] hover:text-black transition-all font-mono font-bold"
                    >
                        {t('classAB')}
                    </button>

                    <button
                        onClick={() => setExamClass('C')}
                        className="w-full p-4 mb-8 border border-white/30 text-white hover:bg-white hover:text-black transition-all font-mono font-bold"
                    >
                        {t('classC')}
                    </button>

                    <button onClick={onClose} className="text-white/50 text-xs hover:text-white underline">
                        CANCEL
                    </button>
                </div>
            </div>
        );
    }

    if (activeQuestions.length === 0) return <div className="fixed inset-0 bg-black z-50 flex items-center justify-center text-white">Loading Exam...</div>;

    if (finished) {
        const { score, passed, earnedLicense, categoryStats } = calculateStats();
        const weakCategories = Object.entries(categoryStats)
            .filter(([_, stats]) => stats.total > 0 && (stats.correct / stats.total) < 0.7)
            .map(([cat]) => cat);

        if (reviewMode) {
            return (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm">
                    <div className="w-full max-w-4xl h-[90vh] border border-[var(--primary-500)] rounded bg-black relative flex flex-col">
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-[var(--primary-500)]/30">
                            <div>
                                <h2 className="text-xl font-bold text-white tracking-widest">{t('review')}</h2>
                                <div className="text-[10px] text-[var(--primary-500)] font-mono">
                                    {score} POINTS // {passed ? "PASSED" : "FAILED"}
                                </div>
                            </div>
                            <button
                                onClick={() => setReviewMode(false)}
                                className="px-4 py-2 bg-white text-black font-bold text-xs tracking-widest hover:bg-[var(--primary-500)] transition-colors"
                            >
                                {t('backToResult')}
                            </button>
                        </div>

                        {/* Questions List */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
                            {activeQuestions.map((q, idx) => {
                                const userAnswer = answers[idx];
                                const isCorrect = userAnswer === q.correct;
                                const isUnanswered = userAnswer === -1;

                                return (
                                    <div key={idx} className={`p-6 border rounded-lg ${isCorrect ? "border-[var(--success)]/30 bg-[var(--success)]/5" : "border-[var(--error)]/30 bg-[var(--error)]/5"}`}>
                                        <div className="flex justify-between items-start mb-4">
                                            <span className={`text-xs font-bold px-2 py-1 rounded ${isCorrect ? "bg-[var(--success)] text-black" : "bg-[var(--error)] text-white"}`}>
                                                Q{idx + 1}
                                            </span>
                                            <span className="text-[10px] font-mono text-white/50 uppercase tracking-widest">
                                                {t(`categories.${q.category}`)}
                                            </span>
                                        </div>

                                        <p className="text-white font-mono text-sm md:text-base mb-6 leading-relaxed">
                                            {q.text}
                                        </p>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            <div className="space-y-1">
                                                <span className="text-[10px] text-[var(--text-muted)] tracking-widest">{t('yourAnswer')}</span>
                                                <div className={`p-3 rounded border text-sm font-mono ${isUnanswered
                                                    ? "border-yellow-500/50 text-yellow-500 bg-yellow-500/10"
                                                    : isCorrect
                                                        ? "border-[var(--success)] text-[var(--success)] bg-[var(--success)]/10"
                                                        : "border-[var(--error)] text-[var(--error)] bg-[var(--error)]/10"
                                                    }`}>
                                                    {isUnanswered ? "BOŞ (EMPTY)" : `${String.fromCharCode(65 + userAnswer)}) ${q.options[userAnswer]}`}
                                                </div>
                                            </div>

                                            <div className="space-y-1">
                                                <span className="text-[10px] text-[var(--text-muted)] tracking-widest">{t('correctAnswer')}</span>
                                                <div className="p-3 rounded border border-[var(--success)] text-[var(--success)] bg-[var(--success)]/10 text-sm font-mono">
                                                    {String.fromCharCode(65 + q.correct)}) {q.options[q.correct]}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className={`w-full max-w-2xl border-2 rounded-xl relative overflow-hidden flex flex-col md:flex-row bg-black ${passed ? "border-[var(--success)]" : "border-[var(--error)]"}`}
                >
                    {/* Left: Score & Status */}
                    {/* Left: Score & Status */}
                    <div className={`p-8 md:w-1/2 flex flex-col items-center justify-center text-center relative overflow-hidden ${passed ? "bg-[var(--success)]/10" : "bg-[var(--error)]/10"}`}>
                        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>

                        <h2 className="text-2xl font-black text-white mb-2 tracking-tighter">{t('result')}</h2>
                        <div className="text-8xl font-black mb-4 tracking-tighter" style={{ color: passed ? "var(--success)" : "var(--error)" }}>
                            {score}
                        </div>
                        <div className={`px-4 py-2 rounded font-mono font-bold text-sm mb-8 ${passed ? "bg-[var(--success)] text-black" : "bg-[var(--error)] text-white"}`}>
                            {mode === 'real' ? (
                                passed
                                    ? t('qualified', { class: earnedLicense })
                                    : t('notQualified')
                            ) : (
                                <span>% {score} SUCCESS RATE</span>
                            )}
                        </div>

                        {!showSaveForm ? (
                            <div className="space-y-3 w-full animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300 relative z-10">
                                <button
                                    onClick={() => setReviewMode(true)}
                                    className="w-full py-3 bg-[var(--primary-500)]/10 border border-[var(--primary-500)] text-[var(--primary-500)] font-bold text-xs tracking-widest hover:bg-[var(--primary-500)] hover:text-black transition-all flex items-center justify-center gap-2"
                                >
                                    <CheckCircle size={16} /> {t('review')}
                                </button>
                                <button
                                    onClick={() => setShowSaveForm(true)}
                                    className="w-full py-3 bg-white text-black font-bold text-xs tracking-widest hover:scale-105 transition-transform flex items-center justify-center gap-2 border-2 border-transparent hover:border-black/10"
                                >
                                    <Save size={16} /> {t('save')}
                                </button>
                                <button
                                    onClick={() => handleCloseResult(false)}
                                    className="w-full py-3 bg-transparent border border-white/20 text-white/70 font-bold text-xs tracking-widest hover:bg-white/10 hover:text-white transition-colors"
                                >
                                    {t('skip')}
                                </button>
                            </div>
                        ) : (
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full space-y-3">
                                <input type="text" placeholder="CALLSIGN / NAME" className="w-full bg-white/10 border border-white/20 p-3 text-white text-xs font-mono outline-none focus:border-[var(--primary-500)] focus:bg-black transition-colors" />
                                <button
                                    onClick={() => handleCloseResult(true)}
                                    className="w-full py-3 bg-[var(--primary-500)] text-black font-bold text-xs tracking-widest hover:brightness-110 transition-all shadow-[0_0_15px_var(--primary-500)]"
                                >
                                    CONFIRM & SAVE
                                </button>
                                <button
                                    onClick={() => setShowSaveForm(false)}
                                    className="w-full py-2 text-[var(--text-muted)] hover:text-white text-[10px] tracking-widest underline decoration-dashed underline-offset-4"
                                >
                                    CANCEL
                                </button>
                            </motion.div>
                        )}
                    </div>

                    {/* Right: Detailed Stats */}
                    <div className="p-8 md:w-1/2 bg-[var(--bg-card)] border-l border-white/10 flex flex-col">
                        <h3 className="text-sm font-mono text-[var(--text-muted)] mb-6 flex items-center gap-2">
                            <Award size={16} /> PERFORMANCE_METRICS
                        </h3>

                        <div className="space-y-6 flex-1">
                            {Object.entries(categoryStats).map(([cat, stats]) => (
                                <div key={cat}>
                                    <div className="flex justify-between text-xs font-bold text-white mb-2 uppercase">
                                        <span>{t(`categories.${cat}`)}</span>
                                        <span className={stats.total > 0 && (stats.correct / stats.total) >= 0.7 ? "text-[var(--success)]" : "text-[var(--error)]"}>
                                            {stats.correct}/{stats.total}
                                        </span>
                                    </div>
                                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full ${stats.total > 0 && (stats.correct / stats.total) >= 0.7 ? "bg-[var(--success)]" : "bg-[var(--error)]"}`}
                                            style={{ width: `${stats.total > 0 ? (stats.correct / stats.total) * 100 : 0}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {weakCategories.length > 0 && (
                            <div className="mt-8 pt-6 border-t border-white/10 animate-in fade-in duration-700 delay-500">
                                <div className="text-[10px] text-[var(--warning)] font-mono mb-2 flex items-center gap-2 animate-pulse">
                                    <AlertTriangle size={12} /> RECOMMENDED_TRAINING
                                </div>
                                {weakCategories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => handleRedirect(cat)}
                                        className="w-full text-left p-3 bg-[var(--warning)]/10 border border-[var(--warning)]/30 rounded text-[var(--warning)] text-xs font-bold mb-2 flex justify-between items-center hover:bg-[var(--warning)]/20 hover:scale-[1.02] transition-all cursor-pointer group"
                                    >
                                        <span className="group-hover:translate-x-1 transition-transform">{t('focus', { category: t(`categories.${cat}`) })}</span>
                                        <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        );
    }

    // ... (rest of the component render remains same, just replacing return)
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm">
            <div className="w-full max-w-4xl h-[80vh] border border-[var(--primary-500)] rounded bg-black relative flex flex-col">
                {/* HUD Scanline */}
                <div className="absolute inset-0 bg-scan-line pointer-events-none opacity-5"></div>

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-[var(--primary-500)]/30">
                    <div>
                        <h2 className="text-xl font-bold text-white tracking-widest">{t('title')}</h2>
                        <div className="text-[10px] text-[var(--primary-500)] font-mono flex items-center gap-2">
                            <span>CLASS {examClass || 'Practice'} SIMULATION // Q{currentQ + 1}/{activeQuestions.length}</span>
                            {flags[currentQ] && <span className="text-[var(--warning)] flex items-center gap-1"><AlertTriangle size={10} /> {t('flagged')}</span>}
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-xl font-mono text-[var(--warning)]">
                            <Timer className="w-5 h-5" />
                            {formatTime(timeLeft)}
                        </div>
                        <button onClick={finishExam} className="text-xs border border-[var(--error)] text-[var(--error)] px-3 py-1 hover:bg-[var(--error)] hover:text-white transition-colors">
                            {t('finish')}
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-8 overflow-y-auto">
                    <div className="max-w-2xl mx-auto">
                        <p className="text-lg text-white mb-8 font-mono leading-relaxed flex justify-between items-start gap-4">
                            <span>{activeQuestions[currentQ].id}. {activeQuestions[currentQ].text}</span>
                            <button
                                onClick={toggleFlag}
                                className={`shrink-0 p-2 rounded transition-colors ${flags[currentQ] ? "text-[var(--warning)] bg-[var(--warning)]/10" : "text-white/20 hover:text-white"}`}
                                title={flags[currentQ] ? t('unflag') : t('flag')}
                            >
                                <AlertTriangle size={20} fill={flags[currentQ] ? "currentColor" : "none"} />
                            </button>
                        </p>

                        <div className="space-y-4">
                            {activeQuestions[currentQ].options.map((opt, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleAnswer(idx)}
                                    className={`w-full text-left p-4 border rounded font-mono text-sm transition-all
                           ${answers[currentQ] === idx
                                            ? "border-[var(--primary-500)] bg-[var(--primary-500)]/20 text-white shadow-[0_0_15px_rgba(0,212,255,0.3)]"
                                            : "border-white/10 text-[var(--text-muted)] hover:border-white/30"
                                        }
                        `}
                                >
                                    <span className="mr-4 opacity-50">{String.fromCharCode(65 + idx)})</span>
                                    {opt}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer Nav */}
                <div className="p-6 border-t border-[var(--primary-500)]/30 flex justify-between">
                    <button
                        onClick={() => setCurrentQ(prev => Math.max(0, prev - 1))}
                        disabled={currentQ === 0}
                        className="text-white/50 hover:text-white disabled:opacity-20"
                    >
                        PREV
                    </button>

                    <div className="flex gap-1 overflow-x-auto max-w-[50%] no-scrollbar">
                        {activeQuestions.map((_, idx) => (
                            <div key={idx} className={`w-2 h-2 min-w-[8px] rounded-full relative
                                ${answers[idx] !== -1 ? "bg-[var(--primary-500)]" : "bg-white/20"} 
                                ${currentQ === idx ? "ring-2 ring-white" : ""}
                                ${flags[idx] ? "after:content-[''] after:absolute after:-top-1 after:-right-1 after:w-1.5 after:h-1.5 after:bg-[var(--warning)] after:rounded-full" : ""}
                            `}></div>
                        ))}
                    </div>

                    <button
                        onClick={() => {
                            if (currentQ < activeQuestions.length - 1) setCurrentQ(prev => prev + 1);
                            else finishExam();
                        }}
                        className="text-white/50 hover:text-white"
                    >
                        {currentQ < activeQuestions.length - 1 ? "NEXT" : "FINISH"}
                    </button>
                </div>
            </div>
        </div>
    );
}
