// // "use client";

// // import { useState, useRef, useEffect } from "react";
// // import { Button } from "@/components/ui/button";
// // import { Input } from "@/components/ui/input";
// // import { Mic } from "lucide-react";
// // import { Card } from "@/components/ui/card";

// // export default function Interview() {
// //   const [message, setMessage] = useState("");
// //   const [messages, setMessages] = useState<string[]>([]);
// //   const [isListening, setIsListening] = useState(false);
// //   const videoRef = useRef<HTMLVideoElement>(null);
// //   const [audioLevel, setAudioLevel] = useState(0);

// //   // Handle message sending
//   const handleSendMessage = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (message.trim()) {
//       setMessages([...messages, message]);
//       setMessage("");
//     }
//   };

// //   // Initialize user video
// //   useEffect(() => {
// //     if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
// //       navigator.mediaDevices
// //         .getUserMedia({ video: true })
// //         .then((stream) => {
// //           if (videoRef.current) {
// //             videoRef.current.srcObject = stream;
// //           }
// //         })
// //         .catch((err) => console.error("Error accessing camera:", err));
// //     }
// //   }, []);

// //   // Handle audio visualization
//   useEffect(() => {
//     if (isListening) {
//       navigator.mediaDevices
//         .getUserMedia({ audio: true })
//         .then((stream) => {
//           const audioContext = new AudioContext();
//           const analyser = audioContext.createAnalyser();
//           const microphone = audioContext.createMediaStreamSource(stream);
//           microphone.connect(analyser);
//           analyser.fftSize = 256;
//           const bufferLength = analyser.frequencyBinCount;
//           const dataArray = new Uint8Array(bufferLength);

//           const updateAudioLevel = () => {
//             analyser.getByteFrequencyData(dataArray);
//             const average = dataArray.reduce((a, b) => a + b) / bufferLength;
//             setAudioLevel(average);
//             if (isListening) {
//               requestAnimationFrame(updateAudioLevel);
//             }
//           };

//           updateAudioLevel();
//         })
//         .catch((err) => console.error("Error accessing microphone:", err));
//     }
//   }, [isListening]);

//   return (
//     <div className="flex h-screen">
//       {/* Left side - Chat */}
//       <div className="w-1/2 bg-white p-6 flex flex-col">
//         <div className="flex-1 space-y-4 overflow-y-auto">
//           {messages.map((msg, index) => (
//             <div key={index} className="bg-gray-100 p-3 rounded-lg">
//               {msg}
//             </div>
//           ))}
//         </div>
//         <form onSubmit={handleSendMessage} className="mt-4 flex gap-2">
//           <Input
//             placeholder="Type here"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             className="flex-1"
//           />
//           <Button type="submit">
//             <svg
//               className="w-4 h-4 rotate-90"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
//               />
//             </svg>
//           </Button>
//         </form>
//       </div>

//       {/* Right side - Video and Mic */}
//       <div className="w-1/2 bg-black p-6 flex flex-col items-center justify-center relative">
//         {/* Microphone with animation */}
//         <div className="relative">
//           <Button
//             variant="outline"
//             size="lg"
//             className={`rounded-full p-8 ${
//               isListening
//                 ? "bg-red-500 hover:bg-red-600"
//                 : "bg-white hover:bg-gray-100"
//             }`}
//             onClick={() => setIsListening(!isListening)}
//           >
//             <Mic
//               className={w-8 h-8 ${isListening ? "text-white" : "text-black"}}
//             />
//           </Button>
//           {/* Voice wave animation */}
//           {isListening && (
//             <div className="absolute inset-0 -z-10">
//               {[...Array(3)].map((_, i) => (
//                 <div
//                   key={i}
//                   className="absolute inset-0 rounded-full border-2 border-white animate-ping"
//                   style={{
//                     animationDelay: ${i * 0.5}s,
//                     transform: scale(${1 + (audioLevel / 255) * i}),
//                   }}
//                 />
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Video preview */}
//         <Card className="absolute bottom-6 right-6 w-64 h-48 overflow-hidden bg-gray-800 rounded-lg">
//           <video
//             ref={videoRef}
//             autoPlay
//             playsInline
//             muted
//             className="w-full h-full object-cover"
//           />
//         </Card>
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useState, useRef, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import { Card } from "@/components/ui/card";
// import {
//   MessageSquare,
//   Mic,
//   Video,
//   VideoOff,
//   MicOff,
//   Send,
// } from "lucide-react";

// interface Message {
//   text: string;
//   timestamp: number;
// }

// export default function VideoConference() {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [isListening, setIsListening] = useState(false);
//   const [isMuted, setIsMuted] = useState(false);
//   const [isVideoOn, setIsVideoOn] = useState(true);
//   const [audioLevel, setAudioLevel] = useState(0);

//   const videoRef = useRef<HTMLVideoElement>(null);
//   const audioContextRef = useRef<AudioContext | null>(null);
//   const analyserRef = useRef<AnalyserNode | null>(null);
//   const animationFrameRef = useRef<number>();

//   // Initialize video stream
//   useEffect(() => {
//     if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
//       navigator.mediaDevices
//         .getUserMedia({ video: true })
//         .then((stream) => {
//           if (videoRef.current) {
//             videoRef.current.srcObject = stream;
//           }
//         })
//         .catch((err) => console.error("Error accessing camera:", err));
//     }
//     return () => {
//       if (videoRef.current?.srcObject) {
//         const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
//         tracks.forEach((track) => track.stop());
//       }
//     };
//   }, []);

//   // Handle audio visualization
//   useEffect(() => {
//     let audioStream: MediaStream | null = null;

//     const setupAudioVisualization = async () => {
//       try {
//         audioStream = await navigator.mediaDevices.getUserMedia({
//           audio: true,
//         });
//         audioContextRef.current = new AudioContext();
//         analyserRef.current = audioContextRef.current.createAnalyser();

//         const source =
//           audioContextRef.current.createMediaStreamSource(audioStream);
//         source.connect(analyserRef.current);

//         analyserRef.current.fftSize = 256;
//         const bufferLength = analyserRef.current.frequencyBinCount;
//         const dataArray = new Uint8Array(bufferLength);

//         const updateAudioLevel = () => {
//           if (!analyserRef.current) return;
//           analyserRef.current.getByteFrequencyData(dataArray);
//           const average = dataArray.reduce((a, b) => a + b) / bufferLength;
//           setAudioLevel(average);
//           animationFrameRef.current = requestAnimationFrame(updateAudioLevel);
//         };

//         updateAudioLevel();
//       } catch (err) {
//         console.error("Error accessing microphone:", err);
//       }
//     };

//     if (isListening && !isMuted) {
//       setupAudioVisualization();
//     }

//     return () => {
//       if (animationFrameRef.current) {
//         cancelAnimationFrame(animationFrameRef.current);
//       }
//       if (audioContextRef.current) {
//         audioContextRef.current.close();
//       }
//       if (audioStream) {
//         audioStream.getTracks().forEach((track) => track.stop());
//       }
//     };
//   }, [isListening, isMuted]);

//   const handleSendMessage = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (newMessage.trim()) {
//       setMessages((prev) => [
//         ...prev,
//         { text: newMessage, timestamp: Date.now() },
//       ]);
//       setNewMessage("");
//     }
//   };

//   const toggleMic = () => {
//     setIsMuted(!isMuted);
//     setIsListening(!isMuted);
//   };

//   const toggleVideo = () => {
//     setIsVideoOn(!isVideoOn);
//     if (videoRef.current?.srcObject) {
//       const videoTrack = (
//         videoRef.current.srcObject as MediaStream
//       ).getVideoTracks()[0];
//       videoTrack.enabled = !isVideoOn;
//     }
//   };

//   return (
//     <div className="h-screen bg-gray-900 flex items-center justify-center relative">
//       {/* Main video area */}
//       <div className="relative w-full h-full">
//         {isVideoOn ? (
//           <video
//             ref={videoRef}
//             autoPlay
//             playsInline
//             muted
//             className="w-full h-full object-cover"
//           />
//         ) : (
//           <div className="w-full h-full flex items-center justify-center bg-gray-800">
//             <Avatar className="w-32 h-32">
//               <AvatarFallback className="text-4xl">A</AvatarFallback>
//             </Avatar>
//           </div>
//         )}

//         {/* Audio visualization */}
//         <div className="absolute top-4 right-4">
//           {isListening && !isMuted && (
//             <div className="relative">
//               <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
//                 <Mic className="w-4 h-4 text-white" />
//               </div>
//               {[...Array(3)].map((_, i) => (
//                 <div
//                   key={i}
//                   className="absolute inset-0 rounded-full border-2 border-green-500 animate-ping"
//                   style={{
//                     animationDelay: ${i * 0.2}s,
//                     transform: scale(${1 + (audioLevel / 255) * i}),
//                     opacity: 1 - i * 0.2,
//                   }}
//                 />
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Control bar */}
//         <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-center gap-4 bg-gradient-to-t from-black/50 to-transparent">
//           <Button
//             variant="secondary"
//             size="icon"
//             onClick={toggleMic}
//             className={isMuted ? "bg-red-500 hover:bg-red-600" : ""}
//           >
//             {isMuted ? <MicOff /> : <Mic />}
//           </Button>

//           <Button
//             variant="secondary"
//             size="icon"
//             onClick={toggleVideo}
//             className={!isVideoOn ? "bg-red-500 hover:bg-red-600" : ""}
//           >
//             {isVideoOn ? <Video /> : <VideoOff />}
//           </Button>

//           <Sheet>
//             <SheetTrigger asChild>
//               <Button variant="secondary" size="icon">
//                 <MessageSquare />
//               </Button>
//             </SheetTrigger>
//             <SheetContent className="w-[400px] sm:w-[540px]">
//               <SheetHeader>
//                 <SheetTitle>In-call messages</SheetTitle>
//               </SheetHeader>
//               <div className="flex flex-col h-full">
//                 <div className="flex-1 overflow-y-auto py-4 space-y-4">
//                   {messages.map((message, i) => (
//                     <Card key={i} className="p-4">
//                       <p>{message.text}</p>
//                       <time className="text-xs text-gray-500">
//                         {new Date(message.timestamp).toLocaleTimeString()}
//                       </time>
//                     </Card>
//                   ))}
//                 </div>
//                 <form onSubmit={handleSendMessage} className="flex gap-2 pt-4">
//                   <Input
//                     placeholder="Send a message to everyone..."
//                     value={newMessage}
//                     onChange={(e) => setNewMessage(e.target.value)}
//                   />
//                   <Button type="submit" size="icon">
//                     <Send className="w-4 h-4" />
//                   </Button>
//                 </form>
//               </div>
//             </SheetContent>
//           </Sheet>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Mic,
  Video,
  VideoOff,
  MicOff,
  MessageSquare,
  Users,
  PhoneOff,
} from "lucide-react";

interface Participant {
  id: string;
  name: string;
  isVideoOn: boolean;
  isMuted: boolean;
}

export default function Interview() {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [audioLevel, setAudioLevel] = useState(0);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [otherParticipant] = useState<Participant>({
    id: "1",
    name: "John Doe",
    isVideoOn: false,
    isMuted: true,
  });

  const videoRef = useRef<HTMLVideoElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((err) => console.error("Error accessing camera:", err));
    }
    return () => {
      if (videoRef.current?.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      setMessages([...messages, message]);
      setMessage("");
    }
  };

  useEffect(() => {
    let audioStream: MediaStream | null = null;

    const setupAudioVisualization = async () => {
      try {
        audioStream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        audioContextRef.current = new AudioContext();
        analyserRef.current = audioContextRef.current.createAnalyser();

        const source =
          audioContextRef.current.createMediaStreamSource(audioStream);
        source.connect(analyserRef.current);

        analyserRef.current.fftSize = 256;
        const bufferLength = analyserRef.current.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const updateAudioLevel = () => {
          if (!analyserRef.current) return;
          analyserRef.current.getByteFrequencyData(dataArray);
          const average = dataArray.reduce((a, b) => a + b) / bufferLength;
          setAudioLevel(average);
          animationFrameRef.current = requestAnimationFrame(updateAudioLevel);
        };

        updateAudioLevel();
      } catch (err) {
        console.error("Error accessing microphone:", err);
      }
    };

    if (!isMuted) {
      setupAudioVisualization();
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      if (audioStream) {
        audioStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isMuted]);

  const toggleMic = () => setIsMuted(!isMuted);
  const toggleVideo = () => setIsVideoOn(!isVideoOn);
  const handleEndCall = () => console.log("Call ended");

  return (
    <div className="h-screen bg-gray-900 flex items-center justify-center relative overflow-hidden">
      {/* Main participant view */}
      <div className="w-full h-full flex items-center justify-center bg-gray-800">
        <div className="relative w-full h-full flex items-center justify-center">
          <Avatar className="w-40 h-40">
            <AvatarFallback className="text-4xl bg-emerald-700 text-white">
              A
            </AvatarFallback>
          </Avatar>
          <div className="absolute bottom-4 left-4 text-white text-sm font-medium bg-black/50 px-2 py-1 rounded">
            {otherParticipant.name}
          </div>
        </div>
      </div>

      {/* Self view */}
      <Card className="absolute bottom-20 right-4 w-72 h-52 overflow-hidden rounded-xl border-2 border-white/10">
        {isVideoOn ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-800 flex items-center justify-center">
            <Avatar className="w-16 h-16">
              <AvatarFallback>You</AvatarFallback>
            </Avatar>
          </div>
        )}
        <div className="absolute bottom-2 left-2 text-white text-xs font-medium bg-black/50 px-2 py-1 rounded">
          You
        </div>
      </Card>

      {/* Audio visualization */}
      {!isMuted && audioLevel > 0 && (
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <div className="relative">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="absolute inset-0 rounded-full border-2 border-green-500 animate-ping"
                style={{
                  animationDelay: `${i * 0.2}s`,
                  transform: `scale(${1 + (audioLevel / 255) * i})`,
                  opacity: 1 - i * 0.2,
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Control bar */}
      <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-center items-center gap-2 bg-black/90">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleMic}
          className={`rounded-full ${
            isMuted ? "bg-red-500 hover:bg-red-600" : "hover:bg-gray-700"
          }`}
        >
          {isMuted ? (
            <MicOff className="w-5 h-5" />
          ) : (
            <Mic className="w-5 h-5" />
          )}
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={toggleVideo}
          className={`rounded-full ${
            !isVideoOn ? "bg-red-500 hover:bg-red-600" : "hover:bg-gray-700"
          }`}
        >
          {isVideoOn ? (
            <Video className="w-5 h-5" />
          ) : (
            <VideoOff className="w-5 h-5" />
          )}
        </Button>

        <Button
          variant="destructive"
          size="icon"
          onClick={handleEndCall}
          className="rounded-full bg-red-500 hover:bg-red-600"
        >
          <PhoneOff className="w-5 h-5" />
        </Button>

        <div className="absolute right-4 flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full hover:bg-gray-700"
              >
                <MessageSquare className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>In-call messages</SheetTitle>
              </SheetHeader>
              <div className="w-full bg-white pb-6 flex absolute bottom-0 pr-10 flex-col">
                <div className="flex-1 space-y-4 overflow-y-auto">
                  {messages.map((msg, index) => (
                    <div key={index} className="bg-gray-100 p-3 rounded-lg">
                      {msg}
                    </div>
                  ))}
                </div>
                <form onSubmit={handleSendMessage} className="mt-4 flex gap-2">
                  <Input
                    placeholder="Type here"
                    value={message}
                    // @ts-ignore
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit">
                    <svg
                      className="w-4 h-4 rotate-90"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                  </Button>
                </form>
              </div>
            </SheetContent>
          </Sheet>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full hover:bg-gray-700"
              >
                <Users className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Participants (2)</SheetTitle>
              </SheetHeader>
              <div className="mt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback>P</AvatarFallback>
                    </Avatar>
                    <span>{otherParticipant.name}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback>Y</AvatarFallback>
                    </Avatar>
                    <span>You</span>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}
