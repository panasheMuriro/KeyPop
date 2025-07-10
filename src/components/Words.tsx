// import { useState, useEffect } from 'react';
// import { ArrowRight } from 'lucide-react';

// const Words = () => {
//   const [currentWord, setCurrentWord] = useState('');
//   const [typedText, setTypedText] = useState('');
//   const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
//   const [showCelebration, setShowCelebration] = useState(false);

//   // Simple word list for young learners
//   const words = ['cat', 'dog', 'sun', 'bat', 'hat', 'cup', 'red', 'big', 'run', 'fun', 'bird', 'fish', 'tree', 'book', 'moon', 'star', 'play', 'jump', 'sing', 'cake'];

//   const getRandomWord = () => {
//     return words[Math.floor(Math.random() * words.length)];
//   };

//   useEffect(() => {
//     setCurrentWord(getRandomWord());
//     setTypedText('');
//     setCurrentLetterIndex(0);
//   }, []);

//   // Play letter sound
//   const playLetterSound = (isCorrect = true) => {
//     const audioContext = new (window.AudioContext || window.webkitAudioContext)();
//     const oscillator = audioContext.createOscillator();
//     const gainNode = audioContext.createGain();
    
//     oscillator.connect(gainNode);
//     gainNode.connect(audioContext.destination);
    
//     if (isCorrect) {
//       oscillator.frequency.value = 600; // Pleasant tone for correct
//     } else {
//       oscillator.frequency.value = 200; // Lower tone for incorrect
//     }
    
//     oscillator.type = 'sine';
//     gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
//     gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
    
//     oscillator.start();
//     oscillator.stop(audioContext.currentTime + 0.2);
//   };

//   // Play celebration sound
//   const playCelebrationSound = () => {
//     const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
//     // Play a series of ascending notes
//     const notes = [523, 659, 784, 1047]; // C, E, G, C
    
//     notes.forEach((frequency, index) => {
//       setTimeout(() => {
//         const oscillator = audioContext.createOscillator();
//         const gainNode = audioContext.createGain();
        
//         oscillator.connect(gainNode);
//         gainNode.connect(audioContext.destination);
        
//         oscillator.frequency.value = frequency;
//         oscillator.type = 'sine';
//         gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
//         gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        
//         oscillator.start();
//         oscillator.stop(audioContext.currentTime + 0.3);
//       }, index * 100);
//     });
//   };

//   useEffect(() => {
//     if (typedText.length > 0) {
//       const lastTypedChar = typedText[typedText.length - 1];
//       const expectedChar = currentWord[typedText.length - 1];
      
//       if (lastTypedChar === expectedChar) {
//         playLetterSound(true); // Correct letter sound
//         setCurrentLetterIndex(typedText.length);
        
//         if (typedText === currentWord) {
//           // Word completed!
//           setShowCelebration(true);
//           playCelebrationSound();
          
//           setTimeout(() => {
//             setShowCelebration(false);
//             setCurrentWord(getRandomWord());
//             setTypedText('');
//             setCurrentLetterIndex(0);
//           }, 2000);
//         }
//       } else {
//         playLetterSound(false); // Incorrect letter sound
//       }
//     }
//   }, [typedText, currentWord]);

//   const handleInputChange = (e) => {
//     const value = e.target.value.toLowerCase();
//     if (value.length <= currentWord.length) {
//       setTypedText(value);
//     }
//   };

//   const nextWord = () => {
//     setCurrentWord(getRandomWord());
//     setTypedText('');
//     setCurrentLetterIndex(0);
//   };

//   const renderWord = () => {
//     return currentWord.split('').map((letter, index) => {
//       let className = 'text-8xl font-bold mx-2 px-4 py-3 rounded-2xl transition-all duration-300 ';
      
//       if (index < typedText.length) {
//         if (typedText[index] === letter) {
//           className += 'bg-green-400 text-white shadow-xl transform scale-110';
//         } else {
//           className += 'bg-red-400 text-white shadow-xl';
//         }
//       } else if (index === currentLetterIndex) {
//         className += 'bg-yellow-300 text-black shadow-xl animate-pulse';
//       } else {
//         className += 'bg-white/80 text-gray-700 shadow-lg';
//       }
      
//       return (
//         <span key={index} className={className}>
//           {letter.toUpperCase()}
//         </span>
//       );
//     });
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center p-4">
//       <div className="max-w-4xl mx-auto text-center">
        
//         {/* Main Typing Area */}
//         <div className="bg-white/20 backdrop-blur-md rounded-3xl p-12 relative overflow-hidden">
          
//           {/* Current Word Display */}
//           <div className="mb-12">
//             <div className="flex justify-center items-center flex-wrap gap-2">
//               {renderWord()}
//             </div>
//           </div>

//           {/* Input Field */}
//           <div className="mb-8">
//             <input
//               type="text"
//               value={typedText}
//               onChange={handleInputChange}
//               placeholder="Start typing..."
//               className="text-4xl font-bold text-center p-6 rounded-2xl border-4 border-white/30 bg-white/90 text-gray-800 w-full max-w-lg mx-auto focus:outline-none focus:border-yellow-300 focus:ring-4 focus:ring-yellow-300/50"
//               autoFocus
//             />
//           </div>

//           {/* Next Word Button */}
//           <button
//             onClick={nextWord}
//             className="flex items-center gap-2 px-6 py-3 bg-white/20 hover:bg-white/30 rounded-xl text-white text-lg font-semibold transition-colors mx-auto"
//           >
//             <ArrowRight size={20} />
//             Next Word
//           </button>

//           {/* Celebration */}
//           {showCelebration && (
//             <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-3xl">
//               <div className="bg-yellow-300 text-black text-6xl font-bold px-12 py-8 rounded-3xl shadow-2xl animate-bounce">
//                 🎉 Good Job! 🎉
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Words;

import { useState, useEffect, ChangeEvent } from 'react';
import { ArrowRight } from 'lucide-react';

declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
  }
}

const Words = () => {
  const [currentWord, setCurrentWord] = useState<string>('');
  const [typedText, setTypedText] = useState<string>('');
  const [currentLetterIndex, setCurrentLetterIndex] = useState<number>(0);
  const [showCelebration, setShowCelebration] = useState<boolean>(false);

  const words: string[] = [
    'cat', 'dog', 'sun', 'bat', 'hat', 'cup', 'red', 'big', 'run', 'fun',
    'bird', 'fish', 'tree', 'book', 'moon', 'star', 'play', 'jump', 'sing', 'cake'
  ];

  const getRandomWord = (): string => {
    return words[Math.floor(Math.random() * words.length)];
  };

  useEffect(() => {
    setCurrentWord(getRandomWord());
    setTypedText('');
    setCurrentLetterIndex(0);
  }, []);

  const playLetterSound = (isCorrect: boolean = true) => {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    const audioContext = new AudioCtx();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = isCorrect ? 600 : 200;
    oscillator.type = 'sine';
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.2);
  };

  const playCelebrationSound = () => {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    const audioContext = new AudioCtx();

    const notes = [523, 659, 784, 1047];

    notes.forEach((frequency, index) => {
      setTimeout(() => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = frequency;
        oscillator.type = 'sine';
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.3);
      }, index * 100);
    });
  };

  useEffect(() => {
    if (typedText.length > 0) {
      const lastTypedChar = typedText[typedText.length - 1];
      const expectedChar = currentWord[typedText.length - 1];

      if (lastTypedChar === expectedChar) {
        playLetterSound(true);
        setCurrentLetterIndex(typedText.length);

        if (typedText === currentWord) {
          setShowCelebration(true);
          playCelebrationSound();

          setTimeout(() => {
            setShowCelebration(false);
            setCurrentWord(getRandomWord());
            setTypedText('');
            setCurrentLetterIndex(0);
          }, 2000);
        }
      } else {
        playLetterSound(false);
      }
    }
  }, [typedText, currentWord]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    if (value.length <= currentWord.length) {
      setTypedText(value);
    }
  };

  const nextWord = () => {
    setCurrentWord(getRandomWord());
    setTypedText('');
    setCurrentLetterIndex(0);
  };

  const renderWord = () => {
    return currentWord.split('').map((letter, index) => {
      let className = 'text-8xl font-bold mx-2 px-4 py-3 rounded-2xl transition-all duration-300 ';

      if (index < typedText.length) {
        if (typedText[index] === letter) {
          className += 'bg-green-400 text-white shadow-xl transform scale-110';
        } else {
          className += 'bg-red-400 text-white shadow-xl';
        }
      } else if (index === currentLetterIndex) {
        className += 'bg-yellow-300 text-black shadow-xl animate-pulse';
      } else {
        className += 'bg-white/80 text-gray-700 shadow-lg';
      }

      return (
        <span key={index} className={className}>
          {letter.toUpperCase()}
        </span>
      );
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-white/20 backdrop-blur-md rounded-3xl p-12 relative overflow-hidden">
          <div className="mb-12">
            <div className="flex justify-center items-center flex-wrap gap-2">
              {renderWord()}
            </div>
          </div>

          <div className="mb-8">
            <input
              type="text"
              value={typedText}
              onChange={handleInputChange}
              placeholder="Start typing..."
              className="text-4xl font-bold text-center p-6 rounded-2xl border-4 border-white/30 bg-white/90 text-gray-800 w-full max-w-lg mx-auto focus:outline-none focus:border-yellow-300 focus:ring-4 focus:ring-yellow-300/50"
              autoFocus
            />
          </div>

          <button
            onClick={nextWord}
            className="flex items-center gap-2 px-6 py-3 bg-white/20 hover:bg-white/30 rounded-xl text-white text-lg font-semibold transition-colors mx-auto"
          >
            <ArrowRight size={20} />
            Next Word
          </button>

          {showCelebration && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-3xl">
              <div className="bg-yellow-300 text-black text-6xl font-bold px-12 py-8 rounded-3xl shadow-2xl animate-bounce">
                🎉 Good Job! 🎉
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Words;
