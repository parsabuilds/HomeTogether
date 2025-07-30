import React from 'react';
import SellerIntakeForm from './SellerIntakeForm';
import SellerListingAgreement from './SellerListingAgreement';
import SellerNotesSection from '../shared/SellerNotesSection';

interface SellerData {
  name: string;
  email: string;
  phone: string;
  propertyAddress: string;
  propertyType: string;
  bedrooms: string;
  bathrooms: string;
  squareFootage: string;
  lotSize: string;
  yearBuilt: string;
  desiredPrice: string;
  timeframe: string;
  motivation: string;
  currentMortgage: string;
  moveOutDate: string;
}

interface SellerConsultationSectionProps {
  sellerData: SellerData;
  setSellerData: (data: SellerData) => void;
  formSubmitted: boolean;
  setFormSubmitted: (submitted: boolean) => void;
  isEditing: boolean;
  setIsEditing: (editing: boolean) => void;
  isMinimized: boolean;
  setIsMinimized: (minimized: boolean) => void;
  agreementUrl: string;
  setAgreementUrl: (url: string) => void;
  consultationClientNotes: string;
  setConsultationClientNotes: (notes: string) => void;
  consultationAgentNotes: string;
  setConsultationAgentNotes: (notes: string) => void;
}

const SellerConsultationSection: React.FC<SellerConsultationSectionProps> = ({
  sellerData,
  setSellerData,
  formSubmitted,
  setFormSubmitted,
  isEditing,
  setIsEditing,
  isMinimized,
  setIsMinimized,
  agreementUrl,
  setAgreementUrl,
  consultationClientNotes,
  setConsultationClientNotes,
  consultationAgentNotes,
  setConsultationAgentNotes
}) => {
  return (
    <>
      <SellerIntakeForm 
        sellerData={sellerData} 
        setSellerData={setSellerData} 
        formSubmitted={formSubmitted} 
        setFormSubmitted={setFormSubmitted} 
        isEditing={isEditing} 
        setIsEditing={setIsEditing} 
        isMinimized={isMinimized} 
        setIsMinimized={setIsMinimized} 
      />
      <SellerListingAgreement 
        agreementUrl={agreementUrl} 
        setAgreementUrl={setAgreementUrl} 
      />
      <SellerNotesSection 
        clientNotesVal={consultationClientNotes} 
        onClientChange={(e) => setConsultationClientNotes(e.target.value)} 
        agentNotesVal={consultationAgentNotes} 
        onAgentChange={(e) => setConsultationAgentNotes(e.target.value)} 
        title="Consultation Notes"
      />
    </>
  );
};

export default SellerConsultationSection;