import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: string;
  role: "user" | "assistant";
  createdAt: Date;
}

export function ChatMessage({ message, role, createdAt }: ChatMessageProps) {
  return (
    <div
      className={cn(
        "flex w-full items-start gap-4 p-4 animate-message-fade-in",
        role === "user" ? "bg-chat-user bg-opacity-10" : "bg-chat-assistant bg-opacity-10"
      )}
    >
      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold">
            {role === "user" ? "You" : "Assistant"}
          </span>
          <span className="text-xs text-muted-foreground">
            {createdAt.toLocaleTimeString()}
          </span>
        </div>
        <p className="text-sm leading-relaxed">{message}</p>
      </div>
    </div>
  );
}