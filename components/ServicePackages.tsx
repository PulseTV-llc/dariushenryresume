'use client';

import { motion } from 'framer-motion';
import {
  Bot,
  FolderSearch,
  Workflow,
  Server,
  LayoutDashboard,
  RefreshCw,
} from 'lucide-react';

const packages = [
  {
    icon: Bot,
    title: 'Private AI Assistant',
    description:
      "A company-specific assistant trained around business documents, policies, services, and workflows.",
    color: 'from-cyan-400 to-blue-500',
  },
  {
    icon: FolderSearch,
    title: 'Document Intelligence System',
    description:
      'Upload and search PDFs, contracts, invoices, reports, spreadsheets, SOPs, training material, and scanned files.',
    color: 'from-purple-400 to-pink-500',
  },
  {
    icon: Workflow,
    title: 'Staff Workflow Automation',
    description:
      'Generate drafts, checklists, summaries, responses, internal answers, and repeatable workflows for employees.',
    color: 'from-orange-400 to-red-500',
  },
  {
    icon: Server,
    title: 'Custom Windows AI Node Deployment',
    description:
      'Plan and deploy custom Windows AI nodes built around NVIDIA GPUs (RTX 4090 through H100 / H200) sized to team count, usage, privacy needs, and workload.',
    color: 'from-emerald-400 to-teal-500',
  },
  {
    icon: LayoutDashboard,
    title: 'Custom Dashboard',
    description:
      'Optional web dashboard for employees, admins, document upload, AI chat, user permissions, and workflow management.',
    color: 'from-indigo-400 to-purple-500',
  },
  {
    icon: RefreshCw,
    title: 'Monthly Optimization',
    description:
      'Ongoing prompt refinement, document refreshes, staff support, workflow expansion, and system monitoring.',
    color: 'from-amber-400 to-orange-500',
  },
];

export default function ServicePackages() {
  return (
    <section
      id="services"
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-black overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-5 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            What We Build
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            Each engagement assembles the right combination of private AI infrastructure,
            assistant tuning, automation, and dashboards for your business.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {packages.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group h-full p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 hover:bg-white/[0.07] transition-all duration-300"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${p.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{p.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{p.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
