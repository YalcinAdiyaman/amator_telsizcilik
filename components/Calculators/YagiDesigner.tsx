"use client";

import { useState } from "react";
import { Signal, Ruler, Info } from "lucide-react";
import { useTranslations } from "next-intl";

export default function YagiDesigner() {
    const t = useTranslations("Atolye");
    const [freq, setFreq] = useState(145); // MHz
    const [elements, setElements] = useState(3); // 3 or 4 elements

    // Basic Yagi-Uda Dimensions (Approximation adapted from ARRL Handbook / DL6WU)
    // Dimensions in meters relative to Wavelength (lambda)
    // Reflector = 0.495 * lambda
    // Driven = 0.473 * lambda
    // Director 1 = 0.440 * lambda
    // Director 2 = 0.435 * lambda
    // Spacing Ref-Driven = 0.2 * lambda
    // Spacing Driven-Dir1 = 0.2 * lambda
    // Spacing Dir1-Dir2 = 0.25 * lambda

    const lambda = 300 / freq; // Wavelength in meters

    const dims = {
        reflector: 0.495 * lambda,
        driven: 0.473 * lambda,
        dir1: 0.440 * lambda,
        dir2: 0.435 * lambda,
        spaceRefDriven: 0.2 * lambda,
        spaceDrivenDir1: 0.2 * lambda,
        spaceDir1Dir2: 0.2 * lambda  // Simplified spacing
    };

    const boomLength = dims.spaceRefDriven + dims.spaceDrivenDir1 + (elements > 3 ? dims.spaceDir1Dir2 : 0);

    return (
        <div className="col-span-1 md:col-span-2 bg-black/40 backdrop-blur-md border border-[var(--primary-500)]/30 rounded-xl p-6 hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.2)] transition-all group flex flex-col md:flex-row gap-6">

            {/* Left Col: Controls & Results */}
            <div className="w-full md:w-1/3 flex flex-col gap-4">
                {/* Header */}
                <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                    <div className="p-3 bg-[var(--primary-500)]/10 rounded-lg text-[var(--primary-500)]">
                        <Signal size={24} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white group-hover:text-[var(--primary-500)] transition-colors">
                            {t('tools.yagi.title')}
                        </h3>
                        <p className="text-xs text-[var(--text-muted)] font-mono">
                            {t('tools.yagi.label')}
                        </p>
                    </div>
                </div>

                {/* Inputs */}
                <div className="space-y-4">
                    <div>
                        <label className="text-xs font-mono text-[var(--text-secondary)] mb-1 block">{t('tools.yagi.frequency')}</label>
                        <input
                            type="number"
                            value={freq}
                            onChange={(e) => setFreq(Number(e.target.value))}
                            className="w-full bg-white/5 border border-white/10 rounded p-2 text-white outline-none focus:border-[var(--primary-500)]"
                        />
                    </div>
                    <div>
                        <label className="text-xs font-mono text-[var(--text-secondary)] mb-1 block">{t('tools.yagi.elements')}</label>
                        <select
                            value={elements}
                            onChange={(e) => setElements(Number(e.target.value))}
                            className="w-full bg-white/5 border border-white/10 rounded p-2 text-white outline-none focus:border-[var(--primary-500)]"
                        >
                            <option value={3} className="bg-black">3 {t('tools.yagi.elements').split(' ')[0]} (Ref+Driven+Dir1)</option>
                            <option value={4} className="bg-black">4 {t('tools.yagi.elements').split(' ')[0]} (+Dir2)</option>
                        </select>
                    </div>
                </div>

                {/* Dimensions Table */}
                <div className="bg-[var(--bg-card)] rounded-lg p-4 border border-white/5 space-y-2 font-mono text-xs">
                    <div className="flex justify-between text-[var(--warning)]">
                        <span>{t('tools.yagi.reflector')} (R)</span>
                        <span className="font-bold">{dims.reflector.toFixed(3)} m</span>
                    </div>
                    <div className="flex justify-between text-[var(--primary-500)]">
                        <span>{t('tools.yagi.driven')} (DE)</span>
                        <span className="font-bold">{dims.driven.toFixed(3)} m</span>
                    </div>
                    <div className="flex justify-between text-white">
                        <span>{t('tools.yagi.director')} 1 (D1)</span>
                        <span className="font-bold">{dims.dir1.toFixed(3)} m</span>
                    </div>
                    {elements > 3 && (
                        <div className="flex justify-between text-gray-400">
                            <span>{t('tools.yagi.director')} 2 (D2)</span>
                            <span className="font-bold">{dims.dir2.toFixed(3)} m</span>
                        </div>
                    )}
                    <div className="border-t border-white/10 pt-2 flex justify-between text-[var(--success)] mt-2">
                        <span>{t('tools.yagi.boom')}</span>
                        <span className="font-bold">{boomLength.toFixed(2)} m</span>
                    </div>
                </div>
            </div>

            {/* Right Col: Visualization */}
            <div className="w-full md:w-2/3 bg-black/20 rounded-lg border border-white/5 relative overflow-hidden flex items-center justify-center p-8">
                {/* SVG Visualization */}
                <svg className="w-full h-full max-h-[300px]" viewBox="0 0 500 250">
                    <defs>
                        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />

                    {/* Boom */}
                    <line x1="50" y1="125" x2={elements > 3 ? "450" : "350"} y2="125" stroke="#333" strokeWidth="6" strokeLinecap="square" />

                    {/* Reflector */}
                    <g>
                        <line x1="50" y1="40" x2="50" y2="210" stroke="var(--warning)" strokeWidth="4" strokeLinecap="round" />
                        <text x="50" y="30" fill="var(--warning)" fontSize="10" textAnchor="middle" fontFamily="monospace">REF</text>
                        <text x="50" y="225" fill="var(--warning)" fontSize="10" textAnchor="middle" fontFamily="monospace">{dims.reflector.toFixed(2)}m</text>
                    </g>

                    {/* Spacing 1 Text */}
                    <text x="100" y="140" fill="#666" fontSize="10" textAnchor="middle" fontFamily="monospace">{(dims.spaceRefDriven * 100).toFixed(0)}cm</text>

                    {/* Driven Element */}
                    <g>
                        <line x1="150" y1="50" x2="150" y2="200" stroke="var(--primary-500)" strokeWidth="4" strokeLinecap="round" />
                        {/* Feed Point */}
                        <circle cx="150" cy="125" r="4" fill="black" stroke="white" strokeWidth="2" />
                        <text x="150" y="40" fill="var(--primary-500)" fontSize="10" textAnchor="middle" fontFamily="monospace">DE (Feed)</text>
                        <text x="150" y="215" fill="var(--primary-500)" fontSize="10" textAnchor="middle" fontFamily="monospace">{dims.driven.toFixed(2)}m</text>
                    </g>

                    {/* Spacing 2 Text */}
                    <text x="225" y="140" fill="#666" fontSize="10" textAnchor="middle" fontFamily="monospace">{(dims.spaceDrivenDir1 * 100).toFixed(0)}cm</text>


                    {/* Director 1 */}
                    <g>
                        <line x1="300" y1="60" x2="300" y2="190" stroke="white" strokeWidth="4" strokeLinecap="round" />
                        <text x="300" y="50" fill="white" fontSize="10" textAnchor="middle" fontFamily="monospace">DIR 1</text>
                        <text x="300" y="205" fill="white" fontSize="10" textAnchor="middle" fontFamily="monospace">{dims.dir1.toFixed(2)}m</text>
                    </g>

                    {/* Director 2 (Optional) */}
                    {elements > 3 && (
                        <g>
                            <text x="375" y="140" fill="#666" fontSize="10" textAnchor="middle" fontFamily="monospace">{(dims.spaceDir1Dir2 * 100).toFixed(0)}cm</text>
                            <line x1="450" y1="65" x2="450" y2="185" stroke="gray" strokeWidth="4" strokeLinecap="round" />
                            <text x="450" y="55" fill="gray" fontSize="10" textAnchor="middle" fontFamily="monospace">DIR 2</text>
                            <text x="450" y="200" fill="gray" fontSize="10" textAnchor="middle" fontFamily="monospace">{dims.dir2.toFixed(2)}m</text>
                        </g>
                    )}

                </svg>

                <div className="absolute bottom-2 right-2 flex gap-4 text-[10px] items-center">
                    <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-[var(--warning)]"></div> Reflector
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-[var(--primary-500)]"></div> Driven
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-white"></div> Director
                    </div>

                </div>
            </div>

        </div>
    );
}
