'use client';

import { motion } from 'framer-motion';
import { Server, ArrowRight, Info, Cpu } from 'lucide-react';
import { aiSystemTiers } from '@/lib/ai-tiers';

const pricingFactors = [
  'User count',
  'Document volume',
  'Security requirements',
  'Integrations',
  'OCR/scanning needs',
  'Custom dashboard requirements',
  'GPU class selected (RTX 4090 → H100 / H200)',
  'Hardware procurement (client-direct or coordinated)',
];

export default function PricingTiers() {
  return (
    <section
      id="pricing"
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-black overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-5 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            System Tiers
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            Pricing scales with team size, document volume, and the Windows AI nodes
            deployed. Each tier targets a specific NVIDIA GPU class. Services and
            hardware are quoted separately — all numbers below are planning estimates.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {aiSystemTiers.map((tier, i) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={`relative h-full p-6 rounded-2xl backdrop-blur-sm border transition-all duration-300 ${
                tier.highlight
                  ? 'bg-gradient-to-br from-cyan-500/10 to-blue-500/5 border-cyan-500/40 hover:border-cyan-400/60'
                  : 'bg-white/5 border-white/10 hover:border-white/20'
              }`}
            >
              {tier.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-[10px] font-semibold uppercase tracking-wider">
                  Common starting point
                </div>
              )}

              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/20 flex items-center justify-center">
                  <Server className="w-5 h-5 text-cyan-300" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-gray-500">
                    {typeof tier.nodes === 'number' ? `${tier.nodes} node${tier.nodes === 1 ? '' : 's'}` : 'Custom nodes'}
                  </div>
                  <div className="text-sm text-gray-400">{tier.users} users</div>
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-1.5">{tier.label}</h3>
              <p className="text-xs text-gray-500 leading-relaxed mb-4 min-h-[2.5rem]">
                {tier.bestFor}
              </p>

              <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/5 border border-white/10 mb-5">
                <Cpu className="w-3 h-3 text-cyan-300 flex-shrink-0" />
                <span className="text-[11px] text-cyan-200/90 font-medium leading-none">
                  {tier.gpuSpec}
                </span>
              </div>

              <div className="space-y-3 pt-4 border-t border-white/10">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-gray-500 mb-0.5">
                    Services setup
                  </div>
                  <div className="text-lg font-bold text-white">{tier.setupRange}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-gray-500 mb-0.5">
                    Hardware estimate
                  </div>
                  <div className="text-base font-semibold text-gray-200">
                    {tier.hardwareRange}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-gray-500 mb-0.5">
                    Monthly support
                  </div>
                  <div className="text-base font-semibold text-cyan-300">
                    {tier.monthly}
                  </div>
                </div>
              </div>

              <a
                href="#estimate"
                className="mt-6 w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-sm font-medium text-white transition-all"
              >
                Estimate this tier
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 p-6 md:p-8 rounded-2xl bg-white/5 border border-white/10"
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
              <Info className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Pricing is a planning estimate
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-3">
                Services and hardware are billed separately. Hardware can be procured
                directly by the client or coordinated as part of the engagement. Final
                pricing depends on:
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm text-gray-300">
                {pricingFactors.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
