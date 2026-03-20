import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { knowledgeBase } from '@/data/knowledge-base';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// System prompt that defines the chatbot's behavior
const SYSTEM_PROMPT = `You are an AI assistant for Darius Henry's portfolio website. Your role is to help visitors learn about Darius's work, expertise, and services as a full-stack developer.

IMPORTANT RULES:
1. ONLY answer questions about Darius Henry, his work, tech stack, projects, services, pricing, and process
2. If asked about anything unrelated to Darius or his work (politics, news, general programming help, other topics), politely redirect: "I'm here to help you learn about Darius Henry's work and services. What would you like to know about his projects, tech stack, or how to work with him?"
3. Be conversational, friendly, and professional
4. Use the knowledge base below to answer questions accurately
5. If you don't know something from the knowledge base, say "I don't have that specific information, but you can reach out to Darius directly via the contact form for more details."
6. Encourage visitors to book a free consultation for project-specific questions
7. Keep responses concise but informative (2-4 sentences for simple questions, more for complex ones)
8. When discussing pricing, always mention it's a starting range and actual cost depends on specific requirements

KNOWLEDGE BASE:
${knowledgeBase}

Remember: You represent Darius professionally. Be helpful, knowledgeable, and guide visitors toward taking action (contacting him, booking a consultation).
`;

// Rate limiting (simple in-memory store - in production use Redis)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimitMap.get(ip);

  if (!limit || now > limit.resetTime) {
    // Reset or create new limit
    rateLimitMap.set(ip, { count: 1, resetTime: now + 60000 }); // 1 minute window
    return true;
  }

  if (limit.count >= 10) {
    // Max 10 messages per minute
    return false;
  }

  limit.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // Get IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a moment before sending another message.' },
        { status: 429 }
      );
    }

    // Parse request body with size limit
    const body = await request.json();
    const { messages } = body;

    // Validate messages format
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid request format' },
        { status: 400 }
      );
    }

    // Limit conversation history to prevent abuse (max 20 messages)
    if (messages.length > 20) {
      return NextResponse.json(
        { error: 'Conversation too long. Please start a new chat.' },
        { status: 400 }
      );
    }

    // Validate each message
    for (const msg of messages) {
      if (!msg.role || !msg.content || typeof msg.content !== 'string') {
        return NextResponse.json(
          { error: 'Invalid message format' },
          { status: 400 }
        );
      }

      // Limit individual message length (5000 chars)
      if (msg.content.length > 5000) {
        return NextResponse.json(
          { error: 'Message too long. Please keep messages under 5000 characters.' },
          { status: 400 }
        );
      }

      // Only allow user and assistant roles
      if (!['user', 'assistant'].includes(msg.role)) {
        return NextResponse.json(
          { error: 'Invalid message role' },
          { status: 400 }
        );
      }
    }

    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'Service temporarily unavailable. Please try again later.' },
        { status: 503 }
      );
    }

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // Fast and cost-effective
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages,
      ],
      temperature: 0.7,
      max_tokens: 500, // Limit response length
    });

    const response = completion.choices[0]?.message?.content || 'I apologize, but I encountered an error. Please try again.';

    return NextResponse.json({ message: response });

  } catch (error: any) {
    // Log error for debugging (only visible in server logs, not exposed to client)
    console.error('[ChatBot Error]:', {
      message: error?.message,
      status: error?.status,
      timestamp: new Date().toISOString(),
    });

    // Handle OpenAI-specific errors without exposing system details
    if (error?.status === 401) {
      return NextResponse.json(
        { error: 'Service configuration error. Please contact support.' },
        { status: 503 }
      );
    }

    if (error?.status === 429) {
      return NextResponse.json(
        { error: 'Service busy. Please try again in a moment.' },
        { status: 429 }
      );
    }

    // Generic error response (don't leak system info)
    return NextResponse.json(
      { error: 'Unable to process your message. Please try again later.' },
      { status: 500 }
    );
  }
}

// Handle OPTIONS for CORS
export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}
