'use client';

import { useState, useCallback } from 'react';
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

  const activePersona = PERSONAS[activePersonaId];
  const activeMessages = conversations[activePersonaId];

  // Switch persona — clears chat for that persona
  const handlePersonaSwitch = useCallback((id: PersonaId) => {
    setActivePersonaId(id);
    setError(null);
    setInput('');
  }, []);

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
      const msg = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
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
          <span className="app-header__logo">⚡</span>
          <span className="app-header__title">ScalerChat</span>
          <span className="app-header__subtitle">Powered by Gemini AI</span>
        </div>
        <div className="app-header__active-persona">
          <span
            className="active-persona-dot"
            style={{ background: activePersona.accentColor }}
          />
          <span>{activePersona.name}</span>
        </div>
      </header>

      {/* Persona Switcher */}
      <PersonaSwitcher
        activePersonaId={activePersonaId}
        onSwitch={handlePersonaSwitch}
      />

      {/* Active Persona Banner */}
      <div className="persona-banner" style={{ borderColor: activePersona.accentColor }}>
        <div
          className="persona-banner__dot"
          style={{ background: activePersona.accentColor }}
        />
        <span className="persona-banner__name">{activePersona.name}</span>
        <span className="persona-banner__sep">·</span>
        <span className="persona-banner__bio">{activePersona.shortBio}</span>
      </div>

      {/* Chat Area */}
      <ChatWindow
        messages={activeMessages}
        persona={activePersona}
        isLoading={isLoading}
        error={error}
        onSuggestionSelect={handleSuggestionSelect}
        onRetry={handleRetry}
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
