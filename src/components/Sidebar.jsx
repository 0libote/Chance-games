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
                className="lg:hidden fixed top-4 left-4 z-50 p-3 glass-strong rounded-2xl shadow-xl text-foreground glow-primary"
                aria-label="Toggle menu"
            >
                <motion.div
                    animate={{ rotate: isOpen ? 90 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </motion.div>
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
                    <motion.div
                        className="glass-strong border-2 rounded-2xl p-6 shadow-2xl lg:sticky lg:top-8 max-h-[calc(100vh-120px)] lg:max-h-[calc(100vh-64px)] overflow-y-auto glow-primary"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <motion.div
                                className="p-2 bg-primary/20 rounded-lg text-primary"
                                whileHover={{ scale: 1.1, rotate: 5 }}
                            >
                                <Sparkles size={22} />
                            </motion.div>
                            <h2 className="text-lg font-bold text-foreground">Games</h2>
                        </div>

                        <div className="space-y-2.5">
                            {games.map((game, index) => (
                                <motion.div
                                    key={game.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4 + index * 0.05 }}
                                >
                                    <GameCard
                                        title={game.name}
                                        description={game.description}
                                        icon={<game.icon size={24} />}
                                        isSelected={activeGame === game.id}
                                        onClick={() => handleGameSelect(game.id)}
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </>
    );
}

