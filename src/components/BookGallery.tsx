import React, { useState, useMemo } from 'react';
import { BookCard } from './BookCard';
import { FilterTabs } from './FilterTabs';
import { BookModal } from './BookModal';
import { Book, Category } from '../types/Book';

interface BookGalleryProps {
  books: Book[];
}

export const BookGallery: React.FC<BookGalleryProps> = ({ books }) => {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const categories: Category[] = ['All', 'Coloring Books', 'Activity Books', 'Educational', 'Journals'];

  const filteredBooks = useMemo(() => {
    if (activeCategory === 'All') return books;
    return books.filter(book => book.category === activeCategory);
  }, [books, activeCategory]);

  const featuredBooks = useMemo(() => {
    return books.filter(book => book.featured);
  }, [books]);

  return (
    <section className="py-20 bg-gradient-to-b from-white to-purple-50" id="books">
      <div className="max-w-7xl mx-auto px-6">
        {/* Featured Section */}
        {featuredBooks.length > 0 && (
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Featured Books</h2>
              <p className="text-xl text-gray-600">Our most popular and newest releases</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredBooks.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  onPreview={setSelectedBook}
                />
              ))}
            </div>
          </div>
        )}

        {/* All Books Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">All Books</h2>
          <p className="text-xl text-gray-600">Explore our complete collection</p>
        </div>

        <FilterTabs
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onPreview={setSelectedBook}
            />
          ))}
        </div>

        {filteredBooks.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-gray-500">No books found in this category.</p>
          </div>
        )}
      </div>

      {selectedBook && (
        <BookModal
          book={selectedBook}
          isOpen={!!selectedBook}
          onClose={() => setSelectedBook(null)}
        />
      )}
    </section>
  );
};