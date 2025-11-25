import React, { useState } from 'react';
import { Dice6, Coins, Sparkles, Ticket, Cookie, Heart, Shuffle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sidebar } from './components/Sidebar';
import { ThemeToggle } from './components/ThemeToggle';
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
        { id: '8ball', name: 'Magic 8 Ball', icon: Sparkles, color: 'from-purple-500 to-pink-500' },
        { id: 'coin', name: 'Coin Flip', icon: Coins, color: 'from-yellow-500 to-orange-500' },
        { id: 'dice', name: 'Dice Roll', icon: Dice6, color: 'from-blue-500 to-cyan-500' },
        { id: 'lottery', name: 'Lottery Numbers', icon: Ticket, color: 'from-green-500 to-teal-500' },
        { id: 'cookie', name: 'Fortune Cookie', icon: Cookie, color: 'from-amber-500 to-yellow-500' },
        { id: 'love', name: 'Love Calculator', icon: Heart, color: 'from-red-500 to-pink-500' },
        { id: 'random', name: 'Random Choice', icon: Shuffle, color: 'from-emerald-500 to-green-500' }
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

    const activeColor = games.find(g => g.id === activeGame)?.color || 'from-gray-500 to-gray-700';

    return (
        <div className="min-h-screen bg-background text-foreground transition-colors duration-500 overflow-hidden">
            {/* Dynamic Background */}
            <div className={`fixed inset-0 bg-gradient-to-br ${activeColor} opacity-10 transition-colors duration-700 pointer-events-none`} />
            <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay" />

            <div className="container mx-auto px-4 py-8 max-w-7xl relative z-10">
                {/* Header */}
                <header className="flex flex-col md:flex-row items-center justify-between mb-8 gap-6">
                    <div className="text-center md:text-left">
                        <h1 className="text-5xl md:text-7xl font-heading font-black bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600 mb-2 tracking-tight drop-shadow-sm">
                            Chance Master
                        </h1>
                        <p className="text-muted-foreground text-lg font-medium">
                            Your ultimate guide to fortune and randomness
                        </p>
                    </div>
                    <ThemeToggle />
                </header>

                <div className="flex flex-col lg:flex-row gap-8 h-[calc(100vh-200px)] min-h-[600px]">
                    <Sidebar
                        games={games}
                        activeGame={activeGame}
                        setActiveGame={setActiveGame}
                    />

                    {/* Main Game Area */}
                    <div className="lg:w-3/4 h-full">
                        <motion.div
                            layout
                            className="bg-card/40 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-2xl h-full relative overflow-hidden ring-1 ring-white/20"
                        >
                            {/* Inner Glow */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${activeColor} opacity-5 pointer-events-none transition-colors duration-700`} />

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeGame}
                                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
                                    transition={{ duration: 0.4, ease: "circOut" }}
                                    className="h-full w-full p-8 overflow-y-auto scrollbar-hide"
                                >
                                    {renderGameContent()}
                                </motion.div>
                            </AnimatePresence>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
