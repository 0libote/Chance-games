import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import { ConfettiEffect } from '../ConfettiEffect';

export function FortuneCookie({ onResult }) {
    const [isOpen, setIsOpen] = useState(false);
    const [fortune, setFortune] = useState('');
    const [isCracking, setIsCracking] = useState(false);
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
            setFortune('');
            setShowConfetti(false);
            return;
        }

        const newFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
        setFortune(newFortune);
        setIsCracking(true);

        // Shake and crack animation sequence
        setTimeout(() => {
            setIsCracking(false);
            setIsOpen(true);
            setShowConfetti(true);
        }, 600);

        if (onResult) onResult(newFortune);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-full py-8 w-full">
            <ConfettiEffect trigger={showConfetti} duration={2000} />

            <div className="relative h-72 w-full flex items-center justify-center mb-8">
                <AnimatePresence mode="wait">
                    {!isOpen ? (
                        <motion.button
                            key="cookie-closed"
                            initial={{ scale: 0, rotate: -180, opacity: 0 }}
                            animate={isCracking ? {
                                x: [-2, 2, -2, 2, 0],
                                rotate: [0, -1, 1, -1, 0],
                                scale: [1, 1.02, 0.98, 1.02, 1]
                            } : {
                                scale: 1,
                                rotate: 0,
                                opacity: 1
                            }}
                            exit={{ scale: 1.1, opacity: 0 }}
                            whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
                            transition={{ duration: isCracking ? 0.3 : 0.5 }}
                            onClick={openCookie}
                            disabled={isCracking}
                            className="relative group cursor-pointer focus:outline-none"
                        >
                            {/* Realistic SVG Cookie */}
                            <svg width="240" height="240" viewBox="0 0 200 200" className="drop-shadow-2xl">
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

                            <span className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 text-sm font-bold text-amber-600 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap tracking-wider uppercase bg-white/80 px-3 py-1 rounded-full shadow-sm backdrop-blur-sm">
                                {isCracking ? 'CRACKING...' : 'CLICK TO OPEN'}
                            </span>
                        </motion.button>
                    ) : (
                        <div key="cookie-opened" className="relative w-full max-w-md flex items-center justify-center h-full">
                            {/* Left Half */}
                            <motion.div
                                initial={{ x: 0, rotate: 0, opacity: 0 }}
                                animate={{ x: -90, rotate: -25, opacity: 1 }}
                                transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
                                className="absolute z-20"
                            >
                                <svg width="120" height="240" viewBox="0 0 100 200" className="drop-shadow-xl">
                                    <path
                                        d="M100,40 C60,40 30,70 30,110 C30,150 60,170 100,170 L100,40 Z"
                                        fill="url(#cookieGradient)"
                                        filter="url(#noise)"
                                    />
                                </svg>
                            </motion.div>

                            {/* Right Half */}
                            <motion.div
                                initial={{ x: 0, rotate: 0, opacity: 0 }}
                                animate={{ x: 90, rotate: 25, opacity: 1 }}
                                transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
                                className="absolute z-20"
                            >
                                <svg width="120" height="240" viewBox="0 0 100 200" className="drop-shadow-xl">
                                    <path
                                        d="M0,40 C40,40 70,70 70,110 C70,150 40,170 0,170 L0,40 Z"
                                        fill="url(#cookieGradient)"
                                        filter="url(#noise)"
                                    />
                                </svg>
                            </motion.div>

                            {/* Crumbs */}
                            {[...Array(8)].map((_, i) => (
                                <motion.div
                                    key={`crumb-${i}`}
                                    className="absolute w-2 h-2 bg-amber-600 rounded-full"
                                    initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
                                    animate={{
                                        opacity: 0,
                                        scale: 0,
                                        x: (Math.random() - 0.5) * 150,
                                        y: (Math.random() - 0.5) * 100 + 80,
                                        rotate: Math.random() * 360
                                    }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                />
                            ))}

                            {/* Fortune Paper */}
                            <motion.div
                                initial={{ scale: 0.2, opacity: 0, rotateX: 90 }}
                                animate={{ scale: 1, opacity: 1, rotateX: 0 }}
                                transition={{ delay: 0.3, duration: 0.8, type: "spring", stiffness: 100 }}
                                className="relative z-10 bg-[#fffdf5] p-8 max-w-[280px] shadow-2xl transform rotate-1 border border-slate-200"
                                style={{
                                    boxShadow: '0 10px 30px -5px rgba(0,0,0,0.2)',
                                    transformOrigin: 'top center'
                                }}
                            >
                                {/* Paper texture */}
                                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/paper.png')] mix-blend-multiply"></div>

                                <div className="absolute top-0 left-0 w-full h-1 bg-red-500/10" />
                                <div className="absolute bottom-0 left-0 w-full h-1 bg-red-500/10" />

                                <div className="relative z-10">
                                    <p className="text-slate-800 font-serif text-lg text-center italic leading-relaxed mb-6">
                                        "{fortune}"
                                    </p>

                                    <div className="flex justify-center flex-wrap gap-2 border-t border-slate-100 pt-4">
                                        <span className="text-[10px] text-slate-400 uppercase tracking-widest w-full text-center mb-1">Lucky Numbers</span>
                                        {[...Array(6)].map((_, i) => (
                                            <span key={i} className="w-7 h-7 rounded-full bg-red-50 text-red-600 flex items-center justify-center text-xs font-bold font-mono border border-red-100">
                                                {Math.floor(Math.random() * 99) + 1}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>

            <button
                onClick={openCookie}
                className={cn(
                    "px-10 py-4 rounded-full font-display font-bold text-lg tracking-wider transition-all duration-200 shadow-lg",
                    isOpen
                        ? "bg-secondary text-muted-foreground hover:bg-secondary/80 shadow-none"
                        : "bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] shadow-primary/25"
                )}
            >
                {isOpen ? 'GET ANOTHER COOKIE' : 'OPEN COOKIE'}
            </button>
        </div>
    );
}
