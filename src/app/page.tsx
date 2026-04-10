import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import About from "@/components/About";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="pt-16">
      <Hero />
      <Marquee />
      <Projects preview />
      <Skills />
      <About />
      <Contact />
    </main>
  );
}
