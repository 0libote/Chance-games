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
        { id: '8ball', name: 'Magic 8 Ball', icon: Sparkles, color: 'border-purple-500' },
        { id: 'coin', name: 'Coin Flip', icon: Coins, color: 'border-amber-500' },
        { id: 'dice', name: 'Dice Roll', icon: Dice6, color: 'border-blue-500' },
        { id: 'lottery', name: 'Lottery Numbers', icon: Ticket, color: 'border-emerald-500' },
        { id: 'cookie', name: 'Fortune Cookie', icon: Cookie, color: 'border-amber-500' },
        { id: 'love', name: 'Love Calculator', icon: Heart, color: 'border-pink-500' },
        { id: 'random', name: 'Random Choice', icon: Shuffle, color: 'border-green-500' }
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
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden transition-colors duration-300">
            <div className="container mx-auto px-6 py-6 max-w-7xl relative">
                {/* Header */}
                <header className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground tracking-tight">
                            Chance Master
                        </h1>
                        <p className="text-muted-foreground text-base md:text-lg font-medium mt-1">
                            Your ultimate guide to fortune and randomness
                        </p>
                    </div>
                    <ThemeToggle />
                </header>

                <div className="flex flex-col lg:flex-row gap-6">
                    <Sidebar
                        games={games}
                        activeGame={activeGame}
                        setActiveGame={setActiveGame}
                    />

                    {/* Main Game Area */}
                    <div className="flex-1 w-full lg:w-auto min-h-[550px]">
                        <div className={`bg-card/70 backdrop-blur-xl border-4 ${activeBorderColor} rounded-3xl shadow-xl h-full relative overflow-hidden transition-all duration-300`}>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeGame}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.25, ease: "easeInOut" }}
                                    className="h-full w-full p-8 md:p-10 lg:p-12 overflow-y-auto"
                                >
                                    {renderGameContent()}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
