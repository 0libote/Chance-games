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
            if (current >= count) {
                clearInterval(interval);
                setIsDrawing(false);
                if (onResult) onResult(finalNumbers.join(', '));
                return;
            }
            setNumbers(prev => [...prev, finalNumbers[current]]);
            current++;
        }, 500);
    };

    return (
        <div className="flex flex-col items-center justify-center h-full min-h-[400px]">
            <div className="flex flex-wrap gap-4 justify-center mb-12 min-h-[80px]">
                {numbers.map((num, i) => (
                    <motion.div
                        key={i}
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 shadow-lg flex items-center justify-center border-2 border-white"
                    >
                        <span className="text-2xl font-bold text-white">{num}</span>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-2 gap-6 w-full max-w-md mb-8">
                <div className="bg-secondary/50 p-4 rounded-xl border border-border">
                    <label className="block text-sm font-medium text-muted-foreground mb-2">
                        Count: <span className="text-foreground font-bold">{count}</span>
                    </label>
                    <input
                        type="range"
                        min="1"
                        max="10"
                        value={count}
                        onChange={(e) => setCount(parseInt(e.target.value))}
                        className="w-full h-2 bg-secondary-foreground/20 rounded-lg appearance-none cursor-pointer accent-green-500"
                    />
                </div>
                <div className="bg-secondary/50 p-4 rounded-xl border border-border">
                    <label className="block text-sm font-medium text-muted-foreground mb-2">
                        Range: 1-<span className="text-foreground font-bold">{range}</span>
                    </label>
                    <input
                        type="range"
                        min="10"
                        max="99"
                        value={range}
                        onChange={(e) => setRange(parseInt(e.target.value))}
                        className="w-full h-2 bg-secondary-foreground/20 rounded-lg appearance-none cursor-pointer accent-green-500"
                    />
                </div>
            </div>

            <button
                onClick={drawNumbers}
                disabled={isDrawing}
                className={cn(
                    "px-8 py-4 rounded-xl font-bold text-lg shadow-lg transition-all transform hover:scale-105 active:scale-95",
                    isDrawing
                        ? "bg-gray-400 cursor-not-allowed text-gray-200"
                        : "bg-gradient-to-r from-green-500 to-teal-500 text-white hover:shadow-green-500/25"
                )}
            >
                {isDrawing ? 'Drawing...' : 'Draw Numbers'}
            </button>
        </div>
    );
}
