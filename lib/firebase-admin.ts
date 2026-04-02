// Firebase Admin SDK for server-side operations
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

// Validate environment variables and provide helpful warnings
const validateFirebaseEnv = () => {
  const missingVars: string[] = [];

  if (!process.env.FIREBASE_PROJECT_ID) {
    missingVars.push('FIREBASE_PROJECT_ID');
  }
  if (!process.env.FIREBASE_CLIENT_EMAIL) {
    missingVars.push('FIREBASE_CLIENT_EMAIL');
  }
  if (!process.env.FIREBASE_PRIVATE_KEY) {
    missingVars.push('FIREBASE_PRIVATE_KEY');
  }

  if (missingVars.length > 0) {
    console.error('❌ Firebase Admin SDK - Missing environment variables:', missingVars.join(', '));
    console.error('');
    console.error('📋 To fix this:');
    console.error('1. Go to Firebase Console → Project Settings → Service Accounts');
    console.error('2. Click "Generate new private key" and download the JSON file');
    console.error('3. Add these to your .env.local:');
    console.error('   FIREBASE_PROJECT_ID=your-project-id');
    console.error('   FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com');
    console.error('   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\\n...\\n-----END PRIVATE KEY-----\\n"');
    console.error('');
    console.error('4. If deploying to Vercel, add the same variables to Vercel dashboard');
    console.error('');
    return false;
  }

  console.log('✅ Firebase Admin SDK - All environment variables present');
  return true;
};

// Initialize Firebase Admin (only once)
if (getApps().length === 0) {
  const hasAllVars = validateFirebaseEnv();

  if (hasAllVars) {
    try {
      initializeApp({
        credential: cert({
          projectId: process.env.FIREBASE_PROJECT_ID!,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
          privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
        }),
      });
      console.log('✅ Firebase Admin SDK initialized successfully');
    } catch (error: any) {
      console.error('❌ Firebase Admin SDK initialization failed:', error.message);
      console.error('Check that your FIREBASE_PRIVATE_KEY is properly formatted with \\n for newlines');
    }
  } else {
    console.warn('⚠️ Firebase Admin SDK NOT initialized - contact form will not work');
  }
}

// Export with null check - will throw error at runtime if used before Firebase is configured
export const adminDb = getApps().length > 0 ? getFirestore() : (null as any);
export const adminAuth = getApps().length > 0 ? getAuth() : (null as any);

// Helper to check if Firebase Admin is ready
export const isFirebaseAdminReady = () => getApps().length > 0;
