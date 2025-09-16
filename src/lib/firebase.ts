import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

export const firebaseConfig = {
  "projectId": "studio-4955566456-2a755",
  "appId": "1:92071755667:web:8be9ce9e81617f6b9ab266",
  "storageBucket": "studio-4955566456-2a755.firebasestorage.app",
  "apiKey": "AIzaSyB_7ONuMO9UsUnk3he1kxwekhyrUptmu1o",
  "authDomain": "studio-4955566456-2a755.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "92071755667"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
