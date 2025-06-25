import React, { useRef, useState } from 'react';
import { Header } from './components/Header';
import { HeroSlider } from './components/HeroSlider';
import { BookGallery } from './components/BookGallery';
import { FreebiesSection } from './components/FreebiesSection';
import { Footer } from './components/Footer';
import { Dashboard } from './components/dashboard/Dashboard';
import { useBookStore } from './store/bookStore';
import { useRouter } from './hooks/useRouter';

function App() {
  const booksRef = useRef<HTMLDivElement>(null);
  const freebiesRef = useRef<HTMLDivElement>(null);
  const { books, freebies } = useBookStore();
  const { currentPath } = useRouter();

  // Filter only published books for the public site
  const publishedBooks = books.filter(book => book.status === 'published');
  const featuredBooks = publishedBooks.filter(book => book.featured);
  const publishedFreebies = freebies.filter(freebie => freebie.status === 'published');

  const scrollToBooks = () => {
    booksRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToFreebies = () => {
    freebiesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (currentPath === '/brittenrx') {
    return <Dashboard />;
  }

  return (
    <div className="min-h-screen">
      <Header onBrowseBooks={scrollToBooks} onBrowseFreebies={scrollToFreebies} />
      <HeroSlider books={featuredBooks} onBrowseBooks={scrollToBooks} />
      <div ref={booksRef}>
        <BookGallery books={publishedBooks} />
      </div>
      <div ref={freebiesRef}>
        <FreebiesSection freebies={publishedFreebies} />
      </div>
      <Footer />
    </div>
  );
}

export default App;