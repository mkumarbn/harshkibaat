import type { Metadata } from "next";
import VideoLibrary from "@/components/video-library";
import { getRecentFeeds } from "@/lib/youtube";

export const metadata: Metadata = {
  title: "Latest & archive videos",
  description:
    "Browse recent and archive videos from Harsh ki Baat Live, Harsh Kumar and Global Harsh.",
  alternates: { canonical: "/videos" },
};

export default async function VideosPage() {
  const feeds = await getRecentFeeds();
  return (
    <main id="main-content">
      <section className="page-heading section-wrap">
        <p className="eyebrow"><span /> THE VIDEO LIBRARY</p>
        <h1>Every angle.<br /><em>All in one place.</em></h1>
        <p>Explore the latest videos from Harsh ki Baat LIVE, Global Harsh and Harsh Kumar. Search by topic, filter by channel, and play videos right here.</p>
      </section>
      <VideoLibrary initialFeeds={feeds} />
    </main>
  );
}
