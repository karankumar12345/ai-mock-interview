

/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { auth, db } from "@/firebase/admin";
// import { cookies } from "next/headers";
// import { CollectionReference } from 'firebase-admin/firestore';
import { cookies } from 'next/headers';
// import { DocumentData } from 'firebase-admin/firestore';


export async function signUp(params:SignUpParams){
  const {uid,name,email}=params;

  try {
const userRecord=await db.collection('users').doc(uid).get();
if(userRecord.exists){
    return {
        success:false,
        message:'User already exist Please sign in instend'
    }
}
await db.collection('users').doc(uid).set({
    name,
    email,
    
})
return {
    success:true,
    message:"Account created created successfully"

}
    
  } catch (error:any) {
    console.log("error in sign up",error);
    if(error.code==='auth/email-already-exists'){
        return {
            success:false,
            message:"Email already exists"
        }
    }
    return {
        success:false,
        message:"Something went wrong"
    
    }
  }
}


export async function SignIn(params:SignInParams){
    const {email,idToken}=params;

    try {
        const userRecord=await auth.getUserByEmail(email);
        if(!userRecord){
            return {
                success:false,
                message:"User not found"
            }
        }
        await SetSession(idToken);
        
    } catch (error) {
        console.log("error in sign in", error);
        return {
            success:false,
            message:"Something went wrong"
        }
    }
}
export async function SetSession(idToken:string) {
    const cookieStore=await cookies();
    const sessionCookie=await auth.createSessionCookie(idToken,{
        expiresIn:60*60*24*5*1000
    })
    cookieStore.set("session",sessionCookie,{
        maxAge:60*60*24*5*1000,
        httpOnly:true,
        secure:true,
        path:"/",
        sameSite:"lax"
    })

    
}


export async function getCurrentUser(): Promise<User | null> {
    const cookieStore = cookies(); // No need for 'await' here

    const sessionCookie = (await cookieStore).get('session')?.value;
    if (!sessionCookie) return null; // Fix the condition

    try {
        const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);

        const userRecord = await db.collection('users').doc(decodedClaims.uid).get();

        if (!userRecord.exists) return null; // Explicitly return null if user not found

        return userRecord.data() as User; // Cast the Firestore document to User type
    } catch (error) {
        console.error("Error verifying session:", error);
        return null;
    }
}


export async function isAuthenticated(){
    const user=await getCurrentUser();
    return !!user;


}