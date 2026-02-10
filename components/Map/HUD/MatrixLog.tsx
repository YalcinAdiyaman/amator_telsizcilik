"use client";

import { useEffect, useState } from "react";
import { Radio, Eye, EyeOff, Activity } from "lucide-react";

interface LogEntry {
    id: string;
    time: string;
    callsign: string;
    tg: number;
    country: string;
}

// Mock Data for "The Matrix" style stream
const mockCallsigns = ["TA1D", "YM2A", "TA3O", "TB5X", "W1AW", "DL9Z", "F4B", "VK3J"];
const mockTGs = [91, 286, 2860, 262, 3100, 235];
const mockCountries = ["TR", "USA", "GER", "FRA", "AUS", "UK"];

export default function MatrixLog() {
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const [isMinimized, setIsMinimized] = useState(true); // DEFAULT MINIMIZED

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const timeStr = now.toLocaleTimeString('tr-TR', { hour12: false });

            const newLog: LogEntry = {
                id: Math.random().toString(36).substr(2, 9),
                time: timeStr,
                callsign: mockCallsigns[Math.floor(Math.random() * mockCallsigns.length)] + (Math.floor(Math.random() * 99)),
                tg: mockTGs[Math.floor(Math.random() * mockTGs.length)],
                country: mockCountries[Math.floor(Math.random() * mockCountries.length)]
            };

            setLogs(prev => {
                const updated = [newLog, ...prev];
                return updated.slice(0, 8); // Keep last 8 lines
            });

        }, 2000 + Math.random() * 3000); // Random interval

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={`absolute bottom-24 left-4 z-20 pointer-events-auto font-mono text-xs transition-all duration-300 ${isMinimized ? 'w-auto' : 'w-64'}`}>
            {/* Standardized Container - Matches ObjectInfoPanel */}
            <div className="bg-black/80 backdrop-blur-md border border-[var(--primary-500)]/30 rounded-sm overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.5)]">

                {/* Standardized Header */}
                <div className={`bg-[var(--primary-500)]/10 p-2 border-b border-[var(--primary-500)]/20 flex justify-between items-center ${isMinimized ? 'gap-2' : ''}`}>
                    <div className="flex items-center gap-2 text-[var(--primary-500)]">
                        <Activity size={14} className="animate-pulse" />
                        {!isMinimized && <h3 className="tracking-widest font-bold text-[10px]">DMR TRAFİĞİ</h3>}
                    </div>
                    <button
                        onClick={() => setIsMinimized(!isMinimized)}
                        className="text-[var(--primary-500)]/50 hover:text-[var(--primary-500)] transition-colors"
                    >
                        {isMinimized ? <Eye size={14} /> : <EyeOff size={14} />}
                    </button>
                </div>

                {/* Content - Matrix Style */}
                {!isMinimized && (
                    <div className="p-2 flex flex-col gap-1 bg-black/50">
                        {logs.map((log, index) => (
                            <div
                                key={log.id}
                                className={`flex justify-between items-center transition-all duration-500 ${index === 0 ? 'text-white font-bold brightness-125' : 'text-[#00ff41]/70'}`}
                                style={{ opacity: 1 - (index * 0.12) }}
                            >
                                <span className="w-16">{log.time}</span>
                                <span className="w-20 text-left">{log.callsign}</span>
                                <span className="text-[10px] bg-[#00ff41]/10 px-1 rounded text-[#00ff41]">TG {log.tg}</span>
                            </div>
                        ))}
                        {logs.length === 0 && <span className="text-[#00ff41]/50 animate-pulse p-2">...Dinleniyor...</span>}
                    </div>
                )}
            </div>
        </div>
    );
}
