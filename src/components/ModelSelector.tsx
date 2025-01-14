import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export type Model = {
  id: string;
  name: string;
  provider: string;
  description: string;
};

const models: Model[] = [
  // OpenAI Models
  { 
    id: "gpt-4", 
    name: "GPT-4", 
    provider: "OpenAI",
    description: "Most capable model, best for complex tasks"
  },
  
  // Anthropic Models
  { 
    id: "claude-3-opus", 
    name: "Claude 3 Opus", 
    provider: "Anthropic",
    description: "Advanced reasoning and analysis"
  },
  { 
    id: "claude-3-sonnet", 
    name: "Claude 3 Sonnet", 
    provider: "Anthropic",
    description: "Balanced performance and efficiency"
  },
  
  // Perplexity Models
  { 
    id: "llama-3.1-sonar-small-128k-online", 
    name: "Llama 3.1 Small", 
    provider: "Perplexity",
    description: "Fast and efficient for general tasks"
  },
  { 
    id: "llama-3.1-sonar-large-128k-online", 
    name: "Llama 3.1 Large", 
    provider: "Perplexity",
    description: "Powerful model with extended context"
  },
  
  // Groq Models
  {
    id: "mixtral-8x7b-32768",
    name: "Mixtral 8x7B",
    provider: "Groq",
    description: "Fast inference with Mixtral architecture"
  },
  {
    id: "llama2-70b-4096",
    name: "LLaMA 2 70B",
    provider: "Groq",
    description: "High-performance LLaMA 2 model"
  },
  
  // Hugging Face Models
  {
    id: "mistralai/Mixtral-8x7B-Instruct-v0.1",
    name: "Mixtral 8x7B Instruct",
    provider: "Hugging Face",
    description: "Open-source instruction-following model"
  },
  {
    id: "meta-llama/Llama-2-70b-chat-hf",
    name: "LLaMA 2 70B Chat",
    provider: "Hugging Face",
    description: "Meta's conversational LLaMA 2"
  },
  
  // OpenRouter Models
  {
    id: "openrouter/anthropic/claude-3-opus",
    name: "Claude 3 Opus (OpenRouter)",
    provider: "OpenRouter",
    description: "Claude 3 via OpenRouter"
  },
  {
    id: "openrouter/google/gemini-pro",
    name: "Gemini Pro",
    provider: "OpenRouter",
    description: "Google's Gemini Pro via OpenRouter"
  }
];

interface ModelSelectorProps {
  selectedModel: string;
  onModelChange: (model: string) => void;
}

export function ModelSelector({ selectedModel, onModelChange }: ModelSelectorProps) {
  // Group models by provider
  const groupedModels = models.reduce((acc, model) => {
    if (!acc[model.provider]) {
      acc[model.provider] = [];
    }
    acc[model.provider].push(model);
    return acc;
  }, {} as Record<string, Model[]>);

  return (
    <Select value={selectedModel} onValueChange={onModelChange}>
      <SelectTrigger className="w-[300px]">
        <SelectValue placeholder="Select a model" />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(groupedModels).map(([provider, providerModels]) => (
          <div key={provider} className="mb-2">
            <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground">
              {provider}
            </div>
            {providerModels.map((model) => (
              <SelectItem key={model.id} value={model.id}>
                <div className="flex flex-col">
                  <span className="font-medium">{model.name}</span>
                  <span className="text-xs text-muted-foreground">{model.description}</span>
                </div>
              </SelectItem>
            ))}
          </div>
        ))}
      </SelectContent>
    </Select>
  );
}