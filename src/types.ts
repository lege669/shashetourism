export interface Slide {
  id: number;
  title: string;
  subtitle: string;
  category: string;
  image: string;
  actionText: string;
  tag?: string;
}

export interface Attraction {
  id: string;
  name: string;
  category: 'Nature' | 'Culture' | 'History';
  rating: number;
  reviewsCount: number;
  image: string;
  description: string;
  longDescription: string;
  highlights: string[];
  bestTime: string;
  coordinates: string;
}

export interface Hotel {
  id: string;
  name: string;
  type: 'Hotel' | 'Lodge' | 'Resort';
  price: string;
  rating: number;
  image: string;
  description: string;
  features: string[];
  location: string;
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  specialty: string;
  rating: number;
  image: string;
  description: string;
  hours: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  category: 'Festival' | 'Cultural' | 'ICT' | 'Holiday';
  location: string;
  image: string;
  description: string;
}

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  department: string;
  image: string;
  bio: string;
  email: string;
  phone: string;
  responsibilities: string[];
  highlighted?: boolean;
  tier?: 'Director' | 'Manager' | 'Team Leader' | 'Employee';
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'nature' | 'culture' | 'staff' | 'landmark';
  image: string;
  description: string;
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  author: string;
  category: string;
  summary: string;
  content: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    text: string;
    type: 'Nature' | 'Culture' | 'History' | 'Food';
  }[];
}
