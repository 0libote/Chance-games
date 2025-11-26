import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { cn } from '../../lib/utils';
import { ConfettiEffect } from '../ConfettiEffect';

export function DiceRoll({ onResult }) {
    const [isRolling, setIsRolling] = useState(false);
    const [result, setResult] = useState(1);
    const [sides, setSides] = useState(6);
    const [showConfetti, setShowConfetti] = useState(false);
    const controls = useAnimation();

    // Colors for different dice
    const diceColors = {
        4: 'from-emerald-500 to-emerald-700',
        6: 'from-blue-500 to-blue-700',
        8: 'from-purple-500 to-purple-700',
        10: 'from-pink-500 to-pink-700',
        12: 'from-amber-500 to-amber-700',
        20: 'from-red-500 to-red-700',
    };

    const rollDice = async () => {
        if (isRolling) return;
        setIsRolling(true);
        setShowConfetti(false);

        const newResult = Math.floor(Math.random() * sides) + 1;

        // Random rotations for tumbling effect
        const xRot = 720 + Math.random() * 360;
        const yRot = 720 + Math.random() * 360;
        const zRot = 360 + Math.random() * 360;

        await controls.start({
            rotateX: [0, xRot],
            rotateY: [0, yRot],
            rotateZ: [0, zRot],
            y: [0, -200, 0, -100, 0],
            scale: [1, 1.2, 1],
            transition: {
                duration: 2.5,
                ease: "easeOut",
                times: [0, 1]
            }
        });

        // Reset to a clean state that shows the result
        // Note: In a real 3D physics engine we'd land on the face. 
        // Here we will snap to the result face or just show the result on the "front" face after the roll.
        // To keep it simple and robust: we spin wildy, then fade in the result on a "clean" view or 
        // ensure the final rotation aligns with a face.
        // For this implementation, we'll use a "magic" snap:
        // We'll reset rotation to 0 and show the result on the front face.

        controls.set({ rotateX: 0, rotateY: 0, rotateZ: 0, y: 0 });

        setResult(newResult);
        setIsRolling(false);
        setShowConfetti(true);
        if (onResult) onResult(`Rolled a ${newResult}`);
    };

    // Components for different dice shapes
    const DieFace = ({ className, children, style }) => (
        <div
            className={cn(
                "absolute flex items-center justify-center backface-hidden border border-white/20 shadow-inner",
                `bg-gradient-to-br ${diceColors[sides]}`,
                className
            )}
            style={style}
        >
            <span className="text-white font-bold drop-shadow-md transform translate-z-[1px]">{children}</span>
        </div>
    );

    const D4 = () => {
        // Tetrahedron
        // 4 faces, equilateral triangles
        const h = 100 * Math.sqrt(3) / 2; // Height of triangle
        return (
            <div className="relative w-24 h-24 preserve-3d" style={{ transformStyle: 'preserve-3d' }}>
                {/* Simplified D4: Pyramid */}
                {/* We'll use CSS borders for triangles or clip-path */}
                {[1, 2, 3, 4].map((n, i) => (
                    <div key={n} className="absolute w-full h-full flex items-center justify-center"
                        style={{
                            transform: i === 0 ? 'rotateY(0deg) translateZ(10px) rotateX(30deg)' :
                                i === 1 ? 'rotateY(120deg) translateZ(10px) rotateX(30deg)' :
                                    i === 2 ? 'rotateY(240deg) translateZ(10px) rotateX(30deg)' :
                                        'rotateX(-90deg) translateZ(10px)', // Base
                            transformOrigin: '50% 50%',
                        }}
                    >
                        <div className={`w-0 h-0 border-l-[50px] border-r-[50px] border-b-[86.6px] border-l-transparent border-r-transparent border-b-emerald-600 relative`}>
                            <span className="absolute -translate-x-1/2 top-10 text-white font-bold text-xl">{isRolling ? '?' : (result === n ? n : '')}</span>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    const D6 = () => (
        <div className="relative w-24 h-24 preserve-3d">
            <DieFace className="w-full h-full rounded-xl translate-z-12" style={{ transform: 'translateZ(48px)' }}>{isRolling ? '?' : result}</DieFace>
            <DieFace className="w-full h-full rounded-xl -translate-z-12 rotate-y-180" style={{ transform: 'rotateY(180deg) translateZ(48px)' }}>{isRolling ? '?' : (result === 6 ? 1 : 6)}</DieFace>
            <DieFace className="w-full h-full rounded-xl rotate-y-90 translate-z-12" style={{ transform: 'rotateY(90deg) translateZ(48px)' }}>{isRolling ? '?' : (result === 5 ? 2 : 5)}</DieFace>
            <DieFace className="w-full h-full rounded-xl -rotate-y-90 translate-z-12" style={{ transform: 'rotateY(-90deg) translateZ(48px)' }}>{isRolling ? '?' : (result === 2 ? 5 : 2)}</DieFace>
            <DieFace className="w-full h-full rounded-xl rotate-x-90 translate-z-12" style={{ transform: 'rotateX(90deg) translateZ(48px)' }}>{isRolling ? '?' : (result === 4 ? 3 : 4)}</DieFace>
            <DieFace className="w-full h-full rounded-xl -rotate-x-90 translate-z-12" style={{ transform: 'rotateX(-90deg) translateZ(48px)' }}>{isRolling ? '?' : (result === 3 ? 4 : 3)}</DieFace>
        </div>
    );

    const D8 = () => {
        // Octahedron: 8 triangles
        // Simplified representation
        return (
            <div className="relative w-24 h-24 preserve-3d">
                <div className={`w-full h-full bg-gradient-to-br ${diceColors[sides]} clip-path-polygon-[50%_0,100%_50%,50%_100%,0_50%] flex items-center justify-center`}>
                    <span className="text-3xl font-bold text-white">{result}</span>
                </div>
            </div>
        );
    };

    // For complex shapes (D8, D10, D12, D20), constructing full CSS 3D is extremely verbose and prone to breaking.
    // Instead, we will use a "Generic Polyhedron" look for them but change the shape using clip-path 
    // and ensure the 3D tumbling animation sells the effect.
    // We will use a "Card" that rotates and shows the number.

    const GenericDie = ({ shapeClass }) => (
        <div className="relative w-28 h-28 preserve-3d flex items-center justify-center">
            {/* Front Face */}
            <div
                className={cn(
                    "absolute inset-0 flex items-center justify-center shadow-lg border-2 border-white/30 backdrop-blur-sm",
                    `bg-gradient-to-br ${diceColors[sides]}`,
                    shapeClass
                )}
                style={{ transform: 'translateZ(2px)' }}
            >
                <span className="text-4xl font-black text-white drop-shadow-lg">{result}</span>
            </div>
            {/* Back Face (for thickness) */}
            <div
                className={cn(
                    "absolute inset-0 flex items-center justify-center bg-black/20",
                    shapeClass
                )}
                style={{ transform: 'translateZ(-2px)' }}
            />
        </div>
    );

    const renderDie = () => {
        switch (sides) {
            case 4: return <D4 />; // Custom D4
            case 6: return <D6 />; // True 3D Cube
            case 8: return <GenericDie shapeClass="clip-path-d8" />; // Diamond shape
            case 10: return <GenericDie shapeClass="clip-path-d10" />; // Kite shape
            case 12: return <GenericDie shapeClass="clip-path-d12" />; // Pentagon/Hexagon approx
            case 20: return <GenericDie shapeClass="clip-path-d20" />; // Hexagon approx
            default: return <D6 />;
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-full py-10 relative perspective-1000 w-full">
            <ConfettiEffect trigger={showConfetti} duration={2000} />

            <style jsx>{`
                .clip-path-d8 { clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%); }
                .clip-path-d10 { clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%); } /* Similar to D8 but we'll style it differently if needed */
                .clip-path-d12 { clip-path: polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%); }
                .clip-path-d20 { clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%); }
            `}</style>

            <div className="relative w-40 h-40 mb-16 flex items-center justify-center" style={{ perspective: '1000px' }}>
                <motion.div
                    className="relative preserve-3d"
                    animate={controls}
                    initial={{ rotateX: 0, rotateY: 0 }}
                    style={{ transformStyle: 'preserve-3d' }}
                >
                    {renderDie()}
                </motion.div>

                {/* Shadow */}
                <motion.div
                    className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-black/30 blur-xl rounded-full"
                    animate={{
                        scale: isRolling ? [1, 0.5, 1] : 1,
                        opacity: isRolling ? [0.3, 0.1, 0.3] : 0.3,
                    }}
                    transition={{ duration: 2.5 }}
                />
            </div>

            <div className="w-full max-w-md mb-8 px-4">
                <label className="block text-sm font-medium text-muted-foreground mb-4 text-center uppercase tracking-wider">
                    Choose Die
                </label>
                <div className="flex flex-wrap gap-3 justify-center">
                    {[4, 6, 8, 10, 12, 20].map(num => (
                        <button
                            key={num}
                            onClick={() => setSides(num)}
                            className={cn(
                                "w-12 h-12 rounded-xl font-bold transition-all duration-200 flex items-center justify-center border-2",
                                sides === num
                                    ? `bg-primary text-primary-foreground border-primary shadow-lg scale-110`
                                    : "bg-card text-muted-foreground border-border hover:border-primary/50 hover:text-foreground hover:scale-105"
                            )}
                        >
                            D{num}
                        </button>
                    ))}
                </div>
            </div>

            <button
                onClick={rollDice}
                disabled={isRolling}
                className={cn(
                    "px-12 py-4 rounded-xl font-display font-bold text-lg tracking-wider transition-all duration-200 shadow-lg",
                    isRolling
                        ? "bg-secondary text-muted-foreground cursor-not-allowed shadow-none"
                        : "bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] shadow-primary/25"
                )}
            >
                {isRolling ? 'ROLLING...' : 'ROLL DICE'}
            </button>
        </div>
    );
}
