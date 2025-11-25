import React from 'react';
import { Sparkles } from 'lucide-react';
import { GameCard } from './GameCard';

export function Sidebar({ games, activeGame, setActiveGame }) {
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
            </div>
        </div>
    );
}
