import React, { useState } from 'react';
import { ClipboardList } from 'lucide-react';

const HomePreparationChecklist: React.FC = () => {
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});
  
  const preparationTasks = [
    "Declutter and deep clean entire home",
    "Complete necessary repairs (leaky faucets, squeaky doors, etc.)",
    "Touch up paint on walls and trim",
    "Improve curb appeal (landscaping, exterior cleaning)",
    "Stage home to highlight best features",
    "Organize and clean storage areas",
    "Remove personal photos and highly personal items",
    "Ensure all light fixtures work with bright bulbs",
    "Clean windows inside and out",
    "Professional cleaning of carpets/floors"
  ];

  const toggleItem = (index: number) => {
    setCheckedItems(prev => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <ClipboardList className="w-5 h-5 mr-2 text-purple-600" />
        Home Preparation Checklist
      </h3>
      <div className="space-y-2">
        {preparationTasks.map((task, index) => (
          <label key={index} className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors duration-150 ${checkedItems[index] ? 'bg-green-50 border-green-200' : 'hover:bg-gray-50 border-gray-200'}`}>
            <input
              type="checkbox"
              checked={!!checkedItems[index]}
              onChange={() => toggleItem(index)}
              className="h-4 w-4 text-green-500 border-gray-300 rounded focus:ring-green-400 mr-3 flex-shrink-0"
            />
            <span className={`text-sm ${checkedItems[index] ? 'line-through text-gray-500' : 'text-gray-700'}`}>
              {task}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default HomePreparationChecklist;