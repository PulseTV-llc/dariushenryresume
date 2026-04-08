"use client";

import { motion } from "framer-motion";
import { Check, Sparkles, Zap, Rocket, Crown } from "lucide-react";

const services = [
  {
    tier: "7-Day MVP",
    icon: Zap,
    description: "You need to validate your idea FAST without wasting months on development",
    color: "from-blue-500 to-cyan-500",
    problem: "Got an idea but need proof it works before investing big money?",
    features: [
      "⚡ FAST DELIVERY: 7 days or less",
      "Working iOS or web app",
      "Basic user authentication",
      "Core feature implementation",
      "Database setup & hosting",
      "Ready to show investors/users",
      "💰 REVENUE-READY: Can take payments",
      "🔥 LIMITED: 2 spots this month"
    ],
    examples: "\"I'll build your SaaS MVP in a week so you can start getting users NOW\""
  },
  {
    tier: "Revenue-Ready App",
    icon: Rocket,
    description: "You need an app that makes money NOW, not 6 months from now",
    color: "from-purple-500 to-pink-500",
    popular: true,
    problem: "Tired of agencies that take forever and deliver broken apps?",
    features: [
      "⚡ FAST: 1-2 months, not 6-12",
      "Full iOS/web app with payments",
      "Stripe/PayPal integration",
      "User accounts & authentication",
      "Admin dashboard for management",
      "Analytics & metrics tracking",
      "💰 START MAKING MONEY DAY 1",
      "Cloud hosting & deployment",
      "30 days premium support",
      "🔥 MOST POPULAR TIER"
    ],
    examples: "\"Like BackendSplit - calculator suite making money in 6 weeks\""
  },
  {
    tier: "Production SaaS",
    icon: Crown,
    description: "You need a Zonely/Speakix level platform that crushes competitors",
    color: "from-orange-500 to-red-500",
    problem: "Want a SaaS that actually competes with the big players?",
    features: [
      "⚡ FAST: 90 days, not 12 months",
      "Multi-platform (iOS + Web + macOS)",
      "AI integration (OpenAI, custom models)",
      "Full subscription system (Stripe)",
      "Multi-tenant architecture",
      "Real-time features & websockets",
      "Admin dashboards & analytics",
      "💰 REVENUE-READY SUBSCRIPTIONS",
      "Scalable cloud infrastructure",
      "90 days premium support",
      "🔥 FLAGSHIP QUALITY",
      "Reference my live apps - that's what you get"
    ],
    examples: "\"I built Zonely (real estate SaaS) in 90 days. Yours is next.\""
  },
  {
    tier: "Fix Your Broken App",
    icon: Sparkles,
    description: "Your agency disappeared or delivered garbage. I'll fix it FAST.",
    color: "from-emerald-500 to-teal-500",
    problem: "Stuck with a broken app that doesn't work? Agency ghosted you?",
    features: [
      "⚡ RESCUE MISSION: Fix fast",
      "Audit existing codebase",
      "Fix critical bugs & crashes",
      "Complete unfinished features",
      "Get your app live on App Store",
      "Refactor terrible code",
      "Add missing payment integration",
      "💰 GET TO REVENUE FAST",
      "Deploy to production",
      "Train you on the system",
      "🔥 EMERGENCY SERVICE AVAILABLE",
      "Stop bleeding money on a broken app"
    ],
    examples: "\"I've rescued 5+ broken projects this year. Yours is next.\""
  }
];

const technologies = [
  { name: "React & Next.js", category: "Frontend" },
  { name: "TypeScript", category: "Languages" },
  { name: "Node.js & Python", category: "Backend" },
  { name: "PostgreSQL & MongoDB", category: "Database" },
  { name: "AWS & Vercel", category: "Cloud" },
  { name: "OpenAI & AI/ML", category: "AI" },
  { name: "Stripe & PayPal", category: "Payments" },
  { name: "React Native", category: "Mobile" }
];

export default function Services() {
  return (
    <section id="services" className="py-20 px-6 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            HOW I CAN HELP YOU
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto font-medium">
            Stop wasting time with slow agencies. Get your app built <span className="text-green-400 font-bold">fast</span>, get it <span className="text-cyan-400 font-bold">revenue-ready</span>, get it <span className="text-purple-400 font-bold">making money</span>.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.tier}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative group ${
                  service.popular ? 'lg:scale-105 lg:-mt-4' : ''
                }`}
              >
                {service.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                )}

                <div className={`h-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:bg-white/10 hover:border-white/20 ${
                  service.popular ? 'border-purple-500/50' : ''
                }`}>
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Tier Name */}
                  <h3 className="text-2xl font-bold mb-4">{service.tier}</h3>

                  {/* Problem statement */}
                  {service.problem && (
                    <p className="text-red-400 text-sm font-semibold mb-3 italic">
                      {service.problem}
                    </p>
                  )}

                  <p className="text-gray-300 text-sm mb-6 font-medium">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Examples */}
                  <div className="pt-4 border-t border-white/10">
                    <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider">What You Get:</p>
                    <p className="text-xs text-green-400 font-medium italic">{service.examples}</p>
                  </div>

                  {/* CTA Button */}
                  <motion.a
                    href="#contact"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full mt-6 py-3 px-6 rounded-xl font-semibold transition-all flex items-center justify-center ${
                      service.popular
                        ? `bg-gradient-to-r ${service.color} text-white`
                        : 'bg-white/5 hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    Get Custom Quote →
                  </motion.a>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Technologies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-xl font-semibold mb-6 text-gray-300">
            Technology Stack
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {technologies.map((tech) => (
              <div
                key={tech.name}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg px-4 py-2 hover:bg-white/10 transition-all"
              >
                <span className="text-sm text-gray-300">{tech.name}</span>
                <span className="text-xs text-gray-500 ml-2">· {tech.category}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Process/Guarantee Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 grid md:grid-cols-3 gap-6"
        >
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-purple-500 mb-2">27+</div>
            <div className="text-sm text-gray-400">Production Applications Shipped</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-blue-500 mb-2">6+</div>
            <div className="text-sm text-gray-400">Active SaaS Platforms</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-green-500 mb-2">3+</div>
            <div className="text-sm text-gray-400">AI-Powered Solutions</div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-gray-300 mb-2 text-lg font-medium">
            Not sure which one you need?
          </p>
          <p className="text-gray-400 mb-6">
            Tell me your problem. I'll tell you how fast I can fix it.
          </p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-10 py-5 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-green-500/50 transition-all"
          >
            Tell Me Your Problem →
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
