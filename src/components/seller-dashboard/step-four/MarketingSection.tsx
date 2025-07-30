import React from 'react';
import MarketingStrategyPlanner from './MarketingStrategyPlanner';
import SellerNotesSection from '../shared/SellerNotesSection';

interface MarketingSectionProps {
  marketingClientNotes: string;
  setMarketingClientNotes: (notes: string) => void;
  marketingAgentNotes: string;
  setMarketingAgentNotes: (notes: string) => void;
}

const MarketingSection: React.FC<MarketingSectionProps> = ({
  marketingClientNotes,
  setMarketingClientNotes,
  marketingAgentNotes,
  setMarketingAgentNotes
}) => {
  return (
    <>
      <MarketingStrategyPlanner />
      <SellerNotesSection 
        clientNotesVal={marketingClientNotes} 
        onClientChange={(e) => setMarketingClientNotes(e.target.value)} 
        agentNotesVal={marketingAgentNotes} 
        onAgentChange={(e) => setMarketingAgentNotes(e.target.value)} 
        title="Marketing Notes"
      />
    </>
  );
};

export default MarketingSection;