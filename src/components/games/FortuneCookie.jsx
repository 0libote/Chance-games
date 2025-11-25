import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import { ConfettiEffect } from '../ConfettiEffect';

export function FortuneCookie({ onResult }) {
    const [isOpen, setIsOpen] = useState(false);
    const [fortune, setFortune] = useState('');
    const [isOpening, setIsOpening] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);

    const fortunes = [
        'A beautiful, smart, and loving person will be coming into your life.',
        'A dubious friend may be an enemy in camouflage.',
        'A faithful friend is a strong defense.',
        'A fresh start will put you on your way.',
        'A friend asks only for your time not your money.',
        'A friend is a present you give yourself.',
        'A golden egg of opportunity falls into your lap this month.',
        'A good friendship is often more important than a passionate romance.',
        'A hunch is creativity trying to tell you something.',
        'A lifetime friend shall soon be made.',
        'A light heart carries you through all the hard times.',
        'A new perspective will come with the new year.',
        'A pleasant surprise is waiting for you.',
        'A smile is your personal welcome mat.',
        'A smooth long journey! Great expectations.',
        'Advice is like kissing. It costs nothing and is a pleasant thing to do.'
    ];

    const openCookie = () => {
        if (isOpen) {
            setIsOpen(false);
            setIsOpening(false);
            setFortune('');
            setShowConfetti(false);
            return;
        }

        const newFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
        setFortune(newFortune);
        setIsOpening(true);

        // Cookie cracks open, then paper appears
        setTimeout(() => {
            setIsOpen(true);
            setShowConfetti(true);
        }, 300);

        if (onResult) onResult(newFortune);
    };

    return (
        <div className="flex flex-col items-center justify-center h-full py-8">
            <ConfettiEffect trigger={showConfetti} duration={2000} />

            <div className="relative h-64 w-full flex items-center justify-center mb-12">
                <AnimatePresence mode="wait">
                    {!isOpening ? (
                        <motion.button
                            key="cookie-closed"
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
                            transition={{ duration: 0.4, type: "spring" }}
                            onClick={openCookie}
                            className="relative group cursor-pointer"
                        >
                            {/* Realistic SVG Cookie */}
                            <svg width="200" height="200" viewBox="0 0 200 200" className="drop-shadow-2xl">
                                <defs>
                                    <linearGradient id="cookieGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#fcd34d" />
                                        <stop offset="50%" stopColor="#fbbf24" />
                                        <stop offset="100%" stopColor="#d97706" />
                                    </linearGradient>
                                    <filter id="noise" x="0%" y="0%" width="100%" height="100%">
                                        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" result="noise" />
                                        <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.1 0" in="noise" result="coloredNoise" />
                                        <feComposite operator="in" in="coloredNoise" in2="SourceGraphic" result="composite" />
                                        <feBlend mode="multiply" in="composite" in2="SourceGraphic" />
                                    </filter>
                                </defs>
                                <path
                                    d="M100,40 C60,40 30,70 30,110 C30,150 60,170 100,170 C140,170 170,150 170,110 C170,70 140,40 100,40 Z"
                                    fill="url(#cookieGradient)"
                                    filter="url(#noise)"
                                />
                                <path
                                    d="M30,110 Q100,140 170,110"
                                    fill="none"
                                    stroke="#b45309"
                                    strokeWidth="3"
                                    opacity="0.3"
                                />
                                <path
                                    d="M100,40 Q70,100 100,170"
                                    fill="none"
                                    stroke="#b45309"
                                    strokeWidth="2"
                                    opacity="0.2"
                                />
                            </svg>

                            <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-bold text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap tracking-wider uppercase">
                                Click to Crack Open
                            </span>
                        </motion.button>
                    ) : (
                        <div key="cookie-opened" className="relative w-full max-w-md flex items-center justify-center">
                            {/* Left Half */}
                            <motion.div
                                initial={{ x: 0, rotate: 0 }}
                                animate={{ x: -80, rotate: -25 }}
                                transition={{ duration: 0.5, type: "spring" }}
                                className="absolute z-20"
                            >
                                <svg width="100" height="200" viewBox="0 0 100 200" className="drop-shadow-xl">
                                    <path
                                        d="M100,40 C60,40 30,70 30,110 C30,150 60,170 100,170 L100,40 Z"
                                        fill="url(#cookieGradient)"
                                        filter="url(#noise)"
                                    />
                                </svg>
                            </motion.div>

                            {/* Right Half */}
                            <motion.div
                                initial={{ x: 0, rotate: 0 }}
                                animate={{ x: 80, rotate: 25 }}
                                transition={{ duration: 0.5, type: "spring" }}
                                className="absolute z-20"
                            >
                                <svg width="100" height="200" viewBox="0 0 100 200" className="drop-shadow-xl">
                                    <path
                                        d="M0,40 C40,40 70,70 70,110 C70,150 40,170 0,170 L0,40 Z"
                                        fill="url(#cookieGradient)"
                                        filter="url(#noise)"
                                    />
                                </svg>
                            </motion.div>

                            {/* Crumbs */}
                            {isOpen && [1, 2, 3, 4, 5].map((i) => (
                                <motion.div
                                    key={`crumb-${i}`}
                                    className="absolute w-2 h-2 bg-amber-600 rounded-full"
                                    initial={{ opacity: 1, scale: 0 }}
                                    animate={{
                                        opacity: 0,
                                        scale: 1,
                                        x: (Math.random() - 0.5) * 100,
                                        y: (Math.random() - 0.5) * 100 + 50
                                    }}
                                    transition={{ duration: 0.8 }}
                                />
                            ))}

                            {/* Fortune Paper */}
                            {isOpen && (
                                <motion.div
                                    initial={{ scale: 0.2, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
                                    className="relative z-10 bg-[#fffdf5] p-6 sm:p-8 max-w-xs shadow-2xl transform -rotate-1"
                                    style={{
                                        backgroundImage: 'linear-gradient(#e5e7eb 1px, transparent 1px)',
                                        backgroundSize: '100% 24px'
                                    }}
                                >
                                    <div className="absolute top-0 left-0 w-full h-full border-l-4 border-red-500/20" />
                                    <p className="text-slate-800 font-serif text-lg sm:text-xl text-center italic leading-relaxed mb-4">
                                        "{fortune}"
                                    </p>
                                    <div className="flex justify-center gap-2 border-t border-slate-200 pt-3">
                                        {[1, 2, 3, 4, 5, 6].map(n => (
                                            <span key={n} className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs font-bold font-mono">
                                                {Math.floor(Math.random() * 99)}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    )}
                </AnimatePresence>
            </div>

            <button
                onClick={openCookie}
                className={cn(
                    "px-10 py-4 rounded-full font-display font-bold text-lg tracking-wider transition-all duration-300",
                    isOpen
                        ? "bg-secondary text-muted-foreground hover:bg-secondary/80"
                        : "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-[0_0_30px_-5px_hsl(var(--primary)/0.5)] hover:shadow-[0_0_50px_-5px_hsl(var(--primary)/0.7)] hover:scale-105 active:scale-95"
                )}
            >
                {isOpen ? 'GET ANOTHER COOKIE' : 'OPEN COOKIE'}
            </button>
        </div>
    );
}
