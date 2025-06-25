import React, { useState } from 'react';
import { Mail, Facebook, Instagram, Twitter, BookOpen, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand Section */}
          <div>
            <div className="flex items-center mb-6">
              <BookOpen className="w-8 h-8 text-purple-400 mr-3" />
              <h3 className="text-2xl font-bold">BookHaven</h3>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6">
              Creating beautiful, engaging books that inspire creativity and learning for readers of all ages.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-3 bg-gray-800 hover:bg-purple-600 rounded-full transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="p-3 bg-gray-800 hover:bg-purple-600 rounded-full transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-3 bg-gray-800 hover:bg-purple-600 rounded-full transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#books" className="text-gray-400 hover:text-white transition-colors">Browse Books</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">New Releases</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Best Sellers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h4 className="text-xl font-semibold mb-6">Stay Updated</h4>
            <p className="text-gray-400 mb-6">
              Subscribe to get notified about new book releases and special offers.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 text-white"
                  required
                />
                <Mail className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                {subscribed ? 'Subscribed!' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400 flex items-center justify-center">
            © 2024 BookHaven. Made with <Heart className="w-4 h-4 text-red-500 mx-2" /> for book lovers everywhere.
          </p>
        </div>
      </div>
    </footer>
  );
};