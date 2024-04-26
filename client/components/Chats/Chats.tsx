import React from "react";
import ChatCard from "../ChatCard/ChatCard";

const Chats = () => {
  return (
    <>
      <div className="flex  w-full flex-col">
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
      </div>
    </>
  );
};

export default Chats;
