import React, { useState } from 'react';
import { BookOpen, Menu, X } from 'lucide-react';
import { useSettingsStore } from '../store/settingsStore';

interface HeaderProps {
  onBrowseBooks: () => void;
  onBrowseFreebies: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onBrowseBooks, onBrowseFreebies }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { settings } = useSettingsStore();

  const navigation = [
    { name: 'Home', href: '#', action: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
    { name: 'Books', href: '#books', action: onBrowseBooks },
    { name: 'Freebies', href: '#freebies', action: onBrowseFreebies },
    { name: 'About', href: '#about', action: () => {} },
    { name: 'Contact', href: '#contact', action: () => {} }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <BookOpen className="w-8 h-8 text-purple-600 mr-3" />
            <h1 className="text-2xl font-bold text-gray-800">{settings.siteName}</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={item.action}
                className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-300"
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-purple-600 hover:bg-gray-100"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    item.action();
                    setIsMenuOpen(false);
                  }}
                  className="text-left text-gray-700 hover:text-purple-600 font-medium transition-colors duration-300"
                >
                  {item.name}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};