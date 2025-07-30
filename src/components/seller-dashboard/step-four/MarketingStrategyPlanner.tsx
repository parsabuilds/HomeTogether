import React, { useState } from 'react';
import { Camera } from 'lucide-react';

const MarketingStrategyPlanner: React.FC = () => {
  const [marketingChannels, setMarketingChannels] = useState<Record<number, boolean>>({});
  
  const channels = [
    { name: "Professional Photography", description: "High-quality photos for online listings" },
    { name: "MLS Listing", description: "Multiple Listing Service exposure" },
    { name: "Online Portals", description: "Zillow, Realtor.com, Redfin listings" },
    { name: "Social Media Marketing", description: "Facebook, Instagram promotion" },
    { name: "Open Houses", description: "Weekend open house events" },
    { name: "Agent Network", description: "Promote to other real estate agents" },
    { name: "Print Marketing", description: "Flyers, brochures, postcards" },
    { name: "Virtual Tour", description: "360° virtual home tour" }
  ];

  const toggleChannel = (index: number) => {
    setMarketingChannels(prev => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <Camera className="w-5 h-5 mr-2 text-purple-600" />
        Marketing Strategy Planner
      </h3>
      <p className="text-gray-600 text-sm mb-4">Select the marketing channels we'll use to promote your property:</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {channels.map((channel, index) => (
          <label key={index} className={`flex items-start p-3 rounded-lg border cursor-pointer transition-colors ${marketingChannels[index] ? 'bg-purple-50 border-purple-200' : 'hover:bg-gray-50 border-gray-200'}`}>
            <input
              type="checkbox"
              checked={!!marketingChannels[index]}
              onChange={() => toggleChannel(index)}
              className="h-4 w-4 text-purple-500 border-gray-300 rounded focus:ring-purple-400 mr-3 mt-0.5 flex-shrink-0"
            />
            <div>
              <span className="text-sm font-medium text-gray-900">{channel.name}</span>
              <p className="text-xs text-gray-600 mt-0.5">{channel.description}</p>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default MarketingStrategyPlanner;