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
    name: "Harsh ki Baat Live",
    handle: "@harshkibaatLIVE",
    url: "https://www.youtube.com/@harshkibaatLIVE",
    accent: "red",
    description: "Live Hindi news, current affairs and sharp conversations.",
  },
  {
    id: "UCxhSggLG7BwfesenFaLuTMw",
    name: "Harsh Kumar",
    handle: "@HarshKumarSingh",
    url: "https://www.youtube.com/@HarshKumarSingh",
    accent: "gold",
    description: "In-depth conversations and perspectives from Harsh Kumar.",
  },
  {
    id: "UCf2b07fjX6qlQh_pPUOB2Ew",
    name: "Global Harsh",
    handle: "@GlobalHarsh",
    url: "https://www.youtube.com/@GlobalHarsh",
    accent: "blue",
    description: "Stories and analysis from India and around the world.",
  },
];

export function findChannel(id: string) {
  return channels.find((channel) => channel.id === id);
}
