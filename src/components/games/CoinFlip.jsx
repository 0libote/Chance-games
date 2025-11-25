import React, { useState, useEffect } from 'react';
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
        const rotations = 5 + Math.random() * 5; // Random rotations between 5 and 10
        const rotateY = isHeads ? rotations * 360 : rotations * 360 + 180;

        await controls.start({
            rotateY: rotateY,
            rotateX: [0, 720, 0], // Ensure it lands flat on X
            y: [0, -350, 0], // Higher bounce
            scale: [1, 1.3, 1],
            transition: {
                duration: 2,
                ease: "easeInOut",
                times: [0, 0.5, 1]
            }
        });

        setResult(newResult);
        setIsFlipping(false);
        setShowConfetti(true);
        if (onResult) onResult(newResult === 'heads' ? 'Heads' : 'Tails');
    };

    return (
        <div className="flex flex-col items-center justify-center h-full py-10 relative perspective-1000">
            <ConfettiEffect trigger={showConfetti} duration={2000} />

            <div className="relative w-64 h-64 mb-12" style={{ perspective: '1200px' }}>
                <motion.div
                    className="w-full h-full relative preserve-3d"
                    animate={controls}
                    initial={{ rotateY: 0 }}
                    style={{ transformStyle: 'preserve-3d' }}
                >
                    {/* Coin Thickness (Edge) */}
                    {Array.from({ length: 20 }).map((_, i) => (
                        <div
                            key={i}
                            className="absolute inset-0 rounded-full border-4 border-amber-600/50"
                            style={{
                                transform: `translateZ(${i - 10}px)`,
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
                            transform: 'translateZ(11px)',
                            background: 'radial-gradient(circle at 30% 30%, #fbbf24, #d97706)',
                            boxShadow: 'inset 0 0 20px rgba(0,0,0,0.3), 0 0 10px rgba(251, 191, 36, 0.5)',
                            border: '8px solid #b45309'
                        }}
                    >
                        <div className="w-[85%] h-[85%] rounded-full border-2 border-amber-200/30 flex items-center justify-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 mix-blend-overlay"></div>
                            <span className="text-8xl font-display font-black text-amber-900 drop-shadow-md relative z-10">H</span>
                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent opacity-0 animate-shine" />
                        </div>
                    </div>

                    {/* Tails Side (Back) */}
                    <div
                        className="absolute inset-0 w-full h-full rounded-full flex items-center justify-center backface-hidden"
                        style={{
                            transform: 'rotateY(180deg) translateZ(11px)',
                            background: 'radial-gradient(circle at 30% 30%, #e5e7eb, #9ca3af)',
                            boxShadow: 'inset 0 0 20px rgba(0,0,0,0.3), 0 0 10px rgba(255, 255, 255, 0.3)',
                            border: '8px solid #4b5563'
                        }}
                    >
                        <div className="w-[85%] h-[85%] rounded-full border-2 border-white/30 flex items-center justify-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 mix-blend-overlay"></div>
                            <span className="text-8xl font-display font-black text-slate-700 drop-shadow-md relative z-10">T</span>
                        </div>
                    </div>
                </motion.div>

                {/* Shadow */}
                <motion.div
                    className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-black/40 blur-xl rounded-full"
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
                    "px-10 py-4 rounded-full font-display font-bold text-lg tracking-wider transition-all duration-300",
                    isFlipping
                        ? "bg-secondary text-muted-foreground cursor-not-allowed"
                        : "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-[0_0_30px_-5px_rgba(245,158,11,0.6)] hover:shadow-[0_0_50px_-5px_rgba(245,158,11,0.8)] hover:scale-105 active:scale-95"
                )}
            >
                {isFlipping ? 'FLIPPING...' : 'FLIP COIN'}
            </button>
        </div>
    );
}
