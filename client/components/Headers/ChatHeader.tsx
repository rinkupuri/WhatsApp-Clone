import React from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { IoCall, IoVideocam } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Separator } from "../ui/separator";

const ChatHeader = () => {
  return (
    <div className="w-full border-l-[1px] bg-primary flex shadow px-4 items-center justify-between h-[60px]">
      <div className="flex-[1]">
        <Avatar>
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
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
