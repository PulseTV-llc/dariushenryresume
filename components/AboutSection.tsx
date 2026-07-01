'use client';

import { motion } from 'framer-motion';
import { Code2, Workflow, Film, Server, Settings, LayoutDashboard } from 'lucide-react';

const expertise = [
  { icon: Code2, label: 'App development' },
  { icon: Workflow, label: 'Workflow design' },
  { icon: Film, label: 'Video & media production' },
  { icon: Server, label: 'Private AI systems' },
  { icon: Settings, label: 'Business automation' },
  { icon: LayoutDashboard, label: 'Custom client-facing & internal tools' },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-black overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-5 gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-5">
              <span className="text-xs uppercase tracking-wider text-gray-300">
                About Darius Henry
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Filmmaker. App developer. Business systems builder.
            </h2>
            <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
              <p>
                Darius Henry helps companies combine creative strategy, software
                development, and private AI workflows. His background in video
                production, app development, automation, and business planning allows him
                to build AI systems that are practical, visual, and usable for real
                companies.
              </p>
              <p>
                The work is hands-on. Every Private AI Workflow System is designed
                around the documents, customers, staff, and operations of a specific
                business — not a generic SaaS template.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="text-xs uppercase tracking-wider text-gray-400 mb-4">
                Areas of focus
              </div>
              <ul className="space-y-3">
                {expertise.map((e) => {
                  const Icon = e.icon;
                  return (
                    <li key={e.label} className="flex items-center gap-3">
                      <span className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 text-cyan-300" />
                      </span>
                      <span className="text-sm text-gray-200">{e.label}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
