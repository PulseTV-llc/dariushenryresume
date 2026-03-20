'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Sparkles, Zap, Rocket } from 'lucide-react';
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
  const [filter, setFilter] = useState<'all' | 'tier1' | 'tier2'>('all');

  const filteredProjects = projects.filter(project => {
    if (filter === 'all') return true;
    if (filter === 'tier1') return project.tier === 1;
    if (filter === 'tier2') return project.tier <= 2;
    return true;
  });

  return (
    <section id="projects" className="relative py-32 px-4 sm:px-6 lg:px-8 bg-black">
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
            <span className="gradient-text">Featured Projects</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            Production-ready SaaS applications showcasing full-stack development, AI integration, and modern architecture
          </p>

          {/* Filter buttons */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setFilter('all')}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
                filter === 'all'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                  : 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10'
              }`}
            >
              All Projects
            </button>
            <button
              onClick={() => setFilter('tier1')}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
                filter === 'tier1'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                  : 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10'
              }`}
            >
              Flagship
            </button>
            <button
              onClick={() => setFilter('tier2')}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
                filter === 'tier2'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                  : 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10'
              }`}
            >
              Major Apps
            </button>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => {
            const StatusIcon = statusIcons[project.status];
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="relative h-full p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all duration-500 hover:scale-[1.02]">
                  {/* Tier badge */}
                  {project.tier === 1 && (
                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30">
                      <span className="text-xs font-bold text-yellow-400">FLAGSHIP</span>
                    </div>
                  )}

                  {/* Category badge */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`px-4 py-1 rounded-full bg-gradient-to-r ${categoryColors[project.category]} text-white text-sm font-medium`}>
                      {project.category}
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                      <StatusIcon className="w-3 h-3" />
                      <span className="text-xs text-gray-400">{project.status}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-3xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    {project.title}
                  </h3>

                  {/* Tagline */}
                  <p className="text-lg text-cyan-400 mb-4 font-medium">
                    {project.tagline}
                  </p>

                  {/* Description */}
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Key features */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-300 mb-3">Key Features:</h4>
                    <ul className="space-y-2">
                      {project.features.slice(0, 4).map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                          <span className="text-cyan-400 mt-1">▸</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-300 mb-3">Tech Stack:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Metrics */}
                  {project.metrics && (
                    <div className="flex flex-wrap gap-4 pt-4 border-t border-white/10">
                      {project.metrics.map((metric, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm">
                          <Zap className="w-4 h-4 text-cyan-400" />
                          <span className="text-gray-300">{metric}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Hover effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/5 group-hover:to-blue-500/5 transition-all duration-500 pointer-events-none" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Project count */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-gray-400">
            Showing <span className="text-cyan-400 font-semibold">{filteredProjects.length}</span> of{' '}
            <span className="text-cyan-400 font-semibold">{projects.length}</span> projects
          </p>
        </motion.div>
      </div>
    </section>
  );
}
