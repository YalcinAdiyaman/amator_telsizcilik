"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Activity, AlertTriangle, CheckCircle, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

export default function SWRCalculator() {
    const t = useTranslations("Atolye.tools.swr");
    const [swr, setSwr] = useState<string>("");
    const [returnLoss, setReturnLoss] = useState<number | null>(null);
    const [reflectionCoeff, setReflectionCoeff] = useState<number | null>(null);
    const [reflectedPower, setReflectedPower] = useState<number | null>(null);
    const [matchQuality, setMatchQuality] = useState<string>("");

    const calculateRL = (val: string) => {
        setSwr(val);
        const s = parseFloat(val);
        if (!isNaN(s) && s >= 1) {

            // Reflection Coefficient (Gamma) = (SWR - 1) / (SWR + 1)
            const gamma = (s - 1) / (s + 1);
            setReflectionCoeff(gamma);

            // Reflected Power Percentage = Gamma^2 * 100
            const refPower = Math.pow(gamma, 2) * 100;
            setReflectedPower(refPower);

            if (s === 1) {
                setReturnLoss(100);
                setMatchQuality("PERFECT");
                return;
            }

            // Return Loss = -20 * log10(Gamma)
            const rl = -20 * Math.log10(gamma);
            setReturnLoss(parseFloat(rl.toFixed(2)));

            if (s < 1.5) setMatchQuality("EXCELLENT");
            else if (s <= 2.0) setMatchQuality("GOOD");
            else if (s <= 3.0) setMatchQuality("POOR");
            else setMatchQuality("DANGER");
        } else {
            setReturnLoss(null);
            setReflectionCoeff(null);
            setReflectedPower(null);
            setMatchQuality("");
        }
    };

    const getMatchColor = () => {
        if (matchQuality === "PERFECT" || matchQuality === "EXCELLENT") return "var(--success)";
        if (matchQuality === "GOOD") return "var(--primary-500)";
        if (matchQuality === "POOR") return "var(--warning)";
        return "var(--error)";
    };

    const getMatchIcon = () => {
        if (matchQuality === "DANGER" || matchQuality === "POOR") return <AlertTriangle size={18} />;
        return <CheckCircle size={18} />;
    };

    return (
        <div className="bg-black/40 backdrop-blur-md border border-[var(--primary-500)]/30 rounded-xl p-6 hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.2)] transition-all group h-full flex flex-col">

            {/* Header */}
            <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
                <div className="p-3 bg-[var(--secondary-500)]/10 rounded-lg text-[var(--secondary-500)]">
                    <Activity size={24} />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-[var(--secondary-500)] transition-colors">
                        {t('title')}
                    </h3>
                    <p className="text-xs text-[var(--text-muted)] font-mono">
                        STANDING WAVE RATIO ANALYZER
                    </p>
                </div>
            </div>

            <div className="flex-1 space-y-6">

                {/* Input */}
                <div>
                    <label className="text-xs font-mono text-[var(--text-secondary)] mb-1 block uppercase">{t('swrLabel')}</label>
                    <div className="relative">
                        <input
                            type="number"
                            step="0.01"
                            min="1"
                            value={swr}
                            onChange={(e) => calculateRL(e.target.value)}
                            placeholder="1.0 - 3.0"
                            className="w-full bg-white/5 border border-white/10 rounded p-3 text-white outline-none focus:border-[var(--secondary-500)] text-lg font-mono placeholder:text-white/20 transition-all"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] text-sm">: 1</div>
                    </div>
                </div>

                {/* Visual Gauge Bar */}
                <div className="relative h-6 bg-white/10 rounded-full overflow-hidden">
                    <div className="absolute inset-0 flex">
                        <div className="w-1/4 h-full bg-[var(--success)] opacity-30"></div>
                        <div className="w-1/4 h-full bg-[var(--primary-500)] opacity-30"></div>
                        <div className="w-1/4 h-full bg-[var(--warning)] opacity-30"></div>
                        <div className="w-1/4 h-full bg-[var(--error)] opacity-30"></div>
                    </div>
                    {/* Marker */}
                    {swr && (
                        <motion.div
                            initial={{ left: "0%" }}
                            animate={{ left: `${Math.min(((parseFloat(swr) - 1) / 3) * 100, 95)}%` }}
                            className="absolute top-0 w-1 h-full bg-white shadow-[0_0_10px_white] z-10"
                        />
                    )}
                </div>
                <div className="flex justify-between text-[10px] text-[var(--text-muted)] font-mono">
                    <span>1.0</span>
                    <span>1.5</span>
                    <span>2.0</span>
                    <span>3.0+</span>
                </div>


                {/* Results Grid */}
                {returnLoss !== null && (
                    <div className="bg-[var(--bg-card)] rounded-lg p-4 border border-white/5 space-y-3 relative overflow-hidden">
                        <div className={`absolute top-0 right-0 p-1 px-2 text-[10px] font-bold text-black rounded-bl shadow-lg`} style={{ backgroundColor: getMatchColor() }}>
                            {matchQuality}
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-sm text-[var(--text-muted)]">{t('returnLoss')}</span>
                            <span className="text-xl font-bold text-white">
                                {returnLoss} <span className="text-xs text-[var(--text-muted)]">dB</span>
                            </span>
                        </div>

                        <div className="w-full h-[1px] bg-white/10"></div>

                        <div className="flex justify-between items-center">
                            <span className="text-sm text-[var(--text-muted)]">Geri Dönen Güç</span>
                            <span className="text-xl font-bold" style={{ color: getMatchColor() }}>
                                %{reflectedPower?.toFixed(1)}
                            </span>
                        </div>
                    </div>
                )}


            </div>

            <div className="mt-4 text-[10px] text-[var(--text-muted)] font-mono text-center opacity-60">
                {t('formula')}
            </div>

        </div>
    );
}
