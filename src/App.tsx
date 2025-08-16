import React, { useState, useEffect } from 'react';

// Define the type for a verse object.
type Verse = {
    text: string;
    reference: string;
};

// Define the type for a word chip, including a unique ID for React keys.
type WordChip = {
    id: string;
    text: string;
};

// A collection of verses to use in the game. Now with 20 verses!
const verses: Verse[] = [
    { text: "For God so loved the world that He gave His one and only Son, that whoever believes in Him shall not perish but have eternal life.", reference: "John 3:16" },
    { text: "The Lord is my shepherd, I lack nothing.", reference: "Psalm 23:1" },
    { text: "I can do all this through him who gives me strength.", reference: "Philippians 4:13" },
    { text: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.", reference: "Philippians 4:6" },
    { text: "In the beginning was the Word, and the Word was with God, and the Word was God.", reference: "John 1:1" },
    { text: "Trust in the Lord with all your heart and lean not on your own understanding.", reference: "Proverbs 3:5" },
    { text: "Love is patient, love is kind. It does not envy, it does not boast, it is not proud.", reference: "1 Corinthians 13:4" },
    { text: "All scripture is God-breathed and is useful for teaching, rebuking, correcting and training in righteousness.", reference: "2 Timothy 3:16" },
    { text: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.", reference: "Romans 8:28" },
    { text: "But the fruit of the Spirit is love, joy, peace, forbearance, kindness, goodness, faithfulness, gentleness and self-control.", reference: "Galatians 5:22-23" },
    { text: "The steadfast love of the Lord never ceases; his mercies never come to an end; they are new every morning; great is your faithfulness.", reference: "Lamentations 3:22-23" },
    { text: "For where two or three gather in my name, there am I with them.", reference: "Matthew 18:20" },
    { text: "But seek first his kingdom and his righteousness, and all these things will be given to you as well.", reference: "Matthew 6:33" },
    { text: "I have told you these things, so that in me you may have peace. In this world you will have trouble. But take heart! I have overcome the world.", reference: "John 16:33" },
    { text: "Be joyful in hope, patient in affliction, faithful in prayer.", reference: "Romans 12:12" },
    { text: "Praise the Lord, my soul; all my inmost being, praise his holy name.", reference: "Psalm 103:1" },
    { text: "For it is by grace you have been saved, through faith—and this not from yourselves, it is the gift of God.", reference: "Ephesians 2:8" },
    { text: "So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you; I will uphold you with my righteous right hand.", reference: "Isaiah 41:10" },
    { text: "The Lord is a refuge for the oppressed, a stronghold in times of trouble.", reference: "Psalm 9:9" },
    { text: "And surely I am with you always, to the very end of the age.", reference: "Matthew 28:20" },
];

/**
 * Shuffles an array's elements in a random order.
 * @param {Array} array The array to shuffle.
 * @returns {Array} The shuffled array.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const shuffleArray = (array: any[]): any[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};

/**
 * Normalizes a string by removing punctuation and extra spaces.
 * @param {string} str The string to normalize.
 * @returns {string} The normalized string.
 */
const normalizeString = (str: string): string => {
    return str.replace(/[.,\\/#!$%\\^&\\*;:{}=\-_`~()]/g, "").replace(/\s+/g, " ").trim().toLowerCase();
};

const App: React.FC = () => {
    // State hooks to manage the game's data and UI.
    const [currentVerse, setCurrentVerse] = useState<Verse>({ text: '', reference: '' });
    const [scrambledWords, setScrambledWords] = useState<WordChip[]>([]);
    const [answerWords, setAnswerWords] = useState<WordChip[]>([]);
    const [message, setMessage] = useState<string>('');
    const [showSolution, setShowSolution] = useState<boolean>(false);

    /**
     * Initializes a new game by selecting a verse, scrambling its words, and updating the state.
     */
    const newGame = () => {
        // Reset state for a new game
        setAnswerWords([]);
        setMessage('');
        setShowSolution(false);

        // Select a new random verse
        const randomIndex = Math.floor(Math.random() * verses.length);
        const selectedVerse = verses[randomIndex];
        setCurrentVerse(selectedVerse);

        // Split the verse into words and create WordChip objects with unique IDs
        const words = selectedVerse.text.split(' ').map((text, index) => ({
            id: `${text}-${index}-${Date.now()}`,
            text
        }));

        // Shuffle the words and set the scrambled words state
        setScrambledWords(shuffleArray(words));
    };

    /**
     * Handles the click event on a word chip.
     * Moves the chip between the scrambled and answer containers by updating state.
     * @param {WordChip} word The word chip that was clicked.
     */
    const handleWordClick = (word: WordChip) => {
        if (scrambledWords.some(w => w.id === word.id)) {
            // Move word from scrambled to answer container
            setScrambledWords(scrambledWords.filter(w => w.id !== word.id));
            setAnswerWords([...answerWords, word]);
        } else if (answerWords.some(w => w.id === word.id)) {
            // Move word from answer back to scrambled container
            setAnswerWords(answerWords.filter(w => w.id !== word.id));
            setScrambledWords([...scrambledWords, word]);
        }
    };

    /**
     * Checks the user's answer by comparing the joined words to the original verse.
     */
    const checkAnswer = () => {
        const userAnswer = answerWords.map(w => w.text).join(' ');
        const isCorrect = normalizeString(userAnswer) === normalizeString(currentVerse.text);
        
        if (isCorrect) {
            setMessage('Correct! Great job!');
            setShowSolution(true);
        } else {
            setMessage('That\'s not quite right. Try again!');
        }
    };

    // Use useEffect to start a new game on the initial component mount.
    useEffect(() => {
        newGame();
    }, []);

    // Inline styles for the neumorphic design
    const styles = {
        container: "bg-[#e9c46a] text-[#264653] border-4 border-[#264653] shadow-[8px_8px_0_0_#264653] p-6 max-w-xl w-full text-center rounded-[2rem]",
        title: "text-4xl font-black leading-tight mb-6 text-shadow-2-2-0",
        verseContainer: "min-h-[100px] mb-6 p-4 bg-white border-2 border-[#264653] shadow-[4px_4px_0_0_#264653] flex flex-wrap justify-center gap-3 rounded-xl",
        wordChip: "py-2 px-4 text-xl font-bold border-2 border-[#264653] shadow-[2px_2px_0_0_#264653] rounded-full cursor-pointer transition-all duration-100 ease-out select-none",
        scrambledChip: "bg-[#264653] text-[#e9c46a]",
        answerChip: "bg-[#e9c46a] text-[#264653]",
        btn: "py-3 px-6 text-base font-black uppercase cursor-pointer border-2 border-[#264653] bg-[#e76f51] text-white shadow-[4px_4px_0_0_#264653] transition-all duration-100 ease-out rounded-xl",
        message: "mt-6 text-xl font-bold min-h-[30px]",
        solution: "mt-6 p-4 bg-[#264653] text-[#e9c46a] border-2 border-[#264653] shadow-[4px_4px_0_0_#264653] text-base font-normal rounded-xl",
    };

    return (
        <div className="flex justify-center items-center min-h-screen p-4 bg-[#264653] text-[#e9c46a]">
            <div className={styles.container}>
                <h1 className={styles.title}>Verse Scramble</h1>
                
                {/* Answer Container */}
                <div className={styles.verseContainer}>
                    {answerWords.map((word) => (
                        <span 
                            key={word.id} 
                            className={`${styles.wordChip} ${styles.answerChip}`}
                            onClick={() => handleWordClick(word)}
                        >
                            {word.text}
                        </span>
                    ))}
                </div>
                
                {/* Scrambled Words Container */}
                <div className={styles.verseContainer}>
                    {scrambledWords.map((word) => (
                        <span 
                            key={word.id} 
                            className={`${styles.wordChip} ${styles.scrambledChip}`}
                            onClick={() => handleWordClick(word)}
                        >
                            {word.text}
                        </span>
                    ))}
                </div>

                <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4 mt-4">
                    <button onClick={checkAnswer} className={styles.btn}>
                        Check Answer
                    </button>
                    <button onClick={newGame} className={styles.btn}>
                        New Verse
                    </button>
                </div>

                <div className={styles.message} style={{ color: message.includes('Correct') ? '#2a9d8f' : '#e76f51' }}>
                    {message}
                </div>
                
                {/* Solution */}
                {showSolution && (
                    <div className={styles.solution}>
                        <p>{`"${currentVerse.text}"`}</p>
                        <p className="mt-2 font-bold">{currentVerse.reference}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default App;
