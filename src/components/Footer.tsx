import Link from "next/link";

const columns = [
  {
    title: "Products",
    links: [
      { label: "ChapterSys", href: "/chaptersys" },
      { label: "PrimeRoute", href: "/primeroute" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06]">
      <div className="mx-auto max-w-[1200px] px-6 py-16">
        <div className="flex flex-col md:flex-row justify-between gap-12">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="text-[15px] font-semibold tracking-[-0.01em]"
            >
              Avernsys
            </Link>
            <p className="mt-3 text-sm text-gray-500 max-w-[240px]">
              Built for what&apos;s next.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-16">
            {columns.map((col) => (
              <div key={col.title}>
                <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-4">
                  {col.title}
                </h4>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-gray-400 hover:text-white transition-colors duration-300"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row justify-between gap-4">
          <p className="text-xs text-gray-600">
            &copy; {new Date().getFullYear()} Avernsys. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
