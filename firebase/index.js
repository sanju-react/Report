// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAiNget4sJ2uznKhfT55dEqyrN_ZXwRgso",
  authDomain: "tdp-reports.firebaseapp.com",
  projectId: "tdp-reports",
  storageBucket: "tdp-reports.appspot.com",
  messagingSenderId: "836894995262",
  appId: "1:836894995262:web:bafcbd2f670a5a553a326f",
  measurementId: "G-T6QFTLMTG2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);