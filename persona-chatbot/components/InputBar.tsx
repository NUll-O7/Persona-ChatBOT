'use client';

import { useRef, KeyboardEvent } from 'react';
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

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!isLoading && value.trim()) onSend();
    }
  };

  const canSend = !isLoading && value.trim().length > 0;

  return (
    <div className="input-bar">
      <div className="input-bar__inner">
        <span className="input-bar__prompt">&gt;</span>
        <input
          ref={inputRef}
          id="chat-input"
          className="input-bar__input"
          type="text"
          placeholder={`message ${persona.name.split(' ')[0].toLowerCase()}...`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          autoComplete="off"
          aria-label="Message input"
        />
        <button
          id="send-button"
          className="input-bar__send"
          onClick={onSend}
          disabled={!canSend}
          aria-label="Send message"
        >
          {isLoading ? (
            <span className="input-bar__spinner" />
          ) : (
            'SEND'
          )}
        </button>
      </div>
      <p className="input-bar__hint">
        <kbd>Enter</kbd> to send
      </p>
    </div>
  );
}
