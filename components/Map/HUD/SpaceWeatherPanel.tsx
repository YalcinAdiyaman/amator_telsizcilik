"use client";

import { useEffect, useState } from "react";
import { Activity, Sun, Zap, Radio, ThermometerSun, Eye, EyeOff } from "lucide-react";
import { useTranslations } from "next-intl";

interface SolarData {
    sfi: number;
    k_index: number;
    a_index: number;
    bz: string;
    solar_wind: number;
    hf_conditions: string;
    vhf_conditions: string;
}

export default function SpaceWeatherPanel() {
    const t = useTranslations("Atlas");
    const [data, setData] = useState<SolarData | null>(null);
    const [isMinimized, setIsMinimized] = useState(true); // DEFAULT MINIMIZED

    useEffect(() => {
        const fetchData = async () => {

            // Simulate real solar data ranges locally for static export
            const sfi = 140 + Math.floor(Math.random() * 50);
            const kIndex = Math.floor(Math.random() * 4);
            const aIndex = Math.floor(Math.random() * 15);
            const bz = (Math.random() * 10 - 5).toFixed(1);
            const swSpeed = 350 + Math.floor(Math.random() * 200);

            const hfConditions = sfi > 150 && kIndex < 3 ? "MÜKEMMEL" : sfi > 100 && kIndex < 4 ? "İYİ" : "ORTA";
            const vhfConditions = kIndex > 4 ? "AÇIK (AURORA)" : "KAPALI";

            setData({
                sfi,
                k_index: kIndex,
                a_index: aIndex,
                bz,
                solar_wind: swSpeed,
                hf_conditions: hfConditions,
                vhf_conditions: vhfConditions
            });

        };

        fetchData();
        const interval = setInterval(fetchData, 60000); // Update every minute
        return () => clearInterval(interval);
    }, []);

    if (!data) return null;

    return (
        // Adjusted top position to avoid overlap with coordinates box (approx 180px down)
        <div className={`absolute left-4 z-20 transition-all duration-300 pointer-events-auto ${isMinimized ? 'top-48 w-auto' : 'top-48 w-64'}`}>
            {/* Standardized Container - Matches ObjectInfoPanel */}
            <div className="bg-black/80 backdrop-blur-md border border-[var(--primary-500)]/30 rounded-sm overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.5)]">

                {/* Standardized Header */}
                <div className={`bg-[var(--primary-500)]/10 p-2 border-b border-[var(--primary-500)]/20 flex justify-between items-center ${isMinimized ? 'gap-2' : ''}`}>
                    <div className="flex items-center gap-2 text-[var(--primary-500)]">
                        <Sun size={18} className="text-[var(--warning)] animate-pulse-slow" />
                        {!isMinimized && <h3 className="tracking-widest font-bold text-[10px] text-white">{t('spaceWeather.title')}</h3>}
                    </div>
                    <button
                        onClick={() => setIsMinimized(!isMinimized)}
                        className="text-[var(--primary-500)]/50 hover:text-[var(--primary-500)] transition-colors"
                    >
                        {isMinimized ? <Eye size={14} /> : <EyeOff size={14} />}
                    </button>
                </div>

                {/* Grid Data - Hidden when minimized */}
                {!isMinimized && (
                    <div className="p-3 grid grid-cols-2 gap-3 text-xs font-mono">

                        {/* SFI */}
                        <div className="flex flex-col">
                            <span className="text-[var(--text-muted)] text-[10px]">{t('spaceWeather.sfi')}</span>
                            <div className="flex items-baseline gap-1">
                                <span className="text-xl font-bold text-[var(--warning)]">{data.sfi}</span>
                                <span className="text-[10px] text-[var(--success)]">SFI</span>
                            </div>
                        </div>

                        {/* K-Index */}
                        <div className="flex flex-col">
                            <span className="text-[var(--text-muted)] text-[10px]">{t('spaceWeather.kIndex')}</span>
                            <div className="flex items-baseline gap-1">
                                <span className={`text-xl font-bold ${data.k_index > 4 ? 'text-red-500' : 'text-[var(--success)]'}`}>
                                    {data.k_index}
                                </span>
                                <span className="text-[10px]">Kp</span>
                            </div>
                        </div>

                        {/* Solar Wind */}
                        <div className="col-span-2 flex items-center justify-between bg-white/5 p-1 px-2 rounded">
                            <span className="text-[var(--text-muted)] flex items-center gap-1">
                                <Zap size={10} /> {t('spaceWeather.solarWind', { default: 'RÜZGAR' })}
                            </span>
                            <span className="text-[var(--primary-500)] font-bold">{data.solar_wind} km/s</span>
                        </div>

                        {/* HF Status */}
                        <div className="col-span-2 mt-1">
                            <div className="flex justify-between items-end mb-1">
                                <span className="text-[10px] text-[var(--text-muted)]">{t('spaceWeather.conditions')}</span>
                                <span className={`text-xs font-bold ${data.hf_conditions === 'MÜKEMMEL' ? 'text-[var(--success)]' :
                                    data.hf_conditions === 'İYİ' ? 'text-[var(--primary-500)]' : 'text-[var(--warning)]'
                                    }`}>
                                    {data.hf_conditions}
                                </span>
                            </div>
                            {/* Fake Progress Bar */}
                            <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-[var(--success)] shadow-[0_0_10px_var(--success)]"
                                    style={{ width: data.hf_conditions === 'MÜKEMMEL' ? '90%' : '60%' }}
                                ></div>
                            </div>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
}
