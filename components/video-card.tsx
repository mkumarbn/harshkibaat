import Image from "next/image";
import VideoPlayerButton from "@/components/video-player";
import { findChannel, formatVideoDate, type Video } from "@/lib/channels";

export default function VideoCard({ video }: { video: Video }) {
  const accent = findChannel(video.channelId)?.accent ?? "red";

  return (
    <article className={`video-card channel-${accent}`}>
      <VideoPlayerButton className="video-thumb" video={video} ariaLabel={`Play: ${video.title}`}>
        <Image src={video.thumbnail} alt="" width={480} height={360} unoptimized loading="lazy" />
        <span className="video-channel-tag" aria-hidden="true">{video.channelName}</span>
        <span className="thumb-play" aria-hidden="true">▶</span>
      </VideoPlayerButton>
      <div className="video-card-body">
        <h3>
          <VideoPlayerButton className="video-title-button" video={video} ariaLabel={`Play: ${video.title}`}>
            {video.title}
          </VideoPlayerButton>
        </h3>
        <p className="video-byline">
          <span>{video.channelName}</span>
          <time dateTime={video.publishedAt}>{formatVideoDate(video.publishedAt)}</time>
        </p>
      </div>
    </article>
  );
}
