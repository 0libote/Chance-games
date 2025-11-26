import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import { Sparkles } from 'lucide-react';

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
        <div className="flex flex-col items-center justify-center min-h-full py-8 relative w-full">
            {/* 8 Ball Container */}
            <div className="relative group cursor-pointer" onClick={shakeBall}>
                <motion.div
                    className="w-72 h-72 sm:w-80 sm:h-80 rounded-full relative z-10"
                    style={{
                        background: 'radial-gradient(circle at 35% 35%, #333, #000)',
                        boxShadow: '0 20px 50px rgba(0,0,0,0.5), inset 0 -10px 20px rgba(0,0,0,0.8), inset 0 10px 20px rgba(255,255,255,0.2)'
                    }}
                    animate={isShaking ? {
                        x: [0, -10, 10, -10, 10, -5, 5, -2, 2, 0],
                        y: [0, -5, 5, -5, 5, -2, 2, 0],
                        rotate: [0, -5, 5, -5, 5, -2, 2, 0],
                    } : {}}
                    transition={{ duration: 0.5, repeat: isShaking ? 4 : 0 }}
                >
                    {/* Surface Glare */}
                    <div className="absolute top-10 left-10 w-20 h-12 rounded-full bg-gradient-to-br from-white/20 to-transparent blur-md transform -rotate-45" />

                    {/* The Window */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-36 h-36 rounded-full bg-black border-[6px] border-[#1a1a1a] flex items-center justify-center overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,1)]">
                        {/* Liquid Background */}
                        <div className="absolute inset-0 bg-[#000022]">
                            <motion.div
                                className="absolute inset-0 opacity-40"
                                animate={{
                                    background: [
                                        'radial-gradient(circle at 50% 50%, #1a1a4a 0%, transparent 70%)',
                                        'radial-gradient(circle at 60% 40%, #1a1a4a 0%, transparent 70%)',
                                        'radial-gradient(circle at 40% 60%, #1a1a4a 0%, transparent 70%)',
                                        'radial-gradient(circle at 50% 50%, #1a1a4a 0%, transparent 70%)',
                                    ]
                                }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            />
                        </div>

                        <AnimatePresence mode="wait">
                            {answer ? (
                                <motion.div
                                    key="triangle"
                                    initial={{ opacity: 0, scale: 0.5, rotateX: 60 }}
                                    animate={{
                                        opacity: 1,
                                        scale: 1,
                                        rotateX: 0,
                                        filter: ['blur(8px)', 'blur(0px)']
                                    }}
                                    exit={{ opacity: 0, scale: 0.8, filter: 'blur(4px)' }}
                                    transition={{ duration: 1.2, ease: "easeOut" }}
                                    className="relative w-24 h-24 flex items-center justify-center"
                                >
                                    {/* Blue Triangle */}
                                    <div
                                        className="absolute inset-0"
                                        style={{
                                            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                                            background: 'linear-gradient(135deg, #1e40af, #172554)',
                                            boxShadow: '0 0 15px rgba(59, 130, 246, 0.5)'
                                        }}
                                    />
                                    {/* Text */}
                                    <span className="relative z-10 text-blue-100 text-center text-[0.65rem] font-bold uppercase tracking-wider leading-tight w-16 pt-5 drop-shadow-sm select-none">
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
                                    <span className="text-6xl font-black text-black select-none">8</span>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Glass Reflection over window */}
                        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-full pointer-events-none" />
                    </div>
                </motion.div>

                {/* Shadow */}
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-40 h-6 bg-black/30 blur-xl rounded-full transition-all duration-300 group-hover:bg-black/40 group-hover:w-48" />
            </div>

            <div className="w-full max-w-md space-y-6 px-4 mt-8">
                <div className="relative">
                    <input
                        type="text"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        placeholder="Ask a Yes/No question..."
                        className="w-full px-6 py-4 bg-card border-2 border-border rounded-2xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 text-center text-lg shadow-sm transition-all placeholder:text-muted-foreground/50"
                        onKeyDown={(e) => e.key === 'Enter' && shakeBall()}
                    />
                    <Sparkles className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground/50" size={20} />
                </div>

                <button
                    onClick={shakeBall}
                    disabled={isShaking || !question.trim()}
                    className={cn(
                        "w-full px-8 py-4 rounded-xl font-display font-bold text-lg tracking-wider transition-all duration-200 shadow-lg",
                        isShaking || !question.trim()
                            ? "bg-secondary text-muted-foreground cursor-not-allowed shadow-none"
                            : "bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] shadow-primary/25"
                    )}
                >
                    {isShaking ? 'CONSULTING SPIRITS...' : 'SHAKE 8 BALL'}
                </button>
            </div>
        </div>
    );
}
