"use client";
import {
  useGetMessagesQuery,
  useUpdateAsReadMutation,
} from "@/redux/Apis/message.api";
import MessageUi from "../MessageUi/MessageUi";
import { FC, Key, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/Store";
import { useGetChatsQuery } from "@/redux/Apis/chat.api";
export interface chat {
  message: string;
  sender: {
    id: string;
    name: string;
    email: string;
    avatar: { url: string };
  };
  status: string;
  receiver: {
    id: string;
    name: string;
    email: string;
    avatar: { url: string };
  };
  time: string;
  isRead: boolean;
  isDeleted: boolean;
  isEdited: boolean;
}
interface props {
  chatList: Array<chat> | undefined;
  setChatList: (value: Array<chat>) => void;
  data: Array<chat>;
}

const ChatSection: FC<props> = ({ data, chatList, setChatList }) => {
  const [updatRead] = useUpdateAsReadMutation();
  const {
    user,
  }: {
    user: {
      id: string;
      name: string;
      email: string;
      avatar: {
        url: string;
      };
    } | null;
  } = useSelector((state: RootState) => state.auth);
  const { chat } = useSelector((state: RootState) => state.chat);

  useEffect(() => {
    if (chat.chatId) updatRead(chat.chatId);
  }, [chat]);

  useEffect(() => {
    if (data) {
      const chatData: Array<chat> = data.filter(
        (chat: any) => chat.isDeleted === false
      );
      setChatList(chatData.reverse());
    }
  }, [data]);

  return (
    <div className="h-[calc(100%_-_120px)] py-3 flex flex-col-reverse gap-2 overflow-y-scroll">
      {chatList?.map(
        (
          chat:
            | {
                message: string;
                sender: {
                  id: string;
                  name: string;
                  email: string;
                  avatar: { url: string };
                };
                status: string;
                receiver: {
                  id: string;
                  name: string;
                  email: string;
                  avatar: { url: string };
                };
                time: string;
                isRead: boolean;
                isDeleted: boolean;
                isEdited: boolean;
              }
            | undefined,
          index: Key | null | undefined
        ) => (
          <MessageUi chat={chat} user={user} key={index} />
        )
      )}
    </div>
  );
};

export default ChatSection;
