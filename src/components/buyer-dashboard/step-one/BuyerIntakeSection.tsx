import React from 'react';
import IntakeForm from './IntakeForm';
import BuyerRepoAgreement from './BuyerRepoAgreement';
import NotesSection from '../shared/NotesSection';

interface ClientData {
  name: string;
  email: string;
  phone: string;
  currentAddress: string;
  budget: string;
  liquidFundsForPurchase: string;
  timeframe: string;
  location: string;
  propertyType: string[];
  houseStyle: string;
  bedrooms: string;
  bathrooms: string;
  squareFootage: string;
  amenities: string[];
  mustHaveFeatures: string;
  dealBreakers: string;
  motivation: string;
  currentLiving: string;
  firstTimeBuyer: string;
  additionalBuyers: string;
  monthlyIncome: string;
  employmentStatus: string;
  creditScore: string;
  specialRequirements: string;
}

interface BuyerIntakeSectionProps {
  clientData: ClientData;
  setClientData: (data: ClientData) => void;
  formSubmitted: boolean;
  setFormSubmitted: (submitted: boolean) => void;
  isEditing: boolean;
  setIsEditing: (editing: boolean) => void;
  isMinimized: boolean;
  setIsMinimized: (minimized: boolean) => void;
  agreementUrl: string;
  setAgreementUrl: (url: string) => void;
  clientNotes: string;
  setClientNotes: (notes: string) => void;
  agentNotes: string;
  setAgentNotes: (notes: string) => void;
  userRole?: string;
}

const BuyerIntakeSection: React.FC<BuyerIntakeSectionProps> = ({ 
  clientData, 
  setClientData, 
  formSubmitted, 
  setFormSubmitted, 
  isEditing, 
  setIsEditing, 
  isMinimized, 
  setIsMinimized, 
  agreementUrl, 
  setAgreementUrl, 
  clientNotes, 
  setClientNotes, 
  agentNotes, 
  setAgentNotes, 
  userRole = 'client' 
}) => {
  return (
    <>
      <IntakeForm 
        clientData={clientData} 
        setClientData={setClientData} 
        formSubmitted={formSubmitted} 
        setFormSubmitted={setFormSubmitted} 
        isEditing={isEditing} 
        setIsEditing={setIsEditing} 
        isMinimized={isMinimized} 
        setIsMinimized={setIsMinimized} 
      />
      
      <BuyerRepoAgreement 
        agreementUrl={agreementUrl} 
        setAgreementUrl={setAgreementUrl} 
      />
      
      <NotesSection clientNotesVal={clientNotes} onClientChange={(e) => setClientNotes(e.target.value)} agentNotesVal={agentNotes} onAgentChange={(e) => setAgentNotes(e.target.value)} title="Consultation Notes"/>
    </>
  );
};

export default BuyerIntakeSection;