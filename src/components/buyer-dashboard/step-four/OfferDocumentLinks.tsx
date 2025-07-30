import React from 'react';
import { FileBadge, Link as LinkIcon } from 'lucide-react';

const OfferDocumentLinks: React.FC = () => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border mt-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <FileBadge size={20} className="mr-2 text-pink-600" />
        Key Documents & Checklists
      </h3>
      <div className="space-y-2 text-sm">
        <a 
          href="#" 
          onClick={(e) => e.preventDefault()} 
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <LinkIcon size={14} className="mr-1.5"/> Sample Offer to Purchase Agreement (Generic)
        </a>
        <div>
          <h4 className="font-medium mt-2 mb-1 text-gray-700">Offer Submission Checklist:</h4>
          <ul className="list-disc list-inside pl-4 text-sm text-gray-600">
            <li>Updated Pre-Approval Letter</li>
            <li>Proof of Funds (for down payment/closing costs)</li>
            <li>Copy of Earnest Money Check/Wire Confirmation</li>
            <li>Valid Photo ID(s)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OfferDocumentLinks;