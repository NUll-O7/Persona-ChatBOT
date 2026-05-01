'use client';

import { useRef, useEffect, useState, KeyboardEvent } from 'react';
import { motion } from 'framer-motion';
import { Persona } from '@/lib/types';

interface InputBarProps {
  value: string;
  onChange: (val: string) => void;
  onSend: () => void;
  isLoading: boolean;
  persona: Persona;
}

export default function InputBar({ value, onChange, onSend, isLoading, persona }: InputBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [time, setTime] = useState('');

  // Live clock — retro-futurism mission control detail
  useEffect(() => {
    const tick = () =>
      setTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!isLoading && value.trim()) onSend();
    }
  };

  const canSend = !isLoading && value.trim().length > 0;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: 64,
        zIndex: 100,
        background: 'var(--bg-input)',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
    >
      <motion.div
        animate={{
          borderTopColor: isFocused
            ? 'rgba(255,179,71,0.45)'
            : 'rgba(122,92,42,0.22)',
          boxShadow: isFocused
            ? '0 -4px 24px rgba(255,179,71,0.08)'
            : '0 -4px 24px rgba(0,0,0,0)',
        }}
        transition={{ duration: 0.2 }}
        style={{
          borderTop: '1px solid',
          height: '100%',
          maxWidth: 820,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '0 24px',
        }}
      >
        {/* Prompt character */}
        <motion.span
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            color: 'var(--amber-primary)',
            fontSize: 16,
            fontFamily: 'var(--font-terminal)',
            flexShrink: 0,
            userSelect: 'none',
          }}
        >
          {'>'}
        </motion.span>

        {/* Input field */}
        <input
          ref={inputRef}
          id="chat-input"
          type="text"
          placeholder={`message ${persona.name.split(' ')[0].toLowerCase()}...`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={isLoading}
          autoComplete="off"
          aria-label="Message input"
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            fontFamily: 'var(--font-terminal)',
            fontSize: 13,
            color: 'var(--text-primary)',
            letterSpacing: '0.03em',
            caretColor: 'var(--amber-primary)',
          }}
        />

        {/* Send button */}
        <motion.button
          id="send-button"
          onClick={onSend}
          disabled={!canSend}
          whileHover={
            !isLoading
              ? {
                  borderColor: 'var(--amber-primary)',
                  color: 'var(--amber-primary)',
                  boxShadow: '0 0 12px rgba(255,179,71,0.15)',
                }
              : {}
          }
          whileTap={!isLoading ? { y: 2, borderBottomWidth: '1px' } : {}}
          transition={{ duration: 0.08 }}
          aria-label="Send message"
          style={{
            fontFamily: 'var(--font-terminal)',
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.2em',
            color: 'var(--amber-dim)',
            background: 'transparent',
            border: '1px solid rgba(122,92,42,0.45)',
            borderBottom: '3px solid rgba(122,92,42,0.45)',
            borderRadius: 3,
            padding: '6px 14px',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            opacity: !canSend ? 0.35 : 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: 54,
            transition: 'opacity 0.15s',
          }}
        >
          {isLoading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
              style={{
                width: 11,
                height: 11,
                borderRadius: '50%',
                border: '1.5px solid rgba(122,92,42,0.35)',
                borderTopColor: 'var(--amber-primary)',
              }}
            />
          ) : (
            'SEND'
          )}
        </motion.button>

        {/* Live clock */}
        <span
          className="input-coordinate"
          style={{
            color: 'var(--text-dim)',
            fontSize: 9,
            fontFamily: 'var(--font-terminal)',
            letterSpacing: '0.1em',
            flexShrink: 0,
            userSelect: 'none',
          }}
        >
          {time}
        </span>
      </motion.div>
    </div>
  );
}
