import { NextRequest, NextResponse } from 'next/server';
import { adminDb, isFirebaseAdminReady } from '@/lib/firebase-admin';
import { getApps } from 'firebase-admin/app';

// Rate limiting (simple in-memory store)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimitMap.get(ip);

  if (!limit || now > limit.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 3600000 }); // 1 hour window
    return true;
  }

  if (limit.count >= 5) {
    // Max 5 submissions per hour
    return false;
  }

  limit.count++;
  return true;
}

// Calculate pricing estimate based on questionnaire answers
function calculatePricing(answers: any) {
  let minPrice = 5000;
  let maxPrice = 10000;
  let estimatedTimeline = '1-2 months';
  let recommendedTier = 'Starter';

  // Base price by project type
  const projectTypeMultipliers: Record<string, { min: number; max: number }> = {
    website: { min: 5000, max: 15000 },
    'mobile-app': { min: 15000, max: 40000 },
    'web-app': { min: 15000, max: 50000 },
    ecommerce: { min: 10000, max: 30000 },
    saas: { min: 30000, max: 100000 },
    api: { min: 8000, max: 25000 },
    other: { min: 10000, max: 30000 },
  };

  const basePrice = projectTypeMultipliers[answers.projectType] || { min: 10000, max: 30000 };
  minPrice = basePrice.min;
  maxPrice = basePrice.max;

  // Adjust for current situation
  if (answers.currentSituation === 'redesign') {
    minPrice *= 0.8;
    maxPrice *= 0.8;
  } else if (answers.currentSituation === 'features') {
    minPrice *= 0.6;
    maxPrice *= 0.6;
  } else if (answers.currentSituation === 'fix') {
    minPrice = 2000;
    maxPrice = 10000;
  }

  // Adjust for timeline
  if (answers.timeline === 'asap') {
    minPrice *= 1.3;
    maxPrice *= 1.3;
    estimatedTimeline = '2-4 weeks';
  } else if (answers.timeline === '1-3') {
    estimatedTimeline = '1-3 months';
  } else if (answers.timeline === '3-6') {
    estimatedTimeline = '3-6 months';
    minPrice *= 0.95;
    maxPrice *= 0.95;
  } else if (answers.timeline === '6+') {
    estimatedTimeline = '6+ months';
    minPrice *= 0.9;
    maxPrice *= 0.9;
  }

  // Adjust for features
  const featureCount = answers.features?.length || 0;
  if (featureCount > 5) {
    minPrice *= 1.4;
    maxPrice *= 1.4;
  } else if (featureCount > 3) {
    minPrice *= 1.2;
    maxPrice *= 1.2;
  }

  // Add design costs
  if (answers.designNeeds === 'full-design') {
    minPrice += 5000;
    maxPrice += 15000;
  } else if (answers.designNeeds === 'wireframes') {
    minPrice += 2000;
    maxPrice += 5000;
  }

  // Determine recommended tier
  if (maxPrice >= 50000) {
    recommendedTier = 'Enterprise SaaS';
  } else if (maxPrice >= 30000) {
    recommendedTier = 'Professional';
  } else if (maxPrice >= 15000) {
    recommendedTier = 'Professional';
  } else {
    recommendedTier = 'Starter';
  }

  return {
    min: Math.round(minPrice / 1000) * 1000,
    max: Math.round(maxPrice / 1000) * 1000,
    timeline: estimatedTimeline,
    tier: recommendedTier,
  };
}

export async function POST(request: NextRequest) {
  const requestId = `REQ-${Date.now()}`;

  try {
    console.log(`[${requestId}] Contact form submission started`);

    // Check Firebase Admin initialization FIRST
    if (!isFirebaseAdminReady()) {
      console.error(`[${requestId}] ❌ Firebase Admin SDK is not initialized`);
      console.error(`[${requestId}] Environment check:`, {
        hasProjectId: !!process.env.FIREBASE_PROJECT_ID,
        hasClientEmail: !!process.env.FIREBASE_CLIENT_EMAIL,
        hasPrivateKey: !!process.env.FIREBASE_PRIVATE_KEY,
        firebaseAppsCount: getApps().length,
      });

      return NextResponse.json(
        {
          error: 'Server configuration error. Please contact the administrator.',
          requestId,
          ...(process.env.NODE_ENV === 'development' && {
            details: 'Firebase Admin SDK is not initialized. Check server logs for missing environment variables.',
          }),
        },
        { status: 503 }
      );
    }

    // Get IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    console.log(`[${requestId}] Request from IP: ${ip}`);

    // Check rate limit
    if (!checkRateLimit(ip)) {
      console.warn(`[${requestId}] Rate limit exceeded for IP: ${ip}`);
      return NextResponse.json(
        { error: 'Too many submissions. Please try again later.', requestId },
        { status: 429 }
      );
    }

    // Parse request body
    const body = await request.json();
    const {
      name,
      email,
      projectType,
      currentSituation,
      timeline,
      budget,
      features,
      designNeeds,
      techPreferences,
      description,
    } = body;

    console.log(`[${requestId}] Parsed request:`, {
      name: name || 'missing',
      email: email || 'missing',
      projectType: projectType || 'missing',
      hasDescription: !!description,
    });

    // Validate required fields
    if (!name || !email || !projectType || !description) {
      const missingFields = [];
      if (!name) missingFields.push('name');
      if (!email) missingFields.push('email');
      if (!projectType) missingFields.push('projectType');
      if (!description) missingFields.push('description');

      console.warn(`[${requestId}] Validation failed - missing fields:`, missingFields);
      return NextResponse.json(
        { error: `Please complete all required fields: ${missingFields.join(', ')}`, requestId },
        { status: 400 }
      );
    }

    // Validate field lengths
    if (name.length > 100 || email.length > 100 || description.length > 3000) {
      console.warn(`[${requestId}] Validation failed - field too long:`, {
        nameLength: name.length,
        emailLength: email.length,
        descriptionLength: description.length,
      });
      return NextResponse.json(
        { error: 'One or more fields exceed maximum length.', requestId },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.warn(`[${requestId}] Validation failed - invalid email format: ${email}`);
      return NextResponse.json(
        { error: 'Please provide a valid email address.', requestId },
        { status: 400 }
      );
    }

    // Calculate pricing estimate
    console.log(`[${requestId}] Calculating pricing estimate...`);
    const estimate = calculatePricing(body);
    console.log(`[${requestId}] Estimate calculated:`, {
      range: `$${estimate.min}-$${estimate.max}`,
      timeline: estimate.timeline,
      tier: estimate.tier,
    });

    // Save to Firestore
    const inquiry = {
      // Basic info
      name: name.trim(),
      email: email.trim().toLowerCase(),

      // Project details
      projectType,
      currentSituation,
      timeline,
      budget,
      features: features || [],
      designNeeds,
      techPreferences,
      description: description.trim(),

      // Pricing estimate
      estimatedPrice: {
        min: estimate.min,
        max: estimate.max,
      },
      estimatedTimeline: estimate.timeline,
      recommendedTier: estimate.tier,

      // Metadata
      ip,
      status: 'new',
      createdAt: new Date().toISOString(),
      read: false,
    };

    console.log(`[${requestId}] Attempting to save to Firestore...`);

    try {
      const docRef = await adminDb.collection('inquiries').add(inquiry);
      console.log(`[${requestId}] ✅ Successfully saved to Firestore:`, {
        id: docRef.id,
        email: inquiry.email,
        projectType: inquiry.projectType,
      });
    } catch (firestoreError: any) {
      console.error(`[${requestId}] ❌ Firestore write failed:`, {
        message: firestoreError.message,
        code: firestoreError.code,
        details: firestoreError.details,
        stack: firestoreError.stack,
      });
      throw firestoreError; // Re-throw to be caught by outer catch
    }

    console.log(`[${requestId}] ✅ Request completed successfully`);

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for your inquiry! I\'ll get back to you soon.',
        estimate,
        requestId,
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error(`[${requestId}] ❌ Unexpected error:`, {
      message: error.message,
      code: error.code,
      name: error.name,
      stack: error.stack,
      firebaseInitialized: isFirebaseAdminReady(),
      environmentVariables: {
        hasProjectId: !!process.env.FIREBASE_PROJECT_ID,
        hasClientEmail: !!process.env.FIREBASE_CLIENT_EMAIL,
        hasPrivateKey: !!process.env.FIREBASE_PRIVATE_KEY,
      },
    });

    // Provide helpful error messages based on error type
    let userMessage = 'Unable to submit your inquiry. Please try again later.';
    let hint: string | undefined;

    if (error.message?.includes('adminDb')) {
      userMessage = 'Server configuration error. Please contact the administrator.';
      hint = 'Firebase Admin SDK not properly initialized';
    } else if (error.code === 'permission-denied') {
      userMessage = 'Permission denied. Please contact the administrator.';
      hint = 'Check Firestore security rules';
    } else if (error.code === 'unavailable') {
      userMessage = 'Service temporarily unavailable. Please try again in a moment.';
      hint = 'Firestore connection issue';
    }

    return NextResponse.json(
      {
        error: userMessage,
        requestId,
        ...(process.env.NODE_ENV === 'development' && {
          details: error.message,
          hint,
        }),
      },
      { status: 500 }
    );
  }
}

// Handle OPTIONS for CORS
export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}
