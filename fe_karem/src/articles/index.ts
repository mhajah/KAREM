import matter from "gray-matter";

export interface Article {
  id: string;
  title?: string;
  tags?: string[];
  date?: string;
  author?: string;
  content?: string;
  category?: string;
}

const articles = import.meta.glob('./*.md', { eager: true });

export const articleList: Article[] = Object.keys(articles).map((path) => {
  const rawContent = (articles[path] as { default: string }).default;
  const { data, content } = matter(rawContent);

  return {
    id: path.replace('./', '').replace('.md', ''),
    title: data.title,
    tags: data.tags,
    date: data.date,
    content: content,
    category: data.category,
  };
});

export const algorithmList: Article[] = articleList.filter((article) => article.category === "algorithms");
export const reactList: Article[] = articleList.filter((article) => article.category === "react");