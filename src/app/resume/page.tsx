import React from "react";
import { Briefcase, GraduationCap, Download, FileText, CheckCircle2 } from "lucide-react";
import GlassCard from "@/components/GlassCard";

export default function ResumePage() {
  const experiences = [
    {
      role: "Customer Support Executive",
      company: "IGT Solutions",
      period: "B2B Environment",
      description:
        "Managed B2B operations and customer relations, onboarded Car Partners, navigated Salesforce CRM configurations, and operated Global Distribution Systems (GDS) to resolve complex logistics and travel ticketing requirements.",
      highlights: ["Salesforce CRM", "Car Partners Onboarding", "Global Distribution Systems (GDS)", "B2B Accounts Management"],
    },
    {
      role: "Customer Service Executive",
      company: "Convergys India Pvt. Ltd.",
      period: "Service & Operations",
      description:
        "Handled customer success workflows, focused on customer retention, problem-solving under pressure, and driving value through effective upselling of company services.",
      highlights: ["Customer Retention", "Value Upselling", "Conflict Resolution", "Process Compliance"],
    },
    {
      role: "Admin Representative",
      company: "Viva Holiday Planners Pvt. Ltd.",
      period: "Administration",
      description:
        "Managed administrative operations, customer scheduling, tour planning support, and internal databases for seamless itinerary execution.",
      highlights: ["Database Administration", "Travel Schedule Coordination", "Internal Audits"],
    },
  ];

  const education = {
    degree: "Bachelor of Travel and Tour Management",
    institution: "Indira Gandhi National Open University (IGNOU)",
    details: "Specialized tracks in Psychology and Radio Lekhan (Scriptwriting for Radio). Integrated understanding of consumer behavior, cognitive patterns, and communication media structure.",
  };

  const skills = [
    "Customer Service",
    "Problem-Solving",
    "Attention to Detail",
    "Critical Thinking",
    "Email Management",
    "Salesforce CRM",
    "B2B Operations",
    "GDS Ticketing Systems",
  ];

  return (
    <div className="flex flex-col gap-10 md:gap-14 animate-fadeIn">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-6 border-b border-white/5">
        <div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            Resume & Experience
          </h1>
          <p className="text-slate-400 text-sm md:text-base mt-2">
            Traditional career background and academic credentials.
          </p>
        </div>
        <a
          href="/Saif Resume.pdf"
          download="Saif Resume.pdf"
          className="glass-btn-primary flex items-center gap-2 group w-full md:w-auto"
        >
          <Download size={16} className="group-hover:-translate-y-0.5 transition-transform duration-200" />
          Download PDF Resume
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Experience Timeline (Left 2 cols) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="flex items-center gap-2 text-indigo-400 font-semibold mb-2">
            <Briefcase size={20} />
            <h2 className="text-xl md:text-2xl font-bold text-slate-100">Professional Experience</h2>
          </div>

          <div className="relative border-l border-white/10 pl-6 ml-3 flex flex-col gap-8">
            {experiences.map((exp, index) => (
              <div key={index} className="relative">
                {/* Timeline node */}
                <div className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full bg-[#030712] border-2 border-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]" />

                <div className="flex flex-col gap-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-lg font-bold text-slate-100">{exp.role}</h3>
                    <span className="text-xs text-indigo-400 font-medium px-2.5 py-0.5 rounded-full border border-indigo-500/20 bg-indigo-500/5">
                      {exp.period}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-slate-300">{exp.company}</h4>
                  <p className="text-slate-400 text-sm leading-relaxed mt-1 font-light">
                    {exp.description}
                  </p>

                  {/* Highlights list */}
                  <div className="flex flex-wrap gap-2 mt-2">
                    {exp.highlights.map((h, i) => (
                      <span
                        key={i}
                        className="text-[11px] text-slate-300 bg-white/5 border border-white/5 rounded-md px-2 py-0.5"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education & Skills (Right col) */}
        <div className="flex flex-col gap-8">
          {/* Education */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-indigo-400 font-semibold">
              <GraduationCap size={20} />
              <h2 className="text-xl font-bold text-slate-100">Education</h2>
            </div>
            <GlassCard className="flex flex-col gap-3">
              <div>
                <h3 className="font-bold text-slate-100 text-sm leading-snug">{education.degree}</h3>
                <span className="text-xs text-indigo-400 mt-1 block">{education.institution}</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                {education.details}
              </p>
            </GlassCard>
          </div>

          {/* Skills Checklist */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-indigo-400 font-semibold">
              <FileText size={20} />
              <h2 className="text-xl font-bold text-slate-100">Core Competencies</h2>
            </div>
            <GlassCard className="flex flex-col gap-3" hoverEffect={false}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
                {skills.map((skill, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-indigo-400 shrink-0" />
                    <span className="text-slate-300 text-xs font-medium">{skill}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
}
