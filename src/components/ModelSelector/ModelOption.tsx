import { Model } from "@/types/models";
import { SelectItem } from "@/components/ui/select";

interface ModelOptionProps {
  model: Model;
}

export function ModelOption({ model }: ModelOptionProps) {
  return (
    <SelectItem key={model.id} value={model.id}>
      <div className="flex flex-col">
        <span className="font-medium">{model.name}</span>
        <span className="text-xs text-muted-foreground">{model.description}</span>
      </div>
    </SelectItem>
  );
}