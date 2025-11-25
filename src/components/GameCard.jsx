import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

export function GameCard({ title, icon: Icon, color, isActive, onClick }) {
    // Color mapping for proper light/dark mode support
    const colorStyles = {
        'border-purple-500': {
            active: 'bg-purple-600 dark:bg-purple-600 text-white border-purple-600',
            lightActive: 'bg-purple-100 text-purple-900 border-purple-600'
        },
        'border-amber-500': {
            active: 'bg-amber-600 dark:bg-amber-600 text-white border-amber-600',
            lightActive: 'bg-amber-100 text-amber-900 border-amber-600'
        },
        'border-blue-500': {
            active: 'bg-blue-600 dark:bg-blue-600 text-white border-blue-600',
            lightActive: 'bg-blue-100 text-blue-900 border-blue-600'
        },
        'border-emerald-500': {
            active: 'bg-emerald-600 dark:bg-emerald-600 text-white border-emerald-600',
            lightActive: 'bg-emerald-100 text-emerald-900 border-emerald-600'
        },
        'border-pink-500': {
            active: 'bg-pink-600 dark:bg-pink-600 text-white border-pink-600',
            lightActive: 'bg-pink-100 text-pink-900 border-pink-600'
        },
        'border-green-500': {
            active: 'bg-green-600 dark:bg-green-600 text-white border-green-600',
            lightActive: 'bg-green-100 text-green-900 border-green-600'
        }
    };

    const styles = colorStyles[color] || colorStyles['border-purple-500'];

    return (
        <motion.button
            whileHover={{ scale: 1.02, x: isActive ? 0 : 4 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className={cn(
                "w-full flex items-center gap-4 p-4 rounded-xl border-2",
                isActive
                    ? `dark:${styles.active} ${styles.lightActive} shadow-lg font-semibold`
                    : "bg-card/90 text-card-foreground border-border/60 hover:bg-card hover:border-primary/40 hover:shadow-md"
            )}
        >
            <div className={cn(
                "p-2.5 rounded-lg shrink-0",
                isActive ? "bg-white/20 dark:bg-white/20" : "bg-secondary/80"
            )}>
                <Icon size={22} className="shrink-0" />
            </div>
            <span className="font-semibold text-base text-left break-words">{title}</span>
        </motion.button>
    );
}
