import React, { useState } from 'react';
import { Search, Filter, Plus, Edit, Trash2, Eye, Download, ArrowUpDown } from 'lucide-react';
import { useBookStore } from '../../store/bookStore';
import { Freebie } from '../../types/Book';

interface FreebiesListProps {
  onEditFreebie: (freebie: Freebie) => void;
  onAddFreebie: () => void;
}

export const FreebiesList: React.FC<FreebiesListProps> = ({ onEditFreebie, onAddFreebie }) => {
  const {
    searchTerm,
    selectedCategory,
    sortBy,
    sortOrder,
    setSearchTerm,
    setSelectedCategory,
    setSortBy,
    setSortOrder,
    getFilteredFreebies,
    deleteFreebie
  } = useBookStore();

  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);
  const filteredFreebies = getFilteredFreebies();

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
    deleteFreebie(id);
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
          <h1 className="text-2xl font-bold text-gray-900">Freebies Management</h1>
          <p className="text-gray-600">Manage your free resources and downloads</p>
        </div>
        <button
          onClick={onAddFreebie}
          className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Freebie
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search freebies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none"
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
                sortBy === 'title' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
              }`}
            >
              Title
              {sortBy === 'title' && <ArrowUpDown className="w-3 h-3 ml-1" />}
            </button>
            <button
              onClick={() => handleSort('updatedAt')}
              className={`px-3 py-1 text-sm rounded-md flex items-center ${
                sortBy === 'updatedAt' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
              }`}
            >
              Updated
              {sortBy === 'updatedAt' && <ArrowUpDown className="w-3 h-3 ml-1" />}
            </button>
          </div>
        </div>
      </div>

      {/* Freebies Grid */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        {filteredFreebies.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-4 px-6 font-medium text-gray-900">Freebie</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-900">Category</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-900">Status</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-900">Updated</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredFreebies.map((freebie) => (
                  <tr key={freebie.id} className="hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-4">
                        <img
                          src={freebie.coverImage}
                          alt={freebie.title}
                          className="w-12 h-16 object-cover rounded-md"
                        />
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {freebie.title}
                          </h3>
                          <p className="text-sm text-gray-500 line-clamp-1">
                            {freebie.description}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                        {freebie.category}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        freebie.status === 'published'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {freebie.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-500">
                      {formatDate(freebie.updatedAt)}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => onEditFreebie(freebie)}
                          className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Edit freebie"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <a
                          href={freebie.downloadUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Download"
                        >
                          <Download className="w-4 h-4" />
                        </a>
                        <button
                          onClick={() => setShowDeleteConfirm(freebie.id)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete freebie"
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
            <h3 className="text-lg font-medium text-gray-900 mb-2">No freebies found</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm || selectedCategory !== 'All'
                ? 'Try adjusting your search or filter criteria'
                : 'Get started by adding your first freebie'}
            </p>
            <button
              onClick={onAddFreebie}
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300"
            >
              Add New Freebie
            </button>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Delete Freebie</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this freebie? This action cannot be undone.
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