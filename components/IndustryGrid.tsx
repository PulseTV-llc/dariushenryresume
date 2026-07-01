'use client';

import { motion } from 'framer-motion';
import {
  Building,
  Scale,
  Stethoscope,
  Utensils,
  HardHat,
  Sparkles,
  Film,
  KeyRound,
  Wrench,
  ShieldHalf,
} from 'lucide-react';

const industries = [
  {
    icon: Building,
    title: 'Real Estate Companies',
    description:
      'Upload leases, inspection reports, property notes, contracts, pricing sheets, and market research. Summarize deals, compare documents, draft listing descriptions, and answer internal questions.',
    color: 'from-cyan-400 to-blue-500',
  },
  {
    icon: Scale,
    title: 'Law Offices',
    description:
      'Search client files, summarize case documents, draft intake responses, organize research, and find policy or procedural information faster.',
    color: 'from-blue-400 to-indigo-500',
  },
  {
    icon: Stethoscope,
    title: 'Medical & Dental Offices',
    description:
      'Create staff training assistants, internal FAQ systems, patient communication templates, and procedure lookup workflows.',
    color: 'from-emerald-400 to-teal-500',
  },
  {
    icon: Utensils,
    title: 'Restaurants & Franchises',
    description:
      'Use AI for SOPs, staff training, menu information, social media drafts, policy lookup, onboarding, and operations support.',
    color: 'from-orange-400 to-red-500',
  },
  {
    icon: HardHat,
    title: 'Construction Companies',
    description:
      'Pull from job specs, change orders, safety policies, and subcontractor agreements. Generate punch lists, summarize bids, and answer field questions.',
    color: 'from-amber-400 to-orange-500',
  },
  {
    icon: Sparkles,
    title: 'Cleaning Companies',
    description:
      'Standardize service checklists, client instructions, and training material. Draft scheduling messages and client follow-ups in seconds.',
    color: 'from-teal-400 to-cyan-500',
  },
  {
    icon: Film,
    title: 'Film & Media Companies',
    description:
      'Search scripts, production notes, treatments, contracts, and crew documents. Generate breakdowns, summaries, and client-facing drafts.',
    color: 'from-fuchsia-400 to-purple-500',
  },
  {
    icon: KeyRound,
    title: 'Property Management',
    description:
      'Search tenant files, lease terms, maintenance histories, and vendor agreements. Draft notices, renewals, and policy lookups for staff.',
    color: 'from-indigo-400 to-purple-500',
  },
  {
    icon: Wrench,
    title: 'Local Service Businesses',
    description:
      'Centralize pricing sheets, service procedures, FAQs, and customer history. Draft estimates, follow-ups, and review responses on demand.',
    color: 'from-lime-400 to-emerald-500',
  },
  {
    icon: ShieldHalf,
    title: 'Insurance Agencies',
    description:
      'Search policies, endorsements, claim history, and underwriting notes. Summarize coverage, draft client communications, and speed up renewals.',
    color: 'from-sky-400 to-blue-500',
  },
];

export default function IndustryGrid() {
  return (
    <section
      id="industries"
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-black overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-5 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Industries Served
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            Private AI workflow systems are built around the documents, customers,
            policies, and operations of your specific industry.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {industries.map((industry, index) => {
            const Icon = industry.icon;
            return (
              <motion.div
                key={industry.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group h-full p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 hover:bg-white/[0.07] transition-all duration-300"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${industry.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-white">{industry.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {industry.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
