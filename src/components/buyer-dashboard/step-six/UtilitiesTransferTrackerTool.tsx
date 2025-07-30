import React, { useState } from 'react';
import { Lightbulb, PlusCircle, X } from 'lucide-react';

interface UtilityItem {
  id: number;
  type: string;
  provider: string;
  account: string;
  scheduledDate: string;
  confirmation: string;
  status: string;
}

interface UtilitiesTransferTrackerToolProps {
  utilities: UtilityItem[];
  onAddUtility: (item: UtilityItem) => void;
}

const UtilitiesTransferTrackerTool: React.FC<UtilitiesTransferTrackerToolProps> = ({ 
  utilities, 
  onAddUtility 
}) => {
  const [showModal, setShowModal] = useState(false);
  const [newItem, setNewItem] = useState({ 
    type: 'Electricity', 
    provider: '', 
    account: '', 
    scheduledDate: '', 
    confirmation: '', 
    status: 'Pending' 
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => { 
    const { name, value } = e.target; 
    setNewItem(prev => ({ ...prev, [name]: value }));
  };

  const handleAdd = () => { 
    onAddUtility({ ...newItem, id: Date.now() }); 
    setShowModal(false); 
    setNewItem({ 
      type: 'Electricity', 
      provider: '', 
      account: '', 
      scheduledDate: '', 
      confirmation: '', 
      status: 'Pending' 
    });
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border mt-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold flex items-center">
          <Lightbulb size={20} className="mr-2 text-teal-600"/>
          Utilities & Services Transfer Tracker
        </h3>
        <button 
          onClick={() => setShowModal(true)} 
          className="bg-teal-500 hover:bg-teal-600 text-white px-3 py-1.5 rounded-md text-sm flex items-center"
        >
          <PlusCircle size={16} className="mr-1.5"/>
          Add Utility
        </button>
      </div>
      
      {utilities.length === 0 ? (
        <p className="text-sm text-gray-500">No utilities tracked yet.</p>
      ) : (
        <div className="space-y-3 text-sm">
          {utilities.map(util => (
            <div key={util.id} className="p-3 border rounded-md bg-teal-50 border-teal-200">
              <p className="font-semibold text-teal-700">{util.type} - {util.provider}</p>
              {util.account && <p className="text-sm mt-0.5"><strong className="text-gray-600">Account #:</strong> {util.account}</p>}
              {util.scheduledDate && <p className="text-sm"><strong className="text-gray-600">Scheduled:</strong> {util.scheduledDate}</p>}
              {util.confirmation && <p className="text-sm"><strong className="text-gray-600">Confirmation #:</strong> {util.confirmation}</p>}
              <p className="text-sm mt-0.5"><strong className="text-gray-600">Status:</strong> {util.status}</p>
            </div>
          ))}
        </div>
      )}
      
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 z-50 flex justify-center items-center p-4">
          <div className="bg-white p-5 md:p-7 rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-semibold">Add Utility/Service Transfer</h4>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20}/>
              </button>
            </div>
            <div className="space-y-3 text-sm">
              <div>
                <label htmlFor="util-type" className="block font-medium mb-1">Utility Type *</label>
                <input type="text" name="type" id="util-type" value={newItem.type} onChange={handleInputChange} className="mt-1 w-full p-2 border rounded-md" required placeholder="e.g., Electricity, Water, Gas, Internet"/>
              </div>
              <div>
                <label htmlFor="util-provider" className="block font-medium mb-1">Provider Name *</label>
                <input type="text" name="provider" id="util-provider" value={newItem.provider} onChange={handleInputChange} className="mt-1 w-full p-2 border rounded-md" required/>
              </div>
              <div>
                <label htmlFor="util-account" className="block font-medium mb-1">Account #</label>
                <input type="text" name="account" id="util-account" value={newItem.account} onChange={handleInputChange} className="mt-1 w-full p-2 border rounded-md"/>
              </div>
              <div>
                <label htmlFor="util-date" className="block font-medium mb-1">Scheduled Transfer Date</label>
                <input type="date" name="scheduledDate" id="util-date" value={newItem.scheduledDate} onChange={handleInputChange} className="mt-1 w-full p-2 border rounded-md"/>
              </div>
              <div>
                <label htmlFor="util-confirm" className="block font-medium mb-1">Confirmation #</label>
                <input type="text" name="confirmation" id="util-confirm" value={newItem.confirmation} onChange={handleInputChange} className="mt-1 w-full p-2 border rounded-md"/>
              </div>
              <div>
                <label htmlFor="util-status" className="block font-medium mb-1">Status</label>
                <select name="status" id="util-status" value={newItem.status} onChange={handleInputChange} className="mt-1 w-full p-2 border rounded-md">
                  <option>Pending</option>
                  <option>Scheduled</option>
                  <option>Completed</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3 pt-3">
                <button onClick={() => setShowModal(false)} className="px-4 py-2 text-sm rounded-md border hover:bg-gray-50">Cancel</button>
                <button onClick={handleAdd} className="px-4 py-2 text-sm rounded-md bg-teal-600 text-white hover:bg-teal-700">Add Utility</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UtilitiesTransferTrackerTool;