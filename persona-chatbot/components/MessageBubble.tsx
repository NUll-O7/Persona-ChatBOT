'use client';

import { Message } from '@/lib/types';
import { Persona } from '@/lib/types';

interface MessageBubbleProps {
  message: Message;
  persona: Persona;
}

function formatContent(content: string) {
  // Convert **bold** to <strong>, and newlines to <br>
  const parts = content.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return part.split('\n').map((line, j) => (
      <span key={`${i}-${j}`}>
        {line}
        {j < part.split('\n').length - 1 && <br />}
      </span>
    ));
  });
}

export default function MessageBubble({ message, persona }: MessageBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <div className={`message-row ${isUser ? 'message-row--user' : 'message-row--assistant'}`}>
      {!isUser && (
        <div
          className="message-avatar"
          style={{ background: persona.accentColor }}
          aria-label={`${persona.name} avatar`}
        >
          <span>{persona.avatarInitials}</span>
        </div>
      )}

      <div className={`message-bubble ${isUser ? 'message-bubble--user' : 'message-bubble--assistant'}`}
        style={isUser ? { background: persona.accentColor } : {}}
      >
        <p className="message-content">{formatContent(message.content)}</p>
        <span className="message-time">
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>

      {isUser && (
        <div className="message-avatar message-avatar--user" aria-label="You">
          <span>You</span>
        </div>
      )}
    </div>
  );
}
