"use client";

import { useEffect, useState } from "react";
import { Marker, Polyline, Popup, Circle } from "react-leaflet";
import L from "leaflet";
import { getSatelliteInfo } from "tle.js";
import { useMapStore } from "@/store/useMapStore";
import { Maidenhead } from "@/lib/maidenhead";

// TLE for ISS (ZARYA) - Normally fetched from API, but hardcoded fallback for stability
const ISS_TLE = [
    "1 25544U 98067A   24039.54951267  .00016717  00000-0  30075-3 0  9993",
    "2 25544  51.6423 325.3359 0005470 327.9575 146.7329 15.49547164438495"
];

const issIcon = L.divIcon({
    className: "custom-iss-icon",
    html: `<div class="w-8 h-8 rounded-full bg-white/10 border-2 border-[var(--primary-500)] shadow-[0_0_20px_var(--primary-500)] animate-pulse flex items-center justify-center text-[var(--primary-500)] text-[10px] font-bold backdrop-blur-sm">ISS</div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
});

export default function SatelliteManager() {
    const [position, setPosition] = useState<[number, number] | null>(null);
    const [orbitPath, setOrbitPath] = useState<[number, number][]>([]);
    // FIX: Enforce tuple type [string, string] to satisfy tle.js
    const [tleData, setTleData] = useState<[string, string]>(ISS_TLE as [string, string]);
    const { selectObject, selectedObject } = useMapStore();

    // Fetch fresh TLE
    useEffect(() => {
        const fetchTLE = async () => {
            try {
                const response = await fetch('https://celestrak.org/NORAD/elements/gp.php?CATNR=25544&FORMAT=TLE');
                if (response.ok) {
                    const text = await response.text();
                    const lines = text.split('\n').filter(line => line.trim().length > 0);
                    if (lines.length >= 2) {
                        // FIX: Cast array to tuple
                        setTleData([lines[1].trim(), lines[2].trim()] as [string, string]);
                    }
                }
            } catch (e) {
                console.warn("Failed to fetch fresh TLE, using fallback", e);
            }
        };
        fetchTLE();
    }, []);

    // Propagation Loop
    useEffect(() => {
        if (!tleData) return;

        const updatePosition = () => {
            try {
                const now = new Date();
                // FIX: Pass timestamp (number) instead of Date object
                const satInfo = getSatelliteInfo(tleData, now.getTime());

                if (satInfo && satInfo.lat && satInfo.lng) {
                    const currentPos: [number, number] = [satInfo.lat, satInfo.lng];
                    setPosition(currentPos);

                    // Generate future path (next 90 minutes = 1 orbit)
                    // High resolution (every 1 minute) for smoother curve
                    const path: [number, number][] = [];
                    path.push(currentPos); // Start from current

                    for (let i = 1; i <= 90; i += 1) {
                        const futureTime = new Date(now.getTime() + i * 60000);
                        // FIX: Pass timestamp (number)
                        const futureInfo = getSatelliteInfo(tleData, futureTime.getTime());
                        if (futureInfo) {
                            path.push([futureInfo.lat, futureInfo.lng]);
                        }
                    }
                    setOrbitPath(path);
                }
            } catch (err) {
                console.error("TLE Propagation Error", err);
            }
        };

        const interval = setInterval(updatePosition, 1000);
        updatePosition();

        return () => clearInterval(interval);
    }, [tleData]);

    if (!position) return null;

    const isSelected = selectedObject?.type === 'SATELLITE';

    return (
        <>
            {/* Glow/Blur Layer (Behind) */}
            <Polyline
                positions={orbitPath}
                pathOptions={{
                    color: 'var(--primary-500)',
                    weight: 8,
                    opacity: 0.3,
                    className: 'blur-[2px]'
                }}
            />

            {/* Core Line (Sharp) */}
            <Polyline
                positions={orbitPath}
                pathOptions={{
                    color: '#fff', // White core for maximum contrast
                    weight: 2,
                    opacity: 0.9,
                    dashArray: '10, 5', // Dashed to show direction/flow potentially
                }}
            />
            {/* Secondary Colored Core (Overlay) */}
            <Polyline
                positions={orbitPath}
                pathOptions={{
                    color: 'var(--primary-500)',
                    weight: 2,
                    opacity: 0.6,
                }}
            />

            {/* Coverage Circle */}
            <Circle
                center={position}
                radius={2200000} // Approx footprint
                pathOptions={{
                    color: 'var(--primary-500)',
                    fillColor: 'var(--primary-500)',
                    fillOpacity: isSelected ? 0.1 : 0.05,
                    weight: 1,
                    dashArray: '10, 20'
                }}
                eventHandlers={{
                    click: () => {
                        selectObject({
                            type: 'SATELLITE',
                            data: {
                                name: 'ISS (ZARYA)',
                                lat: position[0],
                                lng: position[1],
                                qth: Maidenhead.toLocator(position[0], position[1]),
                                tle: tleData
                            }
                        });
                    }
                }}
            />

            {/* Satellite Marker */}
            <Marker
                position={position}
                icon={issIcon}
                zIndexOffset={1000}
                eventHandlers={{
                    click: () => {
                        selectObject({
                            type: 'SATELLITE',
                            data: {
                                name: 'ISS (ZARYA)',
                                lat: position[0],
                                lng: position[1],
                                qth: Maidenhead.toLocator(position[0], position[1]),
                                tle: tleData
                            }
                        });
                    }
                }}
            >
            </Marker>
        </>
    );
}
