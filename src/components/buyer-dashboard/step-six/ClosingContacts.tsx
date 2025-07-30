import React from 'react';
import { Phone } from 'lucide-react';

const ClosingContacts: React.FC = () => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border mt-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <Phone size={20} className="mr-2 text-teal-600"/>
        Key Closing Contacts
      </h3>
      <div className="space-y-2 text-sm">
        <p><strong className="font-medium">Lender:</strong> [Lender Name] - [Contact Info] - Placeholder</p>
        <p><strong className="font-medium">Closing Attorney/Escrow:</strong> [Company Name] - [Contact Info] - Placeholder</p>
        <p><strong className="font-medium">Your Agent:</strong> [Agent Name] - [Your Contact Info] - Placeholder</p>
      </div>
    </div>
  );
};

export default ClosingContacts;