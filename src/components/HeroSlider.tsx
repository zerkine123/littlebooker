import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, BookOpen, ShoppingCart } from 'lucide-react';
import { Book } from '../types/Book';

interface HeroSliderProps {
  books: Book[];
  onBrowseBooks: () => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ books, onBrowseBooks }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (books.length === 0) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % books.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [books.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % books.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + books.length) % books.length);
  };

  if (books.length === 0) {
    return (
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 pt-16">
        <div className="text-center px-6 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-6 leading-tight">
            Welcome to
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              {' '}BookHaven
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
            Discover our collection of engaging books and resources
          </p>
          <button
            onClick={onBrowseBooks}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-12 py-4 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Browse Books
          </button>
        </div>
      </section>
    );
  }

  const currentBook = books[currentSlide];

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 pt-16 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10 transition-all duration-1000"
        style={{ backgroundImage: `url(${currentBook.coverImage})` }}
      />
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <div className="text-center lg:text-left">
          <div className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
            Featured Book
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
            {currentBook.title}
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            {currentBook.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <a
              href={currentBook.amazonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-8 py-4 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Buy Now - {currentBook.price}
            </a>
            <button
              onClick={onBrowseBooks}
              className="bg-white hover:bg-gray-50 text-gray-800 font-semibold px-8 py-4 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border-2 border-gray-200 flex items-center justify-center"
            >
              <BookOpen className="w-5 h-5 mr-2" />
              View All Books
            </button>
          </div>
        </div>

        {/* Book Image */}
        <div className="relative">
          <div className="relative mx-auto max-w-md">
            <img
              src={currentBook.coverImage}
              alt={currentBook.title}
              className="w-full h-auto rounded-2xl shadow-2xl transform transition-all duration-1000 hover:scale-105"
            />
            <div className="absolute -top-4 -right-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-bold shadow-lg">
              Featured
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      {books.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Slide Indicators */}
      {books.length > 1 && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {books.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-purple-600 scale-125'
                  : 'bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
};