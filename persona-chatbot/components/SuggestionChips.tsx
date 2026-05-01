'use client';

import { motion } from 'framer-motion';
import { Persona } from '@/lib/types';

interface SuggestionChipsProps {
  persona: Persona;
  onSelect: (text: string) => void;
}

const PERSONA_GLOW_COLOR: Record<string, string> = {
  anshuman: 'rgba(200, 120, 32, 0.22)',
  abhimanyu: 'rgba(30, 60, 100, 0.22)',
  kshitij: 'rgba(20, 90, 80, 0.22)',
};

const PERSONA_GLOW_STYLE: Record<string, string> = {
  anshuman: '0 0 14px rgba(180,100,20,0.65), 0 0 3px rgba(220,140,30,0.8)',
  abhimanyu: '0 0 10px rgba(30,60,100,0.6), 0 0 2px rgba(30,60,100,0.9)',
  kshitij: '0 0 10px rgba(20,90,80,0.6), 0 0 2px rgba(20,90,80,0.9)',
};

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.35 } },
};

const chipVariants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.18 } },
};

export default function SuggestionChips({ persona, onSelect }: SuggestionChipsProps) {
  const firstName = persona.name.split(' ')[0].toUpperCase();
  const glowColor = PERSONA_GLOW_COLOR[persona.id] || 'rgba(200, 120, 32, 0.22)';
  const glowStyle = PERSONA_GLOW_STYLE[persona.id] || '';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
        height: '100%',
        padding: '48px 24px',
      }}
    >
      {/* Avatar with ambient radial glow */}
      <div style={{ position: 'relative', display: 'inline-flex' }}>
        <div
          style={{
            position: 'absolute',
            width: 120,
            height: 120,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
            borderRadius: '50%',
            zIndex: 0,
            pointerEvents: 'none',
          }}
        />
        <motion.img
          src={persona.avatarImage}
          width={64}
          height={64}
          alt={persona.name}
          className="persona-avatar"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          style={{
            position: 'relative',
            zIndex: 1,
            boxShadow: glowStyle,
            border: '1px solid rgba(122,92,42,0.4)',
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.2 }}
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 20,
          color: 'var(--text-secondary)',
          letterSpacing: '0.1em',
          textAlign: 'center',
        }}
      >
        # new session with {firstName}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.45 }}
        transition={{ delay: 0.2, duration: 0.2 }}
        style={{
          fontSize: 11,
          color: 'var(--text-secondary)',
          letterSpacing: '0.08em',
        }}
      >
        → ready when you are
      </motion.div>

      {/* Retro-futurism HUD scanning line */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          width: 160,
          height: 1,
          background: 'linear-gradient(90deg, transparent, var(--amber-dim), transparent)',
          transformOrigin: 'center',
        }}
      />

      {/* Suggestion chips */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', maxWidth: 600 }}
      >
        {persona.suggestionChips.map((chip, i) => (
          <motion.button
            key={i}
            id={`suggestion-chip-${persona.id}-${i}`}
            variants={chipVariants}
            onClick={() => onSelect(chip)}
            whileHover={{
              backgroundColor: 'rgba(255,179,71,0.08)',
              borderColor: 'rgba(122,92,42,0.7)',
              color: 'var(--text-primary)',
              boxShadow: '0 0 10px rgba(255,179,71,0.08)',
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.12 }}
            style={{
              fontFamily: 'var(--font-terminal)',
              fontSize: 11,
              letterSpacing: '0.06em',
              color: 'var(--amber-dim)',
              background: 'transparent',
              border: '1px solid rgba(122,92,42,0.35)',
              borderRadius: 2,
              padding: '6px 12px',
              cursor: 'pointer',
              lineHeight: 1.4,
            }}
          >
            <span style={{ color: 'var(--amber-primary)', opacity: 0.55 }}>{'[ '}</span>
            {chip}
            <span style={{ color: 'var(--amber-primary)', opacity: 0.55 }}>{' ]'}</span>
          </motion.button>
        ))}
      </motion.div>
    </motion.div>
  );
}
