'use client';

import { Persona } from '@/lib/types';

interface SuggestionChipsProps {
  persona: Persona;
  onSelect: (text: string) => void;
}

export default function SuggestionChips({ persona, onSelect }: SuggestionChipsProps) {
  return (
    <div className="suggestion-chips-wrapper">
      <div className="suggestion-chips-hero">
        <div
          className="suggestion-avatar-large"
          style={{ background: persona.accentColor }}
        >
          <span>{persona.avatarInitials}</span>
        </div>
        <h2 className="suggestion-name">{persona.name}</h2>
        <p className="suggestion-bio">{persona.shortBio}</p>
      </div>

      <p className="suggestion-label">Try asking:</p>
      <div className="suggestion-chips">
        {persona.suggestionChips.map((chip, i) => (
          <button
            key={i}
            id={`suggestion-chip-${persona.id}-${i}`}
            className="suggestion-chip"
            style={{ '--chip-color': persona.accentColor } as React.CSSProperties}
            onClick={() => onSelect(chip)}
          >
            {chip}
          </button>
        ))}
      </div>
    </div>
  );
}
