export function useRtc() {
  const getMicrophoneStream = async (): Promise<MediaStream | null> => {
    try {
      const constraints = {
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      // console.log("🎙️ Mic access granted - stream active:", stream.active);
      return stream;
    } catch (err) {
      console.error("Mic access denied:", err);
      return null;
    }
  };

  const createPeerConnection = (
    socket: WebSocket,
    roomId: string,
    userId: string,
  ): RTCPeerConnection => {
    const pc = new RTCPeerConnection({
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" },
        { urls: "stun:stun1.l.google.com:19302" },
        { urls: "stun:stun2.l.google.com:19302" },
      ],
    });

    // ICE Candidate handling
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        // console.log("Sending ICE candidate:", event.candidate);
        socket.send(
          JSON.stringify({
            type: "candidate",
            candidate: event.candidate,
            room: roomId,
            sender: { id: userId },
          }),
        );
      } else {
        // console.log("ICE gathering complete");
      }
    };

    // Track handling
    pc.ontrack = (event) => {
      // console.log("Received remote track:", event.track.kind);
      const remoteAudio = new Audio();
      remoteAudio.srcObject = event.streams[0];
      remoteAudio.autoplay = true;
      document.body.appendChild(remoteAudio); // Temporary for debugging
    };

    // Connection state handling
    pc.oniceconnectionstatechange = () => {
      // console.log("ICE connection state:", pc.iceConnectionState);
      if (pc.iceConnectionState === "failed") {
        pc.restartIce();
      }
    };

    pc.onconnectionstatechange = () => {
      // console.log("Connection state:", pc.connectionState);
    };

    pc.onsignalingstatechange = () => {
      // console.log("Signaling state:", pc.signalingState);
    };

    // Automatically create offer when negotiation is needed
    pc.onnegotiationneeded = async () => {
      try {
        // console.log("Negotiation needed - creating offer");
        const offer = await pc.createOffer({
          offerToReceiveAudio: true,
        });
        await pc.setLocalDescription(offer);
        socket.send(
          JSON.stringify({
            type: "offer",
            sdp: pc.localDescription,
            room: roomId,
            sender: { id: userId },
          }),
        );
      } catch (err) {
        console.error("Error creating offer:", err);
      }
    };

    return pc;
  };

  const handleSocketMessage = async (
    data: any,
    pc: RTCPeerConnection | null,
    socket: WebSocket | null,
    userId: string,
    roomId: string,
  ) => {
    if (!pc || !socket) return;
    if (data.sender.id === userId) return;

    // console.log("Handling message of type:", data.type);

    try {
      switch (data.type) {
        case "offer":
          // console.log("Received offer:", data.sdp);
          await pc.setRemoteDescription(new RTCSessionDescription(data.sdp));
          const answer = await pc.createAnswer();
          await pc.setLocalDescription(answer);
          socket.send(
            JSON.stringify({
              type: "answer",
              sdp: answer,
              room: roomId,
              sender: { id: userId },
            }),
          );
          break;

        case "answer":
          // console.log("Received answer:", data.sdp);
          await pc.setRemoteDescription(new RTCSessionDescription(data.sdp));
          break;

        case "candidate":
          // console.log("Received ICE candidate:", data.candidate);
          try {
            await pc.addIceCandidate(new RTCIceCandidate(data.candidate));
          } catch (err) {
            console.error("Error adding ICE candidate:", err);
          }
          break;
      }
    } catch (err) {
      console.error("Error handling message:", err);
    }
  };

  return {
    getMicrophoneStream,
    createPeerConnection,
    handleSocketMessage,
  };
}
