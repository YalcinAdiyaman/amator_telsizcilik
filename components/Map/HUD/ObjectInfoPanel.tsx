"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useMapStore } from "@/store/useMapStore";
import { X } from "lucide-react";

export default function ObjectInfoPanel() {
    const { selectedObject, selectObject } = useMapStore();

    if (!selectedObject) return null;

    const isSat = selectedObject.type === 'SATELLITE';
    const data = selectedObject.data;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 300, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="absolute top-20 right-4 z-[50] w-72 bg-black/80 backdrop-blur-md border border-[var(--primary-500)]/30 rounded-sm overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.5)]"
            >
                {/* Header */}
                <div className="bg-[var(--primary-500)]/10 p-3 border-b border-[var(--primary-500)]/20 flex justify-between items-center">
                    <h3 className="font-bold text-[var(--primary-500)] tracking-widest flex items-center gap-2">
                        {isSat ? '🛰️ UYDU' : '📡 RÖLE'}
                    </h3>
                    <button
                        onClick={() => selectObject(null)}
                        className="text-white/50 hover:text-white transition-colors"
                    >
                        <X size={16} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-4 space-y-4">
                    {/* Name/Callsign */}
                    <div className="text-center pb-4 border-b border-white/10">
                        <div className="text-2xl font-bold text-white mb-1">
                            {isSat ? data.name : data.callsign}
                        </div>
                        <div className="text-xs text-[var(--text-secondary)] font-mono">
                            {isSat ? 'YÖRÜNGESEL NESNE' : data.location}
                        </div>
                    </div>

                    {/* Grid / Coordinates */}
                    <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                        <div className="bg-white/5 p-2 rounded">
                            <div className="text-[var(--text-muted)] mb-1">ENLEM</div>
                            <div className="text-white">{typeof data.lat === 'number' ? data.lat.toFixed(4) : data.coordinates[0].toFixed(4)}</div>
                        </div>
                        <div className="bg-white/5 p-2 rounded">
                            <div className="text-[var(--text-muted)] mb-1">BOYLAM</div>
                            <div className="text-white">{typeof data.lng === 'number' ? data.lng.toFixed(4) : data.coordinates[1].toFixed(4)}</div>
                        </div>
                    </div>

                    {/* Specific Data */}
                    {isSat ? (
                        <div className="space-y-2 text-xs">
                            <div className="p-2 border border-[var(--primary-500)]/20 rounded bg-black/40">
                                <div className="text-[var(--primary-500)] font-bold mb-1">CANLI TELEMETRİ</div>
                                <div className="flex justify-between mb-1">
                                    <span className="text-gray-400">İRTİFA:</span>
                                    <span className="text-white">418.5 km</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">HIZ:</span>
                                    <span className="text-white">27,580 km/h</span>
                                </div>
                            </div>
                            <div className="text-[10px] text-gray-500 text-center pt-2">
                                TLE ZAMANI: {new Date().toLocaleDateString('tr-TR')}
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-2 text-xs font-mono">
                            <div className="flex justify-between p-2 hover:bg-white/5 rounded transition">
                                <span className="text-gray-400">FREKANS:</span>
                                <span className="text-[var(--primary-500)] font-bold">{data.frequency}</span>
                            </div>
                            <div className="flex justify-between p-2 hover:bg-white/5 rounded transition">
                                <span className="text-gray-400">TON (CTC/DCS):</span>
                                <span className="text-white">{data.tone}</span>
                            </div>
                            <div className="flex justify-between p-2 hover:bg-white/5 rounded transition">
                                <span className="text-gray-400">DURUM:</span>
                                <span className={`font-bold ${data.status === 'ACTIVE' ? 'text-[var(--success)]' : 'text-[var(--warning)]'}`}>
                                    {data.status === 'ACTIVE' ? 'AKTİF' : 'BAKIMDA'}
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Footer / Actions */}
                    <div className="pt-2">
                        <button className="w-full py-2 bg-[var(--primary-500)]/20 hover:bg-[var(--primary-500)]/40 border border-[var(--primary-500)]/50 text-[var(--primary-500)] text-xs font-bold rounded transition-all uppercase tracking-wider">
                            {isSat ? 'YÖRÜNGEYİ İZLE' : 'TELSİZE BAĞLAN'}
                        </button>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
