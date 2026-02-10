"use client";

import { useEffect, useState } from "react";
import { Marker, Polyline, Popup, useMap, Circle } from "react-leaflet";
import L from "leaflet";
import { Maidenhead } from "@/lib/maidenhead";

// Custom ISS Icon with Glow
const issIcon = L.divIcon({
    className: "custom-iss-icon",
    html: `<div class="w-8 h-8 rounded-full bg-white/10 border-2 border-[var(--primary-500)] shadow-[0_0_20px_var(--primary-500)] animate-pulse flex items-center justify-center text-[var(--primary-500)] text-xs font-bold">ISS</div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
});

// ... imports
import { useTranslations } from "next-intl";

export default function IssTracker() {
    const t = useTranslations("Atlas.iss");
    const map = useMap();
    const [position, setPosition] = useState<[number, number] | null>(null);
    const [orbitPath, setOrbitPath] = useState<[number, number][]>([]);

    useEffect(() => {
        const fetchISS = async () => {
            try {
                const res = await fetch('https://api.wheretheiss.at/v1/satellites/25544');
                const data = await res.json();
                const newPos: [number, number] = [data.latitude, data.longitude];
                setPosition(newPos);
                setOrbitPath(prev => [...prev, newPos].slice(-100));
            } catch (e) {
                console.error("Failed to fetch ISS data", e);
            }
        };

        fetchISS();
        const interval = setInterval(fetchISS, 5000);
        return () => clearInterval(interval);
    }, []);

    if (!position) return null;

    return (
        <>
            {/* Orbit Trail */}
            <Polyline
                positions={orbitPath}
                pathOptions={{
                    color: 'var(--primary-500)',
                    weight: 2,
                    opacity: 0.5,
                    dashArray: '5, 10',
                    className: 'animate-pulse'
                }}
            />

            {/* ISS Marker */}
            <Marker position={position} icon={issIcon} zIndexOffset={1000}>
                <Popup className="glass-panel text-xs">
                    <div className="p-2">
                        <h3 className="font-bold text-[var(--primary-500)]">ISS (ZARYA)</h3>
                        <p className="text-[var(--text-secondary)]">{t('lat')}: {position[0].toFixed(4)}</p>
                        <p className="text-[var(--text-secondary)]">{t('lon')}: {position[1].toFixed(4)}</p>
                        <p className="text-[var(--text-secondary)]">QTH: {Maidenhead.toLocator(position[0], position[1])}</p>
                        <div className="mt-2 text-[10px] text-[var(--text-muted)] animate-pulse">{t('telemetry')}</div>
                    </div>
                </Popup>
            </Marker>

            {/* Footprint Circle ... */}
            <Circle
                center={position}
                radius={2000000}
                pathOptions={{
                    color: 'var(--primary-500)',
                    fillColor: 'var(--primary-500)',
                    fillOpacity: 0.05,
                    weight: 1,
                    dashArray: '4, 8'
                }}
            />
        </>
    );
}
