import React, { FC, useEffect, useRef } from "react";

interface Props {
  peer: any;
}

const Video: FC<Props> = ({ peer }) => {
  const ref = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    peer.on("stream", (stream: any) => {
      if (ref.current) {
        ref.current.srcObject = stream;
      }
    });
  }, []);

  return <video playsInline autoPlay ref={ref} />;
};

export default Video;
