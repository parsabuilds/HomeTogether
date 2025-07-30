import React, { useState } from 'react';
import { Info, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

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
          {Icon && <Icon size={18} className="mr-2 text-indigo-600" />}
          {title}
        </span>
        {isOpen ? <ChevronUp size={20} className="text-gray-500"/> : <ChevronDown size={20} className="text-gray-500"/>}
      </button>
      {isOpen && <div className="py-3 px-2 text-sm text-gray-600 space-y-1.5 bg-white">{children}</div>}
    </div>
  );
};

const InspectionInfo: React.FC = () => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border mt-6">
      <h3 className="text-lg font-semibold mb-3 flex items-center">
        <Info size={20} className="mr-2 text-indigo-600" />
        Inspection & Due Diligence Insights
      </h3>
      <div className="space-y-1 text-sm">
        <AccordionItem title="Navigating the Home Inspection" icon={HelpCircle}>
          <p>A thorough home inspection is crucial. Attend if possible. Focus on major systems (roof, HVAC, plumbing, electrical, foundation). The report will detail findings; discuss these with your agent to understand their implications.</p>
        </AccordionItem>
        <AccordionItem title="Understanding the Home Appraisal" icon={HelpCircle}>
          <p>If you're getting a loan, your lender will require an appraisal to ensure the property's market value supports the loan amount. A low appraisal can impact your financing or offer terms.</p>
        </AccordionItem>
        <AccordionItem title="Addressing Inspection Issues" icon={HelpCircle}>
          <p>Based on inspection findings, you may: 1) Ask the seller for repairs, 2) Request a price reduction or closing cost credit, 3) Accept the property as-is, or 4) Terminate the contract if your contingency allows.</p>
        </AccordionItem>
        <AccordionItem title="Reviewing Seller Disclosures & HOA Docs" icon={HelpCircle}>
          <p>Carefully review the seller's property disclosure statement for known issues. If in an HOA, examine bylaws, financials, and meeting minutes for rules, fees, and potential special assessments.</p>
        </AccordionItem>
      </div>
    </div>
  );
};

export default InspectionInfo;