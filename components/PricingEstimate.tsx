'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, Calendar, DollarSign, Zap, ArrowRight } from 'lucide-react';

interface QuestionnaireData {
  name: string;
  email: string;
  projectType: string;
  currentSituation: string;
  timeline: string;
  budget: string;
  features: string[];
  designNeeds: string;
  techPreferences: string;
  description: string;
}

interface PricingEstimateProps {
  answers: QuestionnaireData;
}

export default function PricingEstimate({ answers }: PricingEstimateProps) {
  // Calculate pricing based on answers
  const calculatePricing = () => {
    let minPrice = 5000;
    let maxPrice = 10000;
    let estimatedTimeline = '1-2 months';
    let recommendedTier = 'Starter';

    // Base price by project type
    const projectTypeMultipliers: Record<string, { min: number; max: number }> = {
      website: { min: 5000, max: 15000 },
      'mobile-app': { min: 15000, max: 40000 },
      'web-app': { min: 15000, max: 50000 },
      ecommerce: { min: 10000, max: 30000 },
      saas: { min: 30000, max: 100000 },
      api: { min: 8000, max: 25000 },
      other: { min: 10000, max: 30000 },
    };

    const basePrice = projectTypeMultipliers[answers.projectType] || { min: 10000, max: 30000 };
    minPrice = basePrice.min;
    maxPrice = basePrice.max;

    // Adjust for current situation
    if (answers.currentSituation === 'redesign') {
      minPrice *= 0.8;
      maxPrice *= 0.8;
    } else if (answers.currentSituation === 'features') {
      minPrice *= 0.6;
      maxPrice *= 0.6;
    } else if (answers.currentSituation === 'fix') {
      minPrice = 2000;
      maxPrice = 10000;
    }

    // Adjust for timeline (rush = higher cost)
    if (answers.timeline === 'asap') {
      minPrice *= 1.3;
      maxPrice *= 1.3;
      estimatedTimeline = '2-4 weeks';
    } else if (answers.timeline === '1-3') {
      estimatedTimeline = '1-3 months';
    } else if (answers.timeline === '3-6') {
      estimatedTimeline = '3-6 months';
      minPrice *= 0.95;
      maxPrice *= 0.95;
    } else if (answers.timeline === '6+') {
      estimatedTimeline = '6+ months';
      minPrice *= 0.9;
      maxPrice *= 0.9;
    }

    // Adjust for features
    const featureCount = answers.features?.length || 0;
    if (featureCount > 5) {
      minPrice *= 1.4;
      maxPrice *= 1.4;
    } else if (featureCount > 3) {
      minPrice *= 1.2;
      maxPrice *= 1.2;
    }

    // Add design costs
    if (answers.designNeeds === 'full-design') {
      minPrice += 5000;
      maxPrice += 15000;
    } else if (answers.designNeeds === 'wireframes') {
      minPrice += 2000;
      maxPrice += 5000;
    }

    // Determine recommended tier
    if (maxPrice >= 50000) {
      recommendedTier = 'Enterprise SaaS';
    } else if (maxPrice >= 30000) {
      recommendedTier = 'Professional';
    } else if (maxPrice >= 15000) {
      recommendedTier = 'Professional';
    } else {
      recommendedTier = 'Starter';
    }

    return {
      min: Math.round(minPrice / 1000) * 1000, // Round to nearest 1000
      max: Math.round(maxPrice / 1000) * 1000,
      timeline: estimatedTimeline,
      tier: recommendedTier,
    };
  };

  const estimate = calculatePricing();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Success Animation */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', duration: 0.5 }}
        className="mb-8 text-center"
      >
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 mb-6">
          <CheckCircle2 className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Thank you, {answers.name}!
        </h2>
        <p className="text-xl text-gray-400">
          Based on your requirements, here's your estimated investment
        </p>
      </motion.div>

      {/* Pricing Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-8 md:p-12 mb-8"
      >
        {/* Price Range */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-3">
            <DollarSign className="w-6 h-6 text-cyan-400" />
            <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">
              Estimated Investment
            </span>
          </div>
          <div className="text-5xl md:text-6xl font-bold gradient-text mb-2">
            {formatPrice(estimate.min)} - {formatPrice(estimate.max)}
          </div>
          <p className="text-gray-400">Based on your project requirements</p>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Timeline */}
          <div className="flex items-center gap-4 p-6 bg-white/5 rounded-xl border border-white/10">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-sm text-gray-400">Estimated Timeline</div>
              <div className="text-white font-semibold text-lg">{estimate.timeline}</div>
            </div>
          </div>

          {/* Recommended Tier */}
          <div className="flex items-center gap-4 p-6 bg-white/5 rounded-xl border border-white/10">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-sm text-gray-400">Recommended Tier</div>
              <div className="text-white font-semibold text-lg">{estimate.tier}</div>
            </div>
          </div>
        </div>

        {/* What's Included */}
        <div className="border-t border-white/10 pt-8">
          <h3 className="text-xl font-bold text-white mb-4">What's Included:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex items-center gap-2 text-gray-300">
              <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span>Custom {answers.projectType.replace('-', ' ')} development</span>
            </div>
            {answers.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2 text-gray-300">
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="capitalize">{feature.replace('-', ' ')}</span>
              </div>
            ))}
            {answers.designNeeds === 'full-design' && (
              <div className="flex items-center gap-2 text-gray-300">
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span>Full UI/UX design</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-gray-300">
              <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span>Testing & QA</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span>Deployment support</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span>Post-launch support</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Next Steps */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-center"
      >
        <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-xl p-8 mb-6">
          <h3 className="text-2xl font-bold text-white mb-3">What's Next?</h3>
          <p className="text-gray-300 mb-6">
            I'll review your project details and get back to you within 24 hours at{' '}
            <span className="text-cyan-400 font-medium">{answers.email}</span>
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/#contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-[1.02]"
            >
              <span>View My Work</span>
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="/#services"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-lg font-semibold text-white hover:bg-white/10 transition-all duration-300"
            >
              Learn More About Services
            </a>
          </div>
        </div>

        <p className="text-sm text-gray-500">
          This is a preliminary estimate. Final pricing will be determined after a detailed consultation.
        </p>
      </motion.div>
    </div>
  );
}
