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
        }, 2000);
    };

    return (
        <div className="flex flex-col items-center justify-center h-full min-h-[400px]">
            <div className="relative w-64 h-64 perspective-1000">
                <motion.div
                    className="w-full h-full relative preserve-3d cursor-pointer"
                    animate={{
                        rotateY: isFlipping ? [0, 1800] : result === 'tails' ? 180 : 0,
                        rotateX: isFlipping ? [0, 720] : 0,
                        scale: isFlipping ? [1, 1.5, 1] : 1,
                    }}
                    transition={{
                        duration: 2,
                        ease: "easeInOut"
                    }}
                    onClick={flipCoin}
                    style={{ transformStyle: 'preserve-3d' }}
                >
                    {/* Heads Side */}
                    <div className="absolute inset-0 w-full h-full rounded-full bg-gradient-to-br from-yellow-300 via-yellow-500 to-yellow-700 shadow-xl flex items-center justify-center backface-hidden border-4 border-yellow-600">
                        <div className="w-[90%] h-[90%] rounded-full border-2 border-yellow-200/50 flex items-center justify-center bg-yellow-500/10">
                            <span className="text-6xl font-heading font-bold text-yellow-100 drop-shadow-md">HEADS</span>
                        </div>
                    </div>

                    {/* Tails Side */}
                    <div
                        className="absolute inset-0 w-full h-full rounded-full bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500 shadow-xl flex items-center justify-center backface-hidden border-4 border-gray-400"
                        style={{ transform: 'rotateY(180deg)' }}
                    >
                        <div className="w-[90%] h-[90%] rounded-full border-2 border-gray-200/50 flex items-center justify-center bg-gray-400/10">
                            <span className="text-6xl font-heading font-bold text-gray-100 drop-shadow-md">TAILS</span>
                        </div>
                    </div>
                </motion.div>
            </div>

            <button
                onClick={flipCoin}
                disabled={isFlipping}
                className={cn(
                    "mt-12 px-8 py-4 rounded-xl font-bold text-lg shadow-lg transition-all transform hover:scale-105 active:scale-95",
                    isFlipping
                        ? "bg-gray-400 cursor-not-allowed text-gray-200"
                        : "bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:shadow-orange-500/25"
                )}
            >
                {isFlipping ? 'Flipping...' : 'Flip Coin'}
            </button>
        </div>
    );
}
