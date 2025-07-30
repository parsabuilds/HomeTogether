import React, { useState } from 'react';
import { Clock, PlusCircle, X } from 'lucide-react';

interface CriticalDate {
  id: number;
  description: string;
  dueDate: string;
  responsibleParty: string;
  status: string;
  notes: string;
}

interface CriticalDateTrackerToolProps {
  criticalDates: CriticalDate[];
  onAddCriticalDate: (date: CriticalDate) => void;
}

const CriticalDateTrackerTool: React.FC<CriticalDateTrackerToolProps> = ({ 
  criticalDates, 
  onAddCriticalDate 
}) => {
  const [showModal, setShowModal] = useState(false);
  const [newItem, setNewItem] = useState({ 
    description: '', 
    dueDate: new Date().toISOString().split('T')[0], 
    responsibleParty: 'Buyer', 
    status: 'Pending', 
    notes: '' 
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => { 
    const { name, value } = e.target; 
    setNewItem(prev => ({ ...prev, [name]: value }));
  };

  const handleAddItem = () => { 
    onAddCriticalDate({ ...newItem, id: Date.now() }); 
    setShowModal(false); 
    setNewItem({ 
      description: '', 
      dueDate: new Date().toISOString().split('T')[0], 
      responsibleParty: 'Buyer', 
      status: 'Pending', 
      notes: '' 
    });
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border mt-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold flex items-center">
          <Clock size={20} className="mr-2 text-indigo-600"/>
          Critical Date & Contingency Tracker
        </h3>
        <button 
          onClick={() => setShowModal(true)} 
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1.5 rounded-md text-sm flex items-center"
        >
          <PlusCircle size={16} className="mr-1.5"/>
          Add Date
        </button>
      </div>
      
      {criticalDates.length === 0 ? (
        <p className="text-sm text-gray-500">No critical dates tracked yet.</p>
      ) : (
        <div className="space-y-3 text-sm">
          {criticalDates.map(date => (
            <div key={date.id} className="p-3 border rounded-md bg-indigo-50 border-indigo-200">
              <div className="flex justify-between items-start">
                <p className="font-semibold text-indigo-700">{date.description}</p>
                <span className="text-sm text-indigo-600">Due: {date.dueDate}</span>
              </div>
              <p className="text-sm mt-0.5"><strong className="text-gray-600">Responsible:</strong> {date.responsibleParty}</p>
              <p className="text-sm mt-0.5"><strong className="text-gray-600">Status:</strong> {date.status}</p>
              {date.notes && <p className="text-sm mt-1 bg-white p-1.5 rounded"><strong className="text-gray-600">Notes:</strong> {date.notes}</p>}
            </div>
          ))}
        </div>
      )}
      
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 z-50 flex justify-center items-center p-4">
          <div className="bg-white p-5 md:p-7 rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-semibold">Add Critical Date</h4>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20}/>
              </button>
            </div>
            <div className="space-y-3 text-sm">
              <div>
                <label htmlFor="cd-desc" className="block font-medium mb-1">Description *</label>
                <input type="text" name="description" id="cd-desc" value={newItem.description} onChange={handleInputChange} className="mt-1 w-full p-2 border rounded-md" required/>
              </div>
              <div>
                <label htmlFor="cd-dueDate" className="block font-medium mb-1">Due Date *</label>
                <input type="date" name="dueDate" id="cd-dueDate" value={newItem.dueDate} onChange={handleInputChange} className="mt-1 w-full p-2 border rounded-md" required/>
              </div>
              <div>
                <label htmlFor="cd-responsible" className="block font-medium mb-1">Responsible Party</label>
                <select name="responsibleParty" id="cd-responsible" value={newItem.responsibleParty} onChange={handleInputChange} className="mt-1 w-full p-2 border rounded-md">
                  <option>Buyer</option>
                  <option>Seller</option>
                  <option>Lender</option>
                  <option>Agent</option>
                  <option>Attorney/Escrow</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="cd-status" className="block font-medium mb-1">Status</label>
                <select name="status" id="cd-status" value={newItem.status} onChange={handleInputChange} className="mt-1 w-full p-2 border rounded-md">
                  <option>Pending</option>
                  <option>Completed</option>
                  <option>Waived</option>
                  <option>Alert/Action Needed</option>
                </select>
              </div>
              <div>
                <label htmlFor="cd-notes" className="block font-medium mb-1">Notes</label>
                <textarea name="notes" id="cd-notes" value={newItem.notes} onChange={handleInputChange} rows={2} className="mt-1 w-full p-2 border rounded-md"/>
              </div>
              <div className="flex justify-end space-x-3 pt-3">
                <button onClick={() => setShowModal(false)} className="px-4 py-2 text-sm rounded-md border hover:bg-gray-50">Cancel</button>
                <button onClick={handleAddItem} className="px-4 py-2 text-sm rounded-md bg-indigo-600 text-white hover:bg-indigo-700">Add Date</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CriticalDateTrackerTool;