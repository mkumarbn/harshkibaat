import Image from "next/image";
import ChannelBadge from "@/components/channel-badge";
import VideoPlayerButton from "@/components/video-player";
import { formatVideoDate, type ChannelFeed } from "@/lib/channels";

const LIST_LENGTH = 5;

export default function ChannelSection({ feed }: { feed: ChannelFeed }) {
  const { channel, videos } = feed;
  const [lead, ...rest] = videos;
  const headingId = `channel-${channel.id}`;

  return (
    <section className={`channel-section channel-${channel.accent}`} aria-labelledby={headingId}>
      <div className="section-wrap">
        <div className="channel-section-heading">
          <h2 id={headingId}><ChannelBadge channel={channel} /></h2>
          <a className="channel-section-link" href={channel.url} target="_blank" rel="noreferrer">
            View channel <span aria-hidden="true">↗</span>
          </a>
        </div>

        {lead ? (
          <div className="channel-section-grid">
            <article className="lead-video">
              <VideoPlayerButton className="lead-video-thumb" video={lead} ariaLabel={`Play: ${lead.title}`}>
                <Image src={lead.thumbnail} alt="" width={480} height={360} unoptimized />
                <span className="lead-video-play" aria-hidden="true">▶</span>
                <span className="lead-video-tag">Latest</span>
              </VideoPlayerButton>
              <h3>
                <VideoPlayerButton className="video-title-button" video={lead} ariaLabel={`Play: ${lead.title}`}>
                  {lead.title}
                </VideoPlayerButton>
              </h3>
              <p className="video-byline">
                <span>{channel.name}</span>
                <time dateTime={lead.publishedAt}>{formatVideoDate(lead.publishedAt)}</time>
              </p>
            </article>

            <ol className="video-list" aria-label={`More from ${channel.name}`}>
              {rest.slice(0, LIST_LENGTH).map((video) => (
                <li className="video-list-item" key={video.id}>
                  <VideoPlayerButton className="video-list-thumb" video={video} ariaLabel={`Play: ${video.title}`}>
                    <Image src={video.thumbnail} alt="" width={480} height={360} unoptimized loading="lazy" />
                    <span className="video-list-play" aria-hidden="true">▶</span>
                  </VideoPlayerButton>
                  <div className="video-list-body">
                    <h4>
                      <VideoPlayerButton className="video-title-button" video={video} ariaLabel={`Play: ${video.title}`}>
                        {video.title}
                      </VideoPlayerButton>
                    </h4>
                    <time dateTime={video.publishedAt}>{formatVideoDate(video.publishedAt)}</time>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        ) : (
          <p className="channel-video-unavailable" role="status">
            {feed.error ?? "No recent videos are available right now."}
          </p>
        )}
      </div>
    </section>
  );
}
