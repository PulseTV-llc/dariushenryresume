# 🤖 AI ChatBot Setup Guide

## Overview

Your portfolio now includes an AI-powered chatbot that answers visitor questions about:
- Your 27+ projects and portfolio
- Tech stack and expertise
- Development process
- Pricing and services
- How to get started working with you

The chatbot **only** answers questions about your work - it refuses off-topic questions and redirects visitors back to asking about you.

---

## 🔑 Step 1: Get Your OpenAI API Key

### 1. Create OpenAI Account
- Go to [platform.openai.com](https://platform.openai.com)
- Sign up or log in

### 2. Add Payment Method
- Go to [Settings → Billing](https://platform.openai.com/settings/organization/billing/overview)
- Add a credit card
- Add at least $5 credit (recommended: $10-20 to start)

### 3. Create API Key
- Go to [API Keys](https://platform.openai.com/api-keys)
- Click **"Create new secret key"**
- Name it: `Portfolio ChatBot`
- Copy the key (starts with `sk-...`)
- **IMPORTANT:** Save it somewhere safe - you can't see it again!

---

## 🔧 Step 2: Add API Key Locally (Development)

### Create .env.local file:
```bash
cd /Users/stockhousefilms/Documents/dariusHenry/portfolio-site

# Create the file
touch .env.local

# Open in editor and add:
OPENAI_API_KEY=sk-your-actual-key-here
```

**Or use this command:**
```bash
echo "OPENAI_API_KEY=sk-your-actual-key-here" > .env.local
```

Replace `sk-your-actual-key-here` with your real API key.

---

## ☁️ Step 3: Add API Key to Vercel (Production)

### Method 1: Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com)
2. Select your project: **dariushenryresume**
3. Go to **Settings** → **Environment Variables**
4. Add new variable:
   - **Key:** `OPENAI_API_KEY`
   - **Value:** `sk-your-actual-key-here`
   - **Environments:** Check all (Production, Preview, Development)
5. Click **Save**
6. **Redeploy** your site:
   - Go to **Deployments** tab
   - Click "..." menu on latest deployment
   - Click **"Redeploy"**

### Method 2: Vercel CLI

```bash
cd /Users/stockhousefilms/Documents/dariusHenry/portfolio-site

# Install Vercel CLI if needed
npm install -g vercel

# Add environment variable
vercel env add OPENAI_API_KEY

# When prompted:
# - Enter your API key
# - Select: Production, Preview, Development (all)

# Redeploy
vercel --prod
```

---

## 🧪 Step 4: Test the ChatBot

### Test Locally:
```bash
npm run dev
```

Visit `http://localhost:3000` and:
1. Click the purple chat button (bottom-right)
2. Try asking: "What projects have you built?"
3. Should get a response about your 27+ apps

### Test on Vercel:
1. Visit your live site: `https://your-site.vercel.app`
2. Click the chat button
3. Ask a question
4. Should get intelligent responses about your work

---

## 💰 Cost & Usage

### Pricing (GPT-4o-mini model):
- **Input:** $0.15 per 1M tokens (~$0.0002 per message)
- **Output:** $0.60 per 1M tokens (~$0.0006 per message)
- **Average cost per conversation:** ~$0.005 (half a cent)

### Expected Monthly Cost:
- **100 conversations:** ~$0.50
- **500 conversations:** ~$2.50
- **1,000 conversations:** ~$5.00

**Very affordable!** Even with 1,000 visitors chatting, you'd spend ~$5/month.

### Built-in Protections:
- ✅ Rate limiting: Max 10 messages per minute per user
- ✅ Response length capped at 500 tokens (prevents long, expensive responses)
- ✅ Efficient model: GPT-4o-mini (cheap but smart)
- ✅ System prompt prevents off-topic conversations

---

## 🎨 ChatBot Features

### What It Does:
- ✅ Answers questions about your portfolio projects
- ✅ Explains your tech stack (React, Next.js, TypeScript, AI, etc.)
- ✅ Describes your development process
- ✅ Provides pricing information for all service tiers
- ✅ Guides visitors on how to get started
- ✅ Recommends technologies for different project types
- ✅ Shares your availability and booking process

### What It Refuses:
- ❌ Off-topic questions (politics, news, general advice)
- ❌ Coding help unrelated to your services
- ❌ Questions about other developers
- ❌ Anything not in the knowledge base

### Smart Behaviors:
- 🔄 Redirects off-topic questions back to your work
- 💡 Suggests booking a consultation for complex project questions
- 📊 Knows all your project details (Zonely, Speakix, TapeCoach, etc.)
- 🎯 Encourages visitors to contact you

---

## 🔍 Monitoring Usage

### Check OpenAI Usage:
1. Go to [platform.openai.com/usage](https://platform.openai.com/usage)
2. See daily/monthly costs
3. Set up billing alerts:
   - Settings → Billing → Usage limits
   - Set a monthly budget (e.g., $10)
   - Get email alerts at 50%, 75%, 100%

### Vercel Logs (for debugging):
1. Vercel Dashboard → Your Project
2. **Functions** tab
3. Click on `/api/chat` function
4. See real-time logs and errors

---

## 🛠️ Customization

### Change Suggested Questions:
Edit `components/ChatBot.tsx`:
```typescript
const SUGGESTED_QUESTIONS = [
  "Your custom question 1",
  "Your custom question 2",
  // Add more...
];
```

### Update Knowledge Base:
Edit `data/knowledge-base.ts` to add/update information about:
- New projects you build
- Updated pricing
- New skills or tech stack additions
- Changed availability

### Change ChatBot Personality:
Edit `app/api/chat/route.ts` - modify the `SYSTEM_PROMPT` to:
- Make it more casual/formal
- Add specific talking points
- Change how it handles certain questions

### Adjust Rate Limits:
Edit `app/api/chat/route.ts`:
```typescript
if (limit.count >= 10) {  // Change this number
  return false;
}
```

---

## 🐛 Troubleshooting

### "OpenAI API key not configured" error:
- **Cause:** Environment variable not set
- **Fix:**
  - Locally: Check `.env.local` exists and has correct key
  - Vercel: Add environment variable in dashboard and redeploy

### "OpenAI API key is invalid" error:
- **Cause:** Wrong API key or key was deleted
- **Fix:**
  - Generate new key at [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
  - Update `.env.local` and Vercel environment variables

### "OpenAI rate limit exceeded" error:
- **Cause:** Too many requests to OpenAI (rare)
- **Fix:** Wait 1 minute, or upgrade OpenAI account to higher tier

### Chat button appears but no responses:
- **Check browser console** for errors (F12 → Console)
- **Check Vercel function logs** for API errors
- **Verify API key** is correct in environment variables

### Chatbot gives wrong information:
- **Update knowledge base:** Edit `data/knowledge-base.ts`
- **Redeploy** to apply changes

---

## 📱 Mobile Responsive

The chatbot is fully responsive:
- **Desktop:** Bottom-right corner, full size
- **Mobile:** Adapts to screen size, easy to use
- **Animations:** Smooth open/close transitions

---

## 🔒 Security

### Current Security Measures:
- ✅ Rate limiting (10 messages/minute per IP)
- ✅ Response length caps (prevents expensive abuse)
- ✅ API key stored securely in environment variables
- ✅ No sensitive data in knowledge base
- ✅ CORS protection via Next.js

### Additional Security (Optional):
- Add user authentication (only logged-in users can chat)
- Add CAPTCHA to prevent bots
- Add conversation logging for abuse monitoring

---

## 🚀 What's Deployed

**Files Added:**
1. `components/ChatBot.tsx` - Floating chat UI
2. `app/api/chat/route.ts` - API endpoint
3. `data/knowledge-base.ts` - Your info (13,000+ words!)
4. `.env.local.example` - Environment variable template

**Dependencies:**
- `openai` - OpenAI SDK

**Build Status:** ✅ Passing (50.6 kB)

---

## 📊 Knowledge Base Contents

The chatbot knows about:
- ✅ All 27+ projects (Zonely, Speakix, TapeCoach, etc.)
- ✅ Full tech stack (React, Next.js, TypeScript, Node.js, AI/ML, etc.)
- ✅ All 4 service tiers with detailed pricing
- ✅ Complete development process (Discovery → Launch → Support)
- ✅ Project timelines and cost expectations
- ✅ Your unique value proposition
- ✅ Industry experience (Real Estate, EdTech, Entertainment, etc.)
- ✅ Technology recommendations
- ✅ Common questions and answers
- ✅ How to get started and contact you

---

## 🎯 Next Steps

1. ✅ Get OpenAI API key
2. ✅ Add to `.env.local` for local development
3. ✅ Add to Vercel environment variables
4. ✅ Redeploy on Vercel
5. ✅ Test the chatbot on your live site
6. ✅ Set up OpenAI billing alerts
7. ✅ Monitor usage for the first week

---

## 💡 Pro Tips

### Keep Costs Low:
- Current setup already optimized (GPT-4o-mini, response caps)
- Monitor usage weekly for the first month
- Set OpenAI billing limits

### Improve Responses:
- Update knowledge base as you build new projects
- Add FAQs you get from real visitors
- Refine system prompt based on feedback

### Marketing:
- Mention the chatbot in your LinkedIn posts
- "Have questions? Chat with my AI assistant!"
- Makes you look cutting-edge

---

## 📞 Support

If you run into issues:
1. Check this guide first
2. Check OpenAI documentation: [platform.openai.com/docs](https://platform.openai.com/docs)
3. Check Vercel function logs for errors

---

**Your chatbot is ready! Just add the API key and it'll start converting visitors into clients.** 🚀
