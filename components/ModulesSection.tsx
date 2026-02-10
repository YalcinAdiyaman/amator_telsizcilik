"use client";

import { useTranslations, useLocale } from "next-intl";
import { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { Link } from "@/i18n/routing";
import { BorderBeam } from "@/components/ui/BorderBeam";


export default function ModulesSection() {
    const t = useTranslations("Modules");
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    const modules = [
        {
            key: "atlas",
            href: "/atlas",
            icon: (
                <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
                    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" strokeWidth="1.5" />
                </svg>
            ),
            accentColor: "var(--primary-500)",
            subModules: [
                { label: "Canlı Harita", icon: "🗺️" },
                { label: "Röle Listesi", icon: "📡" },
                { label: "Uydu Takibi", icon: "🛰️" }
            ]
        },
        {
            key: "atolye",
            href: "/atolye",
            icon: (
                <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" strokeWidth="1.5" />
                </svg>
            ),
            accentColor: "var(--secondary-500)",
            subModules: [
                { label: "Dipol Hesapla", icon: "📐" },
                { label: "SWR Analiz", icon: "📊" },
                { label: "Kablo Kaybı", icon: "🔌" }
            ]
        },
        {
            key: "akademi",
            href: "/akademi",
            icon: (
                <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" strokeWidth="1.5" />
                    <path d="M6 12v5c3 3 9 3 12 0v-5" strokeWidth="1.5" />
                </svg>
            ),
            accentColor: "var(--primary-500)",
            subModules: [
                { label: "Sınav Simülatörü", icon: "📝" },
                { label: "Mevzuat", icon: "⚖️" },
                { label: "Teknik Dersler", icon: "📚" }
            ]
        },
    ];

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const cardVariants: Variants = {
        hidden: { opacity: 0, y: 50, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 20
            }
        }
    };

    return (
        <section
            ref={sectionRef}
            className="relative py-24 md:py-32 px-4 overflow-hidden"
        >
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-surface)] via-[var(--bg-deep)] to-[var(--bg-surface)]" />

            {/* Grid overlay */}
            <div
                className="absolute inset-0 opacity-5 pointer-events-none"
                style={{
                    backgroundImage: `
            linear-gradient(var(--primary-700) 1px, transparent 1px),
            linear-gradient(90deg, var(--primary-700) 1px, transparent 1px)
          `,
                    backgroundSize: "40px 40px",
                }}
            />

            {/* Content */}
            <div className="container-wide relative z-10">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16 md:mb-24"
                >
                    <p className="text-sm tracking-[0.4em] uppercase text-[var(--primary-500)] mb-4 font-bold">
                        SİSTEM MODÜLLERİ
                    </p>
                    <h2 className="heading-display text-4xl md:text-5xl lg:text-6xl text-gradient relative inline-block">
                        KOMUTA MERKEZİ
                        {/* Underline deco */}
                        <motion.div
                            initial={{ width: 0 }}
                            animate={isInView ? { width: "100%" } : { width: 0 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="absolute -bottom-4 left-0 h-1 bg-[var(--primary-500)]"
                        />
                    </h2>
                </motion.div>

                {/* Module cards list (Command Center Layout) */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="flex flex-col gap-12 max-w-6xl mx-auto"
                >
                    {modules.map((module, index) => (
                        <motion.article
                            key={module.key}
                            variants={cardVariants}
                            whileHover={{ scale: 1.01 }}
                            className="group relative w-full perspective-1000"
                        >
                            <Link href={module.href} locale={useLocale()} className="block w-full">
                                {/* Glassmorphism Card Background */}
                                <div className="absolute inset-0 bg-[var(--bg-card)]/60 backdrop-blur-xl rounded-2xl border border-[var(--border-default)] transition-all duration-300 group-hover:border-[var(--primary-500)]/50 group-hover:bg-[var(--bg-card)]/80 shadow-2xl overflow-hidden">
                                    {/* Technical Blueprint Overlay */}
                                    <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
                                    <div className="absolute top-0 right-0 p-4 opacity-30 pointer-events-none">
                                        <svg width="200" height="200" viewBox="0 0 100 100" className="animate-spin-slow text-[var(--primary-500)]">
                                            <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="1" fill="none" strokeDasharray="5,5" />
                                            <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="0.5" fill="none" />
                                            <path d="M50 20 L50 10 M50 90 L50 80 M90 50 L80 50 M10 50 L20 50" stroke="currentColor" strokeWidth="2" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Glowing Bracket Corners */}
                                <div className="absolute top-0 left-0 w-12 h-12 border-t-[3px] border-l-[3px] border-[var(--primary-500)] rounded-tl-xl opacity-60 group-hover:opacity-100 transition-all duration-300 group-hover:shadow-[0_0_20px_var(--primary-500)]" />
                                <div className="absolute bottom-0 right-0 w-12 h-12 border-b-[3px] border-r-[3px] border-[var(--primary-500)] rounded-br-xl opacity-60 group-hover:opacity-100 transition-all duration-300 group-hover:shadow-[0_0_20px_var(--primary-500)]" />

                                {/* Animated Border Beam */}
                                <BorderBeam size={600} duration={12} delay={9 + index} colorFrom={module.accentColor} colorTo="transparent" className="opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                {/* Card Content - Command Center Layout */}
                                <div className="relative p-8 md:p-12 flex flex-col lg:flex-row items-center gap-10 lg:gap-16 z-10 w-full">

                                    {/* Icon Section (Holographic) */}
                                    <div className="shrink-0 relative group-hover:transform group-hover:translate-z-10 transition-transform duration-500">
                                        <div
                                            className="w-24 h-24 md:w-32 md:h-32 rounded-3xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 shadow-[0_0_40px_-10px_rgba(0,212,255,0.3)] backdrop-blur-sm"
                                            style={{
                                                background: `linear-gradient(135deg, ${module.accentColor}25, ${module.accentColor}05)`,
                                                border: `1px solid ${module.accentColor}50`,
                                                boxShadow: `0 0 30px ${module.accentColor}20`
                                            }}
                                        >
                                            <div style={{ color: module.accentColor }} className="relative z-10 scale-150 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                                                {module.icon}
                                            </div>
                                        </div>
                                        {/* Status Indicator */}
                                        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/80 border border-[var(--primary-500)]/50 rounded-full text-[10px] uppercase tracking-widest text-[var(--primary-500)] backdrop-blur-md">
                                            ONLINE
                                        </div>
                                    </div>

                                    {/* Text Content */}
                                    <div className="flex-grow text-center lg:text-left space-y-4 max-w-2xl">
                                        <div>
                                            <div className="flex items-center justify-center lg:justify-start gap-3 mb-2 opacity-70">
                                                <span className="w-2 h-2 rounded-full bg-[var(--primary-500)] animate-pulse"></span>
                                                <span className="text-xs font-mono tracking-[0.2em] uppercase text-[var(--text-muted)]">SYSTEM_MODULE_0{index + 1}</span>
                                            </div>
                                            <h3 className="heading-display text-4xl md:text-5xl group-hover:text-glow transition-all duration-300 mb-3 tracking-wide">
                                                {t(`${module.key}.title`)}
                                            </h3>
                                        </div>
                                        <p className="text-[var(--text-secondary)] leading-relaxed text-base md:text-lg font-light">
                                            {t(`${module.key}.description`)}
                                        </p>
                                    </div>

                                    {/* Quick Access Grid (Sub-menu) */}
                                    <div className="shrink-0 w-full lg:w-auto mt-6 lg:mt-0">
                                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-3 w-full lg:w-48">
                                            {module.subModules.map((sub, i) => (
                                                <div
                                                    key={i}
                                                    className="flex items-center gap-3 px-4 py-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)]/50 hover:bg-[var(--primary-500)]/10 hover:border-[var(--primary-500)]/50 transition-all duration-200 cursor-pointer group/btn"
                                                >
                                                    <span className="text-lg opacity-70 group-hover/btn:opacity-100 group-hover/btn:scale-110 transition-all">{sub.icon}</span>
                                                    <span className="text-xs font-bold tracking-wider uppercase text-[var(--text-muted)] group-hover/btn:text-[var(--text-primary)] transition-colors">
                                                        {sub.label}
                                                    </span>
                                                    <svg className="w-3 h-3 ml-auto opacity-0 group-hover/btn:opacity-100 -translate-x-2 group-hover/btn:translate-x-0 transition-all text-[var(--primary-500)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                </div>
                            </Link>
                        </motion.article>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
