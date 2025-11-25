import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

export function GameCard({ title, icon, description, isSelected, onClick }) {
    return (
        <div
            onClick={onClick}
            className={`
                relative group cursor-pointer overflow-hidden rounded-2xl
                glass border border-white/10 p-6
                transition-all duration-500 ease-out
                hover:scale-[1.02] hover:border-primary/50
                hover:shadow-[0_0_30px_-5px_hsl(var(--primary)/0.3)]
                ${isSelected ? 'ring-2 ring-primary shadow-[0_0_30px_-5px_hsl(var(--primary)/0.5)] scale-[1.02] bg-secondary/40' : ''}
            `}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10 flex flex-col items-center text-center gap-4">
                <div className={`
                    p-4 rounded-xl bg-secondary/50 backdrop-blur-md
                    transition-all duration-500 group-hover:bg-primary/20
                    group-hover:shadow-[0_0_20px_-5px_hsl(var(--primary)/0.5)]
                    ${isSelected ? 'bg-primary/20 text-primary' : 'text-muted-foreground group-hover:text-primary'}
                `}>
                    {icon}
                </div>

                <div className="space-y-1">
                    <h3 className="font-display font-bold text-lg tracking-wide group-hover:text-primary transition-colors duration-300">
                        {title}
                    </h3>
                    <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">
                        {description}
                    </p>
                </div>
            </div>
        </div>
    );
}
