import Link from "next/link";

const FOOTER_LINKS = [
  { label: "LinkedIn", href: "https://linkedin.com/in/mahdeen-reza" },
  { label: "GitHub", href: "https://github.com/mahdeen-reza" },
  { label: "Email", href: "mailto:hello@mahdeenreza.com" },
];

export default function Footer() {
  return (
    <footer className="bg-cream border-t border-border">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-16 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-body text-xs text-muted">
          &copy; {new Date().getFullYear()} Mahdeen Reza
        </p>

        <div className="flex items-center gap-4 sm:gap-6">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              target={link.href.startsWith("mailto:") ? undefined : "_blank"}
              rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
              className="font-body text-xs text-muted transition-colors duration-200 hover:text-terracotta py-1.5"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
