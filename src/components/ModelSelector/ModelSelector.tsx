import { Select, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";
import { providers } from "@/data/models";
import { ProviderGroup } from "./ProviderGroup";

interface ModelSelectorProps {
  selectedModel: string;
  onModelChange: (model: string) => void;
}

export function ModelSelector({ selectedModel, onModelChange }: ModelSelectorProps) {
  return (
    <Select value={selectedModel} onValueChange={onModelChange}>
      <SelectTrigger className="w-[300px]">
        <SelectValue placeholder="Select a model" />
      </SelectTrigger>
      <SelectContent>
        {providers.map((provider) => (
          <ProviderGroup key={provider.name} provider={provider} />
        ))}
      </SelectContent>
    </Select>
  );
}