import React from "react";
import Link from "next/link";
import styles from "./page.module.css";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata(
  "Resume",
  "Saif Khan's experience, education, competencies, and downloadable resume.",
  "/resume",
);

export default function ResumePage() {
  const experiences = [
    {
      role: "Vendor Support Agent",
      company: "IGT Solutions Pvt. Ltd. | Gurugram",
      period: "May 2025 – Present",
      description:
        "Assist car and activity supplier partners in a B2B environment, using Salesforce for product questions, onboarding support, and case resolution. Coordinate with internal teams on complex requests, communicate updates, and maintain continuity across support channels.",
      highlights: ["Salesforce CRM", "Partner Onboarding Support", "Case Management", "Cross-Team Coordination"],
    },
    {
      role: "Customer Service Executive",
      company: "Convergys India Pvt. Ltd. | Gurugram",
      period: "Sep 2023 – Apr 2025",
      description:
        "Resolved service and billing questions by reviewing pricing options, explaining available solutions, and supporting customer retention.",
      highlights: ["Service & Billing Support", "Pricing Options", "Customer Retention"],
    },
    {
      role: "Admin Representative",
      company: "Viva Holiday Planners Pvt. Ltd. | Noida",
      period: "Feb 2022 – May 2023",
      description:
        "Tracked operational EMS metrics, handled written inquiries, and compiled productivity reports to support team visibility.",
      highlights: ["EMS Metrics", "Written Inquiries", "Productivity Reports"],
    },
  ];

  const education = [
    {
      degree: "Bachelor of Travel & Tour Management",
      institution: "Indira Gandhi National Open University (IGNOU)",
      details: "2025 – Present. Pursuing via distance learning; not yet completed.",
    },
    {
      degree: "Higher Secondary, Science",
      institution: "Govt. Boys Senior Secondary School",
      details: "2020",
    },
  ];

  const skills = [
    "B2B Partner Onboarding Support",
    "Cross-Platform Issue Investigation",
    "CRM Case Management & Follow-Up",
    "Written Case Documentation",
    "Cross-Functional Coordination",
    "Process Accuracy & Attention to Detail",
    "Salesforce CRM",
  ];

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.introduction}>
          <h1 className="type-page-title font-display-serif">Resume &amp; Experience</h1>
          <p className="type-intro">Traditional career background and academic credentials.</p>
        </div>
        <a href="/Saif%20Resume.pdf" download="Saif Khan Resume.pdf" className={`glass-btn ${styles.download}`}>
          Download PDF Resume
        </a>
      </header>
      <section className={styles.section} aria-labelledby="building-title">
        <h2 id="building-title" className="type-section font-display-serif">What I&apos;m Building Toward</h2>
        <p className={`type-body ${styles.prose}`}>
          My background is in partner operations, and I&apos;m learning by building projects of my own.
          I use AI coding tools to explore ideas and prototype, while taking responsibility for
          decisions, testing, and iteration. The{" "}
          <Link href="/projects" className={styles.textLink}>Projects page</Link>{" "}
          shows some of that work.
        </p>
      </section>
      <section className={styles.section} aria-labelledby="experience-title">
        <h2 id="experience-title" className="type-section font-display-serif">Professional Experience</h2>
        <ol className={styles.rows}>
          {experiences.map((exp) => (
            <li key={exp.role} className={styles.row}>
              <p className="type-metadata">{exp.period}</p>
              <div className={styles.entry}>
                <h3 className={styles.entryTitle}>{exp.role}</h3>
                <p className={styles.employer}>{exp.company}</p>
                <p className={`type-body ${styles.prose}`}>{exp.description}</p>
                <ul className={styles.highlights} aria-label="Areas of work">
                  {exp.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </section>
      <section className={styles.section} aria-labelledby="education-title">
        <h2 id="education-title" className="type-section font-display-serif">Education</h2>
        <ul className={styles.rows}>
          {education.map((item) => (
            <li key={item.degree} className={styles.educationRow}>
              <h3 className={styles.entryTitle}>{item.degree}</h3>
              <p className={styles.employer}>{item.institution}</p>
              <p className="type-metadata">{item.details}</p>
            </li>
          ))}
        </ul>
      </section>
      <section className={styles.section} aria-labelledby="competencies-title">
        <h2 id="competencies-title" className="type-section font-display-serif">Core Competencies</h2>
        <ul className={`type-body ${styles.skills}`}>
          {skills.map((skill) => <li key={skill}>{skill}</li>)}
        </ul>
      </section>
    </div>
  );
}
