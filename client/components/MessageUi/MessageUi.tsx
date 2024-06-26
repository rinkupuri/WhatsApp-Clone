import { Avatar, AvatarFallback } from "../ui/avatar";
import { LiaCheckDoubleSolid } from "react-icons/lia";
import { FC } from "react";
import { Check, Clock9 } from "lucide-react";
import { timeSeter } from "@/lib/utils";

interface MessageType {
  user: {
    id: string;
    name: string;
    email: string;
    avatar: {
      url: string;
    };
  } | null;
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
    status: string;
    receiver: {
      id: string;
      name: string;
      email: string;
      avatar: { url: string };
    };
    isRead: boolean;
    isDeleted: boolean;
    createdAt: Date;
  };
}

const MessageUi: FC<MessageType> = ({ chat, user }) => {
  return (
    <div
      className={`${
        chat?.sender?.id === user?.id && "flex-row-reverse"
      } w-full messageClass  flex  px-2 items-center gap-4 mt-2 min-h-[30px]`}
    >
      <Avatar>
        {chat?.sender?.id === user?.id ? (
          <AvatarFallback>{chat?.sender?.name}</AvatarFallback>
        ) : (
          <AvatarFallback>{chat?.receiver?.name}</AvatarFallback>
        )}
      </Avatar>
      <div
        className={`${
          chat?.sender?.id === user?.id
            ? "rounded-br-2xl rounded-bl-2xl bg-primary/90 rounded-tl-2xl"
            : "rounded-br-2xl rounded-bl-2xl rounded-tr-2xl bg-slate-300 "
        } flex w-fit  justify-center items-center   h-full min-h-[40px] gap-1 py-1 px-4 `}
      >
        <div className="flex min-h-[40px] justify-center items-center">
          <p className="text-[14px] ">{chat?.message || "sample message"}</p>
        </div>
        <div className="flex gap-1 min-h-[40px]  justify-end items-end">
          <p className="text-[10px]  text-black/80">
            {chat?.createdAt && timeSeter(chat?.createdAt)}
          </p>
          {chat?.sender?.id === user?.id && (
            <>
              {chat?.status && chat?.status === "sent" ? (
                <Check size={15} className="mb-1" />
              ) : chat?.status === "delivered" ? (
                <LiaCheckDoubleSolid size={15} className="mb-1" />
              ) : chat?.status === "pending" ? (
                <Clock9 size={10} className="mb-1" />
              ) : (
                chat?.status === "Read" && (
                  <LiaCheckDoubleSolid
                    size={15}
                    color="blue"
                    className="mb-1"
                  />
                )
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageUi;
