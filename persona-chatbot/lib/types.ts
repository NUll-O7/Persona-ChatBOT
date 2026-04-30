export type PersonaId = 'anshuman' | 'abhimanyu' | 'kshitij';

export interface Persona {
  id: PersonaId;
  name: string;
  title: string;
  shortBio: string;
  accentColor: string;
  bgGradient: string;
  avatarInitials: string;
  avatarImage: string;
  systemPrompt: string;
  suggestionChips: string[];
}

export type MessageRole = 'user' | 'assistant';

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
}

export interface ChatApiRequest {
  personaId: PersonaId;
  messages: { role: MessageRole; content: string }[];
}

export interface ChatApiResponse {
  content: string;
  error?: string;
}
