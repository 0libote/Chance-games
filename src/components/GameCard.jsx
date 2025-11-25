import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

export function GameCard({ title, icon: Icon, color, isActive, onClick }) {
    return (
        <motion.button
            whileHover={{ scale: 1.02, x: isActive ? 0 : 4 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className={cn(
                "w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-200 border-2",
                isActive
                    ? `bg-gradient-to-r ${color} text-white border-transparent shadow-lg`
                    : "bg-card/90 text-card-foreground border-border/60 hover:bg-card hover:border-primary/40 hover:shadow-md"
            )}
        >
            <div className={cn(
                "p-2.5 rounded-lg shrink-0",
                isActive ? "bg-white/20" : "bg-secondary/80"
            )}>
                <Icon size={22} className="shrink-0" />
            </div>
            <span className="font-semibold text-base text-left break-words">{title}</span>
        </motion.button>
    );
}
