'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

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

  useEffect(() => {
    const loadVoices = () => {
      const voices = speechSynthesis.getVoices();
      const chineseVoice = voices.find(v => v.lang.startsWith('zh'));
      if (chineseVoice) setVoice(chineseVoice);
    };

    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = loadVoices;
    }
    loadVoices();
  }, []);

  const playSound = () => {
    const utterance = new SpeechSynthesisUtterance(word.hanzi);
    utterance.lang = 'zh-CN';
    utterance.rate = 0.85;
    if (voice) utterance.voice = voice;
    speechSynthesis.speak(utterance);
  };

  const nextWord = () => {
    setIndex((prev) => (prev + 1) % wordList.length);
  };

  const prevWord = () => {
    setIndex((prev) => (prev - 1 + wordList.length) % wordList.length);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-8 bg-orange-50">
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
  );
}
