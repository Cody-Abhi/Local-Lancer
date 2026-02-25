"use client";

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Languages, Phone, Video, Info, Search, MoreVertical, Sparkles } from 'lucide-react';
import { dynamicChatTranslation } from '@/ai/flows/dynamic-chat-translation';
import { ChatMessage } from '@/lib/types';
import { cn } from '@/lib/utils';

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', senderId: 'f1', receiverId: 'me', text: 'Hello! I saw your job post for the bakery website.', timestamp: '10:30 AM' },
    { id: '2', senderId: 'me', receiverId: 'f1', text: 'Hey Rahul! Yes, we need someone who understands the local Lucknow market.', timestamp: '10:32 AM' },
    { id: '3', senderId: 'f1', receiverId: 'me', text: 'Great. I have built several e-commerce sites for businesses in Indira Nagar.', timestamp: '10:35 AM' },
  ]);
  const [input, setInput] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      senderId: 'me',
      receiverId: 'f1',
      text: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([...messages, newMessage]);
    setInput('');
  };

  const translateMessage = async (msgId: string, text: string) => {
    setIsTranslating(true);
    try {
      const res = await dynamicChatTranslation({ message: text, targetLanguage: 'Hindi' });
      setMessages(messages.map(m => m.id === msgId ? { ...m, translatedText: res.translatedMessage } : m));
    } catch (e) {
      console.error(e);
    } finally {
      setIsTranslating(false);
    }
  };

  return (
    <div className="h-[calc(100vh-140px)] flex gap-4">
      {/* Sidebar Contacts */}
      <Card className="hidden lg:flex flex-col w-80 bg-card shrink-0 border-primary/5">
        <CardHeader className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search messages..." className="pl-9 bg-secondary/30" />
          </div>
        </CardHeader>
        <ScrollArea className="flex-1">
          <div className="p-2 space-y-1">
            <ContactItem 
              name="Rahul Sharma" 
              role="Freelancer" 
              avatar="https://picsum.photos/seed/rahul/100/100" 
              active={true} 
              lastMsg="Great. I have built several..." 
              time="10:35 AM"
            />
            <ContactItem 
              name="Priya Verma" 
              role="Designer" 
              avatar="https://picsum.photos/seed/priya/100/100" 
              active={false} 
              lastMsg="Sure, I'll send the draft." 
              time="Yesterday"
            />
          </div>
        </ScrollArea>
      </Card>

      {/* Main Chat Area */}
      <Card className="flex-1 flex flex-col bg-card border-primary/5 overflow-hidden">
        <div className="p-4 border-b flex items-center justify-between bg-secondary/10">
           <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10 ring-2 ring-primary/20">
                <AvatarImage src="https://picsum.photos/seed/rahul/100/100" />
                <AvatarFallback>RS</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-bold flex items-center gap-2">
                   Rahul Sharma
                   <div className="w-2 h-2 bg-green-500 rounded-full" />
                </div>
                <div className="text-xs text-muted-foreground">Active now • Local Freelancer</div>
              </div>
           </div>
           <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon"><Phone className="w-5 h-5" /></Button>
              <Button variant="ghost" size="icon"><Video className="w-5 h-5" /></Button>
              <Button variant="ghost" size="icon"><Info className="w-5 h-5" /></Button>
              <Button variant="ghost" size="icon"><MoreVertical className="w-5 h-5" /></Button>
           </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6" ref={scrollRef}>
          {messages.map((msg) => (
            <div key={msg.id} className={cn("flex flex-col max-w-[80%]", msg.senderId === 'me' ? "ml-auto items-end" : "mr-auto items-start")}>
              <div className={cn(
                "px-4 py-3 rounded-2xl relative group",
                msg.senderId === 'me' ? "bg-primary text-white rounded-tr-none" : "bg-secondary/40 text-foreground rounded-tl-none border border-border/50"
              )}>
                {msg.text}
                {msg.translatedText && (
                   <div className="mt-2 pt-2 border-t border-white/20 text-sm italic opacity-90">
                     <Sparkles className="w-3 h-3 inline-block mr-1" />
                     {msg.translatedText}
                   </div>
                )}
                <div className={cn(
                  "absolute -bottom-5 text-[10px] text-muted-foreground whitespace-nowrap",
                  msg.senderId === 'me' ? "right-0" : "left-0"
                )}>
                  {msg.timestamp}
                </div>
                
                {msg.senderId !== 'me' && !msg.translatedText && (
                  <button 
                    onClick={() => translateMessage(msg.id, msg.text)}
                    disabled={isTranslating}
                    className="absolute -right-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-full hover:bg-primary/20 text-primary"
                    title="Translate to Hindi"
                  >
                    <Languages className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 bg-secondary/10 border-t">
           <div className="flex gap-2 items-center">
              <Input 
                placeholder="Type your message..." 
                className="flex-1 h-12 bg-background/50" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <Button 
                size="icon" 
                className="h-12 w-12 bg-primary hover:bg-primary/90 rounded-xl"
                onClick={handleSend}
              >
                <Send className="w-5 h-5 text-white" />
              </Button>
           </div>
        </div>
      </Card>
    </div>
  );
}

function ContactItem({ name, role, avatar, active, lastMsg, time }: { name: string, role: string, avatar: string, active: boolean, lastMsg: string, time: string }) {
  return (
    <div className={cn(
      "flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all",
      active ? "bg-primary/10 border border-primary/20" : "hover:bg-secondary/30"
    )}>
      <Avatar className="w-12 h-12">
        <AvatarImage src={avatar} />
        <AvatarFallback>{name[0]}</AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center mb-0.5">
          <span className="font-bold truncate text-sm">{name}</span>
          <span className="text-[10px] text-muted-foreground">{time}</span>
        </div>
        <div className="text-[10px] text-primary/80 font-semibold uppercase tracking-wider mb-1">{role}</div>
        <p className="text-xs text-muted-foreground truncate">{lastMsg}</p>
      </div>
    </div>
  );
}