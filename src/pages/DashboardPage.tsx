import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Plus, LogOut, Users, Eye, Mail, Copy, Check, UserPlus, ExternalLink, Edit, Trash2, Link } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { getUserDashboards, createDashboard, deleteDashboard, updateDashboard } from '../firebase/firestore';
import { generateInvitationLink } from '../firebase/auth';

interface Dashboard {
  id: string;
  title: string;
  type: 'buyer' | 'seller';
  members: string[];
  ownerId: string;
  clientName?: string;
  clientEmail?: string;
  agentName?: string;
  createdAt: string;
  progress: number;
  status: string;
}

const DashboardPage = () => {
  const navigate = useNavigate();
  const { currentUser, userRole, logout } = useAuth();
  const [dashboards, setDashboards] = useState<Dashboard[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingDashboard, setEditingDashboard] = useState<Dashboard | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [newDashboard, setNewDashboard] = useState({
    title: '',
    type: 'buyer' as 'buyer' | 'seller',
    clientName: '',
    clientEmail: ''
  });

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    const loadDashboards = async () => {
      try {
        const result = await getUserDashboards(currentUser.firebaseUid);
        if (result.success) {
          setDashboards(result.dashboards);
        }
      } catch (error) {
        console.error('Error loading dashboards:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboards();
  }, [currentUser, navigate]);

  const handleCreateDashboard = async () => {
    if (!currentUser) return;

    if (!newDashboard.title || !newDashboard.clientName || !newDashboard.clientEmail) {
      alert('Please fill in all required fields before creating the dashboard.');
      return;
    }
    try {
      const dashboardData = {
        title: newDashboard.title,
        type: newDashboard.type,
        clientName: newDashboard.clientName,
        clientEmail: newDashboard.clientEmail,
        agentName: currentUser.name,
        status: 'pending_invitation'
      };

      const result = await createDashboard(currentUser.firebaseUid, dashboardData);
      if (result.success) {
        // Generate invitation link
        const invitationLink = generateInvitationLink(result.id, newDashboard.clientEmail);
        
        // TODO: In a real app, send email here
        console.log('Invitation link generated:', invitationLink);
        
        // Refresh dashboards
        const updatedResult = await getUserDashboards(currentUser.firebaseUid);
        if (updatedResult.success) {
          setDashboards(updatedResult.dashboards);
        }
        
        // Show success message with proper formatting
        const message = `✅ Dashboard created successfully!\n\n` +
                       `📧 Send this invitation link to ${newDashboard.clientName}:\n\n` +
                       `${invitationLink}\n\n` +
                       `💡 Tip: Copy this link and send it via email, text, or your preferred communication method.`;
        
        alert(message);
        
        // Copy to clipboard for convenience
        try {
          await navigator.clipboard.writeText(invitationLink);
          console.log('Invitation link copied to clipboard');
        } catch (err) {
          console.log('Could not copy to clipboard:', err);
        }
      } else {
        alert('❌ Failed to create dashboard\n\n' + result.error + '\n\nPlease try again or contact support if the problem persists.');
      }
    } catch (error) {
      console.error('Error creating dashboard:', error);
      alert('❌ An unexpected error occurred\n\nUnable to create dashboard. Please check your internet connection and try again.');
    }

    setNewDashboard({ title: '', type: 'buyer', clientName: '', clientEmail: '' });
    setShowCreateModal(false);
  };

  const handleEditDashboard = async () => {
    if (!editingDashboard) return;

    if (!editingDashboard.title || !editingDashboard.clientName || !editingDashboard.clientEmail) {
      alert('Please fill in all required fields before saving changes.');
      return;
    }
    try {
      const updateData = {
        title: editingDashboard.title,
        clientName: editingDashboard.clientName,
        clientEmail: editingDashboard.clientEmail,
        type: editingDashboard.type
      };

      const result = await updateDashboard(editingDashboard.id, updateData);
      if (result.success) {
        // Update local state
        setDashboards(dashboards.map(d => 
          d.id === editingDashboard.id ? { ...d, ...updateData } : d
        ));
        setShowEditModal(false);
        setEditingDashboard(null);
        
        // Show success feedback
        const successMessage = `✅ Dashboard updated successfully!\n\n` +
                              `Dashboard "${updateData.title}" has been saved with your changes.`;
        alert(successMessage);
      } else {
        alert('❌ Failed to update dashboard\n\n' + result.error + '\n\nPlease try again or contact support if the problem persists.');
      }
    } catch (error) {
      console.error('Error updating dashboard:', error);
      alert('❌ An unexpected error occurred\n\nUnable to update dashboard. Please check your internet connection and try again.');
    }
  };

  const handleDeleteDashboard = async (dashboardId: string) => {
    const dashboard = dashboards.find(d => d.id === dashboardId);
    const dashboardName = dashboard?.title || 'this dashboard';
    
    const confirmMessage = `⚠️ Delete Dashboard\n\n` +
                          `Are you sure you want to permanently delete "${dashboardName}"?\n\n` +
                          `This action cannot be undone and will remove:\n` +
                          `• All client data and progress\n` +
                          `• All notes and communications\n` +
                          `• All property information\n\n` +
                          `The client will no longer have access to this dashboard.`;
    
    if (window.confirm(confirmMessage)) {
      try {
        const result = await deleteDashboard(dashboardId);
        if (result.success) {
          setDashboards(dashboards.filter(d => d.id !== dashboardId));
          alert(`✅ Dashboard deleted successfully\n\n"${dashboardName}" has been permanently removed.`);
        } else {
          alert('❌ Failed to delete dashboard\n\n' + result.error + '\n\nPlease try again or contact support if the problem persists.');
        }
      } catch (error) {
        console.error('Error deleting dashboard:', error);
        alert('❌ An unexpected error occurred\n\nUnable to delete dashboard. Please check your internet connection and try again.');
      }
    }
  };

  const copyInvitationLink = (dashboard: Dashboard) => {
    const invitationLink = generateInvitationLink(dashboard.id, dashboard.clientEmail || '');
    
    navigator.clipboard.writeText(invitationLink).then(() => {
      // Visual feedback for successful copy
      console.log('Invitation link copied to clipboard');
    }).catch(err => {
      console.error('Failed to copy to clipboard:', err);
      // Fallback: show the link in an alert
      alert(`📋 Copy Invitation Link\n\n${invitationLink}\n\nManually copy this link and send it to your client.`);
    });
    
    setCopiedId(dashboard.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const openDashboard = (dashboard: Dashboard) => {
    const route = dashboard.type === 'buyer' ? '/buyer-dashboard' : '/seller-dashboard';
    navigate(`${route}/${dashboard.id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboards...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <Home className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {userRole === 'agent' ? 'Agent Dashboard' : 'My Dashboards'}
                </h1>
                <p className="text-gray-600">Welcome back, {currentUser?.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {userRole === 'agent' && (
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <Plus size={16} />
                  <span>New Dashboard</span>
                </button>
              )}
              <button
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                className="text-gray-600 hover:text-gray-800 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards - Only show for agents */}
        {userRole === 'agent' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Dashboards</p>
                  <p className="text-3xl font-bold text-gray-900">{dashboards.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Active Buyers</p>
                  <p className="text-3xl font-bold text-green-600">
                    {dashboards.filter(d => d.type === 'buyer').length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Home className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Active Sellers</p>
                  <p className="text-3xl font-bold text-purple-600">
                    {dashboards.filter(d => d.type === 'seller').length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Home className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Dashboards List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Your Dashboards</h2>
            <p className="text-gray-600 mt-1">Manage and track all your real estate journeys</p>
          </div>

          {dashboards.length === 0 ? (
            <div className="p-12 text-center">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No dashboards yet</h3>
              <p className="text-gray-600 mb-6">
                {userRole === 'agent' 
                  ? 'Create your first client dashboard to get started' 
                  : 'You haven\'t been invited to any dashboards yet'}
              </p>
              {userRole === 'agent' && (
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create First Dashboard
                </button>
              )}
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {dashboards.map((dashboard) => (
                <div key={dashboard.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{dashboard.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          dashboard.type === 'buyer' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-purple-100 text-purple-800'
                        }`}>
                          {dashboard.type}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          dashboard.status === 'active' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {dashboard.status === 'active' ? 'Active' : 'Pending'}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Client:</span> {dashboard.clientName}
                        </div>
                        <div>
                          <span className="font-medium">Email:</span> {dashboard.clientEmail}
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-gray-600">Progress</span>
                          <span className="font-medium">{dashboard.progress || 0}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${dashboard.progress || 0}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-end space-x-1 lg:space-x-2 lg:ml-6 flex-shrink-0">
                      {userRole === 'agent' && (
                        <button
                          onClick={() => copyInvitationLink(dashboard)}
                          className="p-1 sm:p-1.5 lg:p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Copy Invitation Link"
                        >
                          {copiedId === dashboard.id ? <Check size={12} className="text-green-600 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4" /> : <Copy size={12} className="sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4" />}
                        </button>
                      )}
                      {userRole === 'agent' && dashboard.ownerId === currentUser?.firebaseUid && (
                        <>
                          <button
                            onClick={() => {
                              setEditingDashboard(dashboard);
                              setShowEditModal(true);
                            }}
                            className="p-1 sm:p-1.5 lg:p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                            title="Edit Dashboard"
                          >
                            <Edit size={12} className="sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteDashboard(dashboard.id)}
                            className="p-1 sm:p-1.5 lg:p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete Dashboard"
                          >
                            <Trash2 size={12} className="sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4" />
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => openDashboard(dashboard)}
                        className="bg-blue-600 text-white px-2 py-1 sm:px-3 sm:py-1.5 lg:px-4 lg:py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-1"
                        title="Open Dashboard"
                      >
                        <ExternalLink size={10} className="sm:w-3 sm:h-3 lg:w-3.5 lg:h-3.5" />
                        <span className="text-xs lg:text-sm">Open</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Create Dashboard Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Create New Dashboard</h3>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Dashboard Title</label>
                <input
                  type="text"
                  value={newDashboard.title}
                  onChange={(e) => setNewDashboard({ ...newDashboard, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., John's Home Purchase"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Client Name</label>
                <input
                  type="text"
                  value={newDashboard.clientName}
                  onChange={(e) => setNewDashboard({ ...newDashboard, clientName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter client's full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Client Email</label>
                <input
                  type="email"
                  value={newDashboard.clientEmail}
                  onChange={(e) => setNewDashboard({ ...newDashboard, clientEmail: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="client@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Dashboard Type</label>
                <select
                  value={newDashboard.type}
                  onChange={(e) => setNewDashboard({ ...newDashboard, type: e.target.value as 'buyer' | 'seller' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="buyer">Buyer Dashboard</option>
                  <option value="seller">Seller Dashboard</option>
                </select>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateDashboard}
                disabled={!newDashboard.title || !newDashboard.clientName || !newDashboard.clientEmail}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                <UserPlus size={16} />
                <span>Create & Invite</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Dashboard Modal */}
      {showEditModal && editingDashboard && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Edit Dashboard</h3>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Dashboard Title</label>
                <input
                  type="text"
                  value={editingDashboard.title}
                  onChange={(e) => setEditingDashboard({ ...editingDashboard, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., John's Home Purchase"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Client Name</label>
                <input
                  type="text"
                  value={editingDashboard.clientName || ''}
                  onChange={(e) => setEditingDashboard({ ...editingDashboard, clientName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter client's full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Client Email</label>
                <input
                  type="email"
                  value={editingDashboard.clientEmail || ''}
                  onChange={(e) => setEditingDashboard({ ...editingDashboard, clientEmail: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="client@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Dashboard Type</label>
                <select
                  value={editingDashboard.type}
                  onChange={(e) => setEditingDashboard({ ...editingDashboard, type: e.target.value as 'buyer' | 'seller' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="buyer">Buyer Dashboard</option>
                  <option value="seller">Seller Dashboard</option>
                </select>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setEditingDashboard(null);
                }}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleEditDashboard}
                disabled={!editingDashboard.title || !editingDashboard.clientName || !editingDashboard.clientEmail}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;