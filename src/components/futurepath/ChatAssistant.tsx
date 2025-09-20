
'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Bot, User, X, Send, ChevronDown, ChevronUp, Mail } from 'lucide-react';
import { ScrollArea } from '../ui/scroll-area';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { cn } from '@/lib/utils';
import { chat as runChat } from '@/app/actions';
import { starterAnswers, allStarterQuestions, contactQuestionText } from '@/lib/starter-answers';
import Link from 'next/link';

type ChatMessage = {
    role: 'user' | 'model';
    content: string;
};

export function ChatAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const adminEmail = "careerguidecustomercare@gmail.com";
    const mailtoLink = `mailto:${adminEmail}?subject=Customer%20Support%20Inquiry`;


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
    }, [messages, isLoading, showMore]);

    const handleSendMessage = async (messageContent: string) => {
        if (!messageContent.trim() || isLoading) return;

        const userMessage: ChatMessage = { role: 'user', content: messageContent };
        const newMessages: ChatMessage[] = [...messages, userMessage];
        
        setMessages(newMessages);
        setIsLoading(true);
        setInput('');

        // Check for a predefined answer
        const predefinedAnswer = starterAnswers[messageContent];

        if (predefinedAnswer) {
            setTimeout(() => {
                const modelMessage: ChatMessage = { role: 'model', content: predefinedAnswer };
                setMessages(prev => [...prev, modelMessage]);
                setIsLoading(false);
            }, 500); // Simulate a slight delay
        } else {
            // If no predefined answer, call the AI
            try {
                const historyForApi = newMessages.map(m => ({ 
                    role: m.role, 
                    content: m.content
                }));
                
                const response = await runChat({ history: historyForApi.slice(-10) });
                
                const modelMessage: ChatMessage = { role: 'model', content: response.message };
                setMessages(prev => [...prev, modelMessage]);

            } catch (error) {
                console.error('Chat error:', error);
                // Removed the error message display to show the menu directly.
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await handleSendMessage(input);
    };
    
    const questionsToShow = showMore ? allStarterQuestions : allStarterQuestions.slice(0, 4);

    const renderQuestionButton = (question: string) => {
        if (question === contactQuestionText) {
             return (
                 <Button 
                    key={question} 
                    variant="outline" 
                    size="sm"
                    className="w-full justify-start h-auto py-2 text-left"
                    asChild
                    disabled={isLoading}
                >
                    <Link href={mailtoLink} target="_blank">
                        <Mail className="mr-2 h-4 w-4" />
                        {question}
                    </Link>
                </Button>
            );
        }
        return (
            <Button 
                key={question} 
                variant="outline" 
                size="sm"
                className="w-full justify-start h-auto py-2 text-left"
                onClick={() => handleSendMessage(question)}
                disabled={isLoading}
            >
                {question}
            </Button>
        );
    }

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
                    <CardContent className="flex-grow p-0 overflow-hidden">
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
                                
                                {!isLoading && messages.length > 0 && (
                                    <div className="pt-4 space-y-2 animate-in fade-in-50">
                                        
                                        <div className="grid grid-cols-1 gap-2">
                                            {questionsToShow.map(renderQuestionButton)}
                                            {allStarterQuestions.length > 4 && (
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="w-full justify-center text-primary"
                                                    onClick={() => setShowMore(!showMore)}
                                                >
                                                    {showMore ? "Show Less" : "Show More"}
                                                    {showMore ? <ChevronUp className="w-4 h-4 ml-2" /> : <ChevronDown className="w-4 h-4 ml-2" />}
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
