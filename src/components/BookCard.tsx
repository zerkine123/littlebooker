import React from 'react';
import { Eye, ShoppingCart } from 'lucide-react';
import { Book } from '../types/Book';

interface BookCardProps {
  book: Book;
  onPreview: (book: Book) => void;
}

export const BookCard: React.FC<BookCardProps> = ({ book, onPreview }) => {
  return (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
      <div className="relative overflow-hidden">
        <img
          src={book.coverImage}
          alt={book.title}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {book.featured && (
          <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Featured
          </div>
        )}
        <div className="absolute top-4 right-4 bg-white bg-opacity-90 text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">
          {book.price}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">
          {book.title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
          {book.description}
        </p>
        
        <div className="flex gap-3">
          <button
            onClick={() => onPreview(book)}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-4 rounded-xl transition-colors duration-300 flex items-center justify-center"
          >
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </button>
          <a
            href={book.amazonUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center transform hover:scale-105"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Buy Now
          </a>
        </div>
      </div>
    </div>
  );
};