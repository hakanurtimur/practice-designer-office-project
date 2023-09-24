// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "@firebase/firestore";
import {getStorage} from "@firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBj4gMHzae15AWd5KlTW1nJuvnhWf0eCYA",
  authDomain: "designerapp-e9867.firebaseapp.com",
  projectId: "designerapp-e9867",
  storageBucket: "designerapp-e9867.appspot.com",
  messagingSenderId: "309387322557",
  appId: "1:309387322557:web:c351f256ecc2ada427c3d4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();

export const db = getFirestore(app);

export const storage = getStorage(app);
