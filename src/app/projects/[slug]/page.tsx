import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { projects } from "@/lib/projects";
import Markdown from "@/components/Markdown";

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};

  return {
    title: `Case Study: ${project.name} | Mahdeen Reza`,
    description: project.description,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <main className="pt-16 bg-warm-sand">
      <article id="case-study" className="bg-warm-sand pt-12 pb-20 md:pt-16 md:pb-28">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 w-full">
          {/* Back link */}
          <Link
            href="/projects"
            className="inline-block font-body text-[13px] font-medium text-terracotta transition-colors duration-200 hover:text-terracotta-dark mb-6"
          >
            &larr; Back to projects
          </Link>

          {/* Title */}
          <h1 className="font-display font-bold text-[clamp(38px,5.5vw,72px)] uppercase tracking-[-0.03em] text-terracotta -mb-1">
            Case Study
          </h1>
          <p className="font-display font-bold text-[clamp(26px,3.5vw,34px)] tracking-[-0.02em] text-dark mb-6">
            {project.name}
          </p>

          {/* Metadata bar */}
          <div className="flex flex-wrap gap-x-6 sm:gap-x-8 gap-y-4 pb-8 mb-12 border-b border-dark/10">
            <div>
              <span className="block font-body text-[11px] uppercase tracking-[0.1em] text-muted mb-1">
                Role
              </span>
              <span className="font-body text-[16px] text-dark">
                {project.role}
              </span>
            </div>
            <div>
              <span className="block font-body text-[11px] uppercase tracking-[0.1em] text-muted mb-1">
                Status
              </span>
              <span className="font-body text-[16px] text-dark">
                {project.status}
              </span>
            </div>
            <div>
              <span className="block font-body text-[11px] uppercase tracking-[0.1em] text-muted mb-1">
                Stack
              </span>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-body text-[13px] font-medium text-terracotta bg-terracotta/15 border border-terracotta/30 px-3 py-1.5 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            {(project.github || project.demo) && (
              <div className="flex items-end gap-4">
                {project.github && (
                  <Link
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-[16px] text-terracotta transition-colors duration-200 hover:text-terracotta-dark py-1"
                  >
                    GitHub &rarr;
                  </Link>
                )}
                {project.demo && (
                  <Link
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-[16px] text-terracotta transition-colors duration-200 hover:text-terracotta-dark py-1"
                  >
                    Live demo &rarr;
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Content sections */}
          <div className="flex flex-col gap-16 max-w-[900px]">
            {project.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="font-display font-bold text-[clamp(26px,3.5vw,34px)] tracking-[-0.02em] text-dark mb-6">
                  {section.heading}
                </h2>
                <Markdown content={section.body} />
              </section>
            ))}
          </div>
        </div>
      </article>
    </main>
  );
}
