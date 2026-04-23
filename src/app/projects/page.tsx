import type { Metadata } from "next";
import Projects from "@/components/Projects";

export const metadata: Metadata = {
  title: "Projects | Mahdeen Reza",
  description:
    "Selected projects by Mahdeen Reza — AI tools, data pipelines, compliance automation, and SaaS governance.",
};

export default function ProjectsPage() {
  return (
    <main className="pt-16 bg-warm-sand">
      <Projects showBackLink />
    </main>
  );
}
