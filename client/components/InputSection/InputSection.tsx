import React from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { IoDocumentAttach, IoSend } from "react-icons/io5";

const InputSection = () => {
  return (
    <div className="w-full border-[1px] flex h-[60px]">
      <div className="flex flex-[3]">
        <input
          className="w-full px-4 outline-none focus:outline-none"
          placeholder="Enter Message here"
          type="text"
        />
      </div>
      <div className="flex justify-end px-4  gap-5 items-center  flex-[1]">
        <IoDocumentAttach size={20} />
        <BsEmojiSmile size={20} />
        <button className="bg-[#1d9bf0] text-white p-2 w-10 h-10 flex justify-center items-center rounded-full">
          <IoSend size={20} />
        </button>
      </div>
    </div>
  );
};

export default InputSection;
