import React, { useState } from 'react';
import { FilePlus, PlusCircle, X, ExternalLink } from 'lucide-react';

interface DocumentLink {
  id: number;
  documentName: string;
  url: string;
  uploadedBy: string;
  dateAdded: string;
}

interface DocumentHubToolProps {
  documentLinks: DocumentLink[];
  onAddDocumentLink: (link: DocumentLink) => void;
}

const DocumentHubTool: React.FC<DocumentHubToolProps> = ({ 
  documentLinks, 
  onAddDocumentLink 
}) => {
  const [showModal, setShowModal] = useState(false);
  const [newItem, setNewItem] = useState({ 
    documentName: '', 
    url: '', 
    uploadedBy: 'Client', 
    dateAdded: new Date().toISOString().split('T')[0] 
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => { 
    const { name, value } = e.target; 
    setNewItem(prev => ({ ...prev, [name]: value }));
  };

  const handleAddItem = () => { 
    if (!newItem.url.startsWith('http')) { 
      alert('Please enter a valid URL starting with http or https.'); 
      return; 
    } 
    onAddDocumentLink({ ...newItem, id: Date.now() }); 
    setShowModal(false); 
    setNewItem({ 
      documentName: '', 
      url: '', 
      uploadedBy: 'Client', 
      dateAdded: new Date().toISOString().split('T')[0] 
    });
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border mt-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold flex items-center">
          <FilePlus size={20} className="mr-2 text-indigo-600"/>
          Document Hub
        </h3>
        <button 
          onClick={() => setShowModal(true)} 
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1.5 rounded-md text-sm flex items-center"
        >
          <PlusCircle size={16} className="mr-1.5"/>
          Add Document Link
        </button>
      </div>
      
      {documentLinks.length === 0 ? (
        <p className="text-sm text-gray-500">No documents linked yet.</p>
      ) : (
        <div className="space-y-2 text-sm">
          {documentLinks.map(doc => (
            <div key={doc.id} className="p-3 border rounded-md bg-indigo-50 border-indigo-200 flex justify-between items-center">
              <div>
                <p className="font-medium text-indigo-700">{doc.documentName}</p>
                <p className="text-xs text-gray-500">Added by: {doc.uploadedBy} on {doc.dateAdded}</p>
              </div>
              <a 
                href={doc.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-600 hover:text-blue-700 text-sm flex items-center"
              >
                <ExternalLink size={14} className="mr-1"/>
                View
              </a>
            </div>
          ))}
        </div>
      )}
      
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 z-50 flex justify-center items-center p-4">
          <div className="bg-white p-5 md:p-7 rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-semibold">Add Document Link</h4>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20}/>
              </button>
            </div>
            <div className="space-y-3 text-sm">
              <div>
                <label htmlFor="doc-name" className="block font-medium mb-1">Document Name *</label>
                <input type="text" name="documentName" id="doc-name" value={newItem.documentName} onChange={handleInputChange} className="mt-1 w-full p-2 border rounded-md" required/>
              </div>
              <div>
                <label htmlFor="doc-url" className="block font-medium mb-1">URL *</label>
                <input type="url" name="url" id="doc-url" value={newItem.url} onChange={handleInputChange} className="mt-1 w-full p-2 border rounded-md" placeholder="https://..." required/>
              </div>
              <div>
                <label htmlFor="doc-uploader" className="block font-medium mb-1">Uploaded By</label>
                <select name="uploadedBy" id="doc-uploader" value={newItem.uploadedBy} onChange={handleInputChange} className="mt-1 w-full p-2 border rounded-md">
                  <option>Client</option>
                  <option>Agent</option>
                </select>
              </div>
              <div>
                <label htmlFor="doc-date" className="block font-medium mb-1">Date Added</label>
                <input type="date" name="dateAdded" id="doc-date" value={newItem.dateAdded} onChange={handleInputChange} className="mt-1 w-full p-2 border rounded-md"/>
              </div>
              <div className="flex justify-end space-x-3 pt-3">
                <button onClick={() => setShowModal(false)} className="px-4 py-2 text-sm rounded-md border hover:bg-gray-50">Cancel</button>
                <button onClick={handleAddItem} className="px-4 py-2 text-sm rounded-md bg-indigo-600 text-white hover:bg-indigo-700">Add Link</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentHubTool;