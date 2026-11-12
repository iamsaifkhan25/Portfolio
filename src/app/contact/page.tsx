"use client";

import React, { useState } from "react";
import { contactLimits, submitContact } from "@/lib/contact";
import styles from "./page.module.css";

// Presentation only. Unset, false, and unrecognized values keep the form hidden.
const formEnabled = process.env.NEXT_PUBLIC_CONTACT_FORM_ENABLED === "true";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formEnabled || status === "sending") return;

    setStatus("sending");
    setErrorMessage("");
    const result = await submitContact(formData);
    if (result.success) {
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } else {
      setErrorMessage(result.error);
      setStatus("error");
    }
  };

  return (
    <div className={styles.page}>
      <header className={styles.introduction}>
        <h1 className="type-page-title font-display-serif">Get in Touch</h1>
        <p className="type-intro">
          Collaborate on a project, chat about agentic AI workflows, or say hello.
        </p>
      </header>

      <div className={styles.layout}>
        <section aria-labelledby="contact-details-title" className={styles.details}>
          <h2 id="contact-details-title" className="type-section font-display-serif">Contact Details</h2>
          <dl>
            <div className={styles.row}>
              <dt className="type-metadata">Email Me</dt>
              <dd><a href="mailto:iamsaifkhan25@gmail.com" className={styles.contactLink}>iamsaifkhan25@gmail.com</a></dd>
            </div>
            <div className={styles.row}>
              <dt className="type-metadata">Call Me</dt>
              <dd><a href="tel:+917701830846" className={styles.contactLink}>+91-7701830846</a></dd>
            </div>
            <div className={styles.row}>
              <dt className="type-metadata">Location</dt>
              <dd className="type-body">New Delhi, India</dd>
            </div>
          </dl>
        </section>

        {formEnabled ? (
          <section aria-labelledby="message-title" className={styles.message}>
            <h2 id="message-title" className="type-section font-display-serif">Send a Message</h2>
            <div className={`glass-panel ${styles.formSurface}`}>
              <p id="form-notice" className="type-body">
                Form delivery is unverified. Please <a href="mailto:iamsaifkhan25@gmail.com" className={styles.textLink}>email me directly</a> for contact.
                This form is available for delivery testing.
              </p>
              <form onSubmit={handleSubmit} className={styles.form} aria-labelledby="message-title" aria-describedby="form-notice form-required" aria-busy={status === "sending"}>
                <p id="form-required" className="type-metadata">All fields are required.</p>
                <div className={styles.field}>
                  <label htmlFor="name">Full name (required)</label>
                  <input type="text" id="name" name="name" autoComplete="name"
                    maxLength={contactLimits.name} value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`glass-input ${styles.control}`} disabled={status === "sending"} required />
                </div>
                <div className={styles.field}>
                  <label htmlFor="email">Email address (required)</label>
                  <input type="email" id="email" name="email" autoComplete="email"
                    maxLength={contactLimits.email} value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`glass-input ${styles.control}`} disabled={status === "sending"} required />
                </div>
                <div className={styles.field}>
                  <label htmlFor="message">Message (required)</label>
                  <textarea id="message" name="message" rows={6}
                    maxLength={contactLimits.message} value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`glass-input ${styles.control}`} disabled={status === "sending"} required />
                </div>
                <div aria-live="polite" aria-atomic="true" role="status" className={styles.status}>
                  {status === "success" && <p>Message accepted for sending. Inbox delivery is not confirmed.</p>}
                  {status === "error" && <p>{errorMessage}{" "}<a href="mailto:iamsaifkhan25@gmail.com" className={styles.textLink}>Email me directly</a>.</p>}
                </div>
                <button type="submit" disabled={status === "sending"} className={`glass-btn-primary ${styles.submit}`}>
                  {status === "sending" ? "Sending message..." : "Send Message"}
                </button>
              </form>
            </div>
          </section>
        ) : (
          <section aria-labelledby="email-title" className={styles.fallback}>
            <h2 id="email-title" className="type-section font-display-serif">Reach me by email</h2>
            <p className="type-body">The contact form is currently disabled while delivery is being verified. Please email me directly.</p>
            <a href="mailto:iamsaifkhan25@gmail.com" className={`glass-btn-primary ${styles.emailAction}`}>Email Saif</a>
            <p className="type-metadata">Opens your email app. You can also copy the address from Contact Details.</p>
          </section>
        )}
      </div>
    </div>
  );
}
