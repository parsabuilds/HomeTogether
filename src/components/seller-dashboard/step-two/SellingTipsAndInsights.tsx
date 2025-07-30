import React from 'react';
import { Award, FileBadge, BookOpen } from 'lucide-react';

const SellingTipsAndInsights: React.FC = () => { 
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <Award className="w-5 h-5 mr-2 text-purple-500" />
        Selling Success: Key Insights
      </h3>
      <div className="space-y-5 text-sm text-gray-700"> 
        <div>
          <h4 className="font-semibold text-gray-800 text-base">Setting the Right Price: Your Key to Success</h4>
          <p className="mt-1">Pricing your home correctly from the start attracts more buyers and often leads to faster sales at better prices. Overpricing can lead to your home sitting on the market and eventual price reductions.</p>
          <div className="mt-2 p-3 bg-purple-50 border-l-4 border-purple-500 text-purple-800 text-sm rounded-r-md"> 
            <strong className="font-semibold">Pro Tip:</strong> Homes priced within 5% of market value typically sell 2x faster than overpriced homes.
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-gray-800 text-base">First Impressions Matter: Curb Appeal</h4>
          <p className="mt-1">Buyers often decide within the first 8 seconds of seeing your home. Simple improvements like fresh paint, landscaping, and a clean entryway can significantly impact buyer interest.</p>
          <ul className="list-disc list-inside pl-4 mt-1 text-sm">
            <li>Fresh exterior paint or power washing</li>
            <li>Well-maintained landscaping and lawn</li>
            <li>Clean, welcoming entrance</li>
            <li>Remove personal items and clutter</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-gray-800 text-base">Timing Your Sale</h4>
          <p className="mt-1">Spring and early summer typically see the highest buyer activity, but market conditions vary by location. Your agent can provide local market timing insights.</p>
        </div>
        <div>
          <h4 className="font-semibold text-gray-800 text-base">Marketing Strategy</h4>
          <p className="mt-1">Professional photography, online listings, social media marketing, and traditional methods all work together to maximize your home's exposure to qualified buyers.</p>
        </div>
        <div className="pt-2">
          <h4 className="font-semibold text-gray-800 mb-2 text-base">Helpful Resources:</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm"> 
            <a href="#" onClick={(e) => e.preventDefault()} className="flex items-center p-2.5 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors">
              <FileBadge className="w-4 h-4 mr-2 text-gray-600 flex-shrink-0" />
              Seller's Disclosure Guide
            </a>
            <a href="#" onClick={(e) => e.preventDefault()} className="flex items-center p-2.5 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors">
              <BookOpen className="w-4 h-4 mr-2 text-gray-600 flex-shrink-0" />
              Home Staging Checklist
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellingTipsAndInsights;