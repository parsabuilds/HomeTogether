import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { CheckCircle, Circle, DollarSignIcon, User, Search, FileText, Shield, Key, Info, ArrowLeft, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import { getDashboard, updateDashboard } from '../firebase/firestore';
import BuyerIntakeSection from '../components/buyer-dashboard/step-one/BuyerIntakeSection';
import FinancialToolsSection from '../components/buyer-dashboard/step-two/FinancialToolsSection';
import HouseHuntingSection from '../components/buyer-dashboard/step-three/HouseHuntingSection';
import OfferNegotiationSection from '../components/buyer-dashboard/step-four/OfferNegotiationSection';
import InspectionDiligenceSection from '../components/buyer-dashboard/step-five/InspectionDiligenceSection';
import ClosingProcessSection from '../components/buyer-dashboard/step-six/ClosingProcessSection';
import NotesSection from '../components/buyer-dashboard/shared/NotesSection';
import { X } from 'lucide-react';

interface ClientData {
  name: string;
  email: string;
  phone: string;
  currentAddress: string;
  budget: string;
  liquidFundsForPurchase: string;
  timeframe: string;
  location: string;
  propertyType: string[];
  houseStyle: string;
  bedrooms: string;
  bathrooms: string;
  squareFootage: string;
  amenities: string[];
  mustHaveFeatures: string;
  dealBreakers: string;
  motivation: string;
  currentLiving: string;
  firstTimeBuyer: string;
  additionalBuyers: string;
  monthlyIncome: string;
  employmentStatus: string;
  creditScore: string;
  specialRequirements: string;
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
    ratings?: Record<string, number>;
    pros?: string;
    cons?: string;
    averageScore?: number;
  };
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

interface DiligenceTask {
  id: number;
  taskName: string;
  scheduledDate: string;
  vendorContact: string;
  reportDueDate: string;
  status: string;
  notes: string;
}

interface RepairItem {
  id: number;
  issueDescription: string;
  desiredAction: string;
  estimatedCost: string;
  notes: string;
}

interface CriticalDate {
  id: number;
  description: string;
  dueDate: string;
  responsibleParty: string;
  status: string;
  notes: string;
}

interface DocumentLink {
  id: number;
  documentName: string;
  url: string;
  uploadedBy: string;
  dateAdded: string;
}

interface FinalWalkthroughItem {
  text: string;
  checked: boolean;
}

interface UtilityItem {
  id: number;
  type: string;
  provider: string;
  account: string;
  scheduledDate: string;
  confirmation: string;
  status: string;
}

interface MovingTask {
  text: string;
  checked: boolean;
}

const BuyerDashboard: React.FC = () => {
  const { userRole, logout } = useAuth();
  const navigate = useNavigate();
  const { dashboardId } = useParams<{ dashboardId: string }>();
  
  // State management
  const [loading, setLoading] = useState(true);
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [checkedItems, setCheckedItems] = useState({});
  
  // Client data and form states
  const [clientData, setClientData] = useState<ClientData>({
    name: '',
    email: '',
    phone: '',
    currentAddress: '',
    budget: '',
    liquidFundsForPurchase: '',
    timeframe: '',
    location: '',
    propertyType: [],
    houseStyle: '',
    bedrooms: '',
    bathrooms: '',
    squareFootage: '',
    amenities: [],
    mustHaveFeatures: '',
    dealBreakers: '',
    motivation: '',
    currentLiving: '',
    firstTimeBuyer: '',
    additionalBuyers: '',
    monthlyIncome: '',
    employmentStatus: '',
    creditScore: '',
    specialRequirements: ''
  });
  
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isIntakeFormMinimized, setIsIntakeFormMinimized] = useState(false);
  
  // Agreement and notes
  const [agreementUrl, setAgreementUrl] = useState('');
  const [clientNotes, setClientNotes] = useState('');
  const [agentNotes, setAgentNotes] = useState('');
  const [financialClientNotes, setFinancialClientNotes] = useState('');
  const [financialAgentNotes, setFinancialAgentNotes] = useState('');
  const [houseHuntingClientNotes, setHouseHuntingClientNotes] = useState('');
  const [houseHuntingAgentNotes, setHouseHuntingAgentNotes] = useState('');
  const [offerClientNotes, setOfferClientNotes] = useState('');
  const [offerAgentNotes, setOfferAgentNotes] = useState('');
  const [inspectionClientNotes, setInspectionClientNotes] = useState('');
  const [inspectionAgentNotes, setInspectionAgentNotes] = useState('');
  const [closingClientNotes, setClosingClientNotes] = useState('');
  const [closingAgentNotes, setClosingAgentNotes] = useState('');

  // Property tracking
  const [clientProperties, setClientProperties] = useState<Property[]>([]);
  const [agentProperties, setAgentProperties] = useState<Property[]>([]);
  const [showAddPropertyModal, setShowAddPropertyModal] = useState(false);
  const [editingProperty, setEditingProperty] = useState<{type: string; index: number; data: Property} | null>(null);
  const [propertyModalData, setPropertyModalData] = useState<Property & {type: string}>({
    type: 'client',
    address: '',
    price: '',
    beds: '',
    baths: '',
    sqft: '',
    imageUrl: '',
    listingUrl: '',
    notes: '',
    scorecard: { ratings: {}, pros: '', cons: '', averageScore: 0 }
  });
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [currentPropertyForNotes, setCurrentPropertyForNotes] = useState<{type: string; index: number} | null>(null);
  const [propertyNoteInput, setPropertyNoteInput] = useState('');
  const [showScorecardModal, setShowScorecardModal] = useState(false);
  const [currentPropertyForScorecard, setCurrentPropertyForScorecard] = useState<{type: string; index: number; data: Property} | null>(null);
  const [scorecardData, setScorecardData] = useState<{ratings: Record<string, number>; pros: string; cons: string}>({
    ratings: {},
    pros: '',
    cons: ''
  });

  // Offer and negotiation tracking
  const [offerTrackItems, setOfferTrackItems] = useState<OfferTrackItem[]>([]);
  
  // Inspection and due diligence tracking
  const [diligenceTasks, setDiligenceTasks] = useState<DiligenceTask[]>([]);
  const [repairRequestItems, setRepairRequestItems] = useState<RepairItem[]>([]);
  const [criticalDates, setCriticalDates] = useState<CriticalDate[]>([]);
  const [documentHubLinks, setDocumentHubLinks] = useState<DocumentLink[]>([]);
  
  // Closing process tracking
  const [finalWalkthroughItems, setFinalWalkthroughItems] = useState<FinalWalkthroughItem[]>([
    { text: "All agreed-upon repairs completed and satisfactory", checked: false },
    { text: "All appliances are present and in working order (as per contract)", checked: false },
    { text: "HVAC (heating & cooling) systems are functioning", checked: false },
    { text: "Plumbing (faucets, toilets, showers) working, no new leaks", checked: false },
    { text: "Electrical systems (lights, outlets, fans) working", checked: false },
    { text: "No new damage to walls, floors, ceilings, windows since last viewing", checked: false },
    { text: "Property is clean and free of debris/seller's personal items (as agreed)", checked: false },
    { text: "All included fixtures and personal property are present", checked: false },
    { text: "Keys, garage door openers, and any relevant codes/manuals provided", checked: false },
  ]);
  const [utilityTransferItems, setUtilityTransferItems] = useState<UtilityItem[]>([]);
  const [movingDayTasks, setMovingDayTasks] = useState<MovingTask[]>([
    { text: "Confirm moving company/truck rental 2 weeks prior", checked: false },
    { text: "Start packing non-essential items", checked: false },
    { text: "Notify relevant parties of address change (banks, subscriptions, etc.)", checked: false },
    { text: "Arrange for child/pet care for moving day if needed", checked: false },
    { text: "Pack an 'essentials' box for the first 24 hours", checked: false },
    { text: "Confirm utility transfer dates", checked: false },
    { text: "Do a final sweep of old residence before leaving", checked: false },
  ]);

  const calculateProgress = () => { 
    const stepWeights = [0.1, 0.15, 0.25, 0.20, 0.15, 0.15]; 
    let totalProgress = 0; 
    steps.forEach((step, index) => { 
      const items = stepContent[step.id]?.checklist || []; 
      const completedItemsInStep = items.filter((_, itemIndex) => checkedItems[`${step.id}-${itemIndex}`]).length; 
      const stepProgress = items.length > 0 ? (completedItemsInStep / items.length) : 0; 
      totalProgress += stepProgress * (stepWeights[index] || 0.15); 
    }); 
    return Math.round(totalProgress * 100);
  };

  // Load dashboard data
  useEffect(() => {
    const loadDashboardData = async () => {
      if (!dashboardId) {
        setLoading(false);
        return;
      }
      
      try {
        const result = await getDashboard(dashboardId);
        if (result.success && result.dashboard) {
          const dashboard = result.dashboard;
          
          // Load all saved data
          if (dashboard.clientData) {
            setClientData(dashboard.clientData);
            setFormSubmitted(true);
          }
          
          if (dashboard.agreementUrl) {
            setAgreementUrl(dashboard.agreementUrl);
          }
          
          if (dashboard.progressData) {
            setCompletedSteps(new Set(dashboard.progressData.completedSteps || []));
            setCheckedItems(dashboard.progressData.checkedItems || {});
          }
          
          if (dashboard.notes) {
            setClientNotes(dashboard.notes.consultation?.clientNotes || '');
            setAgentNotes(dashboard.notes.consultation?.agentNotes || '');
            setFinancialClientNotes(dashboard.notes.financial?.clientNotes || '');
            setFinancialAgentNotes(dashboard.notes.financial?.agentNotes || '');
            setHouseHuntingClientNotes(dashboard.notes.houseHunting?.clientNotes || '');
            setHouseHuntingAgentNotes(dashboard.notes.houseHunting?.agentNotes || '');
            setOfferClientNotes(dashboard.notes.offer?.clientNotes || '');
            setOfferAgentNotes(dashboard.notes.offer?.agentNotes || '');
            setInspectionClientNotes(dashboard.notes.inspection?.clientNotes || '');
            setInspectionAgentNotes(dashboard.notes.inspection?.agentNotes || '');
            setClosingClientNotes(dashboard.notes.closing?.clientNotes || '');
            setClosingAgentNotes(dashboard.notes.closing?.agentNotes || '');
          }
          
          // Load properties
          if (dashboard.clientProperties) {
            setClientProperties(dashboard.clientProperties);
          }
          if (dashboard.agentProperties) {
            setAgentProperties(dashboard.agentProperties);
          }
          
          // Load other data arrays
          if (dashboard.offerTrackItems) {
            setOfferTrackItems(dashboard.offerTrackItems);
          }
          if (dashboard.diligenceTasks) {
            setDiligenceTasks(dashboard.diligenceTasks);
          }
          if (dashboard.repairRequestItems) {
            setRepairRequestItems(dashboard.repairRequestItems);
          }
          if (dashboard.criticalDates) {
            setCriticalDates(dashboard.criticalDates);
          }
          if (dashboard.documentHubLinks) {
            setDocumentHubLinks(dashboard.documentHubLinks);
          }
          if (dashboard.finalWalkthroughItems) {
            setFinalWalkthroughItems(dashboard.finalWalkthroughItems);
          }
          if (dashboard.utilityTransferItems) {
            setUtilityTransferItems(dashboard.utilityTransferItems);
          }
          if (dashboard.movingDayTasks) {
            setMovingDayTasks(dashboard.movingDayTasks);
          }
        }
      } catch (error) {
        console.error('Error loading dashboard:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, [dashboardId]);

  // Save dashboard data
  const saveDashboardData = useCallback(async () => {
    if (!dashboardId) return;
    
    try {
      const updateData = {
        clientData,
        agreementUrl,
        notes: {
          consultation: {
            clientNotes: clientNotes,
            agentNotes: agentNotes
          },
          financial: {
            clientNotes: financialClientNotes,
            agentNotes: financialAgentNotes
          },
          houseHunting: {
            clientNotes: houseHuntingClientNotes,
            agentNotes: houseHuntingAgentNotes
          },
          offer: {
            clientNotes: offerClientNotes,
            agentNotes: offerAgentNotes
          },
          inspection: {
            clientNotes: inspectionClientNotes,
            agentNotes: inspectionAgentNotes
          },
          closing: {
            clientNotes: closingClientNotes,
            agentNotes: closingAgentNotes
          }
        },
        clientProperties,
        agentProperties,
        offerTrackItems,
        diligenceTasks,
        repairRequestItems,
        criticalDates,
        documentHubLinks,
        finalWalkthroughItems,
        utilityTransferItems,
        movingDayTasks,
        progressData: {
          completedSteps: Array.from(completedSteps),
          checkedItems,
          overallProgress: calculateProgress()
        },
        progress: calculateProgress()
      };
      
      await updateDashboard(dashboardId, updateData);
    } catch (error) {
      console.error('Error saving dashboard:', error);
    }
  }, [
    dashboardId, 
    clientData, 
    agreementUrl, 
    clientNotes, 
    agentNotes, 
    financialClientNotes, 
    financialAgentNotes,
    houseHuntingClientNotes,
    houseHuntingAgentNotes,
    offerClientNotes,
    offerAgentNotes,
    inspectionClientNotes,
    inspectionAgentNotes,
    closingClientNotes,
    closingAgentNotes,
    completedSteps, 
    checkedItems,
    clientProperties,
    agentProperties,
    offerTrackItems,
    diligenceTasks,
    repairRequestItems,
    criticalDates,
    documentHubLinks,
    finalWalkthroughItems,
    utilityTransferItems,
    movingDayTasks
  ]);

  // Auto-save changes
  useEffect(() => {
    if (!loading && dashboardId) {
      const saveTimeout = setTimeout(saveDashboardData, 1000);
      return () => clearTimeout(saveTimeout);
    }
  }, [
    clientData, 
    agreementUrl,
    clientNotes,
    agentNotes,
    financialClientNotes,
    financialAgentNotes,
    houseHuntingClientNotes,
    houseHuntingAgentNotes,
    offerClientNotes,
    offerAgentNotes,
    inspectionClientNotes,
    inspectionAgentNotes,
    closingClientNotes,
    closingAgentNotes,
    checkedItems, 
    completedSteps,
    clientProperties,
    agentProperties,
    offerTrackItems,
    diligenceTasks,
    repairRequestItems,
    criticalDates,
    documentHubLinks,
    finalWalkthroughItems,
    utilityTransferItems,
    movingDayTasks,
    formSubmitted,
    loading,
    saveDashboardData
  ]);

  const steps = useMemo(() => [
    { id: 0, title: "1. Client Intake & Consultation", icon: User, description: "Let's get to know you and your homebuying goals", color: "from-blue-500 to-cyan-500" },
    { id: 1, title: "2. Financial Pre-Approval", icon: DollarSignIcon, description: "Secure your financing and determine your budget", color: "from-green-500 to-emerald-500" },
    { id: 2, title: "3. House Hunting", icon: Search, description: "Find, analyze, and view potential homes", color: "from-purple-500 to-violet-500" },
    { id: 3, title: "4. Offer & Negotiation", icon: FileText, description: "Make competitive offers and negotiate terms", color: "from-pink-500 to-rose-500" },
    { id: 4, title: "5. Under Contract & Inspections", icon: Shield, description: "Conduct due diligence and inspections", color: "from-indigo-500 to-blue-500" },
    { id: 5, title: "6. Closing Process", icon: Key, description: "Finalize the purchase and get your keys", color: "from-teal-500 to-cyan-500" }
  ], []);

  const stepContent = useMemo(() => ({
    0: { checklist: ["Complete comprehensive buyer intake form", "Review and confirm all submitted information", "Add any additional notes or special requirements", "Sign buyer representation agreement", "Schedule initial consultation meeting"], tools: "intake-form" },
    1: { checklist: ["Gather Financial Documents", "Choose a Lender", "Submit Loan Application", "Receive Pre-Approval Letter", "Understand Loan Terms"], tools: "financial-tools" },
    2: { checklist: ["Define search area and must-haves vs nice-to-haves", "Set up MLS property alerts", "Review online listings", "Schedule viewings", "Research neighborhood amenities", "Review property history and disclosures"], tools: "house-hunting-tools" },
    3: { checklist: ["Prepare competitive market analysis", "Draft and submit purchase offer", "Negotiate price and terms", "Review and sign purchase agreement", "Submit earnest money deposit"], tools: "offer-negotiation-tools" }, 
    4: { checklist: ["Order home inspection", "Review inspection report", "Request repairs or credits if needed", "Finalize mortgage application", "Conduct final walkthrough"], tools: "inspection-diligence-tools" },
    5: { checklist: ["Review closing disclosure", "Secure homeowner's insurance", "Conduct final walkthrough", "Sign closing documents", "Receive keys and celebrate!"], tools: "closing-tools" } 
  }), []);

  const toggleChecklistItem = (stepId: number, itemIndex: number) => { 
    const key = `${stepId}-${itemIndex}`; 
    setCheckedItems(prev => ({ ...prev, [key]: !prev[key] })); 
  };
  
  const isStepComplete = useCallback((stepId: number) => { 
    const items = stepContent[stepId]?.checklist || []; 
    if (items.length === 0) return true; 
    return items.every((_, index) => checkedItems[`${stepId}-${index}`]); 
  }, [stepContent, checkedItems]);

  useEffect(() => {
    const newCompletedSteps = new Set<number>(); 
    steps.forEach(step => { 
      if (isStepComplete(step.id)) newCompletedSteps.add(step.id); 
    });
    if (newCompletedSteps.size !== completedSteps.size || ![...newCompletedSteps].every(id => completedSteps.has(id)) || ![...completedSteps].every(id => newCompletedSteps.has(id))) {
      setCompletedSteps(newCompletedSteps);
    }
  }, [checkedItems, steps, stepContent, isStepComplete, completedSteps]);

  // Property management functions
  const openAddPropertyModal = (type: 'client' | 'agent') => {
    setEditingProperty(null);
    setPropertyModalData({
      type,
      address: '',
      price: '',
      beds: '',
      baths: '',
      sqft: '',
      imageUrl: '',
      listingUrl: '',
      notes: '',
      scorecard: { ratings: {}, pros: '', cons: '', averageScore: 0 }
    });
    setShowAddPropertyModal(true);
  };

  const openEditPropertyModal = (type: string, index: number) => {
    const propToEdit = type === 'client' ? clientProperties[index] : agentProperties[index];
    setEditingProperty({ type, index, data: propToEdit });
    setPropertyModalData({ ...propToEdit, type });
    setShowAddPropertyModal(true);
  };

  const handlePropertyModalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPropertyModalData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProperty = () => {
    const propertyToSave = { ...propertyModalData, id: editingProperty ? editingProperty.data.id : Date.now() };
    if (editingProperty) {
      const setter = editingProperty.type === 'client' ? setClientProperties : setAgentProperties;
      setter(prev => prev.map((p, i) => i === editingProperty.index ? propertyToSave : p));
    } else {
      const setter = propertyModalData.type === 'client' ? setClientProperties : setAgentProperties;
      setter(prev => [...prev, propertyToSave]);
    }
    setShowAddPropertyModal(false);
    setEditingProperty(null);
  };

  const openNotesModal = (type: string, index: number) => {
    setCurrentPropertyForNotes({ type, index });
    const prop = type === 'client' ? clientProperties[index] : agentProperties[index];
    setPropertyNoteInput(prop.notes || '');
    setShowNotesModal(true);
  };

  const handlePropertyNotesSave = () => {
    if (!currentPropertyForNotes) return;
    const { type, index } = currentPropertyForNotes;
    const setter = type === 'client' ? setClientProperties : setAgentProperties;
    setter(prev => prev.map((p, i) => i === index ? { ...p, notes: propertyNoteInput } : p));
    setShowNotesModal(false);
  };

  const openScorecardModal = (type: string, index: number) => {
    const prop = type === 'client' ? clientProperties[index] : agentProperties[index];
    setCurrentPropertyForScorecard({ type, index, data: prop });
    setScorecardData(prop.scorecard || { ratings: {}, pros: '', cons: '' });
    setShowScorecardModal(true);
  };

  const handleScorecardChange = (criterion: string, value: number) => {
    setScorecardData(prev => ({
      ...prev,
      ratings: { ...prev.ratings, [criterion]: value }
    }));
  };

  const handleScorecardTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setScorecardData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveScorecard = () => {
    if (!currentPropertyForScorecard) return;
    const { type, index } = currentPropertyForScorecard;
    const ratings = Object.values(scorecardData.ratings);
    const averageScore = ratings.length > 0 ? (ratings.reduce((sum, val) => sum + val, 0) / ratings.length) : 0;
    const updatedScorecard = { ...scorecardData, averageScore: parseFloat(averageScore.toFixed(1)) };
    const setter = type === 'client' ? setClientProperties : setAgentProperties;
    setter(prev => prev.map((p, i) => i === index ? { ...p, scorecard: updatedScorecard } : p));
    setShowScorecardModal(false);
  };

  const scorecardCriteria = ["Location", "Condition", "Price/Value", "Size/Layout", "Must-Haves Fit"];

  // Event handlers for different step tools
  const handleAddOfferTrackItem = (item: OfferTrackItem) => setOfferTrackItems(prev => [...prev, item]);
  const handleAddDiligenceTask = (task: DiligenceTask) => setDiligenceTasks(prev => [...prev, task]);
  const handleAddRepairItem = (item: RepairItem) => setRepairRequestItems(prev => [...prev, item]);
  const handleAddCriticalDate = (date: CriticalDate) => setCriticalDates(prev => [...prev, date]);
  const handleAddDocumentLink = (link: DocumentLink) => setDocumentHubLinks(prev => [...prev, link]);
  const handleToggleFinalWalkthroughItem = (index: number) => {
    setFinalWalkthroughItems(prev => prev.map((item, i) => i === index ? { ...item, checked: !item.checked } : item));
  };
  const handleAddUtilityTransferItem = (item: UtilityItem) => setUtilityTransferItems(prev => [...prev, item]);
  const handleToggleMovingDayTask = (index: number) => {
    setMovingDayTasks(prev => prev.map((task, i) => i === index ? { ...task, checked: !task.checked } : task));
  };

  const renderTool = (toolType: string) => {
    switch (toolType) {
      case 'intake-form':
        return (
          <BuyerIntakeSection 
            clientData={clientData} 
            setClientData={setClientData} 
            formSubmitted={formSubmitted} 
            setFormSubmitted={setFormSubmitted} 
            isEditing={isEditing} 
            setIsEditing={setIsEditing} 
            isMinimized={isIntakeFormMinimized} 
            setIsMinimized={setIsIntakeFormMinimized} 
            agreementUrl={agreementUrl} 
            setAgreementUrl={setAgreementUrl} 
            clientNotes={clientNotes} 
            setClientNotes={setClientNotes} 
            agentNotes={agentNotes} 
            setAgentNotes={setAgentNotes} 
            userRole={userRole}
          />
        );
      
      case 'financial-tools':
        return (
          <FinancialToolsSection 
            clientNotes={financialClientNotes} 
            setClientNotes={setFinancialClientNotes} 
            agentNotes={financialAgentNotes} 
            setAgentNotes={setFinancialAgentNotes} 
            userRole={userRole}
          />
        );
      
      case 'house-hunting-tools':
        return (
          <HouseHuntingSection
            clientData={clientData}
            setActiveStep={setActiveStep}
            setIsIntakeFormMinimized={setIsIntakeFormMinimized}
            clientProperties={clientProperties}
            agentProperties={agentProperties}
            openAddPropertyModal={openAddPropertyModal}
            openEditPropertyModal={openEditPropertyModal}
            openNotesModal={openNotesModal}
            openScorecardModal={openScorecardModal}
            clientNotes={houseHuntingClientNotes}
            setClientNotes={setHouseHuntingClientNotes}
            agentNotes={houseHuntingAgentNotes}
            setAgentNotes={setHouseHuntingAgentNotes}
          />
        );
      
      case 'offer-negotiation-tools':
        return (
          <OfferNegotiationSection
            clientData={clientData}
            offerTrackItems={offerTrackItems}
            onAddOfferTrackItem={handleAddOfferTrackItem}
            clientNotes={offerClientNotes}
            setClientNotes={setOfferClientNotes}
            agentNotes={offerAgentNotes}
            setAgentNotes={setOfferAgentNotes}
          />
        );
      
      case 'inspection-diligence-tools':
        return (
          <InspectionDiligenceSection
            diligenceTasks={diligenceTasks}
            onAddTask={handleAddDiligenceTask}
            repairRequestItems={repairRequestItems}
            onAddRepairItem={handleAddRepairItem}
            criticalDates={criticalDates}
            onAddCriticalDate={handleAddCriticalDate}
            documentHubLinks={documentHubLinks}
            onAddDocumentLink={handleAddDocumentLink}
            clientNotes={inspectionClientNotes}
            setClientNotes={setInspectionClientNotes}
            agentNotes={inspectionAgentNotes}
            setAgentNotes={setInspectionAgentNotes}
          />
        );
      
      case 'closing-tools':
        return (
          <ClosingProcessSection
            finalWalkthroughItems={finalWalkthroughItems}
            onToggleFinalWalkthroughItem={handleToggleFinalWalkthroughItem}
            utilityTransferItems={utilityTransferItems}
            onAddUtilityTransferItem={handleAddUtilityTransferItem}
            movingDayTasks={movingDayTasks}
            onToggleMovingDayTask={handleToggleMovingDayTask}
            clientNotes={closingClientNotes}
            setClientNotes={setClosingClientNotes}
            agentNotes={closingAgentNotes}
            setAgentNotes={setClosingAgentNotes}
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
      <div className="min-h-screen bg-gradient-to-br from-slate-100 to-sky-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-sky-100 font-sans"> 
      <header className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-40"> 
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
         <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Your Home Buying Journey</h1>
              <p className="text-slate-600 mt-0.5 text-xs sm:text-sm">Let's find your perfect home, {clientData.name || 'Client'}!</p>
            </div>
           <div className="flex items-center justify-between sm:justify-end space-x-4">
             <div className="text-right sm:text-right">
                <div className="text-xl sm:text-2xl font-bold text-blue-600">{calculateProgress()}%</div>
                <div className="text-xs text-slate-500">Complete</div>
              </div>
              {userRole === 'agent' ? (
                <button
                  onClick={() => navigate('/dashboard')}
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                  title="Back to Agent Dashboard"
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
              <div className="bg-gradient-to-r from-blue-500 to-cyan-400 h-2 rounded-full transition-all duration-500 ease-out" style={{ width: `${calculateProgress()}%` }}></div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6"> 
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6"> 
          <aside className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-5 sticky top-24">
              <h2 className="text-lg font-semibold mb-4 text-slate-700">Process Steps</h2>
              <nav className="space-y-2"> 
                {steps.map((step) => { 
                  const IconComponent = step.icon; 
                  const isComplete = completedSteps.has(step.id); 
                  const isCurrent = activeStep === step.id;
                  return (
                    <button key={step.id} onClick={() => setActiveStep(step.id)} className={`w-full flex items-center p-3 rounded-lg transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 ${isCurrent ? 'bg-blue-100 border-blue-500 shadow-sm text-blue-700' : isComplete ? 'bg-green-50 border-green-300 hover:bg-green-100 text-green-700' : 'bg-slate-50 border-slate-200 hover:bg-slate-100 hover:border-slate-300 text-slate-700'}`}>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0 ${isComplete ? 'bg-green-500 text-white' : isCurrent ? 'bg-blue-500 text-white' : 'bg-slate-300 '}`}>
                        {isComplete ? <CheckCircle size={16} /> : <IconComponent size={16} />}
                      </div>
                      <div className="flex-1 min-w-0 text-left">
                        <p className="text-sm font-medium truncate">{step.title}</p>
                      </div>
                      {isCurrent && <div className="w-1.5 h-1.5 bg-blue-500 rounded-full ml-auto"></div>} 
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          <section className="lg:col-span-9 space-y-6"> 
            <div className={`bg-gradient-to-r ${steps[activeStep]?.color || 'from-gray-500 to-gray-600'} rounded-xl shadow-lg p-6 text-white`}> 
              <div className="flex items-center mb-1.5">
                {React.createElement(steps[activeStep]?.icon || Info, { className: "w-6 h-6 mr-2.5" })}
                <h2 className="text-xl font-bold">{steps[activeStep]?.title}</h2>
              </div>
              <p className="text-white/90 text-sm">{steps[activeStep]?.description}</p> 
            </div>
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6"> 
              <h3 className="text-lg font-semibold mb-4 text-slate-700">Checklist</h3> 
              <div className="space-y-2.5">
                {stepContent[activeStep]?.checklist?.map((item, index) => { 
                  const isChecked = checkedItems[`${activeStep}-${index}`];
                  return (
                    <label key={index} className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors duration-150 ${isChecked ? 'bg-green-50 border-green-200' : 'hover:bg-slate-50 border-slate-200'}`}>
                      <input type="checkbox" checked={!!isChecked} onChange={() => toggleChecklistItem(activeStep, index)} className="h-4 w-4 text-green-500 border-gray-300 rounded focus:ring-green-400 mr-3 flex-shrink-0"/>
                      <span className={`text-sm ${isChecked ? 'line-through text-slate-500' : 'text-slate-700'}`}>{item}</span>
                    </label>
                  );
                })}
              </div>
            </div>
            {stepContent[activeStep]?.tools && renderTool(stepContent[activeStep].tools)}
            <div className="flex justify-between items-center pt-3">
              <button onClick={() => setActiveStep(Math.max(0, activeStep - 1))} disabled={activeStep === 0} className="px-5 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 disabled:opacity-50">Previous</button>
              <button onClick={() => setActiveStep(Math.min(steps.length - 1, activeStep + 1))} disabled={activeStep === steps.length - 1} className="px-5 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50">Next</button>
            </div>
          </section>
        </div>
      </main>
      
      <footer className="py-6 text-center text-xs text-slate-500 border-t border-slate-200 mt-10">
        <p>&copy; {new Date().getFullYear()} Real Estate Journey Planner. All rights reserved.</p>
        <p>Built for {clientData.name || "Our Valued Client"}</p>
      </footer>

      {/* Property Modal */}
      {showAddPropertyModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 overflow-y-auto h-full w-full z-50 flex justify-center items-center p-4">
          <div className="bg-white p-5 md:p-7 rounded-lg shadow-xl w-full max-w-md max-h-[95vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-semibold text-gray-800">
                {editingProperty ? 'Edit Property' : `Add New Property (${propertyModalData.type === 'client' ? 'Client' : 'Agent'})`}
              </h4>
              <button onClick={() => { setShowAddPropertyModal(false); setEditingProperty(null); }} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            <div className="space-y-3 text-sm">
              <div>
                <label htmlFor="prop-address" className="block text-xs font-medium">Address *</label>
                <input type="text" name="address" id="prop-address" value={propertyModalData.address} onChange={handlePropertyModalChange} className="mt-1 w-full p-2 border rounded-md" required />
              </div>
              <div>
                <label htmlFor="prop-price" className="block text-xs font-medium">Price *</label>
                <input type="number" name="price" id="prop-price" value={propertyModalData.price} onChange={handlePropertyModalChange} className="mt-1 w-full p-2 border rounded-md" required />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label htmlFor="prop-beds" className="block text-xs font-medium">Beds</label>
                  <input type="number" name="beds" id="prop-beds" value={propertyModalData.beds} onChange={handlePropertyModalChange} className="mt-1 w-full p-2 border rounded-md" />
                </div>
                <div>
                  <label htmlFor="prop-baths" className="block text-xs font-medium">Baths</label>
                  <input type="number" step="0.1" name="baths" id="prop-baths" value={propertyModalData.baths} onChange={handlePropertyModalChange} className="mt-1 w-full p-2 border rounded-md" />
                </div>
                <div>
                  <label htmlFor="prop-sqft" className="block text-xs font-medium">Sqft</label>
                  <input type="number" name="sqft" id="prop-sqft" value={propertyModalData.sqft} onChange={handlePropertyModalChange} className="mt-1 w-full p-2 border rounded-md" />
                </div>
              </div>
              <div>
                <label htmlFor="prop-imageUrl" className="block text-xs font-medium">Image URL</label>
                <input type="url" name="imageUrl" id="prop-imageUrl" value={propertyModalData.imageUrl} onChange={handlePropertyModalChange} className="mt-1 w-full p-2 border rounded-md" placeholder="https://example.com/image.jpg"/>
              </div>
              <div>
                <label htmlFor="prop-listingUrl" className="block text-xs font-medium">Listing URL *</label>
                <input type="url" name="listingUrl" id="prop-listingUrl" value={propertyModalData.listingUrl} onChange={handlePropertyModalChange} className="mt-1 w-full p-2 border rounded-md" placeholder="https://zillow.com/..." required />
              </div>
              <div className="flex justify-end space-x-3 pt-3">
                <button onClick={() => { setShowAddPropertyModal(false); setEditingProperty(null); }} className="px-4 py-2 text-sm rounded-md border hover:bg-gray-50">Cancel</button>
                <button onClick={handleSaveProperty} className="px-4 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700">{editingProperty ? 'Save Changes' : 'Add Property'}</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Property Notes Modal */}
      {showNotesModal && currentPropertyForNotes && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 overflow-y-auto h-full w-full z-50 flex justify-center items-center p-4">
          <div className="bg-white p-5 md:p-7 rounded-lg shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-semibold text-gray-800">Notes for Property</h4>
              <button onClick={() => setShowNotesModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            <textarea 
              value={propertyNoteInput} 
              onChange={(e) => setPropertyNoteInput(e.target.value)} 
              rows={5} 
              className="w-full p-2 border rounded-md text-sm" 
              placeholder="Enter your notes here..."
            />
            <div className="flex justify-end space-x-3 pt-4">
              <button onClick={() => setShowNotesModal(false)} className="px-4 py-2 text-sm rounded-md border hover:bg-gray-50">Cancel</button>
              <button onClick={handlePropertyNotesSave} className="px-4 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700">Save Notes</button>
            </div>
          </div>
        </div>
      )}

      {/* Property Scorecard Modal */}
      {showScorecardModal && currentPropertyForScorecard && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 overflow-y-auto h-full w-full z-50 flex justify-center items-center p-4">
          <div className="bg-white p-5 md:p-7 rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-5">
              <h4 className="text-lg font-semibold text-gray-800">Property Scorecard</h4>
              <button onClick={() => setShowScorecardModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            <div className="space-y-4 text-sm">
              {scorecardCriteria.map(criterion => (
                <div key={criterion}>
                  <label className="block font-medium text-gray-700 mb-1">{criterion}</label>
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4, 5].map(value => (
                      <button 
                        key={value}
                        onClick={() => handleScorecardChange(criterion, value)}
                        className={`px-3 py-1.5 border rounded-md text-sm w-1/5 ${
                          scorecardData.ratings?.[criterion] === value 
                            ? 'bg-blue-500 text-white border-blue-500' 
                            : 'bg-gray-100 hover:bg-gray-200 border-gray-300'
                        }`}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              <div>
                <label htmlFor="scorecard-pros" className="block font-medium text-gray-700 mb-1">Pros</label>
                <textarea 
                  id="scorecard-pros" 
                  name="pros" 
                  value={scorecardData.pros || ''} 
                  onChange={handleScorecardTextChange} 
                  rows={2} 
                  className="w-full p-2 border rounded-md text-sm" 
                  placeholder="e.g., Great backyard, updated kitchen..."
                />
              </div>
              <div>
                <label htmlFor="scorecard-cons" className="block font-medium text-gray-700 mb-1">Cons</label>
                <textarea 
                  id="scorecard-cons" 
                  name="cons" 
                  value={scorecardData.cons || ''} 
                  onChange={handleScorecardTextChange} 
                  rows={2} 
                  className="w-full p-2 border rounded-md text-sm" 
                  placeholder="e.g., Needs new roof, noisy street..."
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 pt-5 mt-3 border-t">
              <button onClick={() => setShowScorecardModal(false)} className="px-4 py-2 text-sm rounded-md border hover:bg-gray-50">Cancel</button>
              <button onClick={handleSaveScorecard} className="px-4 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700">Save Scorecard</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyerDashboard;