import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../types/Book';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: async (email: string, password: string) => {
        // Mock authentication - in production, this would call your API
        if (email === 'admin@bookhaven.com' && password === 'admin123') {
          const user: User = {
            id: '1',
            email: 'admin@bookhaven.com',
            name: 'Admin User'
          };
          set({ user, isAuthenticated: true });
          return true;
        }
        return false;
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      }
    }),
    {
      name: 'auth-storage'
    }
  )
);