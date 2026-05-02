"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import ImageLightbox from "./ImageLightbox";

export default function Markdown({ content }: { content: string }) {
  return (
    <div className="prose-case-study">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          img: ({ src, alt }) => (
            <ImageLightbox
              src={typeof src === "string" ? src : ""}
              alt={alt || ""}
            />
          ),
          p: ({ children, node }) => {
            const hasImg = node?.children?.some(
              (child: { type: string; tagName?: string }) =>
                child.type === "element" && child.tagName === "img"
            );
            if (hasImg) return <>{children}</>;
            return <p>{children}</p>;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
