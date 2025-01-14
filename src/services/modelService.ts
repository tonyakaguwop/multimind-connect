import { Model, ModelRequest, ModelResponse } from '@/types/models';
import { providers } from '@/data/models';

const getModelById = (modelId: string): Model | undefined => {
  for (const provider of providers) {
    const model = provider.models.find(m => m.id === modelId);
    if (model) return model;
  }
  return undefined;
};

export const sendModelRequest = async (
  modelId: string,
  request: ModelRequest
): Promise<ModelResponse> => {
  const model = getModelById(modelId);
  if (!model) throw new Error('Model not found');

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  switch (model.provider) {
    case 'OpenAI':
      headers['Authorization'] = `Bearer ${localStorage.getItem('OPENAI_API_KEY')}`;
      return fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          model: model.id,
          messages: request.messages,
          temperature: request.temperature ?? 0.7,
          max_tokens: request.maxTokens ?? model.maxTokens,
          stream: request.stream ?? false,
        }),
      }).then(res => res.json());

    case 'Anthropic':
      headers['x-api-key'] = localStorage.getItem('ANTHROPIC_API_KEY') || '';
      return fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          model: model.id,
          messages: request.messages,
          max_tokens: request.maxTokens ?? model.maxTokens,
        }),
      }).then(res => res.json());

    case 'Google':
      headers['Authorization'] = `Bearer ${localStorage.getItem('GOOGLE_API_KEY')}`;
      return fetch('https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          contents: request.messages.map(msg => ({ role: msg.role, parts: [{ text: msg.content }] })),
        }),
      }).then(res => res.json());

    case 'Perplexity':
      headers['Authorization'] = `Bearer ${localStorage.getItem('PERPLEXITY_API_KEY')}`;
      return fetch('https://api.perplexity.ai/chat/completions', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          model: model.id,
          messages: request.messages,
          max_tokens: request.maxTokens ?? model.maxTokens,
        }),
      }).then(res => res.json());

    default:
      throw new Error(`Provider ${model.provider} not implemented`);
  }
};