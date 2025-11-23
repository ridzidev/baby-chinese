'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-orange-50 p-10 text-center">
      <Image
        src="https://gcdnb.pbrd.co/images/BO2P0DvwpHcf.jpg" // Replace with your logo or cute image!
        alt="Baby learning Chinese"
        width={160}
        height={160}
        className="mb-6 rounded-full shadow-lg"
      />

      <h1 className="text-4xl sm:text-5xl font-bold text-orange-600 mb-4">
        👶 Learn Chinese Like a Baby
      </h1>
      <p className="text-lg sm:text-xl text-gray-700 max-w-xl">
        Tap, listen, and learn your first words in Mandarin — with emojis, sounds, and baby-level fun! 🧸✨
      </p>

      <div className="mt-8 flex gap-6 justify-center">
        <Link
          href="/words"
          className="inline-block bg-orange-400 hover:bg-orange-500 text-white font-semibold text-lg px-6 py-3 rounded-2xl shadow-lg transition duration-300"
        >
          📚 Vocabulary Words
        </Link>
        <Link
          href="/sentences"
          className="inline-block bg-yellow-400 hover:bg-yellow-500 text-white font-semibold text-lg px-6 py-3 rounded-2xl shadow-lg transition duration-300"
        >
          ✍️ Sentences
        </Link>
        <Link
          href="/how-to-read"
          className="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold text-lg px-6 py-3 rounded-2xl shadow-lg transition duration-300"
        >
          🗣 How to Read
        </Link>
      </div>

      <footer className="mt-16 text-sm text-gray-500">
        Made with ❤️ using Next.js + TTS : M. Alfa Ridzi, S.Mat Project
      </footer>
    </div>
  );
}
