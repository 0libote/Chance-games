import React from 'react';
import { motion } from 'framer-motion';

export function ParticleBackground() {
    // Generate random particles
    const particles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        size: Math.random() * 4 + 2,
        left: `${Math.random() * 100}%`,
        delay: Math.random() * 20,
        duration: Math.random() * 20 + 15,
        opacity: Math.random() * 0.3 + 0.1,
    }));

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="absolute rounded-full"
                    style={{
                        width: particle.size,
                        height: particle.size,
                        left: particle.left,
                        background: `radial-gradient(circle, hsl(var(--primary) / ${particle.opacity}), hsl(var(--accent) / ${particle.opacity * 0.5}))`,
                        filter: 'blur(1px)',
                    }}
                    animate={{
                        y: ['-100vh', '100vh'],
                        x: [0, Math.random() * 100 - 50],
                        scale: [0, 1, 1, 0],
                        opacity: [0, particle.opacity, particle.opacity, 0],
                    }}
                    transition={{
                        duration: particle.duration,
                        delay: particle.delay,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                />
            ))}
        </div>
    );
}
