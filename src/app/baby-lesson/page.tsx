'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const wordList = [
  {
    hanzi: '你好',
    pinyin: 'nǐ hǎo',
    english: 'Hello',
    emoji: '👋',
  },
  {
    hanzi: '谢谢',
    pinyin: 'xiè xiè',
    english: 'Thank you',
    emoji: '🙏',
  },
  {
    hanzi: '妈妈',
    pinyin: 'mā ma',
    english: 'Mom',
    emoji: '👩',
  },
  {
    hanzi: '水',
    pinyin: 'shuǐ',
    english: 'Water',
    emoji: '💧',
  },
];

export default function BabyLesson() {
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [index, setIndex] = useState(0);
  const word = wordList[index];

  const loadVoices = useCallback(() => {
    const voices = speechSynthesis.getVoices();
    if (!voices.length) {
      setTimeout(loadVoices, 100);
      return;
    }
    const chineseVoice = voices.find(v => v.lang.startsWith('zh'));
    if (chineseVoice) {
      setVoice(chineseVoice);
    } else {
      setVoice(null);
      console.warn('No Chinese voice found for speech synthesis.');
    }
  }, []);

  useEffect(() => {
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = loadVoices;
    }
    loadVoices();
  }, [loadVoices]);

  const playSound = () => {
    if (!word) return;
    const utterance = new SpeechSynthesisUtterance(word.hanzi);
    utterance.lang = 'zh-CN';
    utterance.rate = 0.85;
    if (voice) {
      utterance.voice = voice;
    } else {
      console.warn('Playing with default voice because no Chinese voice loaded.');
    }
    speechSynthesis.speak(utterance);
  };

  const nextWord = () => {
    setIndex((prev) => (prev + 1) % wordList.length);
  };

  const prevWord = () => {
    setIndex((prev) => (prev - 1 + wordList.length) % wordList.length);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-orange-50">
      {/* 🧡 Sticky Header */}
      <header className="w-full bg-orange-200 text-orange-900 px-4 py-3 sticky top-0 shadow-md z-10 flex justify-start">
        <Link
          href="/"
          className="text-lg font-semibold hover:underline flex items-center gap-2"
        >
          ← Back to Home
        </Link>
      </header>

      {/* 🍼 Lesson Content */}
      <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
        <motion.div
          className="text-7xl"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          key={word.hanzi}
          transition={{ type: 'spring', stiffness: 100 }}
        >
          {word.emoji}
        </motion.div>
        <h1 className="text-5xl font-bold mt-4">{word.hanzi}</h1>
        <p className="text-xl text-gray-600 mt-2">{word.pinyin}</p>
        <p className="text-lg text-gray-500 mt-1">{word.english}</p>
        <div className="mt-6 flex gap-4">
          <button
            onClick={prevWord}
            className="px-4 py-2 bg-gray-300 rounded-xl shadow"
          >
            ⬅️ Prev
          </button>
          <button
            onClick={playSound}
            className="px-6 py-3 bg-orange-400 hover:bg-orange-500 text-white font-semibold rounded-2xl shadow-xl"
          >
            🔊 Say it!
          </button>
          <button
            onClick={nextWord}
            className="px-4 py-2 bg-gray-300 rounded-xl shadow"
          >
            Next ➡️
          </button>
        </div>
      </div>
    </div>
  );
}
