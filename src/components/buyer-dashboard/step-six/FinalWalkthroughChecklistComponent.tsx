import React from 'react';
import { CheckSquare } from 'lucide-react';

interface FinalWalkthroughItem {
  text: string;
  checked: boolean;
}

interface FinalWalkthroughChecklistComponentProps {
  items: FinalWalkthroughItem[];
  onToggleItem: (index: number) => void;
}

const FinalWalkthroughChecklistComponent: React.FC<FinalWalkthroughChecklistComponentProps> = ({ 
  items, 
  onToggleItem 
}) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border mt-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <CheckSquare size={20} className="mr-2 text-teal-600"/>
        Final Walkthrough Checklist
      </h3>
      <p className="text-sm text-gray-600 mb-3">Inspect these items carefully before your final signing.</p>
      <div className="space-y-2">
        {items.map((item, index) => (
          <label key={index} className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors duration-150 ${item.checked ? 'bg-green-50 border-green-200' : 'hover:bg-gray-50 border-gray-200'}`}>
            <input 
              type="checkbox" 
              checked={!!item.checked} 
              onChange={() => onToggleItem(index)} 
              className="h-4 w-4 text-green-500 border-gray-300 rounded focus:ring-green-400 mr-3"
            />
            <span className={`text-sm ${item.checked ? 'line-through text-slate-500' : 'text-slate-700'}`}>
              {item.text}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default FinalWalkthroughChecklistComponent;