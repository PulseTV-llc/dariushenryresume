'use client';

import { motion } from 'framer-motion';
import { Sparkles, Zap, Rocket, ChevronRight } from 'lucide-react';
import { projects } from '@/data/projects';
import { useState } from 'react';

const categoryColors: Record<string, string> = {
  'SaaS Platform': 'from-cyan-500 to-blue-500',
  'EdTech SaaS': 'from-purple-500 to-pink-500',
  'Professional Tools': 'from-orange-500 to-red-500',
  'Media Platform': 'from-green-500 to-emerald-500',
  'Talent Management': 'from-indigo-500 to-purple-500',
  'EdTech Web App': 'from-fuchsia-500 to-purple-500',
  'Business Website': 'from-blue-500 to-cyan-500',
  'Portfolio Platform': 'from-pink-500 to-rose-500',
  'Business Tools': 'from-amber-500 to-orange-500',
  'Health & Wellness': 'from-teal-500 to-cyan-500',
  'Media Tools': 'from-violet-500 to-purple-500',
  'Automation Tool': 'from-lime-500 to-green-500',
};

const statusIcons = {
  'Production': Rocket,
  'Active Development': Zap,
  'Beta': Sparkles,
};

export default function Projects() {
  const [showAll, setShowAll] = useState(false);

  // Show only tier 1 & 2 projects by default
  const displayedProjects = showAll ? projects : projects.filter(p => p.tier <= 2);

  return (
    <section id="proof" className="relative py-32 px-4 sm:px-6 lg:px-8 bg-black">
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
            <span className="gradient-text">PROOF: RECENT WINS</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Real problems I solved. Real apps making money. <span className="text-green-400 font-bold">This could be your project next.</span>
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {displayedProjects.map((project, index) => {
            const StatusIcon = statusIcons[project.status];
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group relative"
              >
                <div className="relative h-full p-8 rounded-2xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10 backdrop-blur-sm hover:border-green-500/50 transition-all duration-300">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-gradient-to-br ${categoryColors[project.category]}`}>
                        <StatusIcon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                        <p className="text-sm text-gray-500">{project.tagline}</p>
                      </div>
                    </div>
                    {project.tier === 1 && (
                      <span className="px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-xs font-bold text-yellow-400">
                        FLAGSHIP
                      </span>
                    )}
                  </div>

                  {/* Before/After Story */}
                  {project.problem && (
                    <div className="space-y-5 mb-6">
                      {/* THE PROBLEM */}
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-2xl">🏢</span>
                          <h4 className="text-sm font-bold text-red-400 uppercase tracking-wide">The Problem</h4>
                        </div>
                        <p className="text-sm text-gray-300 leading-relaxed">{project.problem}</p>
                      </div>

                      {/* WHAT I BUILT */}
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-2xl">⚡</span>
                          <h4 className="text-sm font-bold text-cyan-400 uppercase tracking-wide">What I Built</h4>
                        </div>
                        <p className="text-sm text-gray-300 leading-relaxed">{project.solution}</p>
                      </div>

                      {/* THE OUTCOME */}
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-2xl">💰</span>
                          <h4 className="text-sm font-bold text-green-400 uppercase tracking-wide">The Outcome</h4>
                        </div>
                        <p className="text-sm text-gray-300 leading-relaxed font-medium">{project.outcome}</p>
                      </div>
                    </div>
                  )}

                  {/* Tech Stack */}
                  <div className="pt-5 border-t border-white/10">
                    <p className="text-xs text-gray-500 mb-2 uppercase tracking-wider">Tech Stack:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.slice(0, 5).map((tech, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 rounded bg-white/5 text-xs text-gray-400 font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 5 && (
                        <span className="px-2 py-1 text-xs text-gray-500">
                          +{project.technologies.length - 5} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Hover glow */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-green-500/0 to-emerald-500/0 group-hover:from-green-500/10 group-hover:to-emerald-500/10 transition-all duration-300 pointer-events-none" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View More Button */}
        {!showAll && projects.length > displayedProjects.length && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <button
              onClick={() => setShowAll(true)}
              className="group inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 text-cyan-400 font-medium hover:from-cyan-500/20 hover:to-blue-500/20 hover:border-cyan-500/40 transition-all duration-300"
            >
              View All Projects
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        )}

        {/* Project count */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <p className="text-sm text-gray-500">
            Showing <span className="text-cyan-400 font-semibold">{displayedProjects.length}</span> of{' '}
            <span className="text-cyan-400 font-semibold">{projects.length}</span> projects
          </p>
        </motion.div>
      </div>
    </section>
  );
}
