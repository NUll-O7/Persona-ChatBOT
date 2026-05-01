'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Message, Persona } from '@/lib/types';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import SuggestionChips from './SuggestionChips';
import PersonaSwitchOverlay from './PersonaSwitchOverlay';

interface ChatWindowProps {
  messages: Message[];
  persona: Persona;
  isLoading: boolean;
  error: string | null;
  onSuggestionSelect: (text: string) => void;
  onRetry: () => void;
  isSwitching: boolean;
  switchingToName: string;
  onOverlayComplete: () => void;
}

export default function ChatWindow({
  messages,
  persona,
  isLoading,
  error,
  onSuggestionSelect,
  onRetry,
  isSwitching,
  switchingToName,
  onOverlayComplete,
}: ChatWindowProps) {
  const chatRef = useRef<HTMLDivElement>(null);
  const isEmpty = messages.length === 0;

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages, isLoading]);

  return (
    <div
      ref={chatRef}
      className="chat-panel"
      role="log"
      aria-live="polite"
      aria-label="Conversation"
      style={{
        flex: 1,
        overflowY: 'auto',
        background: 'var(--bg-panel)',
        paddingTop: 24,
        paddingBottom: 80,
        maxWidth: 820,
        margin: '0 auto',
        width: '100%',
        position: 'relative',
        scrollBehavior: 'smooth',
      }}
    >
      {/* Persona Switch Overlay */}
      <AnimatePresence>
        {isSwitching && (
          <PersonaSwitchOverlay
            personaName={switchingToName}
            onComplete={onOverlayComplete}
          />
        )}
      </AnimatePresence>

      {/* Messages with persona-keyed AnimatePresence */}
      <AnimatePresence mode="wait">
        <motion.div
          key={persona.id}
          initial={{ opacity: 0, filter: 'blur(3px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, filter: 'blur(3px)', y: -4 }}
          transition={{ duration: 0.2 }}
          style={{ position: 'relative', zIndex: 1, padding: '0 20px' }}
        >
          {isEmpty && !isLoading ? (
            <SuggestionChips persona={persona} onSelect={onSuggestionSelect} />
          ) : (
            <>
              <AnimatePresence mode="popLayout" initial={false}>
                {messages.map((msg, i) => (
                  <MessageBubble key={msg.id} message={msg} persona={persona} index={i} />
                ))}
              </AnimatePresence>

              {isLoading && <TypingIndicator persona={persona} />}

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  onClick={onRetry}
                  whileHover={{ backgroundColor: 'rgba(232,124,90,0.1)' }}
                  style={{
                    fontFamily: 'var(--font-terminal)',
                    fontSize: 12,
                    color: 'var(--color-error)',
                    letterSpacing: '0.06em',
                    padding: '8px 16px',
                    borderLeft: '2px solid var(--color-error)',
                    background: 'rgba(232,124,90,0.06)',
                    borderRadius: '0 4px 4px 0',
                    cursor: 'pointer',
                    margin: '8px 0',
                  }}
                  role="alert"
                >
                  ! request failed — tap to retry
                </motion.div>
              )}
            </>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Bottom vignette */}
      <div className="chat-panel-vignette" />
    </div>
  );
}
