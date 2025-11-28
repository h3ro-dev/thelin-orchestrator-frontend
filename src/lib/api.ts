/**
 * Thelin Orchestrator API Client
 * Connects to the Mac Studio 1 backend via Tailscale
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://100.105.46.22:3001';

interface Stats {
  lifelogs_today: number;
  classifications: Record<string, number>;
  pending_questions: number;
  pending_book_additions: number;
  new_business_ideas: number;
}

interface BookAddition {
  id: string;
  chapter: string | null;
  content_markdown: string;
  status: string;
  created_at: string;
  lifelog_id: string;
  lifelog_content: string | null;
}

interface BusinessIdea {
  id: string;
  title: string;
  summary: string;
  status: string;
  related_ventures: string[];
  created_at: string;
  lifelog_id: string;
}

interface Question {
  id: string;
  question: string;
  context: string | null;
  options: string[];
  source_type: string;
  created_at: string;
  status: string;
}

interface Lifelog {
  id: string;
  content: string | null;
  timestamp: string;
  classification: string | null;
  confidence: number | null;
}

async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE}${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export const api = {
  // Stats
  getStats: () => fetchApi<Stats>('/api/stats'),

  // Book Additions
  getBookAdditions: (status?: string, limit = 20) => {
    const params = new URLSearchParams();
    if (status) params.set('status', status);
    params.set('limit', limit.toString());
    return fetchApi<BookAddition[]>(`/api/book-additions?${params}`);
  },

  getBookAddition: (id: string) =>
    fetchApi<BookAddition>(`/api/book-additions/${id}`),

  approveBookAddition: (id: string) =>
    fetchApi<{ status: string; message: string }>(`/api/book-additions/${id}/approve`, { method: 'POST' }),

  rejectBookAddition: (id: string, feedback?: string) =>
    fetchApi<{ status: string; message: string }>(`/api/book-additions/${id}/reject`, {
      method: 'POST',
      body: feedback ? JSON.stringify({ feedback }) : undefined,
    }),

  // Business Ideas
  getBusinessIdeas: (status?: string, limit = 20) => {
    const params = new URLSearchParams();
    if (status) params.set('status', status);
    params.set('limit', limit.toString());
    return fetchApi<BusinessIdea[]>(`/api/business-ideas?${params}`);
  },

  getBusinessIdea: (id: string) =>
    fetchApi<BusinessIdea>(`/api/business-ideas/${id}`),

  updateIdeaStatus: (id: string, status: string) =>
    fetchApi<{ status: string; message: string }>(`/api/business-ideas/${id}/status`, {
      method: 'POST',
      body: JSON.stringify({ status }),
    }),

  // Questions
  getQuestions: (status = 'pending', limit = 20) => {
    const params = new URLSearchParams();
    params.set('status', status);
    params.set('limit', limit.toString());
    return fetchApi<Question[]>(`/api/questions?${params}`);
  },

  answerQuestion: (id: string, answer: string) =>
    fetchApi<{ status: string; message: string }>(`/api/questions/${id}/answer`, {
      method: 'POST',
      body: JSON.stringify({ answer }),
    }),

  // Lifelogs
  getLifelogs: (limit = 20, offset = 0, classifiedOnly = false) => {
    const params = new URLSearchParams();
    params.set('limit', limit.toString());
    params.set('offset', offset.toString());
    if (classifiedOnly) params.set('classified_only', 'true');
    return fetchApi<Lifelog[]>(`/api/lifelogs?${params}`);
  },

  getLifelog: (id: string) =>
    fetchApi<Lifelog>(`/api/lifelogs/${id}`),

  // Health Check
  health: () => fetchApi<{ status: string; database: string }>('/api/health'),
};

export type { Stats, BookAddition, BusinessIdea, Question, Lifelog };
