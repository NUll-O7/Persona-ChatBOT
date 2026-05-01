'use client';

import { motion } from 'framer-motion';
import { Persona } from '@/lib/types';

interface TypingIndicatorProps {
  persona: Persona;
}

const PERSONA_GLOW: Record<string, string> = {
  anshuman: '0 0 14px rgba(180,100,20,0.65), 0 0 3px rgba(220,140,30,0.8)',
  abhimanyu: '0 0 10px rgba(30,60,100,0.6), 0 0 2px rgba(30,60,100,0.9)',
  kshitij: '0 0 10px rgba(20,90,80,0.6), 0 0 2px rgba(20,90,80,0.9)',
};

export default function TypingIndicator({ persona }: TypingIndicatorProps) {
  const firstName = persona.name.split(' ')[0].toUpperCase();
  const glowStyle = PERSONA_GLOW[persona.id] || '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      style={{
        display: 'flex',
        gap: 12,
        alignItems: 'flex-start',
        marginBottom: 16,
        padding: '0 4px',
      }}
      aria-live="polite"
      aria-label={`${persona.name} is typing`}
    >
      <img
        src={persona.avatarImage}
        width={40}
        height={40}
        alt=""
        className="persona-avatar"
        style={{
          flexShrink: 0,
          marginTop: 16,
          boxShadow: glowStyle,
        }}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ color: 'var(--amber-primary)', fontSize: 12, fontWeight: 700 }}>
            {'>'}
          </span>
          <span
            style={{
              color: 'var(--text-secondary)',
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '0.18em',
            }}
          >
            {firstName}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {/* Blinking block cursor */}
          <motion.span
            animate={{ opacity: [1, 1, 0, 0] }}
            transition={{ duration: 0.85, repeat: Infinity, times: [0, 0.4, 0.4, 1] }}
            style={{
              display: 'inline-block',
              width: 9,
              height: 16,
              background: 'var(--amber-primary)',
              borderRadius: 1,
              boxShadow: '0 0 8px rgba(255,179,71,0.6), 0 0 3px rgba(255,179,71,0.4)',
            }}
          />
          <span
            style={{
              color: 'var(--text-dim)',
              fontSize: 11,
              letterSpacing: '0.06em',
              fontStyle: 'italic',
            }}
          >
            processing...
          </span>
        </div>
      </div>
    </motion.div>
  );
}
