import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { channels } from "@/lib/channels";

export const metadata: Metadata = {
  title: "About Harsh ki Baat",
  description:
    "Learn about Harsh ki Baat and its three YouTube channels covering Hindi news, current affairs and conversations.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Harsh ki Baat",
    description:
      "Meet Harsh Kumar and discover the three channels bringing news, views and conversations to Harsh ki Baat.",
    images: [{ url: "/harsh-kumar.png", alt: "Harsh Kumar" }],
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
            News, views and conversations for people who want to understand the stories shaping India and the world.
          </p>
          <p>
            Harsh ki Baat is a home for Hindi news, current affairs and analysis.
            On the daily live programme, viewers’ questions become part of the
            conversation—not just something to watch from the sidelines.
          </p>
          <p>
            Alongside the main show, Harsh Kumar and Global Harsh bring more
            perspectives on media, public life and the news of the day. Three
            channels, one shared invitation: stay curious and join in.
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
              src="/harsh-kumar.png"
              alt="Harsh Kumar"
              fill
              priority
              sizes="(max-width: 700px) 88vw, (max-width: 950px) 42vw, 440px"
              className="portrait-image"
            />
          </div>
          <div className="portrait-caption">
            <span className="portrait-caption-mark">HK</span>
            <span><b>Harsh Kumar</b><small>NEWS · VIEWS · CONVERSATIONS</small></span>
            <span className="portrait-caption-arrow" aria-hidden="true">↗</span>
          </div>
          <span className="portrait-index">01 <i>/</i> THE CONVERSATION</span>
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
              <article className={`channel-card channel-card-${channel.accent}`} key={channel.id}>
                <div className="channel-card-top"><span>CHANNEL 0{index + 1}</span><span aria-hidden="true">↗</span></div>
                <h3>{channel.name}</h3>
                <p>{channel.description}</p>
                <a className="channel-card-link" href={channel.url} target="_blank" rel="noreferrer">
                  Visit channel <span aria-hidden="true">→</span>
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
