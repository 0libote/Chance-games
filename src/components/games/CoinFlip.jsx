import React, { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { cn } from '../../lib/utils';
import { ConfettiEffect } from '../ConfettiEffect';

export function CoinFlip({ onResult }) {
    const [isFlipping, setIsFlipping] = useState(false);
    const [result, setResult] = useState(null); // 'heads' or 'tails'
    const [showConfetti, setShowConfetti] = useState(false);
    const controls = useAnimation();

    const flipCoin = async () => {
        if (isFlipping) return;
        setIsFlipping(true);
        setResult(null);
        setShowConfetti(false);

        // Random result
        const isHeads = Math.random() < 0.5;
        const newResult = isHeads ? 'heads' : 'tails';

        // Ensure integer rotations for flat landing
        const minRotations = 5;
        const extraRotations = Math.floor(Math.random() * 5); // 0 to 4 extra full rotations
        const totalRotations = minRotations + extraRotations;

        // If heads, we want a multiple of 360. If tails, multiple of 360 + 180.
        // But since we start at 0, we just need to add the target rotation.
        // Actually, let's just animate to a specific value.

        const targetRotateY = isHeads
            ? totalRotations * 360
            : totalRotations * 360 + 180;

        await controls.start({
            rotateY: targetRotateY,
            rotateX: [0, 720, 0], // Flip on X axis too for more dynamic movement
            y: [0, -400, 0], // Higher bounce
            scale: [1, 1.5, 1],
            transition: {
                duration: 2.5,
                ease: "easeInOut",
                times: [0, 0.5, 1]
            }
        });

        // Reset rotation to a normalized value (0 or 180) instantly to prevent huge numbers building up
        // But we need to do it without animation. 
        // For now, let's just keep the rotation.

        setResult(newResult);
        setIsFlipping(false);
        setShowConfetti(true);
        if (onResult) onResult(newResult === 'heads' ? 'Heads' : 'Tails');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-full py-10 relative perspective-1000 w-full">
            <ConfettiEffect trigger={showConfetti} duration={2000} />

            <div className="relative w-64 h-64 mb-16" style={{ perspective: '1200px' }}>
                <motion.div
                    className="w-full h-full relative preserve-3d"
                    animate={controls}
                    initial={{ rotateY: 0 }}
                    style={{ transformStyle: 'preserve-3d' }}
                >
                    {/* Coin Thickness (Edge) - Optimized */}
                    {Array.from({ length: 16 }).map((_, i) => (
                        <div
                            key={i}
                            className="absolute inset-0 rounded-full border-[3px] border-amber-600/40"
                            style={{
                                transform: `translateZ(${i - 8}px)`,
                                background: 'linear-gradient(to right, #b45309, #fbbf24, #b45309)',
                                width: '100%',
                                height: '100%'
                            }}
                        />
                    ))}

                    {/* Heads Side (Front) */}
                    <div
                        className="absolute inset-0 w-full h-full rounded-full flex items-center justify-center backface-hidden"
                        style={{
                            transform: 'translateZ(9px)',
                            background: 'radial-gradient(circle at 30% 30%, #fbbf24, #d97706)',
                            boxShadow: 'inset 0 0 20px rgba(0,0,0,0.3), 0 0 10px rgba(251, 191, 36, 0.5)',
                            border: '8px solid #b45309'
                        }}
                    >
                        <div className="w-[85%] h-[85%] rounded-full border-2 border-amber-200/30 flex items-center justify-center relative overflow-hidden bg-[#f59e0b]">
                            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>
                            <span className="text-8xl font-display font-black text-amber-900 drop-shadow-md relative z-10 select-none">H</span>
                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent opacity-0 animate-shine" />
                        </div>
                    </div>

                    {/* Tails Side (Back) */}
                    <div
                        className="absolute inset-0 w-full h-full rounded-full flex items-center justify-center backface-hidden"
                        style={{
                            transform: 'rotateY(180deg) translateZ(9px)',
                            background: 'radial-gradient(circle at 30% 30%, #e5e7eb, #9ca3af)',
                            boxShadow: 'inset 0 0 20px rgba(0,0,0,0.3), 0 0 10px rgba(255, 255, 255, 0.3)',
                            border: '8px solid #4b5563'
                        }}
                    >
                        <div className="w-[85%] h-[85%] rounded-full border-2 border-white/30 flex items-center justify-center relative overflow-hidden bg-[#d1d5db]">
                            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>
                            <span className="text-8xl font-display font-black text-slate-700 drop-shadow-md relative z-10 select-none">T</span>
                        </div>
                    </div>
                </motion.div>

                {/* Shadow */}
                <motion.div
                    className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 w-40 h-8 bg-black/20 blur-xl rounded-full"
                    animate={{
                        scale: isFlipping ? [1, 0.5, 1] : 1,
                        opacity: isFlipping ? [0.4, 0.1, 0.4] : 0.4,
                    }}
                    transition={{ duration: 2.5, times: [0, 0.5, 1] }}
                />
            </div>

            <button
                onClick={flipCoin}
                disabled={isFlipping}
                className={cn(
                    "px-12 py-4 rounded-xl font-display font-bold text-lg tracking-wider transition-all duration-200 shadow-lg",
                    isFlipping
                        ? "bg-secondary text-muted-foreground cursor-not-allowed shadow-none"
                        : "bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] shadow-primary/25"
                )}
            >
                {isFlipping ? 'FLIPPING...' : 'FLIP COIN'}
            </button>
        </div>
    );
}
