'use client';

import { motion } from 'framer-motion';
import { RefreshCw, Wifi } from 'lucide-react';

/**
 * Pure-CSS device ecosystem mockup: a laptop dashboard, an iPhone employee app,
 * an Android touchscreen/kiosk, and a floating analytics chip — connected by
 * glowing real-time "sync" lines. No images; everything is Tailwind + SVG.
 */
export default function DeviceShowcase() {
  return (
    <div className="relative w-full aspect-square max-w-[560px] mx-auto select-none">
      {/* Ambient glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-purple-500/20 blur-3xl rounded-full" />

      {/* Sync lines (SVG) */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="syncLine" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>
        {[
          'M28,38 L64,22',
          'M30,52 L66,74',
          'M62,26 L66,70',
        ].map((d, i) => (
          <motion.path
            key={d}
            d={d}
            stroke="url(#syncLine)"
            strokeWidth="0.4"
            fill="none"
            strokeDasharray="2 2"
            initial={{ pathLength: 0, opacity: 0.2 }}
            animate={{ pathLength: 1, opacity: [0.2, 0.7, 0.2] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.6, ease: 'easeInOut' }}
          />
        ))}
      </svg>

      {/* Laptop dashboard */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute left-0 top-[26%] w-[62%]"
      >
        <div className="rounded-t-xl border border-white/15 bg-[#0b0f1a] shadow-2xl overflow-hidden">
          <div className="flex items-center gap-1.5 px-3 py-2 bg-white/5 border-b border-white/10">
            <span className="w-2 h-2 rounded-full bg-red-400/70" />
            <span className="w-2 h-2 rounded-full bg-yellow-400/70" />
            <span className="w-2 h-2 rounded-full bg-green-400/70" />
            <span className="ml-2 text-[8px] text-gray-500 font-medium">Business Dashboard</span>
          </div>
          <div className="p-3 space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-[9px] text-white font-semibold">Live Operations</div>
              <span className="flex items-center gap-1 text-[7px] text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Online
              </span>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {['Today', 'Staff', 'Revenue'].map((label, i) => (
                <div key={label} className="rounded-md bg-white/5 border border-white/10 p-1.5">
                  <div className="text-[6px] text-gray-500 uppercase">{label}</div>
                  <div className="text-[10px] font-bold text-cyan-300">
                    {['48', '12', '$6.4k'][i]}
                  </div>
                </div>
              ))}
            </div>
            {/* Mini bar chart */}
            <div className="flex items-end gap-1 h-10 pt-1">
              {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                <motion.div
                  key={i}
                  className="flex-1 rounded-t bg-gradient-to-t from-cyan-500/40 to-blue-400"
                  initial={{ height: '20%' }}
                  animate={{ height: `${h}%` }}
                  transition={{ duration: 1.2, delay: 0.3 + i * 0.08, ease: 'easeOut' }}
                />
              ))}
            </div>
          </div>
        </div>
        {/* Laptop base */}
        <div className="h-2 bg-gradient-to-b from-white/20 to-white/5 rounded-b-lg mx-[-6%] w-[112%]" />
      </motion.div>

      {/* iPhone employee app */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="absolute right-[6%] top-[6%] w-[26%]"
      >
        <div className="rounded-[1.4rem] border-[3px] border-white/20 bg-[#0b0f1a] shadow-2xl overflow-hidden p-2">
          <div className="mx-auto mb-1.5 h-1 w-8 rounded-full bg-white/20" />
          <div className="text-[7px] text-gray-400 mb-1">Employee App</div>
          <div className="space-y-1.5">
            {['Check in', 'My shifts', 'Tasks'].map((t, i) => (
              <div
                key={t}
                className="flex items-center justify-between rounded-md bg-white/5 border border-white/10 px-1.5 py-1"
              >
                <span className="text-[7px] text-white">{t}</span>
                <span className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-emerald-400' : 'bg-cyan-400/60'}`} />
              </div>
            ))}
            <div className="rounded-md bg-gradient-to-r from-cyan-500 to-blue-600 px-1.5 py-1 text-center text-[7px] font-semibold text-white">
              Clock In
            </div>
          </div>
        </div>
      </motion.div>

      {/* Android touchscreen / kiosk */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="absolute right-0 bottom-[8%] w-[46%]"
      >
        <div className="rounded-xl border-[3px] border-white/20 bg-[#0b0f1a] shadow-2xl overflow-hidden">
          <div className="flex items-center justify-between px-2 py-1.5 bg-white/5 border-b border-white/10">
            <span className="text-[7px] text-white font-semibold">Touchscreen Kiosk</span>
            <Wifi className="w-2.5 h-2.5 text-emerald-400" />
          </div>
          <div className="p-2 grid grid-cols-2 gap-1.5">
            {['Order', 'Check-In', 'Menu', 'Pay'].map((t, i) => (
              <div
                key={t}
                className={`rounded-lg p-2 text-center text-[8px] font-semibold border ${
                  i === 0
                    ? 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white border-transparent'
                    : 'bg-white/5 text-gray-200 border-white/10'
                }`}
              >
                {t}
              </div>
            ))}
          </div>
        </div>
        {/* Kiosk stand */}
        <div className="mx-auto h-3 w-2 bg-white/15" />
        <div className="mx-auto h-1 w-16 rounded-full bg-white/10" />
      </motion.div>

      {/* Floating analytics / sync chip */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.45 }}
        className="absolute left-[10%] bottom-[4%] rounded-xl bg-black/70 backdrop-blur-xl border border-white/15 px-3 py-2 shadow-xl"
      >
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
            <RefreshCw className="w-3 h-3 text-white animate-spin" style={{ animationDuration: '3s' }} />
          </span>
          <div>
            <div className="text-[8px] text-gray-400">Real-time sync</div>
            <div className="text-[10px] font-bold text-white">All devices connected</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
