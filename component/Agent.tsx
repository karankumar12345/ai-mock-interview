"use client";
import { cn } from "@/lib/utils";
import { vapi } from "@/lib/vapi.sdk";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

interface AgentProps {
  userName: string;
  userId: string;
  type: "interviewer" | "candidate";
}

interface Message {
  type: string;
  transcriptType?: string;
  role: "user" | "system" | "assistant";
  content: string;
}

const Agent = ({ userName, userId, type }: AgentProps) => {
  const router = useRouter();
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [message, setMessage] = useState<Message[]>([]);
  const isSpeaking = callStatus === CallStatus.ACTIVE;

  useEffect(() => {
    const onCallStart = () => setCallStatus(CallStatus.ACTIVE);
    const onCallEnd = () => setCallStatus(CallStatus.FINISHED);
    const onMessage = (message: Message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        setMessage((prev) => [...prev, message]);
      }
    };

    const onSpeechStart = () => setCallStatus(CallStatus.ACTIVE);
    const onSpeechEnd = () => setCallStatus(CallStatus.INACTIVE);
    const onError = (error: Error) => console.error("Error:", error);

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);
    vapi.on("error", onError);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
      vapi.off("error", onError);
    };
  }, []);

  useEffect(() => {
    if (callStatus === CallStatus.FINISHED) {
      router.push("/interview");
    }
  }, [callStatus, router]);

  const handleCall = async () => {
    setCallStatus(CallStatus.CONNECTING);
    await vapi.start(process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID!, {
      variableValues: { userName, userId },
    });
  };

  const handleDisconnected = async () => {
    setCallStatus(CallStatus.FINISHED);
    vapi.stop();
  };

  const latestMessage = message[message.length - 1]?.content;
  const isCallInactiveOrFinished =
    callStatus === CallStatus.FINISHED || callStatus === CallStatus.INACTIVE;

  const handleCallAction = () => {
    if (isCallInactiveOrFinished) handleCall();
    else handleDisconnected();
  };

  return (
    <>
      <div className="call-view">
        <div className="card-interviewer">
          <div className="avatar relative">
            <Image
              src="/ai-avatar.png"
              alt="AI Interviewer"
              width={65}
              height={54}
              className="object-cover"
            />
            {isSpeaking && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            )}
          </div>
          <h3>AI Interview</h3>
        </div>
        <div className="card-border">
          <div className="card-content">
            <Image
              src="/user-avatar.png"
              alt="User"
              width={120}
              height={120}
              className="rounded-full object-cover"
            />
            <h3>{userName}</h3>
          </div>
        </div>
      </div>

      {message.length > 0 && (
        <div className="transcript-border">
          <div className="transcript">
            <p className={cn("transition-opacity duration-500")}>{latestMessage}</p>
          </div>
        </div>
      )}

      <div className="w-full flex justify-center">
        <button className="btn btn-primary" onClick={handleCallAction}>
          {callStatus === CallStatus.ACTIVE && "End Call"}
          {callStatus === CallStatus.FINISHED && "Re-Start"}
          {callStatus === CallStatus.INACTIVE && "Start Call"}
          {callStatus === CallStatus.CONNECTING && "Connecting..."}
        </button>
      </div>
    </>
  );
};

export default Agent;
