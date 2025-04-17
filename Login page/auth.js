// auth.js

import { auth } from "./firebase-config.js";
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  OAuthProvider,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// Create providers
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const appleProvider = new OAuthProvider("apple.com");

// Helper function to handle login
function loginWithProvider(provider, providerName) {
  signInWithPopup(auth, provider)
    .then((result) => {
      const displayName = result.user.displayName || `${providerName} User`;
      alert(`Welcome ${displayName}`);
      console.log(`${providerName} login successful:`, result.user);
    })
    .catch((error) => {
      console.error(`${providerName} login failed:`, error);
      alert(`${providerName} login failed: ${error.message}`);
    });
}

// Event listeners for buttons
document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".google")?.addEventListener("click", () => {
    loginWithProvider(googleProvider, "Google");
  });

  document.querySelector(".facebook")?.addEventListener("click", () => {
    loginWithProvider(facebookProvider, "Facebook");
  });

  document.querySelector(".apple")?.addEventListener("click", () => {
    loginWithProvider(appleProvider, "Apple");
  });
});
