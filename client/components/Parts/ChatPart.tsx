"use client";
import ChatHeader from "../Headers/ChatHeader";
import ChatSection, { chat } from "../ChatSection/ChatSection";
import InputSection from "../InputSection/InputSection";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/Store";
import { useGetChatsQuery } from "@/redux/Apis/chat.api";
import { useGetMessagesQuery } from "@/redux/Apis/message.api";
import { useState } from "react";

const ChatPart = () => {
  const [chatList, setChatList] = useState<Array<chat>>();
  const { chat } = useSelector((state: RootState) => state.chat);
  const { isLoading: chatLoading } = useGetChatsQuery({});
  const { data, isLoading: messageLoading } = useGetMessagesQuery(
    { chatId: chat?.chatId },
    {
      skip: !chat?.chatId,
    }
  );
  return (
    <>
      {!messageLoading && !chatLoading && (
        <>
          <ChatHeader />
          <ChatSection
            chatList={chatList}
            setChatList={setChatList}
            data={data}
          />
          <InputSection chatList={chatList} setChatList={setChatList} />
        </>
      )}
    </>
  );
};

export default ChatPart;
