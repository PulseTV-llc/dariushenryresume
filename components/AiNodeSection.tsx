'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Layers, TrendingUp, Building2, Server, Cpu } from 'lucide-react';
import { aiSystemTiers } from '@/lib/ai-tiers';

const benefits = [
  {
    icon: ShieldCheck,
    title: 'Files stay under company control',
    description:
      'Sensitive documents do not get pasted into random public AI tools without structure, permissions, or oversight. Your data stays on your hardware.',
  },
  {
    icon: Layers,
    title: 'Tuned to your business',
    description:
      "The system is tuned around your company's own language, documents, workflows, and policies — not a generic chatbot.",
  },
  {
    icon: TrendingUp,
    title: 'Add nodes — and capacity — as you grow',
    description:
      'More AI nodes can be added for capacity and redundancy. Each node can be specced from an entry Mac Studio up to a maxed-out Mac Studio M3 Ultra with large unified memory.',
  },
  {
    icon: Building2,
    title: 'A real infrastructure asset',
    description:
      'A visible private AI infrastructure asset for the business — not just another monthly software subscription.',
  },
];

// Pull the first 8 numbered tiers for the cluster diagram (the Custom tier
// has nodes: 'Custom' and isn't a discrete node count).
const clusterNodes = aiSystemTiers
  .filter((t) => typeof t.nodes === 'number')
  .slice(0, 8)
  .map((t, i) => ({
    id: i + 1,
    gpu: t.gpuSpec
      .replace('Mac Studio ', '')
      .replace(' unified memory', '')
      .replace(/\s*·.*$/, '')
      .trim(),
  }));

export default function AiNodeSection() {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-black overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-5">
            <Cpu className="w-4 h-4 text-cyan-300" />
            <span className="text-xs uppercase tracking-wider text-gray-300">
              Custom Mac Studio AI Node Cluster
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-5 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Why Custom Mac Studio AI Nodes
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            Each AI node is a purpose-built Mac Studio running Apple Silicon
            (M-series Max or Ultra) with large unified memory and fast NVMe storage.
            Models, embeddings, and document search run locally on the Mac Studio —
            sized to your team, your workloads, and the sensitivity of your data. Add
            nodes and step up Mac Studio class as the business grows.
          </p>
        </motion.div>

        {/* Cluster diagram — each node labeled with its Mac Studio spec */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mx-auto mb-16 max-w-3xl"
        >
          <div className="relative p-6 md:p-8 rounded-3xl bg-gradient-to-br from-white/[0.04] to-white/[0.02] border border-white/10 backdrop-blur-sm">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
              {clusterNodes.map((n) => (
                <motion.div
                  key={n.id}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: n.id * 0.05 }}
                  className="aspect-square rounded-xl bg-black/40 border border-white/10 flex flex-col items-center justify-center gap-1.5 px-2 hover:border-cyan-500/40 transition-all"
                >
                  <Server className="w-5 h-5 md:w-6 md:h-6 text-cyan-300" />
                  <span className="text-[10px] md:text-xs text-gray-400 font-medium">
                    Node {String(n.id).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] md:text-[10px] text-cyan-200/80 text-center leading-tight">
                    {n.gpu}
                  </span>
                </motion.div>
              ))}
            </div>
            <p className="mt-6 text-center text-xs md:text-sm text-gray-400">
              Start with one Mac Studio M4 Max node for a leadership team. Step up to
              Mac Studio M3 Ultra configurations with more unified memory, and add nodes,
              as users, documents, and workloads grow.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {benefits.map((b, i) => {
            const Icon = b.icon;
            return (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex gap-4 p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/20 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-cyan-300" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1.5">{b.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{b.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
