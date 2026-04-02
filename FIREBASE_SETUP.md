# Firebase Setup Guide

This guide will walk you through setting up Firebase for your portfolio site's contact form and admin dashboard.

## Prerequisites

- A Google account
- Node.js and npm installed
- Your portfolio site code

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or "Create a project"
3. Enter a project name (e.g., "portfolio-site")
4. Choose whether to enable Google Analytics (optional)
5. Click "Create project"

## Step 2: Register Your Web App

1. In your Firebase project, click the **Web icon** (`</>`) to add a web app
2. Give your app a nickname (e.g., "Portfolio Website")
3. Click "Register app"
4. Copy the Firebase configuration object - you'll need this for your `.env.local` file
5. Click "Continue to console"

## Step 3: Enable Firestore Database

1. In the Firebase Console, go to **Build** → **Firestore Database**
2. Click "Create database"
3. Choose **Production mode** (we'll deploy custom security rules)
4. Select your preferred database location (choose closest to your users)
5. Click "Enable"

## Step 4: Enable Authentication

1. Go to **Build** → **Authentication**
2. Click "Get started"
3. Go to the **Sign-in method** tab
4. Enable **Email/Password** provider
5. Click "Save"

## Step 5: Create Admin User

1. Go to **Authentication** → **Users**
2. Click "Add user"
3. Enter your admin email and a strong password
4. Click "Add user"
5. **Save these credentials securely** - you'll use them to log into `/admin`

## Step 6: Get Service Account Key (for Admin SDK)

1. Go to **Project settings** (gear icon) → **Service accounts**
2. Click "Generate new private key"
3. Click "Generate key" - a JSON file will download
4. **Keep this file secure** - it contains sensitive credentials
5. Open the JSON file and note these values:
   - `project_id`
   - `client_email`
   - `private_key`

## Step 7: Configure Environment Variables

Create or update your `.env.local` file in the project root:

```env
# Firebase Client Config (from Step 2)
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Firebase Admin SDK (from Step 6)
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your_project_id.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour_Private_Key_Here\n-----END PRIVATE KEY-----\n"

# OpenAI API Key (for chatbot - if you're using it)
OPENAI_API_KEY=your_openai_api_key_here
```

**Important Notes:**
- The `FIREBASE_PRIVATE_KEY` must include the full key including `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----`
- Wrap it in quotes and include `\n` for newlines
- Never commit `.env.local` to git (it's in `.gitignore`)

## Step 8: Deploy Firestore Security Rules

Deploy the security rules to protect your database:

```bash
# Install Firebase CLI if you haven't
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase in your project (if not already done)
firebase init firestore

# Select your project
# Use the existing firestore.rules file
# Press Enter to use default firestore.indexes.json

# Deploy the rules
firebase deploy --only firestore:rules
```

## Step 9: Add Environment Variables to Vercel (if deploying)

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add all the environment variables from your `.env.local` file
4. Make sure to add them for all environments (Production, Preview, Development)
5. Redeploy your site for changes to take effect

## Step 10: Test Your Setup

1. **Test Contact Form:**
   - Go to your website's contact section
   - Fill out and submit the form
   - Check Firebase Console → Firestore Database → `inquiries` collection
   - You should see your test inquiry

2. **Test Admin Login:**
   - Go to `/admin` on your website
   - Log in with the admin credentials from Step 5
   - You should be redirected to `/admin/dashboard`
   - You should see your test inquiry

3. **Test Admin Features:**
   - Click on an inquiry to view details
   - Try marking as read/unread
   - Try changing the status
   - Try deleting an inquiry

## Security Checklist

✅ Firestore security rules deployed (only authenticated users can read inquiries)
✅ Admin user created with strong password
✅ Environment variables configured (never commit `.env.local`)
✅ Service account key stored securely
✅ Rate limiting enabled on contact form (5 submissions per hour per IP)

## Troubleshooting

### "Permission denied" errors in Firestore
- Make sure you deployed the firestore.rules: `firebase deploy --only firestore:rules`
- Check that you're logged in with the admin user

### Contact form not submitting
- Check browser console for errors
- Verify environment variables are set correctly
- Check that Firebase Admin SDK credentials are correct
- Look at Vercel deployment logs for server errors

### Can't log into admin
- Verify the email/password are correct
- Check that Email/Password auth is enabled in Firebase Console
- Check browser console for errors

### Private key error
- Make sure `FIREBASE_PRIVATE_KEY` includes `\n` for newlines
- Wrap the entire key in quotes
- Include the BEGIN and END markers

## File Structure

```
portfolio-site/
├── app/
│   ├── admin/
│   │   ├── page.tsx              # Admin login page
│   │   └── dashboard/
│   │       └── page.tsx          # Admin dashboard
│   └── api/
│       └── contact/
│           └── route.ts          # Contact form API endpoint
├── components/
│   └── Contact.tsx               # Contact form component
├── lib/
│   ├── firebase.ts               # Firebase client config
│   └── firebase-admin.ts         # Firebase Admin SDK config
├── firestore.rules               # Firestore security rules
├── .env.local                    # Environment variables (not in git)
└── FIREBASE_SETUP.md            # This file
```

## Next Steps

- Customize the email in `components/Contact.tsx` (currently `dariushenry@example.com`)
- Set up email notifications when new inquiries arrive (optional)
- Add more admin features as needed
- Monitor Firebase usage in the Firebase Console

## Troubleshooting

### Health Check Endpoint

Before submitting an inquiry, verify your Firebase setup:

```bash
# Local development
http://localhost:3000/api/health

# Production
https://your-domain.vercel.app/api/health
```

**Expected Healthy Response:**
```json
{
  "status": "healthy",
  "checks": {
    "firebaseAdmin": true,
    "allEnvVarsPresent": true,
    "firestoreConnection": {
      "canConnect": true,
      "canRead": true,
      "canWrite": true
    }
  }
}
```

### Common Errors

#### ❌ "Server configuration error. Please contact the administrator."

**Cause:** Firebase Admin SDK is not initialized

**Solution:**
1. Check that all 3 environment variables are set:
   - `FIREBASE_PROJECT_ID`
   - `FIREBASE_CLIENT_EMAIL`
   - `FIREBASE_PRIVATE_KEY`
2. Visit `/api/health` to see which variables are missing
3. Check server logs (Vercel logs or `npm run dev` output)
4. Look for this message in logs:
   ```
   ❌ Firebase Admin SDK - Missing environment variables: [list]
   ```

**Fix:**
```bash
# Go to Firebase Console → Project Settings → Service Accounts
# Click "Generate new private key"
# Add the values to .env.local and Vercel
```

---

#### ❌ "Permission denied"

**Cause:** Firestore security rules are blocking writes

**Solution:**
1. Check if Firestore rules are deployed:
   ```bash
   firebase deploy --only firestore:rules
   ```
2. Verify rules in Firebase Console → Firestore Database → Rules
3. Ensure the rules allow server writes:
   ```
   match /inquiries/{inquiryId} {
     allow write: if false; // Only server can write
   }
   ```

---

#### ❌ "Unable to submit your inquiry. Please try again later."

**Cause:** Generic error - check logs for details

**Solution:**
1. Open browser console (F12) and look for detailed error messages
2. Check the Request ID in the error message
3. Search Vercel logs for that Request ID:
   ```
   [REQ-1234567890] ❌ Firestore write failed: ...
   ```
4. Common causes:
   - Firebase Admin not initialized
   - Network timeout
   - Invalid data format
   - Firestore quota exceeded

---

#### ❌ Private key error

**Cause:** `FIREBASE_PRIVATE_KEY` is not properly formatted

**Solution:**

The private key must:
- Include `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----`
- Use `\n` for newlines (not actual line breaks)
- Be wrapped in quotes

**Correct format in `.env.local`:**
```env
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBg...\n-----END PRIVATE KEY-----\n"
```

**In Vercel:**
- Paste the entire key including BEGIN/END markers
- Vercel will automatically handle the newlines

---

### Debugging Steps

1. **Check Server Logs:**
   ```bash
   # Local
   npm run dev
   # Watch the console output

   # Vercel
   # Go to Vercel Dashboard → Deployments → [Latest] → Functions
   # Look for detailed error logs with Request IDs
   ```

2. **Test Health Check:**
   ```bash
   curl http://localhost:3000/api/health
   # or visit in browser
   ```

3. **Test Contact Form:**
   - Submit a test inquiry
   - Check browser console (F12 → Console tab)
   - Look for `[ContactQuestionnaire]` and request details
   - Note the Request ID from any errors

4. **Verify Environment Variables:**
   ```bash
   # Check .env.local exists and has all variables
   cat .env.local | grep FIREBASE

   # Should show:
   # FIREBASE_PROJECT_ID=...
   # FIREBASE_CLIENT_EMAIL=...
   # FIREBASE_PRIVATE_KEY=...
   ```

5. **Check Firestore in Firebase Console:**
   - Go to Firebase Console → Firestore Database
   - Look for `inquiries` collection
   - If empty, submissions aren't reaching Firestore

---

### Error Message Reference

| Error Message | Status Code | Cause | Fix |
|--------------|-------------|-------|-----|
| Server configuration error | 503 | Firebase not initialized | Add environment variables |
| Too many submissions | 429 | Rate limit (5/hour) | Wait 1 hour or use different IP |
| Invalid email address | 400 | Email validation failed | Check email format |
| Missing fields | 400 | Required fields empty | Fill all required fields |
| Permission denied | 403 | Firestore rules | Deploy firestore.rules |
| Network error | - | Connection issue | Check internet connection |

---

### Request ID Tracking

Every error includes a Request ID for debugging:
```
Unable to submit. (Request ID: REQ-1234567890)
```

To find the error in logs:
1. Copy the Request ID
2. Go to Vercel → Deployments → Functions
3. Search for the Request ID
4. View the full error details

---

## Support

If you encounter issues:

1. **Visit Health Check:** `/api/health`
2. **Check Browser Console:** F12 → Console tab
3. **Check Server Logs:** Vercel dashboard or `npm run dev` output
4. **Note Request ID:** Include it when asking for help
5. **Verify Environment Variables:** All 3 Firebase Admin vars must be set

**Still stuck?**
- Check the [Firebase Documentation](https://firebase.google.com/docs)
- Verify Firestore security rules are deployed
- Ensure Firebase project has Firestore enabled
- Check Firebase Console for quota/billing issues

---

**Need Help?** Include the Request ID and error message from `/api/health` when asking for support.
