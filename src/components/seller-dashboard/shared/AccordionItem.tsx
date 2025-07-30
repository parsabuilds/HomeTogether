import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
  defaultOpen?: boolean;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, children, icon: Icon, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-200">
      <button onClick={() => setIsOpen(!isOpen)} className="flex justify-between items-center w-full py-3.5 px-1 text-left text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">
        <span className="flex items-center">
          {Icon && <Icon size={18} className="mr-2 text-purple-600" />}
          {title}
        </span>
        {isOpen ? <ChevronUp size={20} className="text-gray-500"/> : <ChevronDown size={20} className="text-gray-500"/>}
      </button>
      {isOpen && <div className="py-3 px-2 text-sm text-gray-600 space-y-1.5 bg-white">{children}</div>}
    </div>
  );
};

export default AccordionItem;