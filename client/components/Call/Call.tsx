"use client";
import { motion } from "framer-motion";
import FramerDiv from "../Animation/FramerDiv";
import { Phone } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { MdCall, MdCallEnd } from "react-icons/md";

const Call = () => {
  return (
    <div className="flex justify-center items-center fixed top-0 left-0 w-full">
      <motion.div
        initial={{ y: -200, opacity: 0 }}
        animate={{ y: 20, opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute bg-black border-[1px] bg-opacity-5 backdrop-filter backdrop-blur-[2px] flex justify-evenly items-center  top-0  w-[350px]  rounded-md h-[70px]"
      >
        <div className="flex justify-center items-center rounded-full mr-2 w-12 h-12  bg-red-800/80">
          <MdCall color="white" size={24} />
        </div>
        <div className="flex">
          <div className="flex">
            <Avatar className="w-12 h-12 justify-center items-center *:bg-black/20 rounded-full mr-2">
              <AvatarFallback>RP</AvatarFallback>
            </Avatar>
            <div className="flex flex-col justify-center items-center">
              <h1 className="">Name</h1>
              <p className="text-[10px] ml-2">Incoming Call</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center rounded-full ml-4 w-12 h-12  bg-lime-600">
          <MdCallEnd color="white" size={24} />
        </div>
      </motion.div>
    </div>
  );
};

export default Call;
