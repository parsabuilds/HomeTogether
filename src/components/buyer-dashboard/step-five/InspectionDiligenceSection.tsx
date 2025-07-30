import React from 'react';
import RecommendedVendors from './RecommendedVendors';
import InspectionDueDiligenceTrackerTool from './InspectionDueDiligenceTrackerTool';
import RepairRequestBuilderTool from './RepairRequestBuilderTool';
import CriticalDateTrackerTool from './CriticalDateTrackerTool';
import DocumentHubTool from './DocumentHubTool';
import InspectionInfo from './InspectionInfo';
import NotesSection from '../shared/NotesSection';

interface Task {
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

interface InspectionDiligenceSectionProps {
  diligenceTasks: Task[];
  onAddTask: (task: Task) => void;
  repairRequestItems: RepairItem[];
  onAddRepairItem: (item: RepairItem) => void;
  criticalDates: CriticalDate[];
  onAddCriticalDate: (date: CriticalDate) => void;
  documentHubLinks: DocumentLink[];
  onAddDocumentLink: (link: DocumentLink) => void;
  clientNotes: string;
  setClientNotes: (notes: string) => void;
  agentNotes: string;
  setAgentNotes: (notes: string) => void;
}

const InspectionDiligenceSection: React.FC<InspectionDiligenceSectionProps> = ({
  diligenceTasks,
  onAddTask,
  repairRequestItems,
  onAddRepairItem,
  criticalDates,
  onAddCriticalDate,
  documentHubLinks,
  onAddDocumentLink,
  clientNotes,
  setClientNotes,
  agentNotes,
  setAgentNotes
}) => {
  return (
    <div className="space-y-6">
      <RecommendedVendors />
      <InspectionDueDiligenceTrackerTool 
        tasks={diligenceTasks} 
        onAddTask={onAddTask} 
      />
      <RepairRequestBuilderTool 
        repairItems={repairRequestItems} 
        onAddRepairItem={onAddRepairItem} 
      />
      <CriticalDateTrackerTool 
        criticalDates={criticalDates} 
        onAddCriticalDate={onAddCriticalDate} 
      />
      <DocumentHubTool 
        documentLinks={documentHubLinks} 
        onAddDocumentLink={onAddDocumentLink} 
      />
      <InspectionInfo />
      <NotesSection 
        clientNotesVal={clientNotes} 
        onClientChange={(e) => setClientNotes(e.target.value)} 
        agentNotesVal={agentNotes} 
        onAgentChange={(e) => setAgentNotes(e.target.value)} 
        title="Inspection & Diligence Notes"
      />
    </div>
  );
};

export default InspectionDiligenceSection;