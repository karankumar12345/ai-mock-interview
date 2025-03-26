"use client"
import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useState } from "react";

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

interface AgentProps {
  userName: string;
}

const Agent = ({ userName }: AgentProps) => {
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const isSpeaking = callStatus === CallStatus.ACTIVE;
const message=[
    'whats your name?',
    'my name is karan '
]
  const handleCallAction = () => {
    if (callStatus === CallStatus.INACTIVE || callStatus === CallStatus.FINISHED) {
      setCallStatus(CallStatus.CONNECTING);
      setTimeout(() => setCallStatus(CallStatus.ACTIVE), 2000); // Simulating connection delay
    } else if (callStatus === CallStatus.ACTIVE) {
      setCallStatus(CallStatus.FINISHED);
    }
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

{message.length>0&&(
    <div className="transcript-border">
        <div className="transcript">
<p  className={cn('transition-opacity duration-500 ')}>{message}</p>
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
