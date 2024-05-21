"use client";
import { useDeleteChatMutation, useGetChatsQuery } from "@/redux/Apis/chat.api";
import ChatCard from "../ChatCard/ChatCard";
import { Key, use, useContext, useEffect, useRef, useState } from "react";
import { socket } from "@/app/socket";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/Store";
import { cloneDeep, update } from "lodash";
import { useUpdateAsReadMutation } from "@/redux/Apis/message.api";
import { CallContext } from "@/Context/CallContext";
import Call from "../Call/Call";
import { Clicker_Script } from "next/font/google";

const Chats = () => {
  // user chat Redux State
  const { chat } = useSelector((state: RootState) => state.chat);

  // User data Redux Data
  const { user }: { user: any } = useSelector((state: RootState) => state.auth);

  // delete message querry hook
  const [deleteMessage] = useDeleteChatMutation();

  //  Geting data from Server By redux Querry
  const { data, isLoading, isSuccess } = useGetChatsQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
    }
  );

  // Updating status message with Redux Querry
  const [updateStatus] = useUpdateAsReadMutation();

  // main chat managment state hook
  const [chats, setChats] = useState<any>(cloneDeep(data?.chat));

  // video call context hook
  const { call } = useContext(CallContext);

  // use effect to join socket group to receive meassges and call
  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("join", user.id);
    });
  });

  // Receiving new and updating all into frontend

  useEffect(() => {
    socket.on("chat", (data: any) => {
      if (!(chat.users.length > 1) && !chat.users.includes(data.senderId)) {
        const mess = cloneDeep(data);
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
              <ChatCard
                deleteMessage={deleteMessage}
                setChats={setChats}
                chat={chat}
              />
            </div>
          ))}
      </div>
    </>
  );
};

export default Chats;
