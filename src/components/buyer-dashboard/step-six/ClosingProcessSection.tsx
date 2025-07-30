import React from 'react';
import ClosingCostFinalizer from './ClosingCostFinalizer';
import FinalWalkthroughChecklistComponent from './FinalWalkthroughChecklistComponent';
import UtilitiesTransferTrackerTool from './UtilitiesTransferTrackerTool';
import MovingDayPlannerTool from './MovingDayPlannerTool';
import ClosingInfo from './ClosingInfo';
import ClosingContacts from './ClosingContacts';
import NotesSection from '../shared/NotesSection';

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

interface ClosingProcessSectionProps {
  finalWalkthroughItems: FinalWalkthroughItem[];
  onToggleFinalWalkthroughItem: (index: number) => void;
  utilityTransferItems: UtilityItem[];
  onAddUtilityTransferItem: (item: UtilityItem) => void;
  movingDayTasks: MovingTask[];
  onToggleMovingDayTask: (index: number) => void;
  clientNotes: string;
  setClientNotes: (notes: string) => void;
  agentNotes: string;
  setAgentNotes: (notes: string) => void;
}

const ClosingProcessSection: React.FC<ClosingProcessSectionProps> = ({
  finalWalkthroughItems,
  onToggleFinalWalkthroughItem,
  utilityTransferItems,
  onAddUtilityTransferItem,
  movingDayTasks,
  onToggleMovingDayTask,
  clientNotes,
  setClientNotes,
  agentNotes,
  setAgentNotes
}) => {
  return (
    <div className="space-y-6">
      <ClosingCostFinalizer />
      <FinalWalkthroughChecklistComponent 
        items={finalWalkthroughItems} 
        onToggleItem={onToggleFinalWalkthroughItem} 
      />
      <UtilitiesTransferTrackerTool 
        utilities={utilityTransferItems} 
        onAddUtility={onAddUtilityTransferItem} 
      />
      <MovingDayPlannerTool 
        tasks={movingDayTasks} 
        onToggleTask={onToggleMovingDayTask} 
      />
      <ClosingInfo />
      <ClosingContacts />
      <NotesSection 
        clientNotesVal={clientNotes} 
        onClientChange={(e) => setClientNotes(e.target.value)} 
        agentNotesVal={agentNotes} 
        onAgentChange={(e) => setAgentNotes(e.target.value)} 
        title="Closing Process Notes"
      />
    </div>
  );
};

export default ClosingProcessSection;