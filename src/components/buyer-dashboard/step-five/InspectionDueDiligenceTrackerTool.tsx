import React, { useState } from 'react';
import { ListChecks, PlusCircle, X } from 'lucide-react';

interface Task {
  id: number;
  taskName: string;
  scheduledDate: string;
  vendorContact: string;
  reportDueDate: string;
  status: string;
  notes: string;
}

interface InspectionDueDiligenceTrackerToolProps {
  tasks: Task[];
  onAddTask: (task: Task) => void;
}

const InspectionDueDiligenceTrackerTool: React.FC<InspectionDueDiligenceTrackerToolProps> = ({ 
  tasks, 
  onAddTask 
}) => {
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState({ 
    taskName: '', 
    scheduledDate: '', 
    vendorContact: '', 
    reportDueDate: '', 
    status: 'Not Started', 
    notes: '' 
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => { 
    const { name, value } = e.target; 
    setNewTask(prev => ({ ...prev, [name]: value }));
  };

  const handleAddTask = () => { 
    onAddTask({ ...newTask, id: Date.now() }); 
    setShowModal(false); 
    setNewTask({ 
      taskName: '', 
      scheduledDate: '', 
      vendorContact: '', 
      reportDueDate: '', 
      status: 'Not Started', 
      notes: '' 
    });
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border mt-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold flex items-center">
          <ListChecks size={20} className="mr-2 text-indigo-600"/>
          Inspection & Due Diligence Tracker
        </h3>
        <button 
          onClick={() => setShowModal(true)} 
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1.5 rounded-md text-sm flex items-center"
        >
          <PlusCircle size={16} className="mr-1.5"/>
          Add Task
        </button>
      </div>
      
      {tasks.length === 0 ? (
        <p className="text-sm text-gray-500">No tasks added yet.</p>
      ) : (
        <div className="space-y-3 text-sm">
          {tasks.map(task => (
            <div key={task.id} className="p-3 border rounded-md bg-indigo-50 border-indigo-200">
              <p className="font-semibold text-indigo-700">{task.taskName}</p>
              {task.scheduledDate && <p className="text-sm mt-0.5"><strong className="text-gray-600">Scheduled:</strong> {task.scheduledDate}</p>}
              {task.vendorContact && <p className="text-sm"><strong className="text-gray-600">Vendor:</strong> {task.vendorContact}</p>}
              {task.reportDueDate && <p className="text-sm"><strong className="text-gray-600">Report Due:</strong> {task.reportDueDate}</p>}
              <p className="text-sm mt-0.5"><strong className="text-gray-600">Status:</strong> {task.status}</p>
              {task.notes && <p className="text-sm mt-1 bg-white p-1.5 rounded"><strong className="text-gray-600">Notes:</strong> {task.notes}</p>}
            </div>
          ))}
        </div>
      )}
      
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 z-50 flex justify-center items-center p-4">
          <div className="bg-white p-5 md:p-7 rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-semibold">Add Due Diligence Task</h4>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20}/>
              </button>
            </div>
            <div className="space-y-3 text-sm">
              <div>
                <label htmlFor="dd-taskName" className="block font-medium mb-1">Task Name *</label>
                <input type="text" name="taskName" id="dd-taskName" value={newTask.taskName} onChange={handleInputChange} className="mt-1 w-full p-2 border rounded-md" required/>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="dd-scheduledDate" className="block font-medium mb-1">Scheduled Date</label>
                  <input type="date" name="scheduledDate" id="dd-scheduledDate" value={newTask.scheduledDate} onChange={handleInputChange} className="mt-1 w-full p-2 border rounded-md"/>
                </div>
                <div>
                  <label htmlFor="dd-reportDueDate" className="block font-medium mb-1">Report Due Date</label>
                  <input type="date" name="reportDueDate" id="dd-reportDueDate" value={newTask.reportDueDate} onChange={handleInputChange} className="mt-1 w-full p-2 border rounded-md"/>
                </div>
              </div>
              <div>
                <label htmlFor="dd-vendorContact" className="block font-medium mb-1">Vendor/Contact</label>
                <input type="text" name="vendorContact" id="dd-vendorContact" value={newTask.vendorContact} onChange={handleInputChange} className="mt-1 w-full p-2 border rounded-md"/>
              </div>
              <div>
                <label htmlFor="dd-status" className="block font-medium mb-1">Status</label>
                <select name="status" id="dd-status" value={newTask.status} onChange={handleInputChange} className="mt-1 w-full p-2 border rounded-md">
                  <option>Not Started</option>
                  <option>Scheduled</option>
                  <option>In Progress</option>
                  <option>Report Received</option>
                  <option>Completed</option>
                </select>
              </div>
              <div>
                <label htmlFor="dd-notes" className="block font-medium mb-1">Notes</label>
                <textarea name="notes" id="dd-notes" value={newTask.notes} onChange={handleInputChange} rows={2} className="mt-1 w-full p-2 border rounded-md"/>
              </div>
              <div className="flex justify-end space-x-3 pt-3">
                <button onClick={() => setShowModal(false)} className="px-4 py-2 text-sm rounded-md border hover:bg-gray-50">Cancel</button>
                <button onClick={handleAddTask} className="px-4 py-2 text-sm rounded-md bg-indigo-600 text-white hover:bg-indigo-700">Add Task</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InspectionDueDiligenceTrackerTool;