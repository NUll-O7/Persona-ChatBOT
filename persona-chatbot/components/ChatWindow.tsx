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
  isClearing: boolean;
}

export default function ChatWindow({
  messages,
  persona,
  isLoading,
  error,
  onSuggestionSelect,
  onRetry,
  isClearing,
}: ChatWindowProps) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const isEmpty = messages.length === 0;

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Context-clear animation during persona switch
  if (isClearing) {
    return (
      <div className="chat-window" role="log" aria-live="polite" aria-label="Conversation">
        <div className="context-clear">
          <span className="context-clear__text">context cleared</span>
        </div>
      </div>
    );
  }

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
            <div className="error-inline" role="alert">
              <span className="error-inline__icon">!</span>
              <span className="error-inline__text">{error}</span>
              <button
                id="retry-button"
                className="error-inline__retry"
                onClick={onRetry}
              >
                retry
              </button>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      )}
    </div>
  );
}
