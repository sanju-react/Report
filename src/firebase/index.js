import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  // Your Firebase configuration details
  apiKey: "AIzaSyBIWV2DIHK0JjjsW9xEPDXdxxQSyHJXR_Y",
  // authDomain: "tdp-reports-c4ee8.firebaseapp.com",
  authDomain: "tdp-reports-c4ee8-default-rtdb.firebaseio.com",
  projectId: "tdp-reports-c4ee8",
  storageBucket: "tdp-reports-c4ee8.appspot.com",
  messagingSenderId: "209990004880",
  appId: "1:209990004880:web:1f5374a9b1b5ed26516815",
  measurementId: "G-DYQJZCD7DP",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
