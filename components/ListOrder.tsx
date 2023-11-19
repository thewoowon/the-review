import { GetStaticProps } from "next";
import ListItem from "./ListItem";
import { motion } from "framer-motion";
import { getAllBooks } from "@/lib/api";
import { BookType } from "@/types/type";

type PlaygroundPageProps = {
  books: BookType[];
};

const ListOrder = ({ books }: PlaygroundPageProps) => {
  return (
    <motion.ul
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      className="mt-6 grid grid-cols-3 xl:grid-cols-3 gap-2"
    >
      {new Array(9).fill(0).map((_, i) => (
        <ListItem
          key={i}
          item={{
            id: i,
            title: "test",
            description: "test",
            category: "test",
            image: "test",
            author: "test",
          }}
        />
      ))}
    </motion.ul>
  );
};

export default ListOrder;

export const getStaticProps: GetStaticProps = async () => {
  const books = getAllBooks([
    "title",
    "description",
    "author",
    "image",
    "category",
  ]);

  return {
    props: { books },
  };
};
