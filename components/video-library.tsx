"use client";

import { useMemo, useState } from "react";
import type { ChannelFeed, Video } from "@/lib/channels";
import { channels } from "@/lib/channels";
import VideoCard from "@/components/video-card";

type SortOrder = "newest" | "oldest";
type VideoPageResponse = { videos: Video[]; nextPageToken: string | null; error?: string };

export default function VideoLibrary({ initialFeeds }: { initialFeeds: ChannelFeed[] }) {
  const [feeds, setFeeds] = useState(initialFeeds);
  const [selectedChannel, setSelectedChannel] = useState("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOrder>("newest");
  const [loadingChannel, setLoadingChannel] = useState<string | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  const videos = useMemo(() => {
    const matching = feeds
      .filter((feed) => selectedChannel === "all" || feed.channel.id === selectedChannel)
      .flatMap((feed) => feed.videos)
      .filter((video) => `${video.title} ${video.channelName}`.toLocaleLowerCase().includes(search.toLocaleLowerCase()));
    return matching.sort((first, second) => {
      const difference = new Date(first.publishedAt).getTime() - new Date(second.publishedAt).getTime();
      return sort === "newest" ? -difference : difference;
    });
  }, [feeds, search, selectedChannel, sort]);

  async function loadMore(feed: ChannelFeed) {
    setLoadingChannel(feed.channel.id);
    setLoadError(null);
    try {
      const params = new URLSearchParams({ channel: feed.channel.id });
      if (feed.nextPageToken) params.set("pageToken", feed.nextPageToken);
      const response = await fetch(`/api/videos?${params}`);
      const result: VideoPageResponse = await response.json();
      if (!response.ok) throw new Error(result.error ?? "Could not load more videos.");
      setFeeds((current) => current.map((item) => item.channel.id === feed.channel.id
        ? {
            ...item,
            videos: [...item.videos, ...result.videos.filter((video) =>
              !item.videos.some((existing) => existing.id === video.id),
            )],
            nextPageToken: result.nextPageToken,
          }
        : item));
    } catch (error) {
      setLoadError(error instanceof Error ? error.message : "Could not load more videos.");
    } finally {
      setLoadingChannel(null);
    }
  }

  async function loadMoreAll() {
    const pendingFeeds = feeds.filter((feed) => feed.nextPageToken);
    setLoadingChannel("all");
    setLoadError(null);
    try {
      const pages = await Promise.all(pendingFeeds.map(async (feed) => {
        const params = new URLSearchParams({
          channel: feed.channel.id,
          pageToken: feed.nextPageToken!,
        });
        const response = await fetch(`/api/videos?${params}`);
        const result: VideoPageResponse = await response.json();
        if (!response.ok) throw new Error(result.error ?? "Could not load more videos.");
        return { channelId: feed.channel.id, ...result };
      }));
      setFeeds((current) => current.map((feed) => {
        const page = pages.find((item) => item.channelId === feed.channel.id);
        if (!page) return feed;
        const newVideos = page.videos.filter(
          (video) => !feed.videos.some((existing) => existing.id === video.id),
        );
        return {
          ...feed,
          videos: [...feed.videos, ...newVideos],
          nextPageToken: page.nextPageToken,
        };
      }));
    } catch (error) {
      setLoadError(error instanceof Error ? error.message : "Could not load more videos.");
    } finally {
      setLoadingChannel(null);
    }
  }

  const activeFeed = feeds.find((feed) => feed.channel.id === selectedChannel);
  const feedsWithMore = feeds.filter((feed) => feed.nextPageToken);
  const hasMore = selectedChannel === "all"
    ? feedsWithMore.length > 0
    : Boolean(activeFeed?.nextPageToken);

  return (
    <section className="library-section section-wrap" aria-label="Video library">
      <div className="library-controls">
        <div className="filter-tabs" role="group" aria-label="Filter videos by channel">
          <button type="button" aria-pressed={selectedChannel === "all"} className={selectedChannel === "all" ? "active" : ""} onClick={() => setSelectedChannel("all")}>All channels</button>
          {channels.map((channel) => (
            <button type="button" aria-pressed={selectedChannel === channel.id} className={selectedChannel === channel.id ? "active" : ""} key={channel.id} onClick={() => setSelectedChannel(channel.id)}>{channel.name}</button>
          ))}
        </div>
        <div className="library-tools">
          <label className="search-box">
            <span className="sr-only">Search videos</span>
            <span aria-hidden="true">⌕</span>
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search videos" />
          </label>
          <label className="sort-box">
            <span className="sr-only">Sort videos</span>
            <select value={sort} onChange={(event) => setSort(event.target.value as SortOrder)}>
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
            </select>
          </label>
        </div>
      </div>

      {feeds.some((feed) => feed.error) && (
        <div className="feed-notice" role="status">
          {feeds.filter((feed) => feed.error).map((feed) => <p key={feed.channel.id}>{feed.error}</p>)}
        </div>
      )}
      {videos.length ? (
        <div className="video-grid">
          {videos.map((video) => <VideoCard key={video.id} video={video} />)}
        </div>
      ) : (
        <div className="feed-empty"><p>No videos match that search. Try a different title or channel.</p></div>
      )}

      {loadError && <p className="load-error" role="alert">{loadError}</p>}
      {hasMore && (
        <div className="load-more-wrap">
          <button
            className="button button-dark"
            disabled={loadingChannel !== null}
            onClick={() => selectedChannel === "all" ? loadMoreAll() : activeFeed && loadMore(activeFeed)}
          >
            {loadingChannel ? "Loading…" : "Load older videos"}
          </button>
        </div>
      )}
      {!hasMore && (
        <div className="archive-note">
          <p>Looking for older videos? Explore the full archive on YouTube.</p>
          <div className="archive-links">
            {(selectedChannel === "all" ? channels : channels.filter((channel) => channel.id === selectedChannel)).map((channel) => (
              <a href={channel.url} key={channel.id} target="_blank" rel="noreferrer">{channel.name} <span aria-hidden="true">↗</span></a>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
