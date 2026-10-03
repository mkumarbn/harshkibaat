import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "Read the sample terms and conditions for using the Harsh ki Baat website.",
  alternates: { canonical: "/terms-and-conditions" },
};

export default function TermsAndConditionsPage() {
  return (
    <main id="main-content">
      <section className="page-heading section-wrap">
        <p className="eyebrow"><span /> THE IMPORTANT DETAILS</p>
        <h1>Terms &amp;<br /><em>conditions.</em></h1>
        <p>Last updated: October 2026</p>
      </section>
      <article className="terms-content section-wrap">
        <p className="terms-intro">
          These sample terms describe the general expectations for using this website. They are dummy content for this site and should be reviewed and replaced with approved legal terms before publication.
        </p>
        <section>
          <h2>Using this website</h2>
          <p>You may browse this website and its public content for personal, non-commercial use. Please use the site lawfully, respect other visitors, and do not interfere with its operation or attempt to access systems or information you are not authorised to use.</p>
        </section>
        <section>
          <h2>Content and external links</h2>
          <p>Website text, branding and original materials are provided for general information. Video playback is embedded from YouTube and remains subject to YouTube’s terms and privacy practices. Links to third-party websites are provided for convenience; those sites are responsible for their own content and policies.</p>
        </section>
        <section>
          <h2>Contact form</h2>
          <p>Please provide accurate information when contacting us and do not submit unlawful, abusive or confidential information through the form. Messages are handled according to the website’s contact process.</p>
        </section>
        <section>
          <h2>Availability and changes</h2>
          <p>We aim to keep the website available and current, but features and content may change or be temporarily unavailable. These sample terms may also be updated. Continued use after an update indicates acceptance of the revised terms.</p>
        </section>
        <section>
          <h2>Questions</h2>
          <p>If you have a question about these terms, please <a href="/contact">contact the Harsh ki Baat team</a>.</p>
        </section>
      </article>
    </main>
  );
}
