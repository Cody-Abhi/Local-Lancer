import { User, Job } from './types';

export const mockUsers: User[] = [
  {
    id: 'f1',
    name: 'Rahul Sharma',
    role: 'freelancer',
    avatar: 'https://picsum.photos/seed/12/100/100',
    location: {
      lat: 26.8467,
      lng: 80.9462,
      address: 'Hazratganj, Lucknow',
      pincode: '226001',
    },
    rating: 4.8,
    skills: ['Web Development', 'React', 'Next.js'],
    bio: 'Experienced full-stack developer based in the heart of Lucknow.',
    verified: true,
  },
  {
    id: 'f2',
    name: 'Priya Verma',
    role: 'freelancer',
    avatar: 'https://picsum.photos/seed/15/100/100',
    location: {
      lat: 26.852,
      lng: 80.998,
      address: 'Gomti Nagar, Lucknow',
      pincode: '226010',
    },
    rating: 4.5,
    skills: ['Graphic Design', 'UI/UX', 'Illustrator'],
    bio: 'Creative designer specializing in branding and mobile app interfaces.',
    verified: true,
  }
];

export const mockJobs: Job[] = [
  {
    id: 'j1',
    title: 'E-commerce Website for Local Bakery',
    description: 'Looking for a developer to build a modern Shopify store or custom React site for our bakery in Aliganj.',
    clientId: 'c1',
    budget: 25000,
    category: 'Development',
    type: 'fixed',
    radiusKm: 15,
    location: {
      lat: 26.892,
      lng: 80.942,
      address: 'Aliganj, Lucknow',
    },
    createdAt: new Date().toISOString(),
    status: 'open',
    skillsRequired: ['E-commerce', 'React', 'Payment Integration'],
  },
  {
    id: 'j2',
    title: 'Logo Redesign for Tech Startup',
    description: 'We need a vibrant new logo that reflects our presence in the Lucknow tech ecosystem.',
    clientId: 'c2',
    budget: 8000,
    category: 'Design',
    type: 'fixed',
    radiusKm: 10,
    location: {
      lat: 26.846,
      lng: 81.02,
      address: 'Indira Nagar, Lucknow',
    },
    createdAt: new Date().toISOString(),
    status: 'open',
    skillsRequired: ['Logo Design', 'Vector Art'],
  }
];