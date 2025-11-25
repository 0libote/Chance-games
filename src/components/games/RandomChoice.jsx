import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { Shuffle } from 'lucide-react';

export function RandomChoice({ onResult }) {
    const [isChoosing, setIsChoosing] = useState(false);
    const [result, setResult] = useState('');

    const choices = ['Yes', 'No', 'Maybe', 'Definitely', 'Probably Not', 'Ask Again'];

    const makeChoice = () => {
        if (isChoosing) return;
        setIsChoosing(true);

        let count = 0;
        const maxCount = 20;
        const interval = setInterval(() => {
            setResult(choices[Math.floor(Math.random() * choices.length)]);
            count++;
            if (count >= maxCount) {
                clearInterval(interval);
                setIsChoosing(false);
                const final = choices[Math.floor(Math.random() * choices.length)];
                setResult(final);
                if (onResult) onResult(final);
            }
        }, 100);
    };

    return (
        <div className="flex flex-col items-center justify-center h-full min-h-[400px]">
            <motion.div
                className="w-full max-w-md h-40 flex items-center justify-center mb-12 bg-card border border-border rounded-2xl shadow-inner overflow-hidden relative"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-green-500/10" />
                <AnimatePresence mode="wait">
                    <motion.span
                        key={result || 'start'}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        className="text-4xl font-heading font-bold text-foreground text-center px-4"
                    >
                        {result || 'Ready?'}
                    </motion.span>
                </AnimatePresence>
            </motion.div>

            <button
                onClick={makeChoice}
                disabled={isChoosing}
                className={cn(
                    "px-8 py-4 rounded-xl font-bold text-lg shadow-lg transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2",
                    isChoosing
                        ? "bg-gray-400 cursor-not-allowed text-gray-200"
                        : "bg-gradient-to-r from-emerald-500 to-green-600 text-white hover:shadow-green-500/25"
                )}
            >
                <Shuffle size={24} />
                {isChoosing ? 'Choosing...' : 'Make a Choice'}
            </button>
        </div>
    );
}
