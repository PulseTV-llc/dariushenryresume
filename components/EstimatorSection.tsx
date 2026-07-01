'use client';

import { motion } from 'framer-motion';
import IntakeEstimator from './IntakeEstimator';

export default function EstimatorSection() {
  return (
    <section
      id="estimate"
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-black overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-5 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Build Your AI System Estimate
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            Answer a few business questions and get a planning estimate for your private
            AI workflow system — including a recommended tier, Mac Studio node count,
            Mac Studio configuration, services setup range, hardware estimate, and monthly
            support estimate.
          </p>
        </motion.div>

        <IntakeEstimator />
      </div>
    </section>
  );
}
