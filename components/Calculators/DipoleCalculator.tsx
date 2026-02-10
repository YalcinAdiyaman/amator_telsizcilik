"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Wifi, ArrowRight, Activity, Info } from "lucide-react";
import { useTranslations } from "next-intl";

export default function DipoleCalculator() {
    const t = useTranslations("Atolye.tools.dipole");
    const [frequency, setFrequency] = useState<string>("");
    const [length, setLength] = useState<number | null>(null);

    const calculateLength = (val: string) => {
        setFrequency(val);
        const f = parseFloat(val);
        if (!isNaN(f) && f > 0) {
            // Formula: L (meters) = 142.5 / f (MHz)
            const l = 142.5 / f;
            setLength(parseFloat(l.toFixed(3)));
        } else {
            setLength(null);
        }
    };

    const legLength = length ? (length / 2).toFixed(3) : "0.00";

    return (
        <div className="bg-black/40 backdrop-blur-md border border-[var(--primary-500)]/30 rounded-xl p-6 hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.2)] transition-all group h-full flex flex-col">

            {/* Header */}
            <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
                <div className="p-3 bg-[var(--primary-500)]/10 rounded-lg text-[var(--primary-500)]">
                    <Wifi size={24} />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-[var(--primary-500)] transition-colors">
                        {t('title')}
                    </h3>
                    <p className="text-xs text-[var(--text-muted)] font-mono">
                        HALF-WAVE DIPOLE ANTENNA
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 space-y-6">

                {/* Input */}
                <div>
                    <label className="text-xs font-mono text-[var(--text-secondary)] mb-1 block uppercase">{t('freqLabel')}</label>
                    <div className="relative">
                        <input
                            type="number"
                            value={frequency}
                            onChange={(e) => calculateLength(e.target.value)}
                            placeholder="145.000"
                            className="w-full bg-white/5 border border-white/10 rounded p-3 text-white outline-none focus:border-[var(--primary-500)] text-lg font-mono placeholder:text-white/20 transition-all"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] text-sm">MHz</div>
                    </div>
                </div>

                {/* Visualization (SVG) */}
                <div className="relative h-24 border border-white/10 rounded bg-white/5 flex items-center justify-center overflow-hidden">
                    <svg className="w-full h-full p-4" viewBox="0 0 200 80">
                        {/* Antenna Elements */}
                        <line x1="20" y1="40" x2="95" y2="40" stroke="var(--primary-500)" strokeWidth="3" strokeLinecap="round" />
                        <line x1="105" y1="40" x2="180" y2="40" stroke="var(--primary-500)" strokeWidth="3" strokeLinecap="round" />

                        {/* Center Insulator */}
                        <circle cx="100" cy="40" r="3" fill="white" />
                        <line x1="100" y1="40" x2="100" y2="80" stroke="#666" strokeWidth="1" strokeDasharray="3,3" />

                        {/* Dimensions */}
                        {length ? (
                            <>
                                <text x="60" y="30" fontSize="8" fill="var(--text-muted)" textAnchor="middle">{legLength}m</text>
                                <text x="140" y="30" fontSize="8" fill="var(--text-muted)" textAnchor="middle">{legLength}m</text>
                                <text x="100" y="70" fontSize="10" fill="white" textAnchor="middle" fontWeight="bold">TOPLAM: {length}m</text>
                            </>
                        ) : (
                            <text x="100" y="60" fontSize="8" fill="#444" textAnchor="middle">{t('invalidInput')}</text>
                        )}
                    </svg>
                </div>

                {/* Results Card */}
                <div className="bg-[var(--bg-card)] rounded-lg p-4 border border-white/5 space-y-3">
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-[var(--text-muted)]">{t('totalLength')}</span>
                        <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold text-white tracking-tighter">
                                {length || "0.000"}
                            </span>
                            <span className="text-xs text-[var(--text-muted)]">METRE</span>
                        </div>
                    </div>

                    <div className="w-full h-[1px] bg-white/10"></div>

                    <div className="flex justify-between items-center">
                        <span className="text-sm text-[var(--text-muted)]">{t('legLength')}</span>
                        <span className="text-xl font-mono text-[var(--primary-500)]">
                            {legLength} m
                        </span>
                    </div>
                </div>

            </div>

            <div className="mt-4 text-[10px] text-[var(--text-muted)] font-mono text-center opacity-60">
                {t('formula')} (L = 142.5 / f)
            </div>
        </div>
    );
}
