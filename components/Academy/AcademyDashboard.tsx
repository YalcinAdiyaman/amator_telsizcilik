"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import CourseCard from "./CourseCard";
import QuizPreview from "./QuizPreview";
import LessonView from "./LessonView";
import ExamSimulator from "./ExamSimulator";
import { AnimatePresence, motion } from "framer-motion";
import { Play, Clock, Zap, Target } from "lucide-react";

export default function AcademyDashboard() {
    const t = useTranslations("Academy");
    const tDash = useTranslations("Academy.dashboard");

    // State
    const [xp, setXp] = useState(0);
    const [activeModule, setActiveModule] = useState<string | null>(null);
    const [completedModules, setCompletedModules] = useState<string[]>([]);
    const [showExam, setShowExam] = useState(false);
    const [examMode, setExamMode] = useState<'quick' | 'real'>('quick');
    const [showModeSelect, setShowModeSelect] = useState(false);

    // Load state from localStorage on mount
    useEffect(() => {
        const storedXp = localStorage.getItem("academy_xp");
        const storedModules = localStorage.getItem("academy_modules");

        if (storedXp) setXp(parseInt(storedXp));
        if (storedModules) setCompletedModules(JSON.parse(storedModules));
    }, []);

    // Unlock thresholds
    const isTechnicalUnlocked = xp >= 100;
    const isOperatingUnlocked = xp >= 300;

    const handleStartModule = (id: string) => {
        setActiveModule(id);
    };

    const handleCompleteLesson = () => {
        if (activeModule) {
            const reward = 50;
            const newXp = xp + reward;

            setXp(newXp);
            localStorage.setItem("academy_xp", newXp.toString());

            if (!completedModules.includes(activeModule)) {
                const newModules = [...completedModules, activeModule];
                setCompletedModules(newModules);
                localStorage.setItem("academy_modules", JSON.stringify(newModules));
            }

            setActiveModule(null);
        }
    };

    const handleStartExamRequest = () => {
        setShowModeSelect(true);
    };

    const launchExam = (mode: 'quick' | 'real') => {
        setExamMode(mode);
        setShowModeSelect(false);
        setShowExam(true);
    };

    const handleExamComplete = (score: number) => {
        if (score >= 70) {
            const reward = examMode === 'real' ? 500 : 100; // Bigger reward for real exam
            const newXp = xp + reward;
            setXp(newXp);
            localStorage.setItem("academy_xp", newXp.toString());
        }
    };

    const handleQuizComplete = (success: boolean) => {
        if (success) {
            const reward = 20;
            const newXp = xp + reward;
            setXp(newXp);
            localStorage.setItem("academy_xp", newXp.toString());
        }
    };

    const calculateProgress = (id: string) => {
        return completedModules.includes(id) ? 100 : 0;
    };

    return (
        <>
            <header className="mb-8 border-b border-[var(--primary-500)]/30 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-[var(--text-secondary)] tracking-tighter mb-2">
                        {t('title')}
                    </h1>
                    <p className="text-sm font-mono text-[var(--primary-500)] tracking-[0.2em]">
                        {t('subtitle')} // CLASS_A_PREP
                    </p>
                </div>

                <div className="flex gap-4 items-center">
                    <div className="text-right">
                        <div className="text-[10px] text-[var(--text-muted)] font-mono tracking-widest">{tDash('level')}</div>
                        <div className="text-2xl font-bold text-white">
                            {xp < 100 ? "NOVICE" : xp < 300 ? "OPERATOR" : "ELITE"}
                        </div>
                    </div>
                    <div className="w-[1px] bg-white/20 h-10"></div>
                    <div className="text-right">
                        <div className="text-[10px] text-[var(--text-muted)] font-mono tracking-widest">{tDash('xp')}</div>
                        <div className="text-2xl font-bold text-[var(--primary-500)]">{xp}/1000</div>
                    </div>
                </div>
            </header>

            {/* Exam Hub & Daily Challenge Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                {/* Exam Launch Control */}
                <div className="lg:col-span-2 relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary-500)]/20 to-purple-500/20 blur-xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative h-full bg-black/80 border border-[var(--primary-500)]/50 rounded-lg p-8 flex flex-col justify-center items-start overflow-hidden backdrop-blur-sm">

                        {!showModeSelect ? (
                            <>
                                <div className="z-10 bg-[var(--primary-500)] text-black text-[10px] font-bold px-2 py-1 mb-4 flex items-center gap-2 uppercase tracking-widest">
                                    <Target size={12} /> Exam_Simulation_Module_v2.0
                                </div>
                                <h2 className="text-3xl md:text-4xl font-black text-white mb-2 tracking-tighter">
                                    SINAV SİMÜLATÖRÜ
                                </h2>
                                <p className="text-[var(--text-muted)] mb-8 max-w-md font-mono text-sm leading-relaxed">
                                    Gerçek sınav koşullarında bilginizi test edin. Soru bankasından rastgele seçilen güncel sorularla kendinizi deneyin.
                                </p>
                                <button
                                    onClick={handleStartExamRequest}
                                    className="group relative px-8 py-4 bg-[var(--primary-500)] text-black font-black text-lg tracking-widest uppercase hover:scale-105 transition-transform flex items-center gap-4"
                                >
                                    <Play fill="currentColor" />
                                    SINAVI BAŞLAT
                                </button>
                            </>
                        ) : (
                            <div className="w-full z-10 animate-in fade-in slide-in-from-bottom-4 duration-300">
                                <h3 className="text-xl font-bold text-white mb-6 tracking-widest flex items-center gap-3">
                                    <span className="w-2 h-8 bg-[var(--primary-500)] block"></span>
                                    MOD SEÇİMİ
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <button
                                        onClick={() => launchExam('quick')}
                                        className="text-left p-6 border border-white/20 hover:border-[var(--primary-500)] hover:bg-[var(--primary-500)]/10 transition-all group/btn"
                                    >
                                        <div className="flex items-center gap-3 mb-2 text-[var(--primary-500)] group-hover/btn:text-white">
                                            <Zap size={24} />
                                            <span className="font-bold tracking-widest text-lg">HIZLI MOD</span>
                                        </div>
                                        <div className="text-sm text-[var(--text-muted)] font-mono mb-4">
                                            10 Soru / 5 Dakika
                                        </div>
                                        <p className="text-xs text-white/50">Kısa süreli pratik yapmak için ideal.</p>
                                    </button>

                                    <button
                                        onClick={() => launchExam('real')}
                                        className="text-left p-6 border border-white/20 hover:border-[var(--secondary-500)] hover:bg-[var(--secondary-500)]/10 transition-all group/btn"
                                    >
                                        <div className="flex items-center gap-3 mb-2 text-[var(--secondary-500)] group-hover/btn:text-white">
                                            <Clock size={24} />
                                            <span className="font-bold tracking-widest text-lg">GERÇEK ZAMANLI</span>
                                        </div>
                                        <div className="text-sm text-[var(--text-muted)] font-mono mb-4">
                                            50 Soru / 60 Dakika
                                        </div>
                                        <p className="text-xs text-white/50">Tam sınav deneyimi ve sertifikasyon simülasyonu.</p>
                                    </button>
                                </div>
                                <button
                                    onClick={() => setShowModeSelect(false)}
                                    className="mt-6 text-xs text-[var(--text-muted)] hover:text-white underline decoration-dashed underline-offset-4"
                                >
                                    &lt; GERİ DÖN
                                </button>
                            </div>
                        )}

                        {/* Decoration */}
                        <div className="absolute right-0 top-0 w-64 h-64 border border-white/5 rounded-full -mr-32 -mt-32 pointer-events-none"></div>
                        <div className="absolute right-0 bottom-0 text-[100px] font-black text-white/5 leading-none -mb-8 -mr-4 pointer-events-none select-none">EXAM</div>
                    </div>
                </div>

                {/* Daily Challenge (Now integrated into the top area) */}
                <div className="lg:col-span-1 h-full">
                    <div className="h-full flex flex-col">
                        <div className="flex-1">
                            <QuizPreview onComplete={handleQuizComplete} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Modules Grid */}
            <div className="space-y-6">
                <h2 className="text-sm font-mono text-[var(--text-muted)] tracking-widest border-l-2 border-[var(--primary-500)] pl-3 mb-6">
                    {tDash('mandatory')}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <CourseCard
                        type="regulations"
                        id="regulations"
                        isLocked={false}
                        progress={calculateProgress("regulations")}
                        onStart={() => handleStartModule("regulations")}
                    />
                    <CourseCard
                        type="technical"
                        id="technical"
                        isLocked={!isTechnicalUnlocked}
                        progress={calculateProgress("technical")}
                        onStart={() => handleStartModule("technical")}
                    />
                    <CourseCard
                        type="operating"
                        id="operating"
                        isLocked={!isOperatingUnlocked}
                        progress={calculateProgress("operating")}
                        onStart={() => handleStartModule("operating")}
                    />
                </div>
            </div>

            <AnimatePresence>
                {activeModule && (
                    <LessonView
                        moduleId={activeModule}
                        onClose={() => setActiveModule(null)}
                        onComplete={handleCompleteLesson}
                    />
                )}

                {showExam && (
                    <ExamSimulator
                        mode={examMode}
                        onClose={() => setShowExam(false)}
                        onComplete={handleExamComplete}
                        onRedirect={(moduleId) => {
                            // Scroll to the module card
                            const el = document.getElementById(moduleId);
                            if (el) {
                                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                // Highlight
                                el.classList.add('ring-2', 'ring-[var(--warning)]');
                                setTimeout(() => el.classList.remove('ring-2', 'ring-[var(--warning)]'), 2000);
                            }

                            // Auto-open if unlocked
                            const isTechnical = moduleId === 'technical';
                            const isOperating = moduleId === 'operating';

                            if (moduleId === 'regulations') {
                                setTimeout(() => setActiveModule('regulations'), 800);
                            } else if (isTechnical && isTechnicalUnlocked) {
                                setTimeout(() => setActiveModule('technical'), 800);
                            } else if (isOperating && isOperatingUnlocked) {
                                setTimeout(() => setActiveModule('operating'), 800);
                            }
                        }}
                    />
                )}
            </AnimatePresence>
        </>
    );
}
