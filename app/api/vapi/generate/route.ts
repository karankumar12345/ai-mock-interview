import { db } from '@/firebase/admin';
import { getRandomInterviewCover } from '@/lib/utils';
import { google } from '@ai-sdk/google';
import { generateText } from 'ai';



export async function GET(){
    return Response.json({success:true,
        data:'THANK YOU',
        
    },
    {
        status:200
    }
)
}
export async function POST(request:Request) {
    const {type,role,level,techstack,amount,userId} =await request.json();
    try {
        const {text:questions} =await generateText({
            model:google('gemini-2.0-flash-001'),
            prompt:`Prepared questions for a job interview...
           The job role is ${role} 
           The job experience level is ${level}
           The tech stack is ${techstack}
           The focus between behavioral and technical questions should learn toward ${type}
           The number of questions is ${amount}
           please return only the questions,without any additional text.
           The question are going to be read by a voice assistant so do not use "/" or "*"  or any other special character which might break  voice system
           Return the qquestions in the following format:
         ["Question 1","Question 2"]
         Thanks you! <3
           `
        })

        const interview = {
            role,
            type,
            level,
            techstack: typeof techstack === "string" ? techstack.split(",") : [],
            questions: typeof questions === "string" ? JSON.parse(questions) : questions,
            finalized: true,
            userId,  // Fixed `userid` to `userId`
            coverImage: getRandomInterviewCover(),
            createdAt: new Date().toISOString(),
        };
        
        await db.collection("interviews").add(interview);
        return Response.json({
            success:true,
            data:interview
        },{
            status:200
        })
    } catch (error) {
        console.error(error)
        return Response.json({
            success:false,
            error
        },{
            status:500
        })
        
    }

    
}