'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';

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

export default function ContactQuestionnaire() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<QuestionnaireData>>({
    features: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showEstimate, setShowEstimate] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const questions = [
    {
      id: 'name',
      question: "What's your name?",
      type: 'text',
      placeholder: 'John Doe',
      required: true,
    },
    {
      id: 'email',
      question: 'How can we reach you?',
      type: 'email',
      placeholder: 'john@example.com',
      required: true,
    },
    {
      id: 'projectType',
      question: 'What are you looking to build?',
      type: 'choice',
      options: [
        { value: 'website', label: 'New Website', icon: '🌐' },
        { value: 'mobile-app', label: 'Mobile App', icon: '📱' },
        { value: 'web-app', label: 'Web App', icon: '💻' },
        { value: 'ecommerce', label: 'E-commerce Store', icon: '🛒' },
        { value: 'saas', label: 'SaaS Platform', icon: '☁️' },
        { value: 'api', label: 'API/Backend', icon: '⚙️' },
        { value: 'other', label: 'Other', icon: '✨' },
      ],
    },
    {
      id: 'currentSituation',
      question: 'Starting from scratch or redesigning existing?',
      type: 'choice',
      options: [
        { value: 'new', label: 'Brand New Project', icon: '🚀' },
        { value: 'redesign', label: 'Redesign/Upgrade', icon: '🔄' },
        { value: 'features', label: 'Add Features', icon: '➕' },
        { value: 'fix', label: 'Fix/Debug', icon: '🔧' },
      ],
    },
    {
      id: 'timeline',
      question: 'When do you need this completed?',
      type: 'choice',
      options: [
        { value: 'asap', label: 'ASAP (< 1 month)', icon: '⚡' },
        { value: '1-3', label: '1-3 months', icon: '📅' },
        { value: '3-6', label: '3-6 months', icon: '🗓️' },
        { value: '6+', label: '6+ months', icon: '📆' },
        { value: 'flexible', label: 'Flexible', icon: '🌊' },
      ],
    },
    {
      id: 'budget',
      question: "What's your budget for this project?",
      type: 'choice',
      options: [
        { value: '<5k', label: '< $5K', icon: '💵' },
        { value: '5-15k', label: '$5K - $15K', icon: '💰' },
        { value: '15-30k', label: '$15K - $30K', icon: '💸' },
        { value: '30-50k', label: '$30K - $50K', icon: '💎' },
        { value: '50k+', label: '$50K+', icon: '🏆' },
        { value: 'unsure', label: 'Not sure yet', icon: '🤔' },
      ],
    },
    {
      id: 'features',
      question: 'What features do you need?',
      subtitle: 'Select all that apply',
      type: 'multi-choice',
      options: [
        { value: 'auth', label: 'User Authentication', icon: '🔐' },
        { value: 'database', label: 'Database', icon: '🗄️' },
        { value: 'admin', label: 'Admin Panel', icon: '👨‍💼' },
        { value: 'payments', label: 'Payment Processing', icon: '💳' },
        { value: 'ai', label: 'AI/ML Features', icon: '🤖' },
        { value: 'realtime', label: 'Real-time Updates', icon: '⚡' },
        { value: 'analytics', label: 'Analytics', icon: '📊' },
        { value: 'api', label: 'API Integration', icon: '🔌' },
        { value: 'search', label: 'Search Functionality', icon: '🔍' },
        { value: 'notifications', label: 'Notifications', icon: '🔔' },
      ],
    },
    {
      id: 'designNeeds',
      question: 'Do you need design services?',
      type: 'choice',
      options: [
        { value: 'full-design', label: 'Yes - Full UI/UX Design', icon: '🎨' },
        { value: 'wireframes', label: 'Just Wireframes', icon: '📐' },
        { value: 'have-designs', label: 'I Have Designs Ready', icon: '✅' },
        { value: 'unsure', label: 'Not Sure', icon: '🤷' },
      ],
    },
    {
      id: 'techPreferences',
      question: 'Any tech stack preferences?',
      subtitle: 'Optional - skip if you have no preference',
      type: 'choice',
      options: [
        { value: 'react', label: 'React/Next.js', icon: '⚛️' },
        { value: 'mobile', label: 'Mobile (iOS/Android)', icon: '📱' },
        { value: 'wordpress', label: 'WordPress', icon: '📝' },
        { value: 'no-preference', label: 'No Preference', icon: '👍' },
        { value: 'other', label: 'Other (Tell us below)', icon: '💡' },
      ],
    },
    {
      id: 'description',
      question: 'Tell us about your vision',
      subtitle: 'Share any additional details, goals, or requirements',
      type: 'textarea',
      placeholder: 'Describe your project, target audience, business goals, etc.',
      required: true,
    },
  ];

  const currentQuestion = questions[currentStep];
  const isLastStep = currentStep === questions.length - 1;
  const progress = ((currentStep + 1) / questions.length) * 100;

  const handleNext = async () => {
    // Validate current answer
    const answer = answers[currentQuestion.id as keyof QuestionnaireData];

    if (currentQuestion.required) {
      if (!answer || (Array.isArray(answer) && answer.length === 0)) {
        return; // Don't proceed if required field is empty
      }
    }

    if (isLastStep) {
      // Submit form
      await handleSubmit();
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleAnswer = (value: string | string[]) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: value,
    });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError('');

    console.log('[ContactQuestionnaire] Submitting form...', {
      name: answers.name,
      email: answers.email,
      projectType: answers.projectType,
    });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(answers),
      });

      const data = await response.json();

      console.log('[ContactQuestionnaire] Response received:', {
        status: response.status,
        ok: response.ok,
        hasError: !!data.error,
        requestId: data.requestId,
      });

      if (!response.ok) {
        // Log detailed error info for debugging
        console.error('[ContactQuestionnaire] Submission failed:', {
          status: response.status,
          error: data.error,
          requestId: data.requestId,
          details: data.details,
          hint: data.hint,
        });

        // Build user-friendly error message
        let errorMessage = data.error || 'Failed to submit your inquiry.';

        // Add request ID for support
        if (data.requestId) {
          errorMessage += ` (Request ID: ${data.requestId})`;
        }

        // Add development details if available
        if (data.details) {
          console.error('[ContactQuestionnaire] Error details:', data.details);
          if (data.hint) {
            console.error('[ContactQuestionnaire] Hint:', data.hint);
          }
        }

        // Special handling for server configuration errors
        if (response.status === 503 || errorMessage.includes('configuration')) {
          errorMessage += '\n\nPlease contact the site administrator. This appears to be a server configuration issue.';
        }

        throw new Error(errorMessage);
      }

      console.log('[ContactQuestionnaire] ✅ Submission successful');
      setShowEstimate(true);
    } catch (error: any) {
      console.error('[ContactQuestionnaire] Error caught:', error);

      let displayError = error.message || 'Failed to submit. Please try again.';

      // Handle network errors specifically
      if (error.message === 'Failed to fetch' || error.name === 'NetworkError') {
        displayError = 'Network error. Please check your internet connection and try again.';
      }

      setSubmitError(displayError);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showEstimate) {
    return (
      <div className="max-w-3xl mx-auto">
        {/* Success Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="text-center"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 mb-6">
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Thank you, {answers.name}!
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Your inquiry has been received
          </p>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-xl p-8 mb-8 text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-3">What's Next?</h3>
          <p className="text-gray-300 mb-6">
            I'll review your project details and get back to you within 24 hours at{' '}
            <span className="text-cyan-400 font-medium">{answers.email}</span>
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/#projects"
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
        </motion.div>

        <p className="text-sm text-gray-500 text-center">
          Looking forward to discussing your project in detail!
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-gray-400">
            Question {currentStep + 1} of {questions.length}
          </span>
          <span className="text-sm text-cyan-400 font-medium">{Math.round(progress)}%</span>
        </div>
        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
            {currentQuestion.question}
          </h3>
          {currentQuestion.subtitle && (
            <p className="text-gray-400">{currentQuestion.subtitle}</p>
          )}

          <div className="mt-8">
            {/* Text Input */}
            {currentQuestion.type === 'text' && (
              <input
                type="text"
                value={(answers[currentQuestion.id as keyof QuestionnaireData] as string) || ''}
                onChange={(e) => handleAnswer(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleNext()}
                placeholder={currentQuestion.placeholder}
                className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                autoFocus
              />
            )}

            {/* Email Input */}
            {currentQuestion.type === 'email' && (
              <input
                type="email"
                value={(answers[currentQuestion.id as keyof QuestionnaireData] as string) || ''}
                onChange={(e) => handleAnswer(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleNext()}
                placeholder={currentQuestion.placeholder}
                className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                autoFocus
              />
            )}

            {/* Single Choice */}
            {currentQuestion.type === 'choice' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentQuestion.options?.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      handleAnswer(option.value);
                      // Auto-advance after short delay for better UX
                      setTimeout(() => handleNext(), 300);
                    }}
                    className={`p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                      answers[currentQuestion.id as keyof QuestionnaireData] === option.value
                        ? 'bg-cyan-500/10 border-cyan-500'
                        : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-3xl">{option.icon}</span>
                      <span className="text-white font-medium text-lg">{option.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Multi Choice */}
            {currentQuestion.type === 'multi-choice' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentQuestion.options?.map((option) => {
                  const isSelected = (answers.features || []).includes(option.value);
                  return (
                    <button
                      key={option.value}
                      onClick={() => {
                        const current = answers.features || [];
                        const updated = isSelected
                          ? current.filter((v) => v !== option.value)
                          : [...current, option.value];
                        handleAnswer(updated);
                      }}
                      className={`p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                        isSelected
                          ? 'bg-cyan-500/10 border-cyan-500'
                          : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <span className="text-3xl">{option.icon}</span>
                          <span className="text-white font-medium">{option.label}</span>
                        </div>
                        {isSelected && <CheckCircle2 className="w-5 h-5 text-cyan-500" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Textarea */}
            {currentQuestion.type === 'textarea' && (
              <textarea
                value={(answers[currentQuestion.id as keyof QuestionnaireData] as string) || ''}
                onChange={(e) => handleAnswer(e.target.value)}
                placeholder={currentQuestion.placeholder}
                rows={6}
                className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all resize-none"
                autoFocus
              />
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Error Message */}
      {submitError && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-red-400 whitespace-pre-wrap">{submitError}</p>
              {submitError.includes('Request ID:') && (
                <p className="text-xs text-red-300 mt-2">
                  Please include this Request ID when contacting support.
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between mt-12">
        <button
          onClick={handleBack}
          disabled={currentStep === 0}
          className="flex items-center gap-2 px-6 py-3 rounded-lg text-gray-400 hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        <button
          onClick={handleNext}
          disabled={
            isSubmitting ||
            (currentQuestion.required &&
              (!answers[currentQuestion.id as keyof QuestionnaireData] ||
                (Array.isArray(answers[currentQuestion.id as keyof QuestionnaireData]) &&
                  (answers[currentQuestion.id as keyof QuestionnaireData] as string[]).length === 0)))
          }
          className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          <span>{isSubmitting ? 'Submitting...' : isLastStep ? 'Get Estimate' : 'Continue'}</span>
          {!isSubmitting && <ArrowRight className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
}
