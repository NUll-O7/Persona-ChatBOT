# ⚡ persona-chat:~$

A premium, retro terminal-styled AI chatbot built for Scaler Academy. Experience authentic, highly-technical conversations with AI personas of Scaler's founders and head of instructors.

> **Live Demo:** [https://persona-chat-bot-dusky.vercel.app/](https://persona-chat-bot-dusky.vercel.app/)

## The Personas

- **Anshuman Singh** (`anshuman`) — Co-Founder, ex-Facebook engineer. First principles, deep skills, and long-term career building.
- **Abhimanyu Saxena** (`abhimanyu`) — Co-Founder, serial entrepreneur. Consistency, mission, and people-first culture.
- **Kshitij Mishra** (`kshitij`) — Head of Instructors. Real understanding over rote memorization, zero tolerance for slacking.

## 🧠 Prompt Engineering & Chain-of-Thought (CoT)

The core "brain" of the chatbot relies on meticulously crafted system prompts found in `lib/personas.ts`. We employed **Chain-of-Thought (CoT)** reasoning with a hidden output format to ensure high-quality, persona-aligned responses.

### Implementation Details:
1. **Hidden Reasoning Steps**: Each persona's system prompt instructs the LLM to silently reason before answering. For example, before Kshitij responds, the model internally executes:
   - *Step 1: Infer the user’s current level and emotional state.*
   - *Step 2: Identify whether they need conceptual clarity, a firm reality check, or just reassurance.*
   - *Step 3: Build a short explanation plus 1–2 concrete actions.*
2. **Invisible Execution**: By using constraints like `Do NOT reveal your internal reasoning steps; keep them hidden`, the model generates the optimal logical pathway without cluttering the UI with internal AI monologues.
3. **Behavioral Guidelines**: Strict guardrails ensure the personas stay in character. Abhimanyu is instructed to "never sugarcoat" and "call out laziness," while Anshuman focuses on "first-principles thinking" and uses statistical analogies.
4. **Few-Shot Examples**: Each prompt includes highly specific "Example Interactions" simulating real Scaler student scenarios (e.g., struggling with Dynamic Programming, dealing with interview rejection, or asking to spoon-feed code).

## 🎨 Design Ideology: The Retro Terminal Aesthetic

The UI was completely overhauled from a standard chat interface to a premium, "hacker lab" command-line environment. 

### Why a Terminal?
Scaler is fundamentally about deep, hard-core computer science. A generic, bubbly chat UI doesn't fit the brand of elite engineering. The retro terminal aesthetic evokes the feeling of a focused, late-night coding session—the exact environment where real engineering happens.

### Key Visual Choices:
- **Typography**: Exclusive use of `JetBrains Mono`, the quintessential developer font.
- **Color Palette**: Deep near-blacks (`#050608`) contrasted with stark terminal greens (`#8CFF8A`) and warning ambers (`#FFDA7B`), mimicking classic monochrome monitors.
- **Micro-interactions**: 
  - The typing indicator isn't a modern bubble, but a text-based `<PERSONA> is thinking` prompt.
  - User messages are prefixed with `> YOU` and bot responses with `> <PERSONA>`.
  - Switching personas triggers a `--- context cleared ---` animation, simulating a terminal `clear` command.

## 🛠️ Detailed Tech Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| **Core Framework** | **Next.js 16 (App Router)** | Provides seamless server-side API routes to securely handle API keys while delivering a fast React frontend. |
| **Language** | **TypeScript** | Ensures type safety for all Message interfaces, Persona IDs, and API payloads, preventing runtime errors. |
| **Styling** | **Custom Vanilla CSS** | Bypassed standard utility classes for the core design system to exert maximum control over CSS variables, CRT glow effects, and hardware-accelerated keyframe animations. |
| **AI Engine** | **Google Gemini** | Selected for its extremely low latency and high reasoning capability, making the chat feel instantaneous. |
| **Deployment** | **Vercel** | Native integration with Next.js, providing edge-level performance and secure environment variable injection. |

## Structure

```text
Assigment 1/
├── persona-chatbot/   # ← Full Next.js app (deploy this)
│   ├── README.md      # Full setup & deployment guide
│   ├── prompts.md     # System prompts with design notes
│   └── reflection.md  # Assignment reflection
└── temp/              # Working files (persona drafts, commit logs)
```

## Quick Start

The app lives in the `persona-chatbot/` subdirectory:

```bash
cd persona-chatbot
cp .env.example .env.local   # Add your GEMINI_API_KEY
npm install
npm run dev
```

See [`persona-chatbot/README.md`](./persona-chatbot/README.md) for full deployment instructions and technical details.
