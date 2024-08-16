
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

const userFirebaseConfig  = {
    apiKey: import.meta.env.VITE_USER_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_USER_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_USER_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_USER_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_USER_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_USER_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_USER_FIREBASE_MEASUREMENT_ID,
};


const userApp  = initializeApp(userFirebaseConfig ,"userApp");
const userAuth  = getAuth(userApp );
const userGoogleProvider  = new GoogleAuthProvider();


export { userAuth, userGoogleProvider, createUserWithEmailAndPassword, signInWithPopup };