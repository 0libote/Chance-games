import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

export function GameCard({ title, icon: Icon, color, isActive, onClick }) {
    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className={cn(
                "w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-200 border",
                isActive
                    ? `bg-gradient-to-r ${color} text-white border-transparent shadow-lg`
                    : "bg-card text-card-foreground border-border hover:bg-accent hover:text-accent-foreground"
            )}
        >
            <div className={cn(
                "p-2 rounded-lg",
                isActive ? "bg-white/20" : "bg-secondary"
            )}>
                <Icon size={24} />
            </div>
            <span className="font-heading font-semibold text-lg">{title}</span>
        </motion.button>
    );
}
