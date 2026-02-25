"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { MapPin } from 'lucide-react';

export default function LoginPage() {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;
    setLoading(true);
    setTimeout(() => {
      setStep('otp');
      setLoading(false);
      toast({ title: "OTP Sent", description: "Verification code sent to " + phone });
    }, 1000);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push('/dashboard/jobs');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md">
        <div className="flex items-center gap-2 justify-center mb-8">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-xl">L</span>
          </div>
          <span className="text-2xl font-bold tracking-tight text-foreground">LucknowConnect</span>
        </div>

        <Card className="border-border/50 bg-card/50 backdrop-blur-xl">
          <CardHeader>
            <CardTitle>{step === 'phone' ? 'Welcome Back' : 'Verify OTP'}</CardTitle>
            <CardDescription>
              {step === 'phone' 
                ? 'Sign in with your phone number to access the local marketplace.' 
                : 'Enter the 6-digit code sent to ' + phone}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {step === 'phone' ? (
              <form onSubmit={handleSendOtp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-muted-foreground">+91</span>
                    <Input 
                      id="phone" 
                      placeholder="9876543210" 
                      className="pl-12" 
                      value={phone} 
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={loading}>
                  {loading ? 'Sending...' : 'Send OTP'}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="otp">Verification Code</Label>
                  <Input 
                    id="otp" 
                    placeholder="000000" 
                    className="text-center text-2xl tracking-[1em]" 
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={loading}>
                  {loading ? 'Verifying...' : 'Verify & Continue'}
                </Button>
                <Button variant="ghost" className="w-full" onClick={() => setStep('phone')}>
                  Change Phone Number
                </Button>
              </form>
            )}
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <div className="relative w-full">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-muted" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or join as</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 w-full">
               <Button variant="outline" size="sm" onClick={() => router.push('/dashboard/jobs')}>Freelancer</Button>
               <Button variant="outline" size="sm" onClick={() => router.push('/dashboard/jobs')}>Client</Button>
            </div>
          </CardFooter>
        </Card>
        
        <div className="mt-8 text-center text-sm text-muted-foreground flex items-center justify-center gap-2">
          <MapPin className="w-4 h-4 text-primary" />
          Lucknow, Uttar Pradesh
        </div>
      </div>
    </div>
  );
}