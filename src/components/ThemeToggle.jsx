import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

export function ThemeToggle() {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        setTheme(savedTheme);
        document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
    };

    return (
        <button
            onClick={toggleTheme}
            className="p-3 md:p-4 rounded-full bg-secondary/80 backdrop-blur-sm text-secondary-foreground hover:bg-secondary transition-all duration-300 relative overflow-hidden shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 min-w-[48px] min-h-[48px] flex items-center justify-center"
            aria-label="Toggle theme"
        >
            <motion.div
                initial={false}
                animate={{ rotate: theme === 'dark' ? 180 : 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
            >
                {theme === 'dark' ? <Moon size={24} /> : <Sun size={24} />}
            </motion.div>
        </button>
    );
}
