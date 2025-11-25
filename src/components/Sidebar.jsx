import React from 'react';
import { Sparkles, History, Trophy } from 'lucide-react';
import { GameCard } from './GameCard';
import { motion } from 'framer-motion';

export function Sidebar({ games, activeGame, setActiveGame, history }) {
    return (
        <div className="lg:w-1/4 space-y-6">
            <div className="bg-card/50 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl sticky top-8">
                <div className="flex items-center gap-2 mb-6">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                        <Sparkles size={24} />
                    </div>
                    <h2 className="text-xl font-heading font-bold text-foreground">Games</h2>
                </div>

                <div className="space-y-3">
                    {games.map((game) => (
                        <GameCard
                            key={game.id}
                            title={game.name}
                            icon={game.icon}
                            color={game.color}
                            isActive={activeGame === game.id}
                            onClick={() => setActiveGame(game.id)}
                        />
                    ))}
                </div>

                {history.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-8 pt-6 border-t border-border"
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <History size={20} className="text-muted-foreground" />
                            <h3 className="font-heading font-semibold text-muted-foreground">Recent Results</h3>
                        </div>
                        <div className="space-y-3 max-h-64 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-secondary scrollbar-track-transparent">
                            {history.map((item, index) => (
                                <div key={index} className="text-sm p-3 bg-secondary/50 rounded-lg border border-border/50">
                                    <div className="font-medium text-foreground flex items-center gap-2">
                                        <Trophy size={14} className="text-primary" />
                                        {games.find(g => g.id === item.game)?.name}
                                    </div>
                                    <div className="text-muted-foreground mt-1 truncate font-mono">{item.result}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
