# ScalerChat – Persona-Based AI Chatbot

A full-stack AI chatbot for authentic conversations with AI personas of **Anshuman Singh**, **Abhimanyu Saxena**, and **Kshitij Mishra** — co-founders and instructors at Scaler Academy.

---

## 🚀 Live Demo

> **Deployed URL:** _Add after Vercel deployment_

---

## ✨ Features

- 💬 **3 Distinct AI Personas** with unique system prompts and communication styles
- 🔄 **Persona Switcher** — switching resets the conversation for that persona
- 💡 **Suggestion Chips** — quick-start questions shown on empty state
- ⏳ **Typing Indicator** — animated dots while AI responds
- ⚠️ **Error Handling** — friendly messages with retry capability
- 📱 **Fully Responsive** — works on mobile (375px) and desktop
- 🔒 **Secure** — API key stored server-side only, never exposed to the browser

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + Custom CSS |
| LLM | Google Gemini 2.0 Flash |
| Deployment | Vercel |

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
# Edit .env.local and add your GEMINI_API_KEY
```

Get a free key at [Google AI Studio](https://aistudio.google.com/app/apikey).

### 4. Run dev server

```bash
npm run dev
# Open http://localhost:3000
```

---

## 🌐 Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) → **New Project** → Import `Persona-ChatBOT`
2. Set **Root Directory** to `persona-chatbot`
3. Add env variable: `GEMINI_API_KEY`
4. Click **Deploy**

---

## 📁 Project Structure

```
persona-chatbot/
├── app/
│   ├── api/chat/route.ts     # Serverless API (Gemini call)
│   ├── globals.css           # Design system
│   ├── layout.tsx            # Root layout + SEO
│   └── page.tsx              # Main chat page
├── components/               # All UI components
├── lib/
│   ├── personas.ts           # Persona data + system prompts
│   └── types.ts              # TypeScript types
├── public/avatars/           # Persona avatar images
├── .env.example
├── prompts.md                # System prompts + design notes
└── reflection.md             # Assignment reflection
```

---

## 🔐 Security

`GEMINI_API_KEY` is server-side only — never sent to the browser. The `/api/chat` route validates all inputs before calling the LLM.

---

## 📄 Docs

- [`prompts.md`](./prompts.md) — System prompts with inline explanations
- [`reflection.md`](./reflection.md) — GIGO reflection and improvements
