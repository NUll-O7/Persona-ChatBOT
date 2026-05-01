'use client';

import { motion } from 'framer-motion';
import { Message, Persona } from '@/lib/types';

interface MessageBubbleProps {
  message: Message;
  persona: Persona;
  index: number;
}

const PERSONA_ACCENT: Record<string, string> = {
  anshuman: '#c87820',
  abhimanyu: '#1e3c64',
  kshitij: '#146050',
};

const PERSONA_GLOW: Record<string, string> = {
  anshuman: '0 0 14px rgba(180,100,20,0.65), 0 0 3px rgba(220,140,30,0.8)',
  abhimanyu: '0 0 10px rgba(30,60,100,0.6), 0 0 2px rgba(30,60,100,0.9)',
  kshitij: '0 0 10px rgba(20,90,80,0.6), 0 0 2px rgba(20,90,80,0.9)',
};

function renderContent(text: string) {
  if (!text) return null;
  return text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} style={{ color: 'var(--amber-bright)', fontWeight: 700 }}>
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
    return part.split('\n').flatMap((line, j, arr) => [
      line,
      j < arr.length - 1 ? <br key={`br-${i}-${j}`} /> : null,
    ]);
  });
}

export default function MessageBubble({ message, persona, index }: MessageBubbleProps) {
  const isUser = message.role === 'user';
  const firstName = persona.name.split(' ')[0].toUpperCase();
  const accentColor = PERSONA_ACCENT[persona.id] || 'var(--amber-dim)';
  const glowStyle = PERSONA_GLOW[persona.id] || '';

  if (isUser) {
    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6, filter: 'blur(2px)' }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginBottom: 16,
          padding: '0 4px',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4, maxWidth: '70%' }}>
          {/* Label row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <span style={{ color: 'var(--text-secondary)', fontSize: 10, opacity: 0.6 }}>
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
            <span
              style={{
                color: 'var(--text-secondary)',
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: '0.18em',
              }}
            >
              YOU
            </span>
            <span style={{ color: 'var(--amber-primary)', fontSize: 12, fontWeight: 700 }}>{'>'}</span>
          </div>

          {/* Bubble */}
          <div
            style={{
              background: 'var(--bg-bubble-user)',
              border: '1px solid rgba(122,92,42,0.18)',
              borderRight: '3px solid rgba(122,92,42,0.45)',
              borderRadius: '6px 0 6px 6px',
              padding: '10px 16px',
              fontSize: 13,
              lineHeight: 1.8,
              color: 'var(--text-primary)',
            }}
          >
            {renderContent(message.content)}
          </div>
        </div>
      </motion.div>
    );
  }

  // Bot message
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6, filter: 'blur(2px)' }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      style={{
        display: 'flex',
        gap: 12,
        alignItems: 'flex-start',
        marginBottom: 24,
        padding: '0 4px',
      }}
    >
      {/* Avatar */}
      <img
        src={persona.avatarImage}
        width={48}
        height={48}
        alt=""
        className="persona-avatar"
        style={{
          flexShrink: 0,
          marginTop: 20,
          boxShadow: glowStyle,
        }}
      />

      {/* Content column */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1, minWidth: 0 }}>
        {/* Label row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <span style={{ color: 'var(--amber-primary)', fontSize: 12, fontWeight: 700 }}>{'>'}</span>
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
          <span style={{ color: 'var(--text-secondary)', fontSize: 10, opacity: 0.6 }}>
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
          <span
            className="msg-counter"
            style={{
              color: 'var(--text-dim)',
              fontSize: 10,
              letterSpacing: '0.12em',
            }}
          >
            [MSG:{String(index + 1).padStart(3, '0')}]
          </span>
        </div>

        {/* Bubble */}
        <motion.div
          className="rf-corners"
          whileHover={{
            boxShadow: '0 0 0 1px rgba(122,92,42,0.4), 0 4px 24px rgba(255,179,71,0.05)',
            borderLeftColor: 'rgba(255,179,71,0.5)',
          }}
          transition={{ duration: 0.2 }}
          style={{
            background: 'var(--bg-bubble-bot)',
            border: '1px solid rgba(122,92,42,0.3)',
            borderLeft: `3px solid ${accentColor}`,
            borderRadius: '0 6px 6px 6px',
            padding: '14px 18px 12px 18px',
            fontSize: 13.5,
            lineHeight: 1.9,
            letterSpacing: '0.025em',
            color: 'var(--text-primary)',
            position: 'relative',
          }}
        >
          {renderContent(message.content)}
        </motion.div>
      </div>
    </motion.div>
  );
}
