'use client';

import { useRef, useEffect, KeyboardEvent } from 'react';
import { Persona } from '@/lib/types';

interface InputBarProps {
  value: string;
  onChange: (val: string) => void;
  onSend: () => void;
  isLoading: boolean;
  persona: Persona;
}

export default function InputBar({ value, onChange, onSend, isLoading, persona }: InputBarProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = 'auto';
    ta.style.height = `${Math.min(ta.scrollHeight, 160)}px`;
  }, [value]);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!isLoading && value.trim()) onSend();
    }
  };

  const canSend = !isLoading && value.trim().length > 0;

  return (
    <div className="input-bar">
      <div className="input-bar__inner">
        <textarea
          ref={textareaRef}
          id="chat-input"
          className="input-bar__textarea"
          placeholder={`Ask ${persona.name.split(' ')[0]} anything…`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          rows={1}
          aria-label="Message input"
        />
        <button
          id="send-button"
          className="input-bar__send"
          onClick={onSend}
          disabled={!canSend}
          style={{ background: canSend ? persona.accentColor : '#374151' }}
          aria-label="Send message"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            width="18"
            height="18"
          >
            <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
          </svg>
        </button>
      </div>
      <p className="input-bar__hint">
        Press <kbd>Enter</kbd> to send · <kbd>Shift+Enter</kbd> for new line
      </p>
    </div>
  );
}
