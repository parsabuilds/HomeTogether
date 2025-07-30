import React from 'react';
import { Edit, Edit3, Star } from 'lucide-react';

interface Property {
  id?: string | number;
  address: string;
  price: string;
  beds?: string;
  baths?: string;
  sqft?: string;
  imageUrl?: string;
  listingUrl?: string;
  notes?: string;
  scorecard?: {
    averageScore?: number;
  };
}

interface PropertyCardProps {
  property: Property;
  type: 'client' | 'agent';
  index: number;
  onOpenEdit: (type: string, index: number) => void;
  onOpenNotes: (type: string, index: number) => void;
  onOpenScorecard: (type: string, index: number) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ 
  property, 
  type, 
  index, 
  onOpenEdit, 
  onOpenNotes, 
  onOpenScorecard 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 flex flex-col h-full">
      <img 
        src={property.imageUrl || `https://placehold.co/600x400/E2E8F0/4A5568?text=${encodeURIComponent(property.address?.split(',')[0] || 'Property')}`} 
        alt={`Property at ${property.address}`} 
        className="w-full h-40 object-cover"
        onError={(e) => { 
          const target = e.target as HTMLImageElement;
          target.onerror = null; 
          target.src = `https://placehold.co/600x400/E2E8F0/4A5568?text=Image+Not+Found`; 
        }}
      />
      <div className="p-3 flex flex-col flex-grow">
        <h5 className="text-sm font-semibold text-gray-800 truncate" title={property.address}>
          {property.address || "N/A"}
        </h5>
        <p className="text-base font-bold text-blue-600 my-1">
          ${parseFloat(property.price || '0').toLocaleString()}
        </p>
        <p className="text-sm text-gray-500 mb-2">
          {property.beds ? `${property.beds} Bed${Number(property.beds) > 1 ? 's' : ''}` : ''}
          {property.beds && property.baths ? ' • ' : property.baths && !property.beds ? '' : ''}
          {property.baths ? `${property.baths} Bath${Number(property.baths) > 1 ? 's' : ''}` : ''}
          {(property.beds || property.baths) && property.sqft ? ' • ' : property.sqft && !(property.beds || property.baths) ? '' : ''}
          {property.sqft ? `${property.sqft} sqft` : ''}
        </p>
        {property.scorecard?.averageScore && property.scorecard.averageScore > 0 && (
          <div className="my-1.5 flex items-center text-sm">
            <Star size={16} className="mr-1 text-yellow-500 fill-yellow-500" />
            <span className="font-semibold text-gray-700">{property.scorecard.averageScore.toFixed(1)} / 5.0</span>
          </div>
        )}
        {property.notes && (
          <p className="text-sm text-gray-600 mt-1 p-1.5 bg-gray-50 rounded-md whitespace-pre-wrap max-h-12 overflow-y-auto text-ellipsis" title={property.notes}>
            <strong>Notes:</strong> {property.notes}
          </p>
        )}
        <div className="mt-auto pt-2 grid grid-cols-2 gap-2 text-sm">
          <button 
            onClick={() => onOpenEdit(type, index)} 
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-2 py-1.5 rounded-md flex items-center justify-center"
          >
            <Edit size={14} className="mr-1"/> Edit
          </button>
          <a 
            href={property.listingUrl || '#'} 
            target="_blank" 
            rel="noopener noreferrer" 
            className={`px-2 py-1.5 rounded-md text-center ${
              property.listingUrl 
                ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            View Details
          </a>
          <button 
            onClick={() => onOpenNotes(type, index)} 
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-2 py-1.5 rounded-md flex items-center justify-center"
          >
            <Edit3 size={14} className="mr-1"/> Notes
          </button>
          <button 
            onClick={() => onOpenScorecard(type, index)} 
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 px-2 py-1.5 rounded-md flex items-center justify-center"
          >
            <Star size={14} className="mr-1"/> Score
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;