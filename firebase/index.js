// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCrxZcFJWPTw-b2c6q70RsFeqbRjv9_qsI",
  authDomain: "report-c860b.firebaseapp.com",
  projectId: "report-c860b",
  storageBucket: "report-c860b.appspot.com",
  messagingSenderId: "23226118463",
  appId: "1:23226118463:web:448449f333460be589638a",
  measurementId: "G-3EN4M8N3GG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);