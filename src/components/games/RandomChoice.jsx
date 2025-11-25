import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import { ConfettiEffect } from '../ConfettiEffect';

export function RandomChoice({ onResult }) {
    const [isChoosing, setIsChoosing] = useState(false);
    const [result, setResult] = useState('');
    const [showConfetti, setShowConfetti] = useState(false);
    const [customChoices, setCustomChoices] = useState('');
    const [activeChoices, setActiveChoices] = useState(['Pizza', 'Burger', 'Sushi', 'Tacos', 'Salad', 'Pasta']);
    const [rotation, setRotation] = useState(0);

    // Update active choices when input changes
    useEffect(() => {
        if (customChoices.trim()) {
            const split = customChoices.split(',').map(s => s.trim()).filter(s => s.length > 0);
            if (split.length > 1) setActiveChoices(split);
        }
    }, [customChoices]);

    const makeChoice = () => {
        if (isChoosing) return;
        setIsChoosing(true);
        setShowConfetti(false);
        setResult('');

        // Spin logic
        const spins = 5 + Math.random() * 5; // Random spins
        const segmentAngle = 360 / activeChoices.length;
        const targetIndex = Math.floor(Math.random() * activeChoices.length);
        const targetRotation = rotation + (spins * 360) + (targetIndex * segmentAngle);

        setRotation(targetRotation);

        setTimeout(() => {
            setIsChoosing(false);
            const winner = activeChoices[activeChoices.length - 1 - (Math.floor((targetRotation % 360) / segmentAngle) % activeChoices.length)];
            // Correction for the index calculation based on rotation
            // Actually, simpler logic:
            // The item at the "front" (0deg) depends on rotation.
            // Let's just pick the winner first and rotate TO it.
        }, 3000);
    };

    // Better spin logic: Pick winner -> Calculate rotation
    const spinToWin = () => {
        if (isChoosing) return;
        setIsChoosing(true);
        setShowConfetti(false);
        setResult('');

        const winnerIndex = Math.floor(Math.random() * activeChoices.length);
        const winner = activeChoices[winnerIndex];

        // Calculate rotation to land this item at 0deg (front)
        // Each item is at index * angle
        // We want rotation + itemAngle = 0 (mod 360) basically
        // So targetRotation = -itemAngle + extraSpins

        const segmentAngle = 360 / activeChoices.length;
        const currentRotation = rotation;
        const extraSpins = 360 * 5; // 5 full spins

        // We want the final rotation to be such that (finalRotation + index*angle) % 360 === 0
        // But actually, we are rotating the CONTAINER.
        // If container rotates -X deg, item at X deg comes to 0.

        const targetRotation = currentRotation - (currentRotation % 360) - extraSpins - (winnerIndex * segmentAngle);

        setRotation(targetRotation);

        setTimeout(() => {
            setIsChoosing(false);
            setResult(winner);
            setShowConfetti(true);
            if (onResult) onResult(winner);
        }, 3000);
    };

    const radius = 140; // Radius of the 3D carousel

    return (
        <div className="flex flex-col items-center justify-center h-full py-8 relative overflow-hidden">
            <ConfettiEffect trigger={showConfetti} duration={2500} />

            <div className="relative w-full max-w-lg h-64 flex items-center justify-center mb-8 perspective-1000">
                {/* Selection Highlight / Arrow */}
                <div className="absolute z-20 w-full h-16 bg-gradient-to-r from-transparent via-primary/20 to-transparent border-y-2 border-primary/50 flex items-center justify-center pointer-events-none backdrop-blur-[2px]">
                    <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-0 h-0 border-y-[10px] border-y-transparent border-l-[15px] border-l-primary rotate-180" />
                    <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 w-0 h-0 border-y-[10px] border-y-transparent border-l-[15px] border-l-primary" />
                </div>

                {/* 3D Carousel */}
                <motion.div
                    className="relative w-full h-full preserve-3d flex items-center justify-center"
                    animate={{ rotateX: rotation }}
                    transition={{ duration: 3, ease: [0.2, 0.8, 0.2, 1] }}
                >
                    {activeChoices.map((choice, i) => {
                        const angle = (360 / activeChoices.length) * i;
                        return (
                            <div
                                key={i}
                                className="absolute w-full h-12 flex items-center justify-center backface-hidden"
                                style={{
                                    transform: `rotateX(${angle}deg) translateZ(${radius}px)`,
                                }}
                            >
                                <span className={cn(
                                    "text-2xl sm:text-3xl font-display font-bold transition-all duration-300",
                                    result === choice ? "text-primary scale-125 drop-shadow-[0_0_10px_rgba(139,92,246,0.8)]" : "text-muted-foreground/50"
                                )}>
                                    {choice}
                                </span>
                            </div>
                        );
                    })}
                </motion.div>

                {/* Fade masks */}
                <div className="absolute top-0 w-full h-20 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none" />
                <div className="absolute bottom-0 w-full h-20 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />
            </div>

            <div className="w-full max-w-md space-y-6 px-4 z-20">
                <div className="glass p-4 rounded-xl border border-white/10">
                    <label className="block text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">
                        Custom Choices (comma separated)
                    </label>
                    <input
                        type="text"
                        value={customChoices}
                        onChange={(e) => setCustomChoices(e.target.value)}
                        placeholder="Pizza, Burger, Sushi..."
                        className="w-full bg-transparent border-b border-white/20 py-2 focus:outline-none focus:border-primary text-center text-lg placeholder:text-muted-foreground/30"
                    />
                </div>

                <button
                    onClick={spinToWin}
                    disabled={isChoosing}
                    className={cn(
                        "w-full px-8 py-4 rounded-xl font-display font-bold text-lg tracking-wider transition-all duration-300",
                        isChoosing
                            ? "bg-secondary text-muted-foreground cursor-not-allowed"
                            : "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-[0_0_30px_-5px_hsl(var(--primary)/0.5)] hover:shadow-[0_0_50px_-5px_hsl(var(--primary)/0.7)] hover:scale-[1.02] active:scale-[0.98]"
                    )}
                >
                    {isChoosing ? 'CHOOSING...' : 'MAKE A CHOICE'}
                </button>
            </div>

            {/* Result Display */}
            <AnimatePresence>
                {result && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="absolute top-10 left-0 right-0 text-center pointer-events-none"
                    >
                        <span className="text-sm font-bold text-primary uppercase tracking-[0.2em]">Winner</span>
                        <h2 className="text-4xl font-black text-white drop-shadow-lg mt-1">{result}</h2>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
