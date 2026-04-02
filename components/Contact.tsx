'use client';

import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, ArrowUpRight, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { useState, FormEvent } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setSubmitStatus({
        type: 'success',
        message: data.message || 'Thank you for your message! I\'ll get back to you soon.',
      });

      // Reset form
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error: any) {
      setSubmitStatus({
        type: 'error',
        message: error.message || 'Failed to send message. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
            <span className="gradient-text">Let's Build Together</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Available for freelance projects, consulting, and full-time opportunities
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Get In Touch</h3>
                <p className="text-gray-400 leading-relaxed">
                  I'm always interested in hearing about new projects and opportunities.
                  Whether you have a question or just want to say hi, I'll get back to you as soon as possible.
                </p>
              </div>

              {/* Contact Methods */}
              <div className="space-y-4">
                <a
                  href="mailto:dariushenry@example.com"
                  className="group flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-gray-400">Email</div>
                    <div className="text-white font-medium">dariushenry@example.com</div>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                </a>

                <a
                  href="https://linkedin.com/in/dariushenry"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                    <Linkedin className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-gray-400">LinkedIn</div>
                    <div className="text-white font-medium">linkedin.com/in/dariushenry</div>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                </a>

                <a
                  href="https://github.com/dariushenry"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                    <Github className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-gray-400">GitHub</div>
                    <div className="text-white font-medium">github.com/dariushenry</div>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-gray-300 transition-colors" />
                </a>
              </div>

              {/* Availability */}
              <div className="p-6 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-green-400 font-medium">Available for Work</span>
                </div>
                <p className="text-sm text-gray-400">
                  Open to freelance projects, consulting, and full-time opportunities
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Project inquiry"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Tell me about your project..."
                />
              </div>

              {/* Status Messages */}
              {submitStatus.type && (
                <div
                  className={`p-4 rounded-lg flex items-center gap-3 ${
                    submitStatus.type === 'success'
                      ? 'bg-green-500/10 border border-green-500/20'
                      : 'bg-red-500/10 border border-red-500/20'
                  }`}
                >
                  {submitStatus.type === 'success' ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                  )}
                  <p
                    className={`text-sm ${
                      submitStatus.type === 'success' ? 'text-green-400' : 'text-red-400'
                    }`}
                  >
                    {submitStatus.message}
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full group flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                {!isSubmitting && (
                  <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                )}
              </button>
            </form>
          </motion.div>
        </div>

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
