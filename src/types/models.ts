export type Model = {
  id: string;
  name: string;
  provider: string;
  description: string;
  maxTokens: number;
  contextWindow: number;
  apiEndpoint?: string;
  apiVersion?: string;
  capabilities?: string[];
};

export type Provider = {
  name: string;
  models: Model[];
  apiKey?: string;
  baseUrl?: string;
};

export type ModelResponse = {
  content: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
};

export type ModelRequest = {
  messages: Array<{
    role: 'system' | 'user' | 'assistant';
    content: string;
  }>;
  temperature?: number;
  maxTokens?: number;
  stream?: boolean;
};