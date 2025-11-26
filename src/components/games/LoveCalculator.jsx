import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import { Heart, Sparkles, User } from 'lucide-react';
import { ConfettiEffect } from '../ConfettiEffect';

export function LoveCalculator({ onResult }) {
    const [isCalculating, setIsCalculating] = useState(false);
    const [score, setScore] = useState(null);
    const [message, setMessage] = useState('');
    const [showConfetti, setShowConfetti] = useState(false);
    const [name1, setName1] = useState('');
    const [name2, setName2] = useState('');
    const [stage, setStage] = useState('input'); // input, calculating, result

    const messages = [
        { min: 0, text: "Better off as friends." },
        { min: 30, text: "There's a spark!" },
        { min: 50, text: "Chemistry is brewing." },
        { min: 70, text: "A match made in heaven!" },
        { min: 90, text: "Soulmates forever!" }
    ];

    const getMessage = (s) => {
        return messages.slice().reverse().find(m => s >= m.min)?.text || "Mystery awaits...";
    };

    const calculateLove = () => {
        if (!name1 || !name2) return;
        setIsCalculating(true);
        setStage('calculating');
        setScore(0);
        setMessage('');
        setShowConfetti(false);

        // Deterministic "random" based on names for consistency (optional, but fun)
        // Or just pure random for the game feel. Let's go with random for replayability.
        const targetScore = Math.floor(Math.random() * 41) + 60; // 60-100% bias for positivity

        // Animation sequence
        let current = 0;
        const interval = setInterval(() => {
            if (current >= targetScore) {
                clearInterval(interval);
                setScore(targetScore);
                const msg = getMessage(targetScore);
                setMessage(msg);
                setIsCalculating(false);
                setStage('result');
                setShowConfetti(true);
                if (onResult) onResult(`${name1} + ${name2} = ${targetScore}% - ${msg}`);
            } else {
                // Non-linear increment for excitement
                current += Math.ceil((targetScore - current) / 10) + 1;
                if (current > targetScore) current = targetScore;
                setScore(current);
            }
        }, 100);
    };

    const reset = () => {
        setStage('input');
        setScore(null);
        setName1('');
        setName2('');
        setShowConfetti(false);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-full py-8 relative overflow-hidden w-full max-w-md mx-auto">
            <ConfettiEffect trigger={showConfetti} duration={3000} />

            {/* Background Particles */}
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute text-pink-500/20 pointer-events-none"
                    initial={{
                        x: Math.random() * 100 + "%",
                        y: "110%",
                        scale: Math.random() * 0.5 + 0.5,
                    }}
                    animate={{
                        y: "-10%",
                        rotate: Math.random() * 360,
                    }}
                    transition={{
                        duration: Math.random() * 10 + 10,
                        repeat: Infinity,
                        delay: Math.random() * 10,
                        ease: "linear"
                    }}
                >
                    <Heart size={Math.random() * 20 + 10} fill="currentColor" />
                </motion.div>
            ))}

            <AnimatePresence mode="wait">
                {stage === 'input' && (
                    <motion.div
                        key="input"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="w-full space-y-6 px-6"
                    >
                        <div className="text-center space-y-2 mb-8">
                            <div className="inline-block p-3 rounded-full bg-pink-100 dark:bg-pink-900/30 mb-2">
                                <Heart className="w-8 h-8 text-pink-500 fill-pink-500 animate-pulse" />
                            </div>
                            <h2 className="text-2xl font-bold text-foreground">Love Calculator</h2>
                            <p className="text-muted-foreground">Enter two names to test their compatibility!</p>
                        </div>

                        <div className="space-y-4">
                            <div className="relative group">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5 group-focus-within:text-pink-500 transition-colors" />
                                <input
                                    type="text"
                                    placeholder="First Name"
                                    value={name1}
                                    onChange={(e) => setName1(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-secondary/50 border border-border focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 outline-none transition-all"
                                />
                            </div>
                            <div className="flex justify-center">
                                <span className="text-2xl font-display font-bold text-pink-500">+</span>
                            </div>
                            <div className="relative group">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5 group-focus-within:text-pink-500 transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Second Name"
                                    value={name2}
                                    onChange={(e) => setName2(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-secondary/50 border border-border focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 outline-none transition-all"
                                />
                            </div>
                        </div>

                        <button
                            onClick={calculateLove}
                            disabled={!name1 || !name2}
                            className={cn(
                                "w-full py-4 rounded-xl font-display font-bold text-lg tracking-wider transition-all duration-300 shadow-lg mt-4",
                                !name1 || !name2
                                    ? "bg-secondary text-muted-foreground cursor-not-allowed shadow-none"
                                    : "bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:shadow-pink-500/25 hover:scale-[1.02] active:scale-[0.98]"
                            )}
                        >
                            CALCULATE LOVE
                        </button>
                    </motion.div>
                )}

                {(stage === 'calculating' || stage === 'result') && (
                    <motion.div
                        key="result"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center w-full px-6"
                    >
                        <div className="relative w-64 h-64 mb-8 flex items-center justify-center">
                            {/* Pulsing Rings */}
                            {stage === 'calculating' && (
                                <>
                                    <motion.div
                                        className="absolute inset-0 rounded-full border-4 border-pink-500/20"
                                        animate={{ scale: [1, 1.5], opacity: [1, 0] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                    />
                                    <motion.div
                                        className="absolute inset-0 rounded-full border-4 border-pink-500/20"
                                        animate={{ scale: [1, 1.5], opacity: [1, 0] }}
                                        transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                                    />
                                </>
                            )}

                            {/* Main Heart Container */}
                            <div className="relative w-full h-full drop-shadow-[0_10px_30px_rgba(236,72,153,0.4)]">
                                <svg viewBox="0 0 24 24" className="w-full h-full overflow-visible">
                                    <defs>
                                        <linearGradient id="heartGradientResult" x1="0%" y1="100%" x2="0%" y2="0%">
                                            <stop offset="0%" stopColor="#db2777" />
                                            <stop offset="100%" stopColor="#f43f5e" />
                                        </linearGradient>
                                        <mask id="fillMask">
                                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="white" />
                                        </mask>
                                    </defs>

                                    {/* Background Heart */}
                                    <path
                                        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="0.5"
                                        className="text-pink-900/10"
                                    />

                                    {/* Liquid Fill */}
                                    <g mask="url(#fillMask)">
                                        <rect x="0" y="0" width="24" height="24" fill="transparent" />
                                        <motion.rect
                                            x="0"
                                            y={24}
                                            width="24"
                                            height="24"
                                            fill="url(#heartGradientResult)"
                                            animate={{ y: 24 - (24 * (score || 0) / 100) }}
                                            transition={{ type: "spring", stiffness: 30, damping: 15 }}
                                        />
                                        {/* Wave */}
                                        <motion.path
                                            d="M-12,0 C-6,1 0,-1 6,0 C12,1 18,-1 24,0 V24 H-12 Z"
                                            fill="white"
                                            fillOpacity="0.2"
                                            animate={{
                                                x: [-12, 0],
                                                y: 24 - (24 * (score || 0) / 100) - 0.5
                                            }}
                                            transition={{
                                                x: { repeat: Infinity, duration: 2, ease: "linear" },
                                                y: { type: "spring", stiffness: 30, damping: 15 }
                                            }}
                                        />
                                    </g>
                                </svg>

                                {/* Score Text */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <motion.span
                                        className="text-6xl font-display font-black text-white drop-shadow-md"
                                        animate={{ scale: stage === 'result' ? [1, 1.2, 1] : 1 }}
                                    >
                                        {score}%
                                    </motion.span>
                                </div>
                            </div>
                        </div>

                        <div className="text-center space-y-2 mb-8 h-20">
                            <h3 className="text-xl font-bold text-foreground">
                                {name1} <span className="text-pink-500">&</span> {name2}
                            </h3>
                            {stage === 'result' && (
                                <motion.p
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-lg font-medium bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent"
                                >
                                    {message}
                                </motion.p>
                            )}
                        </div>

                        {stage === 'result' && (
                            <motion.button
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                onClick={reset}
                                className="px-8 py-3 rounded-full bg-secondary hover:bg-secondary/80 text-foreground font-bold transition-colors"
                            >
                                Test Another Couple
                            </motion.button>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
