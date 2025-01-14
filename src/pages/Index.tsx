import { useState } from "react";
import { ChatInput } from "@/components/ChatInput";
import { ChatMessage } from "@/components/ChatMessage";
import { ModelSelector } from "@/components/ModelSelector/ModelSelector";
import { TaskList, Task } from "@/components/TaskList";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Brain, ListTodo, Settings2 } from "lucide-react";
import { toast } from "sonner";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant" | "system";
  createdAt: Date;
}

export default function Index() {
  const [selectedModel, setSelectedModel] = useState("gpt-4");
  const [messages, setMessages] = useState<Message[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [systemMessage, setSystemMessage] = useState(
    "You are a helpful AI assistant with autonomous capabilities. You can understand complex tasks and break them down into smaller, manageable steps."
  );

  const handleSendMessage = async (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      role: "user",
      createdAt: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setIsProcessing(true);

    try {
      // Simulate AI response for now
      setTimeout(() => {
        const response: Message = {
          id: (Date.now() + 1).toString(),
          content: "I understand your request. Let me break this down into tasks.",
          role: "assistant",
          createdAt: new Date(),
        };
        setMessages((prev) => [...prev, response]);
        
        // Add a sample task
        const newTask: Task = {
          id: Date.now().toString(),
          description: "Analyze user request and create subtasks",
          completed: false,
        };
        setTasks((prev) => [...prev, newTask]);
        
        setIsProcessing(false);
      }, 1000);
    } catch (error) {
      toast.error("Failed to get response from AI");
      setIsProcessing(false);
    }
  };

  const handleToggleTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  return (
    <div className="flex h-screen bg-background">
      <main className="flex-1 flex flex-col">
        <header className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-semibold">AI Command Center</h1>
          </div>
          <div className="flex items-center gap-4">
            <ModelSelector selectedModel={selectedModel} onModelChange={setSelectedModel} />
            <Button variant="outline" size="icon">
              <Settings2 className="h-4 w-4" />
            </Button>
          </div>
        </header>

        <div className="flex-1 flex">
          <div className="flex-1 flex flex-col">
            <div className="flex-1 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 p-4">
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message.content}
                  role={message.role === "system" ? "assistant" : message.role}
                  createdAt={message.createdAt}
                />
              ))}
            </div>
            <div className="p-4 border-t bg-muted/30">
              <Textarea
                value={systemMessage}
                onChange={(e) => setSystemMessage(e.target.value)}
                placeholder="Configure system message..."
                className="mb-4"
              />
              <ChatInput onSend={handleSendMessage} disabled={isProcessing} />
            </div>
          </div>

          <aside className="w-96 border-l bg-muted/30">
            <div className="p-4 border-b">
              <div className="flex items-center gap-2">
                <ListTodo className="h-5 w-5" />
                <h2 className="font-semibold">Task Queue</h2>
              </div>
            </div>
            <div className="p-4">
              <TaskList
                tasks={tasks}
                onToggleTask={handleToggleTask}
                onDeleteTask={handleDeleteTask}
              />
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}