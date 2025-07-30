import React, { useState } from 'react';
import { DollarSign } from 'lucide-react';

const ClosingCostFinalizer: React.FC = () => {
  const [leData, setLeData] = useState({ 
    loanAmount: '', 
    interestRate: '', 
    monthlyPI: '', 
    closingCosts: '', 
    cashToClose: '' 
  });
  const [cdData, setCdData] = useState({ 
    loanAmount: '', 
    interestRate: '', 
    monthlyPI: '', 
    closingCosts: '', 
    cashToClose: '' 
  });

  const handleLeChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
    const { name, value } = e.target; 
    setLeData(prev => ({ ...prev, [name]: value }));
  };

  const handleCdChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
    const { name, value } = e.target; 
    setCdData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border mt-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <DollarSign size={20} className="mr-2 text-teal-600"/>
        Closing Cost Finalizer/Worksheet
      </h3>
      <p className="text-sm text-gray-600 mb-4">Compare your Loan Estimate (LE) with your final Closing Disclosure (CD). Enter key figures below.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-sm">
        <section className="space-y-3 p-4 border border-gray-200 rounded-md">
          <h4 className="text-base font-semibold text-gray-700">Loan Estimate (LE) Figures</h4>
          <div>
            <label htmlFor="leLoanAmount" className="block text-xs font-medium">Loan Amount</label>
            <input type="number" id="leLoanAmount" name="loanAmount" value={leData.loanAmount} onChange={handleLeChange} className="mt-1 w-full p-2 border rounded-md" placeholder="e.g., 400000"/>
          </div>
          <div>
            <label htmlFor="leInterestRate" className="block text-xs font-medium">Interest Rate (%)</label>
            <input type="number" step="0.001" id="leInterestRate" name="interestRate" value={leData.interestRate} onChange={handleLeChange} className="mt-1 w-full p-2 border rounded-md" placeholder="e.g., 6.5"/>
          </div>
          <div>
            <label htmlFor="leMonthlyPI" className="block text-xs font-medium">Monthly P&I</label>
            <input type="number" id="leMonthlyPI" name="monthlyPI" value={leData.monthlyPI} onChange={handleLeChange} className="mt-1 w-full p-2 border rounded-md" placeholder="e.g., 2500"/>
          </div>
          <div>
            <label htmlFor="leClosingCosts" className="block text-xs font-medium">Total Closing Costs</label>
            <input type="number" id="leClosingCosts" name="closingCosts" value={leData.closingCosts} onChange={handleLeChange} className="mt-1 w-full p-2 border rounded-md" placeholder="e.g., 10000"/>
          </div>
          <div>
            <label htmlFor="leCashToClose" className="block text-xs font-medium">Cash to Close</label>
            <input type="number" id="leCashToClose" name="cashToClose" value={leData.cashToClose} onChange={handleLeChange} className="mt-1 w-full p-2 border rounded-md" placeholder="e.g., 110000"/>
          </div>
        </section>
        
        <section className="space-y-3 p-4 border border-gray-200 rounded-md">
          <h4 className="text-base font-semibold text-gray-700">Closing Disclosure (CD) Figures</h4>
          <div>
            <label htmlFor="cdLoanAmount" className="block text-xs font-medium">Loan Amount</label>
            <input type="number" id="cdLoanAmount" name="loanAmount" value={cdData.loanAmount} onChange={handleCdChange} className="mt-1 w-full p-2 border rounded-md" placeholder="e.g., 400000"/>
          </div>
          <div>
            <label htmlFor="cdInterestRate" className="block text-xs font-medium">Interest Rate (%)</label>
            <input type="number" step="0.001" id="cdInterestRate" name="interestRate" value={cdData.interestRate} onChange={handleCdChange} className="mt-1 w-full p-2 border rounded-md" placeholder="e.g., 6.5"/>
          </div>
          <div>
            <label htmlFor="cdMonthlyPI" className="block text-xs font-medium">Monthly P&I</label>
            <input type="number" id="cdMonthlyPI" name="monthlyPI" value={cdData.monthlyPI} onChange={handleCdChange} className="mt-1 w-full p-2 border rounded-md" placeholder="e.g., 2500"/>
          </div>
          <div>
            <label htmlFor="cdClosingCosts" className="block text-xs font-medium">Total Closing Costs</label>
            <input type="number" id="cdClosingCosts" name="closingCosts" value={cdData.closingCosts} onChange={handleCdChange} className="mt-1 w-full p-2 border rounded-md" placeholder="e.g., 10000"/>
          </div>
          <div>
            <label htmlFor="cdCashToClose" className="block text-xs font-medium">Cash to Close</label>
            <input type="number" id="cdCashToClose" name="cashToClose" value={cdData.cashToClose} onChange={handleCdChange} className="mt-1 w-full p-2 border rounded-md" placeholder="e.g., 110000"/>
          </div>
        </section>
      </div>
      <div className="mt-4 p-3 bg-teal-50 rounded-md border border-teal-200 text-sm">
        <h5 className="font-semibold text-teal-700 mb-1">Common Buyer Closing Costs May Include:</h5>
        <ul className="list-disc list-inside text-sm text-gray-600">
          <li>Lender Origination Fees</li>
          <li>Appraisal Fee</li>
          <li>Credit Report Fee</li>
          <li>Title Insurance (Lender's & Owner's)</li>
          <li>Escrow/Closing Agent Fees</li>
          <li>Recording Fees</li>
          <li>Prepaid Interest, Property Taxes, Homeowners Insurance</li>
        </ul>
      </div>
    </div>
  );
};

export default ClosingCostFinalizer;