'use client';

import { useState, useCallback, useRef } from 'react';
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
  const [isClearing, setIsClearing] = useState(false);
  const clearTimerRef = useRef<NodeJS.Timeout | null>(null);

  const activePersona = PERSONAS[activePersonaId];
  const activeMessages = conversations[activePersonaId];

  // Switch persona with context-clear animation
  const handlePersonaSwitch = useCallback((id: PersonaId) => {
    if (id === activePersonaId) return;

    // Clear any existing timer
    if (clearTimerRef.current) {
      clearTimeout(clearTimerRef.current);
    }

    setIsClearing(true);
    setError(null);
    setInput('');

    // After brief clear animation, switch persona
    clearTimerRef.current = setTimeout(() => {
      setActivePersonaId(id);
      setIsClearing(false);
    }, 500);
  }, [activePersonaId]);

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
      <header className="app-header">
        <div className="app-header__brand">
          <span className="app-header__title">
            persona-chat:~$
            <span className="app-header__cursor" />
          </span>
        </div>
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
        isClearing={isClearing}
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
