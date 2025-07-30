import React, { useState } from 'react';
import { TrendingUp, PlusCircle, X } from 'lucide-react';

interface OfferTrackItem {
  id: number;
  date: string;
  type: string;
  price: string;
  keyTerms: string;
  status: string;
  notes: string;
}

interface OfferTrackerToolProps {
  offerTrackItems: OfferTrackItem[];
  onAddOfferTrackItem: (item: OfferTrackItem) => void;
}

const OfferTrackerTool: React.FC<OfferTrackerToolProps> = ({ 
  offerTrackItems, 
  onAddOfferTrackItem 
}) => {
  const [showModal, setShowModal] = useState(false);
  const [newItem, setNewItem] = useState({ 
    date: new Date().toISOString().split('T')[0], 
    type: 'Offer', 
    price: '', 
    keyTerms: '', 
    status: 'Submitted', 
    notes: '' 
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => { 
    const { name, value } = e.target; 
    setNewItem(prev => ({ ...prev, [name]: value }));
  };

  const handleAddItem = () => { 
    onAddOfferTrackItem({ ...newItem, id: Date.now() }); 
    setShowModal(false); 
    setNewItem({ 
      date: new Date().toISOString().split('T')[0], 
      type: 'Offer', 
      price: '', 
      keyTerms: '', 
      status: 'Submitted', 
      notes: '' 
    });
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border mt-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold flex items-center">
          <TrendingUp size={20} className="mr-2 text-pink-600" />
          Negotiation Tracker
        </h3>
        <button 
          onClick={() => setShowModal(true)} 
          className="bg-pink-500 hover:bg-pink-600 text-white px-3 py-1.5 rounded-md text-sm flex items-center"
        >
          <PlusCircle size={16} className="mr-1.5"/>
          Log Offer/Counter
        </button>
      </div>
      
      {offerTrackItems.length === 0 ? (
        <p className="text-sm text-gray-500">No offers or counters logged yet.</p>
      ) : (
        <div className="space-y-3 text-sm">
          {offerTrackItems.map(item => (
            <div key={item.id} className="p-3 border rounded-md bg-pink-50 border-pink-200">
              <div className="flex justify-between items-start">
                <p className="font-semibold text-pink-700">{item.type} - ${parseFloat(item.price).toLocaleString()}</p>
                <span className="text-sm text-pink-600">{item.date}</span>
              </div>
              <p className="text-sm mt-1"><strong className="text-gray-600">Status:</strong> {item.status}</p>
              {item.keyTerms && <p className="text-sm mt-1"><strong className="text-gray-600">Key Terms:</strong> {item.keyTerms}</p>}
              {item.notes && <p className="text-sm mt-1 bg-white p-1.5 rounded"><strong className="text-gray-600">Notes:</strong> {item.notes}</p>}
            </div>
          ))}
        </div>
      )}
      
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 z-50 flex justify-center items-center p-4">
          <div className="bg-white p-5 md:p-7 rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-semibold">Log New Entry</h4>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20}/>
              </button>
            </div>
            <div className="space-y-3 text-sm">
              <div>
                <label htmlFor="ot-date" className="block font-medium mb-1">Date</label>
                <input type="date" name="date" id="ot-date" value={newItem.date} onChange={handleInputChange} className="mt-1 w-full p-2 border rounded-md"/>
              </div>
              <div>
                <label htmlFor="ot-type" className="block font-medium mb-1">Type</label>
                <select name="type" id="ot-type" value={newItem.type} onChange={handleInputChange} className="mt-1 w-full p-2 border rounded-md">
                  <option>Offer</option>
                  <option>Counter-Offer (Seller)</option>
                  <option>Counter-Offer (Buyer)</option>
                  <option>Response</option>
                </select>
              </div>
              <div>
                <label htmlFor="ot-price" className="block font-medium mb-1">Price</label>
                <input type="number" name="price" id="ot-price" value={newItem.price} onChange={handleInputChange} className="mt-1 w-full p-2 border rounded-md"/>
              </div>
              <div>
                <label htmlFor="ot-keyTerms" className="block font-medium mb-1">Key Terms/Contingencies</label>
                <textarea name="keyTerms" id="ot-keyTerms" value={newItem.keyTerms} onChange={handleInputChange} rows={2} className="mt-1 w-full p-2 border rounded-md"/>
              </div>
              <div>
                <label htmlFor="ot-status" className="block font-medium mb-1">Status</label>
                <select name="status" id="ot-status" value={newItem.status} onChange={handleInputChange} className="mt-1 w-full p-2 border rounded-md">
                  <option>Submitted</option>
                  <option>Received</option>
                  <option>Accepted</option>
                  <option>Rejected</option>
                  <option>Countered by Buyer</option>
                  <option>Countered by Seller</option>
                  <option>Withdrawn</option>
                </select>
              </div>
              <div>
                <label htmlFor="ot-notes" className="block font-medium mb-1">Notes</label>
                <textarea name="notes" id="ot-notes" value={newItem.notes} onChange={handleInputChange} rows={2} className="mt-1 w-full p-2 border rounded-md"/>
              </div>
              <div className="flex justify-end space-x-3 pt-3">
                <button onClick={() => setShowModal(false)} className="px-4 py-2 text-sm rounded-md border hover:bg-gray-50">Cancel</button>
                <button onClick={handleAddItem} className="px-4 py-2 text-sm rounded-md bg-pink-600 text-white hover:bg-pink-700">Add Entry</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OfferTrackerTool;