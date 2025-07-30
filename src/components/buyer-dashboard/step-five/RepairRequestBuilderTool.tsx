import React, { useState } from 'react';
import { Hammer, PlusCircle, X } from 'lucide-react';

interface RepairItem {
  id: number;
  issueDescription: string;
  desiredAction: string;
  estimatedCost: string;
  notes: string;
}

interface RepairRequestBuilderToolProps {
  repairItems: RepairItem[];
  onAddRepairItem: (item: RepairItem) => void;
}

const RepairRequestBuilderTool: React.FC<RepairRequestBuilderToolProps> = ({ 
  repairItems, 
  onAddRepairItem 
}) => {
  const [showModal, setShowModal] = useState(false);
  const [newItem, setNewItem] = useState({ 
    issueDescription: '', 
    desiredAction: 'Repair', 
    estimatedCost: '', 
    notes: '' 
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => { 
    const { name, value } = e.target; 
    setNewItem(prev => ({ ...prev, [name]: value }));
  };

  const handleAddItem = () => { 
    onAddRepairItem({ ...newItem, id: Date.now() }); 
    setShowModal(false); 
    setNewItem({ 
      issueDescription: '', 
      desiredAction: 'Repair', 
      estimatedCost: '', 
      notes: '' 
    });
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border mt-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold flex items-center">
          <Hammer size={20} className="mr-2 text-indigo-600"/>
          Repair Request List Builder
        </h3>
        <button 
          onClick={() => setShowModal(true)} 
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1.5 rounded-md text-sm flex items-center"
        >
          <PlusCircle size={16} className="mr-1.5"/>
          Add Item
        </button>
      </div>
      
      {repairItems.length === 0 ? (
        <p className="text-sm text-gray-500">No repair items listed yet.</p>
      ) : (
        <div className="space-y-3 text-sm">
          {repairItems.map(item => (
            <div key={item.id} className="p-3 border rounded-md bg-indigo-50 border-indigo-200">
              <p className="font-semibold text-indigo-700">{item.issueDescription}</p>
              <p className="text-sm mt-0.5">
                <strong className="text-gray-600">Action:</strong> {item.desiredAction} 
                {item.estimatedCost && ` (Est. Cost: $${item.estimatedCost})`}
              </p>
              {item.notes && <p className="text-sm mt-1 bg-white p-1.5 rounded"><strong className="text-gray-600">Notes:</strong> {item.notes}</p>}
            </div>
          ))}
        </div>
      )}
      
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 z-50 flex justify-center items-center p-4">
          <div className="bg-white p-5 md:p-7 rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-semibold">Add Repair Request Item</h4>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20}/>
              </button>
            </div>
            <div className="space-y-3 text-sm">
              <div>
                <label htmlFor="rr-issue" className="block font-medium mb-1">Issue Description *</label>
                <textarea name="issueDescription" id="rr-issue" value={newItem.issueDescription} onChange={handleInputChange} rows={2} className="mt-1 w-full p-2 border rounded-md" required/>
              </div>
              <div>
                <label htmlFor="rr-action" className="block font-medium mb-1">Desired Action</label>
                <select name="desiredAction" id="rr-action" value={newItem.desiredAction} onChange={handleInputChange} className="mt-1 w-full p-2 border rounded-md">
                  <option>Repair</option>
                  <option>Replace</option>
                  <option>Credit</option>
                  <option>Monitor</option>
                </select>
              </div>
              <div>
                <label htmlFor="rr-cost" className="block font-medium mb-1">Estimated Cost (Optional)</label>
                <input type="number" name="estimatedCost" id="rr-cost" value={newItem.estimatedCost} onChange={handleInputChange} className="mt-1 w-full p-2 border rounded-md"/>
              </div>
              <div>
                <label htmlFor="rr-notes" className="block font-medium mb-1">Notes</label>
                <textarea name="notes" id="rr-notes" value={newItem.notes} onChange={handleInputChange} rows={2} className="mt-1 w-full p-2 border rounded-md"/>
              </div>
              <div className="flex justify-end space-x-3 pt-3">
                <button onClick={() => setShowModal(false)} className="px-4 py-2 text-sm rounded-md border hover:bg-gray-50">Cancel</button>
                <button onClick={handleAddItem} className="px-4 py-2 text-sm rounded-md bg-indigo-600 text-white hover:bg-indigo-700">Add Item</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RepairRequestBuilderTool;