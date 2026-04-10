import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";

export default function Home() {
  return (
    <main className="pt-16">
      <Hero />
      <Marquee />

      {/* Placeholder sections — will be replaced by Projects, About, Contact */}
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
