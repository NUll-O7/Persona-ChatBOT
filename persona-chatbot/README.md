# ⚡ persona-chat:~$

A full-stack, retro terminal-styled AI chatbot for authentic conversations with AI personas of **Anshuman Singh**, **Abhimanyu Saxena**, and **Kshitij Mishra** — co-founders and instructors at Scaler Academy.

Designed with a premium, hacker-lab aesthetic: deep blacks, terminal green/amber accents, monospace typography, and smooth micro-animations.

---

## 🚀 Live Demo

> **Deployed URL:** [https://persona-chat-bot-dusky.vercel.app/](https://persona-chat-bot-dusky.vercel.app/)

---

## ✨ Features & Design Ideology

### Why a Retro Terminal?
Scaler is fundamentally about deep, hard-core computer science. A generic, bubbly chat UI doesn't fit the brand of elite engineering. The retro terminal aesthetic evokes the feeling of a focused, late-night coding session—the exact environment where real engineering happens.

- 🎨 **Terminal Aesthetic** — Custom CSS design system featuring `JetBrains Mono`, subtle CRT glows, and command-line styling.
- 🔄 **Context Clearing** — Switching personas triggers a `--- context cleared ---` animation, simulating a terminal `clear` command.
- 💡 **Suggestion Chips** — Inline `[ quick commands ]` shown on the empty state.
- ⏳ **Typing Indicator** — Text-based `PERSONA is thinking...` with animated bouncing dots instead of standard chat bubbles.
- ⚠️ **Error Handling** — Inline, non-intrusive terminal error messages with retry capability.
- 📱 **Fully Responsive** — Flawless execution from 320px mobile screens to large desktop monitors.

---

## 🧠 Prompt Engineering: Chain-of-Thought (CoT)

The core "brain" of the chatbot relies on meticulously crafted system prompts located in `lib/personas.ts`. We employed **Chain-of-Thought (CoT)** reasoning with a hidden output format to ensure high-quality, persona-aligned responses.

### Implementation Details:
1. **Hidden Reasoning Steps**: Each persona's system prompt instructs the LLM to silently reason before answering. For example, before Kshitij responds, the model internally executes:
   - *Step 1: Infer the user’s current level and emotional state.*
   - *Step 2: Identify whether they need conceptual clarity, a firm reality check, or just reassurance.*
   - *Step 3: Build a short explanation plus 1–2 concrete actions.*
2. **Invisible Execution**: By using constraints like `Do NOT reveal your internal reasoning steps; keep them hidden`, the model generates the optimal logical pathway without cluttering the UI with internal AI monologues.
3. **Behavioral Guidelines**: Strict guardrails ensure the personas stay in character. Abhimanyu is instructed to "never sugarcoat" and "call out laziness," while Anshuman focuses on "first-principles thinking" and uses statistical analogies.
4. **Few-Shot Examples**: Each prompt includes highly specific "Example Interactions" simulating real Scaler student scenarios (e.g., struggling with Dynamic Programming, dealing with interview rejection, or asking to spoon-feed code).

---

## 🛠️ Detailed Tech Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| **Framework** | **Next.js 16 (App Router)** | Provides seamless server-side API routes to securely handle API keys while delivering a fast React frontend. |
| **Language** | **TypeScript** | Ensures type safety for all Message interfaces, Persona IDs, and API payloads, preventing runtime errors. |
| **Styling** | **Custom Vanilla CSS** | Bypassed standard utility classes for the core design system to exert maximum control over CSS variables, CRT glow effects, and hardware-accelerated keyframe animations. |
| **LLM** | **Google Gemini** | Selected for its extremely low latency and high reasoning capability, making the chat feel instantaneous. |
| **Deployment**| **Vercel** | Native integration with Next.js, providing edge-level performance and secure environment variable injection. |

---

## ⚙️ Local Setup

### 1. Clone & navigate

```bash
git clone https://github.com/NUll-O7/Persona-ChatBOT.git
cd Persona-ChatBOT/persona-chatbot
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

```bash
cp .env.example .env.local
```
Edit `.env.local` and add your `GEMINI_API_KEY`. Get a free key at [Google AI Studio](https://aistudio.google.com/app/apikey).

### 4. Run dev server

```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

---

## 🌐 Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) → **New Project** → Import `Persona-ChatBOT`
2. Set **Root Directory** to `persona-chatbot`
3. Add env variable: `GEMINI_API_KEY`
4. Click **Deploy**

---

## 📁 Project Structure

```text
persona-chatbot/
├── app/
│   ├── api/chat/route.ts     # Serverless API (Gemini call)
│   ├── globals.css           # Terminal Design System
│   ├── layout.tsx            # Root layout + SEO
│   └── page.tsx              # Main chat interface
├── components/               # UI components (InputBar, MessageBubble, etc.)
├── lib/
│   ├── personas.ts           # Persona data + system prompts
│   └── types.ts              # TypeScript types
├── .env.example
├── prompts.md                # System prompts + design notes
└── reflection.md             # Assignment reflection
```

---

## 🔐 Security

`GEMINI_API_KEY` is server-side only — never sent to the browser. The `/api/chat` route validates all inputs before securely calling the LLM.
