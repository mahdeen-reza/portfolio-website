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
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
