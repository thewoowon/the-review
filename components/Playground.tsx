import { AnimatePresence, motion } from "framer-motion";
import { RadioGroup } from "@headlessui/react";
import Link from "next/link";
import { useState } from "react";
import RightArrow from "./svgs/RightArrow";
import ListItem from "./ListItem";
import Image from "next/image";
import GPT from "./GPT";
import ConfettiComponent from "./Confetti";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { BookType } from "@/types/type";
import { books } from "@/constants/books";
import dynamic from "next/dynamic";
import { getRandomInt } from "@/utils/getRandomInt";
import { contents } from "@/constants/contents";
import Viewer from "./Viewer";

const PDFDownload = dynamic(() => import("../components/PDFDownload"), {
  ssr: false,
}) as any;

const generatedMode = [
  {
    id: 1,
    name: "랜덤으로 독후감 생성",
    description:
      "50개의 독후감 템플릿 중 랜덤으로 독후감을 생성합니다. 언제나 새로운 독후감을 만나보세요!",
    difficulty: "쉬움",
  },
  {
    id: 2,
    name: "GPT-4로 독후감 생성",
    description:
      "GPT-4를 이용해 독후감을 생성합니다. GPT-4는 인공지능 중 가장 뛰어난 성능을 자랑합니다. 대화를 통해 독후감을 생성하고, 해당 말뭉치를 선택해주세요.",
    difficulty: "검토필요",
  },
];

type FormType = {
  name: string;
  department: string;
  title: string;
  content: string;
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function PlaygroundPage() {
  const randomInt = getRandomInt(5);
  const [selected, setSelected] = useState(generatedMode[0]);

  const [step, setStep] = useState(1);

  const [selectedCorpus, setSelectedCorpus] = useState<string | null>(null);

  const [selectedBook, setSelectedBook] = useState<BookType>(books[randomInt]);

  const [selectedContent, setSelectedContent] = useState<{
    id: number;
    content: string;
  }>(contents[randomInt]);

  const { register, getValues, watch, setValue } = useForm<FormType>({
    defaultValues: {
      name: "",
      department: "",
      title: "",
      content: "",
    },
  });

  const router = useRouter();

  function generatePDF() {
    return toast.success("PDF를 생성했어요!", {
      icon: "😆",
      position: "top-center",
      style: {
        borderRadius: "10px",
        background: "#18a402",
        color: "#fff",
      },
    });
  }
  return (
    <AnimatePresence>
      <div className="flex flex-col md:flex-row w-full md:overflow-hidden">
        <div className="w-full min-h-[60vh] md:w-1/2 md:h-screen flex flex-col px-4 pt-2 pb-8 md:px-0 md:py-2 bg-[#FCFCFC] justify-center">
          <div className="h-full w-full items-center justify-center flex flex-col">
            {step === 1 ? (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                key="step-1"
                transition={{
                  duration: 0.95,
                  ease: [0.165, 0.84, 0.44, 1],
                }}
                className="max-w-lg mx-auto px-4 lg:px-0"
              >
                <h2 className="text-4xl font-bold text-[#1E2B3A]">
                  독후감을 생성해보세요.
                </h2>
                <p className="text-[14px] leading-[20px] text-[#1a2b3b] font-normal my-4">
                  현재 50편의 독후감을 보유하고 있습니다. 또한 GPT로 원하는 책을
                  검색하고 독후감을 작성할 수 있습니다.
                </p>
                <div>
                  <RadioGroup value={selected} onChange={setSelected}>
                    <RadioGroup.Label className="sr-only">
                      Server size
                    </RadioGroup.Label>
                    <div className="space-y-4">
                      {generatedMode.map((question) => (
                        <RadioGroup.Option
                          key={question.name}
                          value={question}
                          className={({ checked, active }) =>
                            classNames(
                              checked
                                ? "border-transparent"
                                : "border-gray-300",
                              active
                                ? "border-blue-500 ring-2 ring-blue-200"
                                : "",
                              "relative cursor-pointer rounded-lg border bg-white px-6 py-4 shadow-sm focus:outline-none flex justify-between"
                            )
                          }
                        >
                          {({ active, checked }) => (
                            <>
                              <span className="flex items-center">
                                <span className="flex flex-col text-sm">
                                  <RadioGroup.Label
                                    as="span"
                                    className="font-medium text-gray-900"
                                  >
                                    {question.name}
                                  </RadioGroup.Label>
                                  <RadioGroup.Description
                                    as="span"
                                    className="text-gray-500"
                                  >
                                    <span className="block">
                                      {question.description}
                                    </span>
                                  </RadioGroup.Description>
                                </span>
                              </span>
                              <RadioGroup.Description
                                as="span"
                                className="flex text-sm ml-4 mt-0 flex-col text-right items-center justify-center w-16"
                              >
                                <span className=" text-gray-500">
                                  {question.difficulty === "쉬움" ? (
                                    <span className="flex items-center justify-center">
                                      <span className="mr-1">⭐️</span>
                                    </span>
                                  ) : (
                                    <span className="flex items-center justify-center">
                                      <span className="mr-1">⭐️</span>
                                      <span className="mr-1">⭐️</span>
                                      <span className="mr-1">⭐️</span>
                                    </span>
                                  )}
                                </span>
                                <span className="font-medium text-gray-900">
                                  {question.difficulty}
                                </span>
                              </RadioGroup.Description>
                              <span
                                className={classNames(
                                  active ? "border" : "border-2",
                                  checked
                                    ? "border-blue-500"
                                    : "border-transparent",
                                  "pointer-events-none absolute -inset-px rounded-lg"
                                )}
                                aria-hidden="true"
                              />
                            </>
                          )}
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
                <div className="flex gap-[15px] justify-end mt-8">
                  <div>
                    <Link
                      href="/"
                      className="group rounded-full px-4 py-2 text-[13px] font-semibold transition-all flex items-center justify-center bg-[#f5f7f9] text-[#1E2B3A] no-underline active:scale-95 scale-100 duration-75"
                      style={{
                        boxShadow: "0 1px 1px #0c192714, 0 1px 3px #0c192724",
                      }}
                    >
                      홈으로 돌아가기
                    </Link>
                  </div>
                  <div>
                    <button
                      onClick={() => {
                        if (selected.id === 1) {
                          // 램덤 독후감...
                          setValue("title", selectedBook.title);
                          setValue("content", selectedContent.content);
                        } else {
                          setValue("title", "");
                          setValue("content", "");
                        }

                        setStep(2);
                      }}
                      className="group rounded-full px-4 py-2 text-[13px] font-semibold transition-all flex items-center justify-center bg-[#1E2B3A] text-white hover:[linear-gradient(0deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)), #0D2247] no-underline flex gap-x-2  active:scale-95 scale-100 duration-75"
                      style={{
                        boxShadow:
                          "0px 1px 4px rgba(13, 34, 71, 0.17), inset 0px 0px 0px 1px #061530, inset 0px 0px 0px 2px rgba(255, 255, 255, 0.1)",
                      }}
                    >
                      <span> 다음 단계로 </span>
                      <RightArrow color="#FFFFFF" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : step === 2 ? (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                key="step-2"
                transition={{
                  duration: 0.95,
                  ease: [0.165, 0.84, 0.44, 1],
                }}
                className="max-w-lg mx-auto px-4 lg:px-0"
              >
                <h2 className="text-4xl font-bold text-[#1E2B3A]">
                  {selected.name}
                </h2>
                <p className="text-[14px] leading-[20px] text-[#1a2b3b] font-normal my-4">
                  {selected.description}
                </p>
                <form>
                  <div className="py-2">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      이름
                    </label>
                    <div className="mt-1">
                      <input
                        {...register("name", { required: true })}
                        type="text"
                        name="name"
                        id="name"
                        autoComplete="off"
                        className="shadow-lg block w-full sm:text-sm border border-gray-300 rounded-md p-2 outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  </div>
                  <div className="py-2">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      부서
                    </label>
                    <div className="mt-1">
                      <input
                        {...register("department", { required: true })}
                        type="text"
                        name="department"
                        id="department"
                        autoComplete="off"
                        className="shadow-lg block w-full sm:text-sm border border-gray-300 rounded-md p-2 outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  </div>
                  <div className="py-2">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      제목
                    </label>
                    <div className="mt-1">
                      <input
                        {...register("title", { required: true })}
                        type="text"
                        name="title"
                        id="title"
                        autoComplete="off"
                        className="shadow-lg block w-full sm:text-sm border border-gray-300 rounded-md p-2 outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  </div>
                </form>
                {selectedCorpus && (
                  <div className="py-2">
                    <label className="block text-sm font-medium text-gray-700">
                      선택된 말뭉치
                    </label>
                    <div className="mt-1">
                      <textarea
                        onChange={(e) => {
                          setSelectedCorpus(e.target.value);
                        }}
                        className="shadow-lg block w-full sm:text-sm border border-gray-300 rounded-md p-2 outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        value={selectedCorpus}
                        style={{
                          resize: "none",
                          minHeight: "200px",
                          width: "100%",
                          outline: "none",
                        }}
                      />
                    </div>
                  </div>
                )}
                <div className="flex gap-[15px] justify-end mt-8">
                  <div>
                    <button
                      onClick={() => setStep(1)}
                      className="group rounded-full px-4 py-2 text-[13px] font-semibold transition-all flex items-center justify-center bg-[#f5f7f9] text-[#1E2B3A] no-underline active:scale-95 scale-100 duration-75"
                      style={{
                        boxShadow: "0 1px 1px #0c192714, 0 1px 3px #0c192724",
                      }}
                    >
                      이전 단계로
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={() => {
                        const { name, department, title } = getValues();
                        if (!name || !department) {
                          return toast.error("이름과 부서 입력이 필요합니다!", {
                            icon: "😥",
                            position: "top-center",
                            style: {
                              borderRadius: "10px",
                              background: "#FF0000",
                              color: "#fff",
                            },
                          });
                        }

                        if (!title) {
                          return toast.error("제목은 필수입니다!", {
                            icon: "😥",
                            position: "top-center",
                            style: {
                              borderRadius: "10px",
                              background: "#FF0000",
                              color: "#fff",
                            },
                          });
                        }

                        if (selected.id == 2 && !selectedCorpus) {
                          return toast.error(
                            "GPT와 대화하고 말뭉치를 선택해주세요!",
                            {
                              icon: "😥",
                              position: "top-center",
                              style: {
                                borderRadius: "10px",
                                background: "#FF0000",
                                color: "#fff",
                              },
                            }
                          );
                        }
                        generatePDF();
                        setStep(3);
                      }}
                      className="group rounded-full px-4 py-2 text-[13px] font-semibold transition-all flex items-center justify-center bg-[#1E2B3A] text-white hover:[linear-gradient(0deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)), #0D2247] no-underline flex gap-x-2  active:scale-95 scale-100 duration-75"
                      style={{
                        boxShadow:
                          "0px 1px 4px rgba(13, 34, 71, 0.17), inset 0px 0px 0px 1px #061530, inset 0px 0px 0px 2px rgba(255, 255, 255, 0.1)",
                      }}
                    >
                      <span> 다음 단계로 </span>
                      <RightArrow color="#FFFFFF" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="flex flex-col justify-center items-center gap-2">
                <p className="text-3xl">독후감이 완성되었습니다! 🥳</p>
                <p>버튼을 눌러서 다운로드 받으세요.</p>
                <div className="flex justify-center items-center gap-2">
                  {selected.id === 1 ? (
                    <PDFDownload
                      title={watch("title")}
                      name={watch("name")}
                      department={watch("department")}
                      content={watch("content")}
                    />
                  ) : (
                    <PDFDownload
                      title={watch("title")}
                      name={watch("name")}
                      department={watch("department")}
                      content={selectedCorpus}
                    />
                  )}
                  <button
                    onClick={() => {
                      confirm("홈으로 이동하시겠습니까? 다운로드 하셨나요?") &&
                        router.push("/");
                    }}
                    className="bg-[#CBFF37] hover:bg-[#C1F235] cursor-pointer transition duration-200 ease-in-out px-[16px] py-[8px] text-[16px] text-black rounded-full font-bold"
                  >
                    홈으로
                  </button>
                </div>

                <ConfettiComponent />
              </div>
            )}
          </div>
        </div>
        <div className="w-full h-[40vh] md:w-1/2 md:h-screen bg-[#F1F2F4] relative overflow-hidden flex justify-center items-center p-6">
          <figure
            className="flex w-full relative h-full bg-[#f5f7f9] text-[9px] rounded-[15px] overflow-hidden p-2 z-20"
            style={{
              grid: "100%/repeat(1,calc(5px * 28)) 1fr",
              boxShadow:
                "0 192px 136px rgba(26,43,59,.23),0 70px 50px rgba(26,43,59,.16),0 34px 24px rgba(26,43,59,.13),0 17px 12px rgba(26,43,59,.1),0 7px 5px rgba(26,43,59,.07), 0 50px 100px -20px rgb(50 50 93 / 25%), 0 30px 60px -30px rgb(0 0 0 / 30%), inset 0 -2px 6px 0 rgb(10 37 64 / 35%)",
            }}
          >
            <div className="bg-white text-[#667380] p-[18px] flex flex-col w-full">
              {step === 2 &&
                (selected.id === 1 ? (
                  <div className="h-full">
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -40 }}
                      key="step-2"
                      transition={{
                        duration: 0.95,
                        ease: [0.165, 0.84, 0.44, 1],
                      }}
                      className="max-w-lg mx-auto h-full flex justify-center items-center"
                    >
                      <Viewer
                        title={watch("title")}
                        name={watch("name")}
                        department={watch("department")}
                        content={watch("content")}
                      />
                    </motion.div>
                  </div>
                ) : (
                  <div className="h-full">
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                      key={selected.id}
                      className="text-[#1a2b3b] text-[14px] leading-[18px] font-semibold"
                    >
                      {selected.name}
                    </motion.p>
                    이제 대화를 통해 독후감을 생성하고, 해당 말뭉치를
                    선택해주세요.
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -40 }}
                      key="step-2"
                      transition={{
                        duration: 0.95,
                        ease: [0.165, 0.84, 0.44, 1],
                      }}
                      className="max-w-lg mx-auto h-full"
                    >
                      <GPT setSelectedCorpus={setSelectedCorpus} />
                    </motion.div>
                  </div>
                ))}
              {step === 1 &&
                (selected.id === 1 ? (
                  <motion.ul
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                    key={selected.id}
                    className="mt-6 grid grid-cols-3 xl:grid-cols-3 gap-2"
                  >
                    {books.map((book, i) => (
                      <ListItem key={i} item={book} />
                    ))}
                  </motion.ul>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                    key={selected.id}
                    className="mt-6 flex justify-center items-center w-full h-full text-3xl font-semibold text-[#1a2b3b]"
                  >
                    <div className="flex flex-col items-center justify-center gap-4">
                      <Image
                        width={100}
                        height={100}
                        src="https://imagedelivery.net/6qzLODAqs2g1LZbVYqtuQw/97e1fe93-d79a-46fb-1d09-7d07f4a3d100/public"
                        alt=""
                        className="animate-spin rounded-full"
                      />
                      OPENAI GPT-4
                    </div>
                  </motion.div>
                ))}
              {step === 1 && selected.id == 1 && (
                <div className="space-y-2 md:space-y-5 mt-auto">
                  <nav
                    className="flex items-center justify-between border-t border-gray-200 bg-white px-1 py-[2px] mb-[10px]"
                    aria-label="Pagination"
                  >
                    <div className="hidden sm:block">
                      <p className=" text-[#1a2b3b]">
                        Showing <span className="font-medium">1</span> to{" "}
                        <span className="font-medium">9</span> of{" "}
                        <span className="font-medium">500</span> results
                      </p>
                    </div>
                    <div className="flex flex-1 justify-between sm:justify-end">
                      <button className="relative inline-flex cursor-auto items-center rounded border border-gray-300 bg-white px-[4px] py-[2px]  font-medium text-[#1a2b3b] hover:bg-gray-50 disabled:opacity-50">
                        Previous
                      </button>
                      <button className="relative ml-3 inline-flex items-center rounded border border-gray-300 bg-white px-[4px] py-[2px]  font-medium text-[#1a2b3b] hover:bg-gray-50">
                        Next
                      </button>
                    </div>
                  </nav>
                </div>
              )}
              {step === 3 &&
                (selected.id === 1 ? (
                  <div className="h-full">
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -40 }}
                      key="step-2"
                      transition={{
                        duration: 0.95,
                        ease: [0.165, 0.84, 0.44, 1],
                      }}
                      className="max-w-lg mx-auto h-full flex justify-center items-center"
                    >
                      <Viewer
                        title={watch("title")}
                        name={watch("name")}
                        department={watch("department")}
                        content={watch("content")}
                      />
                    </motion.div>
                  </div>
                ) : (
                  <div className="h-full">
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -40 }}
                      key="step-2"
                      transition={{
                        duration: 0.95,
                        ease: [0.165, 0.84, 0.44, 1],
                      }}
                      className="max-w-lg mx-auto h-full flex justify-center items-center"
                    >
                      <Viewer
                        title={watch("title")}
                        name={watch("name")}
                        department={watch("department")}
                        content={selectedCorpus ?? ""}
                      />
                    </motion.div>
                  </div>
                ))}
            </div>
          </figure>
        </div>
      </div>
    </AnimatePresence>
  );
}
