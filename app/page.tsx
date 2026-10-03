import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import VideoCard from "@/components/video-card";
import VideoCarousel from "@/components/video-carousel";
import VideoPlayerButton from "@/components/video-player";
import { channels } from "@/lib/channels";
import { getChannelStats, getRecentFeeds, videosFromFeeds } from "@/lib/youtube";

export const metadata: Metadata = {
  title: "Harsh ki Baat | Hindi news and current affairs",
  description:
    "Catch the latest Hindi news, live discussions and analysis from Harsh ki Baat Live, Global Harsh and Harsh Kumar.",
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const [feeds, channelStats] = await Promise.all([getRecentFeeds(), getChannelStats()]);
  const allVideos = videosFromFeeds(feeds);
  const leadVideo = allVideos[0];

  return (
    <main id="main-content">
      <section className="hero section-wrap">
        <div className="hero-copy">
          <p className="eyebrow"><span /> THE LATEST FROM HARSH KI BAAT</p>
          <h1>Make sense of<br />what <em>matters.</em></h1>
          <p className="hero-description">
            Unfiltered opinions, political reality, and straight-to-the-point breakdowns every day.
          </p>
          <div className="hero-actions">
            <Link className="button button-dark" href="/videos">Explore latest videos <span aria-hidden="true">↗</span></Link>
            <a className="text-link" href="https://www.youtube.com/@harshkibaatLIVE" target="_blank" rel="noreferrer">
              Visit our YouTube <span aria-hidden="true">→</span>
            </a>
          </div>
          <div className="hero-footnote"><span className="live-dot" /> FRESH PERSPECTIVES, STRAIGHT FROM THE SOURCE</div>
        </div>
        <div className="hero-art" aria-label="Latest video from the Harsh ki Baat channels">
          {leadVideo ? (
            <VideoPlayerButton
              className="hero-video"
              video={leadVideo}
              ariaLabel={`Play latest video: ${leadVideo.title}`}
            >
              <Image src={leadVideo.thumbnail} alt="" fill priority unoptimized sizes="(max-width: 700px) 100vw, 50vw" />
              <span className="hero-video-shade" />
              <span className="play-button" aria-label="Play latest video">▶</span>
              <span className="hero-video-label"><span className="live-dot" /> LATEST VIDEO · {leadVideo.channelName.toUpperCase()}</span>
              <span className="hero-video-title">{leadVideo.title}</span>
            </VideoPlayerButton>
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

      <section className="proof-strip" aria-label="Harsh ki Baat at a glance">
        <div className="proof-strip-inner">
          <article className="proof-item">
            <strong>{channelStats?.subscribers ?? "Unavailable"}</strong>
            <span>YouTube subscribers</span>
          </article>
          <article className="proof-item">
            <strong>{channelStats?.videos ?? "Unavailable"}</strong>
            <span>YouTube videos</span>
          </article>
          <article className="proof-item">
            <strong>Daily</strong>
            <span>Live streams</span>
          </article>
          <article className="proof-item">
            <strong>Sharp</strong>
            <span>Editorials</span>
          </article>
          <article className="proof-item">
            <strong>Trusted</strong>
            <span>Commentary</span>
          </article>
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
            <p className="eyebrow"><span /> NEW FROM ALL THREE CHANNELS</p>
            <h2>Latest <em>uploads.</em></h2>
          </div>
          <Link className="text-link" href="/videos">All videos <span aria-hidden="true">↗</span></Link>
        </div>
        <div className="channel-video-groups">
          {[channels[0], channels[2], channels[1]].map((channel) => {
            const feed = feeds.find((item) => item.channel.id === channel.id);
            const channelVideos = feed?.videos.slice(0, 10) ?? [];
            return (
              <section className="channel-video-group" key={channel.id} aria-labelledby={`recent-${channel.id}`}>
                <div className="channel-video-heading">
                  <div>
                    <h3 id={`recent-${channel.id}`}>{channel.name}</h3>
                    <p>{channel.description}</p>
                  </div>
                  <a className="text-link" href={channel.url} target="_blank" rel="noreferrer">View channel <span aria-hidden="true">↗</span></a>
                </div>
                {channelVideos.length ? (
                  <VideoCarousel label={channel.name}>
                    {channelVideos.map((video) => <VideoCard key={video.id} video={video} />)}
                  </VideoCarousel>
                ) : (
                  <p className="channel-video-unavailable" role="status">
                    {feed?.error ?? "No recent videos are available right now."}
                  </p>
                )}
              </section>
            );
          })}
        </div>
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
                  {latest && (
                    <VideoPlayerButton
                      className="channel-card-latest"
                      video={latest}
                      ariaLabel={`Play latest video from ${channel.name}: ${latest.title}`}
                    >
                      <Image src={latest.thumbnail} alt="" width={320} height={180} unoptimized loading="lazy" />
                      <span className="channel-card-latest-play" aria-hidden="true">▶</span>
                      <span className="channel-card-latest-title">Latest video: {latest.title}</span>
                    </VideoPlayerButton>
                  )}
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
          <a href="https://www.instagram.com/harshksingh/" target="_blank" rel="noreferrer">Instagram <span>↗</span></a>
          <a href="https://www.facebook.com/harshkibaat/" target="_blank" rel="noreferrer">Facebook <span>↗</span></a>
          <a href="https://twitter.com/harshktweets" target="_blank" rel="noreferrer">X / Twitter <span>↗</span></a>
          <a href="https://whatsapp.com/channel/0029Va8no0142DcmHeE13N1u" target="_blank" rel="noreferrer">WhatsApp channel <span>↗</span></a>
          <a href="https://paypal.me/harshkibaat" target="_blank" rel="noreferrer">Support the channel <span>↗</span></a>
          <a href="https://harsh-ki-baat.blogspot.com/" target="_blank" rel="noreferrer">Read the blog <span>↗</span></a>
        </div>
      </section>
    </main>
  );
}
