export type Model = {
  id: string;
  name: string;
  provider: string;
  description: string;
  maxTokens?: number;
  contextWindow?: number;
};

export type Provider = {
  name: string;
  models: Model[];
};