// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA9-9c2EfvaWsUiOPcd76hs3vwZvTz_4mw",
  authDomain: "tdp-reports-cb5ae.firebaseapp.com",
  projectId: "tdp-reports-cb5ae",
  storageBucket: "tdp-reports-cb5ae.appspot.com",
  messagingSenderId: "711056282387",
  appId: "1:711056282387:web:1abebd96b9b4203d1a00e6",
  measurementId: "G-DDX8FG859G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);