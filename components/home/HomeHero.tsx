'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, PlayCircle, Laptop, Smartphone, Tablet, MonitorSmartphone, RefreshCw } from 'lucide-react';
import DeviceShowcase from '@/components/business/DeviceShowcase';
import VexaMark from '@/components/site/VexaMark';

const chips = [
  { icon: Laptop, label: 'Web App' },
  { icon: Smartphone, label: 'iOS App' },
  { icon: Tablet, label: 'Android' },
  { icon: MonitorSmartphone, label: 'Touchscreen' },
  { icon: RefreshCw, label: 'Real-Time Sync' },
];

export default function HomeHero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden grid-background pt-24 pb-16">
      {/* Ambient orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-16 -left-10 w-[28rem] h-[28rem] bg-cyan-500/15 rounded-full blur-3xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.45, 0.25] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-[30rem] h-[30rem] bg-purple-500/15 rounded-full blur-3xl"
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Copy */}
          <div className="lg:col-span-6 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 pl-2 pr-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-7"
            >
              <VexaMark size={22} />
              <span className="text-sm text-gray-200 font-semibold tracking-wide">
                VexaOS · One Platform. Every Device. Fully Connected.
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] text-balance"
            >
              <span className="block text-white">Custom Web, Mobile &amp; Touchscreen</span>
              <span className="block gradient-text">Systems for Modern Businesses</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 text-lg md:text-xl text-gray-300 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              <span className="text-white font-semibold">VexaOS</span> is the custom platform I build
              for your business — web apps, iPhone and Android apps, touchscreen interfaces, dashboards,
              and staff tools that sync together in real time,{' '}
              <span className="text-white font-medium">designed around the way your business actually works.</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-9 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <Link
                href="/contact"
                className="group w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-bold text-white text-base hover:shadow-2xl hover:shadow-cyan-500/40 transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                Build My Business System
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/systems"
                className="group w-full sm:w-auto px-7 py-4 bg-white/5 border border-white/10 backdrop-blur-sm rounded-xl font-semibold text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <PlayCircle className="w-5 h-5 text-cyan-300" />
                See What Can Be Built
              </Link>
            </motion.div>

            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-2.5"
            >
              {chips.map(({ icon: I, label }) => (
                <li
                  key={label}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm text-gray-200"
                >
                  <I className="w-4 h-4 text-cyan-300" />
                  {label}
                </li>
              ))}
            </motion.ul>
          </div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-6"
          >
            <DeviceShowcase />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
