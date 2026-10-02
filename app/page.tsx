import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import VideoCard from "@/components/video-card";
import { channels } from "@/lib/channels";
import { getRecentFeeds, videosFromFeeds } from "@/lib/youtube";

export const metadata: Metadata = {
  title: "Harsh ki Baat | Hindi news, views & conversations",
  description:
    "Catch the latest Hindi news, live discussions and analysis from Harsh ki Baat Live, Global Harsh and Harsh Kumar.",
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const feeds = await getRecentFeeds();
  const allVideos = videosFromFeeds(feeds);
  const leadVideo = feeds[0]?.videos[0];
  const hasAnyVideos = allVideos.length > 0;

  return (
    <main id="main-content">
      <div className="ticker">
        <div className="ticker-inner">
          <span className="live-dot" /> INDEPENDENT PERSPECTIVES <span className="ticker-divider">/</span>
          NEWS, VIEWS &amp; CONVERSATIONS <span className="ticker-divider">/</span>
          <span>THREE CHANNELS. ONE COMMUNITY.</span>
        </div>
      </div>

      <section className="hero section-wrap">
        <div className="hero-copy">
          <p className="eyebrow"><span /> THE LATEST FROM HARSH KI BAAT</p>
          <h1>Make sense of<br />what <em>matters.</em></h1>
          <p className="hero-description">
            News, current affairs and straight-talking conversations — bringing you closer to the stories shaping India and the world.
          </p>
          <div className="hero-actions">
            <Link className="button button-dark" href="/videos">Explore latest videos <span aria-hidden="true">↗</span></Link>
            <a className="text-link" href="https://www.youtube.com/@harshkibaatLIVE" target="_blank" rel="noreferrer">
              Visit our YouTube <span aria-hidden="true">→</span>
            </a>
          </div>
          <div className="hero-footnote"><span className="live-dot" /> FRESH PERSPECTIVES, STRAIGHT FROM THE SOURCE</div>
        </div>
        <div className="hero-art" aria-label="Latest video from Harsh ki Baat Live">
          {leadVideo ? (
            <a className="hero-video" href={`https://www.youtube.com/watch?v=${leadVideo.id}`} target="_blank" rel="noreferrer">
              {/* YouTube-hosted thumbnails keep the live feed current without storing copies. */}
              <Image src={leadVideo.thumbnail} alt="" fill priority unoptimized sizes="(max-width: 700px) 100vw, 50vw" />
              <span className="hero-video-shade" />
              <span className="play-button" aria-label="Play latest video">▶</span>
              <span className="hero-video-label"><span className="live-dot" /> LATEST ON HARSH KI BAAT LIVE</span>
              <span className="hero-video-title">{leadVideo.title}</span>
            </a>
          ) : (
            <div className="hero-art-empty">
              <span className="hero-monogram">H<span>K</span></span>
              <span>Stories worth your time.</span>
            </div>
          )}
          <span className="art-corner art-corner-top" />
          <span className="art-corner art-corner-bottom" />
        </div>
      </section>

      <section className="channel-strip" aria-label="Our channels">
        <div className="channel-strip-inner">
          <span className="strip-label">THREE CHANNELS</span>
          {channels.map((channel, index) => (
            <a className={`strip-channel accent-${channel.accent}`} href={channel.url} target="_blank" rel="noreferrer" key={channel.id}>
              <span className="channel-number">0{index + 1}</span>
              <span>{channel.name}</span>
              <span className="strip-arrow" aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      </section>

      <section className="latest-section section-wrap">
        <div className="section-heading">
          <div>
            <p className="eyebrow"><span /> STRAIGHT FROM THE CHANNELS</p>
            <h2>The latest <em>conversation.</em></h2>
          </div>
          <Link className="text-link" href="/videos">All videos <span aria-hidden="true">↗</span></Link>
        </div>
        {hasAnyVideos ? (
          <div className="video-grid">
            {allVideos.slice(0, 6).map((video) => <VideoCard key={video.id} video={video} />)}
          </div>
        ) : (
          <div className="feed-empty">
            <p>{feeds.find((feed) => feed.error)?.error ?? "New videos will appear here as soon as they are published."}</p>
            <Link className="text-link" href="/videos">Browse all channels <span aria-hidden="true">→</span></Link>
          </div>
        )}
      </section>

      <section className="channels-section">
        <div className="section-wrap">
          <div className="section-heading">
            <div>
              <p className="eyebrow"><span /> FOLLOW THE FULL STORY</p>
              <h2>One voice. <em>Three perspectives.</em></h2>
            </div>
            <p className="channels-intro">Find your point of view, wherever the conversation takes you.</p>
          </div>
          <div className="channel-cards">
            {channels.map((channel, index) => {
              const feed = feeds.find((item) => item.channel.id === channel.id);
              const latest = feed?.videos[0];
              return (
                <article className={`channel-card channel-card-${channel.accent}`} key={channel.id}>
                  <div className="channel-card-top"><span>CHANNEL 0{index + 1}</span><span aria-hidden="true">↗</span></div>
                  <h3>{channel.name}</h3>
                  <p>{channel.description}</p>
                  {latest && <p className="channel-card-latest"><span className="live-dot" /> LATEST: {latest.title}</p>}
                  <a className="channel-card-link" href={channel.url} target="_blank" rel="noreferrer">
                    Visit channel <span aria-hidden="true">→</span>
                  </a>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="follow-section section-wrap">
        <div>
          <p className="eyebrow"><span /> THE CONVERSATION CONTINUES</p>
          <h2>Stay in the <em>conversation.</em></h2>
          <p>Follow Harsh ki Baat across your favourite platforms.</p>
        </div>
        <div className="social-links">
          <a href="https://www.instagram.com/harshkibaatlive/?hl=en" target="_blank" rel="noreferrer">Instagram <span>↗</span></a>
          <a href="https://www.facebook.com/harshkibaatLIVE/" target="_blank" rel="noreferrer">Facebook <span>↗</span></a>
          <a href="https://x.com/harshktweets?lang=en" target="_blank" rel="noreferrer">X / Twitter <span>↗</span></a>
          <a href="https://harsh-ki-baat.blogspot.com/" target="_blank" rel="noreferrer">Read the blog <span>↗</span></a>
        </div>
      </section>
    </main>
  );
}
