import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { projects, toAnchorId } from "@/lib/projects";
import Markdown from "@/components/Markdown";
import CaseStudySidebar from "@/components/CaseStudySidebar";
import StickyHeader from "@/components/StickyHeader";

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
      <article id="case-study" className="bg-warm-sand">
        <div className={`${project.wideLayout ? "max-w-[1800px]" : "max-w-[1600px]"} mx-auto px-6 md:px-12 lg:px-20 w-full`}>
          {/* Compressed header zone — frozen on desktop */}
          <StickyHeader>
            {/* Back link */}
            <Link
              href="/?projects=open"
              className="inline-block font-body text-[13px] font-medium text-terracotta transition-colors duration-200 hover:text-terracotta-dark mb-2"
            >
              &larr; Back to projects
            </Link>

            {/* Combined heading */}
            <h1 className={`font-display font-bold ${project.wideLayout ? "text-[clamp(34px,4.5vw,60px)]" : "text-[clamp(38px,5.5vw,72px)]"} uppercase tracking-[-0.03em] mb-2`}>
              <span className="text-terracotta">Case Study:</span>{" "}
              <span className="text-dark">{project.name}</span>
            </h1>

            {/* Metadata bar */}
            <div className="flex flex-wrap items-end gap-x-4 sm:gap-x-8 gap-y-3 pb-4 mb-0 border-b border-dark/10">
              <div>
                <span className="block font-body text-[11px] uppercase tracking-[0.1em] text-muted mb-0.5">
                  Role
                </span>
                <span className="font-body text-[15px] md:text-[18px] text-dark">
                  {project.role}
                </span>
              </div>
              <div>
                <span className="block font-body text-[11px] uppercase tracking-[0.1em] text-muted mb-0.5">
                  Status
                </span>
                <span className="font-body text-[15px] md:text-[18px] text-dark">
                  {project.status}
                </span>
              </div>
              <div>
                <span className="block font-body text-[11px] uppercase tracking-[0.1em] text-muted mb-0.5">
                  Last Updated
                </span>
                <span className="font-body text-[15px] md:text-[18px] text-dark">
                  {project.lastUpdated}
                </span>
              </div>
              {project.builtWith && (
                <div>
                  <span className="block font-body text-[11px] uppercase tracking-[0.1em] text-muted mb-0.5">
                    Built With
                  </span>
                  <span className="font-body text-[15px] md:text-[18px] text-dark">
                    {project.builtWith}
                  </span>
                </div>
              )}
              {(project.github || project.demo || project.processMap) && (
                <div className="flex items-end gap-4 ml-auto">
                  {project.github && (
                    <Link
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block font-body text-[16px] md:text-[20px] font-medium text-terracotta transition-all duration-200 hover:text-terracotta-dark hover:scale-105 origin-right"
                    >
                      GitHub &rarr;
                    </Link>
                  )}
                  {project.demo && (
                    <Link
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block font-body text-[16px] md:text-[20px] font-medium text-terracotta transition-all duration-200 hover:text-terracotta-dark hover:scale-105 origin-right"
                    >
                      Live demo &rarr;
                    </Link>
                  )}
                  {project.processMap && (
                    <Link
                      href={project.processMap}
                      className="inline-block font-body text-[16px] md:text-[20px] font-medium text-terracotta transition-all duration-200 hover:text-terracotta-dark hover:scale-105 origin-right"
                    >
                      Process map and Workflow &rarr;
                    </Link>
                  )}
                </div>
              )}
            </div>
          </StickyHeader>

          {/* Mobile sidebar content — visible below lg, normal scroll */}
          <div className="lg:hidden my-8">
            <div className="mb-6">
              <h4 className="font-body text-[11px] uppercase tracking-[0.1em] text-muted mb-3">
                Tech Stack
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map((item) => (
                  <span
                    key={item}
                    className="font-body text-[13px] font-medium text-terracotta bg-terracotta/[0.06] border border-terracotta/20 px-3 py-1.5 rounded-md"
                  >
                    {item}
                  </span>
                ))}
              </div>
              {project.techStackFooter && (
                <p className="font-body text-[13px] italic text-muted mt-3">
                  {project.techStackFooter}
                </p>
              )}
            </div>
            <div>
              <h4 className="font-body text-[11px] uppercase tracking-[0.1em] text-muted mb-3">
                Contents
              </h4>
              <nav aria-label="Table of contents">
                <ul className="space-y-0">
                  {project.sections.map((section, i) => (
                    <li key={section.heading}>
                      <a
                        href={`#${toAnchorId(section.heading)}`}
                        className="flex items-center gap-2 font-body text-[13px] text-muted hover:text-dark transition-colors duration-200 py-1.5"
                      >
                        <span className="text-muted/50 font-mono text-[11px]">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {section.heading}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>

          {/* Two-column area — fills remaining viewport on desktop */}
          <div className="lg:flex lg:gap-10 xl:gap-14 pt-6 lg:pt-4">
            {/* Desktop sidebar — frozen, scrollbar hidden */}
            <aside data-case-study-aside className="hidden lg:block lg:w-[280px] xl:w-[300px] shrink-0 lg:sticky lg:top-[16.5rem] lg:self-start lg:overflow-hidden">
              <div data-sidebar-scroll className="lg:max-h-[calc(100vh-18rem)] lg:overflow-y-auto scrollbar-hide lg:-mr-[30px] lg:pr-[30px]">
                <CaseStudySidebar
                  techStack={project.techStack}
                  sections={project.sections}
                  fileTree={project.fileTree}
                  techStackFooter={project.techStackFooter}
                />
              </div>
            </aside>

            {/* Content area — only scrollable part on desktop */}
            <div className="flex-1 min-w-0 pb-20 md:pb-28">
              <div className="flex flex-col gap-16">
                {project.sections.map((section) => (
                  <section
                    key={section.heading}
                    id={toAnchorId(section.heading)}
                    className="scroll-mt-24 lg:scroll-mt-[16.5rem]"
                  >
                    <h2 className="font-display font-bold text-[clamp(28px,3.8vw,38px)] tracking-[-0.02em] text-dark mb-6">
                      {section.heading}
                    </h2>
                    <Markdown content={section.body} />
                  </section>
                ))}
              </div>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
