"use client";

import { useGetChatsQuery } from "@/redux/Apis/chat.api";
import {
  useGetMessagesQuery,
  useSendMessageMutation,
} from "@/redux/Apis/message.api";
import { RootState } from "@/redux/Store";
import React, { FC, KeyboardEvent, useEffect, useRef } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { IoDocumentAttach, IoSend } from "react-icons/io5";
import { useSelector } from "react-redux";
import { chat } from "../ChatSection/ChatSection";

interface props {
  chatList: chat[] | undefined;
  setChatList: (value: any) => void;
  socket?: any;
}
const InputSection: FC<props> = ({ socket, chatList, setChatList }) => {
  const message: string | any = useRef<any>("");
  const { chat } = useSelector((state: RootState) => state.chat);
  const { user }: { user: any } = useSelector((state: RootState) => state.auth);
  const [sendMessage, { data, isLoading, isSuccess, isError }] =
    useSendMessageMutation();
  const { refetch: refetchChat } = useGetChatsQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const { data: chatData, refetch } = useGetMessagesQuery(
    { chatId: chat.chatId },
    {
      skip: !chat?.id,
      refetchOnMountOrArgChange: true,
    }
  );

  const handelSend = async () => {
    const messagevalue = message.current.value;
    message.current.value = "";
    console.log("click");
    const chatid: string | undefined = `${Math.round(
      Math.random() * 1000000000000
    )}`;
    if (chatList) {
      setChatList((prev: any) => {
        const chatDataList = [...prev];
        return [
          ...chatDataList.reverse(),
          {
            id: chatid,
            senderId: user?.id,
            receiverId: chat.users
              .filter((id: string) => id !== user?.id)
              .toString(),
            message: messagevalue,
            isDeleted: false,
            isRead: false,
            unread: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
            chatId: chat?.chatId,
            status: "pending",
            sender: {
              id: user?.id,
              name: user.name,
              email: user.email,
              avatar: user.avatar,
            },
            receiver: chat.user,
          },
        ].reverse() as any;
      });
    }
    await sendMessage({
      message: messagevalue,
      chatId: chat.chatId,
      receiverId: chat.users.filter((id: string) => id !== user?.id).toString(),
    });
    console.log("emit");
    socket.emit("message", {
      message: messagevalue,
      chatId: chat.chatId,
      receiverId: chat.users.filter((id: string) => id !== user?.id).toString(),
      messageUser: {
        id: chatid,
        senderId: user?.id,
        receiverId: chat.users
          .filter((id: string) => id !== user?.id)
          .toString(),
        message: messagevalue,
        isDeleted: false,
        isRead: false,
        unread: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        chatId: chat?.chatId,
        status: "sent",
        sender: {
          id: user?.id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
        },
        receiver: chat.user,
      },
    });
    setChatList((prev: chat[]) => {
      const chatS = prev.map((chat: chat) => {
        if (chat.id === chatid) {
          return { ...chat, status: "sent" };
        }
        return chat;
      });
      return [...chatS];
    });
  };

  const handelKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handelSend();
    }
  };
  return (
    <div className="w-full border-[1px] flex h-[60px]">
      <div className="flex flex-[3]">
        <input
          ref={message}
          onKeyDown={handelKeyPress}
          className="w-full px-4 outline-none focus:outline-none"
          placeholder="Enter Message here"
          type="text"
        />
      </div>
      <div className="flex justify-end px-4  gap-5 items-center  flex-[1]">
        <IoDocumentAttach size={20} />
        <BsEmojiSmile size={20} />
        <button
          onClick={handelSend}
          className="bg-[#1d9bf0] text-white p-2 w-10 h-10 flex justify-center items-center rounded-full"
        >
          <IoSend size={20} />
        </button>
      </div>
    </div>
  );
};

export default InputSection;
