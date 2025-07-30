import React, { useState } from 'react';
import { Info, FileBadge, Key, HelpCircle, Home, ClipboardList, ChevronDown, ChevronUp } from 'lucide-react';

const AccordionItem: React.FC<{
  title: string;
  children: React.ReactNode;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
}> = ({ title, children, icon: Icon }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-200">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="flex justify-between items-center w-full py-3.5 px-1 text-left text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
      >
        <span className="flex items-center">
          {Icon && <Icon size={18} className="mr-2 text-teal-600" />}
          {title}
        </span>
        {isOpen ? <ChevronUp size={20} className="text-gray-500"/> : <ChevronDown size={20} className="text-gray-500"/>}
      </button>
      {isOpen && <div className="py-3 px-2 text-sm text-gray-600 space-y-1.5 bg-white">{children}</div>}
    </div>
  );
};

const ClosingInfo: React.FC = () => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border mt-6">
      <h3 className="text-lg font-semibold mb-3 flex items-center">
        <Info size={20} className="mr-2 text-teal-600" />
        Closing Process Insights
      </h3>
      <div className="space-y-1 text-sm">
        <AccordionItem title="Decoding Your Closing Disclosure (CD)" icon={FileBadge}>
          <p>This 5-page document details all costs. Compare it line-by-line with your Loan Estimate. Ask questions about any discrepancies. You should receive this at least 3 business days before closing.</p>
        </AccordionItem>
        <AccordionItem title="The Closing Day: What to Expect" icon={Key}>
          <p>Bring your ID and certified funds. You'll sign many documents. The closing agent (attorney or escrow officer) will explain each one. Don't hesitate to ask for clarification. This is when you officially become the homeowner!</p>
        </AccordionItem>
        <AccordionItem title="Common Closing Hurdles" icon={HelpCircle}>
          <p>Last-minute issues can arise (e.g., funding delays, final walkthrough problems, document errors). Stay in close communication with your agent and lender to address these promptly.</p>
        </AccordionItem>
        <AccordionItem title="Post-Closing: First Steps as a New Homeowner" icon={Home}>
          <p>Secure your new home (change locks if desired), keep all closing documents in a safe place, update your address with USPS and other institutions, and understand your new responsibilities like property taxes and homeowner's insurance payments.</p>
        </AccordionItem>
        <AccordionItem title="What to Bring to Closing" icon={ClipboardList}>
          <ul className="list-disc list-inside pl-4 mt-1 text-sm">
            <li>Valid Photo Identification (Driver's License, Passport) for all buyers.</li>
            <li>Certified or Cashier's Check for closing costs and remaining down payment (confirm amount and payee beforehand with the closing agent).</li>
            <li>Copy of your purchase agreement and any addenda.</li>
            <li>Your copy of the Loan Estimate and Closing Disclosure for reference.</li>
            <li>Proof of Homeowner's Insurance policy.</li>
            <li>Any other documents specifically requested by your lender or the closing agent.</li>
            <li>Your checkbook for any minor last-minute adjustments (rare, but possible).</li>
          </ul>
        </AccordionItem>
      </div>
    </div>
  );
};

export default ClosingInfo;