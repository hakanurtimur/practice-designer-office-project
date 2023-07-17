// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDCQD4C-8IleucOpZBYGEjry4pirStsVQI",
  authDomain: "designer-app-ecbde.firebaseapp.com",
  projectId: "designer-app-ecbde",
  storageBucket: "designer-app-ecbde.appspot.com",
  messagingSenderId: "617800482313",
  appId: "1:617800482313:web:8d7ac2df488f8a1bdac2d8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();

export const db = getFirestore(app);
