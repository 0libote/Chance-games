import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

export function DiceRoll({ onResult }) {
    const [isRolling, setIsRolling] = useState(false);
    const [result, setResult] = useState(1);
    const [sides, setSides] = useState(6);

    const rollDice = () => {
        if (isRolling) return;
        setIsRolling(true);

        // Animation loop - change numbers quickly
        let count = 0;
        const interval = setInterval(() => {
            setResult(Math.floor(Math.random() * sides) + 1);
            count++;
            if (count >= 10) {
                clearInterval(interval);
            }
        }, 60);

        // Final result after animation
        setTimeout(() => {
            const newResult = Math.floor(Math.random() * sides) + 1;
            setResult(newResult);
            setIsRolling(false);
            if (onResult) onResult(`Rolled a ${newResult}`);
        }, 700);
    };

    // 3D Dice rendering for d6
    const renderD6 = () => {
        const dotPositions = {
            1: [[50, 50]],
            2: [[25, 25], [75, 75]],
            3: [[25, 25], [50, 50], [75, 75]],
            4: [[25, 25], [75, 25], [25, 75], [75, 75]],
            5: [[25, 25], [75, 25], [50, 50], [25, 75], [75, 75]],
            6: [[25, 25], [75, 25], [25, 50], [75, 50], [25, 75], [75, 75]]
        };

        return (
            <div className="relative w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
                {/* Front face */}
                <div
                    className="absolute w-full h-full bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl border-4 border-white/30 shadow-2xl flex items-center justify-center"
                    style={{ transform: 'translateZ(60px)' }}
                >
                    <div className="relative w-full h-full">
                        {dotPositions[result]?.map((dot, i) => (
                            <div
                                key={i}
                                className="absolute w-5 h-5 bg-white rounded-full shadow-lg"
                                style={{ left: `${dot[0]}%`, top: `${dot[1]}%`, transform: 'translate(-50%, -50%)' }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="flex flex-col items-center justify-center h-full py-6 sm:py-8">
            <motion.div
                className="w-40 sm:w-48 md:w-52 h-40 sm:h-48 md:h-52 mb-8 sm:mb-10 md:mb-12"
                style={{ perspective: '800px' }}
                animate={{
                    rotateX: isRolling ? [0, 360, 720, 1080] : 0,
                    rotateY: isRolling ? [0, 360, 720, 1080] : 0,
                    rotateZ: isRolling ? [0, 180, 360, 540] : 0,
                }}
                transition={{
                    duration: 0.7,
                    ease: "easeOut"
                }}
            >
                {sides === 6 ? (
                    renderD6()
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-cyan-600 rounded-3xl shadow-2xl flex items-center justify-center border-4 border-white/20">
                        <span className="text-6xl sm:text-7xl md:text-8xl font-black text-white drop-shadow-lg">{result}</span>
                    </div>
                )}
            </motion.div>

            <div className="w-full max-w-xs mb-6 sm:mb-8 md:mb-10 px-4">
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
