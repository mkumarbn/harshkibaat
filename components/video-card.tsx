import type { Video } from "@/lib/channels";
import Image from "next/image";
import VideoPlayerButton from "@/components/video-player";

export default function VideoCard({ video }: { video: Video }) {
  const published = new Date(video.publishedAt);
  const dateLabel = Number.isNaN(published.getTime())
    ? "Recently published"
    : new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric" }).format(published);

  return (
    <article className="video-card">
      <VideoPlayerButton className="video-thumb" video={video} ariaLabel={`Play: ${video.title}`}>
        <Image src={video.thumbnail} alt="" width={480} height={360} unoptimized loading="lazy" />
        <span className="thumb-play" aria-hidden="true">▶</span>
        <span className="thumb-duration">PLAY VIDEO</span>
      </VideoPlayerButton>
      <div className="video-card-body">
        <div className="video-meta"><span>{video.channelName}</span><time dateTime={video.publishedAt}>{dateLabel}</time></div>
        <h3>
          <VideoPlayerButton className="video-title-button" video={video} ariaLabel={`Play: ${video.title}`}>
            {video.title}
          </VideoPlayerButton>
        </h3>
      </div>
    </article>
  );
}
