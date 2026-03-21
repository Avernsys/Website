import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/Button";
import { siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: `Page not found | ${siteConfig.name}` },
  description: "The page you requested does not exist or has been moved.",
  robots: { index: false, follow: true },
};

const links = [
  { href: "/", label: "Home" },
  { href: "/chaptersys", label: "ChapterSys" },
  { href: "/primeroute", label: "PrimeRoute" },
  { href: "/contact", label: "Contact" },
] as const;

export default function NotFound() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center gradient-mesh grain overflow-hidden px-6">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-white/[0.015] blur-[100px]" />

      <div className="relative z-10 text-center max-w-lg">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-gray-500 mb-6">
          404
        </p>
        <h1 className="text-hero">Page not found</h1>
        <p className="text-body-large mt-6 text-gray-400">
          The link may be broken or the page may have been removed. Try one
          of the links below or reach out from our contact page.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button href="/">Back to home</Button>
          <Button href="/contact" variant="secondary">
            Contact
          </Button>
        </div>

        <nav
          className="mt-14 pt-10 border-t border-white/[0.06]"
          aria-label="Popular pages"
        >
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-gray-500">
            {links.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="hover:text-white transition-colors duration-300"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
