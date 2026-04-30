import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';
import { PERSONAS } from '@/lib/personas';
import { ChatApiRequest } from '@/lib/types';

// Initialize Gemini client — key loaded from env, never hard-coded
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const body: ChatApiRequest = await req.json();
    const { personaId, messages } = body;

    // --- Validate input ---
    if (!personaId || !messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid request: personaId and messages are required.' },
        { status: 400 }
      );
    }

    const persona = PERSONAS[personaId];
    if (!persona) {
      return NextResponse.json(
        { error: `Unknown persona: ${personaId}` },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'Server configuration error: API key not set.' },
        { status: 500 }
      );
    }

    // --- Build Gemini history (all messages except the last user message) ---
    const history = messages.slice(0, -1).map((msg) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    }));

    const lastMessage = messages[messages.length - 1];
    if (!lastMessage || lastMessage.role !== 'user') {
      return NextResponse.json(
        { error: 'Last message must be from the user.' },
        { status: 400 }
      );
    }

    // --- Call Gemini with persona system prompt ---
    const model = genAI.getGenerativeModel({
      model: 'gemini-3.0-flash',
      systemInstruction: persona.systemPrompt,
    });

    const chat = model.startChat({ history });
    const result = await chat.sendMessage(lastMessage.content);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ content: text });
  } catch (error: unknown) {
    console.error('[/api/chat] Error:', error);

    // Handle Gemini-specific API errors
    if (error instanceof Error) {
      const msg = error.message.toLowerCase();
      if (msg.includes('api key') || msg.includes('unauthorized') || msg.includes('permission')) {
        return NextResponse.json(
          { error: 'API authentication failed. Please check your GEMINI_API_KEY.' },
          { status: 401 }
        );
      }
      if (msg.includes('quota') || msg.includes('rate limit') || msg.includes('resource exhausted')) {
        return NextResponse.json(
          { error: 'API quota exceeded. Please try again in a moment.' },
          { status: 429 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
