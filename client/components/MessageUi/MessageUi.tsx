import { Avatar, AvatarFallback } from "../ui/avatar";
import { FC } from "react";

interface MessageType {
  chat?: {
    // generate a interafce of chat message
    message: string;
    sender: {
      id: string;
      name: string;
      email: string;
      avatar: {
        url: string;
      };
    };
    time: string;
    isRead: boolean;
    isDeleted: boolean;
    isEdited: boolean;
  };
}

const MessageUi: FC<MessageType> = ({ chat }) => {
  return (
    <div
      className={`${
        chat?.sender.id === "shbfkjhdksj" ? "flex-row-reverse" : ""
      } w-full  flex  px-4 items-center gap-4 min-h-[60px]`}
    >
      <Avatar>
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div
        className={`${
          chat?.sender.id === "shbfkjhdksj"
            ? "flex-row-reverse rounded-br-2xl rounded-bl-2xl bg-primary/90 rounded-tl-2xl"
            : "rounded-br-2xl rounded-bl-2xl rounded-tr-2xl bg-slate-300 "
        } flex w-fit  justify-center items-center   h-full min-h-[40px] gap-1 py-1 px-4 `}
      >
        <div className="flex min-h-[40px] justify-center items-center">
          <p className="text-[14px] ">{chat?.message || "sample message"}</p>
        </div>
        <div className="flex min-h-[40px]  justify-end items-end">
          <p className="text-[10px] text-black/80">2:30pm</p>
        </div>
      </div>
    </div>
  );
};

export default MessageUi;
