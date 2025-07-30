import React from 'react';
import MarketAnalysisCalculator from './MarketAnalysisCalculator';
import SellingTipsAndInsights from './SellingTipsAndInsights';
import SellerNotesSection from '../shared/SellerNotesSection';

interface MarketAnalysisSectionProps {
  pricingClientNotes: string;
  setPricingClientNotes: (notes: string) => void;
  pricingAgentNotes: string;
  setPricingAgentNotes: (notes: string) => void;
}

const MarketAnalysisSection: React.FC<MarketAnalysisSectionProps> = ({
  pricingClientNotes,
  setPricingClientNotes,
  pricingAgentNotes,
  setPricingAgentNotes
}) => {
  return (
    <>
      <MarketAnalysisCalculator />
      <SellingTipsAndInsights />
      <SellerNotesSection 
        clientNotesVal={pricingClientNotes} 
        onClientChange={(e) => setPricingClientNotes(e.target.value)} 
        agentNotesVal={pricingAgentNotes} 
        onAgentChange={(e) => setPricingAgentNotes(e.target.value)} 
        title="Pricing Strategy Notes"
      />
    </>
  );
};

export default MarketAnalysisSection;