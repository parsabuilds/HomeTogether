import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

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
          {Icon && <Icon size={18} className="mr-2 text-pink-600" />}
          {title}
        </span>
        {isOpen ? <ChevronUp size={20} className="text-gray-500"/> : <ChevronDown size={20} className="text-gray-500"/>}
      </button>
      {isOpen && <div className="py-3 px-2 text-sm text-gray-600 space-y-1.5 bg-white">{children}</div>}
    </div>
  );
};

const OfferNegotiationInfo: React.FC = () => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border mt-6">
      <h3 className="text-lg font-semibold mb-3 flex items-center">
        <HelpCircle size={20} className="mr-2 text-pink-600" />
        Offer & Negotiation Insights
      </h3>
      <div className="space-y-1 text-sm">
        <AccordionItem title="Understanding Offer Contingencies" icon={HelpCircle}>
          <p>Contingencies are conditions that must be met for the sale to go through. Common ones include:</p>
          <ul className="list-disc list-inside pl-4 mt-1 text-sm">
            <li><strong>Financing:</strong> Protects you if you can't secure a loan.</li>
            <li><strong>Appraisal:</strong> Ensures the property is worth at least what you offered.</li>
            <li><strong>Inspection:</strong> Allows you to have the home professionally inspected and potentially negotiate repairs or back out if major issues are found.</li>
          </ul>
        </AccordionItem>
        <AccordionItem title="Crafting a Strong Offer" icon={HelpCircle}>
          <p>Beyond price, consider terms like a flexible closing date, a strong earnest money deposit, and minimizing contingencies (if comfortable and market conditions allow). Your pre-approval letter is key!</p>
        </AccordionItem>
        <AccordionItem title="Navigating Counter-Offers" icon={HelpCircle}>
          <p>Sellers may counter your offer on price, terms, or both. Review carefully with your agent. You can accept, reject, or make your own counter-offer.</p>
        </AccordionItem>
        <AccordionItem title="The Role of Earnest Money" icon={HelpCircle}>
          <p>This is a "good faith" deposit showing you're serious. It's typically held in escrow and applied to your down payment or closing costs if the sale goes through. If you back out for reasons not covered by contingencies, you might forfeit it.</p>
        </AccordionItem>
      </div>
    </div>
  );
};

export default OfferNegotiationInfo;