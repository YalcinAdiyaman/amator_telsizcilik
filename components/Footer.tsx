"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Github, Twitter, Radio, Mail, Signal, MapPin, Globe } from "lucide-react";

export default function Footer() {
    const t = useTranslations("Footer");
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative pt-24 pb-12 px-4 border-t border-[var(--border-subtle)] overflow-hidden">
            {/* Background gradient & grid */}
            <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-deep)] to-[var(--bg-void)]" />
            <div className="absolute inset-0 bg-radar-grid opacity-20 pointer-events-none" />

            <div className="container-wide relative z-10">

                {/* === CTA SECTION === */}
                <div className="relative mb-24 p-8 md:p-12 rounded-2xl overflow-hidden border border-[var(--primary-500)]/30 bg-[var(--bg-elevated)]/50 backdrop-blur-sm group hover:border-[var(--primary-500)]/60 transition-colors duration-500">
                    {/* Decor corners */}
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[var(--primary-500)]" />
                    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[var(--primary-500)]" />
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[var(--primary-500)]" />
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[var(--primary-500)]" />

                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
                        <div>
                            <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-widest text-white mb-2">
                                <span className="text-[var(--primary-500)]">///</span> SİNYAL AĞINA KATIL
                            </h3>
                            <p className="text-[var(--text-secondary)] max-w-xl">
                                Amatör telsiz dünyasında yerini al. Kendi istasyonunu kur, global ağa bağlan.
                            </p>
                        </div>
                        <button className="btn-primary group-hover:shadow-[0_0_30px_rgba(0,212,255,0.4)] transition-shadow">
                            <span>Hemen Başla</span>
                            <Signal className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* === MAIN FOOTER CONTENT === */}
                <div className="grid md:grid-cols-4 gap-12 mb-16">
                    {/* Brand column */}
                    <div className="md:col-span-1">
                        <Link href="/" className="flex items-center gap-3 mb-6 group">
                            <div className="relative w-10 h-10 flex items-center justify-center">
                                <div className="absolute inset-0 border-2 border-[var(--primary-500)] rotate-45 group-hover:rotate-90 transition-transform duration-500" />
                                <Radio className="w-5 h-5 text-[var(--primary-500)]" />
                            </div>
                            <div>
                                <span className="block text-sm tracking-[0.2em] font-bold text-[var(--primary-500)] uppercase">
                                    TA P0RTAL
                                </span>
                                <span className="block text-[10px] text-[var(--text-muted)] tracking-wider">
                                    SYSTEM_ONLINE
                                </span>
                            </div>
                        </Link>
                        <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-6">
                            Türkiye&apos;nin yeni nesil amatör telsizcilik platformu.
                            <br />
                            <span className="text-[var(--primary-500)]/60 text-xs mt-2 block font-mono">
                                COORDINATES: 39.9334° N, 32.8597° E
                            </span>
                        </p>
                        {/* Social Icons */}
                        <div className="flex gap-4">
                            <a href="#" className="text-[var(--text-muted)] hover:text-[var(--primary-500)] hover:drop-shadow-[0_0_8px_var(--primary-500)] transition-all transform hover:-translate-y-1">
                                <Github className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-[var(--text-muted)] hover:text-[var(--primary-500)] hover:drop-shadow-[0_0_8px_var(--primary-500)] transition-all transform hover:-translate-y-1">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-[var(--text-muted)] hover:text-[var(--primary-500)] hover:drop-shadow-[0_0_8px_var(--primary-500)] transition-all transform hover:-translate-y-1">
                                <Mail className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Links columns */}
                    <div>
                        <h4 className="text-xs tracking-[0.2em] uppercase text-[var(--text-secondary)] mb-6 font-bold border-l-2 border-[var(--primary-500)] pl-3">
                            MODÜLLER
                        </h4>
                        <ul className="space-y-3 font-mono text-sm">
                            <li>
                                <Link href="/atlas" className="text-[var(--text-muted)] hover:text-[var(--primary-500)] hover:translate-x-2 transition-all block">
                                    &gt; ATLAS_MAP
                                </Link>
                            </li>
                            <li>
                                <Link href="/atolye" className="text-[var(--text-muted)] hover:text-[var(--primary-500)] hover:translate-x-2 transition-all block">
                                    &gt; ATOLYE_LAB
                                </Link>
                            </li>
                            <li>
                                <Link href="/akademi" className="text-[var(--text-muted)] hover:text-[var(--primary-500)] hover:translate-x-2 transition-all block">
                                    &gt; ACADEMY_DB
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-xs tracking-[0.2em] uppercase text-[var(--text-secondary)] mb-6 font-bold border-l-2 border-[var(--secondary-500)] pl-3">
                            KAYNAKLAR
                        </h4>
                        <ul className="space-y-3 font-mono text-sm">
                            <li>
                                <a href="#" className="text-[var(--text-muted)] hover:text-[var(--secondary-500)] hover:translate-x-2 transition-all block">
                                    &gt; DOCS_V2
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-[var(--text-muted)] hover:text-[var(--secondary-500)] hover:translate-x-2 transition-all block">
                                    &gt; API_STATUS
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-[var(--text-muted)] hover:text-[var(--secondary-500)] hover:translate-x-2 transition-all block">
                                    &gt; FREQ_PLAN
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Glitch Callsign Area */}
                    <div>
                        <div className="p-4 bg-black/40 border border-[var(--border-default)] rounded-lg text-center relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-full h-1 bg-[var(--primary-500)]/20" />
                            <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-widest mb-1">
                                OPERATÖR ÇAĞRI İŞARETİ
                            </p>
                            <div className="text-3xl font-black font-mono text-[var(--primary-500)] tracking-widest animate-glitch cursor-default select-none opacity-80 group-hover:opacity-100">
                                TA1XXX
                            </div>
                            <div className="mt-2 text-[10px] text-[var(--success)] flex items-center justify-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[var(--success)] animate-pulse" />
                                SİNYAL AKTİF
                            </div>
                        </div>
                    </div>

                </div>

                {/* Separator */}
                <div className="hud-separator mb-8 opacity-30" />

                {/* Bottom bar */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[var(--text-muted)] font-mono">
                    <p>
                        © {currentYear} TA RADIO PORTAL // SYSTEM VERSION 2.0.4
                    </p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white transition-colors">GİZLİLİK_PROTOKOLÜ</a>
                        <a href="#" className="hover:text-white transition-colors">KULLANIM_ŞARTLARI</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
