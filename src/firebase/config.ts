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
// Firebase configuration - these values are safe to expose publicly
// They are client-side identifiers, not secret keys
const firebaseConfig = {
  apiKey: getEnvVar('VITE_FIREBASE_API_KEY', "your-api-key"),
  authDomain: getEnvVar('VITE_FIREBASE_AUTH_DOMAIN', "your-project.firebaseapp.com"),
  projectId: getEnvVar('VITE_FIREBASE_PROJECT_ID', "your-project-id"),
  storageBucket: getEnvVar('VITE_FIREBASE_STORAGE_BUCKET', "your-project.appspot.com"),
  messagingSenderId: getEnvVar('VITE_FIREBASE_MESSAGING_SENDER_ID', "123456789"),
  appId: getEnvVar('VITE_FIREBASE_APP_ID', "1:123456789:web:abcdef123456")
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;