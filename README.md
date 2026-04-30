# ScalerChat – Persona ChatBot Assignment

A persona-based AI chatbot for Scaler Academy that lets users chat with AI versions of:
- **Anshuman Singh** — Co-Founder, ex-Facebook engineer
- **Abhimanyu Saxena** — Co-Founder, serial entrepreneur
- **Kshitij Mishra** — Head of Instructors

## Quick Start

The app lives in the `persona-chatbot/` subdirectory:

```bash
cd persona-chatbot
cp .env.example .env.local   # add your GEMINI_API_KEY
npm install
npm run dev
```

## Structure

```
Assigment 1/
├── persona-chatbot/   # ← Full Next.js app (deploy this)
│   ├── README.md      # Full setup & deployment guide
│   ├── prompts.md     # System prompts with design notes
│   └── reflection.md  # Assignment reflection
└── temp/              # Working files (persona drafts, commit logs)
```

## Deployment

See [`persona-chatbot/README.md`](./persona-chatbot/README.md) for full Vercel deployment instructions.

> **Live URL:** _Add after deployment_
