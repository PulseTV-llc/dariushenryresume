'use client';

import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail, ChevronRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden grid-background">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Urgency badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/30 backdrop-blur-sm mb-8"
        >
          <span className="text-2xl">🔥</span>
          <span className="text-sm text-red-400 font-semibold">Taking 2 new clients this month</span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight leading-tight"
        >
          <span className="block text-white mb-2">I BUILD</span>
          <span className="block gradient-text">REVENUE-READY</span>
          <span className="block text-white">iOS APPS IN 7 DAYS</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto font-medium"
        >
          While others are still in discovery, your app is already{' '}
          <span className="text-green-400 font-bold">making money</span>.{' '}
          Real projects. Real results. <span className="text-cyan-400 font-bold">Fast</span>.
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-3 gap-8 max-w-3xl mx-auto mb-12"
        >
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-green-400 mb-2">27+</div>
            <div className="text-sm md:text-base text-gray-400 font-medium">Apps Making Money</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-cyan-400 mb-2">7</div>
            <div className="text-sm md:text-base text-gray-400 font-medium">Day Average Delivery</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-purple-400 mb-2">6+</div>
            <div className="text-sm md:text-base text-gray-400 font-medium">SaaS Platforms Live</div>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-16"
        >
          <a
            href="#contact"
            className="group px-10 py-5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl font-bold text-white text-lg hover:shadow-2xl hover:shadow-green-500/50 transition-all duration-300 hover:scale-105 flex items-center gap-2"
          >
            Tell Me Your Problem
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#proof"
            className="px-8 py-5 bg-white/5 border border-white/10 backdrop-blur-sm rounded-xl font-semibold text-white hover:bg-white/10 transition-all duration-300"
          >
            See How I Did It (Real Projects)
          </a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex items-center justify-center gap-6"
        >
          <a
            href="https://github.com/PulseTV-llc"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-110"
          >
            <Github className="w-6 h-6" />
          </a>
          <a
            href="https://www.linkedin.com/in/darius-henry-292b21373/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-110"
          >
            <Linkedin className="w-6 h-6" />
          </a>
          <a
            href="mailto:darius.henry@gmail.com"
            className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-110"
          >
            <Mail className="w-6 h-6" />
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ArrowDown className="w-6 h-6 text-gray-400" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
