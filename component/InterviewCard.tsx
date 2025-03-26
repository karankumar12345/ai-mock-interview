import dayjs from "dayjs";
import { Interview } from "@/constants";
import React from "react";
import Image from "next/image";
import { getRandomInterviewCover } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import DisplayTechIcons from "./DisplayTechIcon";

interface InterviewCardProps extends Interview {}

const InterviewCard: React.FC<InterviewCardProps> = ({
  interviewId,
  userId,
  role,
  type,
  techstack,
  createdAt,
}) => {
  const feedback = null as Feedback | null;

  const normalizedType = /mix/gi.test(type) ? "Mixed" : type;
  const formattedDate = dayjs(feedback?.createdAt || createdAt).format(
    "YYYY-MM-DD"
  );

  return (
    <div className="card-border w-[360px] max-sm:w-full min-h-96">
      <div className="card-interview">
        <div>
          <div className="absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg bg-lime-600">
            <p className="badge-text">{normalizedType}</p>
          </div>
          <Image
            src={getRandomInterviewCover()}
            alt="cover"
            width={90}
            height={90}
            className="rounded-full object-fit size-[90px]"
          />

          <h3 className="mt-5 capitalize">{role} Interview</h3>
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
             <DisplayTechIcons techStack={techstack}/>
              <Button className="btn-primary">
                <Link
                  href={
                    feedback
                      ? `/interview/${interviewId}/feedback`
                      : `interview/${interviewId}`
                  }
                ></Link>
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

export default InterviewCard;
