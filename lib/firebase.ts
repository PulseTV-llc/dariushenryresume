// Firebase client-side configuration
import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '',
};

// Initialize Firebase only in browser environment
let app: FirebaseApp;
let authInstance: Auth;
let dbInstance: Firestore;

if (typeof window !== 'undefined') {
  // Only initialize in browser
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  authInstance = getAuth(app);
  dbInstance = getFirestore(app);
} else {
  // Dummy initialization for SSR/build (won't be used)
  app = {} as FirebaseApp;
  authInstance = {} as Auth;
  dbInstance = {} as Firestore;
}

// Export instances
export const auth = authInstance;
export const db = dbInstance;
export default app;
