import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

export function LotteryDraw({ onResult }) {
    const [isDrawing, setIsDrawing] = useState(false);
    const [numbers, setNumbers] = useState([]);
    const [count, setCount] = useState(6);
    const [range, setRange] = useState(49);

    const drawNumbers = () => {
        if (isDrawing) return;
        setIsDrawing(true);
        setNumbers([]);

        const generated = new Set();
        while (generated.size < count) {
            generated.add(Math.floor(Math.random() * range) + 1);
        }
        const finalNumbers = Array.from(generated).sort((a, b) => a - b);

        // Animate one by one
        let current = 0;
        const interval = setInterval(() => {
            if (current >= finalNumbers.length) {
                clearInterval(interval);
                setIsDrawing(false);
                if (onResult) onResult(finalNumbers.join(', '));
                return;
            }
            setNumbers(prev => [...prev, finalNumbers[current]]);
            current++;
        }, 300);
    };

    return (
        <div className="flex flex-col items-center justify-center h-full py-8">
            <div className="flex flex-wrap gap-3 sm:gap-4 justify-center mb-8 md:mb-12 min-h-[60px] sm:min-h-[80px] px-4">
                {numbers.map((num, i) => (
                    <motion.div
                        key={`${num}-${i}`}
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 0.4 }}
                        className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-emerald-400 to-green-600 shadow-lg flex items-center justify-center border-2 border-white"
                    >
                        <span className="text-lg sm:text-xl md:text-2xl font-bold text-white">{num}</span>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full max-w-md mb-6 md:mb-8 px-4">
                <div className="bg-secondary/50 p-3 sm:p-4 rounded-xl border border-border">
                    <label className="block text-xs sm:text-sm font-medium text-muted-foreground mb-2">
                        Count: <span className="text-foreground font-bold">{count}</span>
                    </label>
                    <input
                        type="range"
                        min="1"
                        max="10"
                        value={count}
                        onChange={(e) => setCount(parseInt(e.target.value))}
                        className="w-full h-2 bg-secondary-foreground/20 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                    />
                </div>
                <div className="bg-secondary/50 p-3 sm:p-4 rounded-xl border border-border">
                    <label className="block text-xs sm:text-sm font-medium text-muted-foreground mb-2">
                        Range: 1-<span className="text-foreground font-bold">{range}</span>
                    </label>
                    <input
                        type="range"
                        min="10"
                        max="99"
                        value={range}
                        onChange={(e) => setRange(parseInt(e.target.value))}
                        className="w-full h-2 bg-secondary-foreground/20 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                    />
                </div>
            </div>

            <button
                onClick={drawNumbers}
                disabled={isDrawing}
                className={cn(
                    "px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg shadow-lg transition-all transform hover:scale-105 active:scale-95",
                    isDrawing
                        ? "bg-gray-400 cursor-not-allowed text-gray-200"
                        : "bg-emerald-600 text-white hover:shadow-emerald-500/30 hover:bg-emerald-700"
                )}
            >
                {isDrawing ? 'Drawing...' : 'Draw Numbers'}
            </button>
        </div>
    );
}
