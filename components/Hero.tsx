'use client';

import { motion } from 'framer-motion';
import {
  ArrowDown,
  ChevronRight,
  ShieldCheck,
  Search,
  Workflow,
  Server,
  FileSearch,
} from 'lucide-react';

const heroBullets = [
  { icon: Search, label: 'Private document search' },
  { icon: FileSearch, label: 'Custom AI business assistant' },
  { icon: Workflow, label: 'Workflow automation' },
  { icon: Server, label: 'Windows AI node deployment (NVIDIA GPUs)' },
  { icon: ShieldCheck, label: 'Built around your actual files & processes' },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden grid-background">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 w-full">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left: copy + CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 backdrop-blur-sm mb-8"
            >
              <ShieldCheck className="w-4 h-4 text-cyan-300" />
              <span className="text-sm text-cyan-200 font-semibold tracking-wide">
                Private AI infrastructure for business
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight leading-[1.05]"
            >
              <span className="block text-white">Private AI</span>
              <span className="block gradient-text">Workflow Systems</span>
              <span className="block text-white">for Businesses</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed"
            >
              I help companies turn their documents, policies, procedures, customer
              messages, and internal knowledge into a{' '}
              <span className="text-white">secure, searchable AI assistant</span>{' '}
              powered by dedicated Windows AI nodes with high-performance NVIDIA GPUs —
              RTX 4090 to H100.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-10"
            >
              <a
                href="#estimate"
                className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-bold text-white text-base md:text-lg hover:shadow-2xl hover:shadow-cyan-500/40 transition-all duration-300 hover:scale-[1.02] flex items-center gap-2"
              >
                Build Your AI System Estimate
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#capabilities"
                className="px-7 py-4 bg-white/5 border border-white/10 backdrop-blur-sm rounded-xl font-semibold text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              >
                See What This System Can Do
              </a>
            </motion.div>

            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="grid sm:grid-cols-2 gap-x-6 gap-y-3 max-w-xl mx-auto lg:mx-0"
            >
              {heroBullets.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-3 text-sm text-gray-300">
                  <span className="w-7 h-7 rounded-md bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-cyan-300" />
                  </span>
                  <span>{label}</span>
                </li>
              ))}
            </motion.ul>
          </div>

          {/* Right: AI node cluster visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <NodeClusterCard />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2"
        >
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <ArrowDown className="w-6 h-6 text-gray-500" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function NodeClusterCard() {
  const nodes = [
    { label: 'Node 01', role: 'Document indexing' },
    { label: 'Node 02', role: 'Assistant runtime' },
    { label: 'Node 03', role: 'Workflow automation' },
    { label: 'Node 04', role: 'Reserved capacity' },
  ];

  return (
    <div className="relative">
      <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-cyan-500/30 via-blue-500/20 to-purple-500/30 blur-2xl opacity-50" />
      <div className="relative bg-black/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
              <Server className="w-4 h-4 text-white" />
            </span>
            <div>
              <div className="text-xs uppercase tracking-wider text-gray-400">
                Private Infrastructure
              </div>
              <div className="text-sm text-white font-semibold">Custom AI Node Cluster</div>
            </div>
          </div>
          <span className="flex items-center gap-2 text-xs text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Online
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          {nodes.map((n, i) => (
            <motion.div
              key={n.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase tracking-wider text-gray-500">
                  {n.label}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              </div>
              <div className="text-sm text-white font-medium">{n.role}</div>
              <div className="mt-2 h-1 rounded-full bg-white/5 overflow-hidden">
                <motion.div
                  initial={{ width: '20%' }}
                  animate={{ width: ['20%', '85%', '40%', '70%'] }}
                  transition={{ duration: 6 + i, repeat: Infinity, ease: 'easeInOut' }}
                  className="h-full bg-gradient-to-r from-cyan-400 to-blue-500"
                />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="pt-4 border-t border-white/10 grid grid-cols-3 gap-3 text-center">
          <div>
            <div className="text-lg font-bold text-cyan-300">8</div>
            <div className="text-[10px] uppercase tracking-wider text-gray-500">
              Max nodes
            </div>
          </div>
          <div>
            <div className="text-lg font-bold text-blue-300">Private</div>
            <div className="text-[10px] uppercase tracking-wider text-gray-500">
              Document scope
            </div>
          </div>
          <div>
            <div className="text-lg font-bold text-purple-300">Scalable</div>
            <div className="text-[10px] uppercase tracking-wider text-gray-500">
              Per team size
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
