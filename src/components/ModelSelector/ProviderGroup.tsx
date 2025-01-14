import { Provider } from "@/types/models";
import { ModelOption } from "./ModelOption";

interface ProviderGroupProps {
  provider: Provider;
}

export function ProviderGroup({ provider }: ProviderGroupProps) {
  return (
    <div key={provider.name} className="mb-2">
      <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground">
        {provider.name}
      </div>
      {provider.models.map((model) => (
        <ModelOption key={model.id} model={model} />
      ))}
    </div>
  );
}