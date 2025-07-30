import React from 'react';
import { User, ChevronDown, ChevronUp } from 'lucide-react';

interface ClientData {
  name: string;
  email: string;
  phone: string;
  currentAddress: string;
  budget: string;
  liquidFundsForPurchase: string;
  timeframe: string;
  location: string;
  propertyType: string[];
  houseStyle: string;
  bedrooms: string;
  bathrooms: string;
  squareFootage: string;
  amenities: string[];
  mustHaveFeatures: string;
  dealBreakers: string;
  motivation: string;
  currentLiving: string;
  firstTimeBuyer: string;
  additionalBuyers: string;
  monthlyIncome: string;
  employmentStatus: string;
  creditScore: string;
  specialRequirements: string;
}

interface IntakeFormProps {
  clientData: ClientData;
  setClientData: (data: ClientData) => void;
  formSubmitted: boolean;
  setFormSubmitted: (submitted: boolean) => void;
  isEditing: boolean;
  setIsEditing: (editing: boolean) => void;
  isMinimized: boolean;
  setIsMinimized: (minimized: boolean) => void;
}

const IntakeForm: React.FC<IntakeFormProps> = ({ 
  clientData, 
  setClientData, 
  formSubmitted, 
  setFormSubmitted, 
  isEditing, 
  setIsEditing, 
  isMinimized, 
  setIsMinimized 
}) => { 
  const handlePropertyTypeChange = (property: string) => {
    setClientData(prev => ({
      ...prev, 
      propertyType: prev.propertyType.includes(property) 
        ? prev.propertyType.filter(p => p !== property) 
        : [...prev.propertyType, property]
    }));
  };
  
  const propertyTypeOptions = ['Single Family Home', 'Condominium', 'Townhouse', 'Multi-Family', 'New Construction', 'Land/Lot', 'Other'];
  const amenityOptions = ['Pool', 'Gym/Fitness Center', 'Playground', 'Walking Trails', 'Pet Area', 'Security System', 'Gated Community', 'HOA Amenities', 'Near Schools', 'Near Shopping', 'Public Transportation', 'Quiet Neighborhood'];
  
  const handleSubmit = (e: React.FormEvent) => { 
    e.preventDefault(); 
    if (!clientData.name || !clientData.email || !clientData.phone || !clientData.budget || !clientData.location || clientData.propertyType.length === 0) { 
      alert("Please fill all required fields, including at least one Property Type."); 
      return; 
    } 
    setFormSubmitted(true); 
    setIsEditing(false); 
    setIsMinimized(true); 
  };
  
  const handleEdit = () => { 
    setIsEditing(true); 
    setIsMinimized(false); 
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => { 
    const { id, value } = e.target; 
    setClientData(prev => ({ ...prev, [id]: value }));
  };
  
  const handleAmenityCheckboxChange = (amenity: string) => { 
    setClientData(prev => ({ 
      ...prev, 
      amenities: prev.amenities.includes(amenity) 
        ? prev.amenities.filter(a => a !== amenity) 
        : [...prev.amenities, amenity] 
    })); 
  };
  
  const sectionHeaderStyle = "text-base font-semibold text-gray-700 mb-3 border-b-2 border-blue-200 pb-2 pt-3 px-3 bg-blue-50 rounded-t-md";

  if (formSubmitted && !isEditing) { 
    return (
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold flex items-center">
            <User className="w-5 h-5 mr-2 text-blue-600" />
            Client Intake Summary
          </h3>
          <button onClick={handleEdit} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm">
            Edit Information
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 text-sm">
          <div><strong className="font-medium text-gray-600">Name:</strong> {clientData.name || 'N/A'}</div>
          <div><strong className="font-medium text-gray-600">Email:</strong> {clientData.email || 'N/A'}</div>
          <div><strong className="font-medium text-gray-600">Phone:</strong> {clientData.phone || 'N/A'}</div>
          <div><strong className="font-medium text-gray-600">Current Address:</strong> {clientData.currentAddress || 'N/A'}</div>
          <div><strong className="font-medium text-gray-600">First-time Buyer:</strong> {clientData.firstTimeBuyer || 'N/A'}</div>
          <div><strong className="font-medium text-gray-600">Additional Buyers:</strong> {clientData.additionalBuyers || 'N/A'}</div>
          <div className="md:col-span-2 my-2"><hr/></div>
          <div><strong className="font-medium text-gray-600">Budget Range:</strong> {clientData.budget || 'N/A'}</div>
          <div><strong className="font-medium text-gray-600">Liquid Funds:</strong> {clientData.liquidFundsForPurchase || 'N/A'}</div>
          <div><strong className="font-medium text-gray-600">Monthly Gross Income:</strong> {clientData.monthlyIncome || 'N/A'}</div>
          <div><strong className="font-medium text-gray-600">Credit Score:</strong> {clientData.creditScore || 'N/A'}</div>
          <div><strong className="font-medium text-gray-600">Employment:</strong> {clientData.employmentStatus || 'N/A'}</div>
          <div className="md:col-span-2 my-2"><hr/></div>
          <div><strong className="font-medium text-gray-600">Preferred Location:</strong> {clientData.location || 'N/A'}</div>
          <div className="md:col-span-2"><strong className="font-medium text-gray-600">Property Types:</strong> {clientData.propertyType.join(', ') || 'N/A'}</div>
          <div><strong className="font-medium text-gray-600">Min. Bedrooms:</strong> {clientData.bedrooms || 'N/A'}</div>
          <div><strong className="font-medium text-gray-600">Min. Bathrooms:</strong> {clientData.bathrooms || 'N/A'}</div>
          <div><strong className="font-medium text-gray-600">Sq. Footage:</strong> {clientData.squareFootage || 'N/A'}</div>
          <div><strong className="font-medium text-gray-600">House Style:</strong> {clientData.houseStyle || 'N/A'}</div>
          {clientData.amenities.length > 0 && (
            <div className="mt-2 md:col-span-2">
              <strong className="font-medium text-gray-600 block mb-1">Desired Amenities:</strong>
              <div className="flex flex-wrap gap-1.5">
                {clientData.amenities.map(amenity => (
                  <span key={amenity} className="bg-sky-100 text-sky-800 px-2 py-0.5 rounded text-sm">{amenity}</span>
                ))}
              </div>
            </div>
          )}
          <div className="md:col-span-2 my-2"><hr/></div>
          <div className="md:col-span-2"><strong className="font-medium text-gray-600">Timeframe:</strong> {clientData.timeframe || 'N/A'}</div>
          <div className="md:col-span-2">
            <strong className="font-medium text-gray-600">Motivation:</strong>
            <p className="text-gray-700 inline whitespace-pre-wrap ml-1">{clientData.motivation || 'N/A'}</p>
          </div>
          <div className="md:col-span-2"><strong className="font-medium text-gray-600">Living Situation:</strong> {clientData.currentLiving || 'N/A'}</div>
          <div className="md:col-span-2 my-2"><hr/></div>
          {clientData.mustHaveFeatures && (
            <div className="mt-2 md:col-span-2">
              <strong className="font-medium text-gray-600 block mb-0.5">Must-Haves:</strong>
              <p className="text-gray-700 whitespace-pre-wrap">{clientData.mustHaveFeatures}</p>
            </div>
          )}
          {clientData.dealBreakers && (
            <div className="mt-2 md:col-span-2">
              <strong className="font-medium text-gray-600 block mb-0.5">Deal Breakers:</strong>
              <p className="text-gray-700 whitespace-pre-wrap">{clientData.dealBreakers}</p>
            </div>
          )}
          {clientData.specialRequirements && (
            <div className="mt-2 md:col-span-2">
              <strong className="font-medium text-gray-600 block mb-0.5">Special Needs:</strong>
              <p className="text-gray-700 whitespace-pre-wrap">{clientData.specialRequirements}</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return ( 
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="flex justify-between items-center p-4 border-b">
        <h3 className="text-xl font-semibold flex items-center text-gray-800">
          <User className="w-6 h-6 mr-3 text-blue-600" />
          Comprehensive Buyer Intake Form
        </h3>
        <button 
          onClick={() => setIsMinimized(!isMinimized)} 
          className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500 hover:text-gray-700" 
          aria-label={isMinimized ? "Expand form" : "Collapse form"}
        >
          {isMinimized ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
        </button>
      </div>

      {!isMinimized && (
        <form onSubmit={handleSubmit} className="space-y-6 p-6 text-sm"> 
          <section>
            <h4 className={sectionHeaderStyle}>Personal Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 p-3">
              <div>
                <label htmlFor="name" className="block font-medium mb-1">Full Name *</label>
                <input id="name" type="text" required value={clientData.name} onChange={handleInputChange} className="w-full p-2 border rounded-md"/>
              </div>
              <div>
                <label htmlFor="email" className="block font-medium mb-1">Email *</label>
                <input id="email" type="email" required value={clientData.email} onChange={handleInputChange} className="w-full p-2 border rounded-md"/>
              </div>
              <div>
                <label htmlFor="phone" className="block font-medium mb-1">Phone *</label>
                <input id="phone" type="tel" required value={clientData.phone} onChange={handleInputChange} className="w-full p-2 border rounded-md"/>
              </div>
              <div>
                <label htmlFor="currentAddress" className="block font-medium mb-1">Current Address</label>
                <input id="currentAddress" type="text" value={clientData.currentAddress} onChange={handleInputChange} className="w-full p-2 border rounded-md"/>
              </div>
              <div>
                <label htmlFor="firstTimeBuyer" className="block font-medium mb-1">Are you a first-time buyer?</label>
                <select id="firstTimeBuyer" value={clientData.firstTimeBuyer} onChange={handleInputChange} className="w-full p-2 border rounded-md">
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label htmlFor="additionalBuyers" className="block font-medium mb-1">Additional Buyers?</label>
                <input id="additionalBuyers" type="text" value={clientData.additionalBuyers} onChange={handleInputChange} className="w-full p-2 border rounded-md"/>
              </div>
            </div>
          </section>

          <section>
            <h4 className={sectionHeaderStyle}>Financial Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 p-3">
              <div>
                <label htmlFor="budget" className="block font-medium mb-1">Budget Range (e.g., $300k-$350k) *</label>
                <input id="budget" type="text" required value={clientData.budget} onChange={handleInputChange} className="w-full p-2 border rounded-md"/>
              </div>
              <div>
                <label htmlFor="liquidFundsForPurchase" className="block font-medium mb-1">Liquid Funds for Purchase</label>
                <input id="liquidFundsForPurchase" type="text" value={clientData.liquidFundsForPurchase} onChange={handleInputChange} className="w-full p-2 border rounded-md" placeholder="Down payment, closing costs"/>
              </div>
              <div>
                <label htmlFor="monthlyIncome" className="block font-medium mb-1">Total Monthly Gross Income</label>
                <input id="monthlyIncome" type="text" value={clientData.monthlyIncome} onChange={handleInputChange} className="w-full p-2 border rounded-md" placeholder="Combined for all applicants"/>
              </div>
              <div>
                <label htmlFor="creditScore" className="block font-medium mb-1">Credit Score Range</label>
                <select id="creditScore" value={clientData.creditScore} onChange={handleInputChange} className="w-full p-2 border rounded-md">
                  <option value="">Select</option>
                  <option value="750+">Excellent (750+)</option>
                  <option value="700-749">Good (700-749)</option>
                  <option value="650-699">Fair (650-699)</option>
                  <option value="600-649">Poor (600-649)</option>
                  <option value="Below 600">Below 600</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label htmlFor="employmentStatus" className="block font-medium mb-1">Employment Status</label>
                <select id="employmentStatus" value={clientData.employmentStatus} onChange={handleInputChange} className="w-full p-2 border rounded-md">
                  <option value="">Select</option>
                  <option value="full-time">Full-time</option>
                  <option value="self-employed">Self-employed</option>
                  <option value="part-time">Part-time</option>
                  <option value="contract">Contract</option>
                  <option value="unemployed">Unemployed</option>
                  <option value="retired">Retired</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </section>

          <section>
            <h4 className={sectionHeaderStyle}>Property Preferences</h4>
            <div className="p-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                <div>
                  <label htmlFor="location" className="block font-medium mb-1">Preferred Location/Area *</label>
                  <input id="location" type="text" required value={clientData.location} onChange={handleInputChange} className="w-full p-2 border rounded-md"/>
                </div>
                <div>
                  <label htmlFor="houseStyle" className="block font-medium mb-1">House Style Preference</label>
                  <select id="houseStyle" value={clientData.houseStyle} onChange={handleInputChange} className="w-full p-2 border rounded-md">
                    <option value="">Any</option>
                    <option value="ranch">Ranch</option>
                    <option value="two-story">Two Story</option>
                    <option value="modern">Modern</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="bedrooms" className="block font-medium mb-1">Minimum Bedrooms</label>
                  <select id="bedrooms" value={clientData.bedrooms} onChange={handleInputChange} className="w-full p-2 border rounded-md">
                    <option value="">Any</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5+">5+</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="bathrooms" className="block font-medium mb-1">Minimum Bathrooms</label>
                  <select id="bathrooms" value={clientData.bathrooms} onChange={handleInputChange} className="w-full p-2 border rounded-md">
                    <option value="">Any</option>
                    <option value="1">1</option>
                    <option value="1.5">1.5</option>
                    <option value="2">2</option>
                    <option value="2.5">2.5</option>
                    <option value="3+">3+</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="squareFootage" className="block font-medium mb-1">Square Footage Range</label>
                  <input id="squareFootage" type="text" value={clientData.squareFootage} onChange={handleInputChange} className="w-full p-2 border rounded-md"/>
                </div>
              </div>
              <div className="mt-4">
                <label className="block font-medium mb-2">Property Type * (Select all that apply)</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {propertyTypeOptions.map(type => (
                    <label key={type} className="flex items-center space-x-2 p-2 border rounded-md hover:bg-gray-50 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={clientData.propertyType.includes(type)} 
                        onChange={() => handlePropertyTypeChange(type)} 
                        className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm">{type}</span>
                    </label>
                  ))}
                </div>
                {clientData.propertyType.length === 0 && formSubmitted && <p className="text-red-500 text-xs mt-1">Required.</p>}
              </div>
            </div>
          </section>
          <section>
            <h4 className={sectionHeaderStyle}>Desired Amenities</h4>
            <div className="p-3">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2">
                {amenityOptions.map(amenity => (
                  <label key={amenity} className="flex items-center">
                    <input 
                      type="checkbox" 
                      checked={clientData.amenities.includes(amenity)} 
                      onChange={() => handleAmenityCheckboxChange(amenity)} 
                      className="mr-2 h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm">{amenity}</span>
                  </label>
                ))}
              </div>
            </div>
          </section>

          <section>
            <h4 className={sectionHeaderStyle}>Timeline & Motivation</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 p-3">
              <div>
                <label htmlFor="timeframe" className="block font-medium mb-1">Timeframe to Purchase</label>
                <select id="timeframe" value={clientData.timeframe} onChange={handleInputChange} className="w-full p-2 border rounded-md">
                  <option value="">Select</option>
                  <option value="immediately">Immediately</option>
                  <option value="1-3 months">1-3 months</option>
                </select>
              </div>
              <div>
                <label htmlFor="currentLiving" className="block font-medium mb-1">Current Living Situation</label>
                <select id="currentLiving" value={clientData.currentLiving} onChange={handleInputChange} className="w-full p-2 border rounded-md">
                  <option value="">Select</option>
                  <option value="renting">Renting</option>
                  <option value="own-selling">Own (Selling)</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label htmlFor="motivation" className="block font-medium mb-1">Motivation to buy?</label>
                <textarea id="motivation" value={clientData.motivation} onChange={handleInputChange} className="w-full p-2 border rounded-md" rows={3}/>
              </div>
            </div>
          </section>

          <section>
            <h4 className={sectionHeaderStyle}>Important Considerations</h4>
            <div className="space-y-4 p-3">
              <div>
                <label htmlFor="mustHaveFeatures" className="block font-medium mb-1">Must-Have Features</label>
                <textarea id="mustHaveFeatures" value={clientData.mustHaveFeatures} onChange={handleInputChange} className="w-full p-2 border rounded-md" rows={3}/>
              </div>
              <div>
                <label htmlFor="dealBreakers" className="block font-medium mb-1">Deal Breakers</label>
                <textarea id="dealBreakers" value={clientData.dealBreakers} onChange={handleInputChange} className="w-full p-2 border rounded-md" rows={3}/>
              </div>
              <div>
                <label htmlFor="specialRequirements" className="block font-medium mb-1">Special Requirements</label>
                <textarea id="specialRequirements" value={clientData.specialRequirements} onChange={handleInputChange} className="w-full p-2 border rounded-md" rows={3}/>
              </div>
            </div>
          </section>
          
          <div className="pt-6">
            <button type="submit" className="w-full bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 font-semibold text-base">
              Submit Intake Form
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default IntakeForm;