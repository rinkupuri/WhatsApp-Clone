"use client";
import ChatHeader from "../Headers/ChatHeader";
import ChatSection, { chat } from "../ChatSection/ChatSection";
import InputSection from "../InputSection/InputSection";
import { useSelector } from "react-redux";
import { RootState, Store } from "@/redux/Store";
import { useGetChatsQuery } from "@/redux/Apis/chat.api";
import {
  useGetMessagesQuery,
  useUpdateAsReadMutation,
} from "@/redux/Apis/message.api";
import { useEffect, useState } from "react";
import { socket } from "../../app/socket";
import { removeChat } from "@/redux/ChatReducer/chatReducer";

const ChatPart = () => {
  const { chat } = useSelector((state: RootState) => state.chat);
  const [chatList, setChatList] = useState<chat[]>([]);
  const { isLoading: chatLoading } = useGetChatsQuery({});
  const { user }: { user: any } = useSelector((state: RootState) => state.auth);
  const [readChat] = useUpdateAsReadMutation();

  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("updateStatus", { userId: user?.id, status: "online" });
    });
    return () => {
      socket.emit("leave", chat.chatId);
    };
  }, []);

  useEffect(() => {
    if (chat.chatId) {
      socket.emit("join", chat.chatId);
      readChat({ chatId: chat?.chatId, status: "Read" }).then(() => {
        socket.emit("read", { chatId: chat?.chatId, status: "Read" });
      });
    }
    return () => {
      socket.emit("leave", chat.chatId);
    };
  }, [chat?.chatId]);
  useEffect(() => {
    return () => {
      socket.on("message", async (data: chat) => {
        try {
          setChatList((prev: any) => {
            const chatDataList = [...prev];
            return [...chatDataList.reverse(), data].reverse();
          });
          if (data?.chatId)
            await readChat({ chatId: data?.chatId, status: "Read" });
          socket.emit("read", { chatId: data.chatId, status: "Read" });
        } catch (e) {}
      });
    };
  }, []);
  useEffect(() => {
    socket.on("read", (data: { chatId: string; status: string }) => {
      const { chatId, status } = data;
      console.log(status);
      setChatList((prev) => {
        return prev.map((m) => {
          if (
            m.senderId === user.id &&
            m.status !== "Read" &&
            m.status !== "pending"
          ) {
            m.status = status;
          }
          return m;
        });
      });
    });
  }, []);

  useEffect(() => {
    if (chat?.chatId)
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          socket.emit("leave", chat?.chatId);
          Store.dispatch(removeChat());
        }
      });
    return () => {
      document.removeEventListener("keydown", (e) => {});
    };
  }, [chat?.chatId]);

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
