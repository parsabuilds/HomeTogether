import React, { useState } from 'react';
import { FileText, Edit } from 'lucide-react';

interface BuyerRepoAgreementProps {
  agreementUrl: string;
  setAgreementUrl: (url: string) => void;
}

const BuyerRepoAgreement: React.FC<BuyerRepoAgreementProps> = ({
  agreementUrl,
  setAgreementUrl
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempUrl, setTempUrl] = useState(agreementUrl || '');

  const handleSave = () => {
    setAgreementUrl(tempUrl);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempUrl(agreementUrl || '');
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border mt-8">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <FileText className="w-5 h-5 mr-2 text-green-600" />
        Buyer Representation Agreement
      </h3>
      <p className="text-gray-700 mb-3 text-sm">
        Please review and sign our buyer representation agreement to formalize our partnership.
      </p>
      <p className="text-sm text-gray-500 mb-4">
        To ensure we can start working together effectively and in compliance with brokerage policies, 
        please review and sign this agreement at your earliest convenience.
      </p>
      
      {isEditing ? (
        <div className="space-y-3">
          <div>
            <label htmlFor="agreement-url" className="block text-sm font-medium text-gray-700 mb-1">
              Agreement Document URL
            </label>
            <input
              id="agreement-url"
              type="url"
              value={tempUrl}
              onChange={(e) => setTempUrl(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md text-sm"
              placeholder="https://example.com/buyer-representation-agreement.pdf"
            />
          </div>
          <div className="flex space-x-3">
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors text-sm"
            >
              Save Link
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex space-x-3">
          {agreementUrl ? (
            <a
              href={agreementUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 text-white px-6 py-2.5 rounded-md hover:bg-green-700 transition-colors flex items-center text-sm"
            >
              <FileText className="w-4 h-4 mr-2" />
              Review & Sign Agreement
            </a>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 text-white px-6 py-2.5 rounded-md hover:bg-blue-700 transition-colors flex items-center text-sm"
            >
              <FileText className="w-4 h-4 mr-2" />
              Add Agreement Link
            </button>
          )}
          
          {agreementUrl && (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-gray-200 text-gray-700 px-4 py-2.5 rounded-md hover:bg-gray-300 transition-colors flex items-center text-sm"
            >
              <Edit size={16} className="w-4 h-4 mr-1" />
              Edit Link
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default BuyerRepoAgreement;