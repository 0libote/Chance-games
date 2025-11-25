import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import { ConfettiEffect } from '../ConfettiEffect';

export function RandomChoice({ onResult }) {
    const [isChoosing, setIsChoosing] = useState(false);
    const [result, setResult] = useState('');
    const [displayText, setDisplayText] = useState('');
    const [showConfetti, setShowConfetti] = useState(false);

    const choices = ['Yes', 'No'];

    const makeChoice = () => {
        if (isChoosing) return;
        setIsChoosing(true);
        setShowConfetti(false);
        setResult('');

        let count = 0;
        const maxCount = 40;
        const baseInterval = 30;

        const spin = () => {
            setDisplayText(choices[Math.floor(Math.random() * choices.length)]);
            count++;

            if (count >= maxCount) {
                setIsChoosing(false);
                const final = choices[Math.floor(Math.random() * choices.length)];
                setResult(final);
                setDisplayText(final);
                setShowConfetti(true);
                if (onResult) onResult(final);
            } else {
                const progress = count / maxCount;
                const easedInterval = baseInterval + (progress * progress * 150);
                setTimeout(spin, easedInterval);
            }
        };

        spin();
    };

    return (
        <div className="flex flex-col items-center justify-center h-full py-8 relative">
            <ConfettiEffect trigger={showConfetti} duration={2500} />

            <motion.div
                className="w-full max-w-md h-48 flex items-center justify-center mb-12 glass-strong border-2 rounded-3xl shadow-2xl overflow-hidden relative mx-4 neon-border"
                animate={isChoosing ? {
                    boxShadow: [
                        '0 0 20px hsl(var(--primary) / 0.3)',
                        '0 0 40px hsl(var(--primary) / 0.5)',
                        '0 0 20px hsl(var(--primary) / 0.3)',
                    ]
                } : {}}
                transition={{ duration: 0.8, repeat: isChoosing ? Infinity : 0 }}
            >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10" />

                {/* Animated indicators */}
                {isChoosing && (
                    <>
                        <motion.div
                            className="absolute left-0 top-0 bottom-0 w-1 bg-primary"
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 0.5, repeat: Infinity }}
                        />
                        <motion.div
                            className="absolute right-0 top-0 bottom-0 w-1 bg-primary"
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 0.5, repeat: Infinity, delay: 0.25 }}
                        />
                    </>
                )}

                <AnimatePresence mode="wait">
                    <motion.span
                        key={displayText || 'start'}
                        initial={{ y: -50, opacity: 0, scale: 0.5 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: 50, opacity: 0, scale: 0.5 }}
                        transition={{
                            duration: isChoosing ? 0.1 : 0.4,
                            ease: [0.34, 1.56, 0.64, 1]
                        }}
                        className={cn(
                            "text-6xl sm:text-7xl md:text-8xl font-display font-black text-center px-4 z-10",
                            result && !isChoosing
                                ? result === 'Yes'
                                    ? "text-green-500"
                                    : "text-red-500"
                                : "text-foreground"
                        )}
                    >
                        {displayText || '?'}
                    </motion.span>
                </AnimatePresence>
            </motion.div>

            <button
                onClick={makeChoice}
                disabled={isChoosing}
                className={cn(
                    "px-12 py-4 rounded-full font-display font-bold text-lg tracking-wider transition-all duration-300",
                    isChoosing
                        ? "bg-secondary text-muted-foreground cursor-not-allowed"
                        : "bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-[0_0_30px_-5px_rgba(16,185,129,0.5)] hover:shadow-[0_0_50px_-5px_rgba(16,185,129,0.7)] hover:scale-105 active:scale-95"
                )}
            >
                {isChoosing ? 'DECIDING...' : result ? 'ASK AGAIN' : 'YES OR NO?'}
            </button>
        </div>
    );
}
