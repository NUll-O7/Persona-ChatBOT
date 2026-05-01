'use client';

import { motion } from 'framer-motion';
import { PersonaId } from '@/lib/types';
import { PERSONAS, PERSONA_ORDER } from '@/lib/personas';

interface PersonaSwitcherProps {
  activePersonaId: PersonaId;
  onSwitch: (id: PersonaId) => void;
}

export default function PersonaSwitcher({ activePersonaId, onSwitch }: PersonaSwitcherProps) {
  return (
    <div
      className="persona-pills-container"
      style={{ position: 'relative', display: 'flex', gap: 4 }}
      role="tablist"
      aria-label="Persona selector"
    >
      {PERSONA_ORDER.map((id) => {
        const persona = PERSONAS[id];
        const isActive = id === activePersonaId;
        const firstName = persona.name.split(' ')[0];

        return (
          <motion.button
            key={id}
            id={`persona-pill-${id}`}
            onClick={() => onSwitch(persona.id)}
            aria-selected={isActive}
            role="tab"
            style={{
              position: 'relative',
              zIndex: 1,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '4px 12px 4px 8px',
              background: 'transparent',
              border: `1px solid ${isActive ? 'transparent' : 'rgba(122,92,42,0.45)'}`,
              borderRadius: 3,
              fontFamily: 'var(--font-terminal)',
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.12em',
              color: isActive ? '#0a0700' : 'var(--text-secondary)',
              cursor: 'pointer',
              transition: 'color 0.15s, border-color 0.15s',
              minWidth: 0,
            }}
            whileHover={
              !isActive
                ? {
                    borderColor: 'var(--amber-primary)',
                    color: 'var(--text-primary)',
                  }
                : {}
            }
            transition={{ duration: 0.12 }}
          >
            <img
              src={persona.avatarImage}
              width={16}
              height={16}
              alt=""
              style={{ imageRendering: 'pixelated', borderRadius: 2, border: 'none' }}
            />

            {firstName}

            {/* Sliding amber highlight — layoutId magic */}
            {isActive && (
              <motion.div
                layoutId="activePill"
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'var(--amber-primary)',
                  borderRadius: 3,
                  zIndex: -1,
                  boxShadow: '0 0 14px rgba(255,179,71,0.35), 0 0 4px rgba(255,179,71,0.5)',
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 32 }}
              />
            )}

            {/* Pulsing underline on active pill */}
            {isActive && (
              <motion.div
                layoutId="activePillLine"
                animate={{ opacity: [1, 0.25, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  bottom: -1,
                  left: 0,
                  right: 0,
                  height: 2,
                  background: 'var(--amber-primary)',
                  borderRadius: 1,
                }}
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
