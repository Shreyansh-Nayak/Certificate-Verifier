import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Replace with your actual Firebase project configuration
// Get these from Firebase Console -> Project Settings -> General -> Your apps -> SDK setup/configuration
const firebaseConfig = {
    apiKey: "AIzaSyD8Qlm8_kdYq8ZCN8-nMyjWxZ5vd7y0efE",
    authDomain: "certificate-verifier-11e9c.firebaseapp.com",
    projectId: "certificate-verifier-11e9c",
    storageBucket: "certificate-verifier-11e9c.firebasestorage.app",
    messagingSenderId: "1049005291930",
    appId: "1:1049005291930:web:7d0158fd0513d1b3ada223",
    measurementId: "G-NJRS30BZYF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
