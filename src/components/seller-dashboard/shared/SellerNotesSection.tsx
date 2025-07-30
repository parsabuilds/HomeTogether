import React from 'react';

interface SellerNotesSectionProps {
  clientNotesVal: string;
  onClientChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  agentNotesVal: string;
  onAgentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  title?: string;
}

const SellerNotesSection: React.FC<SellerNotesSectionProps> = ({ 
  clientNotesVal, 
  onClientChange, 
  agentNotesVal, 
  onAgentChange, 
  title = "Additional Notes" 
}) => ( 
  <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mt-6">
    <h3 className="text-xl font-semibold mb-4 text-slate-700">{title}</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label htmlFor={`${title.replace(/\s+/g, '')}-clientNotes`} className="block text-sm font-medium mb-2 text-slate-600">Client Notes</label>
        <textarea 
          id={`${title.replace(/\s+/g, '')}-clientNotes`} 
          value={clientNotesVal} 
          onChange={onClientChange} 
          className="w-full p-3 border border-slate-300 rounded-md focus:ring-purple-500 focus:border-purple-500 transition text-sm" 
          rows={4} 
          placeholder="Add notes, questions, or requests..."
        />
      </div>
      <div>
        <label htmlFor={`${title.replace(/\s+/g, '')}-agentNotes`} className="block text-sm font-medium mb-2 text-slate-600">Agent Notes</label>
        <textarea 
          id={`${title.replace(/\s+/g, '')}-agentNotes`} 
          value={agentNotesVal} 
          onChange={onAgentChange} 
          className="w-full p-3 border border-slate-300 rounded-md focus:ring-purple-500 focus:border-purple-500 transition text-sm" 
          rows={4} 
          placeholder="Internal notes, follow-ups, etc..."
        />
      </div>
    </div>
  </div>
);

export default SellerNotesSection;