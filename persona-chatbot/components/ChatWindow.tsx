'use client';

import { useEffect, useRef } from 'react';
import { Message, Persona } from '@/lib/types';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import SuggestionChips from './SuggestionChips';

interface ChatWindowProps {
  messages: Message[];
  persona: Persona;
  isLoading: boolean;
  error: string | null;
  onSuggestionSelect: (text: string) => void;
  onRetry: () => void;
}

export default function ChatWindow({
  messages,
  persona,
  isLoading,
  error,
  onSuggestionSelect,
  onRetry,
}: ChatWindowProps) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const isEmpty = messages.length === 0;

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="chat-window" role="log" aria-live="polite" aria-label="Conversation">
      {isEmpty && !isLoading ? (
        <SuggestionChips persona={persona} onSelect={onSuggestionSelect} />
      ) : (
        <div className="messages-list">
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} persona={persona} />
          ))}

          {isLoading && <TypingIndicator persona={persona} />}

          {error && (
            <div className="error-banner" role="alert">
              <span className="error-icon">⚠️</span>
              <span className="error-text">{error}</span>
              <button
                id="retry-button"
                className="error-retry"
                onClick={onRetry}
                style={{ color: persona.accentColor }}
              >
                Retry
              </button>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      )}
    </div>
  );
}
