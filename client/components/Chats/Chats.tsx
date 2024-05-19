"use client";
import { useGetChatsQuery } from "@/redux/Apis/chat.api";
import ChatCard from "../ChatCard/ChatCard";
import { Key, use, useContext, useEffect, useRef, useState } from "react";
import { socket } from "@/app/socket";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/Store";
import { cloneDeep, update } from "lodash";
import { useUpdateAsReadMutation } from "@/redux/Apis/message.api";
import { CallContext } from "@/Context/CallContext";
import Call from "../Call/Call";

const Chats = () => {
  const { chat } = useSelector((state: RootState) => state.chat);
  const { user }: { user: any } = useSelector((state: RootState) => state.auth);
  const { data, isLoading, isSuccess } = useGetChatsQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const [updateStatus] = useUpdateAsReadMutation();
  const [chats, setChats] = useState<any>(cloneDeep(data?.chat));
  const { call } = useContext(CallContext);
  console.log(call);
  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("join", user.id);
    });
  });

  useEffect(() => {
    socket.on("chat", (data: any) => {
      if (!(chat.users.length > 1) && !chat.users.includes(data.senderId)) {
        const mess = cloneDeep(data);
        console.log(data);
        updateStatus({ chatId: data.id, status: "delivered" });
        socket.emit("read", { chatId: data.chatId, status: "delivered" });
        setChats((prev: any) => [
          ...prev
            .map((chat: any) => {
              if (chat.users.includes(data.senderId)) {
                if (chat.lastmessage.message !== mess.message) {
                  chat.unread++;
                  chat.lastmessage.message = mess.message;
                }
              }
              return chat;
            })
            .sort((a: any, b: any) => b.unread - a.unread),
        ]);
        console.log(chats);
      }
    });
    return () => {
      socket.off("chat");
    };
  }, [chat]);

  return (
    <>
      <div className="flex *:transition-all duration-500  w-full flex-col">
        {call && <Call />}

        {chats &&
          chats?.map((chat: any, index: number | Key) => (
            <div key={index} className="w-full chatCard">
              <ChatCard setChats={setChats} chat={chat} />
            </div>
          ))}
      </div>
    </>
  );
};

export default Chats;
