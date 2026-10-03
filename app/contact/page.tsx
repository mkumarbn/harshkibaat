import type { Metadata } from "next";
import ContactForm from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact Harsh ki Baat",
  description:
    "Contact Harsh ki Baat with a question, feedback or story suggestion. Send a message using our contact form.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main id="main-content">
      <section className="page-heading section-wrap">
        <p className="eyebrow"><span /> GET IN TOUCH</p>
        <h1>Let’s start a<br /><em>conversation.</em></h1>
        <p>Questions, feedback or a story worth discussing? We’d like to hear from you.</p>
      </section>

      <section className="contact-section section-wrap">
        <div className="contact-aside">
          <p className="contact-aside-label">WRITE TO US</p>
          <h2>Your voice<br />is part of it.</h2>
          <p>Use the form to send a message directly to the Harsh ki Baat team, or reach us by email and WhatsApp.</p>
          <div className="contact-email">
            <span>EMAIL</span>
            <a href="mailto:harsh-kumar@outlook.com">harsh-kumar@outlook.com</a>
          </div>
          <div className="contact-email contact-whatsapp">
            <span>MOBILE · WHATSAPP ONLY</span>
            <a href="https://wa.me/919897735444?text=Hello%20Harsh%20ki%20Baat" target="_blank" rel="noreferrer">
              Message us on WhatsApp <span aria-hidden="true">↗</span>
            </a>
          </div>
          <p className="contact-email-note">Prefer email? You can write to us directly at the address above.</p>
        </div>
        <ContactForm />
      </section>
    </main>
  );
}
