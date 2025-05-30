
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { Send, Bot, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your AI math tutor. I can help you solve math problems, explain concepts, and provide step-by-step solutions. What would you like to work on today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('chat-tutor', {
        body: {
          message: inputMessage,
          conversationHistory: messages.slice(-5).map(msg => ({
            role: msg.isUser ? 'user' : 'assistant',
            content: msg.content
          }))
        }
      });

      if (error) throw error;

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">AI Math Tutor</h2>
        <p className="text-gray-600">Ask questions, get explanations, and solve problems together</p>
      </div>

      <Card className="h-[600px] flex flex-col">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-blue-500" />
            Chat with AI Tutor
          </CardTitle>
          <CardDescription>
            Ask math questions, paste equations, or request step-by-step solutions
          </CardDescription>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col">
          <ScrollArea className="flex-1 pr-4 mb-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.isUser ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <Avatar className={`h-8 w-8 ${message.isUser ? 'bg-blue-500' : 'bg-green-500'}`}>
                    {message.isUser ? (
                      <User className="h-4 w-4 text-white" />
                    ) : (
                      <Bot className="h-4 w-4 text-white" />
                    )}
                  </Avatar>
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.isUser
                        ? 'bg-blue-500 text-white ml-auto'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                    <span className={`text-xs ${message.isUser ? 'text-blue-100' : 'text-gray-500'} mt-1 block`}>
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3">
                  <Avatar className="h-8 w-8 bg-green-500">
                    <Bot className="h-4 w-4 text-white" />
                  </Avatar>
                  <div className="bg-gray-100 text-gray-900 p-3 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <div className="flex gap-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask a math question or type an equation..."
              disabled={isLoading}
              className="flex-1"
            />
            <Button onClick={sendMessage} disabled={isLoading || !inputMessage.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setInputMessage("Help me solve this quadratic equation: x² + 5x + 6 = 0")}>
          <CardContent className="p-4">
            <h3 className="font-medium mb-2">Solve Quadratic Equation</h3>
            <p className="text-sm text-gray-600">Get step-by-step solution for x² + 5x + 6 = 0</p>
          </CardContent>
        </Card>
        
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setInputMessage("Explain the Pythagorean theorem with examples")}>
          <CardContent className="p-4">
            <h3 className="font-medium mb-2">Pythagorean Theorem</h3>
            <p className="text-sm text-gray-600">Learn about a² + b² = c² with examples</p>
          </CardContent>
        </Card>
        
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setInputMessage("How do I find the derivative of x³ + 2x² - 5x + 1?")}>
          <CardContent className="p-4">
            <h3 className="font-medium mb-2">Calculate Derivative</h3>
            <p className="text-sm text-gray-600">Learn differentiation step-by-step</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
