import * as React from "react";
import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { articleList } from "@/articles";
import CodeMirror, { EditorView } from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { python } from "@codemirror/lang-python";
import { TaskTag } from "@/components/tasks/TaskTag";
import { BookOpenCheck } from "lucide-react";

export const Route = createFileRoute("/blog/$id")({
  component: RouteComponent,
});

const components = {
  h1: ({ children }: { children?: React.ReactNode }) => (
    <h1 className="scroll-m-20 text-4xl font-extrabold mb-6 lg:text-5xl">{children}</h1>
  ),
  p: ({ children }: { children?: React.ReactNode }) => <p className="mb-4 text-foreground lg:max-w-5xl">{children}</p>,
  a: ({ children, href }: { children?: React.ReactNode; href?: string }) => (
    <a href={href} className="hover:underline">
      {children}
    </a>
  ),
  h2: ({ children }: { children?: React.ReactNode }) => (
    <h2 className="scroll-m-20 text-3xl font-semibold transition-colors mb-4 first:mt-0">{children}</h2>
  ),
  h3: ({ children }: { children?: React.ReactNode }) => <h3 className="text-2xl font-semibold my-4">{children}</h3>,
  span: ({ children }: { children?: React.ReactNode }) => <span className="mr-2">{children}</span>,
  ul: ({ children }: { children?: React.ReactNode }) => <ul className="list-disc pl-6 mb-4">{children}</ul>,
  li: ({ children }: { children?: React.ReactNode }) => <li className="leading-7">{children}</li>,
  code: ({ children }: { children?: React.ReactNode }) => (
    <div className="overflow-x-hidden max-w-full">
      <CodeMirror
        editable={false}
        value={children?.toString()}
        className="text-foreground"
        theme={vscodeDark}
        extensions={[python(), EditorView.lineWrapping]}
      />
    </div>
  ),
  pre: ({ children }: { children?: React.ReactNode }) => (
    <div className="overflow-x-hidden max-w-full">
      <pre className="rounded-md text-sm break-words whitespace-pre-wrap text-wrap">{children}</pre>
    </div>
  ),
  img: ({ src, alt }: { src?: string; alt?: string }) => <img src={src} alt={alt} className="max-w-full" />,
  hr: () => <hr className="border-t my-6" />,
};

function RouteComponent() {
  const { id } = useParams({ from: "/blog/$id" });
  const article = articleList.find((a) => a.id === id);

  if (!article) {
    return <div>Nie znaleziono wpisu.</div>;
  }

  return (
    <>
      <article className="overflow-x-hidden max-w-full">
        <ReactMarkdown className="overflow-hidden" components={components} remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]}>
          {article.content}
        </ReactMarkdown>
      </article>
      <div className="flex flex-col mt-8 border-solid p-4 border max-w-[800px] rounded-md dark:border-[#4b4829] dark:text-[#f0f0f0]">
        <span className="flex items-center mb-4">
          <BookOpenCheck className="mr-4" />
          <h3 className="text-md lg:text-lg font-semibold">Sprawdź zadania związane z artykułem</h3>
        </span>
        <div className="flex space-x-3">
          {article.tags &&
            article.tags.map((tag) => (
              <Link to={`/zadania?tag=${tag}`} key={tag}>
                {" "}
                <TaskTag key={tag} tag={tag} />{" "}
              </Link>
            ))}
        </div>
      </div>
    </>
  );
}
