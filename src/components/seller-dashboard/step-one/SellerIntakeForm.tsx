import React from 'react';
import { User, ChevronDown, ChevronUp } from 'lucide-react';

interface SellerData {
  name: string;
  email: string;
  phone: string;
  propertyAddress: string;
  propertyType: string;
  bedrooms: string;
  bathrooms: string;
  squareFootage: string;
  lotSize: string;
  yearBuilt: string;
  desiredPrice: string;
  timeframe: string;
  motivation: string;
  currentMortgage: string;
  moveOutDate: string;
}

interface SellerIntakeFormProps {
  sellerData: SellerData;
  setSellerData: (data: SellerData) => void;
  formSubmitted: boolean;
  setFormSubmitted: (submitted: boolean) => void;
  isEditing: boolean;
  setIsEditing: (editing: boolean) => void;
  isMinimized: boolean;
  setIsMinimized: (minimized: boolean) => void;
}

const SellerIntakeForm: React.FC<SellerIntakeFormProps> = ({ 
  sellerData, 
  setSellerData, 
  formSubmitted, 
  setFormSubmitted, 
  isEditing, 
  setIsEditing, 
  isMinimized, 
  setIsMinimized 
}) => { 
  const handleSubmit = (e: React.FormEvent) => { 
    e.preventDefault(); 
    if (!sellerData.name || !sellerData.email || !sellerData.propertyAddress) { 
      alert("Please fill in all required fields."); 
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
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => { 
    const { id, value } = e.target; 
    setSellerData(prev => ({ ...prev, [id]: value })); 
  };

  if (formSubmitted && !isEditing) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold flex items-center">
            <User className="w-5 h-5 mr-2 text-purple-600" />
            Seller Information Summary
          </h3>
          <button 
            onClick={handleEdit}
            className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors text-sm"
          >
            Edit Information
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 text-sm">
          <div><strong>Name:</strong> {sellerData.name}</div>
          <div><strong>Email:</strong> {sellerData.email}</div>
          <div><strong>Phone:</strong> {sellerData.phone}</div>
          <div><strong>Property Address:</strong> {sellerData.propertyAddress}</div>
          <div><strong>Property Type:</strong> {sellerData.propertyType}</div>
          <div><strong>Bedrooms:</strong> {sellerData.bedrooms}</div>
          <div><strong>Bathrooms:</strong> {sellerData.bathrooms}</div>
          <div><strong>Square Footage:</strong> {sellerData.squareFootage}</div>
          <div><strong>Year Built:</strong> {sellerData.yearBuilt}</div>
          <div><strong>Desired Price:</strong> {sellerData.desiredPrice}</div>
          <div><strong>Timeframe:</strong> {sellerData.timeframe}</div>
          <div><strong>Current Mortgage:</strong> {sellerData.currentMortgage}</div>
          <div className="md:col-span-2"><strong>Reason for Selling:</strong> {sellerData.motivation}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="flex justify-between items-center p-4 border-b">
        <h3 className="text-xl font-semibold flex items-center text-gray-800">
          <User className="w-6 h-6 mr-3 text-purple-600" />
          Comprehensive Seller Intake Form
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
            <h4 className="text-base font-semibold text-gray-700 mb-3 border-b-2 border-purple-200 pb-2 pt-3 px-3 bg-purple-50 rounded-t-md">Personal Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 p-3">
              <div>
                <label htmlFor="name" className="block font-medium mb-1">Full Name *</label>
                <input id="name" type="text" required value={sellerData.name} onChange={handleInputChange} className="w-full p-2 border rounded-md"/>
              </div>
              <div>
                <label htmlFor="email" className="block font-medium mb-1">Email *</label>
                <input id="email" type="email" required value={sellerData.email} onChange={handleInputChange} className="w-full p-2 border rounded-md"/>
              </div>
              <div>
                <label htmlFor="phone" className="block font-medium mb-1">Phone</label>
                <input id="phone" type="tel" value={sellerData.phone} onChange={handleInputChange} className="w-full p-2 border rounded-md"/>
              </div>
            </div>
          </section>
          
          <section>
            <h4 className="text-base font-semibold text-gray-700 mb-3 border-b-2 border-purple-200 pb-2 pt-3 px-3 bg-purple-50 rounded-t-md">Property Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 p-3">
              <div className="md:col-span-2">
                <label htmlFor="propertyAddress" className="block font-medium mb-1">Property Address *</label>
                <input id="propertyAddress" type="text" required value={sellerData.propertyAddress} onChange={handleInputChange} className="w-full p-2 border rounded-md"/>
              </div>
              <div>
                <label htmlFor="propertyType" className="block font-medium mb-1">Property Type</label>
                <select id="propertyType" value={sellerData.propertyType} onChange={handleInputChange} className="w-full p-2 border rounded-md">
                  <option value="">Select</option>
                  <option value="Single Family Home">Single Family Home</option>
                  <option value="Condominium">Condominium</option>
                  <option value="Townhouse">Townhouse</option>
                  <option value="Multi-Family">Multi-Family</option>
                </select>
              </div>
              <div>
                <label htmlFor="bedrooms" className="block font-medium mb-1">Bedrooms</label>
                <select id="bedrooms" value={sellerData.bedrooms} onChange={handleInputChange} className="w-full p-2 border rounded-md">
                  <option value="">Select</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5+">5+</option>
                </select>
              </div>
              <div>
                <label htmlFor="bathrooms" className="block font-medium mb-1">Bathrooms</label>
                <select id="bathrooms" value={sellerData.bathrooms} onChange={handleInputChange} className="w-full p-2 border rounded-md">
                  <option value="">Select</option>
                  <option value="1">1</option>
                  <option value="1.5">1.5</option>
                  <option value="2">2</option>
                  <option value="2.5">2.5</option>
                  <option value="3+">3+</option>
                </select>
              </div>
              <div>
                <label htmlFor="squareFootage" className="block font-medium mb-1">Square Footage</label>
                <input id="squareFootage" type="text" value={sellerData.squareFootage} onChange={handleInputChange} className="w-full p-2 border rounded-md" placeholder="e.g., 2,500"/>
              </div>
              <div>
                <label htmlFor="yearBuilt" className="block font-medium mb-1">Year Built</label>
                <input id="yearBuilt" type="number" value={sellerData.yearBuilt} onChange={handleInputChange} className="w-full p-2 border rounded-md" placeholder="1995"/>
              </div>
              <div>
                <label htmlFor="lotSize" className="block font-medium mb-1">Lot Size</label>
                <input id="lotSize" type="text" value={sellerData.lotSize} onChange={handleInputChange} className="w-full p-2 border rounded-md" placeholder="0.25 acres"/>
              </div>
            </div>
          </section>

          <section>
            <h4 className="text-base font-semibold text-gray-700 mb-3 border-b-2 border-purple-200 pb-2 pt-3 px-3 bg-purple-50 rounded-t-md">Selling Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 p-3">
              <div>
                <label htmlFor="desiredPrice" className="block font-medium mb-1">Desired Sale Price</label>
                <input id="desiredPrice" type="text" value={sellerData.desiredPrice} onChange={handleInputChange} className="w-full p-2 border rounded-md" placeholder="e.g., $450,000"/>
              </div>
              <div>
                <label htmlFor="timeframe" className="block font-medium mb-1">Selling Timeframe</label>
                <select id="timeframe" value={sellerData.timeframe} onChange={handleInputChange} className="w-full p-2 border rounded-md">
                  <option value="">Select</option>
                  <option value="ASAP">As soon as possible</option>
                  <option value="1-3 months">1-3 months</option>
                  <option value="3-6 months">3-6 months</option>
                  <option value="6+ months">6+ months</option>
                </select>
              </div>
              <div>
                <label htmlFor="currentMortgage" className="block font-medium mb-1">Current Mortgage Balance</label>
                <input id="currentMortgage" type="text" value={sellerData.currentMortgage} onChange={handleInputChange} className="w-full p-2 border rounded-md" placeholder="Approximate balance"/>
              </div>
              <div>
                <label htmlFor="moveOutDate" className="block font-medium mb-1">Preferred Move-Out Date</label>
                <input id="moveOutDate" type="date" value={sellerData.moveOutDate} onChange={handleInputChange} className="w-full p-2 border rounded-md"/>
              </div>
              <div className="md:col-span-2">
                <label htmlFor="motivation" className="block font-medium mb-1">Reason for Selling</label>
                <textarea id="motivation" value={sellerData.motivation} onChange={handleInputChange} className="w-full p-2 border rounded-md" rows={3} placeholder="e.g., Relocating for work, upgrading to larger home, downsizing..."/>
              </div>
            </div>
          </section>
          
          <div className="pt-6">
            <button type="submit" className="w-full bg-purple-600 text-white px-8 py-3 rounded-md hover:bg-purple-700 font-semibold text-base">Submit Intake Form</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default SellerIntakeForm;