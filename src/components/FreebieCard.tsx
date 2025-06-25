import React from 'react';
import { Eye, Download } from 'lucide-react';
import { Freebie } from '../types/Book';

interface FreebieCardProps {
  freebie: Freebie;
  onPreview: (freebie: Freebie) => void;
}

export const FreebieCard: React.FC<FreebieCardProps> = ({ freebie, onPreview }) => {
  return (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
      <div className="relative overflow-hidden">
        <img
          src={freebie.coverImage}
          alt={freebie.title}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4 bg-gradient-to-r from-green-400 to-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
          FREE
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-green-600 transition-colors">
          {freebie.title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
          {freebie.description}
        </p>
        
        <div className="flex gap-3">
          <button
            onClick={() => onPreview(freebie)}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-4 rounded-xl transition-colors duration-300 flex items-center justify-center"
          >
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </button>
          <a
            href={freebie.downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center transform hover:scale-105"
          >
            <Download className="w-4 h-4 mr-2" />
            Download
          </a>
        </div>
      </div>
    </div>
  );
};