import React, { useState } from 'react';
import { Truck } from 'lucide-react';

interface MovingTask {
  text: string;
  checked: boolean;
}

interface MovingDayPlannerToolProps {
  tasks: MovingTask[];
  onToggleTask: (index: number) => void;
}

const MovingDayPlannerTool: React.FC<MovingDayPlannerToolProps> = ({ 
  tasks, 
  onToggleTask 
}) => {
  const [movingContacts, setMovingContacts] = useState('');

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border mt-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <Truck size={20} className="mr-2 text-teal-600"/>
        Moving Day Planner
      </h3>
      <h4 className="text-base font-medium text-gray-700 mb-2">Countdown Checklist:</h4>
      <div className="space-y-2 mb-6">
        {tasks.map((task, index) => (
          <label key={index} className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors duration-150 ${task.checked ? 'bg-green-50 border-green-200' : 'hover:bg-gray-50 border-gray-200'}`}>
            <input 
              type="checkbox" 
              checked={!!task.checked} 
              onChange={() => onToggleTask(index)} 
              className="h-4 w-4 text-green-500 border-gray-300 rounded focus:ring-green-400 mr-3"
            />
            <span className={`text-sm ${task.checked ? 'line-through text-slate-500' : 'text-slate-700'}`}>
              {task.text}
            </span>
          </label>
        ))}
      </div>
      <h4 className="text-base font-medium text-gray-700 mb-2">Important Moving Day Contacts:</h4>
      <textarea 
        value={movingContacts} 
        onChange={(e) => setMovingContacts(e.target.value)} 
        className="w-full p-2 border rounded-md text-sm" 
        rows={3} 
        placeholder="e.g., Moving Company: (Name & Phone), Storage Unit: (Info)"
      />
    </div>
  );
};

export default MovingDayPlannerTool;