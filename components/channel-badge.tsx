import type { Channel } from "@/lib/channels";
import SocialIcon from "@/components/social-icon";

// Pill styled after the channel labels on Harsh ki Baat's YouTube thumbnails.
export default function ChannelBadge({ channel }: { channel: Channel }) {
  const isLive = channel.name.endsWith(" LIVE");
  const name = isLive ? channel.name.slice(0, -" LIVE".length) : channel.name;

  return (
    <span className={`channel-badge channel-badge-${channel.accent}`}>
      <span className="channel-badge-icon"><SocialIcon id="youtube" /></span>
      <span className="channel-badge-name">{name}</span>
      {isLive && <span className="channel-badge-live">LIVE</span>}
    </span>
  );
}
