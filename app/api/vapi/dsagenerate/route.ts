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
}export async function POST(request: Request) {  
    const { topic, difficulty, amount, userId } = await request.json();  
    try {  
        const { text: questions } = await generateText({  
            model: google('gemini-2.0-flash-001'),  
            prompt: `Generate ${amount} LeetCode-style data structures and algorithms (DSA) questions.  
            The topic is ${topic}.  
            The difficulty level is ${difficulty} (choose questions from LeetCode difficulty levels: Easy, Medium, or Hard).  
            Provide real-world coding problems commonly found on LeetCode.  
          please return only the questions,without any additional text.
           The question are going to be read by a voice assistant so do not use "/" or "*"  or any other special character which might break  voice system
           Return the qquestions in the following format:  
            ["Question 1", "Question 2"]  
             
            Thank you! <3`  
        });  

        const dsaInterview = {  
            topic,  
            difficulty,  
            questions: typeof questions === "string" ? JSON.parse(questions) : questions,  
            finalized: true,  
            userId,  
            coverImage: getRandomInterviewCover(),  
            createdAt: new Date().toISOString(),  
        };  

        await db.collection("dsa_interviews").add(dsaInterview);  
        return Response.json({  
            success: true,  
            data: dsaInterview  
        }, {  
            status: 200  
        });  
    } catch (error) {  
        console.error(error);  
        return Response.json({  
            success: false,  
            error  
        }, {  
            status: 500  
        });  
    }  
}  
