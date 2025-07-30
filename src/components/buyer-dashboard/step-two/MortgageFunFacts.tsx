import React from 'react';
import { Award, FileBadge, BookOpen } from 'lucide-react';

const MortgageFunFacts: React.FC = () => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border mt-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <Award className="w-5 h-5 mr-2 text-amber-500" />
        Mortgage Mastery: Key Insights
      </h3>
      <div className="space-y-5 text-sm text-gray-700">
        <div>
          <h4 className="font-semibold text-gray-800 text-base">Getting Pre-Approved: Your First Big Step</h4>
          <p className="mt-1">A mortgage pre-approval gives you a clear idea of how much you can borrow and significantly strengthens your position when making an offer, as it shows sellers you're a serious, financially prepared buyer.</p>
          <h5 className="font-medium text-gray-700 mt-2 mb-1 text-sm">What You'll Typically Need:</h5>
          <ul className="list-disc list-inside space-y-0.5 pl-4 text-sm">
            <li>Proof of income (recent pay stubs, W-2s, tax returns)</li>
            <li>Employment verification</li>
            <li>Proof of assets (bank statements, investment accounts)</li>
            <li>Credit history and score</li>
            <li>Personal identification</li>
          </ul>
          <p className="mt-2 p-3 bg-sky-50 border-l-4 border-sky-500 text-sky-800 text-sm rounded-r-md">
            <strong className="font-semibold">Pro Tip:</strong> Shop around! Get pre-approval from 2-3 different lenders to compare rates, fees, and terms. This can save you thousands over the life of the loan.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-gray-800 text-base">Pre-Qualified vs. Pre-Approved</h4>
          <p className="mt-1"><strong>Pre-Qualification</strong> is an initial, informal estimate of borrowing capacity based on self-reported financial data. It's quick but not a commitment to lend.</p>
          <p className="mt-1"><strong>Pre-Approval</strong> involves a lender verifying your financial information (income, assets, debts, credit) to determine a specific loan amount they are tentatively willing to lend. It's a conditional commitment and much more powerful.</p>
        </div>
        <div>
          <h4 className="font-semibold text-gray-800 text-base">Common Mortgage Types:</h4>
          <div className="overflow-x-auto mt-1">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-2 text-left font-medium text-gray-600">Type</th>
                  <th className="px-3 py-2 text-left font-medium text-gray-600">Min. Down Payment</th>
                  <th className="px-3 py-2 text-left font-medium text-gray-600">Best For</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-3 py-2">Conventional</td>
                  <td className="px-3 py-2">Often 3-20%</td>
                  <td className="px-3 py-2">Good credit, stable income</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">FHA</td>
                  <td className="px-3 py-2">As low as 3.5%</td>
                  <td className="px-3 py-2">Lower credit scores, first-time buyers</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">VA</td>
                  <td className="px-3 py-2">Often 0%</td>
                  <td className="px-3 py-2">Eligible veterans, active service members</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">USDA</td>
                  <td className="px-3 py-2">Often 0%</td>
                  <td className="px-3 py-2">Eligible rural/suburban home buyers</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-gray-800 text-base">Annual Percentage Rate (APR)</h4>
          <p className="mt-1">APR represents the true yearly cost of your loan, including the interest rate and other charges like lender fees, discount points, and mortgage insurance. It's typically higher than the simple interest rate and is a better tool for comparing loan offers.</p>
        </div>
        <div>
          <h4 className="font-semibold text-gray-800 text-base">Loan Estimate (LE)</h4>
          <p className="mt-1">Within three business days of applying for a mortgage, your lender must provide a Loan Estimate. This standardized 3-page document clearly itemizes the loan terms, estimated monthly payments, and total closing costs. Use it to compare offers apples-to-apples.</p>
        </div>
        <div>
          <h4 className="font-semibold text-gray-800 text-base">Closing Disclosure (CD)</h4>
          <p className="mt-1">At least three business days before your closing date, you'll receive the Closing Disclosure. This 5-page document finalizes all terms and costs. Scrutinize it against your Loan Estimate to ensure everything aligns and there are no unexpected changes.</p>
        </div>
        <div className="pt-2">
          <h4 className="font-semibold text-gray-800 mb-2 text-base">Helpful Resources & Forms:</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <a 
              href="#" 
              onClick={(e) => e.preventDefault()} 
              className="flex items-center p-2.5 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              <FileBadge className="w-4 h-4 mr-2 text-gray-600 flex-shrink-0" />
              Uniform Residential Loan Application
            </a>
            <a 
              href="#" 
              onClick={(e) => e.preventDefault()} 
              className="flex items-center p-2.5 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              <FileBadge className="w-4 h-4 mr-2 text-gray-600 flex-shrink-0" />
              Sample Loan Estimate (LE)
            </a>
            <a 
              href="#" 
              onClick={(e) => e.preventDefault()} 
              className="flex items-center p-2.5 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              <FileBadge className="w-4 h-4 mr-2 text-gray-600 flex-shrink-0" />
              Sample Closing Disclosure (CD)
            </a>
            <a 
              href="https://www.consumerfinance.gov/owning-a-home/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center p-2.5 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              <BookOpen className="w-4 h-4 mr-2 text-gray-600 flex-shrink-0" />
              CFPB - Owning a Home Resources
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MortgageFunFacts;