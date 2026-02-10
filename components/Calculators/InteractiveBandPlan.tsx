"use client";

import { useState } from "react";
import { Radio, Mic, Keyboard, Activity, Info } from "lucide-react";

// Simplified Band Plan Data for TR (Generic IARU Region 1 Adaptation)
const BANDS = [
    {
        name: "2 Metre (VHF)",
        range: "144.000 - 146.000 MHz",
        segments: [
            { start: 144.000, end: 144.150, mode: "CW / EME", color: "bg-blue-500" },
            { start: 144.150, end: 144.400, mode: "SSB / Dig", color: "bg-green-500" },
            { start: 144.500, end: 144.800, mode: "Digital / APRS (144.800)", color: "bg-purple-500" },
            { start: 145.200, end: 145.575, mode: "FM Simplex", color: "bg-yellow-600" },
            { start: 145.600, end: 145.7875, mode: "FM Repeater Output", color: "bg-red-600" },
        ]
    },
    {
        name: "70 Cm (UHF)",
        range: "430.000 - 440.000 MHz",
        segments: [
            { start: 430.000, end: 432.000, mode: "Dig / CW / SSB", color: "bg-blue-500" },
            { start: 433.000, end: 433.600, mode: "FM Simplex (LPD Overlap)", color: "bg-yellow-600" },
            { start: 438.650, end: 439.425, mode: "Repeater Output", color: "bg-red-600" },
            { start: 439.800, end: 440.000, mode: "Link / Digital Voice", color: "bg-purple-500" },
        ]
    },
    {
        name: "40 Metre (HF)",
        range: "7.000 - 7.200 MHz",
        segments: [
            { start: 7.000, end: 7.040, mode: "CW", color: "bg-gray-400" },
            { start: 7.040, end: 7.060, mode: "Digital (FT8 etc)", color: "bg-purple-500" },
            { start: 7.060, end: 7.200, mode: "LSB (Voice)", color: "bg-green-600" },
        ]
    }
];

// ... imports
import { useTranslations } from "next-intl";

// ... BANDS data (unchanged for now as per plan)

export default function InteractiveBandPlan() {
    const t = useTranslations("Atolye.tools.bandplan");
    const [selectedBand, setSelectedBand] = useState(0);

    return (
        <div className="col-span-1 md:col-span-2 bg-black/40 backdrop-blur-md border border-[var(--primary-500)]/30 rounded-xl p-6 hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.2)] transition-all group h-full flex flex-col">

            {/* Header */}
            <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
                <div className="p-3 bg-white/10 rounded-lg text-white">
                    <Radio size={24} />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-[var(--primary-500)] transition-colors">
                        {t('title')}
                    </h3>
                    <p className="text-xs text-[var(--text-muted)] font-mono">
                        {t('subtitle')}
                    </p>
                </div>
            </div>

            {/* Band Selector Tabs */}
            <div className="flex gap-2 mb-6 border-b border-white/10">
                {BANDS.map((band, idx) => (
                    <button
                        key={idx}
                        onClick={() => setSelectedBand(idx)}
                        className={`px-4 py-2 text-xs font-mono font-bold transition-all border-b-2 ${selectedBand === idx
                            ? "border-[var(--primary-500)] text-[var(--primary-500)]"
                            : "border-transparent text-[var(--text-muted)] hover:text-white"
                            }`}
                    >
                        {band.name}
                    </button>
                ))}
            </div>

            {/* Visualization */}
            <div className="flex-1 space-y-4">
                <div className="flex justify-between items-center text-xs font-mono text-[var(--text-secondary)]">
                    <span>{BANDS[selectedBand].range.split('-')[0]}</span>
                    <span>{t('spectrum')}</span>
                    <span>{BANDS[selectedBand].range.split('-')[1]}</span>
                </div>

                {/* Spectrum Bar (unchanged logic) */}
                <div className="relative h-12 w-full flex rounded overflow-hidden border border-white/10">
                    {BANDS[selectedBand].segments.map((seg, i) => {
                        // ... logic
                        const bandStart = BANDS[selectedBand].segments[0].start;
                        const bandEnd = BANDS[selectedBand].segments[BANDS[selectedBand].segments.length - 1].end;
                        const totalWidth = bandEnd - bandStart;
                        const segWidth = seg.end - seg.start;
                        const widthPct = (segWidth / totalWidth) * 100;

                        return (
                            <div
                                key={i}
                                className={`${seg.color} h-full relative group/seg border-r border-black/20 hover:brightness-125 transition-all cursor-pointer`}
                                style={{ width: `${widthPct}%` }}
                            >
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/seg:opacity-100 transition-opacity bg-black/50">
                                    <span className="text-[10px] text-white font-bold p-1">{seg.mode}</span>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Legend / Details List (unchanged logic) */}
                <div className="space-y-2 mt-4 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                    {BANDS[selectedBand].segments.map((seg, i) => (
                        <div key={i} className="flex justify-between items-center text-xs p-2 bg-white/5 rounded border-l-2 hover:bg-white/10 transition-colors" style={{ borderLeftColor: seg.color.replace('bg-', 'var(--') }}>
                            <div className="flex items-center gap-2">
                                <div className={`w-3 h-3 rounded-full ${seg.color}`}></div>
                                <span className="font-mono text-white">{seg.start.toFixed(3)} - {seg.end.toFixed(3)} MHz</span>
                            </div>
                            <span className="text-[var(--text-secondary)] font-bold">{seg.mode}</span>
                        </div>
                    ))}
                </div>

            </div>

            {/* Footer Info */}
            <div className="mt-4 text-[10px] text-[var(--text-muted)] font-mono flex items-start gap-2 opacity-60">
                <Info size={14} className="min-w-[14px]" />
                {t('footer')}
            </div>

        </div>
    );
}
