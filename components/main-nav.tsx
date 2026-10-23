"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/home", label: "Home", paths: ["/", "/home"] },
  { href: "/videos", label: "Videos", paths: ["/videos"] },
  { href: "/about-us", label: "About", paths: ["/about-us", "/about"] },
  { href: "/contact", label: "Contact", paths: ["/contact"] },
  { href: "/terms-and-conditions", label: "Terms", paths: ["/terms-and-conditions"] },
];

export default function MainNav() {
  const pathname = usePathname();

  return (
    <nav className="main-nav" aria-label="Main navigation">
      <div className="main-nav-inner">
        {links.map((link) => (
          <Link key={link.href} href={link.href} aria-current={link.paths.includes(pathname) ? "page" : undefined}>
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
