import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useMotionValue, useTransform } from 'framer-motion';
import { cn } from '../../lib/utils';
import { ConfettiEffect } from '../ConfettiEffect';

export function RandomChoice({ onResult }) {
    const [isChoosing, setIsChoosing] = useState(false);
    const [result, setResult] = useState(null);
    const [showConfetti, setShowConfetti] = useState(false);

    // We'll use a long strip of "Yes" and "No" for the rolling effect
    const stripLength = 40;
    const itemHeight = 120; // Height of each item in pixels
    const choices = Array.from({ length: stripLength }).map((_, i) => i % 2 === 0 ? 'Yes' : 'No');

    const controls = useAnimation();
    const containerRef = useRef(null);

    const makeChoice = async () => {
        if (isChoosing) return;
        setIsChoosing(true);
        setShowConfetti(false);
        setResult(null);

        // Randomize the landing position (must be near the end of the strip)
        // Ensure we land on a valid item center
        // We want to land on index between stripLength - 10 and stripLength - 2
        const minIndex = stripLength - 12;
        const maxIndex = stripLength - 2;
        const landingIndex = Math.floor(Math.random() * (maxIndex - minIndex + 1)) + minIndex;

        const landingPosition = -(landingIndex * itemHeight);
        const finalResult = choices[landingIndex];

        // Reset to start
        await controls.set({ y: 0 });

        // Animate to the landing position
        await controls.start({
            y: landingPosition,
            transition: {
                duration: 3,
                ease: [0.1, 0.8, 0.2, 1], // Custom cubic bezier for "spin down" feel
            }
        });

        setResult(finalResult);
        setIsChoosing(false);
        setShowConfetti(true);
        if (onResult) onResult(finalResult);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-full py-8 relative w-full">
            <ConfettiEffect trigger={showConfetti} duration={2500} />

            <div className="relative w-full max-w-md h-48 mb-12 mx-4 perspective-1000">
                {/* Frame/Window */}
                <div className="absolute inset-0 z-20 pointer-events-none border-4 border-primary/20 rounded-3xl glass-strong shadow-2xl">
                    {/* Gradient Overlays for depth */}
                    <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-background to-transparent z-10" />
                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent z-10" />

                    {/* Center Highlight Line */}
                    <div className="absolute top-1/2 left-4 right-4 h-[2px] bg-primary/50 -translate-y-1/2 z-20 shadow-[0_0_10px_rgba(var(--primary),0.5)]" />
                </div>

                {/* Rolling Strip */}
                <div className="w-full h-full overflow-hidden rounded-3xl bg-black/5 relative">
                    <motion.div
                        animate={controls}
                        initial={{ y: 0 }}
                        className="flex flex-col items-center w-full"
                        style={{ paddingTop: 'calc(50% - 60px)' }} // Center the first item
                    >
                        {choices.map((choice, i) => (
                            <div
                                key={i}
                                className="flex items-center justify-center w-full shrink-0"
                                style={{ height: itemHeight }}
                            >
                                <span className={cn(
                                    "text-6xl sm:text-7xl font-display font-black tracking-tight",
                                    choice === 'Yes' ? "text-emerald-500" : "text-rose-500",
                                    // Add blur effect based on speed (simulated by just blurring everything during motion if we wanted, 
                                    // but pure motion blur is hard. We'll stick to clean text)
                                )}>
                                    {choice}
                                </span>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>

            <button
                onClick={makeChoice}
                disabled={isChoosing}
                className={cn(
                    "px-12 py-4 rounded-full font-display font-bold text-lg tracking-wider transition-all duration-300 shadow-lg",
                    isChoosing
                        ? "bg-secondary text-muted-foreground cursor-not-allowed shadow-none"
                        : "bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.02] active:scale-[0.98]"
                )}
            >
                {isChoosing ? 'DECIDING...' : result ? 'ASK AGAIN' : 'YES OR NO?'}
            </button>
        </div>
    );
}
