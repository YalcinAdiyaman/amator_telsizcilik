"use client";

import { useEffect, useState } from "react";
import { useMap, Polygon } from "react-leaflet";
import L from "leaflet";

// Function to calculate the solar terminator (day/night line)
// Simplified algorithm - for high precision use 'suncalc' library
function getTerminator(date: Date): [number, number][][] {
    const sunEq = sunEclipticPosition(getJulian(date));
    const sunEqPos = eclipticToEquatorial(sunEq.lambda);
    const hourAngle = greenwichSiderealTime(getJulian(date)) - sunEqPos.alpha;
    const delta = sunEqPos.delta;

    const latLngs: [number, number][] = [];
    const ha = hourAngle;

    for (let i = -180; i <= 180; i++) {
        const lng = i;
        const tanLat = -Math.cos((lng + ha * 180 / Math.PI) * Math.PI / 180) / Math.tan(delta);
        const lat = Math.atan(tanLat) * 180 / Math.PI;
        latLngs.push([lat, lng]);
    }

    // Close the polygon
    // We need to enclose the "night" side. Determine if North or South pole is dark.
    if (delta > 0) {
        // North summer -> North pole is light. South pole is dark.
        // Polygon must enclose South pole.
        latLngs.push([-90, 180]);
        latLngs.push([-90, -180]);
    } else {
        // North winter -> North pole is dark.
        // Polygon must enclose North pole.
        latLngs.push([90, 180]);
        latLngs.push([90, -180]);
    }

    return [latLngs];
}

// Astronomy helper functions (simplified)
function getJulian(date: Date) {
    return (date.getTime() / 86400000) - (date.getTimezoneOffset() / 1440) + 2440587.5;
}

function sunEclipticPosition(julian: number) {
    const d = julian - 2451545.0;
    const g = 357.529 + 0.98560028 * d;
    const q = 280.459 + 0.98564736 * d;
    const L = q + 1.915 * Math.sin(g * Math.PI / 180) + 0.020 * Math.sin(2 * g * Math.PI / 180);
    return { lambda: L, R: 1.00014 - 0.01671 * Math.cos(g * Math.PI / 180) - 0.00014 * Math.cos(2 * g * Math.PI / 180) };
}

function eclipticToEquatorial(lambda: number) {
    const epsilon = 23.439 - 0.00000036 * 0; // obliq
    const alpha = Math.atan2(Math.cos(epsilon * Math.PI / 180) * Math.sin(lambda * Math.PI / 180), Math.cos(lambda * Math.PI / 180));
    const delta = Math.asin(Math.sin(epsilon * Math.PI / 180) * Math.sin(lambda * Math.PI / 180));
    return { alpha: alpha, delta: delta };
}

function greenwichSiderealTime(julian: number) {
    const d = julian - 2451545.0;
    return (280.46061837 + 360.98564736629 * d) * Math.PI / 180;
}


export default function TerminatorLayer() {
    const [terminator, setTerminator] = useState<[number, number][][]>([]);

    useEffect(() => {
        const updateTerminator = () => {
            const now = new Date();
            try {
                const poly = getTerminator(now);
                setTerminator(poly);
            } catch (e) {
                console.error("Terminator calc error", e);
            }
        };

        updateTerminator();
        const interval = setInterval(updateTerminator, 60000); // Create every minute
        return () => clearInterval(interval);
    }, []);

    if (terminator.length === 0) return null;

    return (
        <Polygon
            positions={terminator}
            pathOptions={{
                color: 'transparent',
                fillColor: '#000000',
                fillOpacity: 0.4,
                interactive: false
            }}
        />
    );
}
