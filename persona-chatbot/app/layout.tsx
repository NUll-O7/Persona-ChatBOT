import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'persona-chat — AI Persona Terminal',
  description:
    'A retro terminal-styled AI chatbot with three distinct personas: Anshuman, Abhimanyu, and Kshitij from Scaler Academy.',
  keywords: ['Scaler', 'AI chatbot', 'Anshuman Singh', 'Abhimanyu Saxena', 'Kshitij Mishra', 'terminal', 'retro'],
  openGraph: {
    title: 'persona-chat — AI Persona Terminal',
    description: 'Chat with Scaler founders and instructors in a retro terminal interface.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
