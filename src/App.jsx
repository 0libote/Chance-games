import React, { useState } from 'react';
import { Dice6, Coins, Sparkles, Ticket, Cookie, Heart, Shuffle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sidebar } from './components/Sidebar'; // Keep for now to avoid breaking build if file still exists, but unused. Actually, let's remove it.
import { ThemeToggle } from './components/ThemeToggle';
import { ParticleBackground } from './components/ParticleBackground';
import { GamePickerModal } from './components/GamePickerModal';
import { CoinFlip } from './components/games/CoinFlip';
import { DiceRoll } from './components/games/DiceRoll';
import { MagicEightBall } from './components/games/MagicEightBall';
import { LotteryDraw } from './components/games/LotteryDraw';
import { FortuneCookie } from './components/games/FortuneCookie';
import { LoveCalculator } from './components/games/LoveCalculator';
import { RandomChoice } from './components/games/RandomChoice';

const App = () => {
    const [activeGame, setActiveGame] = useState('8ball');
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    const activeGameData = games.find(g => g.id === activeGame);

    return (
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden relative selection:bg-primary/20 selection:text-primary">
            <ParticleBackground />

            <div className="container mx-auto px-4 sm:px-6 py-6 max-w-5xl relative z-10 flex flex-col min-h-screen">
                {/* Header */}
                <motion.header
                    className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-6"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <div className="text-center sm:text-left">
                        <h1 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-foreground">
                            Chance Master
                        </h1>
                        <p className="text-muted-foreground text-sm font-medium mt-1">
                            Your guide to fortune and randomness
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsModalOpen(true)}
                            className="px-5 py-2.5 bg-primary text-primary-foreground rounded-xl font-medium shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all flex items-center gap-2"
                        >
                            <activeGameData.icon size={18} />
                            <span>{activeGameData?.name || 'Choose Game'}</span>
                        </motion.button>
                        <ThemeToggle />
                    </div>
                </motion.header>

                {/* Main Game Area */}
                <motion.main
                    className="flex-1 flex flex-col"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <div className="glass-card rounded-3xl shadow-xl flex-1 relative overflow-hidden flex flex-col min-h-[600px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeGame}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                                className="flex-1 w-full p-6 sm:p-10 overflow-y-auto"
                            >
                                {renderGameContent()}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </motion.main>

                <footer className="py-6 text-center text-muted-foreground text-xs">
                    <p>© 2024 Chance Master. All rights reserved.</p>
                </footer>
            </div>

            <GamePickerModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                games={games}
                activeGame={activeGame}
                onSelectGame={setActiveGame}
            />
        </div>
    );
};

export default App;

