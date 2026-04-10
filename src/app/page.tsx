export default function Home() {
  return (
    <main className="pt-16">
      {/* Temporary test content — will be replaced by Hero, Marquee, Projects, About, Contact */}
      <section className="min-h-screen bg-cream flex flex-col items-center justify-center gap-8 px-6">
        <h1 className="font-display font-bold text-[clamp(48px,8vw,100px)] tracking-[-0.04em] leading-[0.98] text-dark text-center">
          Mahdeen Reza
        </h1>
        <p className="font-body text-[15px] leading-[1.7] text-muted text-center max-w-md">
          Systems Governance Analyst specializing in AI, SaaS management,
          automation, and compliance.
        </p>
        <div className="flex gap-3 flex-wrap justify-center">
          <span className="bg-terracotta text-cream px-4 py-2 rounded-lg font-body font-medium text-[13px]">
            Terracotta
          </span>
          <span className="border border-charcoal text-charcoal px-4 py-2 rounded-lg font-body font-medium text-[13px]">
            Charcoal Ghost
          </span>
          <span className="bg-dark text-cream px-4 py-2 rounded-lg font-body font-medium text-[13px]">
            Dark
          </span>
          <span className="bg-warm text-dark px-4 py-2 rounded-lg font-body font-medium text-[13px]">
            Warm
          </span>
        </div>
      </section>

      {/* Spacer sections for scroll testing */}
      <section id="projects" className="min-h-[50vh] bg-dark flex items-center justify-center scroll-mt-16">
        <p className="font-display font-semibold text-[clamp(28px,4vw,48px)] text-cream/20">Projects</p>
      </section>
      <section id="about" className="min-h-[50vh] bg-warm flex items-center justify-center scroll-mt-16">
        <p className="font-display font-semibold text-[clamp(28px,4vw,48px)] text-dark/20">About</p>
      </section>
      <section id="contact" className="min-h-[50vh] bg-cream flex items-center justify-center scroll-mt-16">
        <p className="font-display font-semibold text-[clamp(28px,4vw,48px)] text-dark/20">Contact</p>
      </section>
    </main>
  );
}
