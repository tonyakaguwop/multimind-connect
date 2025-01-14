import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export type Model = {
  id: string;
  name: string;
  provider: string;
};

const models: Model[] = [
  { id: "gpt-4", name: "GPT-4", provider: "OpenAI" },
  { id: "llama-3.1-sonar-small-128k-online", name: "Llama 3.1 Small", provider: "Perplexity" },
  { id: "llama-3.1-sonar-large-128k-online", name: "Llama 3.1 Large", provider: "Perplexity" },
];

interface ModelSelectorProps {
  selectedModel: string;
  onModelChange: (model: string) => void;
}

export function ModelSelector({ selectedModel, onModelChange }: ModelSelectorProps) {
  return (
    <Select value={selectedModel} onValueChange={onModelChange}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select a model" />
      </SelectTrigger>
      <SelectContent>
        {models.map((model) => (
          <SelectItem key={model.id} value={model.id}>
            {model.name} ({model.provider})
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}