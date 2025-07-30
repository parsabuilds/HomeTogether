import React from 'react';
import { Users } from 'lucide-react';

const RecommendedVendors: React.FC = () => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border mt-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <Users size={20} className="mr-2 text-indigo-600"/>
        Recommended Vendors
      </h3>
      <div className="space-y-4 text-sm">
        <div>
          <h4 className="text-base font-semibold text-gray-800">Home Inspectors:</h4>
          <p className="text-sm text-gray-600">Inspector Alpha (555-1212) - Thorough, detailed reports.</p>
          <p className="text-sm text-gray-600">Beta Inspections (555-3434) - Quick turnaround.</p>
        </div>
        <div>
          <h4 className="text-base font-semibold text-gray-800">Mortgage Lenders (if needed):</h4>
          <p className="text-sm text-gray-600">Lender Gamma (555-5656) - Great rates for FHA.</p>
        </div>
        <div>
          <h4 className="text-base font-semibold text-gray-800">Insurance Agents:</h4>
          <p className="text-sm text-gray-600">Delta Insurance (555-7878) - Bundling discounts.</p>
        </div>
        <div>
          <h4 className="text-base font-semibold text-gray-800">Contractors/Handymen:</h4>
          <p className="text-sm text-gray-600">Epsilon Repairs (555-9090) - Reliable for small jobs.</p>
        </div>
      </div>
    </div>
  );
};

export default RecommendedVendors;