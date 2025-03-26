/* eslint-disable react/jsx-key */
import InterviewCard from "@/component/InterviewCard";
import { Button } from "@/components/ui/button";
import { dummyInterview } from "@/constants";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
             <section className="card-cta">
              
              <div className="flex flex-col gap-6 max-w-lg">
                <h2>Get Interview-Ready with AI-Powered Practice & Feedback</h2>
                <p className="text-gray-500">
                  Practice on real interview questions & get instant feedback</p>

<Button asChild className="btn-primary max-sm:w-full">
  <Link href="/interview" >Start an Interview </Link>
</Button>

              </div>
              <Image src="/robot.png" alt="robo-dube" width={400} height={400} className="max-sm:hidden"/>

             </section>
             <section className="flex flex-col gap-6 mt-8">
              <h2>Your Interview</h2>
              <div className="interviews-section">
            {dummyInterview.map((interview) => (
          <InterviewCard {...interview}/>
            ))}

              </div>
              
             </section>
             <section className="flex flex-col gap-6 mt-8">
              <h2>Take an Interview</h2>
              <div className="interviews-section">
                <p>There are no interviews available</p>
              </div>
             </section>
    </>
 

  );
}
