import React from "react";
import MessageUi from "../MessageUi/MessageUi";

const ChatSection = () => {
  const chat = [
    {
      // generate a interafce of chat message
      message: "sample message",
      sender: {
        id: "shbfkjhdksj",
        name: "rinku",
        email: "rp@dev.com",
        avatar: {
          url: "sdhfgvkudyf",
        },
      },
      time: "jhb",
      isRead: true,
      isDeleted: true,
      isEdited: true,
    },
    {
      // generate a interafce of chat message
      message: "sample message",
      sender: {
        id: "shbfkhdksj",
        name: "rinku",
        email: "rp@dev.com",
        avatar: {
          url: "sdhfgvkudyf",
        },
      },
      time: "jhb",
      isRead: true,
      isDeleted: true,
      isEdited: true,
    },
    {
      // generate a interafce of chat message
      message: "sample message",
      sender: {
        id: "shbfkjhdksj",
        name: "rinku",
        email: "rp@dev.com",
        avatar: {
          url: "sdhfgvkudyf",
        },
      },
      time: "jhb",
      isRead: true,
      isDeleted: true,
      isEdited: true,
    },
    {
      // generate a interafce of chat message
      message: "sample message",
      sender: {
        id: "shbfkhdksj",
        name: "rinku",
        email: "rp@dev.com",
        avatar: {
          url: "sdhfgvkudyf",
        },
      },
      time: "jhb",
      isRead: true,
      isDeleted: true,
      isEdited: true,
    },
    {
      // generate a interafce of chat message
      message: "sample message",
      sender: {
        id: "shbfkjhdksj",
        name: "rinku",
        email: "rp@dev.com",
        avatar: {
          url: "sdhfgvkudyf",
        },
      },
      time: "jhb",
      isRead: true,
      isDeleted: true,
      isEdited: true,
    },
    {
      // generate a interafce of chat message
      message: "sample message",
      sender: {
        id: "shbfkhdksj",
        name: "rinku",
        email: "rp@dev.com",
        avatar: {
          url: "sdhfgvkudyf",
        },
      },
      time: "jhb",
      isRead: true,
      isDeleted: true,
      isEdited: true,
    },
  ];
  return (
    <div className="h-[calc(100%_-_120px)]">
      {chat.reverse().map((chat, index) => (
        <MessageUi chat={chat} key={index} />
      ))}
    </div>
  );
};

export default ChatSection;
