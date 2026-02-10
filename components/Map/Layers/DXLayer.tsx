"use client";

import { useEffect, useState } from "react";
import { Polyline, CircleMarker, Tooltip, useMap } from "react-leaflet";
import L from "leaflet";
import { Maidenhead } from "@/lib/maidenhead";

// Mock Spot Data Structure
interface Spot {
    id: string;
    de: string;     // Spotter Callsign
    deGrid: [number, number];
    dx: string;     // DX Callsign
    dxGrid: [number, number];
    freq: string;
    mode: string;
    timestamp: number;
}

// Random Coordinate Generator (Simulating global activity)
const randomCoord = (): [number, number] => {
    return [
        (Math.random() * 140) - 70, // Lat restricted to avoid poles
        (Math.random() * 360) - 180 // Lng
    ];
};

export default function DXLayer() {
    const [spots, setSpots] = useState<Spot[]>([]);
    const map = useMap();

    // Store known locations to create repeating traffic (simulating busy stations)
    const stations = [
        { call: "TA1D", loc: [41.0, 29.0] }, // Istanbul
        { call: "W1AW", loc: [41.7, -72.7] }, // USA
        { call: "PY2XB", loc: [-23.5, -46.6] }, // Brazil
        { call: "JA1AN", loc: [35.6, 139.6] }, // Japan
        { call: "DL0AR", loc: [50.1, 8.6] }, // Germany
        { call: "VK3A", loc: [-37.8, 144.9] }, // Australia
        { call: "ZS6A", loc: [-25.7, 28.2] }, // South Africa
    ];

    useEffect(() => {
        // Simulation Interval
        const interval = setInterval(() => {

            // 30% chance to create a new spot every interval
            if (Math.random() > 0.3) {
                const source = stations[Math.floor(Math.random() * stations.length)];
                let target = stations[Math.floor(Math.random() * stations.length)];

                // Ensure source != target
                while (target.call === source.call) {
                    target = stations[Math.floor(Math.random() * stations.length)];
                }

                // Add randomness to coords so lines aren't identical
                const sourceLoc: [number, number] = [source.loc[0] + (Math.random() - 0.5), source.loc[1] + (Math.random() - 0.5)];
                const targetLoc: [number, number] = [target.loc[0] + (Math.random() - 0.5), target.loc[1] + (Math.random() - 0.5)];

                const newSpot: Spot = {
                    id: Math.random().toString(36).substr(2, 9),
                    de: source.call,
                    deGrid: sourceLoc,
                    dx: target.call,
                    dxGrid: targetLoc,
                    freq: "14.074",
                    mode: "FT8",
                    timestamp: Date.now()
                };

                setSpots(prev => {
                    // Keep only last 15 spots to avoid clutter
                    const clean = prev.slice(-14);
                    return [...clean, newSpot];
                });
            }

            // Cleanup old spots (older than 10 seconds for visual effect)
            setSpots(prev => prev.filter(s => Date.now() - s.timestamp < 10000));

        }, 800);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            {spots.map((spot) => (
                <div key={spot.id}>
                    {/* Beam Line */}
                    <Polyline
                        positions={[spot.deGrid, spot.dxGrid]}
                        pathOptions={{
                            color: '#00ffea', // Cyan Neon
                            weight: 2,
                            opacity: 0.6,
                            className: 'animate-pulse' // CSS animation for pulsing
                        }}
                    />

                    {/* Spotter Dot */}
                    <CircleMarker center={spot.deGrid} radius={2} pathOptions={{ color: '#00ffea', fillOpacity: 1 }} />

                    {/* DX Dot */}
                    <CircleMarker center={spot.dxGrid} radius={2} pathOptions={{ color: '#ff0055', fillOpacity: 1 }} />
                </div>
            ))}
        </>
    );
}
