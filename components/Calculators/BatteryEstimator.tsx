"use client";

import { useState } from "react";
import { BatteryCharging, Clock, Zap, Info } from "lucide-react";
import { useTranslations } from "next-intl";

export default function BatteryEstimator() {
    const t = useTranslations("Atolye");
    const [capacity, setCapacity] = useState(7); // Ah (Ampere Hours)
    const [voltage, setVoltage] = useState(13.8); // Volts
    const [txPower, setTxPower] = useState(50); // Watts
    const [rxCurrent, setRxCurrent] = useState(0.5); // Amps
    const [dutyCycle, setDutyCycle] = useState(20); // % TX time (20% typical for SSB/Voice)

    // Calculations
    const txCurrent = txPower / voltage; // Amps during TX
    const txTimeFraction = dutyCycle / 100;
    const rxTimeFraction = 1 - txTimeFraction;

    // Average Current Draw (Amps) = (TxCurrent * TxTime) + (RxCurrent * RxTime)
    const avgCurrent = (txCurrent * txTimeFraction) + (rxCurrent * rxTimeFraction);

    // Estimated Runtime (Hours) = Capacity / AvgCurrent
    // * Derating factor: Lead Acid batteries shouldn't be discharged below 50%, LiFePO4 below 20%.
    // We'll show "Total theoretical" and "Safe Use (LiFePO4 80% / Lead Acid 50%)"

    const theoreticalTime = capacity / avgCurrent;
    const safeTimeLiFePO4 = theoreticalTime * 0.8;
    const safeTimeLeadAcid = theoreticalTime * 0.5;

    return (
        <div className="bg-black/40 backdrop-blur-md border border-[var(--success)]/30 rounded-xl p-6 hover:shadow-[0_0_20px_rgba(0,255,65,0.15)] transition-all group h-full flex flex-col">

            {/* Header */}
            <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
                <div className="p-3 bg-[var(--success)]/10 rounded-lg text-[var(--success)]">
                    <BatteryCharging size={24} />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-[var(--success)] transition-colors">
                        {t('tools.battery.title')}
                    </h3>
                    <p className="text-xs text-[var(--text-muted)] font-mono">
                        {t('tools.battery.label')}
                    </p>
                </div>
            </div>

            {/* Inputs */}
            <div className="space-y-4 mb-6 flex-1">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-xs font-mono text-[var(--text-secondary)] mb-1 block">{t('tools.battery.capacity')}</label>
                        <input
                            type="number"
                            value={capacity}
                            onChange={(e) => setCapacity(Number(e.target.value))}
                            className="w-full bg-white/5 border border-white/10 rounded p-2 text-white outline-none focus:border-[var(--success)]"
                        />
                    </div>
                    <div>
                        <label className="text-xs font-mono text-[var(--text-secondary)] mb-1 block">{t('tools.battery.voltage')}</label>
                        <input
                            type="number"
                            value={voltage}
                            onChange={(e) => setVoltage(Number(e.target.value))}
                            className="w-full bg-white/5 border border-white/10 rounded p-2 text-white outline-none focus:border-[var(--success)]"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-xs font-mono text-[var(--text-secondary)] mb-1 block">{t('tools.battery.txPower')}</label>
                        <input
                            type="number"
                            value={txPower}
                            onChange={(e) => setTxPower(Number(e.target.value))}
                            className="w-full bg-white/5 border border-white/10 rounded p-2 text-white outline-none focus:border-[var(--success)]"
                        />
                    </div>
                    <div>
                        <label className="text-xs font-mono text-[var(--text-secondary)] mb-1 block">{t('tools.battery.rxCurrent')}</label>
                        <input
                            type="number"
                            value={rxCurrent}
                            onChange={(e) => setRxCurrent(Number(e.target.value))}
                            className="w-full bg-white/5 border border-white/10 rounded p-2 text-white outline-none focus:border-[var(--success)]"
                        />
                    </div>
                </div>

                <div>
                    <label className="text-xs font-mono text-[var(--text-secondary)] mb-1 block flex justify-between">
                        <span>{t('tools.battery.dutyCycle')}</span>
                        <span className="text-[var(--success)] font-bold">{dutyCycle}%</span>
                    </label>
                    <input
                        type="range"
                        min="5"
                        max="100"
                        step="5"
                        value={dutyCycle}
                        onChange={(e) => setDutyCycle(Number(e.target.value))}
                        className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[var(--success)]"
                    />
                    <div className="flex justify-between text-[8px] text-[var(--text-muted)] mt-1">
                        <span>{t('tools.battery.listen')}</span>
                        <span>{t('tools.battery.ssb')} (%20)</span>
                        <span>{t('tools.battery.fm')} (%50)</span>
                        <span>{t('tools.battery.continuous')}</span>
                    </div>
                </div>
            </div>

            {/* Results */}
            <div className="bg-[var(--bg-card)] rounded-lg p-4 border border-[var(--success)]/20 space-y-3">

                <div className="flex justify-between items-center">
                    <span className="text-sm text-[var(--text-muted)]">{t('tools.battery.avgCurrent')}</span>
                    <span className="text-white font-mono">{avgCurrent.toFixed(2)} A</span>
                </div>

                <div className="w-full h-[1px] bg-white/10"></div>

                <div className="flex items-center gap-3">
                    <Clock className="text-[var(--success)]" size={20} />
                    <div className="flex-1">
                        <div className="flex justify-between items-baseline">
                            <span className="text-xs text-[var(--text-muted)]">{t('tools.battery.lifepo4')}</span>
                            <span className="text-lg font-bold text-white">{safeTimeLiFePO4.toFixed(1)} {t('tools.battery.hours')}</span>
                        </div>
                        <div className="w-full h-1 bg-white/10 rounded-full mt-1 overflow-hidden">
                            <div className="h-full bg-[var(--success)]" style={{ width: '80%' }}></div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3 opacity-70">
                    <div className="w-5 flex justify-center"><div className="w-2 h-2 rounded-full bg-gray-500"></div></div>
                    <div className="flex-1">
                        <div className="flex justify-between items-baseline">
                            <span className="text-xs text-[var(--text-muted)]">{t('tools.battery.leadAcid')}</span>
                            <span className="text-sm font-mono text-white">{safeTimeLeadAcid.toFixed(1)} {t('tools.battery.hours')}</span>
                        </div>
                        <div className="w-full h-1 bg-white/10 rounded-full mt-1 overflow-hidden">
                            <div className="h-full bg-yellow-600" style={{ width: '50%' }}></div>
                        </div>
                    </div>
                </div>

            </div>

            {/* Footer Info */}
            <div className="mt-4 text-[10px] text-[var(--text-muted)] font-mono flex items-start gap-2 opacity-60">
                <Info size={14} className="min-w-[14px]" />
                Hesaplama, bataryaların ideal sıcaklıkta olduğu varsayılara yapılmıştır. Soğuk havada performans düşebilir.
            </div>

        </div>
    );
}
