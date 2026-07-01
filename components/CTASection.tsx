'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-black overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto relative z-10 text-center"
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white leading-tight">
          Turn your business knowledge into an{' '}
          <span className="gradient-text">AI assistant</span> your team can actually use.
        </h2>
        <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
          Answer a few business questions and get a planning estimate for your private AI
          workflow system. Final pricing depends on hardware, document volume, and
          workflow complexity.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#estimate"
            className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-bold text-white text-base md:text-lg hover:shadow-2xl hover:shadow-cyan-500/40 transition-all duration-300 hover:scale-[1.02] flex items-center gap-2"
          >
            Build Your AI System Estimate
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="mailto:darius.henry@gmail.com?subject=Private%20AI%20Workflow%20Consultation"
            className="px-7 py-4 bg-white/5 border border-white/10 backdrop-blur-sm rounded-xl font-semibold text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
          >
            Schedule a Workflow Consultation
          </a>
        </div>
      </motion.div>
    </section>
  );
}
