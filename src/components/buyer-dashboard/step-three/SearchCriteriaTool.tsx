import React from 'react';
import { Search } from 'lucide-react';

interface ClientData {
  location: string;
  propertyType: string[];
  bedrooms: string;
  bathrooms: string;
  squareFootage: string;
  houseStyle: string;
  amenities: string[];
  mustHaveFeatures: string;
}

interface SearchCriteriaToolProps {
  clientData: ClientData;
  setActiveStep: (step: number) => void;
  setIsIntakeFormMinimized: (minimized: boolean) => void;
}

const SearchCriteriaTool: React.FC<SearchCriteriaToolProps> = ({ 
  clientData, 
  setActiveStep, 
  setIsIntakeFormMinimized 
}) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <Search className="w-5 h-5 mr-2 text-purple-600" />
        Search Criteria Overview
      </h3>
      <p className="text-gray-700 mb-3 text-sm">
        This is a summary of your preferences from the Intake Form. You can update them by editing the form.
      </p>
      <div className="space-y-2 text-sm">
        <div className="p-2.5 bg-gray-50 rounded-md">
          <strong className="font-medium text-gray-600">Location:</strong> {clientData.location || 'Not specified'}
        </div>
        <div className="p-2.5 bg-gray-50 rounded-md">
          <strong className="font-medium text-gray-600">Property Types:</strong> {clientData.propertyType.join(', ') || 'Any'}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="p-2.5 bg-gray-50 rounded-md">
            <strong className="font-medium text-gray-600">Min. Bedrooms:</strong> {clientData.bedrooms || 'Any'}
          </div>
          <div className="p-2.5 bg-gray-50 rounded-md">
            <strong className="font-medium text-gray-600">Min. Bathrooms:</strong> {clientData.bathrooms || 'Any'}
          </div>
        </div>
        <div className="p-2.5 bg-gray-50 rounded-md">
          <strong className="font-medium text-gray-600">Sq. Footage:</strong> {clientData.squareFootage || 'Not specified'}
        </div>
        <div className="p-2.5 bg-gray-50 rounded-md">
          <strong className="font-medium text-gray-600">House Style:</strong> {clientData.houseStyle || 'Any'}
        </div>
        {clientData.amenities?.length > 0 && (
          <div className="p-2.5 bg-gray-50 rounded-md">
            <strong className="font-medium text-gray-600">Desired Amenities:</strong> {clientData.amenities.join(', ')}
          </div>
        )}
        {clientData.mustHaveFeatures && (
          <div className="p-2.5 bg-gray-50 rounded-md">
            <strong className="font-medium text-gray-600">Must-Have Features:</strong>
            <p className="whitespace-pre-wrap text-sm mt-1">{clientData.mustHaveFeatures}</p>
          </div>
        )}
      </div>
      <button 
        onClick={() => { 
          setActiveStep(0); 
          setIsIntakeFormMinimized(false);
        }} 
        className="mt-4 w-full bg-purple-100 text-purple-700 px-4 py-2.5 rounded-md hover:bg-purple-200 transition-colors text-sm"
      >
        Edit Preferences (Go to Intake Form)
      </button>
    </div>
  );
};

export default SearchCriteriaTool;