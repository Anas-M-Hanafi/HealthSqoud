// firebase-config.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBKZvvNZ46VnLlJs47EMsIopGB4JcM7ICg",
  authDomain: "healthcare-software.firebaseapp.com",
  projectId: "healthcare-software",
  storageBucket: "healthcare-software.appspot.com",
  messagingSenderId: "242217934477",
  appId: "1:242217934477:web:f770e9bb2beb4ef2774cc4",
  measurementId: "G-52DX8D3W2E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
