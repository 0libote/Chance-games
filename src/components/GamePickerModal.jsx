import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export function GamePickerModal({ isOpen, onClose, games, activeGame, onSelectGame }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pointer-events-none"
          >
            <div className="bg-card border border-border rounded-3xl shadow-2xl w-full max-w-4xl max-h-[85vh] overflow-hidden flex flex-col pointer-events-auto">
              <div className="p-6 border-b border-border flex items-center justify-between bg-muted/30">
                <div>
                  <h2 className="text-2xl font-display font-bold text-foreground">Choose a Game</h2>
                  <p className="text-muted-foreground text-sm">Select your game of chance</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-secondary rounded-full transition-colors text-muted-foreground hover:text-foreground"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="overflow-y-auto p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {games.map((game) => {
                    const Icon = game.icon;
                    const isActive = activeGame === game.id;
                    
                    return (
                      <motion.button
                        key={game.id}
                        onClick={() => {
                          onSelectGame(game.id);
                          onClose();
                        }}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className={`
                          relative p-6 rounded-2xl text-left transition-all duration-200 border-2
                          flex flex-col gap-4 group overflow-hidden
                          ${isActive 
                            ? `bg-primary/5 border-primary ring-1 ring-primary/50` 
                            : 'bg-card hover:bg-secondary/50 border-border hover:border-primary/30'
                          }
                        `}
                      >
                        <div className={`
                          p-3 rounded-xl w-fit transition-colors duration-300
                          ${isActive ? 'bg-primary text-primary-foreground' : 'bg-secondary text-foreground group-hover:bg-primary/10 group-hover:text-primary'}
                        `}>
                          <Icon size={28} />
                        </div>
                        
                        <div>
                          <h3 className={`font-bold text-lg mb-1 ${isActive ? 'text-primary' : 'text-foreground'}`}>
                            {game.name}
                          </h3>
                          <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors">
                            {game.description}
                          </p>
                        </div>
                        
                        {/* Subtle background decoration */}
                        <div className={`
                          absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity
                          ${isActive ? 'text-primary' : 'text-foreground'}
                        `}>
                          <Icon size={100} />
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
