import React from 'react';
import SellerClosingPlanner from './SellerClosingPlanner';
import SellerNotesSection from '../shared/SellerNotesSection';

interface ClosingProcessSectionProps {
  closingClientNotes: string;
  setClosingClientNotes: (notes: string) => void;
  closingAgentNotes: string;
  setClosingAgentNotes: (notes: string) => void;
}

const ClosingProcessSection: React.FC<ClosingProcessSectionProps> = ({
  closingClientNotes,
  setClosingClientNotes,
  closingAgentNotes,
  setClosingAgentNotes
}) => {
  return (
    <>
      <SellerClosingPlanner />
      <SellerNotesSection 
        clientNotesVal={closingClientNotes} 
        onClientChange={(e) => setClosingClientNotes(e.target.value)} 
        agentNotesVal={closingAgentNotes} 
        onAgentChange={(e) => setClosingAgentNotes(e.target.value)} 
        title="Closing Process Notes"
      />
    </>
  );
};

export default ClosingProcessSection;