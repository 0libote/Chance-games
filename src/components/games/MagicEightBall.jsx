import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';

export function MagicEightBall({ onResult }) {
    const [isShaking, setIsShaking] = useState(false);
    const [answer, setAnswer] = useState(null);
    const [question, setQuestion] = useState('');

    const answers = [
        'It is certain', 'It is decidedly so', 'Without a doubt', 'Yes definitely',
        'You may rely on it', 'As I see it, yes', 'Most likely', 'Outlook good',
        'Yes', 'Signs point to yes', 'Reply hazy, try again', 'Ask again later',
        'Better not tell you now', 'Cannot predict now', 'Concentrate and ask again',
        "Don't count on it", 'My reply is no', 'My sources say no',
        'Outlook not so good', 'Very doubtful'
    ];

    const shakeBall = () => {
        if (isShaking || !question.trim()) return;
        setIsShaking(true);
        setAnswer(null);

        setTimeout(() => {
            const newAnswer = answers[Math.floor(Math.random() * answers.length)];
            setAnswer(newAnswer);
            setIsShaking(false);
            if (onResult) onResult(newAnswer);
        }, 2000);
    };

    return (
        <div className="flex flex-col items-center justify-center h-full py-6 relative">
            {/* 8 Ball Container */}
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 mb-8 flex items-center justify-center drop-shadow-2xl">
                <motion.div
                    className="w-full h-full rounded-full relative"
                    style={{
                        background: 'radial-gradient(circle at 30% 30%, #1a1a1a, #000000)',
                        boxShadow: '0 30px 80px rgba(0, 0, 0, 0.8), inset 0 -20px 40px rgba(0, 0, 0, 0.8), inset 0 10px 20px rgba(255,255,255,0.1)'
                    }}
                    animate={isShaking ? {
                        x: [0, -15, 15, -15, 15, -10, 10, -5, 5, 0],
                        y: [0, -10, 10, -10, 10, -5, 5, 0],
                        rotate: [0, -8, 8, -8, 8, -5, 5, -2, 2, 0],
                    } : {}}
                    transition={{ duration: 0.5, repeat: isShaking ? 4 : 0 }}
                >
                    {/* Surface Glare */}
                    <div className="absolute top-8 left-8 w-24 h-16 rounded-full bg-white/10 blur-xl transform -rotate-45" />

                    {/* The Window */}
                    <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-black border-6 border-gray-900/50 flex items-center justify-center overflow-hidden relative shadow-[inset_0_0_20px_rgba(0,0,0,1)]">
                        {/* Liquid Background */}
                        <div className="absolute inset-0 bg-[#000022]">
                            <motion.div
                                className="absolute inset-0 opacity-30"
                                animate={{
                                    background: [
                                        'radial-gradient(circle at 50% 50%, #1a1a4a 0%, transparent 70%)',
                                        'radial-gradient(circle at 60% 40%, #1a1a4a 0%, transparent 70%)',
                                        'radial-gradient(circle at 40% 60%, #1a1a4a 0%, transparent 70%)',
                                        'radial-gradient(circle at 50% 50%, #1a1a4a 0%, transparent 70%)',
                                    ]
                                }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            />
                        </div>

                        <AnimatePresence mode="wait">
                            {answer ? (
                                <motion.div
                                    key="triangle"
                                    initial={{ opacity: 0, scale: 0.5, rotate: 180, y: 50 }}
                                    animate={{
                                        opacity: 1,
                                        scale: 1,
                                        rotate: 0,
                                        y: 0,
                                        filter: ['blur(10px)', 'blur(0px)']
                                    }}
                                    exit={{ opacity: 0, scale: 0.5, filter: 'blur(10px)' }}
                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                    className="relative w-24 h-24 flex items-center justify-center"
                                >
                                    {/* Blue Triangle */}
                                    <div
                                        className="absolute inset-0"
                                        style={{
                                            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                                            background: 'linear-gradient(to bottom, #1e3a8a, #172554)',
                                            boxShadow: '0 0 20px #3b82f6'
                                        }}
                                    />
                                    {/* Text */}
                                    <span className="relative z-10 text-blue-100 text-center text-[0.6rem] font-bold uppercase tracking-wider leading-tight w-14 pt-4 drop-shadow-md">
                                        {answer}
                                    </span>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="8"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-lg relative"
                                >
                                    <span className="text-6xl font-black text-black">8</span>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Glass Reflection over window */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-full pointer-events-none" />
                    </div>
                </motion.div>

                {/* Shadow */}
                <motion.div
                    className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-48 h-8 bg-black/50 blur-xl rounded-full"
                    animate={{
                        scale: isShaking ? [1, 0.8, 1.2, 1] : 1,
                        opacity: isShaking ? [0.5, 0.3, 0.5] : 0.5,
                    }}
                />
            </div>

            <div className="w-full max-w-md space-y-6 px-4">
                <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Ask a Yes/No question..."
                    className="w-full px-6 py-4 glass border-2 border-white/10 rounded-2xl focus:outline-none focus:border-primary/50 text-center text-lg shadow-inner transition-all placeholder:text-muted-foreground/50"
                    onKeyDown={(e) => e.key === 'Enter' && shakeBall()}
                />

                <button
                    onClick={shakeBall}
                    disabled={isShaking || !question.trim()}
                    className={cn(
                        "w-full px-8 py-4 rounded-xl font-display font-bold text-lg tracking-wider transition-all duration-300",
                        isShaking || !question.trim()
                            ? "bg-secondary/50 text-muted-foreground cursor-not-allowed"
                            : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-[0_0_30px_-5px_hsl(var(--primary)/0.5)] hover:shadow-[0_0_50px_-5px_hsl(var(--primary)/0.7)] hover:scale-[1.02] active:scale-[0.98]"
                    )}
                >
                    {isShaking ? 'CONSULTING SPIRITS...' : 'SHAKE 8 BALL'}
                </button>
            </div>
        </div>
    );
}
