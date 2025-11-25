import React, { useState } from 'react';
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6, Coins, Sparkles, Ticket, Cookie, Heart, Star, Shuffle, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sidebar } from './components/Sidebar';
import { ThemeToggle } from './components/ThemeToggle';
import { cn } from './lib/utils';

const App = () => {
    const [activeGame, setActiveGame] = useState('8ball');
    const [result, setResult] = useState('');
    const [history, setHistory] = useState([]);
    const [diceSides, setDiceSides] = useState(6);
    const [lotteryNumbers, setLotteryNumbers] = useState(6);
    const [lotteryRange, setLotteryRange] = useState(49);

    const customAnswers = [
        'It is certain', 'It is decidedly so', 'Without a doubt', 'Yes definitely',
        'You may rely on it', 'As I see it, yes', 'Most likely', 'Outlook good',
        'Yes', 'Signs point to yes', 'Reply hazy, try again', 'Ask again later',
        'Better not tell you now', 'Cannot predict now', 'Concentrate and ask again',
        'Don\'t count on it', 'My reply is no', 'My sources say no',
        'Outlook not so good', 'Very doubtful'
    ];

    const games = [
        { id: '8ball', name: 'Magic 8 Ball', icon: Sparkles, color: 'from-purple-500 to-pink-500' },
        { id: 'coin', name: 'Coin Flip', icon: Coins, color: 'from-yellow-500 to-orange-500' },
        { id: 'dice', name: 'Dice Roll', icon: Dice6, color: 'from-blue-500 to-cyan-500' },
        { id: 'lottery', name: 'Lottery Numbers', icon: Ticket, color: 'from-green-500 to-teal-500' },
        { id: 'fortune', name: 'Fortune Teller', icon: Star, color: 'from-indigo-500 to-purple-500' },
        { id: 'cookie', name: 'Fortune Cookie', icon: Cookie, color: 'from-amber-500 to-yellow-500' },
        { id: 'love', name: 'Love Calculator', icon: Heart, color: 'from-red-500 to-pink-500' },
        { id: 'random', name: 'Random Choice', icon: Shuffle, color: 'from-emerald-500 to-green-500' }
    ];

    const fortunes = [
        'A beautiful, smart, and loving person will be coming into your life.',
        'A dubious friend may be an enemy in camouflage.',
        'A faithful friend is a strong defense.',
        'A fresh start will put you on your way.',
        'A friend asks only for your time not your money.',
        'A friend is a present you give yourself.',
        'A gambler not only will lose what he has, but also will lose what he doesn’t have.',
        'A golden egg of opportunity falls into your lap this month.',
        'A good friendship is often more important than a passionate romance.',
        'A good time to finish up old tasks.',
        'A hunch is creativity trying to tell you something.',
        'A lifetime friend shall soon be made.',
        'A light heart carries you through all the hard times.',
        'A new perspective will come with the new year.',
        'A person is never too old to learn.',
        'A person of words and not deeds is like a garden full of weeds.',
        'A pleasant surprise is waiting for you.',
        'A smile is your personal welcome mat.',
        'A smooth long journey! Great expectations.',
        'A soft voice may be awfully persuasive.',
        'A truly rich life contains love and art in abundance.',
        'Accept something that you cannot change, and you will feel better.',
        'Adventure can be real happiness.',
        'Advice is like kissing. It costs nothing and is a pleasant thing to do.',
        'Advice, when most needed, is least heeded.'
    ];

    const loveMessages = [
        'You are destined to meet someone special soon!',
        'Love is right around the corner.',
        'Your heart is open to new possibilities.',
        'True love starts with self-love.',
        'Romance is in the air for you.',
        'Someone is thinking of you right now.',
        'Love grows through giving.',
        'Your kindness will return to you tenfold.',
        'A meaningful relationship is coming your way.',
        'Love conquers all obstacles.'
    ];

    const generateResult = (gameType) => {
        let newResult = '';

        switch (gameType) {
            case '8ball':
                newResult = customAnswers[Math.floor(Math.random() * customAnswers.length)];
                break;
            case 'coin':
                newResult = Math.random() < 0.5 ? 'Heads' : 'Tails';
                break;
            case 'dice':
                newResult = Math.floor(Math.random() * diceSides) + 1;
                break;
            case 'lottery':
                const numbers = new Set();
                while (numbers.size < lotteryNumbers) {
                    numbers.add(Math.floor(Math.random() * lotteryRange) + 1);
                }
                newResult = Array.from(numbers).sort((a, b) => a - b).join(', ');
                break;
            case 'fortune':
                newResult = fortunes[Math.floor(Math.random() * fortunes.length)];
                break;
            case 'cookie':
                newResult = fortunes[Math.floor(Math.random() * fortunes.length)];
                break;
            case 'love':
                const compatibility = Math.floor(Math.random() * 41) + 60; // 60-100%
                newResult = `${compatibility}% - ${loveMessages[Math.floor(Math.random() * loveMessages.length)]}`;
                break;
            case 'random':
                const choices = ['Yes', 'No', 'Maybe', 'Definitely', 'Probably Not', 'Ask Again'];
                newResult = choices[Math.floor(Math.random() * choices.length)];
                break;
            default:
                newResult = 'Try again!';
        }

        setResult(newResult);
        setHistory(prev => [{ game: gameType, result: newResult, time: new Date() }, ...prev.slice(0, 9)]);
    };

    const getDiceIcon = (number) => {
        const icons = { 1: Dice1, 2: Dice2, 3: Dice3, 4: Dice4, 5: Dice5, 6: Dice6 };
        return icons[number] || Dice6;
    };

    const renderGameContent = () => {
        const currentGame = games.find(game => game.id === activeGame);

        return (
            <motion.div
                key={activeGame}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="flex-1 flex flex-col items-center justify-center p-8 min-h-[500px]"
            >
                <div className={cn(
                    "w-32 h-32 rounded-3xl flex items-center justify-center mb-8 shadow-2xl transform transition-transform hover:scale-105",
                    `bg-gradient-to-br ${currentGame.color}`
                )}>
                    {activeGame === 'dice' && result ? (
                        React.createElement(getDiceIcon(result), { size: 64, className: "text-white drop-shadow-md" })
                    ) : (
                        <currentGame.icon size={64} className="text-white drop-shadow-md" />
                    )}
                </div>

                <AnimatePresence mode="wait">
                    {result && (
                        <motion.div
                            key={result}
                            initial={{ scale: 0.8, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.8, opacity: 0, y: -20 }}
                            className="text-center mb-10 w-full max-w-2xl"
                        >
                            <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-4">Result</h2>
                            <div className="bg-card/80 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-border/50 ring-1 ring-black/5">
                                <p className="text-3xl md:text-4xl font-bold text-foreground bg-clip-text bg-gradient-to-r from-primary to-purple-600">
                                    {activeGame === 'dice' ? `Roll: ${result}` : result}
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="w-full max-w-md space-y-6">
                    {activeGame === 'dice' && (
                        <div className="bg-secondary/50 rounded-xl p-6 border border-border">
                            <label className="block text-sm font-medium text-muted-foreground mb-4">
                                Number of sides: <span className="text-foreground font-bold">{diceSides}</span>
                            </label>
                            <input
                                type="range"
                                min="2"
                                max="100"
                                value={diceSides}
                                onChange={(e) => setDiceSides(parseInt(e.target.value))}
                                className="w-full h-2 bg-secondary-foreground/20 rounded-lg appearance-none cursor-pointer accent-primary"
                            />
                        </div>
                    )}

                    {activeGame === 'lottery' && (
                        <div className="grid grid-cols-2 gap-4 bg-secondary/50 rounded-xl p-6 border border-border">
                            <div>
                                <label className="block text-sm font-medium text-muted-foreground mb-4">
                                    Numbers: <span className="text-foreground font-bold">{lotteryNumbers}</span>
                                </label>
                                <input
                                    type="range"
                                    min="1"
                                    max="20"
                                    value={lotteryNumbers}
                                    onChange={(e) => setLotteryNumbers(parseInt(e.target.value))}
                                    className="w-full h-2 bg-secondary-foreground/20 rounded-lg appearance-none cursor-pointer accent-primary"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-muted-foreground mb-4">
                                    Range: 1-<span className="text-foreground font-bold">{lotteryRange}</span>
                                </label>
                                <input
                                    type="range"
                                    min="10"
                                    max="100"
                                    value={lotteryRange}
                                    onChange={(e) => setLotteryRange(parseInt(e.target.value))}
                                    className="w-full h-2 bg-secondary-foreground/20 rounded-lg appearance-none cursor-pointer accent-primary"
                                />
                            </div>
                        </div>
                    )}

                    {activeGame === '8ball' && (
                        <div className="bg-secondary/50 rounded-xl p-6 border border-border">
                            <label className="block text-sm font-medium text-muted-foreground mb-2">
                                Ask your question:
                            </label>
                            <input
                                type="text"
                                placeholder="Type your question here..."
                                className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                            />
                        </div>
                    )}

                    <div className="grid grid-cols-1 gap-4">
                        <button
                            onClick={() => generateResult(activeGame)}
                            className={`w-full py-4 px-6 rounded-xl text-white font-bold text-lg shadow-lg shadow-primary/20 transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] bg-gradient-to-r ${currentGame.color}`}
                        >
                            {activeGame === '8ball' ? 'Shake the 8 Ball' :
                                activeGame === 'coin' ? 'Flip the Coin' :
                                    activeGame === 'dice' ? 'Roll the Dice' :
                                        activeGame === 'lottery' ? 'Generate Numbers' :
                                            activeGame === 'fortune' ? 'Reveal Your Fortune' :
                                                activeGame === 'cookie' ? 'Open Fortune Cookie' :
                                                    activeGame === 'love' ? 'Calculate Love' :
                                                        'Make Random Choice'}
                        </button>

                        {result && (
                            <button
                                onClick={() => setResult('')}
                                className="w-full py-3 px-6 rounded-xl text-muted-foreground font-medium border border-border hover:bg-secondary transition-colors duration-200 flex items-center justify-center gap-2"
                            >
                                <RotateCcw size={18} />
                                Clear Result
                            </button>
                        )}
                    </div>
                </div>
            </motion.div>
        );
    };

    return (
        <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
            <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
            <div className="container mx-auto px-4 py-8 max-w-7xl relative">
                {/* Header */}
                <header className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
                    <div className="text-center md:text-left">
                        <h1 className="text-5xl md:text-6xl font-heading font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600 mb-2">
                            Chance Master
                        </h1>
                        <p className="text-muted-foreground text-lg">
                            Your ultimate guide to fortune and randomness
                        </p>
                    </div>
                    <ThemeToggle />
                </header>

                <div className="flex flex-col lg:flex-row gap-8">
                    <Sidebar
                        games={games}
                        activeGame={activeGame}
                        setActiveGame={setActiveGame}
                        history={history}
                    />

                    {/* Main Game Area */}
                    <div className="lg:w-3/4">
                        <div className="bg-card/50 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl h-full min-h-[600px] relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5 pointer-events-none" />
                            <AnimatePresence mode="wait">
                                {renderGameContent()}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <footer className="text-center mt-16 text-muted-foreground py-8 border-t border-border">
                    <p>Made with ❤️ for those who believe in chance</p>
                </footer>
            </div>
        </div>
    );
};

export default App;
