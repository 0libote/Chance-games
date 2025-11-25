import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function ConfettiEffect({ trigger, duration = 3000 }) {
    const [confetti, setConfetti] = useState([]);

    useEffect(() => {
        if (trigger) {
            // Generate confetti pieces
            const pieces = Array.from({ length: 50 }, (_, i) => ({
                id: `${Date.now()}-${i}`,
                left: `${Math.random() * 100}%`,
                color: ['#a78bfa', '#60a5fa', '#34d399', '#fbbf24', '#f472b6'][Math.floor(Math.random() * 5)],
                rotation: Math.random() * 360,
                xOffset: (Math.random() - 0.5) * 200,
                delay: Math.random() * 0.3,
            }));

            setConfetti(pieces);

            // Clear confetti after duration
            const timer = setTimeout(() => {
                setConfetti([]);
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [trigger, duration]);

    return (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            <AnimatePresence>
                {confetti.map((piece) => (
                    <motion.div
                        key={piece.id}
                        className="absolute top-0 w-3 h-3 rounded-sm"
                        style={{
                            left: piece.left,
                            backgroundColor: piece.color,
                        }}
                        initial={{
                            y: -20,
                            rotate: piece.rotation,
                            opacity: 1,
                        }}
                        animate={{
                            y: '100vh',
                            x: piece.xOffset,
                            rotate: piece.rotation + 720,
                            opacity: 0,
                        }}
                        exit={{
                            opacity: 0,
                        }}
                        transition={{
                            duration: 2.5,
                            delay: piece.delay,
                            ease: [0.4, 0, 0.6, 1],
                        }}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
}
