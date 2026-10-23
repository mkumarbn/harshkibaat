import Image from "next/image";
import type { Metadata } from "next";
import ChannelBadge from "@/components/channel-badge";
import ChannelSection from "@/components/channel-section";
import SocialIcon, { socialLinks } from "@/components/social-icon";
import { channels } from "@/lib/channels";
import { getChannelStats, getRecentFeeds } from "@/lib/youtube";

export const metadata: Metadata = {
  title: "Harsh ki Baat | Hindi news and current affairs",
  description:
    "Catch the latest Hindi news, live discussions and analysis from Harsh ki Baat Live, Global Harsh and Harsh Kumar.",
  alternates: { canonical: "/" },
};

const heroSocialIds = ["facebook", "x", "instagram", "youtube"];
const heroSocialLinks = socialLinks.filter((link) => heroSocialIds.includes(link.id));

export default async function HomePage() {
  const [feeds, channelStats] = await Promise.all([getRecentFeeds(), getChannelStats()]);

  return (
    <main id="main-content">
      <section className="profile-hero">
        <div className="profile-hero-inner section-wrap">
          <div className="profile-photo">
            <Image
              src="/harsh-kumar-portrait.jpg"
              alt="Harsh Kumar, editor-in-chief of Harsh ki Baat"
              fill
              priority
              sizes="(max-width: 700px) 42vw, 380px"
            />
          </div>

          <div className="profile-title">
            <p className="profile-kicker">Editor-in-chief · Harsh Kumar</p>
            <h1>Harsh ki <span>Baat</span></h1>
            <ul className="profile-social" aria-label="Follow Harsh ki Baat">
              {heroSocialLinks.map((link) => (
                <li key={link.id}>
                  <a className={`profile-social-link social-${link.id}`} href={link.href} target="_blank" rel="noreferrer" aria-label={link.label} title={link.label}>
                    <SocialIcon id={link.id} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="profile-details">
            <p className="profile-description">
              Three decades in print journalism, now on YouTube. Hindi news, current affairs and
              straight-talking analysis — live, every day.
            </p>
            {channelStats && (
              <dl className="profile-stats">
                <div><dt>Subscribers</dt><dd>{channelStats.subscribers}</dd></div>
                <div><dt>Videos</dt><dd>{channelStats.videos}</dd></div>
              </dl>
            )}
            <ul className="profile-channels" aria-label="Our YouTube channels">
              {channels.map((channel) => (
                <li key={channel.id}>
                  <a href={channel.url} target="_blank" rel="noreferrer" aria-label={`${channel.name} on YouTube`}>
                    <ChannelBadge channel={channel} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {channels.map((channel) => {
        const feed = feeds.find((item) => item.channel.id === channel.id) ?? { channel, videos: [], nextPageToken: null };
        return <ChannelSection key={channel.id} feed={feed} />;
      })}
    </main>
  );
}
