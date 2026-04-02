# Admin System - Contact Form & Dashboard

Your portfolio site now includes a complete admin system to collect and manage contact form inquiries.

## Features

### Contact Form (`/` - Contact Section)
- Fully functional contact form with validation
- Real-time form submission
- Success/error feedback
- Rate limiting (5 submissions per hour per IP)
- Stores inquiries in Firebase Firestore

### Admin Login (`/admin`)
- Secure authentication with Firebase Auth
- Email/password login
- Protected routes
- Clean, modern UI

### Admin Dashboard (`/admin/dashboard`)
- View all contact inquiries in real-time
- Mark inquiries as read/unread
- Update inquiry status (new, in-progress, responded, closed)
- Delete inquiries
- Reply to inquiries via email (click email to open mail client)
- Responsive design
- Real-time updates (new inquiries appear automatically)

## Quick Start

### 1. Set Up Firebase

Follow the detailed guide in `FIREBASE_SETUP.md`:
- Create Firebase project
- Enable Firestore and Authentication
- Create admin user
- Configure environment variables
- Deploy security rules

### 2. Fill in Environment Variables

Edit `.env.local` with your Firebase credentials from the Firebase Console.

### 3. Deploy Firestore Rules

```bash
firebase deploy --only firestore:rules
```

### 4. Test Locally

```bash
npm run dev
```

Visit:
- `http://localhost:3000` - Test contact form
- `http://localhost:3000/admin` - Log in with admin credentials
- `http://localhost:3000/admin/dashboard` - View inquiries

### 5. Deploy to Vercel

Add all environment variables to your Vercel project settings and deploy.

## File Structure

```
portfolio-site/
├── app/
│   ├── admin/
│   │   ├── page.tsx                    # ✅ Admin login page
│   │   └── dashboard/
│   │       └── page.tsx                # ✅ Admin dashboard
│   └── api/
│       └── contact/
│           └── route.ts                # ✅ Contact form API
├── components/
│   └── Contact.tsx                     # ✅ Updated with form logic
├── lib/
│   ├── firebase.ts                     # ✅ Firebase client config
│   └── firebase-admin.ts               # ✅ Firebase Admin SDK
├── firestore.rules                     # ✅ Security rules
├── .env.local                          # ✅ Environment variables
├── .env.example                        # ✅ Template for env vars
├── FIREBASE_SETUP.md                   # ✅ Setup guide
└── ADMIN_SYSTEM.md                     # ✅ This file
```

## Usage

### Accessing the Admin Dashboard

1. Go to `yourdomain.com/admin`
2. Log in with your admin email and password (created in Firebase Console)
3. You'll be redirected to `/admin/dashboard`

### Managing Inquiries

**View Inquiries:**
- All inquiries are listed on the left side
- Click an inquiry to view full details
- New (unread) inquiries have a blue "New" badge and blue left border

**Mark as Read/Unread:**
- Click an inquiry to automatically mark it as read
- Use "Mark Unread" button to mark it as new again

**Update Status:**
- Select from dropdown: New, In Progress, Responded, Closed
- Status updates automatically

**Reply to Inquiry:**
- Click the email address to open your email client
- Compose your response

**Delete Inquiry:**
- Click "Delete" button
- Confirm deletion

### Security Features

**Contact Form:**
- Rate limiting: 5 submissions per hour per IP
- Input validation (max lengths, email format)
- Sanitized data storage
- Server-side validation

**Admin Area:**
- Firebase Authentication required
- Protected routes (auto-redirect if not logged in)
- Firestore security rules (only authenticated users can read)
- Server-side data writes only (clients can't write to Firestore)

**Environment Variables:**
- `.env.local` is git-ignored
- Separate public/private config
- Service account keys protected

## API Endpoints

### POST `/api/contact`

Submit a contact form inquiry.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "I'd like to discuss a project..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Thank you for your message! I'll get back to you soon."
}
```

**Rate Limit:** 5 requests per hour per IP

## Firestore Data Structure

### Collection: `inquiries`

```javascript
{
  id: "auto-generated-id",
  name: "John Doe",
  email: "john@example.com",
  subject: "Project Inquiry",
  message: "I'd like to discuss...",
  status: "new", // new | in-progress | responded | closed
  read: false,
  createdAt: "2024-01-15T10:30:00.000Z",
  ip: "192.168.1.1" // for rate limiting
}
```

## Customization

### Update Email Address

Edit `components/Contact.tsx` line 46:
```tsx
href="mailto:dariushenry@example.com"
```

Replace with your actual email address.

### Add More Status Options

Edit `app/admin/dashboard/page.tsx` around line 235:
```tsx
<select>
  <option value="new">New</option>
  <option value="in-progress">In Progress</option>
  <option value="responded">Responded</option>
  <option value="closed">Closed</option>
  {/* Add your custom statuses here */}
</select>
```

### Change Rate Limits

Edit `app/api/contact/route.ts` line 23:
```tsx
if (limit.count >= 5) { // Change this number
```

## Troubleshooting

See `FIREBASE_SETUP.md` for detailed troubleshooting steps.

**Common Issues:**
- Can't submit form → Check environment variables and Firebase Admin SDK setup
- Can't log in → Verify admin user created in Firebase Console
- Permission denied → Deploy Firestore rules: `firebase deploy --only firestore:rules`
- Private key error → Ensure proper formatting with `\n` and quotes

## Next Steps

- [ ] Update email address in Contact component
- [ ] Add email notifications for new inquiries (optional)
- [ ] Customize status options
- [ ] Add export functionality (CSV/PDF)
- [ ] Set up automatic backups

---

**Questions?** Check `FIREBASE_SETUP.md` or Firebase documentation.
