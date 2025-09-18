
'use client';

import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {sendMessage} from '@/app/actions';
import type {Message} from 'genkit';
import {cn} from '@/lib/utils';
import {Bot, User} from 'lucide-react';
import {PageHeader} from '@/components/futurepath/PageHeader';
import Image from 'next/image';

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: [{text: input}],
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await sendMessage({
        history: messages,
        message: input,
      });

      const aiMessage: Message = {
        role: 'model',
        content: [{text: response.message}],
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'An unexpected error occurred.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full max-w-3xl mx-auto">
      <PageHeader
        title="AI Chatbot Assistant"
        description="Ask me anything about career paths, skills, or learning resources. I'm here to help!"
      />
      <Card className="flex-grow flex flex-col">
        <CardContent className="flex-grow p-4 overflow-y-auto">
          <div className="space-y-6">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={cn(
                  'flex items-start gap-4',
                  msg.role === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                {msg.role !== 'user' && (
                  <Avatar className="w-8 h-8 border">
                    <AvatarFallback>
                      <Bot />
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    'max-w-md p-3 rounded-lg',
                    msg.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary'
                  )}
                >
                  {msg.content[0].text}
                </div>
                {msg.role === 'user' && (
                  <Avatar className="w-8 h-8 border">
                     <AvatarImage src="https://tse1.mm.bing.net/th/id/OIP.7O4_GREtLbxqPdJCTmfatQHaHa?pid=Api&P=0&h=220" alt="User Avatar" />
                    <AvatarFallback>
                      <User />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-4 justify-start">
                <Avatar className="w-8 h-8 border">
                  <AvatarFallback>
                    <Bot />
                  </AvatarFallback>
                </Avatar>
                <div className="max-w-md p-3 rounded-lg bg-secondary">
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">Typing...</span>
                    <Image
                      src="/loader.gif"
                      alt="Thinking..."
                      width={20}
                      height={20}
                      unoptimized
                    />
                  </div>
                </div>
              </div>
            )}
            {error && (
              <div className="text-center text-destructive">
                <p>
                  Error: {error}. Please try again.
                </p>
              </div>
            )}
          </div>
        </CardContent>
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              disabled={isLoading}
              className="flex-grow"
            />
            <Button onClick={handleSend} disabled={isLoading || !input.trim()}>
              Send
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
