const ITEMS = [
  "6-figure cost rationalization",
  "Ground-up function established",
  "3+ years in SaaS operations",
  "100% SOX ITGC pass rate",
  "AI-powered tooling built & deployed",
  "60+ system portfolio managed",
];

function MarqueeTrack() {
  return (
    <div className="flex items-center shrink-0">
      {ITEMS.map((item, i) => (
        <span key={i} className="flex items-center shrink-0">
          <span className="font-body font-medium text-[12px] sm:text-[13px] uppercase tracking-[0.1em] text-cream/90 whitespace-nowrap">
            {item}
          </span>
          <span className="mx-4 sm:mx-6 text-cream/40 text-[10px]">&#9670;</span>
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <div className="bg-terracotta py-3 sm:py-4 overflow-hidden">
      <div
        className="flex w-max"
        style={{ animation: "marquee 35s linear infinite" }}
      >
        <MarqueeTrack />
        <MarqueeTrack />
        <MarqueeTrack />
        <MarqueeTrack />
      </div>
    </div>
  );
}
