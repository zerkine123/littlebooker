import React, { useState } from 'react';
import { Search, Filter, Plus, Edit, Trash2, Eye, Star, ArrowUpDown } from 'lucide-react';
import { useBookStore } from '../../store/bookStore';
import { Book } from '../../types/Book';

interface BooksListProps {
  onEditBook: (book: Book) => void;
  onAddBook: () => void;
}

export const BooksList: React.FC<BooksListProps> = ({ onEditBook, onAddBook }) => {
  const {
    searchTerm,
    selectedCategory,
    sortBy,
    sortOrder,
    setSearchTerm,
    setSelectedCategory,
    setSortBy,
    setSortOrder,
    getFilteredBooks,
    deleteBook
  } = useBookStore();

  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);
  const filteredBooks = getFilteredBooks();

  const categories = ['All', 'Coloring Books', 'Activity Books', 'Educational', 'Journals'];

  const handleSort = (field: 'title' | 'createdAt' | 'updatedAt') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const handleDelete = (id: number) => {
    deleteBook(id);
    setShowDeleteConfirm(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Books Management</h1>
          <p className="text-gray-600">Manage your book collection</p>
        </div>
        <button
          onClick={onAddBook}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Book
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search books..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Sort by:</span>
            <button
              onClick={() => handleSort('title')}
              className={`px-3 py-1 text-sm rounded-md flex items-center ${
                sortBy === 'title' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600'
              }`}
            >
              Title
              {sortBy === 'title' && <ArrowUpDown className="w-3 h-3 ml-1" />}
            </button>
            <button
              onClick={() => handleSort('updatedAt')}
              className={`px-3 py-1 text-sm rounded-md flex items-center ${
                sortBy === 'updatedAt' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600'
              }`}
            >
              Updated
              {sortBy === 'updatedAt' && <ArrowUpDown className="w-3 h-3 ml-1" />}
            </button>
          </div>
        </div>
      </div>

      {/* Books Grid */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        {filteredBooks.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-4 px-6 font-medium text-gray-900">Book</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-900">Category</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-900">Status</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-900">Price</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-900">Updated</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredBooks.map((book) => (
                  <tr key={book.id} className="hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-4">
                        <img
                          src={book.coverImage}
                          alt={book.title}
                          className="w-12 h-16 object-cover rounded-md"
                        />
                        <div>
                          <h3 className="font-medium text-gray-900 flex items-center">
                            {book.title}
                            {book.featured && (
                              <Star className="w-4 h-4 text-yellow-500 fill-current ml-2" />
                            )}
                          </h3>
                          <p className="text-sm text-gray-500 line-clamp-1">
                            {book.description}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                        {book.category}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        book.status === 'published'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {book.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-gray-900 font-medium">
                      {book.price}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-500">
                      {formatDate(book.updatedAt)}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => onEditBook(book)}
                          className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                          title="Edit book"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <a
                          href={book.amazonUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View on Amazon"
                        >
                          <Eye className="w-4 h-4" />
                        </a>
                        <button
                          onClick={() => setShowDeleteConfirm(book.id)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete book"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No books found</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm || selectedCategory !== 'All'
                ? 'Try adjusting your search or filter criteria'
                : 'Get started by adding your first book'}
            </p>
            <button
              onClick={onAddBook}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300"
            >
              Add New Book
            </button>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Delete Book</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this book? This action cannot be undone.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(showDeleteConfirm)}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};