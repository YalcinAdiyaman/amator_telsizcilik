"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import RetroGrid from "@/components/ui/RetroGrid";

export default function Hero() {
    const t = useTranslations("Hero");
    const heroRef = useRef<HTMLElement>(null);
    const [scrollY, setScrollY] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    // Parallax scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Initial load animation trigger
    useEffect(() => {
        const timer = setTimeout(() => setIsLoaded(true), 100);
        return () => clearTimeout(timer);
    }, []);

    // Mouse tracking for spotlight
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (heroRef.current) {
                const rect = heroRef.current.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                heroRef.current.style.setProperty("--mouse-x", `${x}px`);
                heroRef.current.style.setProperty("--mouse-y", `${y}px`);
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    // Parallax speed multipliers
    const parallaxBg = scrollY * 0.3; // Background moves slower
    const parallaxFg = scrollY * 0.1; // Foreground moves slowest
    const fadeOut = Math.max(0, 1 - scrollY / 600); // Fade as scroll increases

    return (
        <section
            ref={heroRef}
            className="relative h-screen w-full overflow-hidden"
        >

            {/* === SPOTLIGHT INTERACTION === */}
            <div
                className="absolute inset-0 pointer-events-none z-10 hidden md:block"
                style={{
                    background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.06), transparent 40%)`
                }}
            />

            {/* === BACKGROUND LAYERS === */}
            <RetroGrid className="absolute inset-0 z-0 bg-transparent opacity-30" angle={65} />

            {/* Layer 1: Deep space gradient - moves slowest */}
            <div
                className="absolute inset-0 bg-gradient-to-t from-[var(--bg-void)] via-transparent to-[var(--bg-deep)] opacity-80 z-0"
                style={{
                    transform: `translateY(${parallaxBg}px)`,
                }}
            />

            {/* Layer 2: Animated star field (optional overlay) */}
            <div
                className="absolute inset-0 hero-stars z-0 opacity-40"
                style={{
                    transform: `translateY(${parallaxBg * 0.5}px)`,
                    opacity: fadeOut * 0.5,
                }}
            />

            {/* Layer 4: Radial glow spots */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Primary glow - top left */}
                <div
                    className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 rounded-full"
                    style={{
                        background:
                            "radial-gradient(circle, rgba(0, 212, 255, 0.08) 0%, transparent 70%)",
                        transform: `translate(${scrollY * 0.05}px, ${scrollY * 0.1}px)`,
                    }}
                />
                {/* Secondary glow - bottom right */}
                <div
                    className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 rounded-full"
                    style={{
                        background:
                            "radial-gradient(circle, rgba(255, 184, 0, 0.05) 0%, transparent 70%)",
                        transform: `translate(${-scrollY * 0.05}px, ${-scrollY * 0.1}px)`,
                    }}
                />
            </div>

            {/* Layer 5: Scan lines */}
            <div className="absolute inset-0 hero-scanlines opacity-30" />

            {/* === CONTENT === */}
            <div
                className="relative z-10 h-full flex flex-col items-center justify-center px-4"
                style={{
                    transform: `translateY(${parallaxFg}px)`,
                    opacity: fadeOut,
                }}
            >
                {/* HUD Frame Container */}
                <div
                    className={`
            hud-frame-hero relative p-8 md:p-16
            transition-all duration-1000 ease-out
            ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
          `}
                >
                    {/* Top decorative line */}
                    <div className="absolute left-1/2 -translate-x-1/2 -top-px w-40 h-px bg-gradient-to-r from-transparent via-[var(--primary-500)] to-transparent" />

                    {/* Subtitle - appears first */}
                    <p
                        className={`
              text-center text-sm md:text-base tracking-[0.4em] uppercase
              text-[var(--primary-500)] font-medium mb-6
              transition-all duration-700 delay-300
              ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}
            `}
                    >
                        TA • RADIO • PORTAL
                    </p>

                    {/* Main Title */}
                    <h1
                        className={`
              hero-title text-center
              text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl
              font-bold tracking-[0.15em] md:tracking-[0.2em]
              uppercase leading-tight
              transition-all duration-1000 delay-500
              ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
            `}
                    >
                        {t("title")}
                    </h1>

                    {/* Horizontal separator */}
                    <div
                        className={`
              mx-auto my-8 w-32 md:w-48 h-px hud-separator
              transition-all duration-700 delay-700
              ${isLoaded ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"}
            `}
                    />

                    {/* Tagline */}
                    <p
                        className={`
              text-center text-lg md:text-xl lg:text-2xl
              text-[var(--text-secondary)] tracking-wide
              max-w-2xl mx-auto mb-10
              transition-all duration-700 delay-900
              ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
            `}
                    >
                        {t("subtitle")}
                    </p>


                    {/* (CTA Button Removed) */}

                    {/* Bottom decorative line */}
                    <div className="absolute left-1/2 -translate-x-1/2 -bottom-px w-40 h-px bg-gradient-to-r from-transparent via-[var(--primary-500)] to-transparent" />
                </div>
            </div>

            {/* === SCROLL INDICATOR === */}
            <div
                className={`
          absolute bottom-8 left-1/2 -translate-x-1/2 z-10
          flex flex-col items-center gap-3
          transition-all duration-700 delay-1300
          ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
        `}
                style={{ opacity: fadeOut }}
            >
                <div
                    className="flex flex-col items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => {
                        // Scroll to next section logic (optional)
                        window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
                    }}
                >
                    <span className="text-xs tracking-[0.3em] uppercase text-[var(--primary-500)] font-bold animate-pulse">
                        {t("scrollHint")}
                    </span>
                    <div className="w-[1px] h-12 bg-gradient-to-b from-[var(--primary-500)] to-transparent" />
                </div>
            </div>

            {/* === BOTTOM FADE === */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--bg-surface)] to-transparent pointer-events-none" />
        </section>
    );
}
