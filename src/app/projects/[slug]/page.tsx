import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { projects } from "@/lib/projects";

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
    title: `${project.name} | Mahdeen Reza`,
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
    <main className="pt-16">
      <article className="bg-cream py-16 md:py-24">
        <div className="max-w-[800px] mx-auto px-6 md:px-12 lg:px-16">
          {/* Back link */}
          <Link
            href="/projects"
            className="inline-block font-body text-[13px] font-medium text-terracotta transition-colors duration-200 hover:text-terracotta-dark mb-10"
          >
            &larr; Back to projects
          </Link>

          {/* Title */}
          <h1 className="font-display font-bold text-[clamp(32px,5vw,56px)] tracking-[-0.04em] leading-[1.05] text-dark mb-8">
            {project.name}
          </h1>

          {/* Metadata bar */}
          <div className="flex flex-wrap gap-x-6 sm:gap-x-8 gap-y-4 pb-8 mb-12 border-b border-border">
            <div>
              <span className="block font-body text-[11px] uppercase tracking-[0.1em] text-muted mb-1">
                Role
              </span>
              <span className="font-body text-sm text-dark">
                {project.role}
              </span>
            </div>
            <div>
              <span className="block font-body text-[11px] uppercase tracking-[0.1em] text-muted mb-1">
                Status
              </span>
              <span className="font-body text-sm text-dark">
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
                    className="font-body text-[11px] font-medium text-terracotta bg-terracotta/10 px-2 py-0.5 rounded-md"
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
                    className="font-body text-sm text-dark/70 transition-colors duration-200 hover:text-terracotta py-1"
                  >
                    GitHub &rarr;
                  </Link>
                )}
                {project.demo && (
                  <Link
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-sm text-dark/70 transition-colors duration-200 hover:text-terracotta py-1"
                  >
                    Live demo &rarr;
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Content sections */}
          <div className="flex flex-col gap-12">
            {project.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="font-display font-semibold text-[clamp(22px,3vw,32px)] tracking-[-0.03em] leading-[1.15] text-dark mb-4">
                  {section.heading}
                </h2>
                <p className="font-body text-[15px] leading-[1.8] text-dark/75">
                  {section.body}
                </p>
              </section>
            ))}
          </div>
        </div>
      </article>
    </main>
  );
}
