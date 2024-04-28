"use client";

import { useGetChatsQuery } from "@/redux/Apis/chat.api";
import {
  useGetMessagesQuery,
  useSendMessageMutation,
} from "@/redux/Apis/message.api";
import { RootState } from "@/redux/Store";
import React, { FC, useEffect, useRef } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { IoDocumentAttach, IoSend } from "react-icons/io5";
import { useSelector } from "react-redux";
import { chat } from "../ChatSection/ChatSection";

interface props {
  chatList: Array<chat> | undefined;
  setChatList: (value: Array<chat>) => void;
}
const InputSection: FC<props> = ({ chatList, setChatList }) => {
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

  const handelSend = () => {
    console.log(user?.id);
    if (chatList) {
      const chatDataList: any = [...chatList];
      setChatList(
        [
          ...chatDataList.reverse(),
          {
            id: user?.id,
            senderId: user?.id,
            receiverId: chat.users
              .filter((id: string) => id !== user?.id)
              .toString(),
            message: message.current.value,
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
        ].reverse()
      );
    }

    sendMessage({
      message: message.current.value,
      chatId: chat.chatId,
      receiverId: chat.users.filter((id: string) => id !== user?.id).toString(),
    }).then(() => {
      refetch();
      refetchChat();
    });
    message.current.value = "";
  };
  return (
    <div className="w-full border-[1px] flex h-[60px]">
      <div className="flex flex-[3]">
        <input
          ref={message}
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
