"use client";

import { motion } from "framer-motion";
import { Check, Sparkles, Zap, Rocket, Crown } from "lucide-react";

const services = [
  {
    tier: "Starter",
    icon: Zap,
    price: "$5K - $15K",
    timeline: "2-4 weeks",
    description: "Perfect for launching your digital presence with professional quality",
    color: "from-blue-500 to-cyan-500",
    features: [
      "Modern responsive website",
      "SEO optimization",
      "Contact forms & integrations",
      "Mobile-first design",
      "Content management setup",
      "2 weeks post-launch support",
      "Performance optimization",
      "Analytics integration"
    ],
    examples: "Portfolios, Business Sites, Landing Pages"
  },
  {
    tier: "Professional",
    icon: Rocket,
    price: "$15K - $50K",
    timeline: "1-3 months",
    description: "Custom applications built to solve real business problems",
    color: "from-purple-500 to-pink-500",
    popular: true,
    features: [
      "Full-stack web/mobile application",
      "Custom database architecture",
      "User authentication & authorization",
      "Payment gateway integration",
      "RESTful API development",
      "Admin dashboard & analytics",
      "30 days post-launch support",
      "Cloud deployment (AWS/Vercel)",
      "Performance monitoring",
      "Security best practices"
    ],
    examples: "E-commerce Platforms, Booking Systems, Internal Tools"
  },
  {
    tier: "Enterprise SaaS",
    icon: Crown,
    price: "$50K - $150K+",
    timeline: "3-6 months",
    description: "Production-grade SaaS platforms like Zonely, Speakix, and TapeCoach",
    color: "from-orange-500 to-red-500",
    features: [
      "Multi-tenant SaaS architecture",
      "AI/ML integration (OpenAI, Custom Models)",
      "Real-time features & websockets",
      "Advanced analytics & reporting",
      "Subscription & billing management",
      "Role-based access control",
      "Scalable microservices architecture",
      "CI/CD pipeline setup",
      "90 days premium support",
      "Load testing & optimization",
      "Comprehensive documentation",
      "Team training sessions"
    ],
    examples: "Zonely (Real Estate AI), Speakix (Language Learning), TapeCoach (AI Audition Analysis)"
  },
  {
    tier: "Custom Enterprise",
    icon: Sparkles,
    price: "Let's Talk",
    timeline: "3-12 months",
    description: "Complex systems requiring discovery, research, and ongoing partnership",
    color: "from-emerald-500 to-teal-500",
    features: [
      "Discovery & architecture planning",
      "Custom technology stack",
      "Third-party integrations",
      "Migration from legacy systems",
      "White-label solutions",
      "Dedicated development team",
      "Agile development methodology",
      "Regular stakeholder reviews",
      "Ongoing maintenance & updates",
      "24/7 priority support options",
      "Custom SLA agreements",
      "Technology consulting"
    ],
    examples: "Enterprise Platforms, FinTech Solutions, HealthTech Systems"
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
            Services & Investment
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            From rapid prototypes to enterprise SaaS platforms - scalable solutions built with production-grade architecture
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
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
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

                  {/* Tier & Price */}
                  <h3 className="text-2xl font-bold mb-2">{service.tier}</h3>
                  <div className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-1">
                    {service.price}
                  </div>
                  <div className="text-sm text-gray-400 mb-4">{service.timeline}</div>

                  <p className="text-gray-400 text-sm mb-6 min-h-[60px]">
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
                    <p className="text-xs text-gray-500 mb-1">Perfect for:</p>
                    <p className="text-xs text-gray-400">{service.examples}</p>
                  </div>

                  {/* CTA Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full mt-6 py-3 px-6 rounded-xl font-semibold transition-all ${
                      service.popular
                        ? `bg-gradient-to-r ${service.color} text-white`
                        : 'bg-white/5 hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    Get Started
                  </motion.button>
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
          <p className="text-gray-400 mb-4">
            Not sure which tier fits your needs?
          </p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl font-semibold text-lg"
          >
            Schedule a Free Consultation
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
