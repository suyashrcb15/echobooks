"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { SignInButton, UserButton, Show, useUser } from "@clerk/nextjs";

const navItems = [
    { label: "Library", href: "/" },
    { label: "Add New", href: "/books/new" },
];

const Navbar = () => {
    const pathName = usePathname();
    const { user } = useUser();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600&family=DM+Sans:wght@300;400;500&display=swap');

                .nb-root * { box-sizing: border-box; }

                .nb-header {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    z-index: 9999;
                    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                    font-family: 'DM Sans', sans-serif;
                    pointer-events: all;
                }

                .nb-header.scrolled {
                    padding: 0 1.5rem;
                }

                .nb-inner {
                    max-width: 1180px;
                    margin: 0 auto;
                    padding: 1.25rem 1.5rem;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    transition: all 0.4s ease;
                    border-bottom: 1px solid transparent;
                }

                .nb-header.scrolled .nb-inner {
                    padding: 0.875rem 2rem;
                    background: rgba(13, 11, 14, 0.92);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    border-bottom-color: rgba(200, 169, 126, 0.1);
                    border-radius: 0 0 12px 12px;
                    max-width: 1100px;
                    margin: 0 auto;
                    box-shadow: 0 8px 32px rgba(0,0,0,0.4);
                }

                /* LOGO */
                .nb-logo {
                    display: flex;
                    align-items: center;
                    gap: 0.6rem;
                    text-decoration: none;
                    cursor: pointer;
                    pointer-events: all;
                    z-index: 60;
                }
                .nb-logo-img {
                    position: relative;
                    transition: transform 0.3s ease;
                }
                .nb-logo:hover .nb-logo-img {
                    transform: rotate(-5deg) scale(1.05);
                }
                .nb-logo-text {
                    font-family: 'Cormorant Garamond', serif;
                    font-size: 1.4rem;
                    font-weight: 600;
                    color: #f5ede0;
                    letter-spacing: 0.02em;
                    line-height: 1;
                }
                .nb-logo-text span {
                    color: #c8a97e;
                }

                /* NAV LINKS */
                .nb-nav {
                    display: flex;
                    align-items: center;
                    gap: 0.25rem;
                    pointer-events: all;
                    z-index: 60;
                }

                .nb-link {
                    position: relative;
                    padding: 0.4rem 0.9rem;
                    font-size: 0.8rem;
                    font-weight: 400;
                    letter-spacing: 0.08em;
                    text-transform: uppercase;
                    text-decoration: none;
                    color: #9c8a78;
                    border-radius: 3px;
                    cursor: pointer;
                    display: inline-block;
                    pointer-events: all;
                    transition: color 0.25s ease, background 0.25s ease;
                    z-index: 60;
                }
                .nb-link:hover {
                    color: #e8d5b7;
                    background: rgba(200,169,126,0.08);
                    cursor: pointer;
                }

                .nb-link.active {
                    color: #c8a97e;
                }
                .nb-link.active::after {
                    content: '';
                    position: absolute;
                    bottom: 3px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 18px;
                    height: 1px;
                    background: #c8a97e;
                    border-radius: 1px;
                }

                /* DIVIDER */
                .nb-divider {
                    width: 1px;
                    height: 20px;
                    background: rgba(200,169,126,0.2);
                    margin: 0 0.75rem;
                }

                /* RIGHT ACTIONS */
                .nb-actions {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    pointer-events: all;
                    z-index: 60;
                }

                /* Sign In button */
                .nb-signin {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.5rem 1.25rem;
                    background: linear-gradient(135deg, #c8a97e 0%, #a07850 100%);
                    color: #0d0b0e;
                    font-size: 0.75rem;
                    font-weight: 500;
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                    border: none;
                    border-radius: 2px;
                    cursor: pointer;
                    font-family: 'DM Sans', sans-serif;
                    transition: all 0.3s ease;
                    position: relative;
                    overflow: hidden;
                }
                .nb-signin::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(135deg, #e8c89a 0%, #c8a97e 100%);
                    opacity: 0;
                    transition: opacity 0.3s;
                }
                .nb-signin:hover { 
                    transform: translateY(-1px); 
                    box-shadow: 0 6px 20px rgba(200,169,126,0.3);
                }
                .nb-signin:hover::before { opacity: 1; }
                .nb-signin > * { position: relative; z-index: 1; }

                /* User area */
                .nb-user {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                }
                .nb-user-name {
                    font-size: 0.78rem;
                    color: #9c8a78;
                    font-weight: 400;
                    text-decoration: none;
                    letter-spacing: 0.05em;
                    transition: color 0.2s;
                    border-bottom: 1px solid transparent;
                    padding-bottom: 1px;
                }
                .nb-user-name:hover {
                    color: #c8a97e;
                    border-bottom-color: rgba(200,169,126,0.4);
                }

                /* Mobile hamburger */
                .nb-hamburger {
                    display: none;
                    flex-direction: column;
                    gap: 5px;
                    cursor: pointer;
                    padding: 4px;
                    background: none;
                    border: none;
                }
                .nb-hamburger span {
                    display: block;
                    height: 1px;
                    background: #c8a97e;
                    transition: all 0.3s ease;
                    transform-origin: center;
                }
                .nb-hamburger span:nth-child(1) { width: 22px; }
                .nb-hamburger span:nth-child(2) { width: 16px; }
                .nb-hamburger span:nth-child(3) { width: 22px; }
                .nb-hamburger.open span:nth-child(1) { width: 20px; transform: translateY(6px) rotate(45deg); }
                .nb-hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
                .nb-hamburger.open span:nth-child(3) { width: 20px; transform: translateY(-6px) rotate(-45deg); }

                /* Mobile menu */
                .nb-mobile-menu {
                    display: none;
                    position: fixed;
                    top: 0; left: 0; right: 0; bottom: 0;
                    background: rgba(13,11,14,0.97);
                    z-index: 49;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    gap: 2rem;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }
                .nb-mobile-menu.open {
                    display: flex;
                    opacity: 1;
                }
                .nb-mobile-link {
                    font-family: 'Cormorant Garamond', serif;
                    font-size: 2.5rem;
                    font-weight: 300;
                    color: #9c8a78;
                    text-decoration: none;
                    letter-spacing: 0.05em;
                    transition: color 0.2s;
                }
                .nb-mobile-link:hover, .nb-mobile-link.active {
                    color: #c8a97e;
                }

                @media (max-width: 680px) {
                    .nb-nav, .nb-divider { display: none; }
                    .nb-hamburger { display: flex; }
                }

                @keyframes nbFadeIn {
                    from { opacity: 0; transform: translateY(-8px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>

            <div className="nb-root">
                <header className={cn("nb-header", scrolled && "scrolled")}>
                    <div className="nb-inner">

                        {/* Logo */}
                        <Link href="/" className="nb-logo">
                            <div className="nb-logo-img">
                                <Image src="/assets/l.png" alt="EchoBooks" width={38} height={28} />
                            </div>
                            <span className="nb-logo-text">Echo<span>Books</span></span>
                        </Link>

                        {/* Nav Links */}
                        <nav className="nb-nav">
                            {navItems.map(({ label, href }) => {
                                const isActive = pathName === href || (href !== "/" && pathName.startsWith(href));
                                return (
                                    <Link
                                        key={label}
                                        href={href}
                                        className="nb-link"
                                        style={isActive ? {
                                            color: "#c8a97e",
                                            borderBottom: "1px solid #c8a97e",
                                            paddingBottom: "2px",
                                        } : {}}
                                    >
                                        {label}
                                    </Link>
                                );
                            })}
                        </nav>

                        {/* Right actions */}
                        <div className="nb-actions">
                            <Show when="signed-out">
                                <SignInButton mode="modal">
                                    <button className="nb-signin">Sign In</button>
                                </SignInButton>
                            </Show>

                            <Show when="signed-in">
                                <div className="nb-user">
                                    <UserButton />
                                    {user?.firstName && (
                                        <Link href="/subscriptions" className="nb-user-name">
                                            {user.firstName}
                                        </Link>
                                    )}
                                </div>
                            </Show>

                            {/* Mobile hamburger */}
                            <button
                                className={cn("nb-hamburger", menuOpen && "open")}
                                onClick={() => setMenuOpen(!menuOpen)}
                                aria-label="Toggle menu"
                            >
                                <span />
                                <span />
                                <span />
                            </button>
                        </div>

                    </div>
                </header>

                {/* Mobile full-screen menu */}
                <div className={cn("nb-mobile-menu", menuOpen && "open")}>
                    {navItems.map(({ label, href }) => {
                        const isActive = pathName === href || (href !== "/" && pathName.startsWith(href));
                        return (
                            <Link
                                key={label}
                                href={href}
                                className="nb-mobile-link"
                                style={isActive ? { color: "#c8a97e" } : {}}
                                onClick={() => setMenuOpen(false)}
                            >
                                {label}
                            </Link>
                        );
                    })}
                    <Show when="signed-out">
                        <SignInButton mode="modal">
                            <button className="nb-signin" onClick={() => setMenuOpen(false)}>
                                Sign In
                            </button>
                        </SignInButton>
                    </Show>
                </div>
            </div>
        </>
    );
};

export default Navbar;
