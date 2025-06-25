import React from 'react';
import { X, ExternalLink, ShoppingCart } from 'lucide-react';
import { Book } from '../types/Book';

interface BookModalProps {
  book: Book;
  isOpen: boolean;
  onClose: () => void;
}

export const BookModal: React.FC<BookModalProps> = ({ book, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center rounded-t-2xl">
          <h2 className="text-2xl font-bold text-gray-800">{book.title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <img
                src={book.coverImage}
                alt={book.title}
                className="w-full rounded-xl shadow-lg mb-4"
              />
              <div className="flex gap-3">
                <a
                  href={book.amazonUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Buy on Amazon - {book.price}
                </a>
                <a
                  href={book.amazonUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            <div>
              <div className="mb-6">
                <span className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
                  {book.category}
                </span>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {book.description}
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Preview Pages</h3>
                <div className="grid grid-cols-1 gap-4">
                  {book.previewImages.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${book.title} preview ${index + 1}`}
                      className="w-full rounded-lg shadow-md hover:shadow-lg transition-shadow"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};