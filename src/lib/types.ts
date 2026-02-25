
export type UserRole = 'freelancer' | 'client' | 'admin';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  avatar?: string;
  location: {
    lat: number;
    lng: number;
    address: string;
    pincode: string;
  };
  rating: number;
  skills: string[];
  bio: string;
  verified: boolean;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  clientId: string;
  budget: number;
  category: string;
  type: 'fixed' | 'part-time';
  radiusKm: number;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  createdAt: string;
  status: 'open' | 'in-progress' | 'completed' | 'disputed';
  skillsRequired: string[];
}

export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: any;
  translatedText?: string;
}

export interface Conversation {
  id: string;
  participants: string[];
  lastMessage?: string;
  updatedAt: any;
  recipient?: User;
}

export interface Milestone {
  id: string;
  jobId: string;
  title: string;
  amount: number;
  status: 'pending' | 'funded' | 'released' | 'disputed';
}
