import React, { FC, useEffect, useRef, useState } from "react";
import { socket } from "../../../context/socket";
import Peer from "simple-peer";
import Video from "./Video/Video";

interface Props  {
  
}
const VideoChat: FC<Props> = () => {
  const [peers, setPeers] = useState<any>([]);
  const userVideo = useRef<any>();
  const peersRef = useRef<any>([]);

  const videoConstrains = {
    height: window.innerHeight / 2,
    width: window.innerWidth / 2,
  };

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: videoConstrains, audio: true }).then((stream) => {
        userVideo.current.srcObject = stream;
        socket.emit("join-room", "12");
        socket.on('all-users', users => {
            const peers:any = [];
            users.forEach((userID: string) => {
                const peer = createPeer(userID, socket.id, stream);
                peersRef.current.push({
                    peerID: userID,
                    peer,
                });
                peers.push(peer);
                
            });
            setPeers(peers);
        });
        socket.on("user-joined", payload => {
            const peer = addPeer(payload.signal, payload.callerID, stream);
            peersRef.current.push({
                peerID: payload.callerID,
                peer,
            });
            setPeers((users: any) => [...users, peer]);
        });
        socket.on('receiving-returned-signal', payload => {
          const item = peersRef.current.find((p: { peerID: any; }) => p.peerID === payload.id);
            item.peer.signal(payload.signal);
        })
    });
  }, []);
 const createPeer = (userToSignal: any, callerID: string | undefined, stream: MediaStream) => {
    const peer = new Peer({
        initiator: true,
        trickle: false,
        stream
    });
    peer.on("signal", signal => {
      socket.emit("sending-signal", { userToSignal, callerID, signal });
    });

    return peer;
}
 
  const addPeer = (incomingSignal:any, callerID: string | undefined, stream: MediaStream) => {
    const peer = new Peer({
        initiator: false,
        trickle: false,
        stream
    });

    peer.on("signal", signal => {
      socket.emit("receiving-signal", { signal, callerID });
    });

    peer.signal(incomingSignal);

    return peer;
  }

  return (<div>
    <video ref={userVideo} autoPlay playsInline muted />
    {peers.map((peer: any, index: number) => (
      <Video key={index} peer={peer} />
    ))}
  </div>);
};

export default VideoChat;


