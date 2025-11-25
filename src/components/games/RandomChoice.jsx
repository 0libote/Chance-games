import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';

export function RandomChoice({ onResult }) {
    const [isChoosing, setIsChoosing] = useState(false);
    const [result, setResult] = useState('');
    const [displayText, setDisplayText] = useState('');

    const choices = ['Yes', 'No', 'Maybe', 'Definitely', 'Probably Not', 'Ask Again'];

    const makeChoice = () => {
        if (isChoosing) return;
        setIsChoosing(true);

        let count = 0;
        const maxCount = 60; // Increased from 20 to 60 for more spins
        const baseInterval = 30; // Reduced from 100ms to 30ms for faster spinning

        const spin = () => {
            setDisplayText(choices[Math.floor(Math.random() * choices.length)]);
            count++;

            if (count >= maxCount) {
                setIsChoosing(false);
                const final = choices[Math.floor(Math.random() * choices.length)];
                setResult(final);
                setDisplayText(final);
                if (onResult) onResult(final);
            } else {
                // Add easing: speed up at start, slow down at end
                const progress = count / maxCount;
                const easedInterval = baseInterval + (progress * progress * 150); // Quadratic easing
                setTimeout(spin, easedInterval);
            }
        };

        spin();
    };

    return (
        <div className="flex flex-col items-center justify-center h-full py-6 sm:py-8">
            <motion.div
                className="w-full max-w-md h-32 sm:h-36 md:h-40 flex items-center justify-center mb-8 sm:mb-10 md:mb-12 bg-card border border-border rounded-2xl shadow-inner overflow-hidden relative mx-4"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-green-500/10" />
                <AnimatePresence mode="wait">
                    <motion.span
                        key={displayText || 'start'}
                        initial={{ y: 20, opacity: 0, scale: 0.8 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: -20, opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.15 }}
                        className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-foreground text-center px-4 z-10"
                    >
                        {displayText || 'Ready?'}
                    </motion.span>
                </AnimatePresence>
            </motion.div>

            <button
                onClick={makeChoice}
                disabled={isChoosing}
                className={cn(
                    "px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg shadow-lg transition-all transform hover:scale-105 active:scale-95",
                    isChoosing
                        ? "bg-gray-400 cursor-not-allowed text-gray-200"
                        : "bg-emerald-600 text-white hover:shadow-emerald-500/30 hover:bg-emerald-700"
                )}
            >
                {isChoosing ? 'Choosing...' : 'Make a Choice'}
            </button>
        </div>
    );
}
