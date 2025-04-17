import { auth } from "./firebase-config.js";
import {
    GoogleAuthProvider,
    FacebookAuthProvider,
    OAuthProvider,
    signInWithPopup,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const appleProvider = new OAuthProvider("apple.com");

// === Authentication Buttons ===
document.querySelector(".google")?.addEventListener("click", async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        alert(`Welcome ${result.user.displayName}`);
    } catch (error) {
        console.error("Google sign-in error:", error);
        alert("Google login failed: " + error.message);
    }
});

document.querySelector(".facebook")?.addEventListener("click", async () => {
    try {
        const result = await signInWithPopup(auth, facebookProvider);
        alert(`Welcome ${result.user.displayName}`);
    } catch (error) {
        console.error("Facebook sign-in error:", error);
        alert("Facebook login failed: " + error.message);
    }
});

document.querySelector(".apple")?.addEventListener("click", async () => {
    try {
        const result = await signInWithPopup(auth, appleProvider);
        const displayName = result.user.displayName || "Apple User";
        alert(`Welcome ${displayName}`);
    } catch (error) {
        console.error("Apple sign-in error:", error);
        alert("Apple login failed: " + error.message);
    }
});
