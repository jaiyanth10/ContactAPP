// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";//import this
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCG7Y7301pL9EPh1_cbuZXs9wIOtTdpmhE",
  authDomain: "contactapp-306f4.firebaseapp.com",
  projectId: "contactapp-306f4",
  storageBucket: "contactapp-306f4.appspot.com",
  messagingSenderId: "928289058432",
  appId: "1:928289058432:web:1a7dd5798f58cccd640065"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const DB = getFirestore(app);