'use client';

import { motion } from 'framer-motion';
import { Search, Bot, Workflow, Server } from 'lucide-react';

const features = [
  {
    icon: Search,
    title: 'Private Document Search',
    description:
      'Ask natural-language questions about company files, policies, contracts, SOPs, invoices, reports, pricing sheets, and procedures.',
    color: 'from-cyan-400 to-blue-500',
  },
  {
    icon: Bot,
    title: 'Custom Business Assistant',
    description:
      "AI prompts and workflows built around the company's tone, services, customers, staff, and operations.",
    color: 'from-purple-400 to-pink-500',
  },
  {
    icon: Workflow,
    title: 'Workflow Automation',
    description:
      'Generate summaries, draft emails, create reports, organize documents, build response templates, and reduce repetitive admin work.',
    color: 'from-orange-400 to-amber-500',
  },
  {
    icon: Server,
    title: 'Local AI Infrastructure',
    description:
      'Deploy dedicated Windows AI nodes built around NVIDIA GPUs (RTX 4090, RTX 6000 Ada, L40S, H100) that scale as the team, document volume, and workload grow.',
    color: 'from-emerald-400 to-teal-500',
  },
];

export default function FeatureGrid() {
  return (
    <section
      id="capabilities"
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-black overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-5 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            What This Service Provides
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            Most businesses already own valuable knowledge, but it is scattered across
            folders, inboxes, PDFs, spreadsheets, drives, and employee memory. This
            service turns that scattered knowledge into a{' '}
            <span className="text-white">private AI assistant</span> your team can
            actually use.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative h-full p-7 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 hover:bg-white/[0.07] transition-all duration-300"
              >
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
