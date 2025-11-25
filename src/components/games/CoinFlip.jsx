import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

export function CoinFlip({ onResult }) {
    const [isFlipping, setIsFlipping] = useState(false);
    const [result, setResult] = useState(null); // 'heads' or 'tails'

    const flipCoin = () => {
        if (isFlipping) return;
        setIsFlipping(true);
        setResult(null);

        // Random result
        const newResult = Math.random() < 0.5 ? 'heads' : 'tails';

        // Delay setting result to allow animation to play
        setTimeout(() => {
            setResult(newResult);
            setIsFlipping(false);
            if (onResult) onResult(newResult === 'heads' ? 'Heads' : 'Tails');
        }, 600);
    };

    return (
        <div className="flex flex-col items-center justify-center h-full py-6 sm:py-8">
            <div className="relative w-48 sm:w-56 md:w-64 h-48 sm:h-56 md:h-64 mb-8 sm:mb-10 md:mb-12" style={{ perspective: '1000px' }}>
                <motion.div
                    className="w-full h-full relative"
                    animate={{
                        rotateY: result === 'tails' ? 180 : 0,
                    }}
                    transition={{
                        duration: 0.6,
                        ease: [0.43, 0.13, 0.23, 0.96]
                    }}
                    onClick={flipCoin}
                    style={{
                        transformStyle: 'preserve-3d',
                        cursor: 'pointer'
                    }}
                >
                    {/* Heads Side */}
                    <div
                        className="absolute inset-0 w-full h-full rounded-full bg-gradient-to-br from-amber-300 via-yellow-400 to-amber-500 shadow-2xl flex items-center justify-center border-8 border-amber-600"
                        style={{
                            backfaceVisibility: 'hidden',
                            WebkitBackfaceVisibility: 'hidden'
                        }}
                    >
                        <div className="w-[85%] h-[85%] rounded-full border-4 border-amber-200 flex items-center justify-center bg-amber-400/20 shadow-inner">
                            <span className="text-5xl sm:text-6xl md:text-7xl font-bold text-amber-900 drop-shadow-sm">H</span>
                        </div>
                    </div>

                    {/* Tails Side */}
                    <div
                        className="absolute inset-0 w-full h-full rounded-full bg-gradient-to-br from-slate-300 via-gray-400 to-slate-500 shadow-2xl flex items-center justify-center border-8 border-slate-600"
                        style={{
                            backfaceVisibility: 'hidden',
                            WebkitBackfaceVisibility: 'hidden',
                            transform: 'rotateY(180deg)'
                        }}
                    >
                        <div className="w-[85%] h-[85%] rounded-full border-4 border-slate-200 flex items-center justify-center bg-slate-400/20 shadow-inner">
                            <span className="text-5xl sm:text-6xl md:text-7xl font-bold text-slate-900 drop-shadow-sm">T</span>
                        </div>
                    </div>
                </motion.div>
            </div>

            <button
                onClick={flipCoin}
                disabled={isFlipping}
                className={cn(
                    "px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg shadow-lg transition-all transform hover:scale-105 active:scale-95",
                    isFlipping
                        ? "bg-gray-400 cursor-not-allowed text-gray-200"
                        : "bg-amber-600 text-white hover:shadow-amber-500/30 hover:bg-amber-700"
                )}
            >
                {isFlipping ? 'Flipping...' : 'Flip Coin'}
            </button>
        </div>
    );
}
