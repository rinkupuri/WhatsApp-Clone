import { Avatar, AvatarFallback } from "../ui/avatar";
import { FaChevronDown } from "react-icons/fa";
import moment from "moment";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { FC } from "react";
import { Store } from "@/redux/Store";
import { setChat } from "@/redux/ChatReducer/chatReducer";

export interface ChatCardProps {
  chat: {
    id: string;
    users: Array<string>;
    lastmessage: {
      message: string;
      date: Date;
    };
    isDeleted: boolean;

    isRead: boolean;
    unread: number;

    chatId: string;
    user: {
      name: string;
      email: string;
      avatar: string;
    };
  };
}

const ChatCard: FC<ChatCardProps> = ({ chat }) => {
  const handelChatClick = () => {
    Store.dispatch(setChat({ chat: chat }));
  };
  return (
    <div
      onClick={handelChatClick}
      className="w-full gap-4 cursor-pointer flex justify-center h-[70px] items-center "
    >
      <div className="flex justify-between items-center h-full  w-11/12">
        <div className="flex flex-[1]">
          <Avatar className="w-12 h-12">
            <img src={chat.user?.avatar} alt="" />
            <AvatarFallback>
              {chat.user?.name.split(" ").map((value) => value.slice(0, 1))}
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-[4] flex-col">
          <span className="text-sm font-[600]">{chat.user?.name}</span>
          <span className="text-xs text-black/60">
            {chat.lastmessage?.message}
          </span>
        </div>
        <div className="flex gap-2 justify-center items-center flex-col flex-[1]">
          <span className="text-xs">
            {chat.lastmessage?.date.toString().split("T")[0].toString()}
          </span>
          <div className="flex gap-4 mr-2 justify-center items-center">
            {chat.unread > 0 && (
              <span className="w-6 h-6 text-[12px] font-[600] text-center flex justify-center items-center  rounded-full bg-primary text-black  ">
                1
              </span>
            )}
            {!chat.isRead && (
              <span className="w-6 h-6 text-[12px] font-[600] text-center flex justify-center items-center  rounded-full bg-primary text-black  "></span>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger>
                <FaChevronDown size={15} />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[200px] py-4 *:mx-2 flex flex-col gap-4"
                align="start"
              >
                <DropdownMenuItem>Mute Chat</DropdownMenuItem>
                <DropdownMenuItem>Archive Chat</DropdownMenuItem>
                <DropdownMenuItem>Delete Chat</DropdownMenuItem>
                <DropdownMenuItem>Mark as Unread</DropdownMenuItem>
                <DropdownMenuItem>Block</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatCard;
