
"use client";

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Languages, Phone, Video, Info, Search, MoreVertical, Sparkles, User as UserIcon } from 'lucide-react';
import { dynamicChatTranslation } from '@/ai/flows/dynamic-chat-translation';
import { ChatMessage, User } from '@/lib/types';
import { cn } from '@/lib/utils';
import { 
  useFirestore, 
  useUser, 
  useCollection, 
  useMemoFirebase 
} from '@/firebase';
import { 
  collection, 
  query, 
  orderBy, 
  addDoc, 
  serverTimestamp, 
  doc, 
  updateDoc,
  where,
  limit,
  setDoc
} from 'firebase/firestore';
import { mockUsers } from '@/lib/mock-data';

export default function ChatPage() {
  const { user: currentUser } = useUser();
  const db = useFirestore();
  const [activeRecipient, setActiveRecipient] = useState<User | null>(mockUsers[0]);
  const [input, setInput] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Generate a consistent ID for the conversation between two users
  const conversationId = activeRecipient && currentUser 
    ? [currentUser.uid, activeRecipient.id].sort().join('_') 
    : null;

  // Real-time messages for active conversation
  const messagesQuery = useMemoFirebase(() => {
    if (!db || !conversationId) return null;
    return query(
      collection(db, 'conversations', conversationId, 'messages'),
      orderBy('timestamp', 'asc'),
      limit(100)
    );
  }, [db, conversationId]);

  const { data: messages = [] } = useCollection(messagesQuery);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !currentUser || !conversationId || !db) return;

    const messageText = input;
    setInput('');

    // Ensure conversation doc exists
    const convRef = doc(db, 'conversations', conversationId);
    setDoc(convRef, {
      participants: [currentUser.uid, activeRecipient?.id],
      lastMessage: messageText,
      updatedAt: serverTimestamp()
    }, { merge: true });

    // Add message
    addDoc(collection(db, 'conversations', conversationId, 'messages'), {
      senderId: currentUser.uid,
      text: messageText,
      timestamp: serverTimestamp()
    });
  };

  const translateMessage = async (msgId: string, text: string) => {
    if (!conversationId || !db) return;
    setIsTranslating(true);
    try {
      const res = await dynamicChatTranslation({ message: text, targetLanguage: 'Hindi' });
      const msgRef = doc(db, 'conversations', conversationId, 'messages', msgId);
      updateDoc(msgRef, { translatedText: res.translatedMessage });
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
            {mockUsers.map((user) => (
              <ContactItem 
                key={user.id}
                user={user}
                active={activeRecipient?.id === user.id}
                onClick={() => setActiveRecipient(user)}
              />
            ))}
          </div>
        </ScrollArea>
      </Card>

      {/* Main Chat Area */}
      <Card className="flex-1 flex flex-col bg-card border-primary/5 overflow-hidden">
        {activeRecipient ? (
          <>
            <div className="p-4 border-b flex items-center justify-between bg-secondary/10">
               <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10 ring-2 ring-primary/20">
                    <AvatarImage src={activeRecipient.avatar} />
                    <AvatarFallback>{activeRecipient.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-bold flex items-center gap-2">
                       {activeRecipient.name}
                       {activeRecipient.verified && <div className="w-2 h-2 bg-green-500 rounded-full" />}
                    </div>
                    <div className="text-xs text-muted-foreground">Local {activeRecipient.role} • Lucknow</div>
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
              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground space-y-2 opacity-50">
                  <MessageSquare className="w-12 h-12 mb-2" />
                  <p className="font-medium">No messages yet</p>
                  <p className="text-sm">Start a conversation with {activeRecipient.name}</p>
                </div>
              )}
              {messages.map((msg: any) => {
                const isMe = msg.senderId === currentUser?.uid;
                const timeStr = msg.timestamp?.toDate ? msg.timestamp.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '...';
                
                return (
                  <div key={msg.id} className={cn("flex flex-col max-w-[80%]", isMe ? "ml-auto items-end" : "mr-auto items-start")}>
                    <div className={cn(
                      "px-4 py-3 rounded-2xl relative group transition-all",
                      isMe ? "bg-primary text-white rounded-tr-none" : "bg-secondary/40 text-foreground rounded-tl-none border border-border/50"
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
                        isMe ? "right-0" : "left-0"
                      )}>
                        {timeStr}
                      </div>
                      
                      {!isMe && !msg.translatedText && (
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
                );
              })}
            </div>

            <div className="p-4 bg-secondary/10 border-t">
               <div className="flex gap-2 items-center">
                  <Input 
                    placeholder="Type your message..." 
                    className="flex-1 h-12 bg-background/50 border-border/50" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  />
                  <Button 
                    size="icon" 
                    className="h-12 w-12 bg-primary hover:bg-primary/90 rounded-xl shadow-lg shadow-primary/20"
                    onClick={handleSend}
                    disabled={!input.trim()}
                  >
                    <Send className="w-5 h-5 text-white" />
                  </Button>
               </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-12">
            <div className="w-20 h-20 bg-secondary/30 rounded-full flex items-center justify-center mb-6">
              <UserIcon className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold mb-2">Select a Contact</h3>
            <p className="text-muted-foreground max-w-xs">
              Choose someone from the sidebar to start chatting in real-time.
            </p>
          </div>
        )}
      </Card>
    </div>
  );
}

function ContactItem({ user, active, onClick }: { user: User, active: boolean, onClick: () => void }) {
  return (
    <div 
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all",
        active ? "bg-primary/10 border border-primary/20" : "hover:bg-secondary/30 border border-transparent"
      )}
    >
      <Avatar className="w-12 h-12">
        <AvatarImage src={user.avatar} />
        <AvatarFallback>{user.name[0]}</AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center mb-0.5">
          <span className="font-bold truncate text-sm">{user.name}</span>
          <span className="text-[10px] text-muted-foreground">Recently</span>
        </div>
        <div className="text-[10px] text-primary/80 font-semibold uppercase tracking-wider mb-1 truncate">{user.role}</div>
        <p className="text-xs text-muted-foreground truncate">{user.bio}</p>
      </div>
    </div>
  );
}

function MessageSquare(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}
