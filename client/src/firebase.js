// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAj45kqSq0Jja2ZXDkwmj-qpN6aD9596_4",
  authDomain: "smart-room-booking-5149e.firebaseapp.com",
  projectId: "smart-room-booking-5149e",
  storageBucket: "smart-room-booking-5149e.appspot.com",
  messagingSenderId: "186744359197",
  appId: "1:186744359197:web:526c1598b0fee6f53279f4",
  measurementId: "G-BT4SLTP9KY"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();


export { auth, googleProvider, createUserWithEmailAndPassword, signInWithPopup };



