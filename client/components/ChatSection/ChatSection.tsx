"use client";
import MessageUi from "../MessageUi/MessageUi";
import { FC, Key, useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/Store";
import { cloneDeep } from "lodash";
import { useGetMessagesQuery } from "@/redux/Apis/message.api";
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
}

const ChatSection: FC<props> = ({ chatList, setChatList }) => {
  const chatDiv = useRef<HTMLDivElement | null>(null);
  const [page, setPage] = useState(1);
  const { chat } = useSelector((state: RootState) => state.chat);
  const {
    data: msgData,
    isLoading,
    isSuccess,
    refetch,
  } = useGetMessagesQuery(
    { chatId: chat.chatId, page },
    {
      skip: !chat.chatId,
      refetchOnMountOrArgChange: true,
    }
  );

  // useEffect(() => {
  //   if (msgData) {
  //     const chatData = cloneDeep(msgData);
  //     setChatList((prev: chat[]) => [...chatData, ...prev].reverse());
  //   }
  // }, [msgData, isLoading]);

  // obsarver setup

  // user data
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

  useEffect(() => {
    chat.chatId && setChatList([]);
    refetch();
  }, [chat.chatId]);

  useEffect(() => {
    if (msgData) {
      const newChatData = cloneDeep(msgData).reverse();
      setChatList((prevChatList: chat[]) => {
        const updatedChatList = [...prevChatList];
        newChatData.forEach((newChat: chat) => {
          if (!updatedChatList.some((chat) => chat.id === newChat.id)) {
            updatedChatList.push(newChat);
          }
        });
        return updatedChatList;
      });
    }
  }, [msgData, setChatList]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (chatDiv.current) observer.unobserve(entry.target);

            if (!isLoading) setPage((prev: number) => prev + 1);
          }
        });
      },
      {
        root: null,
        rootMargin: "300px",
        threshold: 0,
      }
    );
    if (chatList?.length)
      if (chatList?.length > 50)
        if (chatDiv.current) {
          observer.observe(chatDiv.current);
        }
  }, [chatList]);

  return (
    <>
      <div className="h-[calc(100%_-_120px)] scroll-smooth py-3 flex flex-col-reverse gap-2 overflow-y-scroll">
        {chatList?.length &&
          chatList?.map(
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
              index: Key
            ) => (
              <>
                <div key={index} ref={chatDiv} className="w-full">
                  <MessageUi chat={chat} user={user} />
                </div>
                {isLoading && (
                  <div className="flex justify-center items-center">
                    <div className="w-[30px] rounded-full  border-b border-black animate-spin items-center h-[30px]"></div>
                  </div>
                )}
              </>
            )
          )}
      </div>
    </>
  );
};

export default ChatSection;
