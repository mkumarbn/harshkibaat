import { NextRequest, NextResponse } from "next/server";
import { findChannel } from "@/lib/channels";
import { getChannelPage } from "@/lib/youtube";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const channelId = request.nextUrl.searchParams.get("channel");
  const channel = channelId ? findChannel(channelId) : undefined;
  if (!channel) {
    return NextResponse.json({ error: "Choose one of the available channels." }, { status: 400 });
  }

  const pageToken = request.nextUrl.searchParams.get("pageToken") ?? undefined;
  if (pageToken && pageToken.length > 512) {
    return NextResponse.json({ error: "The page token is invalid." }, { status: 400 });
  }

  try {
    const result = await getChannelPage(channel, pageToken);
    return NextResponse.json(
      { videos: result.videos, nextPageToken: result.nextPageToken },
      { headers: { "Cache-Control": "public, s-maxage=900, stale-while-revalidate=3600" } },
    );
  } catch {
    console.error(`Could not load more videos for ${channel.name}.`);
    return NextResponse.json(
      { error: "Could not load more videos from YouTube. Please try again later." },
      { status: 502 },
    );
  }
}
