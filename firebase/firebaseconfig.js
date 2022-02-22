// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDrlVYPQvgZKIb5t6iSq48p9qWzRdLy8yo",
  authDomain: "the-mealeria.firebaseapp.com",
  projectId: "the-mealeria",
  storageBucket: "the-mealeria.appspot.com",
  messagingSenderId: "926829625185",
  appId: "1:926829625185:web:211db88596b891e3cecf20"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
