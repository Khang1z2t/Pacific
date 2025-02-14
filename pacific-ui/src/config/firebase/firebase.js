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
    apiKey: "AIzaSyCHpCPlkdD5jYSD6AtiQ0Uzg8ijgX3TKss",
    authDomain: "pacific-607b7.firebaseapp.com",
    databaseURL: "https://pacific-607b7-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "pacific-607b7",
    storageBucket: "pacific-607b7.firebasestorage.app",
    messagingSenderId: "399081188521",
    appId: "1:399081188521:web:eeb9d2d1815a2f4880cdb8",
    measurementId: "G-47YXV1NW1R"
};

// Initialize Firebase
const app = initializeApp(firebase);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export {app, auth, db};