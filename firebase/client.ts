// Import the functions you need from the SDKs you need
import { initializeApp,getApp,getApps } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCLyNDOxq6dRH2sCocy-Rz_w0pXx4WjfSc",
  authDomain: "ai-mock-interview-deaf9.firebaseapp.com",
  projectId: "ai-mock-interview-deaf9",
  storageBucket: "ai-mock-interview-deaf9.firebasestorage.app",
  messagingSenderId: "407082616",
  appId: "1:407082616:web:d536404f8a15aebf0c7f8d",
  measurementId: "G-D385GS5W19"
};

// Initialize Firebase
const app =!getApps.length? initializeApp(firebaseConfig):getApp();
// const analytics = getAnalytics(app);

export const auth=getAuth(app)
export const db=getFirestore(app)