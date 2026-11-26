"use client";

import React, { useEffect, useRef, useState } from "react";
import { contactLimits, submitContact } from "@/lib/contact";
import styles from "./page.module.css";

// Show the form by default; explicit false or invalid values disable presentation.
const flag = process.env.NEXT_PUBLIC_CONTACT_FORM_ENABLED;
const formEnabled = flag === undefined || flag === "true";
// Set only after the owner verifies submission storage and notification delivery.
const deliveryVerified = process.env.NEXT_PUBLIC_CONTACT_DELIVERY_VERIFIED === "true";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "", "bot-field": "" });
  const submitting = useRef(false);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const fallbackTitle = useRef<HTMLHeadingElement>(null);
  const nameInput = useRef<HTMLInputElement>(null);
  const retryRequested = useRef(false);

  useEffect(() => {
    if (status === "error") fallbackTitle.current?.focus();
    if (status === "idle" && retryRequested.current) {
      nameInput.current?.focus();
      retryRequested.current = false;
    }
  }, [status]);

  const handleRetry = () => {
    retryRequested.current = true;
    setStatus("idle");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // A ref closes the gap before React renders the disabled submit button.
    if (!formEnabled || status === "error" || submitting.current) return;
    submitting.current = true;

    setStatus("sending");
    try {
      const result = await submitContact(formData);
      if (result.success) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "", "bot-field": "" });
      } else {
        setStatus("error");
      }
    } finally {
      submitting.current = false;
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
          <div className={`type-body ${styles.personalNote}`}>
            <p>I build web tools and interactive projects, and use AI workflows to explore ideas as I go.</p>
            <p>If you have a collaboration in mind or a professional opportunity to discuss, I&apos;d like to hear about it.</p>
          </div>
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
          <nav aria-label="Social profiles" className={styles.social}>
            <p className="type-metadata">Elsewhere</p>
            <ul className={styles.socialLinks}>
              <li><a href="https://github.com/iamsaifkhan25" className={styles.socialLink}>GitHub</a></li>
              <li><a href="https://www.linkedin.com/in/iamsaifkhan25" className={styles.socialLink}>LinkedIn</a></li>
            </ul>
          </nav>
        </section>

        {formEnabled ? (
          <section aria-labelledby="message-title" className={styles.message}>
            <h2 id="message-title" className="type-section font-display-serif">Send me a message</h2>
            <p className="type-body">Have something in mind? I&apos;d love to hear about it.</p>
            <div className={`glass-panel ${styles.formSurface}`}>
              {!deliveryVerified && <p id="form-notice" className={styles.formNotice}>
                I&apos;m testing this form at the moment. You can always <a href="mailto:iamsaifkhan25@gmail.com" className={styles.textLink}>email me directly</a> instead.
              </p>}
              <div aria-live="polite" aria-atomic="true" role="status" className={styles.status}>
                {status === "sending" && <p>Sending your message...</p>}
                {status === "success" && <p>Thanks for reaching out! Your message has been submitted.</p>}
                {status === "error" && <p>Your message didn&apos;t go through. You can try again or email me directly.</p>}
              </div>
              {status === "error" ? (
                <div className={styles.failure}>
                  <h3 ref={fallbackTitle} tabIndex={-1} className="type-section font-display-serif">Email me instead</h3>
                  <p className="type-body">Your message is still here if you&apos;d like to try again.</p>
                  <div className={styles.fallbackActions}>
                    <a href="mailto:iamsaifkhan25@gmail.com" className={`glass-btn-primary ${styles.emailAction}`}>Email Saif</a>
                    <button type="button" onClick={handleRetry} className={`glass-btn ${styles.submit}`}>Try again</button>
                  </div>
                  <p className="type-metadata">Opens your email app.</p>
                </div>
              ) : (
                <form name="portfolio-contact" method="POST" onSubmit={handleSubmit} className={styles.form} aria-labelledby="message-title" aria-describedby={deliveryVerified ? undefined : "form-notice"} aria-busy={status === "sending"}>
                  <input type="hidden" name="form-name" value="portfolio-contact" />
                  <div hidden aria-hidden="true">
                    <label htmlFor="bot-field">Leave this field empty</label>
                    <input type="text" id="bot-field" name="bot-field" tabIndex={-1} autoComplete="off"
                      value={formData["bot-field"]} onChange={(e) => setFormData({ ...formData, "bot-field": e.target.value })} />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="name">Your name <span className="type-metadata">(required)</span></label>
                    <input type="text" id="name" name="name" autoComplete="name"
                      ref={nameInput}
                      placeholder="e.g. Alex Morgan"
                      maxLength={contactLimits.name} value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`glass-input ${styles.control}`} disabled={status === "sending"} required />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="email">Email address <span className="type-metadata">(required)</span></label>
                    <input type="email" id="email" name="email" autoComplete="email"
                      placeholder="you@example.com"
                      maxLength={contactLimits.email} value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`glass-input ${styles.control}`} disabled={status === "sending"} required />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="message">Your message <span className="type-metadata">(required)</span></label>
                    <textarea id="message" name="message" rows={5}
                      placeholder="A project, an opportunity, or just a question. Tell me a little about it."
                      maxLength={contactLimits.message} value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className={`glass-input ${styles.control}`} disabled={status === "sending"} required />
                  </div>
                  <button type="submit" disabled={status === "sending"} className={`glass-btn-primary ${styles.submit}`}>
                    {status === "sending" ? "Sending your message..." : "Send Message"}
                  </button>
                </form>
              )}
              {status !== "error" && <p className="type-metadata">You can also <a href="mailto:iamsaifkhan25@gmail.com" className={styles.textLink}>email me directly</a>.</p>}
            </div>
          </section>
        ) : (
          <section aria-labelledby="email-title" className={styles.fallback}>
            <h2 id="email-title" className="type-section font-display-serif">Reach me by email</h2>
            <p className="type-body">The contact form is currently unavailable. Please email me directly.</p>
            <a href="mailto:iamsaifkhan25@gmail.com" className={`glass-btn-primary ${styles.emailAction}`}>Email Saif</a>
            <p className="type-metadata">Opens your email app. You can also copy the address from Contact Details.</p>
          </section>
        )}
      </div>
    </div>
  );
}
