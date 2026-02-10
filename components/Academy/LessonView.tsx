"use client";

import { useTranslations } from "next-intl";
import { X, CheckCircle, BookOpen, Target, List } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { LESSONS } from "./data/lessons";

interface LessonViewProps {
    moduleId: string;
    onClose: () => void;
    onComplete: () => void;
}

export default function LessonView({ moduleId, onClose, onComplete }: LessonViewProps) {
    const t = useTranslations("Academy.dashboard");
    const tCommon = useTranslations("Common");
    const tLesson = useTranslations("Academy.lesson");

    // Fallback if module ID not found
    const content = LESSONS[moduleId] || { title: "Unknown Module", objective: "No content available.", sections: [] };

    const [currentSection, setCurrentSection] = useState(0);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
            <div className="bg-[var(--bg-void)] border border-[var(--primary-500)] w-full max-w-4xl h-[85vh] rounded-xl relative overflow-hidden flex flex-col shadow-[0_0_50px_rgba(0,212,255,0.15)]">

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-[var(--primary-500)]/30 bg-black/40">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-[var(--primary-500)]/10 rounded-lg text-[var(--primary-500)]">
                            <BookOpen size={24} />
                        </div>
                        <div>
                            <h2 className="text-xl font-black text-white tracking-widest uppercase">{content.title}</h2>
                            <div className="text-[10px] text-[var(--primary-500)] font-mono tracking-[0.3em] flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-[var(--primary-500)] animate-pulse"></span>
                                TRAINING_MODULE // {moduleId.toUpperCase()}
                            </div>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-white/50 hover:text-white hover:rotate-90 transition-all duration-300">
                        <X className="w-8 h-8" />
                    </button>
                </div>

                {/* Progression Bar */}
                <div className="h-1 bg-white/10 w-full">
                    <motion.div
                        className="h-full bg-[var(--primary-500)]"
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentSection + 1) / content.sections.length) * 100}%` }}
                    />
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    <div className="max-w-3xl mx-auto p-8 space-y-8">

                        {/* Objective Card */}
                        <div className="p-6 border-l-4 border-[var(--secondary-500)] bg-[var(--secondary-500)]/5 rounded-r-lg">
                            <div className="flex items-center gap-2 text-[var(--secondary-500)] font-bold mb-2 text-xs tracking-widest">
                                <Target size={16} /> {tLesson('objective')}
                            </div>
                            <p className="text-white/90 font-mono text-sm leading-relaxed">
                                {content.objective}
                            </p>
                        </div>

                        {/* Rendering all sections for better readability instead of one by one */}
                        <div className="space-y-12">
                            {content.sections.map((section, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="relative pl-8 border-l border-white/10"
                                >
                                    <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-[var(--primary-500)] ring-4 ring-black"></div>
                                    <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                                        <span className="text-[var(--primary-500)] opacity-50">0{idx + 1}.</span> {section.title}
                                    </h3>
                                    <p className="text-[var(--text-secondary)] font-mono text-sm leading-relaxed whitespace-pre-line">
                                        {section.content}
                                    </p>
                                </motion.div>
                            ))}
                        </div>

                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-[var(--primary-500)]/30 bg-black/40 flex justify-between items-center">
                    <div className="text-xs text-[var(--text-muted)] font-mono">
                        {content.sections.length} SECTIONS COMPLETED
                    </div>
                    <button
                        onClick={onComplete}
                        className="bg-[var(--primary-500)] text-black px-8 py-3 font-bold tracking-widest hover:shadow-[0_0_20px_var(--primary-500)] transition-all flex items-center gap-2 group text-sm rounded-sm"
                    >
                        <CheckCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        {t('complete')}
                    </button>
                </div>

                {/* Scanlines */}
                <div className="absolute inset-0 bg-scan-line pointer-events-none opacity-5"></div>
            </div>
        </motion.div>
    );
}
