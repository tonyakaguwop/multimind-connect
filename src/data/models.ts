import { Model, Provider } from "@/types/models";

export const providers: Provider[] = [
  {
    name: "OpenAI",
    models: [
      {
        id: "gpt-4",
        name: "GPT-4",
        provider: "OpenAI",
        description: "Most capable model, best for complex tasks",
        maxTokens: 8192,
        contextWindow: 8192
      }
    ]
  },
  {
    name: "Anthropic",
    models: [
      {
        id: "claude-3-opus",
        name: "Claude 3 Opus",
        provider: "Anthropic",
        description: "Advanced reasoning and analysis",
        maxTokens: 200000,
        contextWindow: 200000
      },
      {
        id: "claude-3-sonnet",
        name: "Claude 3 Sonnet",
        provider: "Anthropic",
        description: "Balanced performance and efficiency",
        maxTokens: 200000,
        contextWindow: 200000
      },
      {
        id: "claude-3-haiku",
        name: "Claude 3 Haiku",
        provider: "Anthropic",
        description: "Fast and efficient responses",
        maxTokens: 200000,
        contextWindow: 200000
      }
    ]
  },
  {
    name: "Google",
    models: [
      {
        id: "gemini-pro",
        name: "Gemini Pro",
        provider: "Google",
        description: "Advanced language model with strong reasoning",
        maxTokens: 32768,
        contextWindow: 32768
      },
      {
        id: "gemini-pro-vision",
        name: "Gemini Pro Vision",
        provider: "Google",
        description: "Multimodal model for text and images",
        maxTokens: 32768,
        contextWindow: 32768
      }
    ]
  },
  {
    name: "Perplexity",
    models: [
      {
        id: "llama-3.1-sonar-small-128k-online",
        name: "Llama 3.1 Small",
        provider: "Perplexity",
        description: "Fast and efficient for general tasks",
        maxTokens: 128000,
        contextWindow: 128000
      },
      {
        id: "llama-3.1-sonar-large-128k-online",
        name: "Llama 3.1 Large",
        provider: "Perplexity",
        description: "Powerful model with extended context",
        maxTokens: 128000,
        contextWindow: 128000
      }
    ]
  },
  {
    name: "Groq",
    models: [
      {
        id: "mixtral-8x7b-32768",
        name: "Mixtral 8x7B",
        provider: "Groq",
        description: "Fast inference with Mixtral architecture",
        maxTokens: 32768,
        contextWindow: 32768
      },
      {
        id: "llama2-70b-4096",
        name: "LLaMA 2 70B",
        provider: "Groq",
        description: "High-performance LLaMA 2 model",
        maxTokens: 4096,
        contextWindow: 4096
      }
    ]
  },
  {
    name: "Hugging Face",
    models: [
      {
        id: "mistralai/Mixtral-8x7B-Instruct-v0.1",
        name: "Mixtral 8x7B Instruct",
        provider: "Hugging Face",
        description: "Open-source instruction-following model",
        maxTokens: 32768,
        contextWindow: 32768
      },
      {
        id: "meta-llama/Llama-2-70b-chat-hf",
        name: "LLaMA 2 70B Chat",
        provider: "Hugging Face",
        description: "Meta's conversational LLaMA 2",
        maxTokens: 4096,
        contextWindow: 4096
      }
    ]
  },
  {
    name: "OpenRouter",
    models: [
      {
        id: "openrouter/anthropic/claude-3-opus",
        name: "Claude 3 Opus (OpenRouter)",
        provider: "OpenRouter",
        description: "Claude 3 via OpenRouter",
        maxTokens: 200000,
        contextWindow: 200000
      },
      {
        id: "openrouter/google/gemini-pro",
        name: "Gemini Pro",
        provider: "OpenRouter",
        description: "Google's Gemini Pro via OpenRouter",
        maxTokens: 32768,
        contextWindow: 32768
      }
    ]
  }
];