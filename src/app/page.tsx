export default function Home() {
  return (
    <main className="min-h-screen bg-cream flex flex-col items-center justify-center gap-8 px-6">
      {/* Test Clash Display heading */}
      <h1 className="font-display font-bold text-[clamp(48px,8vw,100px)] tracking-[-0.04em] leading-[0.98] text-dark text-center">
        Mahdeen Reza
      </h1>

      {/* Test Switzer body */}
      <p className="font-body text-[15px] leading-[1.7] text-muted text-center max-w-md">
        Systems Governance Analyst specializing in AI, SaaS management,
        automation, and compliance.
      </p>

      {/* Test color tokens */}
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
    </main>
  );
}
