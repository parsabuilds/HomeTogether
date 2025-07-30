import React from 'react';
import OfferManagementTool from './OfferManagementTool';
import SellerNotesSection from '../shared/SellerNotesSection';

interface Offer {
  id: number;
  buyerName: string;
  offerPrice: string;
  earnestMoney: string;
  closingDate: string;
  contingencies: string;
  status: string;
  notes: string;
  receivedDate: string;
}

interface OfferNegotiationSectionProps {
  offers: Offer[];
  onAddOffer: (offer: Offer) => void;
  offersClientNotes: string;
  setOffersClientNotes: (notes: string) => void;
  offersAgentNotes: string;
  setOffersAgentNotes: (notes: string) => void;
}

const OfferNegotiationSection: React.FC<OfferNegotiationSectionProps> = ({
  offers,
  onAddOffer,
  offersClientNotes,
  setOffersClientNotes,
  offersAgentNotes,
  setOffersAgentNotes
}) => {
  return (
    <>
      <OfferManagementTool offers={offers} onAddOffer={onAddOffer} />
      <SellerNotesSection 
        clientNotesVal={offersClientNotes} 
        onClientChange={(e) => setOffersClientNotes(e.target.value)} 
        agentNotesVal={offersAgentNotes} 
        onAgentChange={(e) => setOffersAgentNotes(e.target.value)} 
        title="Offers & Negotiation Notes"
      />
    </>
  );
};

export default OfferNegotiationSection;