import { useState } from 'react';
import { toast } from 'sonner';
import { ChatInput } from '@/components/ChatInput';
import { ChatMessage } from '@/components/ChatMessage';
import { ModelSelector } from '@/components/ModelSelector/ModelSelector';
import { sendModelRequest } from '@/services/modelService';
import { TaskList } from '@/components/TaskList';
import { Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant' | 'system';
  createdAt: Date;
}

interface Task {
  id: string;
  description: string;
  completed: boolean;
}

export function ChatContainer() {
  const [selectedModel, setSelectedModel] = useState("gpt-4");
  const [messages, setMessages] = useState<Message[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSendMessage = async (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
      createdAt: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);
    setIsProcessing(true);

    try {
      const response = await sendModelRequest(selectedModel, {
        messages: [...messages, newMessage].map(({ role, content }) => ({ role, content })),
      });

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.content,
        role: 'assistant',
        createdAt: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);

      // Add task if response contains actionable items
      if (response.content.includes('Task:')) {
        const newTask: Task = {
          id: Date.now().toString(),
          description: response.content.split('Task:')[1].split('\n')[0].trim(),
          completed: false,
        };
        setTasks(prev => [...prev, newTask]);
      }
    } catch (error) {
      toast.error('Failed to get response from AI');
      console.error('Error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleToggleTask = (taskId: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
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
          </div>
        </header>

        <div className="flex-1 flex">
          <div className="flex-1 flex flex-col">
            <div className="flex-1 overflow-y-auto p-4">
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message.content}
                  role={message.role}
                  createdAt={message.createdAt}
                />
              ))}
            </div>
            <div className="p-4 border-t">
              <ChatInput onSend={handleSendMessage} disabled={isProcessing} />
            </div>
          </div>

          <aside className="w-96 border-l bg-muted/30">
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