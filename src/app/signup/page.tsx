
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { MapPin, Briefcase, User, Sparkles, CheckCircle2, ChevronRight, ChevronLeft } from 'lucide-react';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useFirestore, useAuth } from '@/firebase';

type Step = 'auth' | 'role' | 'location' | 'profile';

export default function SignupPage() {
  const [step, setStep] = useState<Step>('auth');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    role: 'freelancer' as 'freelancer' | 'client',
    pincode: '',
    lat: 26.8467,
    lng: 80.9462,
    address: 'Lucknow, UP',
    skills: [] as string[],
    bio: '',
    businessName: '',
    consent: false
  });

  const { toast } = useToast();
  const router = useRouter();
  const db = useFirestore();
  const { auth } = useAuth();

  const handleGeoLocation = () => {
    if (!navigator.geolocation) {
      toast({ title: "Not Supported", description: "Geolocation is not supported by your browser.", variant: "destructive" });
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData(prev => ({
          ...prev,
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          address: "Detected Location"
        }));
        setLoading(false);
        toast({ title: "Location Set", description: "Your coordinates have been detected." });
      },
      (error) => {
        setLoading(false);
        toast({ 
          title: "Permission Denied", 
          description: "Please enter your pincode manually for matching.", 
          variant: "destructive" 
        });
      }
    );
  };

  const handleSignup = async () => {
    if (!formData.consent) {
      toast({ title: "Consent Required", description: "Please agree to the privacy policy (DPDP Act).", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      // In a real app, use auth from Firebase:
      // const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      // const uid = userCredential.user.uid;
      
      const mockUid = "user_" + Math.random().toString(36).substr(2, 9);
      
      const userRef = doc(db!, 'users', mockUid);
      setDoc(userRef, {
        uid: mockUid,
        email: formData.email,
        name: formData.name,
        role: formData.role,
        location: {
          lat: formData.lat,
          lng: formData.lng,
          pincode: formData.pincode,
          address: formData.address
        },
        skills: formData.skills,
        bio: formData.bio,
        businessName: formData.businessName,
        verified: false,
        createdAt: serverTimestamp()
      });

      toast({ title: "Account Created!", description: "Welcome to LucknowLink." });
      router.push('/dashboard/overview');
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-xl">
        <div className="flex items-center gap-2 justify-center mb-8">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-xl">L</span>
          </div>
          <span className="text-2xl font-bold tracking-tight">LucknowLink</span>
        </div>

        <Card className="border-border/50 bg-card/50 backdrop-blur-xl">
          <CardHeader>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">Step {step === 'auth' ? 1 : step === 'role' ? 2 : step === 'location' ? 3 : 4} of 4</span>
              <div className="flex gap-1">
                {(['auth', 'role', 'location', 'profile'] as Step[]).map((s) => (
                  <div key={s} className={`h-1 w-8 rounded-full ${step === s ? 'bg-primary' : 'bg-muted'}`} />
                ))}
              </div>
            </div>
            <CardTitle>
              {step === 'auth' && "Create Your Account"}
              {step === 'role' && "What's your goal?"}
              {step === 'location' && "Find Work Nearby"}
              {step === 'profile' && "Complete Your Profile"}
            </CardTitle>
            <CardDescription>
              {step === 'auth' && "Start your journey in the Lucknow marketplace."}
              {step === 'role' && "Join as a freelancer or a business client."}
              {step === 'location' && "We use location to match you with opportunities in your area."}
              {step === 'profile' && "Add details to help others find you."}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {step === 'auth' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input placeholder="Amit Kumar" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input type="email" placeholder="amit@lucknow.in" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input type="password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
                </div>
              </div>
            )}

            {step === 'role' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <RadioGroup value={formData.role} onValueChange={(v) => setFormData({...formData, role: v as any})} className="grid grid-cols-2 gap-4">
                  <div>
                    <RadioGroupItem value="freelancer" id="freelancer" className="peer sr-only" />
                    <Label
                      htmlFor="freelancer"
                      className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-all h-full"
                    >
                      <Briefcase className="mb-3 h-8 w-8 text-primary" />
                      <div className="text-center">
                        <div className="font-bold">Freelancer</div>
                        <p className="text-xs text-muted-foreground mt-1">I want to work and earn</p>
                      </div>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="client" id="client" className="peer sr-only" />
                    <Label
                      htmlFor="client"
                      className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-all h-full"
                    >
                      <User className="mb-3 h-8 w-8 text-primary" />
                      <div className="text-center">
                        <div className="font-bold">Client</div>
                        <p className="text-xs text-muted-foreground mt-1">I want to hire talent</p>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            )}

            {step === 'location' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="p-6 border-2 border-dashed border-primary/20 rounded-xl bg-primary/5 text-center">
                  <MapPin className="w-10 h-10 text-primary mx-auto mb-4" />
                  <h3 className="font-bold mb-2">Use My Current Location</h3>
                  <p className="text-sm text-muted-foreground mb-4">We'll use your GPS to find jobs in Hazratganj, Gomti Nagar, etc.</p>
                  <Button onClick={handleGeoLocation} disabled={loading} className="w-full">
                    Detect Location
                  </Button>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
                  <div className="relative flex justify-center text-xs uppercase"><span className="bg-card px-2 text-muted-foreground">Or manual entry</span></div>
                </div>
                <div className="space-y-2">
                  <Label>Lucknow Pincode</Label>
                  <Input placeholder="226001" maxLength={6} value={formData.pincode} onChange={e => setFormData({...formData, pincode: e.target.value})} />
                </div>
              </div>
            )}

            {step === 'profile' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                {formData.role === 'freelancer' ? (
                  <>
                    <div className="space-y-2">
                      <Label>Your Skills (e.g., React, Tally, Driving)</Label>
                      <Input placeholder="Comma separated" onChange={e => setFormData({...formData, skills: e.target.value.split(',').map(s => s.trim())})} />
                    </div>
                    <div className="space-y-2">
                      <Label>Professional Bio</Label>
                      <Input placeholder="I specialize in local delivery and e-commerce..." value={formData.bio} onChange={e => setFormData({...formData, bio: e.target.value})} />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-2">
                      <Label>Business/Brand Name</Label>
                      <Input placeholder="Lucknow Sweets & Bakery" value={formData.businessName} onChange={e => setFormData({...formData, businessName: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <Label>Project Description</Label>
                      <Input placeholder="Looking for delivery partners in Aliganj..." value={formData.bio} onChange={e => setFormData({...formData, bio: e.target.value})} />
                    </div>
                  </>
                )}
                <div className="flex items-start space-x-2 pt-4 border-t">
                  <Checkbox id="consent" checked={formData.consent} onCheckedChange={(checked) => setFormData({...formData, consent: checked as boolean})} />
                  <Label htmlFor="consent" className="text-xs leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-muted-foreground">
                    I agree to the LucknowLink Terms of Service and Privacy Policy (DPDP Act 2023). I consent to KYC verification via OTP.
                  </Label>
                </div>
              </div>
            )}
          </CardContent>

          <CardFooter className="flex justify-between border-t p-6 bg-secondary/10">
            {step !== 'auth' ? (
              <Button variant="ghost" onClick={() => setStep(step === 'role' ? 'auth' : step === 'location' ? 'role' : 'location')}>
                <ChevronLeft className="w-4 h-4 mr-2" /> Back
              </Button>
            ) : <div />}
            
            {step !== 'profile' ? (
              <Button 
                onClick={() => setStep(step === 'auth' ? 'role' : step === 'role' ? 'location' : 'profile')}
                disabled={step === 'auth' && !formData.name}
              >
                Next <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button 
                onClick={handleSignup} 
                className="bg-primary hover:bg-primary/90"
                disabled={loading}
              >
                {loading ? "Creating..." : "Complete Signup"} <CheckCircle2 className="w-4 h-4 ml-2" />
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
