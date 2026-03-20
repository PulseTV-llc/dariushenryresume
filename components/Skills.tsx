'use client';

import { motion } from 'framer-motion';
import { Code, Smartphone, Server, Database, Cloud, Cpu, Layers, Zap } from 'lucide-react';

const skillCategories = [
  {
    title: 'Frontend Development',
    icon: Code,
    color: 'from-cyan-500 to-blue-500',
    skills: [
      { name: 'React 19', level: 95 },
      { name: 'Next.js 14-16', level: 95 },
      { name: 'TypeScript', level: 90 },
      { name: 'Tailwind CSS', level: 95 },
      { name: 'Framer Motion', level: 85 },
      { name: 'Vue.js', level: 80 },
    ]
  },
  {
    title: 'Mobile Development',
    icon: Smartphone,
    color: 'from-purple-500 to-pink-500',
    skills: [
      { name: 'SwiftUI', level: 95 },
      { name: 'iOS Development', level: 95 },
      { name: 'AVFoundation', level: 90 },
      { name: 'Vision Framework', level: 85 },
      { name: 'Core Image', level: 85 },
      { name: 'StoreKit 2', level: 90 },
    ]
  },
  {
    title: 'Backend Development',
    icon: Server,
    color: 'from-orange-500 to-red-500',
    skills: [
      { name: 'Node.js', level: 90 },
      { name: 'Express.js', level: 90 },
      { name: 'Firebase Functions', level: 85 },
      { name: 'RESTful APIs', level: 95 },
      { name: 'Python', level: 80 },
      { name: 'Web Scraping', level: 85 },
    ]
  },
  {
    title: 'Database & Storage',
    icon: Database,
    color: 'from-green-500 to-emerald-500',
    skills: [
      { name: 'Firebase Firestore', level: 95 },
      { name: 'MongoDB', level: 85 },
      { name: 'Firebase Storage', level: 90 },
      { name: 'Security Rules', level: 90 },
      { name: 'Data Modeling', level: 90 },
    ]
  },
  {
    title: 'Cloud & DevOps',
    icon: Cloud,
    color: 'from-blue-500 to-cyan-500',
    skills: [
      { name: 'Vercel', level: 90 },
      { name: 'Firebase', level: 95 },
      { name: 'Git/GitHub', level: 95 },
      { name: 'CI/CD', level: 85 },
      { name: 'Environment Config', level: 90 },
    ]
  },
  {
    title: 'AI & Machine Learning',
    icon: Cpu,
    color: 'from-fuchsia-500 to-purple-500',
    skills: [
      { name: 'OpenAI GPT-4', level: 90 },
      { name: 'GPT-4 Vision', level: 85 },
      { name: 'Speech Recognition', level: 85 },
      { name: 'Computer Vision', level: 85 },
      { name: 'AI Integration', level: 90 },
    ]
  },
  {
    title: 'Payment & Auth',
    icon: Layers,
    color: 'from-amber-500 to-orange-500',
    skills: [
      { name: 'Stripe', level: 90 },
      { name: 'StoreKit 2', level: 90 },
      { name: 'Firebase Auth', level: 95 },
      { name: 'JWT', level: 85 },
      { name: 'OAuth', level: 85 },
    ]
  },
  {
    title: 'Architecture & Design',
    icon: Zap,
    color: 'from-pink-500 to-rose-500',
    skills: [
      { name: 'SaaS Architecture', level: 90 },
      { name: 'Freemium Models', level: 90 },
      { name: 'Subscription Systems', level: 95 },
      { name: 'UI/UX Design', level: 85 },
      { name: 'Performance Optimization', level: 85 },
    ]
  },
];

const highlights = [
  { number: '27+', label: 'Production Applications', color: 'text-cyan-400' },
  { number: '6+', label: 'SaaS Platforms Built', color: 'text-purple-400' },
  { number: '3+', label: 'AI Integrations', color: 'text-blue-400' },
  { number: '15+', label: 'Technologies Mastered', color: 'text-green-400' },
];

export default function Skills() {
  return (
    <section id="skills" className="relative py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-900">
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
            <span className="gradient-text">Technical Expertise</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Full-stack mastery across modern web, mobile, AI, and cloud technologies
          </p>
        </motion.div>

        {/* Highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {highlights.map((highlight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
            >
              <div className={`text-4xl md:text-5xl font-bold ${highlight.color} mb-2`}>
                {highlight.number}
              </div>
              <div className="text-sm text-gray-400">{highlight.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, categoryIndex) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={categoryIndex}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                className="group relative"
              >
                <div className="h-full p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all duration-500">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Category title */}
                  <h3 className="text-xl font-bold text-white mb-4">
                    {category.title}
                  </h3>

                  {/* Skills list */}
                  <div className="space-y-3">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skillIndex}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-gray-300">{skill.name}</span>
                          <span className="text-xs text-gray-500">{skill.level}%</span>
                        </div>
                        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
                            className={`h-full bg-gradient-to-r ${category.color} rounded-full`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-gray-400 mb-6">
            Ready to build something amazing together?
          </p>
          <a
            href="#contact"
            className="inline-block px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105"
          >
            Let's Talk
          </a>
        </motion.div>
      </div>
    </section>
  );
}
