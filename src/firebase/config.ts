// Firebase configuration
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Function to safely get environment variables in both browser and Node.js
const getEnvVar = (key, fallback) => {
  // In browser/Vite environment
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    return import.meta.env[key] || fallback;
  }
  
  // In Node.js environment
  if (typeof process !== 'undefined' && process.env) {
    return process.env[key] || fallback;
  }
  
  // Fallback
  return fallback;
};

// Your web app's Firebase configuration
// Production Firebase configuration
const firebaseConfig = {
  apiKey: getEnvVar('VITE_FIREBASE_API_KEY', "AIzaSyBDZKsGzGkz4bn1O9fj9O5awfMXzbK0pVA"),
  authDomain: getEnvVar('VITE_FIREBASE_AUTH_DOMAIN', "agentiqbolt.firebaseapp.com"),
  projectId: getEnvVar('VITE_FIREBASE_PROJECT_ID', "agentiqbolt"),
  storageBucket: getEnvVar('VITE_FIREBASE_STORAGE_BUCKET', "agentiqbolt.firebasestorage.app"),
  messagingSenderId: getEnvVar('VITE_FIREBASE_MESSAGING_SENDER_ID', "896856772756"),
  appId: getEnvVar('VITE_FIREBASE_APP_ID', "1:896856772756:web:d2ba9f4a5ac829e8486481")
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;