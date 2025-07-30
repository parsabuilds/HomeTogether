import React from 'react';
import SimpleNetSheetEstimator from './SimpleNetSheetEstimator';
import OfferTrackerTool from './OfferTrackerTool';
import CMAViewingArea from './CMAViewingArea';
import OfferNegotiationInfo from './OfferNegotiationInfo';
import OfferDocumentLinks from './OfferDocumentLinks';
import NotesSection from '../shared/NotesSection';

interface ClientData {
  budget?: string;
  liquidFundsForPurchase?: string;
}

interface OfferTrackItem {
  id: number;
  date: string;
  type: string;
  price: string;
  keyTerms: string;
  status: string;
  notes: string;
}

interface OfferNegotiationSectionProps {
  clientData: ClientData;
  offerTrackItems: OfferTrackItem[];
  onAddOfferTrackItem: (item: OfferTrackItem) => void;
  clientNotes: string;
  setClientNotes: (notes: string) => void;
  agentNotes: string;
  setAgentNotes: (notes: string) => void;
}

const OfferNegotiationSection: React.FC<OfferNegotiationSectionProps> = ({
  clientData,
  offerTrackItems,
  onAddOfferTrackItem,
  clientNotes,
  setClientNotes,
  agentNotes,
  setAgentNotes
}) => {
  return (
    <div className="space-y-6">
      <SimpleNetSheetEstimator clientData={clientData} />
      <OfferTrackerTool 
        offerTrackItems={offerTrackItems} 
        onAddOfferTrackItem={onAddOfferTrackItem} 
      />
      <CMAViewingArea />
      <OfferNegotiationInfo />
      <OfferDocumentLinks />
      <NotesSection 
        clientNotesVal={clientNotes} 
        onClientChange={(e) => setClientNotes(e.target.value)} 
        agentNotesVal={agentNotes} 
        onAgentChange={(e) => setAgentNotes(e.target.value)} 
        title="Offer Strategy Notes"
      />
    </div>
  );
};

export default OfferNegotiationSection;