import React, { useState } from 'react';
import { Key } from 'lucide-react';

const SellerClosingPlanner: React.FC = () => {
  const [closingTasks, setClosingTasks] = useState<Record<number, boolean>>({});
  
  const tasks = [
    "Review and sign closing disclosure",
    "Prepare property deed transfer documents",
    "Arrange final utility meter readings",
    "Complete final walkthrough with buyer",
    "Prepare keys, garage remotes, and manuals",
    "Arrange moving truck and storage",
    "Set up mail forwarding",
    "Clean out property completely",
    "Cancel/transfer home insurance",
    "Prepare for closing day signing"
  ];

  const toggleTask = (index: number) => {
    setClosingTasks(prev => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <Key className="w-5 h-5 mr-2 text-purple-600" />
        Seller Closing Checklist
      </h3>
      <div className="space-y-2">
        {tasks.map((task, index) => (
          <label key={index} className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors duration-150 ${closingTasks[index] ? 'bg-green-50 border-green-200' : 'hover:bg-gray-50 border-gray-200'}`}>
            <input
              type="checkbox"
              checked={!!closingTasks[index]}
              onChange={() => toggleTask(index)}
              className="h-4 w-4 text-green-500 border-gray-300 rounded focus:ring-green-400 mr-3 flex-shrink-0"
            />
            <span className={`text-sm ${closingTasks[index] ? 'line-through text-gray-500' : 'text-gray-700'}`}>
              {task}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default SellerClosingPlanner;