import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export type Model = {
  id: string;
  name: string;
  provider: string;
  description: string;
};

const models: Model[] = [
  { 
    id: "gpt-4", 
    name: "GPT-4", 
    provider: "OpenAI",
    description: "Most capable model, best for complex tasks"
  },
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
  { 
    id: "claude-3-opus", 
    name: "Claude 3 Opus", 
    provider: "Anthropic",
    description: "Advanced reasoning and analysis"
  }
];

interface ModelSelectorProps {
  selectedModel: string;
  onModelChange: (model: string) => void;
}

export function ModelSelector({ selectedModel, onModelChange }: ModelSelectorProps) {
  return (
    <Select value={selectedModel} onValueChange={onModelChange}>
      <SelectTrigger className="w-[250px]">
        <SelectValue placeholder="Select a model" />
      </SelectTrigger>
      <SelectContent>
        {models.map((model) => (
          <SelectItem key={model.id} value={model.id}>
            <div className="flex flex-col">
              <span className="font-medium">{model.name} ({model.provider})</span>
              <span className="text-xs text-muted-foreground">{model.description}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}