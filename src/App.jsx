import React, { useState } from 'react';
import { Dice6, Coins, Sparkles, Ticket, Cookie, Heart, Shuffle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sidebar } from './components/Sidebar';
import { ThemeToggle } from './components/ThemeToggle';
import { ParticleBackground } from './components/ParticleBackground';
import { CoinFlip } from './components/games/CoinFlip';
import { DiceRoll } from './components/games/DiceRoll';
import { MagicEightBall } from './components/games/MagicEightBall';
import { LotteryDraw } from './components/games/LotteryDraw';
import { FortuneCookie } from './components/games/FortuneCookie';
import { LoveCalculator } from './components/games/LoveCalculator';
import { RandomChoice } from './components/games/RandomChoice';

const App = () => {
    const [activeGame, setActiveGame] = useState('8ball');

    const games = [
        { id: '8ball', name: 'Magic 8 Ball', description: 'Ask and reveal your fate', icon: Sparkles, color: 'border-purple-500' },
        { id: 'coin', name: 'Coin Flip', description: 'Heads or tails?', icon: Coins, color: 'border-amber-500' },
        { id: 'dice', name: 'Dice Roll', description: 'Roll for destiny', icon: Dice6, color: 'border-blue-500' },
        { id: 'lottery', name: 'Lottery Numbers', description: 'Generate lucky numbers', icon: Ticket, color: 'border-emerald-500' },
        { id: 'cookie', name: 'Fortune Cookie', description: 'Crack open wisdom', icon: Cookie, color: 'border-amber-500' },
        { id: 'love', name: 'Love Calculator', description: 'Test your compatibility', icon: Heart, color: 'border-pink-500' },
        { id: 'random', name: 'Random Choice', description: 'Let fate decide', icon: Shuffle, color: 'border-green-500' }
    ];

    const renderGameContent = () => {
        switch (activeGame) {
            case 'coin': return <CoinFlip />;
            case 'dice': return <DiceRoll />;
            case '8ball': return <MagicEightBall />;
            case 'lottery': return <LotteryDraw />;
            case 'cookie': return <FortuneCookie />;
            case 'love': return <LoveCalculator />;
            case 'random': return <RandomChoice />;
            default: return <MagicEightBall />;
        }
    };

    const activeBorderColor = games.find(g => g.id === activeGame)?.color || 'border-gray-500';

    return (
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden relative">
            <ParticleBackground />

            <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6 max-w-7xl relative z-10">
                {/* Header */}
                <motion.header
                    className="flex items-center justify-between mb-6 sm:mb-8"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <div>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display text-foreground tracking-tight relative">
                            <span className="gradient-text">Chance Master</span>
                            <motion.div
                                className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 blur-xl opacity-50 -z-10"
                                animate={{
                                    opacity: [0.3, 0.6, 0.3],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            />
                        </h1>
                        <p className="text-muted-foreground text-sm sm:text-base md:text-lg font-medium mt-2">
                            Your ultimate guide to fortune and randomness
                        </p>
                    </div>
                    <ThemeToggle />
                </motion.header>

                <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
                    <Sidebar
                        games={games}
                        activeGame={activeGame}
                        setActiveGame={setActiveGame}
                    />

                    {/* Main Game Area */}
                    <motion.div
                        className="flex-1 w-full lg:w-auto min-h-[500px] sm:min-h-[550px]"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <div className={`glass-strong border-4 ${activeBorderColor} rounded-3xl shadow-2xl h-full relative overflow-hidden neon-border`}>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeGame}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="h-full w-full p-6 sm:p-8 md:p-10 lg:p-12 overflow-y-auto"
                                >
                                    {renderGameContent()}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default App;

