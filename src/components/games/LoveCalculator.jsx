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
        }, 30);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-full py-8 relative overflow-hidden w-full">
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
                {/* Custom SVG Heart for perfect filling */}
                <div className="relative w-full h-full drop-shadow-[0_10px_20px_rgba(236,72,153,0.3)]">
                    <svg viewBox="0 0 24 24" className="w-full h-full overflow-visible">
                        <defs>
                            <mask id="heartMask">
                                <path
                                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                                    fill="white"
                                />
                            </mask>
                            <linearGradient id="heartGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                                <stop offset="0%" stopColor="#db2777" /> {/* pink-600 */}
                                <stop offset="100%" stopColor="#f43f5e" /> {/* rose-500 */}
                            </linearGradient>
                        </defs>

                        {/* Background Heart Outline */}
                        <path
                            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1"
                            className="text-pink-900/20"
                        />

                        {/* Liquid Fill */}
                        <g mask="url(#heartMask)">
                            <rect x="0" y="0" width="24" height="24" fill="transparent" />
                            <motion.rect
                                x="0"
                                y={24 - (24 * (score || 0) / 100)}
                                width="24"
                                height="24"
                                fill="url(#heartGradient)"
                                initial={{ y: 24 }}
                                animate={{ y: 24 - (24 * (score || 0) / 100) }}
                                transition={{ type: "spring", stiffness: 20, damping: 10 }}
                            />
                            {/* Wave Effect */}
                            <motion.path
                                d="M-12,0 C-6,2 0,-2 6,0 C12,2 18,-2 24,0 V24 H-12 Z"
                                fill="white"
                                fillOpacity="0.2"
                                initial={{ x: 0, y: 24 }}
                                animate={{
                                    x: [-12, 0],
                                    y: 24 - (24 * (score || 0) / 100) - 1
                                }}
                                transition={{
                                    x: { repeat: Infinity, duration: 2, ease: "linear" },
                                    y: { type: "spring", stiffness: 20, damping: 10 }
                                }}
                            />
                        </g>

                        {/* Foreground Heart Outline */}
                        <path
                            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            className="text-pink-500/50"
                        />
                    </svg>
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
                        : "bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] shadow-primary/25"
                )}
            >
                {isCalculating ? 'CALCULATING...' : score !== null ? 'CALCULATE AGAIN' : 'CALCULATE LOVE'}
            </button>
        </div>
    );
}
