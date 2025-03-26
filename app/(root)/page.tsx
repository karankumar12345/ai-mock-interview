"use client";

import { useEffect, useState } from "react";
import InterviewCard from "@/component/InterviewCard";
import { Button } from "@/components/ui/button";
import { getCurrentUser, getInterviewByUserID } from "@/lib/action/auth.action";
import Image from "next/image";
import Link from "next/link";
import { Interview } from "@/constants";

const Home = () => {
  const [user, setUser] = useState<any>(null);
  const [userInterviews, setUserInterviews] = useState<Interview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const currentUser = await getCurrentUser();
        if (!currentUser) throw new Error("User not found");

        setUser(currentUser);
        console.log("Current User ID:", currentUser.id);

        if (currentUser?.id) {
          const interviews = await getInterviewByUserID(currentUser.id);
          console.log("Fetched Interviews:", interviews);
          setUserInterviews(interviews || []);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch interview data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const hasPassedInterview = userInterviews.length > 0;

  return (
    <>
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2>Get Interview-Ready with AI-Powered Practice & Feedback</h2>
          <p className="text-gray-500">
            Practice on real interview questions & get instant feedback
          </p>

          <Button asChild className="btn-primary max-sm:w-full">
            <Link href="/interview">Start an Interview</Link>
          </Button>
        </div>
        <Image
          src="/robot.png"
          alt="AI Interview Assistant"
          width={400}
          height={400}
          className="max-sm:hidden"
        />
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Your Interviews</h2>
        <div className="interviews-section">
          {loading ? (
            <p>Loading interviews...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : hasPassedInterview ? (
            userInterviews.map((interview,index) => (
              <InterviewCard key={index} interviewId={interview.id} userId={user.id} role={interview.role} type={interview.type} techstack={interview.techstack} createdAt={interview.createdAt} />
            ))
          ) : (
            <p>No interviews available.</p>
          )}
        </div>
      </section>
    </>
  );
};

export default Home;
