import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { channels } from "@/lib/channels";

export const metadata: Metadata = {
  title: "About Harsh ki Baat",
  description:
    "Learn about Harsh ki Baat and its three YouTube channels covering Hindi news, current affairs and conversations.",
  alternates: { canonical: "/about-us" },
  openGraph: {
    title: "About Harsh ki Baat",
    description:
      "Meet Harsh Kumar and discover three channels sharing Hindi news, reporting and analysis.",
    images: [{ url: "/about-channel-network.jpeg", alt: "Harsh ki Baat YouTube Network" }],
  },
};

export default function AboutPage() {
  return (
    <main id="main-content">
      <section className="about-hero section-wrap">
        <div className="about-intro-copy">
          <p className="eyebrow"><span /> ABOUT HARSH KI BAAT</p>
          <h1>Meet Harsh Kumar.<br /><em>Make sense of what matters.</em></h1>
          <p className="about-lede">
            Harsh Kumar has spent more than three decades in print journalism, contributing to and holding senior roles at leading newspapers across India. Today, millions follow his reporting and commentary across social media.
          </p>
          <p>
            As editor-in-chief of Harsh ki Baat, he brings that experience to Hindi news, current affairs and analysis. The live programme makes space for viewers’ questions and perspectives—not just something to watch from the sidelines.
          </p>
          <p>
            His book <i>Hindutva Ki Hattrick</i> examines the 2024 Lok Sabha elections and remained an Amazon bestseller for several months, continuing to rank among its top 20 books. His latest book, <i>Amit Shah: Performer to Reformer</i>, was published in January 2025. His channel biography also notes that Amitabh Bachchan follows him on X. Explore all three channels for more conversations, reporting and perspectives.
          </p>
          <div className="about-hero-actions">
            <Link className="button button-dark" href="/videos">Explore the videos <span aria-hidden="true">↗</span></Link>
            <a className="about-youtube-link" href="https://www.youtube.com/@harshkibaatLIVE" target="_blank" rel="noreferrer">
              Visit the main channel <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div className="about-signature">
            <span className="about-signature-line" />
            <span>Harsh Kumar</span>
            <small>HARSH KI BAAT</small>
          </div>
        </div>
        <div className="about-portrait">
          <div className="portrait-orbit portrait-orbit-one" />
          <div className="portrait-orbit portrait-orbit-two" />
          <div className="portrait-image-frame">
            <Image
              src="/about-channel-network.jpeg"
              alt="Harsh ki Baat YouTube Network featuring Harsh ki Baat LIVE and Global Harsh"
              fill
              priority
              sizes="(max-width: 700px) 88vw, (max-width: 950px) 42vw, 440px"
              className="portrait-image"
            />
          </div>
        </div>
      </section>

      <section className="about-channels">
        <div className="section-wrap">
          <div className="section-heading">
            <div>
              <p className="eyebrow"><span /> THREE CHANNELS, MORE TO EXPLORE</p>
              <h2>Find your <em>perspective.</em></h2>
            </div>
            <p className="channels-intro">Each channel brings its own focus to the stories and questions worth discussing.</p>
          </div>
          <div className="channel-cards">
            {channels.map((channel, index) => (
              <article className={`channel-card about-channel-card channel-card-${channel.accent}`} key={channel.id}>
                <div className="channel-card-top">
                  <span className="about-channel-youtube" aria-hidden="true">
                    <svg viewBox="0 0 24 24"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.6 3.6 12 3.6 12 3.6s-7.6 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.8.5 9.4.5 9.4.5s7.6 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z" /></svg>
                  </span>
                  <span className="about-channel-number">CHANNEL 0{index + 1}</span>
                </div>
                <h3>{channel.name}</h3>
                <p>{channel.description}</p>
                <a className="channel-card-link" href={channel.url} target="_blank" rel="noreferrer">
                  <span className="about-channel-cta">
                    <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.6 3.6 12 3.6 12 3.6s-7.6 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.8.5 9.4.5 9.4.5s7.6 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z" /></svg>
                    <span className="about-channel-cta-copy">
                      <small>VISIT CHANNEL</small>
                      <b>Watch on YouTube</b>
                    </span>
                    <span className="about-channel-cta-arrow" aria-hidden="true">↗</span>
                  </span>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-contact section-wrap">
        <div>
          <p className="eyebrow"><span /> JOIN THE CONVERSATION</p>
          <h2>Have a story or a question?</h2>
          <p>We welcome your feedback and messages from viewers.</p>
        </div>
        <Link className="button button-dark" href="/contact">Contact us <span aria-hidden="true">↗</span></Link>
      </section>
    </main>
  );
}
