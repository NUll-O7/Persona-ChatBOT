'use client';

import { Persona } from '@/lib/types';

interface SuggestionChipsProps {
  persona: Persona;
  onSelect: (text: string) => void;
}

export default function SuggestionChips({ persona, onSelect }: SuggestionChipsProps) {
  const firstName = persona.name.split(' ')[0].toUpperCase();

  return (
    <div className="empty-state">
      <p className="empty-state__line">
        <span className="empty-state__hash">#</span>
        new session with{' '}
        <span className="empty-state__persona-name">{firstName}</span>
      </p>

      <div className="suggestion-chips">
        {persona.suggestionChips.map((chip, i) => (
          <button
            key={i}
            id={`suggestion-chip-${persona.id}-${i}`}
            className="suggestion-chip"
            onClick={() => onSelect(chip)}
          >
            {chip}
          </button>
        ))}
      </div>
    </div>
  );
}
