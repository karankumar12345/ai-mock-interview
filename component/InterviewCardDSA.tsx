/* eslint-disable @typescript-eslint/no-unused-vars */
import dayjs from "dayjs";
// import { Interview } from "@/constants";
import React from "react";
import Image from "next/image";
import { getRandomInterviewCover } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import DisplayTechIcons from "./DisplayTechIcon";

import { getFeedbackByInterviewId } from "@/lib/action/data";
type InterviewCardProps = {
    interviewId: string; // or number, depending on your use case
    userId: string; // or number, depending on your use case
    role: string;
 
    techstack: string; // assuming techstack is an array of strings
    createdAt: string; // assuming createdAt is in ISO date string format
  };
  
const InterviewCardDSA: React.FC<InterviewCardProps> = async({
  interviewId,
  userId,
  role,
 
  techstack,
  createdAt,
}) => {
  const feedback = userId && interviewId?await getFeedbackByInterviewId({
    interviewId,
    userId
  }) :null;

 
  const formattedDate = dayjs( createdAt).format(
    "YYYY-MM-DD"
  );

  return (
    <div className="card-border w-[360px] max-sm:w-full min-h-96">
      <div className="card-interview">
        <div>
          <div className="absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg bg-lime-600">
            <p className="badge-text">{techstack}</p>
          </div>
          <Image
            src={getRandomInterviewCover()}
            alt="cover"
            width={90}
            height={90}
            className="rounded-full object-fit size-[90px]"
          />

          <h3 className="mt-5 capitalize">{role} difficulty</h3>
          <div className="flex flex-col gap-5 mt-3">
            <div className="flex flex-row gap-2">
              <Image
                src={"/calendar.svg"}
                alt="calendar"
                width={22}
                height={22}
              />
              <p className="text-gray-500">{formattedDate}</p>
            </div>
            <div className="flex flex-row gap-2">
              <Image src={"/star.svg"} alt="calendar" width={22} height={22} />
              <p className="text-gray-500">
                {feedback?.totalScore || "---"}/100
              </p>
            </div>

            <div className="flex flex-row justify-between">
            <DisplayTechIcons techStack={techstack[0]?.split(" ")} />
            <Button className="btn-primary">
                <Link
                  href={
                    feedback
                      ? `/dsa-interview/${interviewId}/feedback`
                      : `dsa-interview/${interviewId}`
                  }
                >View Interview</Link>
              </Button>
            
            </div>
         
          </div>
          <p className="line-clamp-2 mt-5">
            {feedback?.finalAssessment || "No feedback available"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default InterviewCardDSA;
