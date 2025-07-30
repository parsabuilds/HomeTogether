import React from 'react';
import HomePreparationChecklist from './HomePreparationChecklist';
import SellerNotesSection from '../shared/SellerNotesSection';

interface PropertyPreparationSectionProps {
  preparationClientNotes: string;
  setPreparationClientNotes: (notes: string) => void;
  preparationAgentNotes: string;
  setPreparationAgentNotes: (notes: string) => void;
}

const PropertyPreparationSection: React.FC<PropertyPreparationSectionProps> = ({
  preparationClientNotes,
  setPreparationClientNotes,
  preparationAgentNotes,
  setPreparationAgentNotes
}) => {
  return (
    <>
      <HomePreparationChecklist />
      <SellerNotesSection 
        clientNotesVal={preparationClientNotes} 
        onClientChange={(e) => setPreparationClientNotes(e.target.value)} 
        agentNotesVal={preparationAgentNotes} 
        onAgentChange={(e) => setPreparationAgentNotes(e.target.value)} 
        title="Preparation Notes"
      />
    </>
  );
};

export default PropertyPreparationSection;