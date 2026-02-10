"use client";

import { motion } from "framer-motion";
import { Lock, Unlock, PlayCircle } from "lucide-react";
import { useTranslations } from "next-intl";

interface CourseCardProps {
    id: string;
    type: "regulations" | "technical" | "operating";
    isLocked: boolean;
    progress: number;
    onStart: () => void;
}

export default function CourseCard({ id, type, isLocked, progress, onStart }: CourseCardProps) {
    const t = useTranslations("Academy");

    const getIcon = () => {
        // Return custom icon based on type if needed, or generic
        return isLocked ? <Lock className="w-8 h-8 opacity-50" /> : <Unlock className="w-8 h-8 text-[var(--primary-500)]" />;
    };

    const borderColor = isLocked ? "var(--border-subtle)" : "var(--primary-500)";
    const bg = isLocked ? "bg-black/40" : "bg-[var(--primary-500)]/5";

    return (
        <motion.div
            id={id}
            whileHover={!isLocked ? { scale: 1.02, backgroundColor: "rgba(0, 212, 255, 0.1)" } : {}}
            className={`relative p-6 border rounded overflow-hidden group transition-colors ${bg}`}
            style={{ borderColor: borderColor, opacity: isLocked ? 0.7 : 1 }}
        >
            {/* HUD Corners */}
            <div className="absolute top-0 right-0 p-2">
                {getIcon()}
            </div>

            <div className="mt-8">
                <h3 className="text-2xl font-bold text-white tracking-widest mb-1">
                    {t(`modules.${type}.title`)}
                </h3>
                <p className="text-xs font-mono text-[var(--text-muted)] mb-4">
                    {t(`modules.${type}.desc`)}
                </p>

                {/* Progress Bar */}
                {!isLocked && (
                    <div className="mb-4">
                        <div className="flex justify-between text-[10px] font-mono text-[var(--primary-500)] mb-1">
                            <span>{t('status.progress')}</span>
                            <span>{progress}%</span>
                        </div>
                        <div className="w-full h-1 bg-white/10 rounded overflow-hidden">
                            <div
                                className="h-full bg-[var(--primary-500)] shadow-[0_0_10px_var(--primary-500)]"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                    </div>
                )}

                <button
                    disabled={isLocked}
                    onClick={onStart}
                    className={`w-full py-2 border font-mono text-xs tracking-[0.2em] transition-all flex items-center justify-center gap-2
             ${isLocked
                            ? "border-white/10 text-white/30 cursor-not-allowed"
                            : "border-[var(--primary-500)] text-[var(--primary-500)] hover:bg-[var(--primary-500)] hover:text-black shadow-[0_0_15px_rgba(0,212,255,0.2)]"
                        }`}
                >
                    {isLocked ? t('status.locked') : <>{t('status.start')} <PlayCircle className="w-3 h-3" /></>}
                </button>
            </div>

            {/* Decorative Scanlines */}
            <div className="absolute inset-0 bg-scan-line pointer-events-none opacity-5"></div>
        </motion.div>
    );
}
