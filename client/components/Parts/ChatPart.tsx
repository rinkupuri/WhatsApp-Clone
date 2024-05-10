"use client";
import ChatHeader from "../Headers/ChatHeader";
import ChatSection, { chat } from "../ChatSection/ChatSection";
import InputSection from "../InputSection/InputSection";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/Store";
import { useGetChatsQuery } from "@/redux/Apis/chat.api";
import {
  useGetMessagesQuery,
  useUpdateAsReadMutation,
} from "@/redux/Apis/message.api";
import { use, useEffect, useMemo, useState } from "react";
import { socket } from "../../app/socket";
import { cloneDeep } from "lodash";

const ChatPart = () => {
  const { chat } = useSelector((state: RootState) => state.chat);
  const [chatId, setChatId] = useState(chat?.chatId ? chat.chatId : "");
  const [chatList, setChatList] = useState([
    {
      senderId: "",
      receiverId: "",
      message: "",
      isDeleted: false,
      isRead: false,
      unread: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      chatId: "",
      status: "pending",
      sender: {
        id: "",
        name: "",
        email: "",
        avatar: {
          url: "",
        },
      },
      receiver: {
        id: "",
        name: "",
        email: "",
        avatar: {
          url: "",
        },
      },
    },
  ]);
  const { isLoading: chatLoading } = useGetChatsQuery({});
  const { user }: { user: any } = useSelector((state: RootState) => state.auth);
  const [readChat] = useUpdateAsReadMutation();
  const {
    data,
    isLoading: messageLoading,
    refetch,
  } = useGetMessagesQuery(
    { chatId: chat?.chatId },
    {
      skip: !chat?.chatId,
      refetchOnMountOrArgChange: true,
    }
  );

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
      socket.emit("updateStatus", { userId: user.id, status: "online" });
    });
  }, []);

  useEffect(() => {
    if (chat.chatId) {
      socket.emit("join", chat.chatId);
      readChat(chat.chatId).then(() => {
        socket.emit("read", chat.chatId);
        console.log("set read");
      });
    }
    return () => {
      socket.emit("leave", chat.chatId);
    };
  }, [chat?.chatId]);
  useEffect(() => {
    return () => {
      socket.on("message", async (data: chat) => {
        console.log(data.chatId);
        try {
          setChatList((prev: any) => {
            const chatDataList = [...prev];
            return [...chatDataList.reverse(), data].reverse();
          });
          console.log(data.chatId);
          await readChat(data.chatId || "");
          socket.emit("read", data.chatId);
        } catch (e) {
          console.log(e);
        }
      });
    };
  }, []);
  useEffect(() => {
    socket.on("read", (data: chat) => {
      console.log("Read");
      setChatList((prev) => {
        return prev.map((m) => {
          if (m.senderId === user.id && m.status === "sent") {
            m.status = "Read";
          }
          return m;
        });
      });
    });
  }, []);

  return (
    <>
      {!messageLoading && !chatLoading && chat.chatId && (
        <>
          <ChatHeader />
          <ChatSection
            chatList={chatList}
            setChatList={setChatList}
            data={data}
          />
          <InputSection
            socket={socket}
            chatList={chatList}
            setChatList={setChatList}
          />
        </>
      )}
    </>
  );
};

export default ChatPart;
