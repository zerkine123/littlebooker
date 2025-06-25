import React from 'react';
import { BookOpen, Eye, Edit, Star, TrendingUp, Gift } from 'lucide-react';
import { useBookStore } from '../../store/bookStore';

export const DashboardHome: React.FC = () => {
  const { getDashboardStats, books, freebies } = useBookStore();
  const stats = getDashboardStats();

  const recentBooks = books
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 3);

  const recentFreebies = freebies
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 3);

  const statCards = [
    {
      title: 'Total Books',
      value: stats.totalBooks,
      icon: BookOpen,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700'
    },
    {
      title: 'Published Books',
      value: stats.publishedBooks,
      icon: Eye,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700'
    },
    {
      title: 'Featured Books',
      value: stats.featuredBooks,
      icon: Star,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700'
    },
    {
      title: 'Total Freebies',
      value: stats.totalFreebies,
      icon: Gift,
      color: 'bg-orange-500',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-700'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome to your Dashboard</h1>
            <p className="text-purple-100 text-lg">
              Manage your book collection, freebies, and track your publishing success
            </p>
          </div>
          <TrendingUp className="w-16 h-16 text-purple-200" />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className={`${stat.bgColor} rounded-xl p-6 border border-gray-100`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                  <p className={`text-3xl font-bold ${stat.textColor}`}>{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Books */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Recent Books</h2>
            <p className="text-gray-600 mt-1">Your latest book updates</p>
          </div>
          <div className="p-6">
            {recentBooks.length > 0 ? (
              <div className="space-y-4">
                {recentBooks.map((book) => (
                  <div key={book.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      className="w-12 h-16 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{book.title}</h3>
                      <p className="text-sm text-gray-500">{book.category}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        book.status === 'published'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {book.status}
                      </span>
                      {book.featured && (
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No books yet. Create your first book to get started!</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Freebies */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Recent Freebies</h2>
            <p className="text-gray-600 mt-1">Your latest free resources</p>
          </div>
          <div className="p-6">
            {recentFreebies.length > 0 ? (
              <div className="space-y-4">
                {recentFreebies.map((freebie) => (
                  <div key={freebie.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <img
                      src={freebie.coverImage}
                      alt={freebie.title}
                      className="w-12 h-16 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{freebie.title}</h3>
                      <p className="text-sm text-gray-500">{freebie.category}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        freebie.status === 'published'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {freebie.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Gift className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No freebies yet. Create your first freebie to get started!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};