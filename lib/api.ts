import fs from "fs";
import matter from "gray-matter";
import { join } from "path";
import { BOOKS_PATH } from "../utils/mdxUtils";

export function getBookSlugs(): string[] {
  return fs.readdirSync(BOOKS_PATH);
}

export type BookItems = {
  [key: string]: string;
};

export function getBookBySlug(slug: string, fields: string[] = []): BookItems {
  const realSlug = slug.replace(/\.mdx$/, "");
  const fullPath = join(BOOKS_PATH, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const items: BookItems = {};

  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = realSlug;
    }
    if (field === "content") {
      items[field] = content;
    }
    if (data[field]) {
      items[field] = data[field];
    }
  });

  return items;
}

export function getAllBooks(fields: string[] = []): BookItems[] {
  const slugs = getBookSlugs();
  console.log(slugs);
  const posts = slugs.map((slug) => getBookBySlug(slug, fields));
  console.log(posts, "posts");
  return posts;
}
