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
        'Don\'t count on it', 'My reply is no', 'My sources say no',
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
        <div className="flex flex-col items-center justify-center h-full min-h-[500px]">
            <div className="relative w-80 h-80 mb-12">
                <motion.div
                    className="w-full h-full rounded-full bg-radial-gradient from-gray-700 to-black shadow-2xl flex items-center justify-center border-b-8 border-black/50"
                    style={{ background: 'radial-gradient(circle at 30% 30%, #4a4a4a, #000000)' }}
                    animate={{
                        x: isShaking ? [-10, 10, -10, 10, 0] : 0,
                        y: isShaking ? [-10, 10, -10, 10, 0] : 0,
                        rotate: isShaking ? [-5, 5, -5, 5, 0] : 0,
                    }}
                    transition={{ duration: 0.5, repeat: isShaking ? 3 : 0 }}
                >
                    {/* Inner Circle / Window */}
                    <div className="w-40 h-40 rounded-full bg-slate-900 border-4 border-slate-800 flex items-center justify-center overflow-hidden relative shadow-inner">
                        <AnimatePresence mode="wait">
                            {answer ? (
                                <motion.div
                                    key="answer"
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="w-24 h-24 bg-blue-900/80 rounded-full flex items-center justify-center p-2 text-center"
                                    style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)', transform: 'rotate(180deg)' }} // Triangle approximation
                                >
                                    <span className="text-blue-100 text-xs font-bold uppercase tracking-wider transform rotate-180 block leading-tight">
                                        {answer}
                                    </span>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="8"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="w-24 h-24 rounded-full bg-white flex items-center justify-center"
                                >
                                    <span className="text-6xl font-heading font-black text-black">8</span>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Glare effect */}
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent pointer-events-none rounded-full" />
                    </div>
                </motion.div>

                {/* Shadow */}
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-48 h-8 bg-black/20 blur-xl rounded-full" />
            </div>

            <div className="w-full max-w-md space-y-4">
                <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Ask the Magic 8 Ball a question..."
                    className="w-full px-6 py-4 bg-secondary/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-center text-lg shadow-inner"
                    onKeyDown={(e) => e.key === 'Enter' && shakeBall()}
                />

                <button
                    onClick={shakeBall}
                    disabled={isShaking || !question.trim()}
                    className={cn(
                        "w-full px-8 py-4 rounded-xl font-bold text-lg shadow-lg transition-all transform hover:scale-105 active:scale-95",
                        isShaking || !question.trim()
                            ? "bg-gray-400 cursor-not-allowed text-gray-200"
                            : "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:shadow-purple-500/25"
                    )}
                >
                    {isShaking ? 'Consulting the Spirits...' : 'Shake 8 Ball'}
                </button>
            </div>
        </div>
    );
}
