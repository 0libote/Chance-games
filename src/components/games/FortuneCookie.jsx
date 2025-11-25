import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import { Cookie } from 'lucide-react';

export function FortuneCookie({ onResult }) {
    const [isOpen, setIsOpen] = useState(false);
    const [fortune, setFortune] = useState('');

    const fortunes = [
        'A beautiful, smart, and loving person will be coming into your life.',
        'A dubious friend may be an enemy in camouflage.',
        'A faithful friend is a strong defense.',
        'A fresh start will put you on your way.',
        'A friend asks only for your time not your money.',
        'A friend is a present you give yourself.',
        'A golden egg of opportunity falls into your lap this month.',
        'A good friendship is often more important than a passionate romance.',
        'A hunch is creativity trying to tell you something.',
        'A lifetime friend shall soon be made.',
        'A light heart carries you through all the hard times.',
        'A new perspective will come with the new year.',
        'A pleasant surprise is waiting for you.',
        'A smile is your personal welcome mat.',
        'A smooth long journey! Great expectations.',
        'Advice is like kissing. It costs nothing and is a pleasant thing to do.'
    ];

    const openCookie = () => {
        if (isOpen) {
            setIsOpen(false);
            setFortune('');
            return;
        }

        const newFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
        setFortune(newFortune);
        setIsOpen(true);
        if (onResult) onResult(newFortune);
    };

    return (
        <div className="flex flex-col items-center justify-center h-full py-8">
            <div className="relative h-48 sm:h-56 md:h-64 w-full flex items-center justify-center mb-6 md:mb-8 px-4">
                <AnimatePresence>
                    {!isOpen ? (
                        <motion.button
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                            onClick={openCookie}
                            className="relative group"
                        >
                            <Cookie
                                size={window.innerWidth < 640 ? 140 : window.innerWidth < 768 ? 160 : 180}
                                className="text-amber-400 drop-shadow-2xl"
                            />
                            <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs sm:text-sm font-bold text-amber-600 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                Click to Open
                            </span>
                        </motion.button>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white p-4 sm:p-6 max-w-xs sm:max-w-sm shadow-xl transform rotate-1 border border-amber-100"
                            style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 90%, 50% 100%, 0% 90%)' }}
                        >
                            <p className="text-amber-800 font-serif text-sm sm:text-base md:text-lg text-center italic leading-relaxed">
                                "{fortune}"
                            </p>
                            <div className="mt-3 sm:mt-4 flex justify-center gap-1.5 sm:gap-2">
                                {[1, 2, 3, 4, 5, 6].map(n => (
                                    <span key={n} className="text-xs text-amber-400 font-mono">
                                        {Math.floor(Math.random() * 99)}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <button
                onClick={openCookie}
                className={cn(
                    "px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg shadow-lg transition-all transform hover:scale-105 active:scale-95",
                    isOpen
                        ? "bg-secondary text-secondary-foreground border border-border hover:bg-secondary/80"
                        : "bg-amber-500 text-white hover:shadow-amber-500/30 hover:bg-amber-600"
                )}
            >
                {isOpen ? 'Get Another Cookie' : 'Open Cookie'}
            </button>
        </div>
    );
}
