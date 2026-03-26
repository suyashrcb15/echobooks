"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const HeroSection = () => {
    const [scrollY, setScrollY] = useState(0);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [mounted, setMounted] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        setMounted(true);

        const handleScroll = () => setScrollY(window.scrollY);
        const handleMouse = (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 2;
            const y = (e.clientY / window.innerHeight - 0.5) * 2;
            setMousePos({ x, y });
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("mousemove", handleMouse);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("mousemove", handleMouse);
        };
    }, []);

    const parallaxY = scrollY * 0.35;
    const imgParallaxY = scrollY * 0.18;

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

                .hero-root {
                    font-family: 'DM Sans', sans-serif;
                }

                .hero-section {
                    position: relative;
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                    background: #0d0b0e;
                    padding: 6rem 1.5rem 4rem;
                }

                /* Animated gradient orbs */
                .orb {
                    position: absolute;
                    border-radius: 50%;
                    filter: blur(80px);
                    opacity: 0.55;
                    pointer-events: none;
                    animation: orbFloat 8s ease-in-out infinite;
                }
                .orb-1 {
                    width: 520px; height: 520px;
                    background: radial-gradient(circle, #c8a97e 0%, #8b5e3c 60%, transparent 100%);
                    top: -120px; left: -80px;
                    animation-delay: 0s;
                }
                .orb-2 {
                    width: 380px; height: 380px;
                    background: radial-gradient(circle, #e8d5b7 0%, #b8843f 60%, transparent 100%);
                    bottom: -60px; right: -60px;
                    animation-delay: -3s;
                    opacity: 0.35;
                }
                .orb-3 {
                    width: 260px; height: 260px;
                    background: radial-gradient(circle, #f0e6d3 0%, #c4956a 60%, transparent 100%);
                    top: 40%; left: 55%;
                    animation-delay: -5s;
                    opacity: 0.25;
                }
                @keyframes orbFloat {
                    0%, 100% { transform: translateY(0px) scale(1); }
                    50% { transform: translateY(-30px) scale(1.06); }
                }

                /* Noise grain overlay */
                .hero-section::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E");
                    opacity: 0.4;
                    pointer-events: none;
                    z-index: 1;
                }

                /* Subtle grid lines */
                .hero-section::after {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background-image:
                        linear-gradient(rgba(200,169,126,0.04) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(200,169,126,0.04) 1px, transparent 1px);
                    background-size: 60px 60px;
                    pointer-events: none;
                    z-index: 1;
                }

                .hero-inner {
                    position: relative;
                    z-index: 2;
                    max-width: 1180px;
                    width: 100%;
                    display: grid;
                    grid-template-columns: 1fr auto 1fr;
                    gap: 3rem;
                    align-items: center;
                }

                @media (max-width: 900px) {
                    .hero-inner {
                        grid-template-columns: 1fr;
                        text-align: center;
                    }
                }

                /* ── LEFT ── */
                .hero-left {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                    opacity: 0;
                    transform: translateX(-40px);
                    animation: slideInLeft 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards;
                }
                @keyframes slideInLeft {
                    to { opacity: 1; transform: translateX(0); }
                }

                .hero-eyebrow {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: #c8a97e;
                    font-size: 0.7rem;
                    font-weight: 500;
                    letter-spacing: 0.2em;
                    text-transform: uppercase;
                }
                .hero-eyebrow::before {
                    content: '';
                    display: block;
                    width: 28px;
                    height: 1px;
                    background: #c8a97e;
                }

                .hero-title {
                    font-family: 'Cormorant Garamond', serif;
                    font-size: clamp(3rem, 6vw, 5.2rem);
                    font-weight: 300;
                    line-height: 1.05;
                    color: #f5ede0;
                    letter-spacing: -0.02em;
                }
                .hero-title em {
                    font-style: italic;
                    color: #c8a97e;
                }

                .hero-desc {
                    color: #9c8a78;
                    font-size: 1rem;
                    line-height: 1.75;
                    max-width: 360px;
                    font-weight: 300;
                }

                .hero-cta {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.75rem;
                    background: linear-gradient(135deg, #c8a97e 0%, #a07850 100%);
                    color: #0d0b0e;
                    padding: 0.875rem 2rem;
                    border-radius: 2px;
                    font-size: 0.8rem;
                    font-weight: 500;
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                    text-decoration: none;
                    transition: all 0.3s ease;
                    width: fit-content;
                    position: relative;
                    overflow: hidden;
                }
                .hero-cta::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(135deg, #e8c89a 0%, #c8a97e 100%);
                    opacity: 0;
                    transition: opacity 0.3s;
                }
                .hero-cta:hover::before { opacity: 1; }
                .hero-cta:hover { transform: translateY(-2px); box-shadow: 0 12px 40px rgba(200,169,126,0.35); }
                .hero-cta span, .hero-cta svg { position: relative; z-index: 1; }

                /* ── CENTER IMAGE ── */
                .hero-center {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    opacity: 0;
                    animation: fadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.4s forwards;
                }
                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .image-frame {
                    position: relative;
                    width: 280px;
                    height: 280px;
                    transition: transform 0.1s ease-out;
                }

                /* Rotating ring */
                .ring {
                    position: absolute;
                    inset: -24px;
                    border-radius: 50%;
                    border: 1px solid rgba(200,169,126,0.2);
                    animation: ringRotate 20s linear infinite;
                }
                .ring::after {
                    content: '';
                    position: absolute;
                    top: -3px;
                    left: 50%;
                    width: 6px;
                    height: 6px;
                    background: #c8a97e;
                    border-radius: 50%;
                    transform: translateX(-50%);
                }
                @keyframes ringRotate {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }

                .ring-2 {
                    inset: -44px;
                    border-color: rgba(200,169,126,0.1);
                    animation-duration: 30s;
                    animation-direction: reverse;
                }
                .ring-2::after { display: none; }

                .image-glow {
                    position: absolute;
                    inset: -20px;
                    border-radius: 50%;
                    background: radial-gradient(circle, rgba(200,169,126,0.15) 0%, transparent 70%);
                    animation: glowPulse 4s ease-in-out infinite;
                }
                @keyframes glowPulse {
                    0%, 100% { opacity: 0.6; transform: scale(1); }
                    50% { opacity: 1; transform: scale(1.08); }
                }

                .image-wrap {
                    position: relative;
                    z-index: 2;
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    overflow: hidden;
                    background: radial-gradient(circle at 35% 30%, #2a1f12, #0d0b0e);
                    border: 1px solid rgba(200,169,126,0.25);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                /* ── RIGHT STEPS ── */
                .hero-right {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                    opacity: 0;
                    transform: translateX(40px);
                    animation: slideInRight 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards;
                }
                @keyframes slideInRight {
                    to { opacity: 1; transform: translateX(0); }
                }

                .steps-label {
                    color: #c8a97e;
                    font-size: 0.68rem;
                    letter-spacing: 0.2em;
                    text-transform: uppercase;
                    font-weight: 500;
                }

                .step-item {
                    display: flex;
                    align-items: flex-start;
                    gap: 1rem;
                    padding: 1.1rem 1.25rem;
                    background: rgba(255,255,255,0.025);
                    border: 1px solid rgba(200,169,126,0.1);
                    border-radius: 6px;
                    transition: all 0.3s ease;
                    cursor: default;
                    position: relative;
                    overflow: hidden;
                }
                .step-item::before {
                    content: '';
                    position: absolute;
                    left: 0;
                    top: 0;
                    bottom: 0;
                    width: 2px;
                    background: linear-gradient(to bottom, #c8a97e, #8b5e3c);
                    transform: scaleY(0);
                    transform-origin: top;
                    transition: transform 0.3s ease;
                }
                .step-item:hover { 
                    background: rgba(200,169,126,0.07); 
                    border-color: rgba(200,169,126,0.25);
                    transform: translateX(4px);
                }
                .step-item:hover::before { transform: scaleY(1); }

                .step-num {
                    width: 32px;
                    height: 32px;
                    flex-shrink: 0;
                    border-radius: 50%;
                    background: transparent;
                    border: 1px solid rgba(200,169,126,0.4);
                    color: #c8a97e;
                    font-family: 'Cormorant Garamond', serif;
                    font-size: 1rem;
                    font-weight: 600;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s ease;
                }
                .step-item:hover .step-num {
                    background: rgba(200,169,126,0.15);
                    border-color: #c8a97e;
                }

                .step-text {
                    color: #9c8a78;
                    font-size: 0.9rem;
                    line-height: 1.55;
                    font-weight: 300;
                    padding-top: 4px;
                }

                /* Stats row */
                .stats-row {
                    display: flex;
                    gap: 1.5rem;
                    padding-top: 0.5rem;
                    border-top: 1px solid rgba(200,169,126,0.1);
                    margin-top: 0.5rem;
                }
                .stat-item {
                    display: flex;
                    flex-direction: column;
                    gap: 2px;
                }
                .stat-num {
                    font-family: 'Cormorant Garamond', serif;
                    font-size: 1.5rem;
                    font-weight: 600;
                    color: #c8a97e;
                }
                .stat-label {
                    font-size: 0.65rem;
                    color: #6b5c50;
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                }

                /* Scroll indicator */
                .scroll-hint {
                    position: absolute;
                    bottom: 2rem;
                    left: 50%;
                    transform: translateX(-50%);
                    z-index: 2;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 0.5rem;
                    opacity: 0;
                    animation: fadeUp 1s ease 1.2s forwards;
                }
                .scroll-line {
                    width: 1px;
                    height: 40px;
                    background: linear-gradient(to bottom, rgba(200,169,126,0.6), transparent);
                    animation: scrollDrop 2s ease-in-out infinite;
                }
                @keyframes scrollDrop {
                    0% { transform: scaleY(0); transform-origin: top; }
                    50% { transform: scaleY(1); transform-origin: top; }
                    51% { transform: scaleY(1); transform-origin: bottom; }
                    100% { transform: scaleY(0); transform-origin: bottom; }
                }
                .scroll-text {
                    font-size: 0.6rem;
                    color: #6b5c50;
                    letter-spacing: 0.2em;
                    text-transform: uppercase;
                }
            `}</style>

            <div className="hero-root">
                <section className="hero-section" ref={sectionRef}>
                    {/* Background Orbs */}
                    <div
                        className="orb orb-1"
                        style={mounted ? { transform: `translate(${mousePos.x * -18}px, ${mousePos.y * -18 + parallaxY * 0.4}px)` } : {}}
                    />
                    <div
                        className="orb orb-2"
                        style={mounted ? { transform: `translate(${mousePos.x * 12}px, ${mousePos.y * 12 + parallaxY * 0.2}px)` } : {}}
                    />
                    <div
                        className="orb orb-3"
                        style={mounted ? { transform: `translate(${mousePos.x * -8}px, ${mousePos.y * -8}px)` } : {}}
                    />

                    <div className="hero-inner">

                        {/* LEFT */}
                        <div
                            className="hero-left"
                            style={mounted ? { transform: `translateY(${-parallaxY * 0.25}px)` } : {}}
                        >
                            <span className="hero-eyebrow">Personal Library</span>

                            <h1 className="hero-title">
                                Your <em>literary</em><br />
                                universe,<br />
                                curated.
                            </h1>

                            <p className="hero-desc">
                                Organize, explore, and rediscover your favorite books.
                                A refined space built for readers who take their collections seriously.
                            </p>

                            <Link href="/books/new" className="hero-cta">
                                <span>Add New Book</span>
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                    <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </Link>

                            <div className="stats-row">
                                <div className="stat-item">
                                    <span className="stat-num">∞</span>
                                    <span className="stat-label">Books</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-num">1</span>
                                    <span className="stat-label">Library</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-num">You</span>
                                    <span className="stat-label">Curator</span>
                                </div>
                            </div>
                        </div>

                        {/* CENTER */}
                        <div className="hero-center">
                            <div
                                className="image-frame"
                                style={mounted ? {
                                    transform: `translate(${mousePos.x * 10}px, ${mousePos.y * 10 - imgParallaxY}px)`
                                } : {}}
                            >
                                <div className="ring" />
                                <div className="ring ring-2" />
                                <div className="image-glow" />
                                <div className="image-wrap">
                                    <Image
                                        src="/assets/vedic.png"
                                        alt="Vintage books and globe"
                                        width={240}
                                        height={240}
                                        className="object-contain"
                                        style={{ transform: 'scale(1.05)' }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* RIGHT */}
                        <div
                            className="hero-right"
                            style={mounted ? { transform: `translateY(${-parallaxY * 0.15}px)` } : {}}
                        >
                            <span className="steps-label">How it works</span>

                            <div className="step-item">
                                <span className="step-num">1</span>
                                <p className="step-text">Add books to your personal library with rich metadata and covers</p>
                            </div>

                            <div className="step-item">
                                <span className="step-num">2</span>
                                <p className="step-text">Organize your collection by genre, author, or reading status</p>
                            </div>

                            <div className="step-item">
                                <span className="step-num">3</span>
                                <p className="step-text">Discover patterns and revisit your most beloved reads</p>
                            </div>
                        </div>

                    </div>

                    {/* Scroll hint */}
                    <div className="scroll-hint">
                        <span className="scroll-text">Scroll</span>
                        <div className="scroll-line" />
                    </div>
                </section>
            </div>
        </>
    );
};

export default HeroSection;
