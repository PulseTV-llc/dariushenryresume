'use client';

import { Mail, Linkedin, Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative py-14 px-4 sm:px-6 lg:px-8 bg-black border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <a
            href="mailto:support@vexaos.io"
            className="group flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
              <Mail className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-xs text-gray-400">Email</div>
              <div className="text-sm text-white font-medium">support@vexaos.io</div>
            </div>
          </a>
          <a
            href="https://www.linkedin.com/in/darius-henry-292b21373/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
              <Linkedin className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-xs text-gray-400">LinkedIn</div>
              <div className="text-sm text-white font-medium">Darius Henry</div>
            </div>
          </a>
          <a
            href="https://github.com/PulseTV-llc"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
              <Github className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-xs text-gray-400">GitHub</div>
              <div className="text-sm text-white font-medium">@PulseTV-llc</div>
            </div>
          </a>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Darius Henry · Private AI Workflow Systems
          </p>
        </div>
      </div>
    </footer>
  );
}
