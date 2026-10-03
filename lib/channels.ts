export type Channel = {
  id: string;
  name: string;
  handle: string;
  url: string;
  accent: "red" | "gold" | "blue";
  description: string;
};

export type Video = {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  thumbnail: string;
  channelId: string;
  channelName: string;
};

export type ChannelFeed = {
  channel: Channel;
  videos: Video[];
  nextPageToken: string | null;
  error?: string;
};

export const channels: Channel[] = [
  {
    id: "UCIUd9149-XvdV0giPROH-eg",
    name: "Harsh ki Baat LIVE",
    handle: "@harshkibaatLIVE",
    url: "https://www.youtube.com/@harshkibaatLIVE",
    accent: "red",
    description: "Catch up on the newest clips and daily analysis.",
  },
  {
    id: "UCxhSggLG7BwfesenFaLuTMw",
    name: "Harsh Kumar",
    handle: "@HarshKumarSingh",
    url: "https://www.youtube.com/@HarshKumarSingh",
    accent: "gold",
    description: "Breaking down news with context and clarity.",
  },
  {
    id: "UCf2b07fjX6qlQh_pPUOB2Ew",
    name: "Global Harsh",
    handle: "@GlobalHarsh",
    url: "https://www.youtube.com/@GlobalHarsh",
    accent: "blue",
    description: "Daily insights into global events that shape the world.",
  },
];

export function findChannel(id: string) {
  return channels.find((channel) => channel.id === id);
}
