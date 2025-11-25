import React, { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { cn } from '../../lib/utils';
import { ConfettiEffect } from '../ConfettiEffect';

export function DiceRoll({ onResult }) {
    const [isRolling, setIsRolling] = useState(false);
    const [result, setResult] = useState(1);
    const [sides, setSides] = useState(6);
    const [showConfetti, setShowConfetti] = useState(false);
    const controls = useAnimation();

    const rollDice = async () => {
        if (isRolling) return;
        setIsRolling(true);
        setShowConfetti(false);

        // Determine result
        const newResult = Math.floor(Math.random() * sides) + 1;

        // Calculate rotations for 6-sided die
        const rotations = {
            1: { x: 720, y: 720, z: 0 },
            2: { x: 720, y: 630, z: 0 },
            3: { x: 630, y: 720, z: 0 },
            4: { x: 810, y: 720, z: 0 },
            5: { x: 720, y: 810, z: 0 },
            6: { x: 720, y: 900, z: 0 },
        };

        const targetRotation = sides === 6 ? rotations[newResult] : { x: 720, y: 720, z: 0 };

        // Add random extra rotations for realism
        const extraRotations = 2; // Number of full spins
        const finalX = targetRotation.x + (extraRotations * 360);
        const finalY = targetRotation.y + (extraRotations * 360);

        await controls.start({
            rotateX: [0, finalX],
            rotateY: [0, finalY],
            rotateZ: [0, 360, 0],
            y: [0, -150, 0, -50, 0],
            scale: [1, 1.2, 1],
            transition: {
                duration: 2,
                ease: "easeOut",
                times: [0, 1]
            }
        });

        setResult(newResult);
        setIsRolling(false);
        setShowConfetti(true);
        if (onResult) onResult(`Rolled a ${newResult}`);
    };

    // Dot positions for standard 6-sided dice
    const dotPositions = {
        1: [[50, 50]],
        2: [[25, 25], [75, 75]],
        3: [[25, 25], [50, 50], [75, 75]],
        4: [[25, 25], [75, 25], [25, 75], [75, 75]],
        5: [[25, 25], [75, 25], [50, 50], [25, 75], [75, 75]],
        6: [[25, 25], [75, 25], [25, 50], [75, 50], [25, 75], [75, 75]]
    };

    const DiceFace = ({ number, transform }) => (
        <div
            className="absolute w-full h-full bg-gradient-to-br from-white via-gray-100 to-gray-300 rounded-xl border border-gray-200"
            style={{
                transform,
                backfaceVisibility: 'hidden',
                boxShadow: 'inset 0 0 15px rgba(0,0,0,0.1)'
            }}
        >
            {dotPositions[number]?.map((dot, i) => (
                <div
                    key={i}
                    className="absolute w-5 h-5 bg-black rounded-full shadow-inner"
                    style={{
                        left: `${dot[0]}%`,
                        top: `${dot[1]}%`,
                        transform: 'translate(-50%, -50%)',
                        background: 'radial-gradient(circle at 30% 30%, #444, #000)'
                    }}
                />
            ))}
        </div>
    );

    return (
        <div className="flex flex-col items-center justify-center h-full py-10 relative perspective-1000">
            <ConfettiEffect trigger={showConfetti} duration={2000} />

            <div className="relative w-40 h-40 mb-12" style={{ perspective: '1000px' }}>
                <motion.div
                    className="w-full h-full relative preserve-3d"
                    animate={controls}
                    initial={{ rotateX: 0, rotateY: 0 }}
                    style={{ transformStyle: 'preserve-3d' }}
                >
                    {sides === 6 ? (
                        <>
                            <DiceFace number={1} transform="translateZ(80px)" />
                            <DiceFace number={6} transform="rotateY(180deg) translateZ(80px)" />
                            <DiceFace number={2} transform="rotateY(-90deg) translateZ(80px)" />
                            <DiceFace number={5} transform="rotateY(90deg) translateZ(80px)" />
                            <DiceFace number={3} transform="rotateX(-90deg) translateZ(80px)" />
                            <DiceFace number={4} transform="rotateX(90deg) translateZ(80px)" />
                        </>
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary to-accent rounded-3xl shadow-2xl flex items-center justify-center border-4 border-white/30 glow-primary" style={{ transformStyle: 'preserve-3d' }}>
                            <span className="text-7xl font-black text-white drop-shadow-lg">{result}</span>
                        </div>
                    )}
                </motion.div>

                {/* Shadow */}
                <motion.div
                    className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-black/30 blur-xl rounded-full"
                    animate={{
                        scale: isRolling ? [1, 0.5, 1] : 1,
                        opacity: isRolling ? [0.3, 0.1, 0.3] : 0.3,
                    }}
                    transition={{ duration: 2 }}
                />
            </div>

            <div className="w-full max-w-xs mb-8 px-4">
                <label className="block text-sm font-medium text-muted-foreground mb-3 text-center">
                    Number of sides: <span className="text-foreground font-bold text-base">{sides}</span>
                </label>
                <input
                    type="range"
                    min="2"
                    max="20"
                    value={sides}
                    onChange={(e) => setSides(parseInt(e.target.value))}
                    className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                    style={{
                        background: `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) ${((sides - 2) / 18) * 100}%, hsl(var(--secondary)) ${((sides - 2) / 18) * 100}%, hsl(var(--secondary)) 100%)`
                    }}
                />
            </div>

            <button
                onClick={rollDice}
                disabled={isRolling}
                className={cn(
                    "px-10 py-4 rounded-full font-display font-bold text-lg tracking-wider transition-all duration-300",
                    isRolling
                        ? "bg-secondary text-muted-foreground cursor-not-allowed"
                        : "bg-gradient-to-r from-primary to-accent text-white shadow-[0_0_30px_-5px_hsl(var(--primary)/0.6)] hover:shadow-[0_0_50px_-5px_hsl(var(--primary)/0.8)] hover:scale-105 active:scale-95"
                )}
            >
                {isRolling ? 'ROLLING...' : 'ROLL DICE'}
            </button>
        </div>
    );
}
