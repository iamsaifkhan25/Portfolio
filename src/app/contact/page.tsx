"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle } from "lucide-react";
import GlassCard from "@/components/GlassCard";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      return;
    }

    setStatus("sending");
    // Simulate API submission
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    }, 1500);
  };

  return (
    <div className="flex flex-col gap-10 md:gap-14 animate-fadeIn">
      {/* Header Banner */}
      <div className="border-b border-white/5 pb-6">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
          Get in Touch
        </h1>
        <p className="text-slate-400 text-sm md:text-base mt-2">
          Collaborate on a project, chat about agentic AI workflows, or say hello.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Contact Info (Left - 2 Cols) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <span>Contact Details</span>
          </h2>

          <div className="flex flex-col gap-4">
            {/* Email Card */}
            <GlassCard className="flex items-start gap-4 p-5 hover:border-indigo-500/30" hoverEffect={true}>
              <div className="h-10 w-10 shrink-0 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <Mail size={18} />
              </div>
              <div className="flex flex-col gap-1 overflow-hidden">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Email Me</span>
                <a
                  href="mailto:iamsaifkhan25@gmail.com"
                  className="text-slate-200 text-sm font-medium hover:text-indigo-300 transition-colors truncate"
                >
                  iamsaifkhan25@gmail.com
                </a>
              </div>
            </GlassCard>

            {/* Phone Card */}
            <GlassCard className="flex items-start gap-4 p-5 hover:border-indigo-500/30" hoverEffect={true}>
              <div className="h-10 w-10 shrink-0 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <Phone size={18} />
              </div>
              <div className="flex flex-col gap-1 overflow-hidden">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Call Me</span>
                <a
                  href="tel:+917701830846"
                  className="text-slate-200 text-sm font-medium hover:text-indigo-300 transition-colors truncate"
                >
                  +91-7701830846
                </a>
              </div>
            </GlassCard>

            {/* Location Card */}
            <GlassCard className="flex items-start gap-4 p-5 hover:border-indigo-500/30" hoverEffect={true}>
              <div className="h-10 w-10 shrink-0 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <MapPin size={18} />
              </div>
              <div className="flex flex-col gap-1 overflow-hidden">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Location</span>
                <span className="text-slate-200 text-sm font-medium">New Delhi, India</span>
              </div>
            </GlassCard>
          </div>
        </div>

        {/* Form Panel (Right - 3 Cols) */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          <h2 className="text-xl font-bold text-slate-100">Send a Message</h2>
          <GlassCard className="p-6 md:p-8" hoverEffect={false}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Name */}
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                  className="glass-input rounded-xl px-4 py-3 text-slate-200 text-sm w-full"
                  disabled={status === "sending"}
                  required
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@example.com"
                  className="glass-input rounded-xl px-4 py-3 text-slate-200 text-sm w-full"
                  disabled={status === "sending"}
                  required
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about your project..."
                  className="glass-input rounded-xl px-4 py-3 text-slate-200 text-sm w-full resize-none"
                  disabled={status === "sending"}
                  required
                />
              </div>

              {/* Status Alert */}
              {status === "success" && (
                <div className="flex items-center gap-2 text-emerald-400 bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-3 text-sm">
                  <CheckCircle2 size={16} className="shrink-0" />
                  <span>Message sent! I&apos;ll get back to you as soon as possible.</span>
                </div>
              )}
              {status === "error" && (
                <div className="flex items-center gap-2 text-rose-400 bg-rose-500/5 border border-rose-500/20 rounded-xl p-3 text-sm">
                  <AlertCircle size={16} className="shrink-0" />
                  <span>Please fill out all fields before sending.</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === "sending"}
                className={`glass-btn-primary py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold tracking-wide cursor-pointer transition-all duration-300 ${
                  status === "sending" ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {status === "sending" ? (
                  <>
                    <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Sending message...</span>
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
