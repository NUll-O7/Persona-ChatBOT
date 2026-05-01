'use client';

import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Message, PersonaId } from '@/lib/types';
import { PERSONAS } from '@/lib/personas';
import PersonaSwitcher from '@/components/PersonaSwitcher';
import ChatWindow from '@/components/ChatWindow';
import InputBar from '@/components/InputBar';

function generateId(): string {
  return `msg_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

export default function HomePage() {
  const [activePersonaId, setActivePersonaId] = useState<PersonaId>('anshuman');
  const [conversations, setConversations] = useState<Record<string, Message[]>>({
    anshuman: [],
    abhimanyu: [],
    kshitij: [],
  });
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUserMessage, setLastUserMessage] = useState<string>('');
  const [isSwitching, setIsSwitching] = useState(false);
  const [switchingTo, setSwitchingTo] = useState<PersonaId>('anshuman');

  const activePersona = PERSONAS[activePersonaId];
  const activeMessages = conversations[activePersonaId];

  // Switch persona with overlay animation
  const handlePersonaSwitch = useCallback(
    (id: PersonaId) => {
      if (id === activePersonaId || isSwitching) return;
      setSwitchingTo(id);
      setIsSwitching(true);
      setError(null);
      setInput('');
    },
    [activePersonaId, isSwitching]
  );

  const handleOverlayComplete = useCallback(() => {
    setIsSwitching(false);
    setActivePersonaId(switchingTo);
  }, [switchingTo]);

  const sendMessage = useCallback(async (messageText: string) => {
    const trimmed = messageText.trim();
    if (!trimmed || isLoading) return;

    setError(null);
    setLastUserMessage(trimmed);
    setInput('');

    const userMessage: Message = {
      id: generateId(),
      role: 'user',
      content: trimmed,
      timestamp: new Date(),
    };

    // Optimistically add user message
    setConversations((prev) => ({
      ...prev,
      [activePersonaId]: [...prev[activePersonaId], userMessage],
    }));

    // Build messages array BEFORE setState so we capture pre-update state
    const currentMessages = [...conversations[activePersonaId], userMessage];

    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          personaId: activePersonaId,
          messages: currentMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || `HTTP ${res.status}`);
      }

      const assistantMessage: Message = {
        id: generateId(),
        role: 'assistant',
        content: data.content,
        timestamp: new Date(),
      };

      // Only add assistantMessage — userMessage already added optimistically above
      setConversations((prev) => ({
        ...prev,
        [activePersonaId]: [...prev[activePersonaId], assistantMessage],
      }));
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'request failed, please try again';
      setError(msg);
      // Roll back the optimistic user message
      setConversations((prev) => ({
        ...prev,
        [activePersonaId]: prev[activePersonaId].filter((m) => m.id !== userMessage.id),
      }));
    } finally {
      setIsLoading(false);
    }
  }, [activePersonaId, conversations, isLoading]);

  const handleSuggestionSelect = useCallback((text: string) => {
    sendMessage(text);
  }, [sendMessage]);

  const handleRetry = useCallback(() => {
    if (lastUserMessage) sendMessage(lastUserMessage);
  }, [lastUserMessage, sendMessage]);

  return (
    <main className="app-shell">
      {/* Header */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          height: 48,
          background: 'var(--bg-header)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(122,92,42,0.25)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          overflow: 'hidden',
          flexShrink: 0,
        }}
      >
        {/* Boot scan line */}
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: '110%' }}
          transition={{ duration: 1.4, ease: 'easeInOut', delay: 0.3 }}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '60%',
            height: 1,
            background: 'linear-gradient(90deg, transparent, var(--amber-primary), transparent)',
            opacity: 0.5,
            pointerEvents: 'none',
          }}
        />

        {/* Title with blinking cursor */}
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 20,
            color: 'var(--amber-dim)',
            letterSpacing: '0.15em',
            userSelect: 'none',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          persona-chat:~$
          <motion.span
            animate={{ opacity: [1, 1, 0, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, times: [0, 0.45, 0.45, 1] }}
            style={{ color: 'var(--amber-primary)', marginLeft: 2 }}
          >
            █
          </motion.span>
        </span>

        <PersonaSwitcher
          activePersonaId={activePersonaId}
          onSwitch={handlePersonaSwitch}
        />
      </header>

      {/* Chat Area */}
      <ChatWindow
        messages={activeMessages}
        persona={activePersona}
        isLoading={isLoading}
        error={error}
        onSuggestionSelect={handleSuggestionSelect}
        onRetry={handleRetry}
        isSwitching={isSwitching}
        switchingToName={switchingTo}
        onOverlayComplete={handleOverlayComplete}
      />

      {/* Input */}
      <InputBar
        value={input}
        onChange={setInput}
        onSend={() => sendMessage(input)}
        isLoading={isLoading}
        persona={activePersona}
      />
    </main>
  );
}
