import { useEffect, useRef, useState } from "react";

export const useVoiceConnection = (
  room: string | undefined,
  userId: string,
  isVoiceRoom: boolean,
  activateSocket: boolean,
) => {
  const socketRef = useRef<WebSocket | null>(null);
  const peerRef = useRef<RTCPeerConnection | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const [remoteAudio, setRemoteAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!activateSocket || !isVoiceRoom || !room || !userId) return;

    const socket = new WebSocket("ws://localhost:8080/ws/voice");
    socketRef.current = socket;

    let isCleanedUp = false;

    socket.onopen = async () => {
      console.log("WEBSOCKET CONNECTED");
      socket.send(
        JSON.stringify({ type: "join", room, sender: { id: userId } }),
      );
      console.log("Sent join message ✅");

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      localStreamRef.current = stream;

      const peer = new RTCPeerConnection({
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
      });

      peerRef.current = peer;

      peer.onicecandidate = (event) => {
        if (event.candidate) {
          socket.send(
            JSON.stringify({
              type: "ice",
              candidate: event.candidate,
              sender: { id: userId },
              room,
            }),
          );
        }
      };

      peer.ontrack = (event) => {
        const remoteStream = event.streams[0];
        const audio = new Audio();
        audio.srcObject = remoteStream;
        audio.autoplay = true;
        setRemoteAudio(audio);
      };

      stream.getTracks().forEach((track) => peer.addTrack(track, stream));

      const offer = await peer.createOffer();
      await peer.setLocalDescription(offer);
      socket.send(
        JSON.stringify({
          type: "offer",
          sdp: offer,
          sender: { id: userId },
          room,
        }),
      );
    };

    socket.onmessage = async (event) => {
      const data = JSON.parse(event.data);
      const peer = peerRef.current;
      if (!peer || isCleanedUp) return;

      if (data.type === "offer") {
        await peer.setRemoteDescription(new RTCSessionDescription(data.sdp));
        const answer = await peer.createAnswer();
        await peer.setLocalDescription(answer);
        socket.send(
          JSON.stringify({
            type: "answer",
            sdp: answer,
            sender: { id: userId },
            room,
          }),
        );
      } else if (data.type === "answer") {
        await peer.setRemoteDescription(new RTCSessionDescription(data.sdp));
      } else if (data.type === "ice" && data.candidate) {
        await peer.addIceCandidate(new RTCIceCandidate(data.candidate));
      }
    };

    return () => {
      isCleanedUp = true;
      socketRef.current?.close();
      peerRef.current?.close();

      // Stop and release media tracks
      localStreamRef.current?.getTracks().forEach((track) => track.stop());

      socketRef.current = null;
      peerRef.current = null;
      localStreamRef.current = null;

      setRemoteAudio(null);
    };
  }, [activateSocket, room, userId, isVoiceRoom]); // 🧠 KEY FIX

  return { remoteAudio };
};
