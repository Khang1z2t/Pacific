// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebase = {
    apiKey: "AIzaSyB-yCaC9zz7HHyLpM5bJ7LFSTeGmZaXzO8",
    authDomain: "pacific-musketeers-tni.firebaseapp.com",
    projectId: "pacific-musketeers-tni",
    storageBucket: "pacific-musketeers-tni.firebasestorage.app",
    messagingSenderId: "523962620313",
    appId: "1:523962620313:web:15b91f4ca6b0a64d2ddb08",
    measurementId: "G-QY8JCZKB5V"
};

// Initialize Firebase
const app = initializeApp(firebase);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export {app, auth, db};