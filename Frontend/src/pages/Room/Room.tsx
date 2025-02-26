/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useCallback, useEffect, useState } from "react";

import ReactPlayer from "react-player";

import {Mic, MicOff,  PhoneOff,  ScreenShare, ScreenShareOff, Video, VideoOff} from 'lucide-react'
import { useSocketContext } from "../../zustand/socket/useSocketContext";
import peer from "../../service/peer";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../zustand/auth store/AuthStore";
import { JoinedUsers } from "../../Apis/joinedUsers";


export default function Room({serverId, channelId}: {serverId: string | undefined, channelId: string | undefined}) {
  const socket = useSocketContext((state=> state.socket));
  const [remoteSocketId, setRemoteSocketId] = useState("");
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [myCameraStream, setMyCameraStream] = useState<MediaStream | null>(null);
  const [myScreenStream, setMyScreenStream] = useState<MediaStream | null>(null);
  const [remoteStreams, setRemoteStreams] = useState<MediaStream[]>([]);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isCallConnected, setIsCallConnected] = useState(false)
  const navigate = useNavigate();
  const token = useAuthStore((state)=> state.token);


  const handleJoinedUsers = async (count:number) => {
    try {
      const data = {
        channelId: channelId,
        data:count,
        token: token,
      };
      const response = await JoinedUsers(data);
      console.log("User Joined Update", response)
    } catch (error) {
      console.log(error);
    }
  }


  const toggleCamera = async (): Promise<void> => {
    if (myCameraStream) {
      const videoTrack = myCameraStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsCameraOn(videoTrack.enabled);
      }
    }else{
      const cameraStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: true,
        },
      });
  
      setMyCameraStream(cameraStream);
    }
  };

  const toggleAudio = (): void => {
    if (myCameraStream) {
      const audioTrack = myCameraStream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsAudioOn(audioTrack.enabled);
      }
    }
  };

  const startScreenShare = async () => {
    if (!isScreenSharing) {
      // Get screen stream
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: false,
      });
  
      // Stop current camera stream
      if (myCameraStream) {
        myCameraStream.getTracks().forEach((track) => track.stop());
      }
  
      setMyCameraStream(null);
      setMyScreenStream(screenStream);
      setIsScreenSharing(true);
  
      // Replace video track in peer connection
      const videoTrack = screenStream.getVideoTracks()[0];
      //@ts-ignore
      const sender = peer.peer.getSenders().find((s) => s.track?.kind === "video");
      if (sender) {
        sender.replaceTrack(videoTrack);
      } else {
        //@ts-ignore
        peer.peer.addTrack(videoTrack, screenStream);
      }
      // Handle screen share stop
      videoTrack.onended = () => {
        stopScreenShare();
      };
    }else{
      stopScreenShare();
    }
  };
  
  const stopScreenShare = async () => {
    if (myScreenStream) {
      myScreenStream.getTracks().forEach((track) => track.stop());
      setMyScreenStream(null);
    }
    setIsScreenSharing(false);
  
    try {
      const cameraStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: true,
        },
      });
  
      setMyCameraStream(cameraStream);
  
      const videoTrack = cameraStream.getVideoTracks()[0];
      //@ts-ignore
      if (peer.peer) {
        //@ts-ignore
        const sender = peer.peer.getSenders().find((s) => s.track?.kind === "video");
        if (sender) {
          sender.replaceTrack(videoTrack);
        } else {
          //@ts-ignore
          peer.peer.addTrack(videoTrack, cameraStream);
        }
      }
    } catch (error) {
      console.error("Error restarting camera after screen share:", error);
    }
  };
  
  



  // User call a user
  const handleCallUser = useCallback(async (): Promise<void> => {

    const cameraStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: {
        echoCancellation: false,
        noiseSuppression: false,
        autoGainControl: true,
      },
    });

    setMyCameraStream(cameraStream);
 //@ts-ignore
    const existingTracks = peer.peer
      .getSenders() //@ts-ignore
      .map((sender) => sender.track.id);

    cameraStream.getTracks().forEach((track) => {
      if (!existingTracks.includes(track.id)) {
         //@ts-ignore
        peer.peer.addTrack(track, cameraStream);
      }
    });

    const offer = await peer.createOffer();
    socket.emit("user-call", { offer, to: remoteSocketId });
   
  }, [remoteSocketId, socket]);

  // User received a call
  const handleIncomingCall = useCallback(
    async ({ offer, from }: { offer: RTCSessionDescriptionInit; from: string }) => {
      setRemoteSocketId(from);

      // Get user's camera stream
      const cameraStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: true,
        },
      });

      setMyCameraStream(cameraStream);

      // Check if screen share is active
      let screenStream = null;
      if (isScreenSharing) {
        screenStream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: false,
        });
        setMyScreenStream(screenStream);
      }

      // console.log("Incoming call from:", from, "Offer:", offer);

      const answer = await peer.getAnswer(offer);
      socket.emit("call-accepted", { to: from, ans: answer });
      //  console.log("now disable button ")


      // Send all active streams
      cameraStream.getTracks().forEach((track) => {
         //@ts-ignore
        peer.peer.addTrack(track, cameraStream);
      });

      if (screenStream) {
        screenStream.getTracks().forEach((track) => {
             //@ts-ignore
          peer.peer.addTrack(track, screenStream);
        });
      }
    },
    [socket, isScreenSharing]
  );

    // User joined the room
    const handleUserJoined = useCallback(({ email, id }: { email: string; id: string }) => {
      console.log(`${email} joined the room with id ${id}`);
      setRemoteSocketId(id);
      setIsCallConnected(true)
    }, []);

  //   //send stream
  //   const sendStream = useCallback(async () => {
  //     console.log("sending stream");
  //     for (const track of myStream.getTracks()) {
  //       peer.peer.addTrack(track, myStream);
  //     }
  //   }, [myStream]);

  const sendStream = useCallback((): void => {
    if (myCameraStream) {
      myCameraStream.getTracks().forEach((track) => {
         //@ts-ignore
        peer.peer.addTrack(track, myCameraStream);
      });
    }
    if (myScreenStream) {
      myScreenStream.getTracks().forEach((track) => {
         //@ts-ignore
        peer.peer.addTrack(track, myScreenStream);
      });
    }
  }, [myCameraStream, myScreenStream]);

  // handle call accept
  const handleCallAccepted = useCallback(
    async ({ ans }: { from: string; ans: RTCSessionDescriptionInit }) => {
      peer.setAnswer(ans);
      // console.log("call accepted", from, ans);
    //@ts-ignore
      console.log("🕵️ Remote Description Set?", peer.peer.remoteDescription);

      sendStream();
    },
    [sendStream]
  );

  // handle negotiation needed
  const handlePeerNegotiation = useCallback(async (): Promise<void> => {
    
      // console.log("negotiation started");
    const offer = await peer.createOffer();
    socket.emit("peer-negotiation-needed", { offer, to: remoteSocketId });
    }
  , [remoteSocketId, socket]);

  // handle negotiation final
  const handlePeerNegotiationFinal = useCallback(async ({ ans }: { ans: RTCSessionDescriptionInit }) => {
    // console.log("negotiation done");
    await peer.setAnswer(ans);
  }, []);

  // handle negotiation incoming
  const handleIncomingNegotiation = useCallback(
    async ({ from, offer }: { from: string; offer: RTCSessionDescriptionInit }) => {
      // console.log("incoming negotiation", from, offer);
      const answer = await peer.getAnswer(offer);
      socket.emit("peer-negotiation-done", { ans: answer, to: from });
    },
    [socket]
  );

  useEffect(() => {
     //@ts-ignore
    peer.peer.addEventListener("negotiationneeded", handlePeerNegotiation);
    return () => {
         //@ts-ignore
      peer.peer.removeEventListener("negotiationneeded", handlePeerNegotiation);
    };
  }, [handlePeerNegotiation]);

  useEffect(() => {
     //@ts-ignore
    peer.peer.addEventListener("track", (ev) => {
      // console.log("GOT TRACK:", ev.streams);
      handleJoinedUsers(2);
      
      setRemoteStreams((prev) => {
        const existingStreamIds = prev.map((stream) => stream.id);
        const newStreams = ev.streams.filter(
          (stream) => !existingStreamIds.includes(stream.id)
        );
        return [...prev, ...newStreams];
      });
    });
  }, [myScreenStream]);

  useEffect(() => {
    socket.on("user-joined", handleUserJoined);
    socket.on("incoming-call", handleIncomingCall);
    socket.on("call-accepted", handleCallAccepted);
    socket.on("peer-negotiation-needed", handleIncomingNegotiation);
    socket.on("peer-negotiation-final", handlePeerNegotiationFinal);
    return () => {
      socket.off("user-joined", handleUserJoined);
      socket.off("incoming-call", handleIncomingCall);
      socket.off("call-accepted", handleCallAccepted);
      socket.off("peer-negotiation-needed", handleIncomingNegotiation);
      socket.off("peer-negotiation-final", handlePeerNegotiationFinal);
    };
  }, [
    socket,
    handleUserJoined,
    handleIncomingCall,
    handleCallAccepted,
    handleIncomingNegotiation,
    handlePeerNegotiationFinal,
  ]);

  useEffect(()=>{
    if(isCallConnected){
        handleCallUser();
        setIsCallConnected(false)
    }
  },[handleCallUser, isCallConnected]);

  console.log(remoteStreams)

  return (
    <div className="w-full h-full bg-[#161616]  text-amber-50 flex flex-col justify-center items-center " >
      <div className="w-full h-[85%] bg-[#161616] e overflow-hidden">
        <div className="w-full h-full flex flex-wrap justify-center items-center gap-5 p-5 ">
          {myCameraStream && (
            <div className=" w-[40%] overflow-hidden custom-video">
            <ReactPlayer  width={"100%"} height={"100%"} playing muted url={myCameraStream} />
            </div>
          )}

          {isScreenSharing && myScreenStream && (
            <div className=" w-[40%]  overflow-hidden  custom-video">
              <ReactPlayer  width={"100%"} height={"100%"} playing muted url={myScreenStream} />
            </div>
          )}
          {/* max-w-[calc(100%/3-20px/3)] */}
          {remoteStreams.map((stream, index) => (
            <div
              key={index}
              className=" w-[40%]  overflow-hidden custom-video"
            >
              <ReactPlayer
                width={"100%"}
                height={"100%"}
                playing
                muted={false}
                url={stream}
              />
            </div>
          ))}
        </div>
        <p className="text-[#ccc] text-sm absolute right-0 border-0">{remoteSocketId ? "Connected" : "No on in this Room"}</p>
      </div>
      <div className="flex w-full h-[calc(100%-90%)] justify-center items-center gap-2">
        {/* {setMyCameraStream && (
          <button
            className="border border-black px-6 py-1 rounded-b-xl mx-2 cursor-pointer"
            onClick={sendStream}
          >
            Send Stream
          </button>
        )} */}
        {/* {remoteSocketId && (
          <button
            className="border border-black px-6 py-1 rounded-b-xl mx-2 cursor-pointer"
            onClick={handleCallUser}
          >
            Call
          </button>
        )} */}

          <button
            className={`cursor-pointer  p-4 ${isCameraOn? "bg-[#383838] hover:bg-[#2e2e2e]":"bg-white text-black"}  rounded-full transition-all`}
            onClick={toggleCamera}
          >
            {isCameraOn ?  <Video/>:<VideoOff/> }
          </button>

 
          <button
            className={`cursor-pointer  p-4 ${isAudioOn? "bg-[#383838] hover:bg-[#2e2e2e]":"bg-white text-black"}  rounded-full transition-all`}
            onClick={toggleAudio}
          >
            {isAudioOn ? <Mic/>:<MicOff/> }
          </button>

        <button
          onClick={startScreenShare}
          className={`cursor-pointer  p-4 ${!isScreenSharing? "bg-[#383838] hover:bg-[#2e2e2e]":"bg-white text-black"}  rounded-full transition-all`}
        >
          {isScreenSharing ? <ScreenShareOff/> : <ScreenShare/>}
        </button>
        <button
          onClick={()=>{
            handleJoinedUsers(0);
            stopScreenShare();
            setRemoteStreams([]);
            navigate(`/channels/${serverId}/message/${channelId}`)
            window.location.reload();
          }}
          className={`cursor-pointer p-4 bg-red-600  rounded-full transition-all`}
        >
          <PhoneOff/>
        </button>
      </div>
    </div>
  );
}
