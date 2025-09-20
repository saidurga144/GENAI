
'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Bot, User, X, Send } from 'lucide-react';
import { ScrollArea } from '../ui/scroll-area';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { cn } from '@/lib/utils';
import { runChat } from '@/app/actions';

type ChatMessage = {
    role: 'user' | 'model';
    content: string;
};

const starterQuestions = [
    "What is cybersecurity?",
    "How do I start with AWS?",
    "Suggest a project for web development.",
    "Explain machine learning in simple terms.",
];

export function ChatAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen && messages.length === 0) {
            setMessages([
                { role: 'model', content: 'Hello! I am your career assistant. How can I help you today?' }
            ]);
        }
    }, [isOpen, messages.length]);

    useEffect(() => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTo({
                top: scrollAreaRef.current.scrollHeight,
                behavior: 'smooth',
            });
        }
    }, [messages, isLoading]);

    const handleSendMessage = async (messageContent: string) => {
        if (!messageContent.trim() || isLoading) return;

        const userMessage: ChatMessage = { role: 'user', content: messageContent };
        const newMessages: ChatMessage[] = [...messages, userMessage];
        
        setMessages(newMessages);
        setIsLoading(true);
        setInput('');

        try {
            const historyForApi = newMessages.map(m => ({ role: m.role, content: m.content }));
            
            const response = await runChat({ history: historyForApi.slice(-10) }); // Send last 10 messages
            
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

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await handleSendMessage(input);
    };
    
    return (
        <>
            <div className={cn("fixed bottom-6 right-6 z-50 transition-transform duration-300 ease-in-out no-print", {
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

            <div className={cn("fixed bottom-6 right-6 z-50 w-[calc(100vw-3rem)] max-w-md transition-all duration-300 ease-in-out no-print", {
                "translate-y-full opacity-0 pointer-events-none": !isOpen,
                "translate-y-0 opacity-100 pointer-events-auto": isOpen,
            })}>
                <Card className="flex flex-col h-[70vh] shadow-2xl">
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
                                    <div key={index} className={cn('flex items-end gap-2', message.role === 'user' ? 'justify-end' : 'justify-start')}>
                                        {message.role === 'model' && (
                                            <Avatar className="w-8 h-8 flex-shrink-0">
                                                <AvatarFallback><Bot className="w-5 h-5" /></AvatarFallback>
                                            </Avatar>
                                        )}
                                        <div className={cn(
                                            'max-w-[80%] rounded-lg px-3 py-2 text-sm whitespace-pre-wrap',
                                            message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'
                                        )}>
                                            <p>{message.content}</p>
                                        </div>
                                        {message.role === 'user' && (
                                            <Avatar className="w-8 h-8 flex-shrink-0">
                                                <AvatarFallback><User className="w-5 h-5" /></AvatarFallback>
                                            </Avatar>
                                        )}
                                    </div>
                                ))}

                                {messages.length === 1 && !isLoading && (
                                    <div className="pt-4 space-y-2 animate-in fade-in-50">
                                        <p className="text-sm text-muted-foreground text-center mb-2">Or try one of these questions:</p>
                                        <div className="grid grid-cols-1 gap-2">
                                            {starterQuestions.map(q => (
                                                <Button 
                                                    key={q} 
                                                    variant="outline" 
                                                    size="sm"
                                                    className="w-full justify-start h-auto py-2 text-left"
                                                    onClick={() => handleSendMessage(q)}
                                                    disabled={isLoading}
                                                >
                                                    {q}
                                                </Button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                
                                {isLoading && (
                                     <div className="flex items-end gap-2 justify-start">
                                        <Avatar className="w-8 h-8 flex-shrink-0">
                                            <AvatarFallback><Bot className="w-5 h-5" /></AvatarFallback>
                                        </Avatar>
                                        <div className="bg-muted rounded-lg px-3 py-2 flex items-center justify-center">
                                            <div className="flex gap-1.5">
                                                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-pulse" style={{animationDelay: '0ms'}}></span>
                                                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-pulse" style={{animationDelay: '200ms'}}></span>
                                                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-pulse" style={{animationDelay: '400ms'}}></span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </ScrollArea>
                    </CardContent>
                    <CardFooter className="border-t pt-4">
                        <form onSubmit={handleFormSubmit} className="flex w-full items-center space-x-2">
                            <Input
                                id="message"
                                placeholder="Type a message..."
                                className="flex-1"
                                autoComplete="off"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                disabled={isLoading}
                            />
                            <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
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
