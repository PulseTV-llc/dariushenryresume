'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, CheckCircle } from 'lucide-react';

export default function ZonelyPost() {
  return (
    <div className="min-h-screen bg-black py-20 px-4 sm:px-6 lg:px-8">
      <article className="max-w-4xl mx-auto">
        {/* Back Link */}
        <Link href="/blog">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 text-green-400 hover:text-green-300 mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Blog</span>
          </motion.button>
        </Link>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-sm font-medium">
              Case Study
            </span>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Apr 8, 2026
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                8 min read
              </div>
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
            How I Built a Revenue-Ready SaaS App in 90 Days (Zonely Case Study)
          </h1>

          <p className="text-2xl text-gray-300 leading-relaxed">
            Real estate founders were wasting $50K+ on agencies and waiting 6 months for buggy MVPs. Here's how I built Zonely - a full real estate intelligence SaaS platform - in just 90 days.
          </p>
        </motion.header>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="prose prose-invert prose-lg max-w-none"
        >
          <div className="space-y-8 text-gray-300 leading-relaxed">
            {/* Problem Section */}
            <section>
              <h2 className="text-3xl font-bold text-white mb-4">🏢 The Problem</h2>
              <p>
                Real estate investors were hemorrhaging money on slow, buggy development. Here's what they were facing:
              </p>
              <ul className="space-y-2 ml-6">
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">❌</span>
                  <span>Agencies charging $50K-$100K for basic MVPs</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">❌</span>
                  <span>6-12 month development timelines (deals getting cold)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">❌</span>
                  <span>Buggy apps that crash on live demos</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">❌</span>
                  <span>No revenue features (can't charge users!)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">❌</span>
                  <span>Agencies disappearing mid-project</span>
                </li>
              </ul>
            </section>

            {/* Solution Section */}
            <section>
              <h2 className="text-3xl font-bold text-white mb-4">⚡ What I Built</h2>
              <p className="mb-4">
                Zonely is a complete real estate intelligence platform with AI-powered deal analysis. Here's what I shipped in 90 days:
              </p>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <h3 className="text-xl font-bold text-green-400 mb-2">iOS App (React Native)</h3>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Deal calculator & ROI analysis</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Property search & filtering</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>AI-powered market insights</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <h3 className="text-xl font-bold text-blue-400 mb-2">Web Portal (Next.js)</h3>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-500" />
                      <span>Admin dashboard</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-500" />
                      <span>Analytics & reporting</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-500" />
                      <span>User management</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <h3 className="text-xl font-bold text-purple-400 mb-2">Revenue Features</h3>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-purple-500" />
                      <span>Stripe subscription billing</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-purple-500" />
                      <span>3 pricing tiers</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-purple-500" />
                      <span>Trial period management</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <h3 className="text-xl font-bold text-orange-400 mb-2">AI & Backend</h3>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-orange-500" />
                      <span>OpenAI GPT-4 integration</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-orange-500" />
                      <span>Firebase Firestore database</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-orange-500" />
                      <span>Cloud Functions API</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* The 90-Day Process */}
            <section>
              <h2 className="text-3xl font-bold text-white mb-4">📅 The 90-Day Process</h2>

              <div className="space-y-6">
                <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-cyan-400 mb-2">Days 1-14: Foundation</h3>
                  <ul className="space-y-2">
                    <li>✅ Project architecture & tech stack decision</li>
                    <li>✅ Firebase setup (Auth, Firestore, Storage)</li>
                    <li>✅ React Native app skeleton</li>
                    <li>✅ Next.js web portal setup</li>
                    <li>✅ Basic UI components library</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-green-400 mb-2">Days 15-45: Core Features</h3>
                  <ul className="space-y-2">
                    <li>✅ User authentication (email, Google, Apple Sign-In)</li>
                    <li>✅ Deal calculator with ROI formulas</li>
                    <li>✅ Property data model & CRUD operations</li>
                    <li>✅ AI market analysis integration</li>
                    <li>✅ Admin dashboard basics</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-purple-400 mb-2">Days 46-75: Revenue & Polish</h3>
                  <ul className="space-y-2">
                    <li>✅ Stripe subscription integration</li>
                    <li>✅ Subscription management (upgrade/downgrade/cancel)</li>
                    <li>✅ Analytics tracking (user behavior, feature usage)</li>
                    <li>✅ Advanced search & filtering</li>
                    <li>✅ UI/UX refinements</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-orange-400 mb-2">Days 76-90: Launch Prep</h3>
                  <ul className="space-y-2">
                    <li>✅ App Store submission (iOS)</li>
                    <li>✅ Production deployment (Vercel + Firebase)</li>
                    <li>✅ Performance optimization</li>
                    <li>✅ Bug fixes from beta testing</li>
                    <li>✅ Documentation & handoff</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Results */}
            <section className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-white mb-6">💰 The Outcome</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-400 mb-2">90 days</div>
                  <div className="text-sm text-gray-400">Total Development Time</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-400 mb-2">LIVE</div>
                  <div className="text-sm text-gray-400">In Production & App Store</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-400 mb-2">Revenue-Ready</div>
                  <div className="text-sm text-gray-400">Accepting Subscriptions Day 1</div>
                </div>
              </div>
              <p className="mt-6 text-center text-gray-300">
                Now acquiring users with a multi-platform ecosystem that competitors took 12+ months to build.
              </p>
            </section>

            {/* Tech Stack */}
            <section>
              <h2 className="text-3xl font-bold text-white mb-4">🛠️ Tech Stack</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-bold text-green-400 mb-2">Frontend:</h4>
                  <ul className="space-y-1">
                    <li>• React Native (iOS app)</li>
                    <li>• Next.js 14 (Web portal)</li>
                    <li>• TypeScript</li>
                    <li>• Tailwind CSS</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-blue-400 mb-2">Backend:</h4>
                  <ul className="space-y-1">
                    <li>• Firebase (Auth, Firestore, Storage)</li>
                    <li>• Cloud Functions (Node.js)</li>
                    <li>• OpenAI GPT-4 API</li>
                    <li>• Stripe API</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Key Lessons */}
            <section>
              <h2 className="text-3xl font-bold text-white mb-4">📝 Key Lessons</h2>
              <div className="space-y-4">
                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <h4 className="font-bold text-green-400 mb-2">1. Ship revenue features FIRST</h4>
                  <p>Don't wait to add payments. Stripe integration took 2 days and unlocked immediate monetization.</p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <h4 className="font-bold text-blue-400 mb-2">2. AI accelerates development</h4>
                  <p>OpenAI integration gave us a competitive edge without months of ML training.</p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <h4 className="font-bold text-purple-400 mb-2">3. React Native = 2 platforms, 1 codebase</h4>
                  <p>Shared 80% of code between iOS and future Android app. Massive time saver.</p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <h4 className="font-bold text-orange-400 mb-2">4. Firebase scales perfectly for SaaS</h4>
                  <p>Started free tier, scales automatically as users grow. No DevOps headaches.</p>
                </div>
              </div>
            </section>

            {/* CTA */}
            <section className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-2xl p-8 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Want a Zonely-Level App?</h2>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                I can build your revenue-ready SaaS platform in 90 days too. Stop wasting time and money on slow agencies.
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
            </section>
          </div>
        </motion.div>
      </article>
    </div>
  );
}
