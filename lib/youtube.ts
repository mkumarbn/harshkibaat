import "server-only";
import { channels, type Channel, type ChannelFeed, type Video } from "@/lib/channels";

const YOUTUBE_API = "https://www.googleapis.com/youtube/v3";
const FEED_LIMIT = 15;

function decodeXml(value: string) {
  return value
    .replace(/&#x([0-9a-f]+);/gi, (_, code: string) =>
      String.fromCodePoint(Number.parseInt(code, 16)),
    )
    .replace(/&#(\d+);/g, (_, code: string) =>
      String.fromCodePoint(Number.parseInt(code, 10)),
    )
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'");
}

function readTag(xml: string, tag: string) {
  const escapedTag = tag.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = xml.match(new RegExp(`<${escapedTag}[^>]*>([\\s\\S]*?)<\\/${escapedTag}>`));
  return match?.[1] ? decodeXml(match[1].trim()) : "";
}

function parseFeed(xml: string, channel: Channel): Video[] {
  return [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].map(([, entry]) => {
    const thumbnail = entry.match(/<media:thumbnail[^>]*url="([^"]+)"/)?.[1];
    const id = readTag(entry, "yt:videoId");
    return {
      id,
      title: readTag(entry, "title"),
      description: readTag(entry, "media:description"),
      publishedAt: readTag(entry, "published"),
      thumbnail: thumbnail ? decodeXml(thumbnail) : `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
      channelId: channel.id,
      channelName: channel.name,
    };
  }).filter((video) => video.id && video.title);
}

async function fetchFeed(channel: Channel): Promise<ChannelFeed> {
  const response = await fetch(
    `https://www.youtube.com/feeds/videos.xml?channel_id=${encodeURIComponent(channel.id)}`,
    { next: { revalidate: 900 } },
  );
  if (!response.ok) {
    throw new Error(`YouTube feed returned ${response.status} for ${channel.name}.`);
  }
  const xml = await response.text();
  return {
    channel,
    videos: parseFeed(xml, channel).slice(0, FEED_LIMIT),
    nextPageToken: null,
  };
}

async function fetchApiVideos(
  channel: Channel,
  pageToken?: string,
  maxResults = 12,
): Promise<ChannelFeed> {
  const key = process.env.YOUTUBE_API_KEY;
  if (!key) {
    return fetchFeed(channel);
  }

  const channelUrl = new URL(`${YOUTUBE_API}/channels`);
  channelUrl.search = new URLSearchParams({
    part: "contentDetails",
    id: channel.id,
    key,
  }).toString();
  const channelResponse = await fetch(channelUrl, { next: { revalidate: 900 } });
  if (!channelResponse.ok) {
    throw new Error(`YouTube API returned ${channelResponse.status} for ${channel.name}.`);
  }
  const channelData = await channelResponse.json();
  const uploadsId = channelData.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;
  if (!uploadsId) {
    return { channel, videos: [], nextPageToken: null };
  }

  const playlistUrl = new URL(`${YOUTUBE_API}/playlistItems`);
  playlistUrl.search = new URLSearchParams({
    part: "snippet",
    playlistId: uploadsId,
    maxResults: String(maxResults),
    key,
    ...(pageToken ? { pageToken } : {}),
  }).toString();
  const playlistResponse = await fetch(playlistUrl, { next: { revalidate: 900 } });
  if (!playlistResponse.ok) {
    throw new Error(`YouTube API returned ${playlistResponse.status} for ${channel.name}.`);
  }
  const playlist = await playlistResponse.json();
  const videos: Video[] = (playlist.items ?? []).flatMap(
    (item: {
      snippet?: {
        title?: string;
        description?: string;
        publishedAt?: string;
        resourceId?: { videoId?: string };
        thumbnails?: { high?: { url?: string }; medium?: { url?: string } };
      };
    }) => {
      const snippet = item.snippet;
      const id = snippet?.resourceId?.videoId;
      if (!id || !snippet) return [];
      return [{
        id,
        title: snippet.title ?? "Untitled video",
        description: snippet.description ?? "",
        publishedAt: snippet.publishedAt ?? "",
        thumbnail:
          snippet.thumbnails?.high?.url ??
          snippet.thumbnails?.medium?.url ??
          `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
        channelId: channel.id,
        channelName: channel.name,
      }];
    },
  );

  return {
    channel,
    videos,
    nextPageToken: playlist.nextPageToken ?? null,
  };
}

export async function getRecentFeeds(): Promise<ChannelFeed[]> {
  return Promise.all(channels.map(async (channel) => {
    try {
      return process.env.YOUTUBE_API_KEY
        ? await fetchApiVideos(channel, undefined, FEED_LIMIT)
        : await fetchFeed(channel);
    } catch {
      console.error(`Could not load the ${channel.name} YouTube feed.`);
      return {
        channel,
        videos: [],
        nextPageToken: null,
        error: "This channel’s videos could not be loaded right now. Please try again shortly.",
      };
    }
  }));
}

export async function getChannelPage(
  channel: Channel,
  pageToken?: string,
): Promise<ChannelFeed> {
  return fetchApiVideos(channel, pageToken);
}

export function videosFromFeeds(feeds: ChannelFeed[]) {
  return feeds.flatMap((feed) => feed.videos).sort(
    (first, second) =>
      new Date(second.publishedAt).getTime() - new Date(first.publishedAt).getTime(),
  );
}
