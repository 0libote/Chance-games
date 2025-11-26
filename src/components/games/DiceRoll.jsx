import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { cn } from '../../lib/utils';
import { ConfettiEffect } from '../ConfettiEffect';

export function DiceRoll({ onResult }) {
    const [isRolling, setIsRolling] = useState(false);
    const [result, setResult] = useState(1);
    const [sides, setSides] = useState(6);
    const [showConfetti, setShowConfetti] = useState(false);
    const controls = useAnimation();
    
    // We use a ref to track the current rotation to avoid gimbal lock issues 
    // and ensure smooth transitions between rolls
    const currentRotation = useRef({ x: 0, y: 0, z: 0 });

    // Colors for different dice - using gradients for metallic/gem look
    const diceColors = {
        4: 'from-emerald-400 via-emerald-600 to-emerald-800 border-emerald-300',
        6: 'from-blue-400 via-blue-600 to-blue-800 border-blue-300',
        8: 'from-purple-400 via-purple-600 to-purple-800 border-purple-300',
        10: 'from-pink-400 via-pink-600 to-pink-800 border-pink-300',
        12: 'from-amber-400 via-amber-600 to-amber-800 border-amber-300',
        20: 'from-red-400 via-red-600 to-red-800 border-red-300',
    };

    // --- GEOMETRY DEFINITIONS ---
    // Each face has a rotation that places it in 3D space.
    // To show a face, we need to rotate the container by the INVERSE of that face's rotation.
    
    // D4: Tetrahedron
    // Angle between faces and center: 109.47 degrees? No, that's for atoms.
    // Dihedral angle is 70.53.
    // Let's use a standard orientation.
    // Face 1: Bottom
    // Face 2: Front
    // Face 3: Back Left
    // Face 4: Back Right
    // Actually, for a rolling die, it's easier to define rotations that bring the face to FRONT (+Z).
    const d4Transforms = {
        1: { rotateX: -19.5, rotateY: 180, rotateZ: 0 }, // Back
        2: { rotateX: -19.5, rotateY: -60, rotateZ: 0 }, // Front Right
        3: { rotateX: -19.5, rotateY: 60, rotateZ: 0 },  // Front Left
        4: { rotateX: 90, rotateY: 0, rotateZ: 0 },      // Bottom
    };
    // Note: D4 is tricky because it lands on a face, so the point is up. 
    // Usually you read the number at the top or bottom. 
    // We'll assume "top vertex" reading style for simplicity or center number.
    // Let's try to align the face to the camera.

    // D6: Cube
    const d6Transforms = {
        1: { rotateX: 0, rotateY: 0, rotateZ: 0 },
        2: { rotateX: 0, rotateY: -90, rotateZ: 0 },
        3: { rotateX: 0, rotateY: -180, rotateZ: 0 }, // Back
        4: { rotateX: 0, rotateY: 90, rotateZ: 0 },
        5: { rotateX: -90, rotateY: 0, rotateZ: 0 },
        6: { rotateX: 90, rotateY: 0, rotateZ: 0 },
    };

    // D8: Octahedron
    // 8 faces. 
    // Top pyramid: 1, 2, 3, 4. Bottom pyramid: 5, 6, 7, 8.
    // Angle from horizontal plane: 35.264 degrees.
    const d8Tilt = 35.264;
    const d8Transforms = {
        1: { rotateX: d8Tilt, rotateY: 0, rotateZ: 0 },
        2: { rotateX: d8Tilt, rotateY: -90, rotateZ: 0 },
        3: { rotateX: d8Tilt, rotateY: -180, rotateZ: 0 },
        4: { rotateX: d8Tilt, rotateY: 90, rotateZ: 0 },
        5: { rotateX: -180 - d8Tilt, rotateY: 0, rotateZ: 0 },
        6: { rotateX: -180 - d8Tilt, rotateY: 90, rotateZ: 0 },
        7: { rotateX: -180 - d8Tilt, rotateY: 180, rotateZ: 0 },
        8: { rotateX: -180 - d8Tilt, rotateY: -90, rotateZ: 0 },
    };

    // D12: Dodecahedron
    // 12 pentagonal faces.
    // Dihedral angle 116.565.
    // This is complex. We'll use pre-calculated values for a standard d12 orientation.
    const d12Transforms = {
        1: { rotateX: 0, rotateY: 0, rotateZ: 0 },
        2: { rotateX: -63.4, rotateY: 0, rotateZ: 0 },
        3: { rotateX: -63.4, rotateY: -72, rotateZ: 0 },
        4: { rotateX: -63.4, rotateY: -144, rotateZ: 0 },
        5: { rotateX: -63.4, rotateY: -216, rotateZ: 0 },
        6: { rotateX: -63.4, rotateY: -288, rotateZ: 0 },
        7: { rotateX: 180, rotateY: 0, rotateZ: 0 }, // Opposite 1
        8: { rotateX: 116.6, rotateY: 0, rotateZ: 0 },
        9: { rotateX: 116.6, rotateY: -72, rotateZ: 0 },
        10: { rotateX: 116.6, rotateY: -144, rotateZ: 0 },
        11: { rotateX: 116.6, rotateY: -216, rotateZ: 0 },
        12: { rotateX: 116.6, rotateY: -288, rotateZ: 0 },
    };

    // D20: Icosahedron
    // 20 triangular faces.
    // Top cap (1), Upper belt (5), Lower belt (5), Bottom cap (1) ... wait, structure is 5 top, 5 bottom, 10 middle?
    // Standard numbering is complex. We'll map visual faces to numbers arbitrarily but consistently.
    // Using a known set of rotations for an icosahedron.
    // Top: 1. Bottom: 20.
    const d20Tilt1 = 53; // Approx
    const d20Tilt2 = 10.8;
    const d20Transforms = {
        1: { rotateX: 0, rotateY: 0, rotateZ: 0 }, // Top
        // Upper ring
        2: { rotateX: -d20Tilt1, rotateY: 0, rotateZ: 0 },
        3: { rotateX: -d20Tilt1, rotateY: -72, rotateZ: 0 },
        4: { rotateX: -d20Tilt1, rotateY: -144, rotateZ: 0 },
        5: { rotateX: -d20Tilt1, rotateY: -216, rotateZ: 0 },
        6: { rotateX: -d20Tilt1, rotateY: -288, rotateZ: 0 },
        // Lower ring (interleaved)
        7: { rotateX: -180 + d20Tilt2, rotateY: -36, rotateZ: 0 },
        8: { rotateX: -180 + d20Tilt2, rotateY: -108, rotateZ: 0 },
        9: { rotateX: -180 + d20Tilt2, rotateY: -180, rotateZ: 0 },
        10: { rotateX: -180 + d20Tilt2, rotateY: -252, rotateZ: 0 },
        11: { rotateX: -180 + d20Tilt2, rotateY: -324, rotateZ: 0 },
        // ... mapping 20 faces is tedious, let's simplify.
        // We will use a "LookAt" approach for the roll.
        // Actually, for D20, we can just spin wildly and snap to the face rotation.
        // Let's define the faces in the CSS and then here just define the target rotation to bring that face to front.
        // If Face N has transform T, we apply T^-1.
    };
    
    // Helper to get target rotation
    const getTargetRotation = (sides, result) => {
        // For now, we'll implement accurate ones for D6, D8, D12.
        // For D4, D10, D20 we might need to approximate or hardcode the inverse.
        
        // Basic logic:
        // 1. Define the rotation of the face in the model.
        // 2. Target rotation = -1 * Face Rotation.
        
        // Let's use a simpler approach:
        // We define the rotation required to show face N.
        
        if (sides === 6) {
            const map = {
                1: { x: 0, y: 0 },
                2: { x: 0, y: 90 },
                3: { x: 0, y: 180 },
                4: { x: 0, y: -90 },
                5: { x: 90, y: 0 },
                6: { x: -90, y: 0 }
            };
            return map[result];
        }
        
        if (sides === 8) {
             // To bring face to front, we invert the face's natural rotation
             // Face 1 is at X=35. To bring to front (0), we rotate X=-35.
             const t = d8Transforms[result];
             if (t) return { x: -t.rotateX, y: -t.rotateY, z: 0 };
        }
        
        if (sides === 12) {
            const t = d12Transforms[result];
            if (t) return { x: -t.rotateX, y: -t.rotateY, z: 0 };
        }

        // Fallback for others (D4, D10, D20) - we'll implement their specific logic below
        return { x: 0, y: 0, z: 0 };
    };


    const rollDice = async () => {
        if (isRolling) return;
        setIsRolling(true);
        setShowConfetti(false);

        const newResult = Math.floor(Math.random() * sides) + 1;
        setResult(newResult); // Set immediately so the face is correct when we land

        // 1. Spin wildly
        // We add multiple full rotations (360 * n) to the current rotation
        // plus the target offset.
        
        let target = { x: 0, y: 0, z: 0 };
        
        if (sides === 6 || sides === 8 || sides === 12) {
            target = getTargetRotation(sides, newResult);
        } else if (sides === 4) {
             // D4 specific
             // If we want face N to be front.
             // Our D4 model: Face 1 is back, 2 front-right, 3 front-left, 4 bottom.
             // This is a weird orientation.
             // Let's re-orient D4 so Face 1 is Front.
             // New D4 Model: 1 Front, 2 Back-Right, 3 Back-Left, 4 Bottom.
             const map = {
                 1: { x: -20, y: 0 }, // Tilt back slightly to show front face vertical? No, tetrahedron faces are slanted.
                 // To show face 1 flat to camera, we need to rotate X by +19.5
                 1: { x: 19.5, y: 0 },
                 2: { x: 19.5, y: -120 },
                 3: { x: 19.5, y: 120 },
                 4: { x: -90, y: 0 }
             };
             target = map[newResult] || { x: 0, y: 0 };
        } else if (sides === 20) {
            // D20 simplified mapping
            // We'll just define a few key rotations for the demo or use a mathematical lookup
            // For a perfect D20, we need the exact dihedral angles.
            // Let's just spin to a random "close enough" angle for the visual if we can't map perfectly,
            // BUT user wants "Realistic".
            // So we will use a pre-calculated set for D20.
            // Face 1 is Top. To show it, Rotate X = -90? No, let's say Face 1 is Front.
            
            // Hack: For D20, since it's a sphere basically, we can just show the number on the face that ends up in front.
            // But we are building a 3D model with fixed numbers.
            // Let's use a standard D20 net mapping.
            // To save time/complexity, we will define the Target Rotation for each of the 20 faces.
            // This is the "correct" way.
            
            // Golden Ratio
            const phi = (1 + Math.sqrt(5)) / 2;
            const angle = Math.atan(2); // ~63.4 deg
            // Dihedral is 138.2
            
            // Let's rely on the CSS transforms defined in the render function
            // and simply invert them.
            // See renderD20 for the face definitions.
            
            // For now, let's just add random spins for the "Wild" part
        }

        // Random extra spins
        const spins = 2; // Number of full rotations
        const xRot = target.x + (360 * spins * (Math.random() > 0.5 ? 1 : -1));
        const yRot = target.y + (360 * spins * (Math.random() > 0.5 ? 1 : -1));
        const zRot = target.z + (360 * (Math.random() > 0.5 ? 1 : -1)); // Add some Z spin for realism

        // For D10 and D20, we'll calculate target dynamically in the render or just use a lookup if we can.
        // Let's refine the D20/D10 logic in the animation step:
        
        // If we don't have a precise target for D10/D20 yet, we might land awkwardly.
        // Let's ensure we have targets.
        
        // D20 Targets (Approximate for visual alignment)
        // We will define the faces such that Face 1 is at (0,0).
        if (sides === 20) {
            // We'll use a lookup derived from the face construction
            // See d20Rotations below
             const r = d20Rotations[newResult] || { x: 0, y: 0 };
             target = { x: -r.x, y: -r.y, z: 0 };
        }
        if (sides === 10) {
             const r = d10Rotations[newResult] || { x: 0, y: 0 };
             target = { x: -r.x, y: -r.y, z: 0 };
        }

        // Apply the wild spin + target
        await controls.start({
            rotateX: [currentRotation.current.x, xRot + 720, target.x], // Spin wild then land
            rotateY: [currentRotation.current.y, yRot + 720, target.y],
            rotateZ: [currentRotation.current.z, zRot, 0], // Land with 0 Z usually looks best
            y: [0, -300, 0, -100, 0], // Bounce
            scale: [1, 1.2, 0.9, 1],
            transition: {
                duration: 2.5,
                ease: "easeOut",
                times: [0, 0.6, 1]
            }
        });

        currentRotation.current = target;
        setIsRolling(false);
        setShowConfetti(true);
        if (onResult) onResult(`Rolled a ${newResult}`);
    };

    // --- FACE COMPONENTS ---

    const Face = ({ children, className, style }) => (
        <div
            className={cn(
                "absolute flex items-center justify-center backface-hidden border shadow-inner backdrop-blur-sm",
                `bg-gradient-to-br ${diceColors[sides]}`,
                className
            )}
            style={style}
        >
            <span className="text-white font-bold drop-shadow-md transform translate-z-[1px] select-none">{children}</span>
        </div>
    );

    // D4: Tetrahedron
    const D4 = () => {
        // Height of triangle face from center
        // Inradius of tetrahedron = a / (2 * sqrt(24))
        // Let's just use visual tweaking.
        const r = 30; // degrees tilt
        const z = 35; // translate Z
        
        // We need to orient faces so they form a pyramid.
        // Face 1: Front
        // Face 2: Back Right
        // Face 3: Back Left
        // Face 4: Bottom
        
        return (
            <div className="relative w-24 h-24 preserve-3d" style={{ transformStyle: 'preserve-3d' }}>
                {/* Face 1 */}
                <div className="absolute w-full h-full flex items-center justify-center" style={{ transform: `rotateY(0deg) translateZ(${z}px) rotateX(19.5deg)` }}>
                   <div className={`w-0 h-0 border-l-[48px] border-r-[48px] border-b-[83px] border-l-transparent border-r-transparent border-b-emerald-600 relative drop-shadow-lg`}>
                        <span className="absolute -translate-x-1/2 top-12 text-white font-bold text-xl">1</span>
                   </div>
                </div>
                {/* Face 2 */}
                <div className="absolute w-full h-full flex items-center justify-center" style={{ transform: `rotateY(120deg) translateZ(${z}px) rotateX(19.5deg)` }}>
                   <div className={`w-0 h-0 border-l-[48px] border-r-[48px] border-b-[83px] border-l-transparent border-r-transparent border-b-emerald-600 relative drop-shadow-lg`}>
                        <span className="absolute -translate-x-1/2 top-12 text-white font-bold text-xl">2</span>
                   </div>
                </div>
                {/* Face 3 */}
                <div className="absolute w-full h-full flex items-center justify-center" style={{ transform: `rotateY(240deg) translateZ(${z}px) rotateX(19.5deg)` }}>
                   <div className={`w-0 h-0 border-l-[48px] border-r-[48px] border-b-[83px] border-l-transparent border-r-transparent border-b-emerald-600 relative drop-shadow-lg`}>
                        <span className="absolute -translate-x-1/2 top-12 text-white font-bold text-xl">3</span>
                   </div>
                </div>
                {/* Face 4 (Bottom) */}
                <div className="absolute w-full h-full flex items-center justify-center" style={{ transform: `rotateX(90deg) translateZ(${z}px)` }}>
                   <div className={`w-0 h-0 border-l-[48px] border-r-[48px] border-b-[83px] border-l-transparent border-r-transparent border-b-emerald-600 relative drop-shadow-lg`}>
                        <span className="absolute -translate-x-1/2 top-12 text-white font-bold text-xl">4</span>
                   </div>
                </div>
            </div>
        );
    };

    // D6: Cube
    const D6 = () => (
        <div className="relative w-24 h-24 preserve-3d">
            <Face className="w-full h-full rounded-xl" style={{ transform: 'translateZ(48px)' }}>1</Face>
            <Face className="w-full h-full rounded-xl" style={{ transform: 'rotateY(90deg) translateZ(48px)' }}>2</Face>
            <Face className="w-full h-full rounded-xl" style={{ transform: 'rotateY(180deg) translateZ(48px)' }}>3</Face>
            <Face className="w-full h-full rounded-xl" style={{ transform: 'rotateY(-90deg) translateZ(48px)' }}>4</Face>
            <Face className="w-full h-full rounded-xl" style={{ transform: 'rotateX(90deg) translateZ(48px)' }}>5</Face>
            <Face className="w-full h-full rounded-xl" style={{ transform: 'rotateX(-90deg) translateZ(48px)' }}>6</Face>
        </div>
    );

    // D8: Octahedron
    const D8 = () => {
        // Triangle clip path
        const clip = "polygon(50% 0%, 0% 100%, 100% 100%)";
        const style = { clipPath: clip, width: '100%', height: '86.6%' }; // Equilateral triangle ratio
        const shift = 15; // Z shift
        
        // We construct it from 8 faces.
        return (
            <div className="relative w-24 h-24 preserve-3d flex items-center justify-center">
                {[1, 2, 3, 4].map(i => (
                    <div key={i} className={`absolute w-24 h-24 flex items-center justify-center`}
                        style={{ transform: `rotateY(${(i-1)*90}deg) rotateX(35.26deg) translateZ(${shift}px)` }}>
                        <div className={`w-full h-full bg-gradient-to-br ${diceColors[8]} flex items-center justify-center border-b-2 border-white/30`} 
                             style={{ clipPath: clip }}>
                            <span className="mt-8 text-white font-bold text-xl">{i}</span>
                        </div>
                    </div>
                ))}
                {[5, 6, 7, 8].map(i => (
                    <div key={i} className={`absolute w-24 h-24 flex items-center justify-center`}
                        style={{ transform: `rotateY(${(i-5)*90}deg) rotateX(-144.74deg) translateZ(${shift}px)` }}>
                        <div className={`w-full h-full bg-gradient-to-br ${diceColors[8]} flex items-center justify-center border-b-2 border-white/30`} 
                             style={{ clipPath: clip }}>
                            <span className="mt-8 text-white font-bold text-xl">{i}</span>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    // D10: Pentagonal Trapezohedron (Approximated as 10 Kites)
    // This is hard to do perfectly with CSS. We will use a double pentagonal pyramid but with kite faces.
    // Top 5, Bottom 5.
    // Angle: ~50 deg?
    const d10Rotations = {
        1: { x: 45, y: 0 },
        2: { x: 45, y: -72 },
        3: { x: 45, y: -144 },
        4: { x: 45, y: -216 },
        5: { x: 45, y: -288 },
        6: { x: -135, y: 0 }, // Bottoms
        7: { x: -135, y: -72 },
        8: { x: -135, y: -144 },
        9: { x: -135, y: -216 },
        10: { x: -135, y: -288 },
    };
    
    const D10 = () => {
        // Kite shape
        const clip = "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)";
        // Actually D10 faces are kites.
        // Let's use a simpler "Double Pyramid" of kites.
        
        return (
            <div className="relative w-24 h-32 preserve-3d flex items-center justify-center">
                {/* Top 5 */}
                {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="absolute w-20 h-20 flex items-center justify-center"
                        style={{ transform: `rotateY(${(i-1)*72}deg) rotateX(45deg) translateZ(25px)` }}>
                         <div className={`w-full h-full bg-gradient-to-br ${diceColors[10]} flex items-center justify-center border border-white/20`}
                              style={{ clipPath: clip }}>
                             <span className="text-white font-bold text-lg">{i}</span>
                         </div>
                    </div>
                ))}
                {/* Bottom 5 - Interleaved */}
                {[6, 7, 8, 9, 10].map(i => (
                    <div key={i} className="absolute w-20 h-20 flex items-center justify-center"
                        style={{ transform: `rotateY(${(i-6)*72 + 36}deg) rotateX(135deg) translateZ(25px)` }}>
                         <div className={`w-full h-full bg-gradient-to-br ${diceColors[10]} flex items-center justify-center border border-white/20`}
                              style={{ clipPath: clip }}>
                             <span className="text-white font-bold text-lg">{i}</span>
                         </div>
                    </div>
                ))}
            </div>
        );
    };

    // D12: Dodecahedron
    const D12 = () => {
        // Pentagon shape
        const clip = "polygon(50% 0%, 95% 38%, 82% 100%, 18% 100%, 5% 38%)";
        const width = 60;
        const height = 60;
        const z = 45; // Apothem approx
        
        // Faces
        return (
            <div className="relative w-24 h-24 preserve-3d flex items-center justify-center">
                {/* 12 Faces based on d12Transforms keys */}
                {Object.entries(d12Transforms).map(([num, rot]) => (
                    <div key={num} className="absolute flex items-center justify-center"
                        style={{ 
                            width: `${width}px`, height: `${height}px`,
                            transform: `rotateY(${rot.rotateY}deg) rotateX(${rot.rotateX}deg) translateZ(${z}px)` 
                        }}>
                        <div className={`w-full h-full bg-gradient-to-br ${diceColors[12]} flex items-center justify-center border border-white/20`}
                             style={{ clipPath: clip }}>
                            <span className="text-white font-bold text-lg">{num}</span>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    // D20: Icosahedron
    // 20 Equilateral Triangles
    const d20Rotations = {
        // Top Cap
        1: { x: 53, y: 0 },
        2: { x: 53, y: -72 },
        3: { x: 53, y: -144 },
        4: { x: 53, y: -216 },
        5: { x: 53, y: -288 },
        // Middle Up
        6: { x: 11, y: -36 },
        7: { x: 11, y: -108 },
        8: { x: 11, y: -180 },
        9: { x: 11, y: -252 },
        10: { x: 11, y: -324 },
        // Middle Down
        11: { x: -11, y: 0 },
        12: { x: -11, y: -72 },
        13: { x: -11, y: -144 },
        14: { x: -11, y: -216 },
        15: { x: -11, y: -288 },
        // Bottom Cap
        16: { x: -53, y: -36 },
        17: { x: -53, y: -108 },
        18: { x: -53, y: -180 },
        19: { x: -53, y: -252 },
        20: { x: -53, y: -324 },
    };

    const D20 = () => {
        const clip = "polygon(50% 0%, 0% 100%, 100% 100%)";
        const w = 50;
        const h = 43.3; // w * sqrt(3)/2
        const z = 38; // Inradius approx
        
        return (
            <div className="relative w-24 h-24 preserve-3d flex items-center justify-center">
                 {Object.entries(d20Rotations).map(([num, rot]) => (
                    <div key={num} className="absolute flex items-center justify-center"
                        style={{ 
                            width: `${w}px`, height: `${h}px`,
                            transform: `rotateY(${rot.y}deg) rotateX(${rot.x}deg) translateZ(${z}px)` 
                        }}>
                        <div className={`w-full h-full bg-gradient-to-br ${diceColors[20]} flex items-center justify-center border-b border-white/30`}
                             style={{ clipPath: clip }}>
                            <span className="mt-4 text-white font-bold text-xs">{num}</span>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    const renderDie = () => {
        switch (sides) {
            case 4: return <D4 />;
            case 6: return <D6 />;
            case 8: return <D8 />;
            case 10: return <D10 />;
            case 12: return <D12 />;
            case 20: return <D20 />;
            default: return <D6 />;
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-full py-10 relative perspective-1000 w-full overflow-hidden">
            <ConfettiEffect trigger={showConfetti} duration={2000} />

            <div className="relative w-64 h-64 mb-8 flex items-center justify-center" style={{ perspective: '1000px' }}>
                <motion.div
                    className="relative preserve-3d w-24 h-24 flex items-center justify-center"
                    animate={controls}
                    initial={{ rotateX: 0, rotateY: 0, rotateZ: 0 }}
                    style={{ transformStyle: 'preserve-3d' }}
                >
                    {renderDie()}
                </motion.div>

                {/* Shadow */}
                <motion.div
                    className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-24 h-6 bg-black/40 blur-xl rounded-full"
                    animate={{
                        scale: isRolling ? [1, 0.5, 1] : 1,
                        opacity: isRolling ? [0.4, 0.2, 0.4] : 0.4,
                    }}
                    transition={{ duration: 2.5 }}
                />
            </div>

            <div className="w-full max-w-md mb-8 px-4 z-10">
                <label className="block text-sm font-medium text-muted-foreground mb-4 text-center uppercase tracking-wider">
                    Choose Die
                </label>
                <div className="flex flex-wrap gap-3 justify-center">
                    {[4, 6, 8, 10, 12, 20].map(num => (
                        <button
                            key={num}
                            onClick={() => {
                                setSides(num);
                                setResult(1);
                                currentRotation.current = { x: 0, y: 0, z: 0 };
                                controls.set({ rotateX: 0, rotateY: 0, rotateZ: 0 });
                            }}
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
                    "px-12 py-4 rounded-xl font-display font-bold text-lg tracking-wider transition-all duration-200 shadow-lg z-10",
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
