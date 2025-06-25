import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SiteSettings } from '../types/Book';

interface SettingsState {
  settings: SiteSettings;
  updateSettings: (settings: Partial<SiteSettings>) => void;
}

const defaultSettings: SiteSettings = {
  siteName: 'BookHaven',
  siteDescription: 'Creating beautiful, engaging books that inspire creativity and learning',
  logoUrl: '',
  primaryColor: '#9333ea',
  secondaryColor: '#ec4899',
  heroTitle: 'Explore Creative & Fun Books for All Ages',
  heroSubtitle: 'Discover our collection of engaging coloring books, activity guides, educational materials, and journals designed to inspire creativity and learning.',
  contactEmail: 'hello@bookhaven.com',
  socialLinks: {
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
    twitter: 'https://twitter.com'
  }
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      settings: defaultSettings,
      updateSettings: (newSettings) => {
        set((state) => ({
          settings: { ...state.settings, ...newSettings }
        }));
      }
    }),
    {
      name: 'settings-storage'
    }
  )
);