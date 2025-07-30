import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { CheckCircle, User, TrendingUp, Home, Camera, FileText, Key, Info, LogOut, ArrowLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import { getDashboard, updateDashboard } from '../firebase/firestore';
import SellerConsultationSection from '../components/seller-dashboard/step-one/SellerConsultationSection';
import MarketAnalysisSection from '../components/seller-dashboard/step-two/MarketAnalysisSection';
import PropertyPreparationSection from '../components/seller-dashboard/step-three/PropertyPreparationSection';
import MarketingSection from '../components/seller-dashboard/step-four/MarketingSection';
import OfferNegotiationSection from '../components/seller-dashboard/step-five/OfferNegotiationSection';
import ClosingProcessSection from '../components/seller-dashboard/step-six/ClosingProcessSection';

// Main Dashboard Component
const SellerDashboard = () => {
  const { currentUser, userRole, logout } = useAuth();
  const navigate = useNavigate();
  const { dashboardId } = useParams<{ dashboardId: string }>();
  const [loading, setLoading] = useState(true);
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [checkedItems, setCheckedItems] = useState({});

  // Seller-specific state
  const [sellerData, setSellerData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyAddress: '',
    propertyType: '',
    bedrooms: '',
    bathrooms: '',
    squareFootage: '',
    lotSize: '',
    yearBuilt: '',
    desiredPrice: '',
    timeframe: '',
    motivation: '',
    currentMortgage: '',
    moveOutDate: ''
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  
  // Agreement URL
  const [agreementUrl, setAgreementUrl] = useState('');
  
  // Notes for each step
  const [consultationClientNotes, setConsultationClientNotes] = useState('');
  const [consultationAgentNotes, setConsultationAgentNotes] = useState('');
  const [pricingClientNotes, setPricingClientNotes] = useState('');
  const [pricingAgentNotes, setPricingAgentNotes] = useState('');
  const [preparationClientNotes, setPreparationClientNotes] = useState('');
  const [preparationAgentNotes, setPreparationAgentNotes] = useState('');
  const [marketingClientNotes, setMarketingClientNotes] = useState('');
  const [marketingAgentNotes, setMarketingAgentNotes] = useState('');
  const [offersClientNotes, setOffersClientNotes] = useState('');
  const [offersAgentNotes, setOffersAgentNotes] = useState('');
  const [closingClientNotes, setClosingClientNotes] = useState('');
  const [closingAgentNotes, setClosingAgentNotes] = useState('');

  // Tools state
  const [offers, setOffers] = useState<any[]>([]);

  // Load dashboard data on mount
  useEffect(() => {
    if (!dashboardId) {
      navigate('/dashboard');
      return;
    }

    const loadDashboardData = async () => {
      try {
        const result = await getDashboard(dashboardId);
        if (result.success && result.dashboard) {
          const dashboard = result.dashboard;
          
          // Load seller data
          if (dashboard.sellerData) {
            setSellerData(dashboard.sellerData);
            setFormSubmitted(true);
          }
          
          // Load agreement URL
          if (dashboard.agreementUrl) {
            setAgreementUrl(dashboard.agreementUrl);
          }
          
          // Load progress data
          if (dashboard.progressData) {
            setCheckedItems(dashboard.progressData.checkedItems || {});
            setCompletedSteps(new Set(dashboard.progressData.completedSteps || []));
          }
          
          // Load notes
          if (dashboard.notes) {
            setConsultationClientNotes(dashboard.notes.consultation?.clientNotes || '');
            setConsultationAgentNotes(dashboard.notes.consultation?.agentNotes || '');
            setPricingClientNotes(dashboard.notes.pricing?.clientNotes || '');
            setPricingAgentNotes(dashboard.notes.pricing?.agentNotes || '');
            setPreparationClientNotes(dashboard.notes.preparation?.clientNotes || '');
            setPreparationAgentNotes(dashboard.notes.preparation?.agentNotes || '');
            setMarketingClientNotes(dashboard.notes.marketing?.clientNotes || '');
            setMarketingAgentNotes(dashboard.notes.marketing?.agentNotes || '');
            setOffersClientNotes(dashboard.notes.offers?.clientNotes || '');
            setOffersAgentNotes(dashboard.notes.offers?.agentNotes || '');
            setClosingClientNotes(dashboard.notes.closing?.clientNotes || '');
            setClosingAgentNotes(dashboard.notes.closing?.agentNotes || '');
          }

          // Load offers
          if (dashboard.offers) {
            setOffers(dashboard.offers);
          }
        }
      } catch (error) {
        console.error('Error loading dashboard:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, [dashboardId, navigate]);

  // Save data to Firebase when changes are made
  const saveDashboardData = useCallback(async () => {
    if (!dashboardId) return;
    
    try {
      const updateData = {
        sellerData,
        agreementUrl,
        progressData: {
          completedSteps: Array.from(completedSteps),
          checkedItems,
          overallProgress: calculateProgress()
        },
        notes: {
          consultation: {
            clientNotes: consultationClientNotes,
            agentNotes: consultationAgentNotes
          },
          pricing: {
            clientNotes: pricingClientNotes,
            agentNotes: pricingAgentNotes
          },
          preparation: {
            clientNotes: preparationClientNotes,
            agentNotes: preparationAgentNotes
          },
          marketing: {
            clientNotes: marketingClientNotes,
            agentNotes: marketingAgentNotes
          },
          offers: {
            clientNotes: offersClientNotes,
            agentNotes: offersAgentNotes
          },
          closing: {
            clientNotes: closingClientNotes,
            agentNotes: closingAgentNotes
          }
        },
        offers,
        progress: calculateProgress()
      };
      
      await updateDashboard(dashboardId, updateData);
    } catch (error) {
      console.error('Error saving dashboard:', error);
    }
  }, [dashboardId, sellerData, agreementUrl, completedSteps, checkedItems, consultationClientNotes, consultationAgentNotes, pricingClientNotes, pricingAgentNotes, preparationClientNotes, preparationAgentNotes, marketingClientNotes, marketingAgentNotes, offersClientNotes, offersAgentNotes, closingClientNotes, closingAgentNotes, offers]);

  // Auto-save when data changes
  useEffect(() => {
    if (!loading && dashboardId) {
      const saveTimeout = setTimeout(saveDashboardData, 1000); // Debounce saves
      return () => clearTimeout(saveTimeout);
    }
  }, [sellerData, agreementUrl, checkedItems, consultationClientNotes, consultationAgentNotes, pricingClientNotes, pricingAgentNotes, preparationClientNotes, preparationAgentNotes, marketingClientNotes, marketingAgentNotes, offersClientNotes, offersAgentNotes, closingClientNotes, closingAgentNotes, offers, formSubmitted, loading, saveDashboardData]);

  const steps = useMemo(() => [
    { id: 0, title: "1. Seller Consultation", icon: User, description: "Understanding your selling goals and property", color: "from-purple-500 to-violet-500" },
    { id: 1, title: "2. Market Analysis & Pricing", icon: TrendingUp, description: "Determine optimal pricing strategy", color: "from-green-500 to-emerald-500" },
    { id: 2, title: "3. Property Preparation", icon: Home, description: "Prepare your home for the market", color: "from-blue-500 to-cyan-500" },
    { id: 3, title: "4. Marketing & Showings", icon: Camera, description: "Market your property and manage showings", color: "from-orange-500 to-amber-500" },
    { id: 4, title: "5. Offers & Negotiation", icon: FileText, description: "Review and negotiate offers", color: "from-pink-500 to-rose-500" },
    { id: 5, title: "6. Closing Process", icon: Key, description: "Complete the sale and transfer ownership", color: "from-teal-500 to-cyan-500" }
  ], []);

  const stepContent = useMemo(() => ({
    0: { 
      checklist: [
        "Complete comprehensive seller intake form",
        "Property assessment and walkthrough",
        "Discuss selling timeline and goals",
        "Review market conditions",
        "Sign listing agreement"
      ], 
      tools: "seller-consultation" 
    },
    1: { 
      checklist: [
        "Analyze comparable sales (CMA)",
        "Review current market conditions",
        "Determine pricing strategy",
        "Set initial listing price",
        "Plan for potential price adjustments"
      ], 
      tools: "market-analysis" 
    },
    2: { 
      checklist: [
        "Complete home inspection (optional)",
        "Address necessary repairs",
        "Stage the property",
        "Professional photography",
        "Prepare property disclosures"
      ], 
      tools: "property-preparation" 
    },
    3: { 
      checklist: [
        "Create marketing materials",
        "List on MLS and websites",
        "Schedule professional photos",
        "Plan open houses",
        "Coordinate showing appointments"
      ], 
      tools: "marketing-tools" 
    },
    4: { 
      checklist: [
        "Review incoming offers",
        "Analyze offer terms and conditions",
        "Negotiate with potential buyers",
        "Accept best offer",
        "Sign purchase agreement"
      ], 
      tools: "offer-management" 
    },
    5: { 
      checklist: [
        "Coordinate buyer inspections",
        "Handle any repair negotiations",
        "Prepare for final walkthrough",
        "Review closing documents",
        "Complete the sale and transfer keys"
      ], 
      tools: "closing-tools" 
    }
  }), []);

  const toggleChecklistItem = (stepId, itemIndex) => {
    const key = `${stepId}-${itemIndex}`;
    setCheckedItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const isStepComplete = useCallback((stepId) => {
    const items = stepContent[stepId]?.checklist || [];
    if (items.length === 0) return true;
    return items.every((_, index) => checkedItems[`${stepId}-${index}`]);
  }, [stepContent, checkedItems]);

  useEffect(() => {
    const newCompletedSteps = new Set();
    steps.forEach(step => {
      if (isStepComplete(step.id)) newCompletedSteps.add(step.id);
    });
    setCompletedSteps(newCompletedSteps);
  }, [checkedItems, steps, isStepComplete]);

  const calculateProgress = () => {
    const stepWeights = [0.15, 0.20, 0.25, 0.15, 0.15, 0.10];
    let totalProgress = 0;
    steps.forEach((step, index) => {
      const items = stepContent[step.id]?.checklist || [];
      const completedItemsInStep = items.filter((_, itemIndex) => 
        checkedItems[`${step.id}-${itemIndex}`]
      ).length;
      const stepProgress = items.length > 0 ? (completedItemsInStep / items.length) : 0;
      totalProgress += stepProgress * (stepWeights[index] || 0.15);
    });
    return Math.round(totalProgress * 100);
  };

  const handleAddOffer = (offer) => {
    setOffers(prev => [...prev, offer]);
  };

  const renderTool = (toolType) => {
    switch (toolType) {
      case 'seller-consultation':
        return (
          <SellerConsultationSection
            sellerData={sellerData}
            setSellerData={setSellerData}
            formSubmitted={formSubmitted}
            setFormSubmitted={setFormSubmitted}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            isMinimized={isMinimized}
            setIsMinimized={setIsMinimized}
            agreementUrl={agreementUrl}
            setAgreementUrl={setAgreementUrl}
            consultationClientNotes={consultationClientNotes}
            setConsultationClientNotes={setConsultationClientNotes}
            consultationAgentNotes={consultationAgentNotes}
            setConsultationAgentNotes={setConsultationAgentNotes}
          />
        );
      case 'market-analysis':
        return (
          <MarketAnalysisSection
            pricingClientNotes={pricingClientNotes}
            setPricingClientNotes={setPricingClientNotes}
            pricingAgentNotes={pricingAgentNotes}
            setPricingAgentNotes={setPricingAgentNotes}
          />
        );
      case 'property-preparation':
        return (
          <PropertyPreparationSection
            preparationClientNotes={preparationClientNotes}
            setPreparationClientNotes={setPreparationClientNotes}
            preparationAgentNotes={preparationAgentNotes}
            setPreparationAgentNotes={setPreparationAgentNotes}
          />
        );
      case 'marketing-tools':
        return (
          <MarketingSection
            marketingClientNotes={marketingClientNotes}
            setMarketingClientNotes={setMarketingClientNotes}
            marketingAgentNotes={marketingAgentNotes}
            setMarketingAgentNotes={setMarketingAgentNotes}
          />
        );
      case 'offer-management':
        return (
          <OfferNegotiationSection
            offers={offers}
            onAddOffer={handleAddOffer}
            offersClientNotes={offersClientNotes}
            setOffersClientNotes={setOffersClientNotes}
            offersAgentNotes={offersAgentNotes}
            setOffersAgentNotes={setOffersAgentNotes}
          />
        );
      case 'closing-tools':
        return (
          <ClosingProcessSection
            closingClientNotes={closingClientNotes}
            setClosingClientNotes={setClosingClientNotes}
            closingAgentNotes={closingAgentNotes}
            setClosingAgentNotes={setClosingAgentNotes}
          />
        );
      default:
        return (
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <p className="text-gray-600 text-sm">Tools for this step are under construction.</p>
          </div>
        );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 to-purple-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading seller dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-purple-100 font-sans">
      {/* Header */}
      <header className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
         <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Your Home Selling Journey</h1>
              <p className="text-slate-600 mt-0.5 text-xs sm:text-sm">
                Let's get your home sold, {sellerData.name || currentUser?.name || 'Client'}!
              </p>
            </div>
           <div className="flex items-center justify-between sm:justify-end space-x-4">
             <div className="text-right sm:text-right">
                <div className="text-xl sm:text-2xl font-bold text-purple-600">{calculateProgress()}%</div>
                <div className="text-xs text-slate-500">Complete</div>
              </div>
              {userRole === 'agent' ? (
                <button
                  onClick={() => navigate('/dashboard')}
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                  title="Back to Dashboard"
                >
                  <ArrowLeft size={20} />
                  <span className="hidden sm:inline">Back</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                  title="Logout"
                >
                  <LogOut size={20} />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              )}
            </div>
          </div>
          <div className="mt-3">
            <div className="bg-slate-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-purple-500 to-violet-400 h-2 rounded-full transition-all duration-500 ease-out" 
                style={{ width: `${calculateProgress()}%` }}
              ></div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sidebar */}
          <aside className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-5 sticky top-24">
              <h2 className="text-lg font-semibold mb-4 text-slate-700">Selling Process</h2>
              <nav className="space-y-2">
                {steps.map((step) => {
                  const IconComponent = step.icon;
                  const isComplete = completedSteps.has(step.id);
                  const isCurrent = activeStep === step.id;

                  return (
                    <button
                      key={step.id}
                      onClick={() => setActiveStep(step.id)}
                      className={`w-full flex items-center p-3 rounded-lg transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-400 ${
                        isCurrent 
                          ? 'bg-purple-100 border-purple-500 shadow-sm text-purple-700' 
                          : isComplete 
                            ? 'bg-green-50 border-green-300 hover:bg-green-100 text-green-700' 
                            : 'bg-slate-50 border-slate-200 hover:bg-slate-100 hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0 ${
                        isComplete 
                          ? 'bg-green-500 text-white' 
                          : isCurrent 
                            ? 'bg-purple-500 text-white' 
                            : 'bg-slate-300'
                      }`}>
                        {isComplete ? <CheckCircle size={16} /> : <IconComponent size={16} />}
                      </div>
                      <div className="flex-1 min-w-0 text-left">
                        <p className="text-sm font-medium truncate">{step.title}</p>
                      </div>
                      {isCurrent && <div className="w-1.5 h-1.5 bg-purple-500 rounded-full ml-auto"></div>}
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <section className="lg:col-span-9 space-y-6">
            {/* Step Header */}
            <div className={`bg-gradient-to-r ${steps[activeStep]?.color || 'from-gray-500 to-gray-600'} rounded-xl shadow-lg p-6 text-white`}>
              <div className="flex items-center mb-1.5">
                {React.createElement(steps[activeStep]?.icon || Info, { className: "w-6 h-6 mr-2.5" })}
                <h2 className="text-xl font-bold">{steps[activeStep]?.title}</h2>
              </div>
              <p className="text-white/90 text-sm">{steps[activeStep]?.description}</p>
            </div>

            {/* Checklist */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-4 text-slate-700">Checklist</h3>
              <div className="space-y-2.5">
                {stepContent[activeStep]?.checklist?.map((item, index) => {
                  const isChecked = checkedItems[`${activeStep}-${index}`];
                  return (
                    <label 
                      key={index} 
                      className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors duration-150 ${
                        isChecked ? 'bg-green-50 border-green-200' : 'hover:bg-slate-50 border-slate-200'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={!!isChecked}
                        onChange={() => toggleChecklistItem(activeStep, index)}
                        className="h-4 w-4 text-green-500 border-gray-300 rounded focus:ring-green-400 mr-3 flex-shrink-0"
                      />
                      <span className={`text-sm ${isChecked ? 'line-through text-slate-500' : 'text-slate-700'}`}>
                        {item}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Tools */}
            {stepContent[activeStep]?.tools && renderTool(stepContent[activeStep].tools)}

            {/* Navigation */}
            <div className="flex justify-between items-center pt-3">
              <button
                onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                disabled={activeStep === 0}
                className="px-5 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => setActiveStep(Math.min(steps.length - 1, activeStep + 1))}
                disabled={activeStep === steps.length - 1}
                className="px-5 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-xs text-slate-500 border-t border-slate-200 mt-10">
        <p>&copy; {new Date().getFullYear()} AgentIQ Seller Dashboard. All rights reserved.</p>
        <p>Built for {sellerData.name || "Our Valued Client"}</p>
      </footer>
    </div>
  );
};

export default SellerDashboard;