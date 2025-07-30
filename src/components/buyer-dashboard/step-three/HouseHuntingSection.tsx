import React from 'react';
import SearchCriteriaTool from './SearchCriteriaTool';
import OnlineSearchLinks from './OnlineSearchLinks';
import PropertyTracker from './PropertyTracker';
import NotesSection from '../shared/NotesSection';

interface ClientData {
  location: string;
  propertyType: string[];
  bedrooms: string;
  bathrooms: string;
  squareFootage: string;
  houseStyle: string;
  amenities: string[];
  mustHaveFeatures: string;
}

interface Property {
  id?: string | number;
  address: string;
  price: string;
  beds?: string;
  baths?: string;
  sqft?: string;
  imageUrl?: string;
  listingUrl?: string;
  notes?: string;
  scorecard?: {
    averageScore?: number;
  };
}

interface HouseHuntingSectionProps {
  clientData: ClientData;
  setActiveStep: (step: number) => void;
  setIsIntakeFormMinimized: (minimized: boolean) => void;
  clientProperties: Property[];
  agentProperties: Property[];
  openAddPropertyModal: (type: 'client' | 'agent') => void;
  openEditPropertyModal: (type: string, index: number) => void;
  openNotesModal: (type: string, index: number) => void;
  openScorecardModal: (type: string, index: number) => void;
  clientNotes: string;
  setClientNotes: (notes: string) => void;
  agentNotes: string;
  setAgentNotes: (notes: string) => void;
}

const HouseHuntingSection: React.FC<HouseHuntingSectionProps> = ({ 
  clientData,
  setActiveStep,
  setIsIntakeFormMinimized,
  clientProperties,
  agentProperties,
  openAddPropertyModal,
  openEditPropertyModal,
  openNotesModal,
  openScorecardModal,
  clientNotes,
  setClientNotes,
  agentNotes,
  setAgentNotes
}) => {
  return (
    <>
      <SearchCriteriaTool 
        clientData={clientData} 
        setActiveStep={setActiveStep} 
        setIsIntakeFormMinimized={setIsIntakeFormMinimized} 
      />
      <OnlineSearchLinks />
      <PropertyTracker 
        clientProperties={clientProperties} 
        agentProperties={agentProperties} 
        openAddPropertyModal={openAddPropertyModal} 
        openEditPropertyModal={openEditPropertyModal} 
        openNotesModal={openNotesModal} 
        openScorecardModal={openScorecardModal} 
      />
      <NotesSection 
        clientNotesVal={clientNotes} 
        onClientChange={(e) => setClientNotes(e.target.value)} 
        agentNotesVal={agentNotes} 
        onAgentChange={(e) => setAgentNotes(e.target.value)} 
        title="House Hunting Notes"
      />
    </>
  );
};

export default HouseHuntingSection;