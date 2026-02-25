
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  PlusCircle, 
  ArrowRight, 
  MapPin, 
  Star, 
  ShieldCheck, 
  Clock, 
  Zap, 
  CheckCircle2, 
  Lightbulb,
  Check
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useFirestore, useUser } from '@/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { toast } from '@/hooks/use-toast';

export default function PostServicePage() {
  const router = useRouter();
  const db = useFirestore();
  const { user } = useUser();

  const [form, setForm] = useState({
    title: '',
    category: '',
    price: '',
    deliveryTime: '',
    description: '',
    perks: {
      inPersonMeeting: false,
      localSupport: true,
      sameDayResponse: false,
      bilingual: false
    }
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePublish = async () => {
    if (!form.title || !form.category || !form.price || !user || !db) {
      toast({
        title: "Missing Information",
        description: "Please fill out the basic service details.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'services'), {
        ...form,
        price: Number(form.price),
        freelancerId: user.uid,
        freelancerName: user.displayName || 'Anonymous',
        freelancerAvatar: user.photoURL || '',
        createdAt: serverTimestamp(),
      });
      
      toast({
        title: "Service Published!",
        description: "Your new service package is now live in Lucknow.",
      });
      router.push('/dashboard/freelancers');
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to publish service. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePerk = (key: keyof typeof form.perks) => {
    setForm(prev => ({
      ...prev,
      perks: { ...prev.perks, [key]: !prev.perks[key] }
    }));
  };

  return (
    <div className="max-w-[1400px] mx-auto space-y-8 pb-20">
      <div className="space-y-1">
        <h1 className="text-4xl font-black text-[#FF8C2B] tracking-tight">Post a New Service Package</h1>
        <p className="text-muted-foreground text-lg">Create a specialized offering for clients in Lucknow and nearby areas.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Form Section */}
        <div className="lg:col-span-8 space-y-8">
          {/* Package Details */}
          <Card className="bg-[#1A120B]/50 border-[#2A1D11] rounded-3xl overflow-hidden shadow-2xl">
            <CardHeader className="p-8 pb-4">
              <div className="flex items-center gap-3 text-[#FF8C2B]">
                <PlusCircle className="w-6 h-6" />
                <h2 className="text-xl font-bold uppercase tracking-widest text-white">Package Details</h2>
              </div>
            </CardHeader>
            <CardContent className="p-8 pt-0 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <Label className="text-sm font-bold text-gray-400">Service Title</Label>
                  <Input 
                    placeholder="e.g., Static Website for Shop" 
                    className="bg-[#2A1D11]/30 border-[#3A2D21] h-14 text-white focus:ring-[#FF8C2B] rounded-xl"
                    value={form.title}
                    onChange={(e) => setForm({...form, title: e.target.value})}
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-sm font-bold text-gray-400">Category</Label>
                  <Select onValueChange={(v) => setForm({...form, category: v})}>
                    <SelectTrigger className="bg-[#2A1D11]/30 border-[#3A2D21] h-14 text-white rounded-xl">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1A120B] border-[#2A1D11]">
                      <SelectItem value="Web Development">Web Development</SelectItem>
                      <SelectItem value="Graphic Design">Graphic Design</SelectItem>
                      <SelectItem value="Content Writing">Content Writing</SelectItem>
                      <SelectItem value="Digital Marketing">Digital Marketing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <Label className="text-sm font-bold text-gray-400">Base Price (₹)</Label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-bold text-lg">₹</span>
                    <Input 
                      type="number"
                      placeholder="2500" 
                      className="pl-10 bg-[#2A1D11]/30 border-[#3A2D21] h-14 text-white focus:ring-[#FF8C2B] rounded-xl"
                      value={form.price}
                      onChange={(e) => setForm({...form, price: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <Label className="text-sm font-bold text-gray-400">Delivery Time</Label>
                  <Select onValueChange={(v) => setForm({...form, deliveryTime: v})}>
                    <SelectTrigger className="bg-[#2A1D11]/30 border-[#3A2D21] h-14 text-white rounded-xl">
                      <SelectValue placeholder="Select duration" />
                      <Clock className="w-4 h-4 ml-2 opacity-50" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1A120B] border-[#2A1D11]">
                      <SelectItem value="2 Days">2 Days</SelectItem>
                      <SelectItem value="5 Days">5 Days</SelectItem>
                      <SelectItem value="1 Week">1 Week</SelectItem>
                      <SelectItem value="2 Weeks">2 Weeks</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-bold text-gray-400">Service Description</Label>
                <Textarea 
                  placeholder="Describe exactly what you will deliver..." 
                  className="bg-[#2A1D11]/30 border-[#3A2D21] min-h-[180px] text-white focus:ring-[#FF8C2B] rounded-2xl resize-none"
                  value={form.description}
                  onChange={(e) => setForm({...form, description: e.target.value})}
                />
              </div>
            </CardContent>
          </Card>

          {/* Local Perks */}
          <Card className="bg-[#1A120B]/50 border-[#2A1D11] rounded-3xl overflow-hidden shadow-2xl">
            <CardHeader className="p-8 pb-4 flex flex-row items-center justify-between">
              <div className="flex items-center gap-3 text-[#FF8C2B]">
                <MapPin className="w-6 h-6" />
                <h2 className="text-xl font-bold uppercase tracking-widest text-white">Local Perks</h2>
              </div>
              <Badge className="bg-[#FF8C2B]/10 text-[#FF8C2B] border-[#FF8C2B]/30 font-bold px-4 py-1.5 rounded-full text-[10px] tracking-widest">
                LUCKNOW EXCLUSIVE
              </Badge>
            </CardHeader>
            <CardContent className="p-8 pt-0 space-y-4">
              <p className="text-sm text-muted-foreground mb-6">Boost your visibility by offering perks available only to local clients.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <PerkOption 
                  label="In-person meeting" 
                  description="Available to meet in Lucknow (Cafe/Office)"
                  checked={form.perks.inPersonMeeting}
                  onClick={() => togglePerk('inPersonMeeting')}
                />
                <PerkOption 
                  label="30 Days Local Support" 
                  description="Free support for clients within 50km"
                  checked={form.perks.localSupport}
                  onClick={() => togglePerk('localSupport')}
                />
                <PerkOption 
                  label="Same Day Response" 
                  description="Guaranteed response within 12 hours"
                  checked={form.perks.sameDayResponse}
                  onClick={() => togglePerk('sameDayResponse')}
                />
                <PerkOption 
                  label="Hindi & English" 
                  description="Communication in both languages"
                  checked={form.perks.bilingual}
                  onClick={() => togglePerk('bilingual')}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center pt-4">
            <Button 
              size="lg" 
              className="bg-[#FF8C2B] hover:bg-[#FF8C2B]/90 text-white font-black h-16 px-16 rounded-full text-lg shadow-2xl shadow-[#FF8C2B]/20 flex items-center gap-3 transition-transform hover:scale-105 active:scale-95"
              onClick={handlePublish}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Publishing..." : "Publish Service"}
              <ArrowRight className="w-6 h-6" />
            </Button>
          </div>
        </div>

        {/* Right Preview Section */}
        <div className="lg:col-span-4 space-y-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white uppercase tracking-wider">Live Preview</h3>
            <Badge variant="outline" className="text-[10px] text-gray-500 border-gray-800 tracking-widest">CLIENT VIEW</Badge>
          </div>

          <Card className="bg-[#1A120B] border-[#2A1D11] rounded-[2rem] overflow-hidden shadow-2xl">
            <div className="relative aspect-[4/3] overflow-hidden">
              <img 
                src="https://picsum.photos/seed/service_laptop/800/600" 
                alt="Service Preview" 
                className="w-full h-full object-cover"
                data-ai-hint="Laptop work"
              />
              <div className="absolute top-4 left-4">
                <Badge className="bg-black/40 backdrop-blur-md text-white border-white/20 font-bold px-3 py-1 flex items-center gap-1.5 rounded-full text-[10px]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#FF8C2B] fill-[#FF8C2B]" />
                  Verified Pro
                </Badge>
              </div>
              <div className="absolute bottom-4 right-4">
                <Badge className="bg-[#FF8C2B] text-white font-black px-4 py-2 text-lg rounded-2xl shadow-xl">
                  ₹{form.price || '0'}
                </Badge>
              </div>
            </div>
            <CardContent className="p-8 space-y-6">
              <div className="flex items-center gap-2 text-[#FF8C2B]/60 text-[10px] font-bold tracking-widest uppercase">
                <Briefcase className="w-3.5 h-3.5" />
                {form.category || 'Select a category'}
              </div>
              <h3 className="text-2xl font-black text-white leading-tight">
                {form.title || 'Static Website for Shop'}
              </h3>
              <p className="text-muted-foreground text-sm line-clamp-3">
                {form.description || 'I will create a professional, responsive static website for your local shop or business.'}
              </p>

              <div className="flex flex-wrap gap-2">
                {form.perks.inPersonMeeting && (
                  <Badge variant="secondary" className="bg-green-500/10 text-green-500 border-none font-bold text-[10px] px-3 py-1 flex items-center gap-1.5">
                    <Zap className="w-3 h-3 fill-current" />
                    In-person Meeting
                  </Badge>
                )}
                {form.perks.localSupport && (
                  <Badge variant="secondary" className="bg-blue-500/10 text-blue-500 border-none font-bold text-[10px] px-3 py-1 flex items-center gap-1.5">
                    <Zap className="w-3 h-3 fill-current" />
                    Local Support
                  </Badge>
                )}
              </div>

              <div className="pt-6 border-t border-[#2A1D11] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img 
                    src={user?.photoURL || "https://picsum.photos/seed/rahul/100/100"} 
                    alt="Freelancer" 
                    className="w-10 h-10 rounded-full ring-2 ring-[#FF8C2B]/20" 
                  />
                  <div>
                    <div className="text-sm font-bold text-white">{user?.displayName || 'Rahul Verma'}</div>
                    <div className="text-[10px] text-muted-foreground flex items-center gap-1">
                      <MapPin className="w-2.5 h-2.5" />
                      Gomti Nagar, Lucknow
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-yellow-500 font-bold text-sm">
                  <Star className="w-4 h-4 fill-current" />
                  4.9 (24)
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pro Tip Card */}
          <Card className="bg-[#1A120B]/30 border-[#2A1D11] border-dashed rounded-3xl p-8">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-[#FF8C2B]/10 rounded-2xl flex items-center justify-center shrink-0">
                <Lightbulb className="w-6 h-6 text-[#FF8C2B]" />
              </div>
              <div>
                <h4 className="font-bold text-white mb-1">Pro Tip:</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Adding "Hindi & English" support increases local client trust by 40% in Lucknow.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function PerkOption({ label, description, checked, onClick }: { label: string, description: string, checked: boolean, onClick: () => void }) {
  return (
    <div 
      onClick={onClick}
      className={cn(
        "p-5 rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-4 select-none",
        checked 
          ? "bg-[#FF8C2B]/5 border-[#FF8C2B] shadow-lg shadow-[#FF8C2B]/5" 
          : "bg-[#2A1D11]/20 border-[#2A1D11] hover:border-[#3A2D21]"
      )}
    >
      <div className={cn(
        "w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors",
        checked ? "bg-[#FF8C2B] border-[#FF8C2B]" : "border-[#3A2D21]"
      )}>
        {checked && <Check className="w-4 h-4 text-white font-black" />}
      </div>
      <div>
        <div className={cn("text-sm font-bold", checked ? "text-white" : "text-gray-400")}>{label}</div>
        <div className="text-[10px] text-muted-foreground mt-0.5">{description}</div>
      </div>
    </div>
  );
}

function Briefcase(props: any) {
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
      <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      <rect width="20" height="14" x="2" y="6" rx="2" />
    </svg>
  )
}
