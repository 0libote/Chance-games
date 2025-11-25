import React, { useState } from 'react';
import { Sparkles, X, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GameCard } from './GameCard';

export function Sidebar({ games, activeGame, setActiveGame }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleGameSelect = (gameId) => {
        setActiveGame(gameId);
        setIsOpen(false); // Close mobile menu when game is selected
    };

    return (
        <>
            {/* Mobile Menu Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-card/80 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl text-foreground"
                aria-label="Toggle menu"
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>

            {/* Mobile Backdrop */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <motion.div
                initial={false}
                animate={{
                    x: isOpen ? 0 : '-100%'
                }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className={`
                    fixed lg:relative
                    inset-y-0 left-0
                    lg:translate-x-0
                    w-72 lg:w-auto
                    z-40
                    lg:z-auto
                    pt-20 lg:pt-0
                    px-4 lg:px-0
                    ${!isOpen && 'pointer-events-none lg:pointer-events-auto'}
                `}
            >
                <div className="lg:w-full lg:min-w-[280px] space-y-6 pointer-events-auto">
                    <div className="bg-card/95 backdrop-blur-xl border-2 border-border/50 rounded-2xl p-6 shadow-lg lg:sticky lg:top-8 max-h-[calc(100vh-120px)] lg:max-h-[calc(100vh-64px)] overflow-y-auto transition-colors duration-300">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                <Sparkles size={22} />
                            </div>
                            <h2 className="text-lg font-bold text-foreground">Games</h2>
                        </div>

                        <div className="space-y-2.5">
                            {games.map((game) => (
                                <GameCard
                                    key={game.id}
                                    title={game.name}
                                    icon={game.icon}
                                    color={game.color}
                                    isActive={activeGame === game.id}
                                    onClick={() => handleGameSelect(game.id)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    );
}
