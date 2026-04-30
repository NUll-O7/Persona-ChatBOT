'use client';

import Image from 'next/image';
import { Persona, PersonaId } from '@/lib/types';
import { PERSONAS, PERSONA_ORDER } from '@/lib/personas';

interface PersonaSwitcherProps {
  activePersonaId: PersonaId;
  onSwitch: (id: PersonaId) => void;
}

export default function PersonaSwitcher({ activePersonaId, onSwitch }: PersonaSwitcherProps) {
  return (
    <div className="persona-switcher">
      {PERSONA_ORDER.map((id) => {
        const persona: Persona = PERSONAS[id];
        const isActive = id === activePersonaId;
        return (
          <button
            key={id}
            id={`persona-tab-${id}`}
            onClick={() => onSwitch(persona.id)}
            className={`persona-tab ${isActive ? 'persona-tab--active' : 'persona-tab--inactive'}`}
            style={isActive ? { '--accent': persona.accentColor } as React.CSSProperties : {}}
            aria-selected={isActive}
            role="tab"
          >
            <div
              className="persona-tab__avatar"
              style={{ background: isActive ? persona.accentColor : '#374151' }}
            >
              <Image
                src={persona.avatarImage}
                alt={persona.name}
                width={36}
                height={36}
                className="persona-tab__avatar-img"
                onError={(e) => {
                  // Fallback to initials if image fails
                  e.currentTarget.style.display = 'none';
                }}
              />
              <span className="persona-tab__initials">{persona.avatarInitials}</span>
            </div>
            <div className="persona-tab__info">
              <span className="persona-tab__name">{persona.name}</span>
              <span className="persona-tab__title">{persona.title}</span>
            </div>
            {isActive && (
              <div
                className="persona-tab__indicator"
                style={{ background: persona.accentColor }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
