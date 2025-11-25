import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';

export function FortuneCookie({ onResult }) {
    const [isOpen, setIsOpen] = useState(false);
    const [fortune, setFortune] = useState('');
    const [isOpening, setIsOpening] = useState(false);

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
            setIsOpening(false);
            setFortune('');
            return;
        }

        const newFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
        setFortune(newFortune);
        setIsOpening(true);

        // Cookie cracks open, then paper appears
        setTimeout(() => {
            setIsOpen(true);
        }, 400);

        if (onResult) onResult(newFortune);
    };

    return (
        <div className="flex flex-col items-center justify-center h-full py-6 sm:py-8">
            <div className="relative h-56 sm:h-64 md:h-72 w-full flex items-center justify-center mb-6 sm:mb-8 md:mb-10 px-4">
                <AnimatePresence mode="wait">
                    {!isOpening ? (
                        <motion.button
                            key="cookie-closed"
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            whileHover={{ scale: 1.05, rotate: [0, -3, 3, 0] }}
                            transition={{ duration: 0.3 }}
                            onClick={openCookie}
                            className="relative group"
                        >
                            {/* Fortune Cookie - closed */}
                            <div className="relative w-36 sm:w-40 md:w-48 h-36 sm:h-40 md:h-48">
                                <div className="absolute inset-0 bg-gradient-to-br from-amber-200 via-amber-300 to-amber-400 rounded-full transform rotate-45 shadow-2xl border-4 border-amber-500/50" />
                                <div className="absolute inset-4 bg-gradient-to-tl from-amber-100 to-amber-200 rounded-full shadow-inner" />
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-2 bg-amber-600/30 rounded-full blur-sm" />
                            </div>
                            <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs sm:text-sm font-bold text-amber-700 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                Click to Open
                            </span>
                        </motion.button>
                    ) : (
                        <div key="cookie-opened" className="relative w-full max-w-md">
                            {/* Cookie halves moving apart */}
                            <div className="relative h-48 sm:h-56 flex items-center justify-center">
                                {/* Left half */}
                                <motion.div
                                    initial={{ x: 0, rotate: 0 }}
                                    animate={{ x: -60, rotate: -15 }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                    className="absolute left-1/2"
                                >
                                    <div className="w-20 sm:w-24 h-28 sm:h-32 bg-gradient-to-br from-amber-200 to-amber-400 rounded-l-full shadow-xl border-4 border-amber-500/50 border-r-0"
                                        style={{ clipPath: 'polygon(0 0, 70% 0, 90% 50%, 70% 100%, 0 100%)' }} />
                                </motion.div>

                                {/* Right half */}
                                <motion.div
                                    initial={{ x: 0, rotate: 0 }}
                                    animate={{ x: 60, rotate: 15 }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                    className="absolute right-1/2"
                                >
                                    <div className="w-20 sm:w-24 h-28 sm:h-32 bg-gradient-to-bl from-amber-200 to-amber-400 rounded-r-full shadow-xl border-4 border-amber-500/50 border-l-0"
                                        style={{ clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 30% 100%, 10% 50%)' }} />
                                </motion.div>

                                {/* Fortune paper emerging from center */}
                                {isOpen && (
                                    <motion.div
                                        initial={{ y: 40, opacity: 0, scale: 0.5 }}
                                        animate={{ y: 0, opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.2, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                                        className="absolute bg-amber-50 p-4 sm:p-6 max-w-xs sm:max-w-sm shadow-2xl transform rotate-1 border-2 border-amber-200"
                                        style={{
                                            clipPath: 'polygon(2% 0%, 98% 0%, 100% 8%, 100% 92%, 50% 100%, 0% 92%, 0% 8%)',
                                            background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)'
                                        }}
                                    >
                                        <p className="text-amber-900 font-serif text-sm sm:text-base md:text-lg text-center italic leading-relaxed">
                                            "{fortune}"
                                        </p>
                                        <div className="mt-3 sm:mt-4 flex justify-center gap-1.5 sm:gap-2 flex-wrap">
                                            {[1, 2, 3, 4, 5, 6].map(n => (
                                                <span key={n} className="text-xs text-amber-600 font-mono">
                                                    {Math.floor(Math.random() * 99)}
                                                </span>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    )}
                </AnimatePresence>
            </div>

            <button
                onClick={openCookie}
                className={cn(
                    "px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg shadow-lg transition-all transform hover:scale-105 active:scale-95",
                    isOpen
                        ? "bg-secondary text-secondary-foreground border-2 border-border hover:bg-secondary/80"
                        : "bg-amber-500 text-white hover:shadow-amber-500/30 hover:bg-amber-600"
                )}
            >
                {isOpen ? 'Get Another Cookie' : 'Open Cookie'}
            </button>
        </div>
    );
}
