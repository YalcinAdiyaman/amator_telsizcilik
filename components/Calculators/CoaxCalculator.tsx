"use client";

import { useState } from "react";
import { Cable, ArrowRight, Activity, Percent } from "lucide-react";
import { useTranslations } from "next-intl";

const CABLE_TYPES = [
    { name: "RG-58", k1: 0.4, k2: 0.001 }, // Approximate loss constants
    { name: "RG-8X", k1: 0.2, k2: 0.0008 },
    { name: "RG-213", k1: 0.18, k2: 0.0005 },
    { name: "H-100/RG-214", k1: 0.16, k2: 0.0004 },
    { name: "LMR-400", k1: 0.12, k2: 0.0003 },
    { name: "H-1000", k1: 0.11, k2: 0.00025 },
    { name: "Aircom Plus", k1: 0.09, k2: 0.0002 },
    { name: "1/2\" Heliax", k1: 0.05, k2: 0.0001 },
];

export default function CoaxCalculator() {
    const t = useTranslations("Atolye");
    const [freq, setFreq] = useState(145); // MHz
    const [length, setLength] = useState(20); // Meters
    const [power, setPower] = useState(50); // Watts
    const [cableIndex, setCableIndex] = useState(2); // RG-213 Default

    // Logic: Calculate loss in dB per 100m first, then adjust for length
    // Simple formula approximation: Loss(dB/100m) ≈ k1 * sqrt(F) + k2 * F
    // Values are not exact but sufficient for amateur estimation
    const selectedCable = CABLE_TYPES[cableIndex];

    // Calculate dB loss for total length
    // Loss factor for 100m at given freq
    const lossPer100m = (selectedCable.k1 * Math.sqrt(freq)) + (selectedCable.k2 * freq);
    const totalLossDb = (lossPer100m * length) / 100;

    // Calculate efficiency
    // Efficiency = 10 ^ (-loss / 10)
    const efficiency = Math.pow(10, -(totalLossDb / 10));
    const powerOut = power * efficiency;

    return (
        <div className="bg-black/40 backdrop-blur-md border border-[var(--primary-500)]/30 rounded-xl p-6 hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.2)] transition-all group">

            {/* Header */}
            <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
                <div className="p-3 bg-[var(--primary-500)]/10 rounded-lg text-[var(--primary-500)]">
                    <Cable size={24} />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-[var(--primary-500)] transition-colors">
                        {t('tools.coax.title')}
                    </h3>
                    <p className="text-xs text-[var(--text-muted)] font-mono">
                        {t('tools.coax.label')}
                    </p>
                </div>
            </div>

            {/* Inputs */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="col-span-2">
                    <label className="text-xs font-mono text-[var(--text-secondary)] mb-1 block">{t('tools.coax.cableType')}</label>
                    <select
                        value={cableIndex}
                        onChange={(e) => setCableIndex(Number(e.target.value))}
                        className="w-full bg-white/5 border border-white/10 rounded p-2 text-white outline-none focus:border-[var(--primary-500)]"
                    >
                        {CABLE_TYPES.map((c, i) => (
                            <option key={i} value={i} className="bg-black text-white">{c.name}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="text-xs font-mono text-[var(--text-secondary)] mb-1 block">{t('tools.coax.frequency')}</label>
                    <input
                        type="number"
                        value={freq}
                        onChange={(e) => setFreq(Number(e.target.value))}
                        className="w-full bg-white/5 border border-white/10 rounded p-2 text-white outline-none focus:border-[var(--primary-500)]"
                    />
                </div>

                <div>
                    <label className="text-xs font-mono text-[var(--text-secondary)] mb-1 block">{t('tools.coax.length')}</label>
                    <input
                        type="number"
                        value={length}
                        onChange={(e) => setLength(Number(e.target.value))}
                        className="w-full bg-white/5 border border-white/10 rounded p-2 text-white outline-none focus:border-[var(--primary-500)]"
                    />
                </div>

                <div>
                    <label className="text-xs font-mono text-[var(--text-secondary)] mb-1 block">{t('tools.coax.power')}</label>
                    <input
                        type="number"
                        value={power}
                        onChange={(e) => setPower(Number(e.target.value))}
                        className="w-full bg-white/5 border border-white/10 rounded p-2 text-white outline-none focus:border-[var(--primary-500)]"
                    />
                </div>
            </div>

            {/* Results */}
            <div className="bg-[var(--bg-card)] rounded-lg p-4 border border-white/5 space-y-3">

                <div className="flex justify-between items-center">
                    <span className="text-sm text-[var(--text-muted)]">{t('tools.coax.loss')}</span>
                    <span className="text-xl font-bold text-[var(--warning)]">
                        -{totalLossDb.toFixed(2)} dB
                    </span>
                </div>

                <div className="w-full h-[1px] bg-white/10"></div>

                <div className="flex justify-between items-center">
                    <span className="text-sm text-[var(--text-muted)]">{t('tools.coax.efficiency')}</span>
                    <div className="flex items-center gap-1 text-[var(--success)]">
                        <Percent size={14} />
                        <span className="text-xl font-bold">{(efficiency * 100).toFixed(1)}%</span>
                    </div>
                </div>

                <div className="w-full h-[1px] bg-white/10"></div>

                <div className="flex justify-between items-center">
                    <span className="text-sm text-[var(--text-muted)]">{t('tools.coax.outputPower')}</span>
                    <div className="flex items-center gap-2 text-white">
                        <span className="text-xs text-[var(--text-muted)] line-through">{power}W</span>
                        <ArrowRight size={14} className="text-[var(--primary-500)]" />
                        <span className="text-xl font-bold text-[var(--primary-500)]">{powerOut.toFixed(1)} W</span>
                    </div>
                </div>

            </div>

            {/* Footer Info */}
            <div className="mt-4 text-[10px] text-[var(--text-muted)] font-mono text-center opacity-60">
                *Değerler yaklaşık teorik kayıplardır. Konnektör kayıpları dahil değildir.
            </div>

        </div>
    );
}
