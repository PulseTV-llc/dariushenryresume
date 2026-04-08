'use client';

import { motion } from 'framer-motion';
import { Zap, Target, Rocket, Trophy } from 'lucide-react';

const reasons = [
  {
    icon: Zap,
    title: 'SPEED',
    description: '7-day MVPs, 90-day SaaS platforms',
    color: 'from-cyan-400 to-blue-500',
  },
  {
    icon: Trophy,
    title: 'PROOF',
    description: 'Zonely, Speakix, TapeCoach (real apps, real revenue)',
    color: 'from-purple-400 to-pink-500',
  },
  {
    icon: Target,
    title: 'FOCUS',
    description: 'Real estate + EdTech + iOS expertise',
    color: 'from-orange-400 to-red-500',
  },
  {
    icon: Rocket,
    title: 'UNFAIR ADVANTAGE',
    description: "I've already built your app (probably)",
    color: 'from-green-400 to-emerald-500',
  },
];

export default function WhyMe() {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-black overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/5 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            WHY WORK WITH ME?
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            While others are still scheduling discovery calls, your app is already live.
          </p>
        </motion.div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
              >
                <div className="h-full p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300">
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${reason.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className={`text-xl font-bold mb-2 bg-gradient-to-r ${reason.color} bg-clip-text text-transparent`}>
                    {reason.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom urgency message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-red-500/10 border border-red-500/30">
            <span className="text-2xl">🔥</span>
            <p className="text-red-400 font-semibold">
              Only taking <span className="text-white">2 new clients</span> this month
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
