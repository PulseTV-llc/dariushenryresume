'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Calendar, Clock } from 'lucide-react';

const blogPosts = [
  {
    slug: 'mac-studio-ai-setup',
    title: 'Why a Mac Studio Is the Cheapest Way to Run AI for a Small Business',
    excerpt: 'Cloud AI bills scale with every employee and every prompt. A one-time Mac Studio purchase doesn\'t. Here\'s the honest 3-year cost breakdown for running private, in-house AI for a 15-20 person team - and exactly where the Mac approach wins.',
    date: '2026-06-01',
    readTime: '9 min read',
    category: 'AI & Hardware',
    tags: ['AI', 'Mac Studio', 'Cost Efficiency', 'Local LLM', 'Small Business'],
  },
  {
    slug: 'how-i-built-zonely',
    title: 'How I Built a Revenue-Ready SaaS App in 90 Days (Zonely Case Study)',
    excerpt: 'Real estate founders were wasting $50K+ on agencies and waiting 6 months for buggy MVPs. Here\'s how I built Zonely - a full real estate intelligence SaaS platform - in just 90 days, and how you can do the same.',
    date: '2026-04-08',
    readTime: '8 min read',
    category: 'Case Studies',
    tags: ['SaaS', 'Real Estate Tech', 'MVP', 'React Native'],
  },
  {
    slug: '7-day-mvp-guide',
    title: '7-Day MVP: Why Startups Should Launch Fast and Iterate (Not Perfect)',
    excerpt: 'Perfectionism kills startups. Learn why shipping a working MVP in 7 days beats spending 6 months building features nobody wants. Includes my exact 7-day development process.',
    date: '2026-04-07',
    readTime: '6 min read',
    category: 'Guides',
    tags: ['MVP', 'Startup', 'Fast Development', 'Lean'],
  },
  {
    slug: 'rescuing-broken-apps',
    title: 'Rescuing Broken Apps: 5 Red Flags Your Agency Is Failing You',
    excerpt: 'Agency disappeared after taking your money? App doesn\'t work and they won\'t respond? You\'re not alone. Here are 5 warning signs your development agency is failing you, and how to rescue your broken app.',
    date: '2026-04-06',
    readTime: '7 min read',
    category: 'App Rescue',
    tags: ['Agency Problems', 'App Rescue', 'Debug', 'Fix Broken App'],
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-black py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
            Blog
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Real stories from building revenue-ready apps, rescuing broken projects, and shipping MVPs fast.
          </p>
        </motion.div>

        {/* Blog Posts Grid */}
        <div className="space-y-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all group"
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-sm font-medium">
                  {post.category}
                </span>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(post.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {post.readTime}
                  </div>
                </div>
              </div>

              <Link href={`/blog/${post.slug}`}>
                <h2 className="text-3xl font-bold text-white mb-4 group-hover:text-green-400 transition-colors cursor-pointer">
                  {post.title}
                </h2>
              </Link>

              <p className="text-gray-300 mb-6 leading-relaxed">
                {post.excerpt}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-gray-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Link href={`/blog/${post.slug}`}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-green-500/50 transition-all"
                  >
                    <span>Read More</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-2xl p-12"
        >
          <h3 className="text-3xl font-bold text-white mb-4">
            Need an App Built Fast?
          </h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Stop reading about it and start building. Get your revenue-ready app in 7 days or rescue your broken project.
          </p>
          <Link href="/#contact">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl font-bold text-lg text-white hover:shadow-2xl hover:shadow-green-500/50 transition-all"
            >
              Tell Me Your Problem →
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
