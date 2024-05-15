"use client";
import { useGetChatsQuery } from "@/redux/Apis/chat.api";
import ChatCard from "../ChatCard/ChatCard";
import { useEffect, useState } from "react";
import { socket } from "@/app/socket";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/Store";
import { cloneDeep } from "lodash";
import { useUpdateAsReadMutation } from "@/redux/Apis/message.api";

const Chats = () => {
  const { user }: { user: any } = useSelector((state: RootState) => state.auth);
  const { data, isLoading, isSuccess } = useGetChatsQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const [updateChat] = useUpdateAsReadMutation();
  const [chats, setChats] = useState<any>(cloneDeep(data.chat));

  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("join", user.id);
    });
  });

  useEffect(() => {
    return () => {
      socket.on("chat", (data: any) => {
        const mess = cloneDeep(data);
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
      });
    };
  }, []);

  return (
    <>
      <div className="flex *:transition-all duration-500  w-full flex-col">
        {chats &&
          chats?.map((chat: any) => (
            <ChatCard setChats={setChats} chat={chat} />
          ))}
      </div>
    </>
  );
};

export default Chats;
