"use client";
import styled from "@emotion/styled";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
import Send from "./svgs/Send";
import { CircularProgress } from "@mui/material";
import { useChat } from "ai/react";
import { Dispatch, SetStateAction } from "react";

type GPTProps = {
  setSelectedCorpus: Dispatch<SetStateAction<string | null>>;
};

const GPT = ({ setSelectedCorpus }: GPTProps) => {
  const { messages, input, handleInputChange, handleSubmit, data, isLoading } =
    useChat();

  return (
    <GPTContainer>
      <GPTAnswer>
        {messages.length > 0
          ? messages.map((m) =>
              m.role === "user" ? (
                <div key={m.id} className="w-full flex justify-end">
                  <UserChatBox className="flex items-baseline gap-2">
                    <div>{m.content}</div>
                    <div className="text-[12px] font-light">{`${new Date()
                      .getHours()
                      .toString()
                      .padStart(2, "0")}:${new Date()
                      .getMinutes()
                      .toString()
                      .padStart(2, "0")}`}</div>
                  </UserChatBox>
                </div>
              ) : (
                <div key={m.id}>
                  <GPTChatBox
                    className="flex items-baseline gap-2 hover:bg-[#CBFF37] transition-all duration-200 ease-in-out"
                    onClick={() => {
                      setSelectedCorpus(m.content);
                    }}
                  >
                    <div>{m.content}</div>
                    <div className="text-[12px] font-light">{`${new Date()
                      .getHours()
                      .toString()
                      .padStart(2, "0")}:${new Date()
                      .getMinutes()
                      .toString()
                      .padStart(2, "0")}`}</div>
                  </GPTChatBox>
                </div>
              )
            )
          : null}
      </GPTAnswer>
      <GPTForm
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <input
          type="text"
          name="question"
          placeholder="질문을 입력하세요."
          required
          value={input}
          onChange={handleInputChange}
          autoComplete="off"
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? (
            <CircularProgress
              size={20}
              color="info"
              style={{
                color: "#333",
              }}
            />
          ) : (
            <Send fill={"#800080"} />
          )}
        </button>
      </GPTForm>
    </GPTContainer>
  );
};

export default GPT;

const GPTContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 32px 32px;
`;

const GPTAnswer = styled.div`
  padding: 20px 0;
  border-radius: 10px;
  font-size: 16px;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  placeholder {
    color: #333333;
  }
  height: 600px;
  resize: none;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 10px;
`;

const GPTForm = styled.form`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  gap: 10px;
  input {
    flex: 1;
    height: 50px;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.1);
    font-size: 16px;
    &:focus {
      outline: none;
    }
  }
  button {
    width: 53px;
    height: 53px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    &:focus {
      outline: none;
    }
    color: #333333;
    font-weight: bold;
    background-color: #cbff37;
    border-radius: 50%;
  }
`;

const UserChatBox = styled.div`
  border-radius: 20px 20px 4px 20px;
  background: rgba(230, 230, 220, 0.8);
  box-shadow: 0px 4px 4px 0px rgba(1, 74, 0, 0.05);
  color: #333;
  font-family: Pretendard Variable;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px; /* 150% */
  padding: 20px 24px;
`;

const GPTChatBox = styled.div`
  border-radius: 4px 20px 20px 20px;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0px 4px 4px 0px rgba(1, 74, 0, 0.05);
  color: #333;
  font-family: Pretendard Variable;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px; /* 150% */
  padding: 24px;
`;
