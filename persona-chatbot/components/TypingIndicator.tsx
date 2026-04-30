'use client';

import { Persona } from '@/lib/types';

interface TypingIndicatorProps {
  persona: Persona;
}

export default function TypingIndicator({ persona }: TypingIndicatorProps) {
  const firstName = persona.name.split(' ')[0].toUpperCase();

  return (
    <div className="typing-indicator" aria-live="polite" aria-label={`${persona.name} is typing`}>
      <span className="typing-indicator__label">{firstName} is thinking</span>
      <span className="typing-indicator__dots">
        <span className="typing-dot" />
        <span className="typing-dot" />
        <span className="typing-dot" />
      </span>
    </div>
  );
}
