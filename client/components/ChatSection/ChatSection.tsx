"use client";
import { useUpdateAsReadMutation } from "@/redux/Apis/message.api";
import MessageUi from "../MessageUi/MessageUi";
import { FC, Key, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/Store";
import { io } from "socket.io-client";
import { cloneDeep } from "lodash";
export interface chat {
  id?: string;
  senderId?: string;
  receiverId?: string;
  message: string;
  unread?: number;
  createdAt: Date;
  updatedAt: Date;
  chatId?: string;
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
  isRead: boolean;
  isDeleted: boolean;
}
interface props {
  chatList: Array<chat> | undefined;
  setChatList: (value: any) => void;
  data: Array<chat>;
}

const ChatSection: FC<props> = ({ data, chatList, setChatList }) => {
  const socket = useMemo(() => io("http://localhost:8800"), []);

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
    if (data) {
      const chatData = cloneDeep(data);

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
                isRead: boolean;
                isDeleted: boolean;
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
