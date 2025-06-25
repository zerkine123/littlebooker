import React from 'react';
import { Category } from '../types/Book';

interface FilterTabsProps {
  categories: Category[];
  activeCategory: Category;
  onCategoryChange: (category: Category) => void;
}

export const FilterTabs: React.FC<FilterTabsProps> = ({
  categories,
  activeCategory,
  onCategoryChange,
}) => {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-12">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
            activeCategory === category
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
              : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-purple-300 hover:shadow-md'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};