'use client';

import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, ArrowUpRight } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="relative py-32 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Tell Me Your Problem.</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-medium">
            I'll tell you how fast I can fix it <span className="text-green-400">(and how much it costs)</span>
          </p>
        </motion.div>

        {/* Simplified Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <form className="space-y-6 p-8 rounded-2xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10 backdrop-blur-sm">
            {/* Name & Email Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 transition-all outline-none"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 transition-all outline-none"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            {/* Problem Description */}
            <div>
              <label htmlFor="problem" className="block text-sm font-medium text-gray-300 mb-2">
                What problem are you trying to solve? <span className="text-red-400">*</span>
              </label>
              <textarea
                id="problem"
                name="problem"
                required
                rows={6}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 transition-all outline-none resize-none"
                placeholder="Example: I need a real estate app that helps investors find deals fast. My current agency has been working for 8 months and delivered nothing..."
              />
            </div>

            {/* Timeline & Budget Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="timeline" className="block text-sm font-medium text-gray-300 mb-2">
                  When do you need this?
                </label>
                <select
                  id="timeline"
                  name="timeline"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 transition-all outline-none"
                >
                  <option value="" className="bg-gray-900">Select timeline...</option>
                  <option value="asap" className="bg-gray-900">⚡ ASAP (1-2 weeks)</option>
                  <option value="1month" className="bg-gray-900">1 month</option>
                  <option value="3months" className="bg-gray-900">3 months</option>
                  <option value="6months" className="bg-gray-900">6 months</option>
                  <option value="flexible" className="bg-gray-900">Flexible</option>
                </select>
              </div>
              <div>
                <label htmlFor="budget" className="block text-sm font-medium text-gray-300 mb-2">
                  Budget Range
                </label>
                <select
                  id="budget"
                  name="budget"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 transition-all outline-none"
                >
                  <option value="" className="bg-gray-900">Select budget...</option>
                  <option value="3-9k" className="bg-gray-900">$3K - $9K (7-Day MVP)</option>
                  <option value="9-30k" className="bg-gray-900">$9K - $30K (Revenue-Ready)</option>
                  <option value="30k+" className="bg-gray-900">$30K+ (Production SaaS)</option>
                  <option value="unsure" className="bg-gray-900">Not sure yet</option>
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 px-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold text-lg rounded-xl hover:shadow-2xl hover:shadow-green-500/50 transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              Get Your Solution Plan (Free)
              <ArrowUpRight className="w-5 h-5" />
            </button>

            <p className="text-xs text-gray-500 text-center">
              I'll get back to you within 24 hours with a project plan and timeline
            </p>
          </form>
        </motion.div>

        {/* Contact Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-20"
        >
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-white text-center mb-8">
              Or reach out directly
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a
                href="mailto:darius.henry@gmail.com"
                className="group flex flex-col items-center gap-3 p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-400 mb-1">Email</div>
                  <div className="text-white font-medium text-sm">darius.henry@gmail.com</div>
                </div>
              </a>

              <a
                href="https://www.linkedin.com/in/darius-henry-292b21373/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-3 p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                  <Linkedin className="w-6 h-6 text-white" />
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-400 mb-1">LinkedIn</div>
                  <div className="text-white font-medium text-sm">Darius Henry</div>
                </div>
              </a>

              <a
                href="https://github.com/PulseTV-llc"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-3 p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                  <Github className="w-6 h-6 text-white" />
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-400 mb-1">GitHub</div>
                  <div className="text-white font-medium text-sm">@PulseTV-llc</div>
                </div>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-20 pt-12 border-t border-white/10"
        >
          <p className="text-gray-400">
            © {new Date().getFullYear()} Darius Henry. Built with Next.js, TypeScript, and Tailwind CSS.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
