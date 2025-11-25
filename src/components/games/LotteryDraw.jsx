import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import { ConfettiEffect } from '../ConfettiEffect';

export function LotteryDraw({ onResult }) {
    const [isDrawing, setIsDrawing] = useState(false);
    const [numbers, setNumbers] = useState([]);
    const [count, setCount] = useState(6);
    const [range, setRange] = useState(49);
    const [showConfetti, setShowConfetti] = useState(false);
    const [bouncingBalls, setBouncingBalls] = useState([]);

    // Initialize bouncing balls for the machine visual
    useEffect(() => {
        const balls = Array.from({ length: 15 }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            color: getBallColor(i)
        }));
        setBouncingBalls(balls);
    }, []);

    const drawNumbers = () => {
        if (isDrawing) return;
        setIsDrawing(true);
        setNumbers([]);
        setShowConfetti(false);

        const generated = new Set();
        while (generated.size < count) {
            generated.add(Math.floor(Math.random() * range) + 1);
        }
        const finalNumbers = Array.from(generated).sort((a, b) => a - b);

        // Animate one by one
        let current = 0;
        const interval = setInterval(() => {
            if (current < finalNumbers.length) {
                setNumbers(prev => [...prev, finalNumbers[current]]);
                current++;
            } else {
                clearInterval(interval);
                setIsDrawing(false);
                setShowConfetti(true);
                if (onResult) onResult(finalNumbers.join(', '));
            }
        }, 800); // Slower draw for dramatic effect
    };

    // Generate ball colors
    const getBallColor = (index) => {
        const colors = [
            'from-emerald-500 to-green-700',
            'from-blue-500 to-blue-700',
            'from-purple-500 to-purple-700',
            'from-pink-500 to-pink-700',
            'from-amber-500 to-amber-700',
            'from-cyan-500 to-cyan-700',
            'from-red-500 to-red-700',
        ];
        return colors[index % colors.length];
    };

    return (
        <div className="flex flex-col items-center justify-center h-full py-4 relative">
            <ConfettiEffect trigger={showConfetti} duration={3000} />

            {/* Lottery Machine Visual */}
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 mb-8 rounded-full border-4 border-white/20 glass-strong shadow-[0_0_50px_-10px_rgba(255,255,255,0.1)] overflow-hidden flex items-center justify-center">
                {/* Inner shine */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent pointer-events-none z-20" />

                {/* Bouncing Balls inside machine */}
                <div className="relative w-full h-full">
                    {bouncingBalls.map((ball) => (
                        <motion.div
                            key={ball.id}
                            className={`absolute w-6 h-6 rounded-full bg-gradient-to-br ${ball.color} shadow-sm`}
                            animate={{
                                x: isDrawing ? [Math.random() * 180, Math.random() * 180, Math.random() * 180] : ball.x * 1.8,
                                y: isDrawing ? [Math.random() * 180, Math.random() * 180, Math.random() * 180] : ball.y * 1.8,
                            }}
                            transition={{
                                duration: isDrawing ? 0.2 : 2,
                                repeat: Infinity,
                                repeatType: "reverse",
                                ease: isDrawing ? "linear" : "easeInOut"
                            }}
                        />
                    ))}
                </div>

                {/* Center suction tube visual */}
                <div className="absolute bottom-0 w-12 h-24 bg-gradient-to-t from-white/20 to-transparent z-10 blur-sm" />
            </div>

            {/* Result Tray */}
            <div className="flex flex-wrap gap-3 justify-center mb-10 min-h-[80px] px-4 perspective-500">
                <AnimatePresence>
                    {numbers.map((num, i) => (
                        <motion.div
                            key={`${num}-${i}`}
                            initial={{ scale: 0, y: -50, opacity: 0 }}
                            animate={{
                                scale: 1,
                                y: 0,
                                opacity: 1,
                                rotate: [0, 360]
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 200,
                                damping: 15
                            }}
                            className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br ${getBallColor(num)} shadow-xl flex items-center justify-center border-2 border-white/30 relative overflow-hidden group`}
                        >
                            {/* Glossy shine effect */}
                            <div className="absolute top-1 left-1/4 w-1/2 h-1/3 rounded-full bg-white/50 blur-[2px]" />
                            <div className="absolute bottom-1 right-1/4 w-1/2 h-1/4 rounded-full bg-black/20 blur-[4px]" />

                            <span className="text-xl sm:text-2xl font-display font-black text-white drop-shadow-md relative z-10">
                                {num}
                            </span>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-md mb-8 px-4">
                <div className="glass-strong p-5 rounded-2xl border border-white/20">
                    <label className="block text-sm font-semibold text-foreground mb-3 text-center">
                        How Many Numbers
                    </label>
                    <div className="text-center mb-3">
                        <span className="text-4xl font-display font-black text-primary">{count}</span>
                    </div>
                    <input
                        type="range"
                        min="1"
                        max="10"
                        value={count}
                        onChange={(e) => setCount(parseInt(e.target.value))}
                        className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                </div>
                <div className="glass-strong p-5 rounded-2xl border border-white/20">
                    <label className="block text-sm font-semibold text-foreground mb-3 text-center">
                        Max Number
                    </label>
                    <div className="text-center mb-3">
                        <span className="text-4xl font-display font-black text-primary">{range}</span>
                    </div>
                    <input
                        type="range"
                        min="10"
                        max="99"
                        value={range}
                        onChange={(e) => setRange(parseInt(e.target.value))}
                        className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                </div>
            </div>


            <button
                onClick={drawNumbers}
                disabled={isDrawing}
                className={cn(
                    "px-10 py-4 rounded-full font-display font-bold text-lg tracking-wider transition-all duration-300",
                    isDrawing
                        ? "bg-secondary text-muted-foreground cursor-not-allowed"
                        : "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-[0_0_30px_-5px_hsl(var(--primary)/0.5)] hover:shadow-[0_0_50px_-5px_hsl(var(--primary)/0.7)] hover:scale-105 active:scale-95"
                )}
            >
                {isDrawing ? 'DRAWING...' : 'START DRAW'}
            </button>
        </div>
    );
}
