import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';

const MarketAnalysisCalculator: React.FC = () => { 
  const [homeAddress, setHomeAddress] = useState('');
  const [bedrooms, setBedrooms] = useState('3');
  const [bathrooms, setBathrooms] = useState('2');
  const [squareFootage, setSquareFootage] = useState('');
  const [lotSize, setLotSize] = useState('');
  const [yearBuilt, setYearBuilt] = useState('');
  const [estimatedValue, setEstimatedValue] = useState<number | null>(null);
  const [priceRange, setPriceRange] = useState<{low: number; high: number} | null>(null);

  const calculateEstimate = () => {
    const sqft = parseFloat(squareFootage) || 0;
    const beds = parseInt(bedrooms) || 0;
    const baths = parseFloat(bathrooms) || 0;
    const year = parseInt(yearBuilt) || new Date().getFullYear();
    
    if (sqft > 0) {
      // Simple estimation formula (in real app, use actual market data)
      const basePrice = sqft * 150; // $150 per sqft base
      const bedroomBonus = beds * 5000;
      const bathroomBonus = baths * 3000;
      const ageAdjustment = Math.max(0, (year - 1950) * 100);
      
      const estimated = basePrice + bedroomBonus + bathroomBonus + ageAdjustment;
      const variance = estimated * 0.1; // 10% variance
      
      setEstimatedValue(estimated);
      setPriceRange({
        low: estimated - variance,
        high: estimated + variance
      });
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <TrendingUp className="w-5 h-5 mr-2 text-purple-600" />
        Home Value Estimator
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-sm">
        <div className="md:col-span-2">
          <label htmlFor="homeAddress" className="block font-medium mb-1">Property Address</label>
          <input id="homeAddress" type="text" value={homeAddress} onChange={(e) => setHomeAddress(e.target.value)} className="w-full p-2 border rounded-md" placeholder="123 Main St, City, State"/>
        </div>
        <div>
          <label htmlFor="bedrooms" className="block font-medium mb-1">Bedrooms</label>
          <select id="bedrooms" value={bedrooms} onChange={(e) => setBedrooms(e.target.value)} className="w-full p-2 border rounded-md">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5+</option>
          </select>
        </div>
        <div>
          <label htmlFor="bathrooms" className="block font-medium mb-1">Bathrooms</label>
          <select id="bathrooms" value={bathrooms} onChange={(e) => setBathrooms(e.target.value)} className="w-full p-2 border rounded-md">
            <option value="1">1</option>
            <option value="1.5">1.5</option>
            <option value="2">2</option>
            <option value="2.5">2.5</option>
            <option value="3">3+</option>
          </select>
        </div>
        <div>
          <label htmlFor="squareFootage" className="block font-medium mb-1">Square Footage</label>
          <input id="squareFootage" type="number" value={squareFootage} onChange={(e) => setSquareFootage(e.target.value)} className="w-full p-2 border rounded-md" placeholder="2,000"/>
        </div>
        <div>
          <label htmlFor="yearBuilt" className="block font-medium mb-1">Year Built</label>
          <input id="yearBuilt" type="number" value={yearBuilt} onChange={(e) => setYearBuilt(e.target.value)} className="w-full p-2 border rounded-md" placeholder="1995"/>
        </div>
      </div>
      <button onClick={calculateEstimate} className="bg-purple-600 text-white px-6 py-2.5 rounded-md hover:bg-purple-700 transition-colors w-full md:w-auto text-sm">Calculate Estimated Value</button>
      {estimatedValue && (
        <div className="mt-6 p-4 bg-purple-50 rounded-md border border-purple-200">
          <h4 className="text-md font-semibold text-purple-800 mb-3">Estimated Market Value:</h4>
          <p className="text-2xl font-bold text-purple-800 mb-2">${estimatedValue.toLocaleString()}</p>
          {priceRange && (
            <p className="text-sm text-gray-600">
              Estimated Range: ${priceRange.low.toLocaleString()} - ${priceRange.high.toLocaleString()}
            </p>
          )}
          <p className="text-xs text-gray-500 mt-2">This is a basic estimate. Professional CMA recommended for accurate pricing.</p>
        </div>
      )}
    </div>
  );
};

export default MarketAnalysisCalculator;