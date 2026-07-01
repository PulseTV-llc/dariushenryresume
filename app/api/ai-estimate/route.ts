import { NextRequest, NextResponse } from 'next/server';
import { adminDb, isFirebaseAdminReady } from '@/lib/firebase-admin';

// AI System estimator lead capture.
//
// Submissions land in Firestore collection "ai_estimates" when Firebase Admin
// is configured (FIREBASE_PROJECT_ID / CLIENT_EMAIL / PRIVATE_KEY env vars).
// If not configured, the route still returns 200 so the client can show the
// estimate — submissions are logged to the server console for inspection.
//
// TODO: Add email/CRM forwarding (e.g. Resend, SendGrid, HubSpot) where noted
// below. The client already shows the estimate inline; this route only
// persists the lead.

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimitMap.get(ip);
  if (!limit || now > limit.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 3600000 });
    return true;
  }
  if (limit.count >= 10) return false;
  limit.count++;
  return true;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  const requestId = `AIE-${Date.now()}`;

  try {
    const ip =
      request.headers.get('x-forwarded-for') ||
      request.headers.get('x-real-ip') ||
      'unknown';

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many submissions. Please try again later.', requestId },
        { status: 429 }
      );
    }

    const body = await request.json();
    const form = body?.form ?? {};
    const estimate = body?.estimate ?? null;

    const businessName = String(form.businessName || '').trim();
    const contactName = String(form.contactName || '').trim();
    const email = String(form.email || '').trim().toLowerCase();

    if (!businessName || !contactName || !email) {
      return NextResponse.json(
        { error: 'Please complete business name, contact name, and email.', requestId },
        { status: 400 }
      );
    }
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.', requestId },
        { status: 400 }
      );
    }
    if (businessName.length > 200 || contactName.length > 200 || email.length > 200) {
      return NextResponse.json(
        { error: 'One or more fields exceed maximum length.', requestId },
        { status: 400 }
      );
    }

    const record: Record<string, unknown> = {
      // Identity
      businessName,
      contactName,
      email,
      phone: String(form.phone || '').trim() || null,
      website: String(form.website || '').trim() || null,
      industry: form.industry || null,
      locations: form.locations || null,
      // Sizing
      userBucket: form.userBucket || null,
      documentBucket: form.documentBucket || null,
      documentTypes: form.documentTypes || [],
      // Goals
      workflowGoals: form.workflowGoals || [],
      // Security
      sensitive: form.sensitive || null,
      roleBased: form.roleBased || null,
      deployment: form.deployment || null,
      // Integrations
      integrations: form.integrations || [],
      // Budget
      budget: form.budget || null,
      launchTimeline: form.launchTimeline || null,
      // Generated estimate (snapshotted at submission time)
      estimate: estimate
        ? {
            tier: estimate.tier?.label,
            userBucket: estimate.tier?.id,
            nodes: estimate.nodes,
            gpuSpec: estimate.gpuSpec,
            setupRange: estimate.setupRange,
            hardwareRange: estimate.hardwareRange,
            monthly: estimate.monthly,
            notes: estimate.notes || [],
            systemHandles: estimate.systemHandles || [],
          }
        : null,
      // Metadata
      ip,
      status: 'new',
      read: false,
      createdAt: new Date().toISOString(),
    };

    if (isFirebaseAdminReady() && adminDb) {
      try {
        const docRef = await adminDb.collection('ai_estimates').add(record);
        console.log(`[${requestId}] ✅ AI estimate saved: ${docRef.id}`);
      } catch (err: any) {
        console.error(`[${requestId}] ❌ Firestore write failed:`, err?.message || err);
        // Still return success — the user has their estimate on screen.
      }
    } else {
      console.warn(
        `[${requestId}] ⚠️ Firebase Admin not configured — AI estimate not persisted. ` +
          `Add FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY to .env.local to enable storage.`
      );
      console.log(`[${requestId}] Lead payload:`, JSON.stringify(record, null, 2));
    }

    // TODO: Forward to email / CRM here.
    //   e.g. await sendEmail({ to: 'darius.henry@gmail.com', subject: 'New AI estimate', body: ... })
    //   e.g. await hubspot.contacts.create({ ... })

    return NextResponse.json(
      {
        success: true,
        message:
          'Your AI system estimate has been generated. Darius can review your answers and recommend the best private AI workflow setup for your business.',
        requestId,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(`[${requestId}] ❌ Unexpected error:`, error?.message || error);
    return NextResponse.json(
      {
        error: 'Unable to submit your estimate right now. Please try again later.',
        requestId,
      },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}
