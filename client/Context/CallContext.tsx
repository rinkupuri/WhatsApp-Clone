"use client";

import { createContext, useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/Store";
import { socket } from "@/app/socket";
import { useRouter } from "next/navigation";

export const CallContext = createContext<any>(null);

const CallProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { user }: { user: any } = useSelector((state: RootState) => state.auth);
  const [stream, setStream] = useState<MediaStream>();
  const [call, setCall] = useState<any>();
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [audio, setAudio] = useState(true);
  const [vid, setVideo] = useState(true);
  const myVideo = useRef<any>();
  const userVideo = useRef<any>();

  useEffect(() => {
    console.log(stream);
  }, [stream]);

  useEffect(() => {
    socket.on("callUser", ({ from, signal }) => {
      setCall({ isCallReceived: true, from, signal });
    });
  }, []);

  const callUser = (id: string) => {
    router.push(`call/${id}`);
    navigator.mediaDevices
      .getUserMedia({ video: vid, audio: audio })
      .then((stream) => {
        setStream(stream);
        if (myVideo.current) {
          myVideo.current.srcObject = stream;
        }
        if (stream?.active) {
          console.log("call User " + id + "  " + user.id);

          const peer = new Peer({ initiator: true, trickle: false, stream });
          peer.on("signal", (data) => {
            socket.emit("callUser", {
              to: id,
              signal: data,
              from: user,
            });
          });
          socket.on("callAccepted", (signal) => {
            setCallAccepted(true);
            console.log(signal);
            peer.signal(signal);
          });
          peer.on("stream", (stream: MediaStream) => {
            console.log(stream);
            if (userVideo.current) {
              userVideo.current.srcObject = stream;
            }
          });
        }
      });
  };

  const answerCall = () => {
    router.push(`call/${call.from.id}`);
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        if (myVideo.current) {
          myVideo.current.srcObject = stream;
        }
        const peer = new Peer({
          initiator: false,
          trickle: false,
          stream,
        });

        console.log(call.from.id);
        // router.push(`call/${call.from.id}`);

        peer.on("signal", (data) => {
          socket.emit("answerCall", {
            signal: data,
            to: call?.from?.id,
            stream,
          });
        });
        peer.on("stream", (stream: MediaStream) => {
          console.log(stream);
          if (userVideo.current) {
            userVideo.current.srcObject = stream;
          }
        });
        console.log(call.signal);
        peer.signal(call.signal);
      });
  };

  const rejectCall = () => {
    socket.emit("rejectCall", { to: call?.from?.id });
    setCallEnded(true);
    setCallAccepted(false);
    setCall(null);
  };

  return (
    <CallContext.Provider
      value={{
        callUser,
        answerCall,
        rejectCall,
        myVideo,
        userVideo,
        stream,
        setStream,
        call,
        setCall,
        callAccepted,
        setCallAccepted,
        callEnded,
        setCallEnded,
        audio,
        setAudio,
        vid,
        setVideo,
      }}
    >
      {children}
      {/* <div className="flex fixed bottom-0 h-[350px] w-[350px]">
        <video
          playsInline
          muted
          autoPlay
          className="w-full h-full"
          ref={myVideo}
        ></video>
        <video
          playsInline
          muted
          autoPlay
          className="w-full h-full"
          ref={userVideo}
        ></video>
      </div> */}
    </CallContext.Provider>
  );
};

export default CallProvider;
