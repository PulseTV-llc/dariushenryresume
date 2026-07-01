'use client';

import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';

const prompts = [
  'Summarize this contract in plain English.',
  'What does our refund policy say?',
  'Find the training instructions for new staff.',
  'Draft a response to this customer complaint.',
  'Create a checklist from this SOP.',
  'Compare these two property reports.',
  'Turn this invoice batch into a summary.',
  'What are the key deadlines in this document?',
  'Write a follow-up email for this lead.',
  'Create a social media post from this menu item.',
];

export default function ExamplePrompts() {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-black overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14 max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-5 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            What Businesses Can Ask The AI
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            Practical, plain-English questions your team can ask once your documents,
            policies, and procedures live inside the system.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {prompts.map((prompt, i) => (
            <motion.div
              key={prompt}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="group flex items-center gap-4 p-5 rounded-xl bg-black/60 border border-white/10 hover:border-cyan-500/30 hover:bg-black/80 transition-all duration-300 font-mono"
            >
              <span className="flex-shrink-0 w-9 h-9 rounded-md bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-cyan-500/40 transition-colors">
                <Terminal className="w-4 h-4 text-cyan-300" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-[10px] uppercase tracking-wider text-gray-500 mb-1">
                  prompt
                </div>
                <div className="text-sm md:text-base text-gray-200 leading-snug">
                  <span className="text-cyan-300 mr-1">›</span>
                  {prompt}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
