import { Book } from '../types/Book';

export const books: Book[] = [
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
  },
  {
    id: 4,
    title: "Mindful Gratitude Journal",
    description: "A beautifully designed journal with prompts for daily reflection, gratitude practice, and mindful living.",
    category: "Journals",
    coverImage: "https://images.pexels.com/photos/733856/pexels-photo-733856.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
    previewImages: [
      "https://images.pexels.com/photos/733856/pexels-photo-733856.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1925536/pexels-photo-1925536.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/4439444/pexels-photo-4439444.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    amazonUrl: "https://amazon.com/dp/example4",
    price: "$14.99",
    status: 'draft',
    createdAt: '2024-01-20T16:45:00Z',
    updatedAt: '2024-01-20T16:45:00Z'
  },
  {
    id: 5,
    title: "Ocean Adventures Coloring",
    description: "Dive into underwater worlds filled with sea creatures, coral reefs, and oceanic wonders to color and explore.",
    category: "Coloring Books",
    coverImage: "https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
    previewImages: [
      "https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/544966/pexels-photo-544966.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    amazonUrl: "https://amazon.com/dp/example5",
    price: "$10.99",
    status: 'published',
    createdAt: '2024-01-12T11:20:00Z',
    updatedAt: '2024-01-12T11:20:00Z'
  },
  {
    id: 6,
    title: "Space Explorer Activity Kit",
    description: "Blast off on cosmic adventures with space-themed activities, planet facts, and astronaut challenges.",
    category: "Activity Books",
    coverImage: "https://images.pexels.com/photos/41006/space-earth-galaxy-universe-41006.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
    previewImages: [
      "https://images.pexels.com/photos/41006/space-earth-galaxy-universe-41006.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/2159/flight-sky-earth-space.jpg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/87009/earth-sol-solar-system-planet-87009.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    amazonUrl: "https://amazon.com/dp/example6",
    price: "$11.99",
    featured: true,
    status: 'published',
    createdAt: '2024-01-08T15:45:00Z',
    updatedAt: '2024-01-08T15:45:00Z'
  }
];