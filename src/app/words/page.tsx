'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import wordData from '../word.json';
import Link from 'next/link';
import { useTTS } from '@/hooks/useTTS';

export default function WordsPage() {
  const [index, setIndex] = useState(0);
  const word = wordData[index];
  const { speak } = useTTS();

  const nextWord = () => {
    setIndex((prev) => (prev + 1) % wordData.length);
  };

  const prevWord = () => {
    setIndex((prev) => (prev - 1 + wordData.length) % wordData.length);
  };

  const handleSpeak = () => {
    speak(word.hanzi, 'zh-CN');
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-orange-50 p-6">
      <header className="w-full bg-orange-200 text-orange-900 px-4 py-3 sticky top-0 shadow-md z-10 flex justify-between items-center">
        <Link href="/" className="text-lg font-semibold hover:underline">
          ← Back to Home
        </Link>
        <h1 className="text-2xl font-bold">Vocabulary Words</h1>
        <Link href="/sentences" className="text-lg font-semibold hover:underline">
          See Sentences →
        </Link>
      </header>

      <main className="flex flex-col items-center justify-center flex-1 text-center mt-12 w-full max-w-lg bg-white rounded-2xl shadow-lg p-8">
        <motion.div
          className="text-8xl"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          key={word.hanzi}
          transition={{ type: 'spring', stiffness: 120 }}
        >
          {word.emoji}
        </motion.div>
        <h2 className="text-6xl font-extrabold mt-6">{word.hanzi}</h2>
        <p className="text-2xl mt-4 text-gray-700">{word.pinyin}</p>
        <p className="text-xl mt-2 text-gray-500">{word.english}</p>

        <div className="mt-8 flex gap-6">
          <button
            onClick={prevWord}
            className="px-5 py-3 bg-gray-300 rounded-xl shadow hover:bg-gray-400 transition"
          >
            ← Prev
          </button>
          <button
            onClick={handleSpeak}
            className="px-5 py-3 bg-green-400 text-white rounded-xl shadow hover:bg-green-500 transition font-semibold flex items-center gap-2"
          >
            🔊 Listen
          </button>
          <button
            onClick={nextWord}
            className="px-5 py-3 bg-orange-400 text-white rounded-xl shadow hover:bg-orange-500 transition"
          >
            Next →
          </button>
        </div>
      </main>
    </div>
  );
}
