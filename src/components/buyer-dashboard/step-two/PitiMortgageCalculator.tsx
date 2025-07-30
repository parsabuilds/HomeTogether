import React, { useState, useEffect } from 'react';
import { Calculator } from 'lucide-react';

const PitiMortgageCalculator: React.FC = () => {
  const [homePrice, setHomePrice] = useState('');
  const [downPayment, setDownPayment] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('30');
  const [annualPropertyTax, setAnnualPropertyTax] = useState('');
  const [annualInsurance, setAnnualInsurance] = useState('');
  const [pAndI, setPAndI] = useState(0);
  const [monthlyTax, setMonthlyTax] = useState(0);
  const [monthlyInsurance, setMonthlyInsurance] = useState(0);
  const [totalPITI, setTotalPITI] = useState(0);
  const [loanAmount, setLoanAmount] = useState(0);

  useEffect(() => {
    const hp = parseFloat(homePrice) || 0;
    const dp = parseFloat(downPayment) || 0;
    setLoanAmount(Math.max(0, hp - dp));
  }, [homePrice, downPayment]);

  const calculatePITI = () => {
    const principal = loanAmount;
    const monthlyRate = parseFloat(interestRate) / 100 / 12;
    const numPayments = parseInt(loanTerm) * 12;
    const tax = parseFloat(annualPropertyTax) || 0;
    const insurance = parseFloat(annualInsurance) || 0;
    let currentPAndI = 0;
    if (principal > 0 && monthlyRate > 0 && numPayments > 0) {
      currentPAndI = principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
    }
    const currentMonthlyTax = tax / 12;
    const currentMonthlyInsurance = insurance / 12;
    setPAndI(currentPAndI);
    setMonthlyTax(currentMonthlyTax);
    setMonthlyInsurance(currentMonthlyInsurance);
    setTotalPITI(currentPAndI + currentMonthlyTax + currentMonthlyInsurance);
  };

  const PieChart = ({ data }: { data: Array<{ name: string; value: number; color: string }> }) => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    if (total === 0) return <p className="text-center text-gray-500 mt-4 text-sm">Enter values to see chart.</p>;
    let accumulatedPercentage = 0;
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    return (
      <svg viewBox="0 0 120 120" className="w-40 h-40 md:w-48 md:h-48 mx-auto mt-4">
        {data.map((item, index) => {
          if (item.value === 0) return null;
          const percentage = (item.value / total) * 100;
          const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;
          const strokeDashoffset = - (accumulatedPercentage / 100) * circumference;
          accumulatedPercentage += percentage;
          return (
            <circle 
              key={index} 
              cx="60" 
              cy="60" 
              r={radius} 
              fill="transparent" 
              stroke={item.color} 
              strokeWidth="20" 
              strokeDasharray={strokeDasharray} 
              strokeDashoffset={strokeDashoffset} 
              transform="rotate(-90 60 60)"
            />
          );
        })}
      </svg>
    );
  };

  const chartData = [
    { name: 'P&I', value: pAndI, color: '#3B82F6' },
    { name: 'Tax', value: monthlyTax, color: '#10B981' },
    { name: 'Insurance', value: monthlyInsurance, color: '#F59E0B' }
  ];

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <Calculator className="w-5 h-5 mr-2 text-green-600" />
        Estimated Monthly Payment (PITI) Calculator
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-sm">
        <div>
          <label htmlFor="homePriceCalc" className="block font-medium mb-1">Home Price</label>
          <input 
            id="homePriceCalc" 
            type="number" 
            value={homePrice} 
            onChange={(e) => setHomePrice(e.target.value)} 
            className="w-full p-2 border rounded-md" 
            placeholder="$500,000"
          />
        </div>
        <div>
          <label htmlFor="downPaymentPITI" className="block font-medium mb-1">Down Payment Amount</label>
          <input 
            id="downPaymentPITI" 
            type="number" 
            value={downPayment} 
            onChange={(e) => setDownPayment(e.target.value)} 
            className="w-full p-2 border rounded-md" 
            placeholder="$100,000"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Loan Amount (Auto-calculated)</label>
          <input 
            type="text" 
            value={`$${loanAmount.toLocaleString()}`} 
            readOnly 
            className="w-full p-2 border rounded-md bg-gray-100"
          />
        </div>
        <div>
          <label htmlFor="interestRatePITI" className="block font-medium mb-1">Interest Rate (%)</label>
          <input 
            id="interestRatePITI" 
            type="number" 
            step="0.01" 
            value={interestRate} 
            onChange={(e) => setInterestRate(e.target.value)} 
            className="w-full p-2 border rounded-md" 
            placeholder="6.5"
          />
        </div>
        <div>
          <label htmlFor="loanTermPITI" className="block font-medium mb-1">Loan Term (years)</label>
          <select 
            id="loanTermPITI" 
            value={loanTerm} 
            onChange={(e) => setLoanTerm(e.target.value)} 
            className="w-full p-2 border rounded-md"
          >
            <option value="30">30 years</option>
            <option value="20">20 years</option>
            <option value="15">15 years</option>
            <option value="10">10 years</option>
          </select>
        </div>
        <div>
          <label htmlFor="annualPropertyTax" className="block font-medium mb-1">Annual Property Tax</label>
          <input 
            id="annualPropertyTax" 
            type="number" 
            value={annualPropertyTax} 
            onChange={(e) => setAnnualPropertyTax(e.target.value)} 
            className="w-full p-2 border rounded-md" 
            placeholder="$6,000"
          />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="annualInsurance" className="block font-medium mb-1">Annual Homeowners Insurance</label>
          <input 
            id="annualInsurance" 
            type="number" 
            value={annualInsurance} 
            onChange={(e) => setAnnualInsurance(e.target.value)} 
            className="w-full p-2 border rounded-md" 
            placeholder="$1,200"
          />
        </div>
      </div>
      <button 
        onClick={calculatePITI} 
        className="bg-green-600 text-white px-6 py-2.5 rounded-md hover:bg-green-700 transition-colors w-full md:w-auto text-sm"
      >
        Calculate PITI
      </button>
      {totalPITI > 0 && (
        <div className="mt-6 p-4 bg-green-50 rounded-md border border-green-200">
          <h4 className="text-md font-semibold text-green-800 mb-3">Estimated Monthly Payment Breakdown:</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4 text-sm">
            <p>Principal & Interest (P&I): <span className="font-semibold">${pAndI.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></p>
            <p>Monthly Property Tax: <span className="font-semibold">${monthlyTax.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></p>
            <p>Monthly Homeowners Insurance: <span className="font-semibold">${monthlyInsurance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></p>
          </div>
          <p className="text-xl font-bold text-green-800 border-t border-green-300 pt-3">
            Total Estimated PITI: ${totalPITI.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <div className="mt-4">
            <PieChart data={chartData} />
            <div className="flex flex-wrap justify-center space-x-2 sm:space-x-4 mt-2 text-sm">
              {chartData.map(item => item.value > 0 && (
                <div key={item.name} className="flex items-center my-1">
                  <span className="w-3 h-3 rounded-full mr-1.5" style={{ backgroundColor: item.color }}></span>
                  {item.name} (${item.value.toFixed(0)})
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PitiMortgageCalculator;