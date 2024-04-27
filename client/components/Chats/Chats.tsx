"use client";
import { useGetChatsQuery } from "@/redux/Apis/chat.api";
import ChatCard from "../ChatCard/ChatCard";
import { useEffect, useState } from "react";

const Chats = () => {
  const [chats, setChats] = useState<Array<Object>>([{}]);
  const { data, isLoading, isSuccess } = useGetChatsQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
    }
  );
  useEffect(() => {
    if (isSuccess) {
      setChats(data.chat);
    }
  }, [data, isLoading, isSuccess]);
  return (
    <>
      <div className="flex  w-full flex-col">
        {chats && chats?.map((chat: any) => <ChatCard chat={chat} />)}
      </div>
    </>
  );
};

export default Chats;
