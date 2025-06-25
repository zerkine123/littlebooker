import React, { useState } from 'react';
import { Download, Eye, Gift } from 'lucide-react';
import { FreebieCard } from './FreebieCard';
import { FreebieModal } from './FreebieModal';
import { Freebie } from '../types/Book';

interface FreebiesSectionProps {
  freebies: Freebie[];
}

export const FreebiesSection: React.FC<FreebiesSectionProps> = ({ freebies }) => {
  const [selectedFreebie, setSelectedFreebie] = useState<Freebie | null>(null);

  if (freebies.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-gradient-to-b from-green-50 to-blue-50" id="freebies">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Gift className="w-4 h-4 mr-2" />
            Free Resources
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Free Downloads
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Enjoy these complimentary resources to get started on your creative journey
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {freebies.map((freebie) => (
            <FreebieCard
              key={freebie.id}
              freebie={freebie}
              onPreview={setSelectedFreebie}
            />
          ))}
        </div>
      </div>

      {selectedFreebie && (
        <FreebieModal
          freebie={selectedFreebie}
          isOpen={!!selectedFreebie}
          onClose={() => setSelectedFreebie(null)}
        />
      )}
    </section>
  );
};