import React from 'react';
import { ArrowLeft, Home, LogOut, User, UserCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface DashboardHeaderProps {
  dashboardData: {
    title?: string;
    clientName?: string;
    agentName?: string;
    type?: string;
  };
  progress: number;
  userRole?: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  dashboardData,
  progress,
  userRole = 'client'
}) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="text-gray-600 hover:text-gray-800 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              title="Back to Dashboard"
            >
              <ArrowLeft size={20} />
            </button>
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center">
                <Home className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  {dashboardData.title || 'Buyer Dashboard'}
                </h1>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  {dashboardData.clientName && (
                    <span className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      Client: {dashboardData.clientName}
                    </span>
                  )}
                  {dashboardData.agentName && (
                    <span className="flex items-center">
                      <UserCheck className="w-4 h-4 mr-1" />
                      Agent: {dashboardData.agentName}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Progress Indicator */}
            <div className="hidden md:flex items-center space-x-3">
              <span className="text-sm text-gray-600">Progress:</span>
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium text-gray-900">{progress}%</span>
            </div>
            
            <button
              onClick={handleLogout}
              className="text-gray-600 hover:text-gray-800 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              title="Sign Out"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
        
        {/* Mobile Progress */}
        <div className="md:hidden mt-3">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span className="font-medium">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;