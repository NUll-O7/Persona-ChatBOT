import type { Metadata } from 'next';
import { Courier_Prime, VT323 } from 'next/font/google';
import './globals.css';

const courierPrime = Courier_Prime({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-terminal',
  display: 'swap',
});

const vt323 = VT323({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-display',
  display: 'swap',
});

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
    <html lang="en" className={`${courierPrime.variable} ${vt323.variable}`}>
      <body>{children}</body>
    </html>
  );
}
