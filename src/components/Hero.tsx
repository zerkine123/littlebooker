import React from 'react';
import { BookOpen, Sparkles } from 'lucide-react';

interface HeroProps {
  onBrowseBooks: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBrowseBooks }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 text-purple-200 animate-bounce">
        <Sparkles size={24} />
      </div>
      <div className="absolute top-40 right-20 text-pink-200 animate-pulse">
        <BookOpen size={32} />
      </div>
      <div className="absolute bottom-32 left-20 text-blue-200 animate-bounce" style={{ animationDelay: '1s' }}>
        <Sparkles size={28} />
      </div>
      
      <div className="text-center px-6 max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-6 leading-tight">
            Explore Creative &
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              {' '}Fun Books
            </span>
            <br />
            for All Ages
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
            Discover our collection of engaging coloring books, activity guides, educational materials, 
            and journals designed to inspire creativity and learning.
          </p>
        </div>
        
        <button
          onClick={onBrowseBooks}
          className="group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-12 py-4 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <span className="flex items-center justify-center">
            Browse Books
            <BookOpen className="ml-2 w-5 h-5 group-hover:animate-pulse" />
          </span>
        </button>
      </div>
      
      {/* Floating book elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-16 h-20 bg-purple-200 rounded-md opacity-20 transform rotate-12 animate-float"></div>
        <div className="absolute top-3/4 right-1/3 w-12 h-16 bg-pink-200 rounded-md opacity-20 transform -rotate-12 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-14 h-18 bg-blue-200 rounded-md opacity-20 transform rotate-6 animate-float" style={{ animationDelay: '4s' }}></div>
      </div>
    </section>
  );
};