export interface Book {
  id: number;
  title: string;
  description: string;
  category: string;
  coverImage: string;
  previewImages: string[];
  amazonUrl: string;
  price: string;
  featured?: boolean;
  status: 'published' | 'draft';
  createdAt: string;
  updatedAt: string;
}

export interface Freebie {
  id: number;
  title: string;
  description: string;
  category: string;
  coverImage: string;
  previewImages: string[];
  downloadUrl: string;
  featured?: boolean;
  status: 'published' | 'draft';
  createdAt: string;
  updatedAt: string;
}

export type Category = 'All' | 'Coloring Books' | 'Activity Books' | 'Educational' | 'Journals';

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface DashboardStats {
  totalBooks: number;
  publishedBooks: number;
  draftBooks: number;
  featuredBooks: number;
  totalFreebies: number;
  publishedFreebies: number;
}

export interface SiteSettings {
  siteName: string;
  siteDescription: string;
  logoUrl: string;
  primaryColor: string;
  secondaryColor: string;
  heroTitle: string;
  heroSubtitle: string;
  contactEmail: string;
  socialLinks: {
    facebook: string;
    instagram: string;
    twitter: string;
  };
}