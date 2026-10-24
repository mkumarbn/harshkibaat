import type { Metadata, Viewport } from "next";
import Link from "next/link";
import Image from "next/image";
import MainNav from "@/components/main-nav";
import PlayIcon from "@/components/play-icon";
import SocialIcon, { socialLinks } from "@/components/social-icon";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://harshkibaat.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Harsh ki Baat | Hindi news and analysis",
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
    title: "Harsh ki Baat | Hindi news and analysis",
    description:
      "The latest conversations, current affairs and analysis from all three Harsh ki Baat YouTube channels.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Harsh ki Baat | Hindi news and analysis",
    description: "Latest videos and conversations from all three Harsh ki Baat channels.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0e1a30",
  colorScheme: "light",
};

const whatsappUrl = socialLinks.find((link) => link.id === "whatsapp")!.href;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <header className="site-header">
          <div className="header-inner">
            <Link className="brand" href="/home" aria-label="Harsh ki Baat home">
              <span className="brand-photo">
                <Image src="/harsh-kumar-portrait.jpg" alt="" fill sizes="48px" priority />
              </span>
              <span className="brand-text">
                <span className="brand-name">Harsh ki <b>Baat</b></span>
                <span className="brand-tagline">Hindi news &amp; analysis</span>
              </span>
            </Link>
            <nav className="header-connect" aria-label="Social media and contact">
              {socialLinks.map((link) => (
                <a
                  key={link.id}
                  className={`header-icon-link social-${link.id}`}
                  href={link.href}
                  {...(link.id === "email" ? {} : { target: "_blank", rel: "noreferrer" })}
                  aria-label={link.label}
                  title={link.label}
                >
                  <SocialIcon id={link.id} />
                </a>
              ))}
            </nav>
            <a className="header-subscribe" href="https://www.youtube.com/@harshkibaatLIVE" target="_blank" rel="noreferrer">
              <PlayIcon /> Subscribe
            </a>
          </div>
          <MainNav />
        </header>
        {children}
        <footer className="site-footer">
          <div className="footer-inner">
            <div className="footer-main">
              <div className="footer-about">
                <Link className="footer-brand" href="/home" aria-label="Harsh ki Baat home">
                  <span className="brand-photo">
                    <Image src="/harsh-kumar-portrait.jpg" alt="" fill sizes="40px" />
                  </span>
                  <span>Harsh ki <b>Baat</b></span>
                </Link>
                <p>Unfiltered opinions, political reality, and straight-to-the-point breakdowns every day.</p>
              </div>
              <div className="footer-contact">
                <span>GET IN TOUCH</span>
                <a href="mailto:harsh-kumar@outlook.com">harsh-kumar@outlook.com</a>
                <a href={whatsappUrl} target="_blank" rel="noreferrer">WhatsApp us <span aria-hidden="true">↗</span></a>
              </div>
              <nav aria-label="Quick links">
                <Link href="/home">Home</Link>
                <Link href="/videos">Videos</Link>
                <Link href="/about-us">About</Link>
                <Link href="/contact">Contact</Link>
                <Link href="/terms-and-conditions">Terms &amp; Conditions</Link>
              </nav>
              <div className="footer-social" aria-label="Stay connected">
                <a href="https://www.youtube.com/@harshkibaatLIVE" target="_blank" rel="noreferrer">YouTube</a>
                <a href="https://www.instagram.com/harshkibaatlive/?hl=en" target="_blank" rel="noreferrer">Instagram</a>
                <a href="https://www.facebook.com/harshkibaatLIVE/" target="_blank" rel="noreferrer">Facebook</a>
                <a href="https://x.com/harshktweets" target="_blank" rel="noreferrer">X</a>
                <a href="https://whatsapp.com/channel/0029Va8no0142DcmHeE13N1u" target="_blank" rel="noreferrer">WhatsApp channel</a>
                <a href="https://harsh-ki-baat.blogspot.com/" target="_blank" rel="noreferrer">Blog</a>
                <a href="https://paypal.me/harshkibaat" target="_blank" rel="noreferrer">Support</a>
              </div>
            </div>
            <small>© {new Date().getFullYear()} Harsh ki Baat. All rights reserved.</small>
          </div>
        </footer>
      </body>
    </html>
  );
}
