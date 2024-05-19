"use client";

import React, { useContext, useEffect, useRef } from "react";
import { IoVideocam } from "react-icons/io5";
import { HiSpeakerWave } from "react-icons/hi2";
import { MdCallEnd } from "react-icons/md";
import { useRouter } from "next/navigation";
import { CallContext } from "@/Context/CallContext";
const Call = () => {
  const router = useRouter();
  const { myVideo, userVideo, setStream, vid, setAudio, setVideo, audio } =
    useContext(CallContext);
  return (
    <div className="bg-black h-screen w-full">
      <div className="flex w-full h-full relative">
        <div className="flex h-full w-full relative">
          <video
            className="absolute top-0 right-0 w-full h-full"
            ref={userVideo}
            autoPlay
            playsInline
          ></video>
          <div className="absolute w-[180px] bottom-10 right-10   h-[230px]">
            <video
              className="w-full h-full"
              ref={myVideo}
              autoPlay
              playsInline
              muted
            ></video>
          </div>
        </div>
        <div className="flex absolute bottom-0 right-0 w-full justify-center items-center h-[80px] bg-transparent">
          <div className="flex justify-evenly items-center bg-opacity-35 backdrop-filter w-[350px] h-16 rounded-full backdrop-blur-[2px] bg-white">
            <div
              onClick={setVideo((prev: boolean) => !prev)}
              className="flex w-12 h-12 rounded-full bg-slate-400  justify-center items-center"
            >
              <IoVideocam size={24} />
            </div>
            <div
              onClick={setAudio((prev: boolean) => !prev)}
              className="flex w-12 h-12 rounded-full bg-slate-400  justify-center items-center"
            >
              <HiSpeakerWave size={24} />
            </div>
            <div
              onClick={() => {
                router.push("/");
              }}
              className="flex w-12 h-12 rounded-full bg-red-700  justify-center items-center"
            >
              <MdCallEnd size={24} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Call;
