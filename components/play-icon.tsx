// An SVG triangle rather than the ▶ character, which iOS renders as a grey emoji.
export default function PlayIcon() {
  return (
    <svg className="play-icon" aria-hidden="true" viewBox="0 0 24 24"><path d="M7 4.5v15a1 1 0 0 0 1.52.85l12-7.5a1 1 0 0 0 0-1.7l-12-7.5A1 1 0 0 0 7 4.5Z" /></svg>
  );
}
