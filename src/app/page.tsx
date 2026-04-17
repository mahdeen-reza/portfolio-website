import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import About from "@/components/About";

export default function Home() {
  return (
    <main className="pt-16">
      <Hero />
      <Projects preview />
      <Skills />
      <About />
    </main>
  );
}
