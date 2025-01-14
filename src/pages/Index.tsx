import { useState } from "react";
import { ChatInput } from "@/components/ChatInput";
import { ChatMessage } from "@/components/ChatMessage";
import { ModelSelector } from "@/components/ModelSelector";
import { TaskList, Task } from "@/components/TaskList";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Brain, ListTodo } from "lucide-react";
import { toast } from "sonner";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  createdAt: Date;
}

export default function Index() {
  const [selectedModel, setSelectedModel] = useState("gpt-4");
  const [messages, setMessages] = useState<Message[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

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
          content: "This is a simulated response. API integration coming soon!",
          role: "assistant",
          createdAt: new Date(),
        };
        setMessages((prev) => [...prev, response]);
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

  const addTask = (description: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      description,
      completed: false,
    };
    setTasks((prev) => [...prev, newTask]);
  };

  return (
    <div className="flex h-screen">
      <main className="flex-1 flex flex-col">
        <header className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-semibold">AI Assistant</h1>
          </div>
          <ModelSelector selectedModel={selectedModel} onModelChange={setSelectedModel} />
        </header>

        <div className="flex-1 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message.content}
              role={message.role}
              createdAt={message.createdAt}
            />
          ))}
        </div>

        <ChatInput onSend={handleSendMessage} disabled={isProcessing} />
      </main>

      <aside className="w-80 border-l bg-muted/30">
        <div className="p-4 border-b">
          <div className="flex items-center gap-2">
            <ListTodo className="h-5 w-5" />
            <h2 className="font-semibold">Tasks</h2>
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
  );
}