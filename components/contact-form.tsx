"use client";

import { useState, type FormEvent } from "react";

type FormState = "idle" | "sending" | "success" | "auto-reply-warning" | "error";

export default function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "sending") return;

    const form = event.currentTarget;
    const values = new FormData(form);
    setState("sending");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.get("name"),
          email: values.get("email"),
          subject: values.get("subject"),
          message: values.get("message"),
          website: values.get("website"),
        }),
      });
      const result: { error?: string; autoReplySent?: boolean } = await response.json();
      if (!response.ok) throw new Error(result.error ?? "Your message could not be sent. Please try again.");

      form.reset();
      setState(result.autoReplySent === false ? "auto-reply-warning" : "success");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Your message could not be sent. Please try again.");
      setState("error");
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="contact-form-heading">
        <div>
          <span className="contact-form-kicker">A NOTE TO OUR TEAM</span>
          <h2>What’s on your mind?</h2>
          <p>Send us a message. We’ll get back to you as soon as we can.</p>
        </div>
        <span className="required-note"><b>*</b> Required</span>
      </div>
      <div className="form-row">
        <label>
          <span className="contact-field-label">Your name <b aria-hidden="true">*</b></span>
          <input name="name" type="text" autoComplete="name" maxLength={100} required aria-required="true" placeholder="How should we address you?" />
        </label>
        <label>
          <span className="contact-field-label">Email address <b aria-hidden="true">*</b></span>
          <input name="email" type="email" autoComplete="email" maxLength={254} required aria-required="true" placeholder="you@example.com" />
        </label>
      </div>
      <label>
        <span className="contact-field-label">Subject <b aria-hidden="true">*</b></span>
        <input name="subject" type="text" maxLength={120} required aria-required="true" placeholder="What would you like to discuss?" />
      </label>
      <label>
        <span className="contact-field-label">Your message <b aria-hidden="true">*</b></span>
        <textarea name="message" rows={6} maxLength={5000} required aria-required="true" placeholder="Write your message here…" />
      </label>
      <label className="contact-honeypot" aria-hidden="true" tabIndex={-1}>
        Leave this field empty
        <input name="website" type="text" tabIndex={-1} autoComplete="off" />
      </label>
      <div className="contact-submit-row">
        <button className="button button-dark" type="submit" disabled={state === "sending"}>
          {state === "sending" ? "Sending…" : "Send message"} <span aria-hidden="true">↗</span>
        </button>
        <p className={`contact-status${state === "error" ? " is-error" : ""}${state === "auto-reply-warning" ? " is-warning" : ""}`} aria-live="polite" role={state === "error" ? "alert" : "status"}>
          {state === "success" && "Message sent! A confirmation is on its way to your inbox."}
          {state === "auto-reply-warning" && "Your message reached our team, but we couldn’t send the confirmation email. We’ll be in touch."}
          {state === "error" && errorMessage}
        </p>
      </div>
    </form>
  );
}
