import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { Heart } from 'lucide-react';

export function LoveCalculator({ onResult }) {
    const [isCalculating, setIsCalculating] = useState(false);
    const [score, setScore] = useState(null);
    const [message, setMessage] = useState('');

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
                if (onResult) onResult(`${targetScore}% - ${msg}`);
                return;
            }
            current += 2;
            setScore(current);
        }, 50);
    };

    return (
        <div className="flex flex-col items-center justify-center h-full min-h-[400px]">
            <div className="relative w-64 h-64 mb-12 flex items-center justify-center">
                <motion.div
                    animate={{
                        scale: isCalculating ? [1, 1.2, 1] : 1,
                    }}
                    transition={{ repeat: isCalculating ? Infinity : 0, duration: 0.8 }}
                >
                    <Heart
                        size={200}
                        className={cn(
                            "transition-colors duration-500",
                            isCalculating ? "text-pink-400" : "text-red-500"
                        )}
                        fill="currentColor"
                    />
                </motion.div>

                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-5xl font-heading font-black text-white drop-shadow-lg">
                        {score !== null ? `${score}%` : '?'}
                    </span>
                </div>
            </div>

            {message && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8 text-center max-w-md"
                >
                    <p className="text-xl font-medium text-pink-600 dark:text-pink-300">
                        {message}
                    </p>
                </motion.div>
            )}

            <button
                onClick={calculateLove}
                disabled={isCalculating}
                className={cn(
                    "px-8 py-4 rounded-xl font-bold text-lg shadow-lg transition-all transform hover:scale-105 active:scale-95",
                    isCalculating
                        ? "bg-gray-400 cursor-not-allowed text-gray-200"
                        : "bg-gradient-to-r from-red-500 to-pink-500 text-white hover:shadow-pink-500/25"
                )}
            >
                {isCalculating ? 'Calculating...' : 'Calculate Love'}
            </button>
        </div>
    );
}
