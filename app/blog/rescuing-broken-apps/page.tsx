'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function RescuingAppsPost() {
  return (
    <div className="min-h-screen bg-black py-20 px-4 sm:px-6 lg:px-8">
      <article className="max-w-4xl mx-auto">
        <Link href="/blog">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 text-green-400 hover:text-green-300 mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Blog</span>
          </motion.button>
        </Link>

        <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
          Rescuing Broken Apps: 5 Red Flags Your Agency Is Failing You
        </h1>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
          <p className="text-2xl text-gray-300">
            📝 This blog post is coming soon! Check back later for the full guide on rescuing broken apps.
          </p>
        </div>
      </article>
    </div>
  );
}
