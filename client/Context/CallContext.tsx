"use client";

import { useRef, useState } from "react";
import { createContext } from "vm";
import Peer from "simple-peer";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/Store";
import { socket } from "@/app/socket";

const CallContext = createContext();

const CallProvider = ({ children }: { children: React.ReactNode }) => {
  const { user }: { user: any } = useSelector((state: RootState) => state.auth);
  const [stream, setStream] = useState<MediaStream>();
  const [call, setCall] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [audio, setAudio] = useState(true);
  const [vid, setVideo] = useState(true);
  const myVideo = useRef<any>();
  const userVideo = useRef<any>();
  const connectionRef = useRef<any>();

  const callUser = (data: { name: string; image: string }) => {
    navigator.mediaDevices
      .getDisplayMedia({ video: vid, audio: audio })
      .then((stream) => {
        setStream(stream);
        if (myVideo.current) {
          myVideo.current.srcObject = stream;
        }
      });
    const peer = new Peer({ initiator: true, trickle: false, stream });
    peer.on("signal", (data) => {
      socket.emit("callUser", {
        from: user,
        to: user?.id,
        name: user?.name,
        image: user?.avatar,
        signal: data,
      });
    });
    peer.on("stream", (stream) => {
      if (userVideo.current) {
        userVideo.current.srcObject = stream;
      }
    });
    connectionRef.current = peer;
  };
  return <CallContext.Provider value={null}>{children}</CallContext.Provider>;
};
