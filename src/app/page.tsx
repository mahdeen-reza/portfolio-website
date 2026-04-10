import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Projects from "@/components/Projects";

export default function Home() {
  return (
    <main className="pt-16">
      <Hero />
      <Marquee />
      <Projects />
      <section id="about" className="min-h-[50vh] bg-warm flex items-center justify-center scroll-mt-16">
        <p className="font-display font-semibold text-[clamp(28px,4vw,48px)] text-dark/20">About</p>
      </section>
      <section id="contact" className="min-h-[50vh] bg-cream flex items-center justify-center scroll-mt-16">
        <p className="font-display font-semibold text-[clamp(28px,4vw,48px)] text-dark/20">Contact</p>
      </section>
    </main>
  );
}
