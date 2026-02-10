"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, useRouter, usePathname } from "@/i18n/routing";

export default function Navbar() {
    const t = useTranslations("Navigation");
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Scroll detection for backdrop blur effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Language switcher handler
    const handleLanguageSwitch = (newLocale: "tr" | "en") => {
        router.replace(pathname, { locale: newLocale });
    };

    const navItems = [
        { key: "home", href: "/" },
        { key: "atlas", href: "/atlas" },
        { key: "atolye", href: "/atolye" },
        { key: "akademi", href: "/akademi" },
    ];

    return (
        <header
            className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-500 ease-out
        ${isScrolled
                    ? "py-3 nav-blur border-b border-[var(--border-subtle)]"
                    : "py-6 bg-transparent"
                }
      `}
        >
            <div className="container-wide">
                <nav className="flex items-center justify-between">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="group flex items-center gap-3"
                    >
                        {/* HUD Logo Mark */}
                        <div className="relative w-10 h-10 flex items-center justify-center">
                            {/* Outer ring */}
                            <div className="absolute inset-0 border-2 border-[var(--primary-500)] rotate-45 transition-transform duration-300 group-hover:rotate-[135deg]" />
                            {/* Inner symbol */}
                            <span className="font-mono text-lg font-bold text-[var(--primary-500)] text-glow">
                                TA
                            </span>
                        </div>

                        {/* Logo Text */}
                        <div className="hidden sm:block">
                            <span className="block text-xs tracking-[0.3em] text-[var(--text-muted)] uppercase">
                                Radio Portal
                            </span>
                            <span className="block text-sm tracking-widest text-[var(--primary-500)] font-semibold uppercase">
                                AMATÖR TELSİZCİLİK
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.key}
                                    href={item.href}
                                    className={`nav-link relative px-4 py-2 transition-all duration-300 ${isActive
                                            ? "text-[var(--primary-500)] text-shadow-glow"
                                            : "text-[var(--text-muted)] hover:text-white"
                                        }`}
                                >
                                    {t(item.key)}
                                    {isActive && (
                                        <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--primary-500)] shadow-[0_0_10px_var(--primary-500)] animate-pulse" />
                                    )}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Right Section: Language Switcher + Mobile Toggle */}
                    <div className="flex items-center gap-4">
                        {/* Language Switcher */}
                        <div className="flex items-center gap-1 p-1 border border-[var(--border-default)] rounded">
                            <button
                                onClick={() => handleLanguageSwitch("tr")}
                                className={`
                  px-3 py-1.5 text-xs font-semibold tracking-wider uppercase
                  transition-all duration-300
                  ${locale === "tr"
                                        ? "bg-[var(--primary-500)] text-[var(--bg-void)]"
                                        : "text-[var(--text-muted)] hover:text-[var(--primary-500)]"
                                    }
                `}
                                aria-label="Türkçe"
                            >
                                TR
                            </button>
                            <button
                                onClick={() => handleLanguageSwitch("en")}
                                className={`
                  px-3 py-1.5 text-xs font-semibold tracking-wider uppercase
                  transition-all duration-300
                  ${locale === "en"
                                        ? "bg-[var(--primary-500)] text-[var(--bg-void)]"
                                        : "text-[var(--text-muted)] hover:text-[var(--primary-500)]"
                                    }
                `}
                                aria-label="English"
                            >
                                EN
                            </button>
                        </div>

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
                            aria-label="Toggle menu"
                        >
                            <span
                                className={`
                  block w-6 h-0.5 bg-[var(--primary-500)] transition-transform duration-300
                  ${isMobileMenuOpen ? "rotate-45 translate-y-2" : ""}
                `}
                            />
                            <span
                                className={`
                  block w-6 h-0.5 bg-[var(--primary-500)] transition-opacity duration-300
                  ${isMobileMenuOpen ? "opacity-0" : ""}
                `}
                            />
                            <span
                                className={`
                  block w-6 h-0.5 bg-[var(--primary-500)] transition-transform duration-300
                  ${isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}
                `}
                            />
                        </button>
                    </div>
                </nav>

                {/* Mobile Menu */}
                <div
                    className={`
            md:hidden overflow-hidden transition-all duration-500
            ${isMobileMenuOpen ? "max-h-80 mt-6" : "max-h-0"}
          `}
                >
                    <div className="glass-panel p-6 space-y-4">
                        {navItems.map((item) => (
                            <Link
                                key={item.key}
                                href={item.href}
                                className="block nav-link text-center"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {t(item.key)}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </header>
    );
}
