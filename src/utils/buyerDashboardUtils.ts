// Utility functions for Buyer Dashboard

export const calculateProgress = (completedSteps: Set<string>, checkedItems: Record<string, boolean>) => {
  const totalSteps = 6; // Total number of major steps in the buyer journey
  const completedCount = completedSteps.size;
  
  // Add bonus progress for completed checklist items
  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const totalChecklistItems = Object.keys(checkedItems).length;
  const checklistProgress = totalChecklistItems > 0 ? (checkedCount / totalChecklistItems) * 0.2 : 0;
  
  const baseProgress = (completedCount / totalSteps) * 0.8;
  const totalProgress = Math.min(Math.round((baseProgress + checklistProgress) * 100), 100);
  
  return totalProgress;
};

export const getStepStatus = (stepId: string, completedSteps: Set<string>) => {
  return completedSteps.has(stepId) ? 'completed' : 'pending';
};

export const toggleStepCompletion = (stepId: string, completedSteps: Set<string>) => {
  const newCompletedSteps = new Set(completedSteps);
  if (newCompletedSteps.has(stepId)) {
    newCompletedSteps.delete(stepId);
  } else {
    newCompletedSteps.add(stepId);
  }
  return newCompletedSteps;
};