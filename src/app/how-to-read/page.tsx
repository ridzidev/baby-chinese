'use client';

import Link from 'next/link';
import { useTTS } from '@/hooks/useTTS';

export default function HowToRead() {
  const { speak } = useTTS();
  return (
    <div className="min-h-screen flex flex-col items-center bg-orange-50 p-8">
      {/* Header */}
      <header className="w-full bg-orange-200 text-orange-900 px-4 py-3 sticky top-0 shadow-md z-10 flex justify-start">
        <Link href="/" className="text-lg font-semibold hover:underline">
          ← Back to Home
        </Link>
      </header>

      {/* Content */}
      <main className="max-w-3xl mt-8 text-left text-orange-900">
        <h1 className="text-4xl font-bold mb-6">How to Read Chinese</h1>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Reading Chinese Characters</h2>
          <p className="mb-2">
            Chinese characters (汉字 Hànzì) are logograms used in the writing of Chinese. Each character represents a meaningful syllable.
          </p>
          <p>
            Learning to read Chinese involves recognizing these characters and understanding their meanings and pronunciations.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Pinyin - The Pronunciation Guide</h2>
          <p className="mb-2">
            Pinyin is the Romanization of Chinese characters based on their pronunciation. It helps learners read and pronounce the words.
          </p>
          <p>
            For example, "你好" is pronounced as <strong>nǐ hǎo</strong>.{' '}
            <button
              onClick={() => speak('你好', 'zh-CN')}
              className="ml-2 px-3 py-1 bg-green-400 text-white rounded-lg hover:bg-green-500 transition text-sm"
            >
              🔊 Listen
            </button>
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Tones in Mandarin</h2>
          <p className="mb-2">
            Mandarin Chinese is tonal, meaning the pitch or intonation affects the meaning of a word. There are four main tones plus a neutral tone.
          </p>
          <ul className="list-disc list-inside">
            <li>
              <strong>First tone:</strong> high and level (e.g., mā){' '}
              <button
                onClick={() => speak('妈', 'zh-CN')}
                className="ml-2 px-2 py-1 bg-green-400 text-white rounded-lg hover:bg-green-500 transition text-xs"
              >
                🔊
              </button>
            </li>
            <li>
              <strong>Second tone:</strong> rising (e.g., má){' '}
              <button
                onClick={() => speak('麻', 'zh-CN')}
                className="ml-2 px-2 py-1 bg-green-400 text-white rounded-lg hover:bg-green-500 transition text-xs"
              >
                🔊
              </button>
            </li>
            <li>
              <strong>Third tone:</strong> falling-rising (e.g., mǎ){' '}
              <button
                onClick={() => speak('马', 'zh-CN')}
                className="ml-2 px-2 py-1 bg-green-400 text-white rounded-lg hover:bg-green-500 transition text-xs"
              >
                🔊
              </button>
            </li>
            <li>
              <strong>Fourth tone:</strong> falling (e.g., mà){' '}
              <button
                onClick={() => speak('骂', 'zh-CN')}
                className="ml-2 px-2 py-1 bg-green-400 text-white rounded-lg hover:bg-green-500 transition text-xs"
              >
                🔊
              </button>
            </li>
            <li>
              <strong>Neutral tone:</strong> light and quick (e.g., ma){' '}
              <button
                onClick={() => speak('吗', 'zh-CN')}
                className="ml-2 px-2 py-1 bg-green-400 text-white rounded-lg hover:bg-green-500 transition text-xs"
              >
                🔊
              </button>
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Tips for Learning Pronunciation</h2>
          <ul className="list-disc list-inside">
            <li>Listen to native speakers and repeat.</li>
            <li>Practice tones carefully – they change meaning.</li>
            <li>Use tools like TTS to hear correct pronunciation.</li>
            <li>Practice speaking aloud even if alone.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">Practice Makes Perfect</h2>
          <p>
            Keep practicing regularly, and over time your reading and pronunciation of Chinese will improve.
          </p>
        </section>
      </main>
    </div>
  );
}
