'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface PersonaSwitchOverlayProps {
  personaName: string;
  onComplete: () => void;
}

export default function PersonaSwitchOverlay({ personaName, onComplete }: PersonaSwitchOverlayProps) {
  const texts = [
    '> clearing session...',
    `> loading ${personaName.toUpperCase()} context...`,
    '> ready.',
  ];

  const [lines, setLines] = useState(['', '', '']);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      for (let i = 0; i < texts.length; i++) {
        if (cancelled) return;
        for (let j = 0; j <= texts[i].length; j++) {
          if (cancelled) return;
          const idx = i;
          const slice = texts[i].slice(0, j);
          setLines((prev) => {
            const next = [...prev];
            next[idx] = slice;
            return next;
          });
          await new Promise((r) => setTimeout(r, 32));
        }
        await new Promise((r) => setTimeout(r, 200));
      }
      await new Promise((r) => setTimeout(r, 500));
      if (!cancelled) onComplete();
    }

    run();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [personaName]);

  const currentlyTyping = lines.findIndex((l, i) => l.length < texts[i].length);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        zIndex: 20,
        background: 'var(--bg-panel)',
      }}
    >
      {lines.map((line, i) => (
        <div
          key={i}
          style={{
            fontFamily: 'var(--font-terminal)',
            fontSize: 12,
            letterSpacing: '0.06em',
            color: i === 2 ? 'var(--amber-primary)' : 'var(--text-secondary)',
            minHeight: 20,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {line}
          {i === currentlyTyping && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              style={{ marginLeft: 1 }}
            >
              ▋
            </motion.span>
          )}
        </div>
      ))}
    </motion.div>
  );
}
