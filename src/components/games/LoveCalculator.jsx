import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import { Heart } from 'lucide-react';
import { ConfettiEffect } from '../ConfettiEffect';

export function LoveCalculator({ onResult }) {
    const [isCalculating, setIsCalculating] = useState(false);
    const [score, setScore] = useState(null);
    const [message, setMessage] = useState('');
    const [showConfetti, setShowConfetti] = useState(false);

    const messages = [
        'Destined to meet someone special!',
        'Love is right around the corner.',
        'Your heart is open to possibilities.',
        'True love starts with self-love.',
        'Romance is in the air.',
        'Someone is thinking of you.',
        'Love grows through giving.',
        'Kindness returns tenfold.',
        'A meaningful relationship awaits.',
        'Love conquers all obstacles.'
    ];

    const calculateLove = () => {
        if (isCalculating) return;
        setIsCalculating(true);
        setScore(0);
        setMessage('');
        setShowConfetti(false);

        const targetScore = Math.floor(Math.random() * 41) + 60; // 60-100%

        // Animate score
        let current = 0;
        const interval = setInterval(() => {
            if (current >= targetScore) {
                clearInterval(interval);
                setScore(targetScore);
                const msg = messages[Math.floor(Math.random() * messages.length)];
                setMessage(msg);
                setIsCalculating(false);
                setShowConfetti(true);
                if (onResult) onResult(`${targetScore}% - ${msg}`);
                return;
            }
            current += 1;
            setScore(current);
        }, 20);
    };

    return (
        <div className="flex flex-col items-center justify-center h-full py-8 relative overflow-hidden">
            <ConfettiEffect trigger={showConfetti} duration={3000} />

            {/* Floating heart particles background */}
            {[...Array(15)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute text-pink-500/10 pointer-events-none"
                    initial={{
                        x: Math.random() * 100 + "%",
                        y: "110%",
                        scale: Math.random() * 0.5 + 0.5,
                        rotate: Math.random() * 360
                    }}
                    animate={{
                        y: "-10%",
                        rotate: Math.random() * 360
                    }}
                    transition={{
                        duration: Math.random() * 10 + 10,
                        repeat: Infinity,
                        delay: Math.random() * 10,
                        ease: "linear"
                    }}
                >
                    <Heart size={Math.random() * 30 + 20} fill="currentColor" />
                </motion.div>
            ))}

            <div className="relative w-64 h-64 mb-12 flex items-center justify-center z-10">
                {/* Main Heart Container */}
                <div className="relative w-full h-full drop-shadow-[0_10px_20px_rgba(236,72,153,0.3)]">
                    {/* Background Heart (Empty) */}
                    <Heart
                        className="w-full h-full text-pink-900/20"
                        strokeWidth={1}
                    />

                    {/* Filling Heart (Liquid Effect) */}
                    <div className="absolute inset-0 overflow-hidden" style={{ clipPath: 'url(#heart-clip)' }}>
                        <motion.div
                            className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-pink-600 to-rose-500"
                            style={{ height: `${score || 0}%` }}
                            transition={{ type: "spring", stiffness: 50 }}
                        >
                            {/* Wave effect on top of liquid */}
                            <motion.div
                                className="absolute -top-4 left-0 w-[200%] h-8 bg-white/20 rounded-[50%]"
                                animate={{ x: ["-50%", "0%"] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            />
                        </motion.div>
                    </div>

                    {/* Outline Heart */}
                    <Heart
                        className="absolute inset-0 w-full h-full text-pink-500/50"
                        strokeWidth={2}
                    />

                    {/* Clip Path Definition */}
                    <svg width="0" height="0">
                        <defs>
                            <clipPath id="heart-clip" clipPathUnits="objectBoundingBox">
                                <path d="M0.5,0.18 C0.5,0.18 0.15,-0.15 0,0.25 C-0.15,0.65 0.5,1 0.5,1 C0.5,1 1.15,0.65 1,0.25 C0.85,-0.15 0.5,0.18 0.5,0.18" transform="scale(0.8, 0.8) translate(0.125, 0.1)" />
                                {/* Note: SVG path for heart is complex to map perfectly to Lucide icon without exact path data. 
                                    Using a simplified approximation or just masking with the icon itself if possible.
                                    Actually, better approach for perfect match: Use the SVG as a mask.
                                */}
                            </clipPath>
                        </defs>
                    </svg>

                    {/* Alternative Fill Strategy: Mask Image */}
                    <div
                        className="absolute inset-0 bg-gradient-to-t from-pink-600 to-rose-500 transition-all duration-100"
                        style={{
                            height: `${score || 0}%`,
                            maskImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="black" stroke="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>')`,
                            maskSize: 'contain',
                            maskRepeat: 'no-repeat',
                            maskPosition: 'center',
                            WebkitMaskImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="black" stroke="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>')`,
                            WebkitMaskSize: 'contain',
                            WebkitMaskRepeat: 'no-repeat',
                            WebkitMaskPosition: 'center',
                            bottom: 0
                        }}
                    />
                </div>

                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <motion.span
                        className="text-5xl sm:text-6xl font-display font-black text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]"
                        animate={score !== null && score > 0 ? { scale: [1.2, 1] } : {}}
                        transition={{ duration: 0.3 }}
                    >
                        {score !== null ? `${score}%` : '?'}
                    </motion.span>
                </div>
            </div>

            <AnimatePresence>
                {message && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="mb-8 text-center max-w-md px-4 relative z-10"
                    >
                        <div className="glass-strong p-6 rounded-2xl border border-pink-500/30 shadow-[0_0_30px_-10px_rgba(236,72,153,0.3)]">
                            <p className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
                                {message}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <button
                onClick={calculateLove}
                disabled={isCalculating}
                className={cn(
                    "px-10 py-4 rounded-full font-display font-bold text-lg tracking-wider transition-all duration-300 z-10",
                    isCalculating
                        ? "bg-secondary text-muted-foreground cursor-not-allowed"
                        : "bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-[0_0_30px_-5px_hsl(var(--primary)/0.5)] hover:shadow-[0_0_50px_-5px_hsl(var(--primary)/0.7)] hover:scale-105 active:scale-95"
                )}
            >
                {isCalculating ? 'CALCULATING...' : score !== null ? 'CALCULATE AGAIN' : 'CALCULATE LOVE'}
            </button>
        </div>
    );
}
