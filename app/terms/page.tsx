import { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import fs from "fs";
import path from "path";

export const metadata: Metadata = {
  title: "利用規約 | CHEFDOM",
  description: "CHEFDOMの利用規約をご確認ください。",
};

export default function TermsPage() {
  const markdownPath = path.join(process.cwd(), "content", "terms.md");
  const markdownContent = fs.readFileSync(markdownPath, "utf8");

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <ReactMarkdown
        components={{
          h1: ({ children }) => (
            <h1 className="text-3xl font-bold mb-8">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl font-semibold mb-4">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl font-semibold mb-4">{children}</h3>
          ),
          p: ({ children }) => <p className="text-gray-700 mb-4">{children}</p>,
        }}>
        {markdownContent}
      </ReactMarkdown>
    </div>
  );
}
