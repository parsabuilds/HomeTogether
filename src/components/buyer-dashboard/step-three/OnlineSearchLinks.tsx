import React from 'react';
import { Search, ExternalLink } from 'lucide-react';

const OnlineSearchLinks: React.FC = () => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border mt-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <Search className="w-5 h-5 mr-2 text-purple-600" />
        Popular Home Search Websites
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
        <a 
          href="https://www.zillow.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex items-center justify-center p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          <ExternalLink size={16} className="mr-2"/> Zillow
        </a>
        <a 
          href="https://www.realtor.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex items-center justify-center p-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
        >
          <ExternalLink size={16} className="mr-2"/> Realtor.com
        </a>
        <a 
          href="https://www.redfin.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex items-center justify-center p-3 bg-red-700 text-white rounded-md hover:bg-red-800 transition-colors"
        >
          <ExternalLink size={16} className="mr-2"/> Redfin
        </a>
      </div>
    </div>
  );
};

export default OnlineSearchLinks;