import React from 'react';
import { CheckCircle, Circle, ChevronRight } from 'lucide-react';

interface Step {
  id: string;
  title: string;
  description: string;
}

interface ProgressSidebarProps {
  steps: Step[];
  activeStep: string;
  completedSteps: Set<string>;
  onStepClick: (stepId: string) => void;
  onToggleCompletion: (stepId: string) => void;
  userRole?: string;
}

const ProgressSidebar: React.FC<ProgressSidebarProps> = ({
  steps,
  activeStep,
  completedSteps,
  onStepClick,
  onToggleCompletion,
  userRole = 'client'
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-24">
      <h3 className="text-lg font-semibold mb-4 text-gray-900">Your Home Buying Journey</h3>
      
      <div className="space-y-1">
        {steps.map((step, index) => {
          const isCompleted = completedSteps.has(step.id);
          const isActive = activeStep === step.id;
          
          return (
            <div key={step.id} className="relative">
              <button
                onClick={() => onStepClick(step.id)}
                className={`w-full text-left p-3 rounded-lg transition-all duration-200 group ${
                  isActive 
                    ? 'bg-blue-50 border-2 border-blue-200' 
                    : 'hover:bg-gray-50 border-2 border-transparent'
                } ${isCompleted ? 'bg-green-50' : ''}`}
              >
                <div className="flex items-start space-x-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleCompletion(step.id);
                    }}
                    className={`mt-0.5 transition-colors ${
                      isCompleted ? 'text-green-600' : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle size={20} className="fill-current" />
                    ) : (
                      <Circle size={20} />
                    )}
                  </button>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className={`text-sm font-medium ${
                        isCompleted ? 'text-green-800' : 
                        isActive ? 'text-blue-800' : 'text-gray-900'
                      }`}>
                        {step.title}
                      </p>
                      <ChevronRight size={16} className={`transition-transform ${
                        isActive ? 'rotate-90 text-blue-600' : 'text-gray-400 group-hover:text-gray-600'
                      }`} />
                    </div>
                    <p className={`text-xs mt-1 ${
                      isCompleted ? 'text-green-600' : 
                      isActive ? 'text-blue-600' : 'text-gray-500'
                    }`}>
                      {step.description}
                    </p>
                  </div>
                </div>
              </button>
              
              {index < steps.length - 1 && (
                <div className={`absolute left-[22px] top-14 w-0.5 h-4 ${
                  isCompleted ? 'bg-green-300' : 'bg-gray-200'
                }`} />
              )}
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-xs text-blue-700">
          <strong>💡 Tip:</strong> Click the circles to mark steps as complete. 
          This helps track your progress and keeps everyone on the same page!
        </p>
      </div>
    </div>
  );
};

export default ProgressSidebar;