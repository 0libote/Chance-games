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
        }, 1500);
    };

    return (
        <div className="flex flex-col items-center justify-center h-full py-8">
            <div className="relative w-64 sm:w-72 md:w-80 h-64 sm:h-72 md:h-80 mb-8 md:mb-12">
                <motion.div
                    className="w-full h-full rounded-full shadow-2xl flex items-center justify-center border-b-8 border-black/50"
                    style={{ background: 'radial-gradient(circle at 30% 30%, #2a2a2a, #000000)' }}
                    animate={{
                        x: isShaking ? [-8, 8, -8, 8, 0] : 0,
                        y: isShaking ? [-8, 8, -8, 8, 0] : 0,
                        rotate: isShaking ? [-4, 4, -4, 4, 0] : 0,
                    }}
                    transition={{ duration: 0.4, repeat: isShaking ? 3 : 0 }}
                >
                    {/* Inner Circle / Window */}
                    <div className="w-36 sm:w-40 md:w-44 h-36 sm:h-40 md:h-44 rounded-full bg-gradient-to-br from-indigo-950 to-black border-4 border-slate-800 flex items-center justify-center overflow-hidden relative shadow-inner">
                        <AnimatePresence mode="wait">
                            {answer ? (
                                <motion.div
                                    key="answer"
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5 }}
                                    className="w-full h-full flex items-center justify-center p-4"
                                >
                                    <span className="text-white text-center font-bold text-sm sm:text-base leading-tight">
                                        {answer}
                                    </span>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="8"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="w-24 sm:w-28 md:w-32 h-24 sm:h-28 md:h-32 rounded-full bg-white flex items-center justify-center shadow-lg"
                                >
                                    <span className="text-6xl sm:text-7xl md:text-8xl font-black text-black">8</span>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Glare effect */}
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent pointer-events-none rounded-full" />
                    </div>
                </motion.div>

                {/* Shadow */}
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-40 sm:w-44 md:w-48 h-6 sm:h-7 md:h-8 bg-black/20 blur-xl rounded-full" />
            </div>

            <div className="w-full max-w-md space-y-4 px-4">
                <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Ask the Magic 8 Ball a question..."
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-background border-2 border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-center text-base sm:text-lg shadow-sm transition-all placeholder:text-muted-foreground"
                    onKeyDown={(e) => e.key === 'Enter' && shakeBall()}
                />

                <button
                    onClick={shakeBall}
                    disabled={isShaking || !question.trim()}
                    className={cn(
                        "w-full px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg shadow-lg transition-all transform hover:scale-105 active:scale-95",
                        isShaking || !question.trim()
                            ? "bg-gray-400 cursor-not-allowed text-gray-200"
                            : "bg-purple-600 text-white hover:shadow-purple-500/30 hover:bg-purple-700"
                    )}
                >
                    {isShaking ? 'Consulting...' : 'Shake 8 Ball'}
                </button>
            </div>
        </div>
    );
}
