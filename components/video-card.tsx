import type { Video } from "@/lib/channels";
import Image from "next/image";

export default function VideoCard({ video }: { video: Video }) {
  const published = new Date(video.publishedAt);
  const dateLabel = Number.isNaN(published.getTime())
    ? "Recently published"
    : new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric" }).format(published);

  return (
    <article className="video-card">
      <a className="video-thumb" href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noreferrer" aria-label={`Watch: ${video.title}`}>
        <Image src={video.thumbnail} alt="" width={480} height={360} unoptimized loading="lazy" />
        <span className="thumb-play" aria-hidden="true">▶</span>
        <span className="thumb-duration">WATCH ON YOUTUBE</span>
      </a>
      <div className="video-card-body">
        <div className="video-meta"><span>{video.channelName}</span><time dateTime={video.publishedAt}>{dateLabel}</time></div>
        <h3><a href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noreferrer">{video.title}</a></h3>
      </div>
    </article>
  );
}
