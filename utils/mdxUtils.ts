import fs from "fs";
import matter from "gray-matter";
import path from "path";

type MetaType = {
  title: string;
  description: string;
  image: string;
  author: string;
  category: string;
};

export const BOOKS_PATH = path.join(process.cwd(), "books");

export const bookFilePaths = fs
  .readdirSync(BOOKS_PATH)
  .filter((path) => /\.mdx?$/.test(path));

export const getSortedBooksData = () => {
  const fileNames = fs.readdirSync(BOOKS_PATH);
  const allPostsData = fileNames.map((fileName) => {
    // id를 가져오기 위해 파일 이름에서 ".mdx"를 제거합니다.
    const id = fileName.replace(/\.mdx$/, "");

    // mdx 파일을 문자열로 읽습니다.
    const fullPath = path.join(BOOKS_PATH, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // gray-matter를 사용하여 포스트의 메타데이터 섹션을 분석합니다.
    const matterResult = matter(fileContents);

    // 데이터를 id와 합칩니다.
    return {
      id,
      ...(matterResult.data as MetaType),
    };
  });
  // 이름순으로 정렬합니다.
  return allPostsData.sort((a, b) => {
    if (a.title < b.title) {
      return 1;
    } else {
      return -1;
    }
  });
};
