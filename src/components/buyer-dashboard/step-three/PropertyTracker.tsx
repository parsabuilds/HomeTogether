import React from 'react';
import { PlusCircle } from 'lucide-react';
import PropertyCard from './PropertyCard';

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

interface PropertyTrackerProps {
  clientProperties: Property[];
  agentProperties: Property[];
  openAddPropertyModal: (type: 'client' | 'agent') => void;
  openEditPropertyModal: (type: string, index: number) => void;
  openNotesModal: (type: string, index: number) => void;
  openScorecardModal: (type: string, index: number) => void;
}

const PropertyTracker: React.FC<PropertyTrackerProps> = ({ 
  clientProperties, 
  agentProperties, 
  openAddPropertyModal, 
  openEditPropertyModal, 
  openNotesModal, 
  openScorecardModal 
}) => {
  return (
    <div className="space-y-6 mt-6">
      <section className="bg-white rounded-lg p-4 md:p-6 shadow-sm border">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-base font-semibold text-gray-700">Client's Interested Properties</h4>
          <button 
            onClick={() => openAddPropertyModal('client')} 
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-md text-sm flex items-center"
          >
            <PlusCircle size={16} className="mr-1.5" /> Add Property
          </button>
        </div>
        {clientProperties.length === 0 ? (
          <p className="text-sm text-gray-500">No properties added by client yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {clientProperties.map((prop, index) => (
              <PropertyCard 
                key={prop.id || index} 
                property={prop} 
                type="client" 
                index={index} 
                onOpenEdit={openEditPropertyModal} 
                onOpenNotes={openNotesModal} 
                onOpenScorecard={openScorecardModal} 
              />
            ))}
          </div>
        )}
      </section>
      
      <section className="bg-white rounded-lg p-4 md:p-6 shadow-sm border">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-base font-semibold text-gray-700">Agent's Recommended Properties</h4>
          <button 
            onClick={() => openAddPropertyModal('agent')} 
            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-md text-sm flex items-center"
          >
            <PlusCircle size={16} className="mr-1.5" /> Recommend
          </button>
        </div>
        {agentProperties.length === 0 ? (
          <p className="text-sm text-gray-500">No properties recommended by agent yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {agentProperties.map((prop, index) => (
              <PropertyCard 
                key={prop.id || index} 
                property={prop} 
                type="agent" 
                index={index} 
                onOpenEdit={openEditPropertyModal} 
                onOpenNotes={openNotesModal} 
                onOpenScorecard={openScorecardModal} 
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default PropertyTracker;