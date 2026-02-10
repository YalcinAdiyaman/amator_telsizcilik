"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function AmbientOverlay() {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
            {/* Scanlines */}
            <div className="absolute inset-0 bg-scan-line opacity-[0.03]"></div>

            {/* Vignette */}
            <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/40"></div>

            {/* Dust Particles (Fake) */}
            <div className="absolute inset-0 opacity-20" style={{ background: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+') repeat" }}></div>

            {/* Dynamic Cursor Light (Subtle) */}
            <motion.div
                className="absolute w-[500px] h-[500px] bg-[var(--primary-500)]/5 rounded-full blur-[100px] mix-blend-screen"
                animate={{ x: mousePos.x - 250, y: mousePos.y - 250 }}
                transition={{ type: "spring", damping: 50, stiffness: 400 }}
            />
        </div>
    );
}
