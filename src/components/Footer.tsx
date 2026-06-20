import React from "react";
import { Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-white/5 bg-slate-950/20 backdrop-blur-md">
      <div className="mx-auto max-w-5xl px-6 py-12 md:flex md:items-center md:justify-between">
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-200 tracking-wider text-sm">SAIF KHAN</span>
            <span className="h-4 w-[1px] bg-white/10" />
            <span className="text-xs text-slate-500">AI-Driven Builder</span>
          </div>
          <p className="text-center text-xs leading-5 text-slate-400 md:text-left">
            &copy; {new Date().getFullYear()} Saif Khan. All rights reserved.
          </p>
        </div>

        <div className="mt-8 flex flex-col md:flex-row items-center gap-6 md:mt-0 text-slate-400">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1.5 text-xs">
              <MapPin size={12} className="text-indigo-400" />
              <span>New Delhi, India</span>
            </div>
            <a
              href="mailto:iamsaifkhan25@gmail.com"
              className="flex items-center gap-1.5 text-xs hover:text-white transition-colors duration-200"
            >
              <Mail size={12} className="text-indigo-400" />
              <span>iamsaifkhan25@gmail.com</span>
            </a>
          </div>

          <div className="flex items-center gap-4 border-t border-white/5 md:border-t-0 pt-4 md:pt-0 md:border-l md:border-white/10 md:pl-6">
            <a
              href="https://github.com/iamsaifkhan25"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors duration-200"
              aria-label="GitHub Profile"
            >
              <svg className="h-4.5 w-4.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/iamsaifkhan25"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors duration-200"
              aria-label="LinkedIn Profile"
            >
              <svg className="h-4.5 w-4.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
