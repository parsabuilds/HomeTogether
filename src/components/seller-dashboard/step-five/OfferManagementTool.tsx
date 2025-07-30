import React, { useState } from 'react';
import { FileText, PlusCircle, X } from 'lucide-react';

interface Offer {
  id: number;
  buyerName: string;
  offerPrice: string;
  earnestMoney: string;
  closingDate: string;
  contingencies: string;
  status: string;
  notes: string;
  receivedDate: string;
}

interface OfferManagementToolProps {
  offers: Offer[];
  onAddOffer: (offer: Offer) => void;
}

const OfferManagementTool: React.FC<OfferManagementToolProps> = ({ offers, onAddOffer }) => {
  const [showModal, setShowModal] = useState(false);
  const [newOffer, setNewOffer] = useState({
    buyerName: '',
    offerPrice: '',
    earnestMoney: '',
    closingDate: '',
    contingencies: '',
    status: 'Received',
    notes: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewOffer(prev => ({ ...prev, [name]: value }));
  };

  const handleAddOffer = () => {
    onAddOffer({ 
      ...newOffer, 
      id: Date.now(), 
      receivedDate: new Date().toISOString().split('T')[0] 
    } as Offer);
    setShowModal(false);
    setNewOffer({
      buyerName: '',
      offerPrice: '',
      earnestMoney: '',
      closingDate: '',
      contingencies: '',
      status: 'Received',
      notes: ''
    });
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold flex items-center">
          <FileText className="w-5 h-5 mr-2 text-purple-600" />
          Offer Management
        </h3>
        <button
          onClick={() => setShowModal(true)}
          className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1.5 rounded-md text-sm flex items-center"
        >
          <PlusCircle size={16} className="mr-1.5" />
          Add Offer
        </button>
      </div>
      {offers.length === 0 ? (
        <p className="text-sm text-gray-500">No offers received yet.</p>
      ) : (
        <div className="space-y-3 text-sm">
          {offers.map(offer => (
            <div key={offer.id} className="p-3 border rounded-md bg-purple-50 border-purple-200">
              <div className="flex justify-between items-start mb-2">
                <p className="font-semibold text-purple-700">{offer.buyerName}</p>
                <span className="text-sm text-purple-600">{offer.receivedDate}</span>
              </div>
              <p className="text-lg font-bold text-gray-900">${parseFloat(offer.offerPrice).toLocaleString()}</p>
              <p className="text-sm mt-1"><strong>Earnest Money:</strong> ${parseFloat(offer.earnestMoney || '0').toLocaleString()}</p>
              <p className="text-sm"><strong>Closing Date:</strong> {offer.closingDate}</p>
              <p className="text-sm"><strong>Status:</strong> {offer.status}</p>
              {offer.contingencies && <p className="text-sm"><strong>Contingencies:</strong> {offer.contingencies}</p>}
              {offer.notes && <p className="text-sm mt-1 bg-white p-1.5 rounded"><strong>Notes:</strong> {offer.notes}</p>}
            </div>
          ))}
        </div>
      )}
      
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 z-50 flex justify-center items-center p-4">
          <div className="bg-white p-5 md:p-7 rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-semibold">Add New Offer</h4>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            <div className="space-y-3 text-sm">
              <div>
                <label htmlFor="offer-buyerName" className="block font-medium mb-1">Buyer Name *</label>
                <input
                  type="text"
                  name="buyerName"
                  id="offer-buyerName"
                  value={newOffer.buyerName}
                  onChange={handleInputChange}
                  className="mt-1 w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="offer-offerPrice" className="block font-medium mb-1">Offer Price *</label>
                  <input
                    type="number"
                    name="offerPrice"
                    id="offer-offerPrice"
                    value={newOffer.offerPrice}
                    onChange={handleInputChange}
                    className="mt-1 w-full p-2 border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="offer-earnestMoney" className="block font-medium mb-1">Earnest Money</label>
                  <input
                    type="number"
                    name="earnestMoney"
                    id="offer-earnestMoney"
                    value={newOffer.earnestMoney}
                    onChange={handleInputChange}
                    className="mt-1 w-full p-2 border rounded-md"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="offer-closingDate" className="block font-medium mb-1">Proposed Closing Date</label>
                <input
                  type="date"
                  name="closingDate"
                  id="offer-closingDate"
                  value={newOffer.closingDate}
                  onChange={handleInputChange}
                  className="mt-1 w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label htmlFor="offer-contingencies" className="block font-medium mb-1">Contingencies</label>
                <textarea
                  name="contingencies"
                  id="offer-contingencies"
                  value={newOffer.contingencies}
                  onChange={handleInputChange}
                  rows={2}
                  className="mt-1 w-full p-2 border rounded-md"
                  placeholder="Inspection, financing, appraisal, etc."
                />
              </div>
              <div>
                <label htmlFor="offer-status" className="block font-medium mb-1">Status</label>
                <select
                  name="status"
                  id="offer-status"
                  value={newOffer.status}
                  onChange={handleInputChange}
                  className="mt-1 w-full p-2 border rounded-md"
                >
                  <option>Received</option>
                  <option>Under Review</option>
                  <option>Accepted</option>
                  <option>Countered</option>
                  <option>Rejected</option>
                </select>
              </div>
              <div>
                <label htmlFor="offer-notes" className="block font-medium mb-1">Notes</label>
                <textarea
                  name="notes"
                  id="offer-notes"
                  value={newOffer.notes}
                  onChange={handleInputChange}
                  rows={2}
                  className="mt-1 w-full p-2 border rounded-md"
                />
              </div>
              <div className="flex justify-end space-x-3 pt-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-sm rounded-md border hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddOffer}
                  className="px-4 py-2 text-sm rounded-md bg-purple-600 text-white hover:bg-purple-700"
                >
                  Add Offer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OfferManagementTool;