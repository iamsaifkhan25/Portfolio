import React from "react";
import styles from "./SiteShell.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerIdentity}>
          <p className={styles.footerName}>SAIF KHAN</p>
          <p>Building & Learning</p>
          <p>&copy; {new Date().getFullYear()} Saif Khan. All rights reserved.</p>
        </div>
        <div className={styles.footerDetails}>
          <p>New Delhi, India</p>
          <a href="mailto:iamsaifkhan25@gmail.com">iamsaifkhan25@gmail.com</a>
          <div className={styles.socialLinks}>
            <a href="https://github.com/iamsaifkhan25" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/iamsaifkhan25" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
