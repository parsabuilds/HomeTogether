import React, { useState, useEffect } from 'react';
import { BarChart3 } from 'lucide-react';

interface ClientData {
  budget?: string;
  liquidFundsForPurchase?: string;
}

interface SimpleNetSheetEstimatorProps {
  clientData: ClientData;
}

const SimpleNetSheetEstimator: React.FC<SimpleNetSheetEstimatorProps> = ({ clientData }) => {
  const [offerPrice, setOfferPrice] = useState('');
  const [closingCostsPercentage, setClosingCostsPercentage] = useState('3');
  const [loanAmountOffer, setLoanAmountOffer] = useState('');
  const [estimatedCashToClose, setEstimatedCashToClose] = useState<number | null>(null);

  useEffect(() => {
    const budgetLower = parseFloat(clientData.budget?.split('-')[0]?.replace(/\D/g, '') || '0') || 0;
    const liquidFunds = parseFloat(clientData.liquidFundsForPurchase?.replace(/\D/g, '') || '0') || 0;
    if (budgetLower > 0 && liquidFunds > 0 && !offerPrice) {
      setOfferPrice(budgetLower.toString());
    }
    if (offerPrice && liquidFunds > 0 && !loanAmountOffer) {
      const op = parseFloat(offerPrice) || 0;
      const estimatedDownPayment = Math.min(op * 0.2, liquidFunds);
      setLoanAmountOffer((op - estimatedDownPayment).toString());
    }
  }, [clientData.budget, clientData.liquidFundsForPurchase, offerPrice, loanAmountOffer]);

  const calculateNetSheet = () => {
    const op = parseFloat(offerPrice) || 0;
    const la = parseFloat(loanAmountOffer) || 0;
    const ccPercent = parseFloat(closingCostsPercentage) || 0;
    const cc = op * (ccPercent / 100);
    if (op > 0 && la >= 0 && ccPercent >= 0) {
      setEstimatedCashToClose(op + cc - la);
    } else {
      setEstimatedCashToClose(null);
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border mt-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <BarChart3 size={20} className="mr-2 text-pink-600" />
        Simple Net Sheet Estimator (Buyer)
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-sm">
        <div>
          <label htmlFor="offerPriceNet" className="block font-medium mb-1">Offer Price</label>
          <input 
            id="offerPriceNet" 
            type="number" 
            value={offerPrice} 
            onChange={(e) => setOfferPrice(e.target.value)} 
            className="w-full p-2 border rounded-md" 
            placeholder="e.g., 450000"
          />
        </div>
        <div>
          <label htmlFor="loanAmountOfferNet" className="block font-medium mb-1">Loan Amount</label>
          <input 
            id="loanAmountOfferNet" 
            type="number" 
            value={loanAmountOffer} 
            onChange={(e) => setLoanAmountOffer(e.target.value)} 
            className="w-full p-2 border rounded-md" 
            placeholder="e.g., 360000"
          />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="closingCostsNetPercent" className="block font-medium mb-1">Estimated Buyer Closing Costs (%)</label>
          <input 
            id="closingCostsNetPercent" 
            type="number" 
            step="0.1" 
            value={closingCostsPercentage} 
            onChange={(e) => setClosingCostsPercentage(e.target.value)} 
            className="w-full p-2 border rounded-md" 
            placeholder="e.g., 3"
          />
        </div>
      </div>
      <button 
        onClick={calculateNetSheet} 
        className="bg-pink-600 text-white px-6 py-2.5 rounded-md hover:bg-pink-700 transition-colors w-full md:w-auto text-sm"
      >
        Estimate Cash to Close
      </button>
      {estimatedCashToClose !== null && (
        <div className="mt-4 p-3 bg-pink-50 rounded-md border border-pink-200">
          <p className="text-md font-semibold text-pink-800">
            Estimated Cash to Close: <span className="text-lg font-bold">
              ${estimatedCashToClose.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </p>
          <p className="text-sm text-gray-600 mt-1">
            (Offer Price + Closing Costs @ {closingCostsPercentage}% - Loan Amount). This is a basic estimate.
          </p>
        </div>
      )}
    </div>
  );
};

export default SimpleNetSheetEstimator;