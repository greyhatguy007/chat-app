import { initializeApp } from "firebase/app";
import {GoogleAuthProvider, getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyCoSg7eCyMdyRaflyT1QRrjjuC4k6eVj1c",
  authDomain: "chat-app-87dc2.firebaseapp.com",
  projectId: "chat-app-87dc2",
  storageBucket: "chat-app-87dc2.appspot.com",
  messagingSenderId: "868325332794",
  appId: "1:868325332794:web:bdbb721d2a34223ca7a203",
  measurementId: "G-J4MCFREWLK"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);