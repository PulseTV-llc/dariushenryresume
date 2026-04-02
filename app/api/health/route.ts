import { NextResponse } from 'next/server';
import { isFirebaseAdminReady, adminDb } from '@/lib/firebase-admin';
import { getApps } from 'firebase-admin/app';

export async function GET() {
  const checks: Record<string, any> = {
    timestamp: new Date().toISOString(),
    firebaseAdmin: isFirebaseAdminReady(),
    firebaseAppsCount: getApps().length,
  };

  // Check environment variables
  const envVars = {
    FIREBASE_PROJECT_ID: !!process.env.FIREBASE_PROJECT_ID,
    FIREBASE_CLIENT_EMAIL: !!process.env.FIREBASE_CLIENT_EMAIL,
    FIREBASE_PRIVATE_KEY: !!process.env.FIREBASE_PRIVATE_KEY,
    NEXT_PUBLIC_FIREBASE_API_KEY: !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: !!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  };

  checks.environmentVariables = envVars;
  checks.allEnvVarsPresent = Object.values(envVars).every(Boolean);

  // Test Firestore connection (only if Firebase Admin is ready)
  let firestoreTest = {
    canConnect: false,
    canRead: false,
    canWrite: false,
    error: null as string | null,
  };

  if (isFirebaseAdminReady()) {
    try {
      // Try to read from a test collection
      const testCollectionRef = adminDb.collection('_health_check');
      const snapshot = await testCollectionRef.limit(1).get();
      firestoreTest.canConnect = true;
      firestoreTest.canRead = true;

      // Try to write a test document
      const testDoc = await testCollectionRef.add({
        test: true,
        timestamp: new Date().toISOString(),
      });
      firestoreTest.canWrite = true;

      // Clean up test document
      await testDoc.delete();
    } catch (error: any) {
      firestoreTest.error = error.message;
      console.error('[Health Check] Firestore test failed:', error);
    }
  } else {
    firestoreTest.error = 'Firebase Admin SDK not initialized';
  }

  checks.firestoreConnection = firestoreTest;

  // Determine overall health status
  const isHealthy =
    checks.firebaseAdmin &&
    checks.allEnvVarsPresent &&
    firestoreTest.canConnect &&
    firestoreTest.canRead &&
    firestoreTest.canWrite;

  const status = isHealthy ? 'healthy' : 'unhealthy';

  // Provide helpful messages if unhealthy
  const issues: string[] = [];
  if (!checks.firebaseAdmin) {
    issues.push('Firebase Admin SDK not initialized');
  }
  if (!checks.allEnvVarsPresent) {
    const missingVars = Object.entries(envVars)
      .filter(([, value]) => !value)
      .map(([key]) => key);
    issues.push(`Missing environment variables: ${missingVars.join(', ')}`);
  }
  if (!firestoreTest.canConnect) {
    issues.push('Cannot connect to Firestore');
  }
  if (!firestoreTest.canWrite) {
    issues.push('Cannot write to Firestore (check permissions)');
  }

  return NextResponse.json(
    {
      status,
      checks,
      issues: issues.length > 0 ? issues : undefined,
      help: issues.length > 0 ? {
        message: 'See FIREBASE_SETUP.md for setup instructions',
        steps: [
          'Go to Firebase Console → Project Settings → Service Accounts',
          'Generate new private key',
          'Add credentials to .env.local and Vercel',
        ],
      } : undefined,
    },
    { status: isHealthy ? 200 : 503 }
  );
}
