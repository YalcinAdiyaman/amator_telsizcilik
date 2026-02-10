"use client";

import { useState } from "react";
import { ShieldAlert, Ruler, Info } from "lucide-react";

export default function RFSafetyCalculator() {
    const [power, setPower] = useState(50); // Watts (Average)
    const [gain, setGain] = useState(2.15); // dBi (Dipole default)
    const [freq, setFreq] = useState(145); // MHz

    // Simplified FCC OET-65 Calculation for Controlled Environment
    // S = P * G / (4 * pi * R^2)
    // Exposure Limit (mW/cm^2) varies by frequency.
    // VHF/UHF (30-300 MHz): Limit is 1.0 mW/cm^2 (Controlled) / 0.2 mW/cm^2 (Uncontrolled/Public)

    // We will calculate for UNCONTROLLED (Public) as it is safer/conservative.

    const calculateLimit = (f: number) => {
        // MPE Limits (mW/cm^2) for General Population (Uncontrolled)
        if (f >= 1.34 && f < 30) return 180 / (f * f);
        if (f >= 30 && f < 300) return 0.2;
        if (f >= 300 && f < 1500) return f / 1500;
        if (f >= 1500 && f < 100000) return 1.0;
        return 0.2; // Default conservative
    };

    const limit = calculateLimit(freq); // mW/cm^2

    // Effective Radiated Power (ERP) in Watts? No, EIRP needed.
    // Gain is dBi. 
    // EIRP (Watts) = Power * 10^(Gain/10)
    const eirp = power * Math.pow(10, gain / 10);

    // Rearranging S = P*G / (4*pi*R^2) -> R = sqrt( (P*G) / (4*pi*S) )
    // Units: Power in Watts, R in cm? No, convert all.
    // Formula for R(cm) = sqrt( (EIRP_mW) / (4 * pi * Limit) )

    const eirp_mW = eirp * 1000;
    const r_cm = Math.sqrt(eirp_mW / (4 * Math.PI * limit));
    const r_m = r_cm / 100;

    return (
        <div className="bg-black/40 backdrop-blur-md border border-[var(--error)]/30 rounded-xl p-6 hover:shadow-[0_0_20px_rgba(255,0,0,0.15)] transition-all group">

            {/* Header */}
            <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
                <div className="p-3 bg-[var(--error)]/10 rounded-lg text-[var(--error)]">
                    <ShieldAlert size={24} />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-[var(--error)] transition-colors">
                        RF Güvenlik Mesafesi
                    </h3>
                    <p className="text-xs text-[var(--text-muted)] font-mono">
                        RF SAFETY DISTANCE (PUBLIC)
                    </p>
                </div>
            </div>

            {/* Inputs */}
            <div className="space-y-4 mb-6">
                <div>
                    <label className="text-xs font-mono text-[var(--text-secondary)] mb-1 block">ÇIKIŞ GÜCÜ (Ortalama Watt)</label>
                    <input
                        type="number"
                        value={power}
                        onChange={(e) => setPower(Number(e.target.value))}
                        className="w-full bg-white/5 border border-white/10 rounded p-2 text-white outline-none focus:border-[var(--error)]"
                    />
                    <div className="text-[10px] text-[var(--text-muted)] mt-1 opacity-60">*SSB için PEP'in %20-40'ı, FM için %100'ü.</div>
                </div>

                <div>
                    <label className="text-xs font-mono text-[var(--text-secondary)] mb-1 block">ANTEN KAZANCI (dBi)</label>
                    <input
                        type="number"
                        value={gain}
                        onChange={(e) => setGain(Number(e.target.value))}
                        className="w-full bg-white/5 border border-white/10 rounded p-2 text-white outline-none focus:border-[var(--error)]"
                    />
                </div>

                <div>
                    <label className="text-xs font-mono text-[var(--text-secondary)] mb-1 block">FREKANS (MHz)</label>
                    <input
                        type="number"
                        value={freq}
                        onChange={(e) => setFreq(Number(e.target.value))}
                        className="w-full bg-white/5 border border-white/10 rounded p-2 text-white outline-none focus:border-[var(--error)]"
                    />
                </div>
            </div>

            {/* Results */}
            <div className="bg-[var(--bg-card)] rounded-lg p-5 border border-[var(--error)]/20 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[var(--error)]/5 animate-pulse-slow pointer-events-none"></div>

                <span className="text-sm text-[var(--text-muted)] block mb-2 uppercase tracking-tight">Minimum Güvenli Mesafe</span>

                <div className="flex justify-center items-baseline gap-2 text-white">
                    <span className="text-4xl font-black text-white">{r_m.toFixed(2)}</span>
                    <span className="text-sm font-mono text-[var(--text-muted)]">METRE</span>
                </div>

                <div className="mt-2 text-xs text-[var(--error)] font-bold border-t border-[var(--error)]/20 pt-2 inline-flex items-center gap-1">
                    <ShieldAlert size={12} />
                    GENEL HALK İÇİN (UNCONTROLLED)
                </div>
            </div>

            {/* Footer Info */}
            <div className="mt-4 text-[10px] text-[var(--text-muted)] font-mono flex items-start gap-2 opacity-60">
                <Info size={14} className="min-w-[14px]" />
                FCC OET-65 standartlarına göre "Genel Nüfus" (Public) maruziyeti için hesaplanmıştır. Yasal uygunluk için detaylı ölçüm gerekebilir.
            </div>

        </div>
    );
}
