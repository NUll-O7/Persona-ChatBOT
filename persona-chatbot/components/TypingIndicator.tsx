'use client';

import { Persona } from '@/lib/types';

interface TypingIndicatorProps {
  persona: Persona;
}

export default function TypingIndicator({ persona }: TypingIndicatorProps) {
  return (
    <div className="message-row message-row--assistant">
      <div
        className="message-avatar"
        style={{ background: persona.accentColor }}
        aria-label={`${persona.name} is typing`}
      >
        <span>{persona.avatarInitials}</span>
      </div>
      <div className="typing-indicator" aria-live="polite" aria-label={`${persona.name} is typing`}>
        <span className="typing-dot" style={{ background: persona.accentColor }} />
        <span className="typing-dot" style={{ background: persona.accentColor }} />
        <span className="typing-dot" style={{ background: persona.accentColor }} />
      </div>
    </div>
  );
}
