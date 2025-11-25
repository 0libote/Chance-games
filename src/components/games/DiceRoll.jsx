import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from 'lucide-react';

export function DiceRoll({ onResult }) {
    const [isRolling, setIsRolling] = useState(false);
    const [result, setResult] = useState(1);
    const [sides, setSides] = useState(6);

    const rollDice = () => {
        if (isRolling) return;
        setIsRolling(true);

        // Animation loop
        const interval = setInterval(() => {
            setResult(Math.floor(Math.random() * sides) + 1);
        }, 80);

        setTimeout(() => {
            clearInterval(interval);
            const newResult = Math.floor(Math.random() * sides) + 1;
            setResult(newResult);
            setIsRolling(false);
            if (onResult) onResult(`Rolled a ${newResult}`);
        }, 800);
    };

    const getIcon = (num) => {
        // For standard d6, use icons. For others, show number.
        if (sides === 6 && num <= 6) {
            const icons = [Dice1, Dice1, Dice2, Dice3, Dice4, Dice5, Dice6];
            const Icon = icons[num] || Dice6;
            return <Icon size={window.innerWidth < 640 ? 100 : 140} className="text-white" />;
        }
        return <span className="text-6xl sm:text-7xl md:text-8xl font-black text-white">{num}</span>;
    };

    return (
        <div className="flex flex-col items-center justify-center h-full py-8">
            <motion.div
                className="w-44 sm:w-48 md:w-52 h-44 sm:h-48 md:h-52 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-3xl shadow-2xl flex items-center justify-center mb-8 md:mb-10 border-4 border-white/20"
                animate={{
                    rotate: isRolling ? [0, 180, 360] : 0,
                    scale: isRolling ? [1, 1.1, 1] : 1,
                }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
            >
                {getIcon(result)}
            </motion.div>

            <div className="w-full max-w-xs mb-6 md:mb-8 px-4">
                <label className="block text-sm font-medium text-muted-foreground mb-3 text-center">
                    Number of sides: <span className="text-foreground font-bold text-base md:text-lg">{sides}</span>
                </label>
                <input
                    type="range"
                    min="2"
                    max="20"
                    value={sides}
                    onChange={(e) => setSides(parseInt(e.target.value))}
                    className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
            </div>

            <button
                onClick={rollDice}
                disabled={isRolling}
                className={cn(
                    "px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg shadow-lg transition-all transform hover:scale-105 active:scale-95",
                    isRolling
                        ? "bg-gray-400 cursor-not-allowed text-gray-200"
                        : "bg-blue-600 text-white hover:shadow-blue-500/30 hover:bg-blue-700"
                )}
            >
                {isRolling ? 'Rolling...' : 'Roll Dice'}
            </button>
        </div>
    );
}
