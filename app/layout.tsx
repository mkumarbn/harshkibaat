import type { Metadata, Viewport } from "next";
import Link from "next/link";
import Image from "next/image";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://harshkibaat.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Harsh ki Baat | News, views & conversations",
    template: "%s | Harsh ki Baat",
  },
  description:
    "Watch the latest Hindi news, live discussions and thoughtful analysis from Harsh ki Baat Live, Global Harsh and Harsh Kumar.",
  applicationName: "Harsh ki Baat",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "Harsh ki Baat",
    title: "Harsh ki Baat | News, views & conversations",
    description:
      "The latest conversations, current affairs and analysis from all three Harsh ki Baat YouTube channels.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Harsh ki Baat | News, views & conversations",
    description: "Latest videos and conversations from all three Harsh ki Baat channels.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <header className="site-header">
          <div className="header-inner">
            <Link className="brand" href="/" aria-label="Harsh ki Baat home">
              <span className="brand-photo">
                <Image src="/harsh-kumar.png" alt="" fill sizes="44px" priority />
              </span>
              <span className="brand-name">harsh ki <b>baat</b><small>NEWS · VIEWS · CONVERSATIONS</small></span>
            </Link>
            <nav className="main-nav" aria-label="Main navigation">
              <Link href="/">Home</Link>
              <Link href="/videos">Videos</Link>
              <Link href="/about">About</Link>
              <Link href="/contact">Contact</Link>
            </nav>
            <a
              className="header-whatsapp"
              href="https://wa.me/919897735444?text=Hello%20Harsh%20ki%20Baat"
              target="_blank"
              rel="noreferrer"
              aria-label="Chat with Harsh ki Baat on WhatsApp"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <path d="M20.52 3.48A11.85 11.85 0 0 0 12.08 0C5.5 0 .15 5.34.15 11.92c0 2.1.55 4.15 1.6 5.96L.05 24l6.28-1.65a11.9 11.9 0 0 0 5.74 1.46h.01c6.57 0 11.92-5.35 11.92-11.93 0-3.19-1.24-6.19-3.48-8.4ZM12.08 21.8h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.73.98.99-3.63-.24-.37a9.87 9.87 0 0 1-1.52-5.27c0-5.47 4.45-9.92 9.92-9.92 2.65 0 5.14 1.03 7.01 2.91a9.87 9.87 0 0 1 2.9 7.02c0 5.47-4.45 9.92-9.92 9.92Zm5.44-7.43c-.3-.15-1.76-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.47-2.4-1.48-.89-.79-1.49-1.76-1.66-2.06-.18-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.09 4.48.71.31 1.27.5 1.7.64.72.23 1.37.2 1.89.12.58-.09 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z" />
              </svg>
              <span>Chat on WhatsApp</span>
            </a>
            <a className="header-subscribe" href="https://www.youtube.com/@harshkibaatLIVE" target="_blank" rel="noreferrer">
              <span aria-hidden="true">▶</span> Subscribe
            </a>
          </div>
        </header>
        {children}
        <footer className="site-footer">
          <div className="footer-inner">
            <Link className="footer-brand" href="/">harsh ki <b>baat</b></Link>
            <p>News, views &amp; conversations that matter.</p>
            <nav aria-label="Social media">
              <Link href="/about">About</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/videos">Videos</Link>
              <a href="https://www.youtube.com/@harshkibaatLIVE" target="_blank" rel="noreferrer">YouTube</a>
              <a href="https://www.instagram.com/harshkibaatlive/?hl=en" target="_blank" rel="noreferrer">Instagram</a>
              <a href="https://www.facebook.com/harshkibaatLIVE/" target="_blank" rel="noreferrer">Facebook</a>
              <a href="https://x.com/harshktweets?lang=en" target="_blank" rel="noreferrer">X</a>
              <a href="https://harsh-ki-baat.blogspot.com/" target="_blank" rel="noreferrer">Blog</a>
            </nav>
            <small>© {new Date().getFullYear()} Harsh ki Baat. All rights reserved.</small>
          </div>
        </footer>
      </body>
    </html>
  );
}
