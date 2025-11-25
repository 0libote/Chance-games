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
        }, 30);
    };

    return (
        <div className="flex flex-col items-center justify-center h-full py-8">
            <div className="relative w-48 sm:w-56 md:w-64 h-48 sm:h-56 md:h-64 mb-8 md:mb-12 flex items-center justify-center">
                <motion.div
                    animate={{
                        scale: isCalculating ? [1, 1.2, 1] : 1,
                    }}
                    transition={{ repeat: isCalculating ? Infinity : 0, duration: 0.8 }}
                >
                    <Heart
                        size={window.innerWidth < 640 ? 160 : 200}
                        className={cn(
                            "transition-colors duration-500",
                            isCalculating ? "text-pink-400" : "text-red-500"
                        )}
                        fill="currentColor"
                    />
                </motion.div>

                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl sm:text-5xl md:text-6xl font-heading font-black text-white drop-shadow-lg">
                        {score !== null ? `${score}%` : '?'}
                    </span>
                </div>
            </div>

            {message && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 md:mb-8 text-center max-w-md px-4"
                >
                    <p className="text-lg sm:text-xl md:text-2xl font-medium text-pink-600 dark:text-pink-300">
                        {message}
                    </p>
                </motion.div>
            )}

            <button
                onClick={calculateLove}
                disabled={isCalculating}
                className={cn(
                    "px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg shadow-lg transition-all transform hover:scale-105 active:scale-95",
                    isCalculating
                        ? "bg-gray-400 cursor-not-allowed text-gray-200"
                        : "bg-pink-600 text-white hover:shadow-pink-500/30 hover:bg-pink-700"
                )}
            >
                {isCalculating ? 'Calculating...' : 'Calculate Love'}
            </button>
        </div>
    );
}
