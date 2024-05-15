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
import { useEffect, useState } from "react";
import { socket } from "../../app/socket";

const ChatPart = () => {
  const { chat } = useSelector((state: RootState) => state.chat);
  const [chatList, setChatList] = useState<chat[]>([]);
  const { isLoading: chatLoading } = useGetChatsQuery({});
  const { user }: { user: any } = useSelector((state: RootState) => state.auth);
  const [readChat] = useUpdateAsReadMutation();

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
      console.log(user.id);
      socket.emit("updateStatus", { userId: user?.id, status: "online" });
    });
    return () => {
      socket.emit("leave", chat.chatId);
    };
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
          await readChat(data.chatId || "");
          socket.emit("read", data.chatId);
        } catch (e) {
          console.log(e);
        }
      });
    };
  }, []);
  useEffect(() => {
    socket.on("read", () => {
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
      {!chatLoading && chat.chatId && (
        <>
          <ChatHeader />
          <ChatSection chatList={chatList} setChatList={setChatList} />
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
