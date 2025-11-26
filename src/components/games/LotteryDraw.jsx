import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import { ConfettiEffect } from '../ConfettiEffect';

export function LotteryDraw({ onResult }) {
    const [isDrawing, setIsDrawing] = useState(false);
    const [numbers, setNumbers] = useState([]);
    const [count, setCount] = useState(6);
    const [range, setRange] = useState(49);
    const [showConfetti, setShowConfetti] = useState(false);

    // Use refs for animation loop to avoid re-renders causing jitters
    const ballsRef = useRef(Array.from({ length: 15 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        color: i // index for color
    })));

    const [ballPositions, setBallPositions] = useState(ballsRef.current);

    // Physics loop for smooth bouncing balls
    useEffect(() => {
        let animationFrameId;

        const updateBalls = () => {
            const speed = isDrawing ? 4 : 0.8; // Faster when drawing

            ballsRef.current = ballsRef.current.map(ball => {
                let { x, y, vx, vy } = ball;

                x += vx * speed;
                y += vy * speed;

                // Bounce off walls
                if (x <= 0 || x >= 100) vx *= -1;
                if (y <= 0 || y >= 100) vy *= -1;

                // Keep in bounds
                x = Math.max(0, Math.min(100, x));
                y = Math.max(0, Math.min(100, y));

                // Randomly change direction slightly for "air" effect
                if (Math.random() < 0.05) {
                    vx += (Math.random() - 0.5) * 0.5;
                    vy += (Math.random() - 0.5) * 0.5;

                    // Normalize velocity
                    const mag = Math.sqrt(vx * vx + vy * vy);
                    vx = (vx / mag) * (isDrawing ? 2 : 1);
                    vy = (vy / mag) * (isDrawing ? 2 : 1);
                }

                return { ...ball, x, y, vx, vy };
            });

            setBallPositions([...ballsRef.current]);
            animationFrameId = requestAnimationFrame(updateBalls);
        };

        animationFrameId = requestAnimationFrame(updateBalls);
        return () => cancelAnimationFrame(animationFrameId);
    }, [isDrawing]);

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

        // Recursive timeout function to ensure sequential execution
        let currentIndex = 0;

        const drawNext = () => {
            if (currentIndex < finalNumbers.length) {
                // Use a functional update to ensure we don't miss updates
                // and explicitly check for valid number
                const nextNum = finalNumbers[currentIndex];
                if (nextNum !== undefined) {
                    setNumbers(prev => [...prev, nextNum]);
                }
                currentIndex++;
                setTimeout(drawNext, 1200); // Slower pace for dramatic effect
            } else {
                setIsDrawing(false);
                setShowConfetti(true);
                if (onResult) onResult(finalNumbers.join(', '));
            }
        };

        // Start drawing after a small delay to let the machine "spin up"
        setTimeout(drawNext, 1000);
    };

    // Generate ball colors
    const getBallColor = (num) => {
        const colors = [
            'from-emerald-500 to-green-700',
            'from-blue-500 to-blue-700',
            'from-purple-500 to-purple-700',
            'from-pink-500 to-pink-700',
            'from-amber-500 to-amber-700',
            'from-cyan-500 to-cyan-700',
            'from-red-500 to-red-700',
        ];
        // Use the number itself to determine color so it's consistent
        return colors[(num || 0) % colors.length];
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-full py-6 relative w-full">
            <ConfettiEffect trigger={showConfetti} duration={3000} />

            {/* Lottery Machine Visual */}
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 mb-16 rounded-full border-8 border-white/10 bg-black/5 shadow-2xl overflow-hidden flex items-center justify-center backdrop-blur-sm z-20">
                {/* Inner shine */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent pointer-events-none z-20" />

                {/* Glass reflection */}
                <div className="absolute top-4 left-4 w-24 h-12 bg-white/10 rounded-full blur-md transform -rotate-45 z-20" />

                {/* Bouncing Balls inside machine */}
                <div className="relative w-full h-full p-4">
                    {ballPositions.map((ball) => (
                        <div
                            key={ball.id}
                            className={`absolute w-8 h-8 rounded-full bg-gradient-to-br ${getBallColor(ball.color)} shadow-sm flex items-center justify-center`}
                            style={{
                                left: `${ball.x}%`,
                                top: `${ball.y}%`,
                                transform: 'translate(-50%, -50%)',
                                transition: 'none' // Physics controlled
                            }}
                        >
                            <div className="w-3 h-3 bg-white/30 rounded-full blur-[1px]" />
                        </div>
                    ))}
                </div>

                {/* Center suction tube visual */}
                <div className="absolute bottom-0 w-16 h-32 bg-gradient-to-t from-white/10 to-transparent z-10 blur-sm border-x border-white/5" />
            </div>

            {/* Result Tray */}
            <div className="flex flex-wrap gap-3 justify-center mb-10 min-h-[80px] px-4 w-full max-w-2xl relative z-10">
                <AnimatePresence mode="popLayout">
                    {numbers.map((num, i) => (
                        <motion.div
                            key={`${num}-${i}`}
                            initial={{ scale: 0.5, y: -150, opacity: 0, rotate: 180 }}
                            animate={{
                                scale: 1,
                                y: 0,
                                opacity: 1,
                                rotate: 0
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 200,
                                damping: 15,
                                mass: 1.2
                            }}
                            className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br ${getBallColor(num)} shadow-lg flex items-center justify-center border-2 border-white/20 relative overflow-hidden group shrink-0`}
                        >
                            {/* Glossy shine effect */}
                            <div className="absolute top-1 left-1/2 -translate-x-1/2 w-3/4 h-1/3 rounded-full bg-white/40 blur-[2px]" />

                            <span className="text-xl sm:text-2xl font-display font-black text-white drop-shadow-md relative z-10">
                                {num}
                            </span>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg mb-8 px-4">
                <div className="bg-card p-5 rounded-2xl border border-border shadow-sm">
                    <label className="block text-sm font-semibold text-foreground mb-3 text-center uppercase tracking-wide">
                        Count
                    </label>
                    <div className="flex items-center gap-4">
                        <span className="text-2xl font-display font-bold text-primary w-8 text-center">{count}</span>
                        <input
                            type="range"
                            min="1"
                            max="10"
                            value={count}
                            onChange={(e) => setCount(parseInt(e.target.value))}
                            className="flex-1 h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                        />
                    </div>
                </div>
                <div className="bg-card p-5 rounded-2xl border border-border shadow-sm">
                    <label className="block text-sm font-semibold text-foreground mb-3 text-center uppercase tracking-wide">
                        Max Number
                    </label>
                    <div className="flex items-center gap-4">
                        <span className="text-2xl font-display font-bold text-primary w-12 text-center">{range}</span>
                        <input
                            type="range"
                            min="10"
                            max="99"
                            value={range}
                            onChange={(e) => setRange(parseInt(e.target.value))}
                            className="flex-1 h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                        />
                    </div>
                </div>
            </div>


            <button
                onClick={drawNumbers}
                disabled={isDrawing}
                className={cn(
                    "px-12 py-4 rounded-xl font-display font-bold text-lg tracking-wider transition-all duration-200 shadow-lg",
                    isDrawing
                        ? "bg-secondary text-muted-foreground cursor-not-allowed shadow-none"
                        : "bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] shadow-primary/25"
                )}
            >
                {isDrawing ? 'DRAWING...' : 'START DRAW'}
            </button>
        </div>
    );
}
