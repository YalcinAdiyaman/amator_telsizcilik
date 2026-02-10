"use client";

import { useState } from "react";
import { MapPin, Globe, ArrowRightLeft, Navigation } from "lucide-react";
import { Maidenhead } from "@/lib/maidenhead"; // Make sure this lib exists and is exported correctly

export default function QTHConverter() {
    const [lat, setLat] = useState<number>(39.9208);
    const [lng, setLng] = useState<number>(32.8541); // Ankara Default
    const [grid, setGrid] = useState<string>("KM69hv"); // Ankara Grid

    // Convert Coords to Grid
    const handleToGrid = () => {
        try {
            const calculatedGrid = Maidenhead.toLocator(lat, lng);
            setGrid(calculatedGrid);
        } catch (e) {
            console.error(e);
            setGrid("INVALID");
        }
    };

    // Convert Grid to Coords
    const handleToCoords = () => {
        try {
            const [cLat, cLng] = Maidenhead.fromLocator(grid);
            setLat(parseFloat(cLat.toFixed(5)));
            setLng(parseFloat(cLng.toFixed(5)));
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="bg-black/40 backdrop-blur-md border border-[var(--primary-500)]/30 rounded-xl p-6 hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.2)] transition-all group h-full flex flex-col">

            {/* Header */}
            <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
                <div className="p-3 bg-[var(--primary-500)]/10 rounded-lg text-[var(--primary-500)]">
                    <MapPin size={24} />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-[var(--primary-500)] transition-colors">
                        QTH Çevirici
                    </h3>
                    <p className="text-xs text-[var(--text-muted)] font-mono">
                        GRID LOCATOR CONVERTER
                    </p>
                </div>
            </div>

            <div className="flex-1 space-y-6">

                {/* Lat/Lon Inputs */}
                <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-2">
                        <Globe size={14} className="text-[var(--text-muted)]" />
                        <span className="text-xs font-mono text-[var(--text-secondary)]">COORDINATES</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-[10px] text-[var(--text-muted)] block mb-1">LAT / ENLEM</label>
                            <input
                                type="number"
                                value={lat}
                                onChange={(e) => setLat(parseFloat(e.target.value))}
                                className="w-full bg-white/5 border border-white/10 p-2 rounded text-white font-mono text-sm focus:border-[var(--primary-500)]"
                            />
                        </div>
                        <div>
                            <label className="text-[10px] text-[var(--text-muted)] block mb-1">LON / BOYLAM</label>
                            <input
                                type="number"
                                value={lng}
                                onChange={(e) => setLng(parseFloat(e.target.value))}
                                className="w-full bg-white/5 border border-white/10 p-2 rounded text-white font-mono text-sm focus:border-[var(--primary-500)]"
                            />
                        </div>
                    </div>
                    <button
                        onClick={handleToGrid}
                        className="w-full py-2 bg-[var(--primary-500)]/20 hover:bg-[var(--primary-500)]/40 text-[var(--primary-500)] text-xs font-bold rounded flex items-center justify-center gap-2 transition-all border border-[var(--primary-500)]/50"
                    >
                        <ArrowRightLeft size={12} className="rotate-90" />
                        KOORDİNAT {`->`} GRID
                    </button>
                </div>

                <div className="w-full h-[1px] bg-white/10"></div>

                {/* Grid Input */}
                <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-2">
                        <Navigation size={14} className="text-[var(--text-muted)]" />
                        <span className="text-xs font-mono text-[var(--text-secondary)]">MAIDENHEAD GRID</span>
                    </div>
                    <div>
                        <input
                            type="text"
                            value={grid}
                            onChange={(e) => setGrid(e.target.value.toUpperCase())}
                            placeholder="KN41..."
                            className="w-full bg-[var(--primary-500)]/10 border border-[var(--primary-500)]/50 p-3 rounded text-[var(--primary-500)] font-black text-center text-2xl tracking-[0.2em] focus:shadow-[0_0_15px_var(--primary-500)] transition-all uppercase"
                        />
                    </div>
                    <button
                        onClick={handleToCoords}
                        className="w-full py-2 bg-white/5 hover:bg-white/10 text-white text-xs font-bold rounded flex items-center justify-center gap-2 transition-all border border-white/10"
                    >
                        <ArrowRightLeft size={12} className="-rotate-90" />
                        GRID {`->`} KOORDİNAT
                    </button>
                </div>

            </div>

            <div className="mt-4 text-[10px] text-[var(--text-muted)] font-mono text-center opacity-60">
                *WGS84 Datum kullanılır.
            </div>

        </div>
    );
}
