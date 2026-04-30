'use client';

import { PersonaId } from '@/lib/types';
import { PERSONAS, PERSONA_ORDER } from '@/lib/personas';

interface PersonaSwitcherProps {
  activePersonaId: PersonaId;
  onSwitch: (id: PersonaId) => void;
}

export default function PersonaSwitcher({ activePersonaId, onSwitch }: PersonaSwitcherProps) {
  return (
    <div className="persona-pills" role="tablist" aria-label="Persona selector">
      {PERSONA_ORDER.map((id) => {
        const persona = PERSONAS[id];
        const isActive = id === activePersonaId;
        return (
          <button
            key={id}
            id={`persona-pill-${id}`}
            onClick={() => onSwitch(persona.id)}
            className={`persona-pill ${isActive ? 'persona-pill--active' : ''}`}
            aria-selected={isActive}
            role="tab"
          >
            {persona.name.split(' ')[0]}
            {isActive && <span className="persona-pill__underline" />}
          </button>
        );
      })}
    </div>
  );
}
