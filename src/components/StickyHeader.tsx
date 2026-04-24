"use client";

import { useEffect, useState } from "react";

export default function StickyHeader({
  children,
}: {
  children: React.ReactNode;
}) {
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;
    const observer = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      data-case-study-header
      className={`bg-warm-sand z-10 pt-4 md:pt-6 lg:sticky lg:top-16 transition-transform duration-500 ease-out ${
        footerVisible
          ? "lg:-translate-y-[calc(100%_+_5rem)]"
          : "lg:translate-y-0"
      }`}
    >
      {children}
    </div>
  );
}
