import React from 'react';
import PitiMortgageCalculator from './PitiMortgageCalculator';
import MortgageFunFacts from './MortgageFunFacts';
import NotesSection from '../shared/NotesSection';

interface FinancialToolsSectionProps {
  clientNotes: string;
  setClientNotes: (notes: string) => void;
  agentNotes: string;
  setAgentNotes: (notes: string) => void;
  userRole?: string;
}

const FinancialToolsSection: React.FC<FinancialToolsSectionProps> = ({ 
  clientNotes, 
  setClientNotes, 
  agentNotes, 
  setAgentNotes, 
  userRole = 'client' 
}) => {
  return (
    <>
      <PitiMortgageCalculator />
      <MortgageFunFacts />
      <NotesSection clientNotesVal={clientNotes} onClientChange={(e) => setClientNotes(e.target.value)} agentNotesVal={agentNotes} onAgentChange={(e) => setAgentNotes(e.target.value)} title="Financial Pre-Approval Notes"/>
    </>
  );
};

export default FinancialToolsSection;