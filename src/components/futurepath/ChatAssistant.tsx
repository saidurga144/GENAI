
'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Bot, User, X, Send } from 'lucide-react';
import { ScrollArea } from '../ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { chat } from '@/app/actions';
import type { Message } from 'genkit';

type ChatMessage = {
    role: 'user' | 'model';
    content: string;
};

export function ChatAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            setMessages([
                { role: 'model', content: 'Hello! I am your career assistant. How can I help you today?' }
            ]);
        }
    }, [isOpen]);

    useEffect(() => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTo({
                top: scrollAreaRef.current.scrollHeight,
                behavior: 'smooth',
            });
        }
    }, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: ChatMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const genkitHistory: Message[] = messages.map(m => ({
                role: m.role,
                content: [{ text: m.content }]
            }));
            
            const response = await chat({ history: genkitHistory, message: input });

            const modelMessage: ChatMessage = { role: 'model', content: response.message };
            setMessages(prev => [...prev, modelMessage]);

        } catch (error) {
            console.error('Chat error:', error);
            const errorMessage: ChatMessage = { role: 'model', content: 'Sorry, I encountered an error. Please try again.' };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className={cn("fixed bottom-6 right-6 z-50 transition-transform duration-300 ease-in-out", {
                "scale-0 opacity-0": isOpen,
                "scale-100 opacity-100": !isOpen,
            })}>
                <Button
                    onClick={() => setIsOpen(true)}
                    className="w-16 h-16 rounded-full shadow-lg"
                    aria-label="Open chat"
                >
                    <Bot className="w-8 h-8" />
                </Button>
            </div>

            <div className={cn("fixed bottom-6 right-6 z-50 w-[calc(100vw-3rem)] max-w-md transition-all duration-300 ease-in-out", {
                "translate-y-full opacity-0": !isOpen,
                "translate-y-0 opacity-100": isOpen,
            })}>
                <Card className="flex flex-col h-[60vh] shadow-2xl">
                    <CardHeader className="flex flex-row items-center justify-between border-b">
                        <div>
                            <CardTitle>Career Assistant</CardTitle>
                            <CardDescription>Your personal AI guide</CardDescription>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                            <X className="w-5 h-5" />
                        </Button>
                    </CardHeader>
                    <CardContent className="flex-grow p-0">
                        <ScrollArea className="h-full p-4" ref={scrollAreaRef}>
                            <div className="space-y-4">
                                {messages.map((message, index) => (
                                    <div key={index} className={cn('flex items-end gap-2', message.role === 'user' ? 'justify-end' : '')}>
                                        {message.role === 'model' && (
                                            <Avatar className="w-8 h-8">
                                                <AvatarFallback><Bot className="w-5 h-5" /></AvatarFallback>
                                            </Avatar>
                                        )}
                                        <div className={cn(
                                            'max-w-[75%] rounded-lg px-3 py-2 text-sm',
                                            message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'
                                        )}>
                                            <p>{message.content}</p>
                                        </div>
                                        {message.role === 'user' && (
                                            <Avatar className="w-8 h-8">
                                                <AvatarFallback><User className="w-5 h-5" /></AvatarFallback>
                                            </Avatar>
                                        )}
                                    </div>
                                ))}
                                {isLoading && (
                                     <div className="flex items-end gap-2">
                                        <Avatar className="w-8 h-8">
                                            <AvatarFallback><Bot className="w-5 h-5" /></AvatarFallback>
                                        </Avatar>
                                        <div className="bg-muted rounded-lg px-3 py-2 flex items-center justify-center">
                                            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </ScrollArea>
                    </CardContent>
                    <CardFooter className="border-t pt-4">
                        <form onSubmit={handleSendMessage} className="flex w-full items-center space-x-2">
                            <Input
                                id="message"
                                placeholder="Type your message..."
                                className="flex-1"
                                autoComplete="off"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                disabled={isLoading}
                            />
                            <Button type="submit" size="icon" disabled={isLoading}>
                                <Send className="h-4 w-4" />
                                <span className="sr-only">Send</span>
                            </Button>
                        </form>
                    </CardFooter>
                </Card>
            </div>
        </>
    );
}
