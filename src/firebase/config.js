// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDT0L7U67kMv7n4w1j9B7KcXEnOtYkHnTk",
  authDomain: "journal-app-a8b15.firebaseapp.com",
  projectId: "journal-app-a8b15",
  storageBucket: "journal-app-a8b15.firebasestorage.app",
  messagingSenderId: "444044636697",
  appId: "1:444044636697:web:84da9ebf9ab639de5eb088",
  measurementId: "G-943RRLEXRC",
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp); // vienen todas las funcionalidades de autenticacion
export const FirebaseDB = getFirestore(FirebaseApp); // es la confiiguracion de la base de datos
