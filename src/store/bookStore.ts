import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Book, Freebie, DashboardStats } from '../types/Book';

interface BookState {
  books: Book[];
  freebies: Freebie[];
  searchTerm: string;
  selectedCategory: string;
  sortBy: 'title' | 'createdAt' | 'updatedAt';
  sortOrder: 'asc' | 'desc';
  addBook: (book: Omit<Book, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateBook: (id: number, book: Partial<Book>) => void;
  deleteBook: (id: number) => void;
  addFreebie: (freebie: Omit<Freebie, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateFreebie: (id: number, freebie: Partial<Freebie>) => void;
  deleteFreebie: (id: number) => void;
  setSearchTerm: (term: string) => void;
  setSelectedCategory: (category: string) => void;
  setSortBy: (sortBy: 'title' | 'createdAt' | 'updatedAt') => void;
  setSortOrder: (order: 'asc' | 'desc') => void;
  getFilteredBooks: () => Book[];
  getFilteredFreebies: () => Freebie[];
  getDashboardStats: () => DashboardStats;
  exportBooks: () => string;
  importBooks: (jsonData: string) => boolean;
  exportFreebies: () => string;
  importFreebies: (jsonData: string) => boolean;
}

const initialBooks: Book[] = [
  {
    id: 1,
    title: "Magical Garden Coloring Book",
    description: "Discover enchanting flowers, whimsical creatures, and peaceful garden scenes in this delightful coloring adventure.",
    category: "Coloring Books",
    coverImage: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
    previewImages: [
      "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1323712/pexels-photo-1323712.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    amazonUrl: "https://amazon.com/dp/example1",
    price: "$9.99",
    featured: true,
    status: 'published',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 2,
    title: "Creative Kids Activity Book",
    description: "Hours of fun with puzzles, mazes, drawing challenges, and brain teasers designed for curious young minds.",
    category: "Activity Books",
    coverImage: "https://images.pexels.com/photos/1001914/pexels-photo-1001914.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
    previewImages: [
      "https://images.pexels.com/photos/1001914/pexels-photo-1001914.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/745365/pexels-photo-745365.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/273230/pexels-photo-273230.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    amazonUrl: "https://amazon.com/dp/example2",
    price: "$12.99",
    status: 'published',
    createdAt: '2024-01-10T14:30:00Z',
    updatedAt: '2024-01-10T14:30:00Z'
  },
  {
    id: 3,
    title: "Learning Numbers & Letters",
    description: "An educational journey through the alphabet and numbers with engaging exercises and colorful illustrations.",
    category: "Educational",
    coverImage: "https://images.pexels.com/photos/289737/pexels-photo-289737.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
    previewImages: [
      "https://images.pexels.com/photos/289737/pexels-photo-289737.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/256520/pexels-photo-256520.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    amazonUrl: "https://amazon.com/dp/example3",
    price: "$8.99",
    featured: true,
    status: 'published',
    createdAt: '2024-01-05T09:15:00Z',
    updatedAt: '2024-01-05T09:15:00Z'
  }
];

const initialFreebies: Freebie[] = [
  {
    id: 1,
    title: "Free Coloring Pages Sample",
    description: "A collection of 5 beautiful coloring pages to get you started on your creative journey.",
    category: "Coloring Books",
    coverImage: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
    previewImages: [
      "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    downloadUrl: "https://example.com/free-coloring-pages.pdf",
    status: 'published',
    createdAt: '2024-01-20T10:00:00Z',
    updatedAt: '2024-01-20T10:00:00Z'
  },
  {
    id: 2,
    title: "Activity Worksheet Pack",
    description: "Fun educational worksheets for kids including puzzles, mazes, and brain teasers.",
    category: "Activity Books",
    coverImage: "https://images.pexels.com/photos/1001914/pexels-photo-1001914.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
    previewImages: [
      "https://images.pexels.com/photos/1001914/pexels-photo-1001914.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/745365/pexels-photo-745365.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    downloadUrl: "https://example.com/activity-worksheets.pdf",
    status: 'published',
    createdAt: '2024-01-18T14:30:00Z',
    updatedAt: '2024-01-18T14:30:00Z'
  }
];

export const useBookStore = create<BookState>()(
  persist(
    (set, get) => ({
      books: initialBooks,
      freebies: initialFreebies,
      searchTerm: '',
      selectedCategory: 'All',
      sortBy: 'updatedAt',
      sortOrder: 'desc',
      
      addBook: (bookData) => {
        const newBook: Book = {
          ...bookData,
          id: Date.now(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        set((state) => ({ books: [...state.books, newBook] }));
      },
      
      updateBook: (id, updates) => {
        set((state) => ({
          books: state.books.map((book) =>
            book.id === id
              ? { ...book, ...updates, updatedAt: new Date().toISOString() }
              : book
          )
        }));
      },
      
      deleteBook: (id) => {
        set((state) => ({
          books: state.books.filter((book) => book.id !== id)
        }));
      },

      addFreebie: (freebieData) => {
        const newFreebie: Freebie = {
          ...freebieData,
          id: Date.now(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        set((state) => ({ freebies: [...state.freebies, newFreebie] }));
      },
      
      updateFreebie: (id, updates) => {
        set((state) => ({
          freebies: state.freebies.map((freebie) =>
            freebie.id === id
              ? { ...freebie, ...updates, updatedAt: new Date().toISOString() }
              : freebie
          )
        }));
      },
      
      deleteFreebie: (id) => {
        set((state) => ({
          freebies: state.freebies.filter((freebie) => freebie.id !== id)
        }));
      },
      
      setSearchTerm: (term) => set({ searchTerm: term }),
      setSelectedCategory: (category) => set({ selectedCategory: category }),
      setSortBy: (sortBy) => set({ sortBy }),
      setSortOrder: (order) => set({ sortOrder: order }),
      
      getFilteredBooks: () => {
        const { books, searchTerm, selectedCategory, sortBy, sortOrder } = get();
        
        let filtered = books.filter((book) => {
          const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                               book.description.toLowerCase().includes(searchTerm.toLowerCase());
          const matchesCategory = selectedCategory === 'All' || book.category === selectedCategory;
          return matchesSearch && matchesCategory;
        });
        
        filtered.sort((a, b) => {
          let aValue = a[sortBy];
          let bValue = b[sortBy];
          
          if (typeof aValue === 'string') {
            aValue = aValue.toLowerCase();
            bValue = (bValue as string).toLowerCase();
          }
          
          if (sortOrder === 'asc') {
            return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
          } else {
            return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
          }
        });
        
        return filtered;
      },

      getFilteredFreebies: () => {
        const { freebies, searchTerm, selectedCategory, sortBy, sortOrder } = get();
        
        let filtered = freebies.filter((freebie) => {
          const matchesSearch = freebie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                               freebie.description.toLowerCase().includes(searchTerm.toLowerCase());
          const matchesCategory = selectedCategory === 'All' || freebie.category === selectedCategory;
          return matchesSearch && matchesCategory;
        });
        
        filtered.sort((a, b) => {
          let aValue = a[sortBy];
          let bValue = b[sortBy];
          
          if (typeof aValue === 'string') {
            aValue = aValue.toLowerCase();
            bValue = (bValue as string).toLowerCase();
          }
          
          if (sortOrder === 'asc') {
            return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
          } else {
            return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
          }
        });
        
        return filtered;
      },
      
      getDashboardStats: () => {
        const { books, freebies } = get();
        return {
          totalBooks: books.length,
          publishedBooks: books.filter(book => book.status === 'published').length,
          draftBooks: books.filter(book => book.status === 'draft').length,
          featuredBooks: books.filter(book => book.featured).length,
          totalFreebies: freebies.length,
          publishedFreebies: freebies.filter(freebie => freebie.status === 'published').length
        };
      },
      
      exportBooks: () => {
        const { books } = get();
        return JSON.stringify(books, null, 2);
      },
      
      importBooks: (jsonData) => {
        try {
          const importedBooks = JSON.parse(jsonData);
          if (Array.isArray(importedBooks)) {
            set({ books: importedBooks });
            return true;
          }
          return false;
        } catch {
          return false;
        }
      },

      exportFreebies: () => {
        const { freebies } = get();
        return JSON.stringify(freebies, null, 2);
      },
      
      importFreebies: (jsonData) => {
        try {
          const importedFreebies = JSON.parse(jsonData);
          if (Array.isArray(importedFreebies)) {
            set({ freebies: importedFreebies });
            return true;
          }
          return false;
        } catch {
          return false;
        }
      }
    }),
    {
      name: 'book-storage'
    }
  )
);