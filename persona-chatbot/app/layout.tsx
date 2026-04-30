import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' });

export const metadata: Metadata = {
  title: 'ScalerChat – Chat with Scaler Founders & Instructors',
  description:
    'An AI-powered chatbot that lets you have authentic conversations with personas of Anshuman Singh, Abhimanyu Saxena, and Kshitij Mishra from Scaler Academy.',
  keywords: ['Scaler', 'AI chatbot', 'Anshuman Singh', 'Abhimanyu Saxena', 'Kshitij Mishra', 'engineering careers'],
  openGraph: {
    title: 'ScalerChat – AI Persona Chatbot',
    description: 'Chat with Scaler founders and instructors powered by Gemini AI.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={geist.variable}>
      <body>{children}</body>
    </html>
  );
}
