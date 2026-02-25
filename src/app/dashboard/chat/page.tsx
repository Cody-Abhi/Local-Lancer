"use client";

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Languages, Phone, Video, Info, Search, MoreVertical, Sparkles, User as UserIcon, MessageSquare as MsgIcon, ShieldCheck } from 'lucide-react';
import { dynamicChatTranslation } from '@/ai/flows/dynamic-chat-translation';
import { User } from '@/lib/types';
import { cn } from '@/lib/utils';
import { 
  useFirestore, 
  useUser, 
  useCollection, 
  useMemoFirebase,
  errorEmitter,
  FirestorePermissionError
} from '@/firebase';
import { 
  collection, 
  query, 
  orderBy, 
  addDoc, 
  serverTimestamp, 
  doc, 
  updateDoc,
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

  const conversationId = useMemoFirebase(() => {
    if (!currentUser || !activeRecipient) return null;
    return [currentUser.uid, activeRecipient.id].sort().join('_');
  }, [currentUser, activeRecipient]);

  const messagesQuery = useMemoFirebase(() => {
    if (!db || !conversationId) return null;
    return query(
      collection(db, 'conversations', conversationId, 'messages'),
      orderBy('timestamp', 'asc'),
      limit(100)
    );
  }, [db, conversationId]);

  const { data: messages = [] } = useCollection(messagesQuery);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim() || !currentUser || !conversationId || !db || !activeRecipient) return;

    const messageText = input;
    setInput('');

    const convRef = doc(db, 'conversations', conversationId);
    setDoc(convRef, {
      participants: [currentUser.uid, activeRecipient.id],
      lastMessage: messageText,
      updatedAt: serverTimestamp()
    }, { merge: true }).catch(async (err) => {
      errorEmitter.emit('permission-error', new FirestorePermissionError({
        path: convRef.path,
        operation: 'write',
        requestResourceData: { lastMessage: messageText }
      }));
    });

    const messagesRef = collection(db, 'conversations', conversationId, 'messages');
    addDoc(messagesRef, {
      senderId: currentUser.uid,
      text: messageText,
      timestamp: serverTimestamp()
    }).catch(async (err) => {
      errorEmitter.emit('permission-error', new FirestorePermissionError({
        path: messagesRef.path,
        operation: 'create',
        requestResourceData: { text: messageText }
      }));
    });
  };

  const translateMessage = async (msgId: string, text: string) => {
    if (!conversationId || !db) return;
    setIsTranslating(true);
    try {
      const res = await dynamicChatTranslation({ message: text, targetLanguage: 'Hindi' });
      const msgRef = doc(db, 'conversations', conversationId, 'messages', msgId);
      updateDoc(msgRef, { translatedText: res.translatedMessage }).catch(async (err) => {
        errorEmitter.emit('permission-error', new FirestorePermissionError({
          path: msgRef.path,
          operation: 'update',
          requestResourceData: { translatedText: res.translatedMessage }
        }));
      });
    } catch (e) {
      // Errors handled by Genkit or UI
    } finally {
      setIsTranslating(false);
    }
  };

  return (
    <div className="h-[calc(100vh-160px)] flex flex-col lg:flex-row gap-8 max-w-[1600px] mx-auto pb-10">
      {/* Sidebar Contacts */}
      <Card className="hidden lg:flex flex-col w-96 bg-card/40 shrink-0 border-border/50 rounded-[2.5rem] overflow-hidden shadow-2xl">
        <div className="p-8 border-b border-border/50 bg-secondary/20">
          <div className="relative group">
            <Search className="absolute left-4 top-4 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input 
              placeholder="Search conversations..." 
              className="h-14 pl-12 bg-background/50 border-border/50 rounded-2xl font-bold" 
            />
          </div>
        </div>
        <ScrollArea className="flex-1">
          <div className="p-4 space-y-2">
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
      <Card className="flex-1 flex flex-col bg-card/40 border-border/50 rounded-[2.5rem] overflow-hidden shadow-2xl">
        {activeRecipient ? (
          <>
            <div className="p-6 border-b border-border/50 flex items-center justify-between bg-secondary/20">
               <div className="flex items-center gap-5">
                  <div className="relative">
                    <Avatar className="w-14 h-14 ring-4 ring-primary/10 rounded-2xl">
                      <AvatarImage src={activeRecipient.avatar} className="object-cover" />
                      <AvatarFallback className="rounded-2xl font-black">{activeRecipient.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full ring-4 ring-card" />
                  </div>
                  <div>
                    <div className="font-black text-xl italic text-white flex items-center gap-3 tracking-tight">
                       {activeRecipient.name}
                       {activeRecipient.verified && <ShieldCheck className="w-4 h-4 text-primary fill-current" />}
                    </div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-primary">Local {activeRecipient.role} • Lucknow Pro</div>
                  </div>
               </div>
               <div className="flex items-center gap-2">
                  <ChatAction icon={<Phone className="w-5 h-5" />} />
                  <ChatAction icon={<Video className="w-5 h-5" />} />
                  <ChatAction icon={<Info className="w-5 h-5" />} />
                  <ChatAction icon={<MoreVertical className="w-5 h-5" />} />
               </div>
            </div>

            <div className="flex-1 overflow-y-auto p-10 space-y-8 bg-background/30" ref={scrollRef}>
              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground space-y-4 opacity-50">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <MsgIcon className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-black italic text-white">Start the conversation</h3>
                  <p className="max-w-xs font-medium">Messages are encrypted and private within LucknowLink.</p>
                </div>
              )}
              {messages.map((msg: any) => {
                const isMe = msg.senderId === currentUser?.uid;
                const timeStr = msg.timestamp?.toDate ? msg.timestamp.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '...';
                
                return (
                  <div key={msg.id} className={cn("flex flex-col max-w-[70%]", isMe ? "ml-auto items-end" : "mr-auto items-start")}>
                    <div className={cn(
                      "px-6 py-4 rounded-[2rem] relative group transition-all shadow-xl",
                      isMe ? "bg-primary text-white rounded-tr-none" : "bg-card/80 text-white rounded-tl-none border border-border/50"
                    )}>
                      <p className="text-sm font-bold leading-relaxed">{msg.text}</p>
                      {msg.translatedText && (
                         <div className="mt-4 pt-4 border-t border-white/10 text-xs italic font-medium flex items-center gap-2">
                           <Sparkles className="w-3.5 h-3.5 text-primary" />
                           {msg.translatedText}
                         </div>
                      )}
                      <div className={cn(
                        "absolute -bottom-6 text-[9px] font-black uppercase tracking-widest text-muted-foreground whitespace-nowrap",
                        isMe ? "right-2" : "left-2"
                      )}>
                        {timeStr}
                      </div>
                      
                      {!isMe && !msg.translatedText && (
                        <button 
                          onClick={() => translateMessage(msg.id, msg.text)}
                          disabled={isTranslating}
                          className="absolute -right-12 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity p-2.5 rounded-2xl bg-primary/10 text-primary hover:bg-primary hover:text-white"
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

            <div className="p-8 bg-secondary/20 border-t border-border/50">
               <div className="flex gap-4 items-center">
                  <Input 
                    placeholder="Type your message..." 
                    className="flex-1 h-16 bg-background/50 border-border/50 rounded-2xl px-8 font-bold text-white focus:ring-primary/50" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  />
                  <Button 
                    size="icon" 
                    className="h-16 w-16 bg-primary hover:bg-primary/90 rounded-2xl shadow-xl shadow-primary/20 transition-transform active:scale-90"
                    onClick={handleSend}
                    disabled={!input.trim()}
                  >
                    <Send className="w-6 h-6 text-white" />
                  </Button>
               </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-12 space-y-8">
            <div className="w-32 h-32 bg-primary/10 rounded-[2.5rem] flex items-center justify-center mb-4">
              <UserIcon className="w-16 h-16 text-primary" />
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-black italic text-white tracking-tight">Select a Contact</h3>
              <p className="text-muted-foreground max-w-sm text-lg font-medium">
                Choose a verified Lucknow pro or client to start a real-time conversation.
              </p>
            </div>
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
        "flex items-center gap-4 p-4 rounded-3xl cursor-pointer transition-all border border-transparent",
        active ? "bg-primary text-white shadow-xl shadow-primary/10" : "hover:bg-secondary/40 hover:border-border/50"
      )}
    >
      <Avatar className="w-14 h-14 rounded-2xl ring-2 ring-primary/10">
        <AvatarImage src={user.avatar} className="object-cover" />
        <AvatarFallback className="rounded-2xl font-black">{user.name[0]}</AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center mb-1">
          <span className={cn("font-black italic tracking-tight", active ? "text-white" : "text-white")}>{user.name}</span>
          <span className={cn("text-[9px] font-black uppercase tracking-widest", active ? "text-white/70" : "text-muted-foreground")}>Recently</span>
        </div>
        <div className={cn("text-[9px] font-black uppercase tracking-widest mb-1.5", active ? "text-white/80" : "text-primary")}>{user.role}</div>
        <p className={cn("text-xs truncate font-medium", active ? "text-white/70" : "text-muted-foreground")}>{user.bio}</p>
      </div>
    </div>
  );
}

function ChatAction({ icon }: { icon: React.ReactNode }) {
  return (
    <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl bg-background/20 hover:bg-primary/10 hover:text-primary transition-all">
      {icon}
    </Button>
  );
}
