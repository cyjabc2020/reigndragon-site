import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface/50">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-accent/10">
                <span className="font-mono text-xs font-bold text-accent">RD</span>
              </div>
              <span className="font-semibold text-foreground text-sm">ReignDragon</span>
            </div>
            <p className="text-text-tertiary text-sm leading-relaxed">
              AI governance and policy-as-product research lab.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-text-tertiary mb-4">
              Navigate
            </h4>
            <div className="flex flex-col gap-2">
              {[
                { href: "/vision", label: "Vision" },
                { href: "/research", label: "Research" },
                { href: "/thoughts", label: "Thoughts" },
                { href: "/about", label: "About" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-text-secondary hover:text-accent transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-text-tertiary mb-4">
              Connect
            </h4>
            <div className="flex flex-col gap-2">
              <span className="text-sm text-text-secondary">hello@reigndragon.com</span>
            </div>
          </div>
        </div>

        <div className="glow-line mt-10 mb-6" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-text-tertiary">
            &copy; {new Date().getFullYear()} ReignDragon. All rights reserved.
          </p>
          <p className="text-xs text-text-tertiary font-mono">
            Built with conviction
          </p>
        </div>
      </div>
    </footer>
  );
}
