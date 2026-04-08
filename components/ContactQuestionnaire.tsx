'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';

interface QuestionnaireData {
  name: string;
  email: string;
  problem: string;
  situation: string;
  selectedTier: string;
  timeline: string;
  features: string[];
  additionalDetails: string;
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
      id: 'problem',
      question: 'What problem are you trying to solve?',
      subtitle: 'Be specific - this helps me understand if I can help',
      type: 'textarea',
      placeholder: 'Example: I need a real estate app that helps investors find deals fast. My current agency has been working for 8 months and delivered nothing...',
      required: true,
    },
    {
      id: 'situation',
      question: 'Which describes your situation?',
      type: 'choice',
      options: [
        { value: 'new-idea', label: 'Brand New Idea', icon: '🚀', description: 'Need to validate fast' },
        { value: 'broken-app', label: 'Broken/Stuck App', icon: '🔧', description: 'Agency disappeared or delivered garbage' },
        { value: 'add-features', label: 'Add Features', icon: '➕', description: 'Have working app, need expansion' },
        { value: 'redesign', label: 'Redesign/Upgrade', icon: '🔄', description: 'Have old app, needs modernization' },
      ],
    },
    {
      id: 'selectedTier',
      question: 'Which tier best fits what you need?',
      subtitle: "Don't worry about the exact fit - I'll help you figure it out",
      type: 'choice',
      options: [
        { value: '7-day-mvp', label: '7-Day MVP', icon: '⚡', description: 'Validate your idea FAST (working app in ~1 week)' },
        { value: 'revenue-ready', label: 'Revenue-Ready App', icon: '💰', description: 'Full app that makes money NOW (~1-2 months)' },
        { value: 'production-saas', label: 'Production SaaS', icon: '👑', description: 'Zonely/Speakix level platform (~90 days)' },
        { value: 'fix-broken', label: 'Fix Broken App', icon: '🆘', description: 'Rescue mission for stuck/broken projects' },
      ],
    },
    {
      id: 'timeline',
      question: 'When do you need this done?',
      type: 'choice',
      options: [
        { value: 'asap', label: 'ASAP (1-2 weeks)', icon: '⚡', description: 'Emergency/urgent timeline' },
        { value: '1-month', label: '1 month', icon: '📅', description: 'Standard fast turnaround' },
        { value: '3-months', label: '3 months', icon: '🗓️', description: 'Normal project timeline' },
        { value: '6-months', label: '6+ months', icon: '📆', description: 'Long-term planning' },
        { value: 'flexible', label: 'Flexible', icon: '🌊', description: 'No rush, quality focused' },
      ],
    },
    {
      id: 'features',
      question: 'What features/capabilities do you need?',
      subtitle: 'Select all that apply',
      type: 'multi-choice',
      options: [
        { value: 'auth', label: 'User Authentication', icon: '🔐', description: 'Login/signup system' },
        { value: 'database', label: 'Database', icon: '🗄️', description: 'Store and manage data' },
        { value: 'admin', label: 'Admin Panel', icon: '👨‍💼', description: 'Manage users/content' },
        { value: 'payments', label: 'Payment Processing', icon: '💳', description: 'Stripe/PayPal integration' },
        { value: 'ai', label: 'AI/ML Features', icon: '🤖', description: 'OpenAI, machine learning' },
        { value: 'realtime', label: 'Real-time Updates', icon: '⚡', description: 'Live data sync' },
        { value: 'analytics', label: 'Analytics', icon: '📊', description: 'Track user behavior' },
        { value: 'api', label: 'API Integration', icon: '🔌', description: 'Connect external services' },
        { value: 'search', label: 'Search', icon: '🔍', description: 'Find and filter content' },
        { value: 'notifications', label: 'Notifications', icon: '🔔', description: 'Push/email alerts' },
      ],
    },
    {
      id: 'additionalDetails',
      question: 'Anything else I should know?',
      subtitle: 'Design needs, tech preferences, budget expectations, etc. (optional)',
      type: 'textarea',
      placeholder: 'Any additional context that would help...',
      required: false,
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
      problem: answers.problem,
      selectedTier: answers.selectedTier,
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
          <p className="text-xl text-gray-300 mb-8">
            Your project details have been received
          </p>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-8 mb-8 text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-3">🎯 What's Next?</h3>
          <p className="text-gray-300 mb-6 text-lg">
            I'll review your problem and get back to you within <span className="text-green-400 font-bold">24 hours</span> at{' '}
            <span className="text-green-400 font-medium">{answers.email}</span> with a custom solution plan.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/#proof"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300 hover:scale-[1.02]"
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

        <p className="text-sm text-gray-400 text-center">
          Looking forward to solving your problem! 💪
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
                        ? 'bg-green-500/10 border-green-500'
                        : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-4 mb-2">
                      <span className="text-3xl">{option.icon}</span>
                      <span className="text-white font-medium text-lg">{option.label}</span>
                    </div>
                    {option.description && (
                      <p className="text-sm text-gray-400 ml-12">{option.description}</p>
                    )}
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
          className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          <span>{isSubmitting ? 'Submitting...' : isLastStep ? 'Get Solution Plan' : 'Continue'}</span>
          {!isSubmitting && <ArrowRight className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
}
