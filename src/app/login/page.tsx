
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { MapPin, Phone, Mail, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const [method, setMethod] = useState<'phone' | 'email'>('phone');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'input' | 'otp'>('input');
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();
  const { toast } = useToast();

  const handleAction = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate Auth
    setTimeout(() => {
      if (method === 'phone' && step === 'input') {
        setStep('otp');
        toast({ title: "OTP Sent", description: "Verification code sent to " + phone });
      } else {
        toast({ title: "Welcome Back", description: "Successfully logged into LucknowLink." });
        router.push('/dashboard/overview');
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md">
        <div className="flex items-center gap-2 justify-center mb-8">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-xl">L</span>
          </div>
          <span className="text-2xl font-bold tracking-tight">LucknowLink</span>
        </div>

        <Card className="border-border/50 bg-card/50 backdrop-blur-xl">
          <CardHeader>
            <CardTitle>{step === 'otp' ? 'Verify OTP' : 'Welcome Back'}</CardTitle>
            <CardDescription>
              {step === 'otp' 
                ? 'Enter the 6-digit code sent to your phone.' 
                : 'Sign in to access Lucknow\'s top freelance marketplace.'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {step === 'input' && (
              <div className="flex gap-2 p-1 bg-secondary/50 rounded-lg mb-6">
                <Button 
                  variant={method === 'phone' ? 'default' : 'ghost'} 
                  className="flex-1 h-8 text-xs"
                  onClick={() => setMethod('phone')}
                >
                  <Phone className="w-3 h-3 mr-1" /> Phone
                </Button>
                <Button 
                  variant={method === 'email' ? 'default' : 'ghost'} 
                  className="flex-1 h-8 text-xs"
                  onClick={() => setMethod('email')}
                >
                  <Mail className="w-3 h-3 mr-1" /> Email
                </Button>
              </div>
            )}

            <form onSubmit={handleAction} className="space-y-4">
              {step === 'input' ? (
                <>
                  {method === 'phone' ? (
                    <div className="space-y-2">
                      <Label>Phone Number</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-muted-foreground">+91</span>
                        <Input className="pl-12" placeholder="9876543210" value={phone} onChange={e => setPhone(e.target.value)} />
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-2">
                        <Label>Email</Label>
                        <Input type="email" placeholder="amit@lucknow.in" value={email} onChange={e => setEmail(e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label>Password</Label>
                        <Input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div className="space-y-2">
                  <Label>Verification Code</Label>
                  <Input 
                    className="text-center text-2xl tracking-[1em]" 
                    maxLength={6} 
                    value={otp} 
                    onChange={e => setOtp(e.target.value)}
                  />
                </div>
              )}
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={loading}>
                {loading ? 'Processing...' : (step === 'input' && method === 'phone' ? 'Send OTP' : 'Sign In')}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <div className="text-center text-sm">
              Don't have an account? <Link href="/signup" className="text-primary font-bold hover:underline">Join Platform</Link>
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
