"use client";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { IoCall, IoVideocam } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Separator } from "../ui/separator";
import { RootState } from "@/redux/Store";
import { useSelector } from "react-redux";
import { ChatCardProps } from "../ChatCard/ChatCard";
import { useEffect } from "react";

const ChatHeader = () => {
  const { chat }: { chat: ChatCardProps["chat"] } = useSelector(
    (state: RootState) => state.chat
  );
  const {
    user,
  }: {
    user: any;
  } = useSelector((state: RootState) => state.auth);

  return (
    <div className="w-full border-l-[1px] bg-primary flex shadow px-4 items-center justify-between h-[60px]">
      <div className="flex-[1] flex">
        <Avatar>
          <AvatarImage src={chat?.user?.avatar} alt="User avatar" />
          <AvatarFallback>
            {chat?.user?.name
              .split(" ")
              .map((value) => value.charAt(0).toUpperCase()) || "RP"}
          </AvatarFallback>
        </Avatar>

        <div className="flex ml-4 flex-col">
          <h1 className="m-0 font-[600] text-sm p-0">{chat?.user?.name}</h1>
          <p className="text-xs p-0 m-0 text-black/60">
            {user?.status ? user?.status : ""}
          </p>
        </div>
      </div>
      <div className="flex-[1] flex gap-4 justify-end items-center">
        <div className="flex bg-black/20 rounded-full p-2 w-[100px] justify-evenly items-center">
          <IoVideocam className="cursor-pointer" size={22} />
          <Separator orientation="vertical" className="border-black" />
          <IoCall className="cursor-pointer" size={20} />
        </div>
        <BsThreeDotsVertical className="cursor-pointer" size={22} />
      </div>
    </div>
  );
};

export default ChatHeader;
