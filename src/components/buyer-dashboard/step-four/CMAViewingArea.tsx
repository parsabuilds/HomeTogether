import React, { useState } from 'react';
import { UploadCloud, ExternalLink } from 'lucide-react';

const CMAViewingArea: React.FC = () => {
  const [cmaUrl, setCmaUrl] = useState('');

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border mt-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <UploadCloud size={20} className="mr-2 text-pink-600" />
        CMA Viewing Area
      </h3>
      <div className="text-sm">
        <label htmlFor="cmaLink" className="block font-medium mb-1">
          Link to CMA Document (Agent to provide):
        </label>
        <input 
          id="cmaLink" 
          type="url" 
          value={cmaUrl} 
          onChange={(e) => setCmaUrl(e.target.value)} 
          className="w-full p-2 border rounded-md mb-2" 
          placeholder="https://link.to/cma_document.pdf"
        />
        {cmaUrl && (
          <a 
            href={cmaUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-blue-600 hover:text-blue-800 underline flex items-center text-sm"
          >
            <ExternalLink size={14} className="mr-1"/>
            View CMA Document
          </a>
        )}
      </div>
    </div>
  );
};

export default CMAViewingArea;