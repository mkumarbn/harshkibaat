import Image from "next/image";
import PlayIcon from "@/components/play-icon";
import VideoPlayerButton from "@/components/video-player";
import { findChannel, formatVideoDate, type Video } from "@/lib/channels";

export default function VideoCard({ video }: { video: Video }) {
  const accent = findChannel(video.channelId)?.accent ?? "red";

  return (
    <article className={`video-card channel-${accent}`}>
      <VideoPlayerButton className="video-thumb" video={video} ariaLabel={`Play: ${video.title}`}>
        <Image src={video.thumbnail} alt="" width={480} height={360} unoptimized loading="lazy" />
        <span className="thumb-play"><PlayIcon /></span>
      </VideoPlayerButton>
      <div className="video-card-body">
        <p className="video-label">
          <span className="video-label-channel video-label-filled">{video.channelName}</span>
        </p>
        <h3>
          <VideoPlayerButton className="video-title-button" video={video} ariaLabel={`Play: ${video.title}`}>
            {video.title}
          </VideoPlayerButton>
        </h3>
        <time className="video-date" dateTime={video.publishedAt}>{formatVideoDate(video.publishedAt)}</time>
      </div>
    </article>
  );
}
