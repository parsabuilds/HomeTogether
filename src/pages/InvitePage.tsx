import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Home, Eye, EyeOff, UserPlus, Mail, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { getDashboard } from '../firebase/firestore';

const InvitePage = () => {
  const navigate = useNavigate();
  const { registerClientWithInvite, signInAndJoinDashboard, error: authError, clearError } = useAuth();
  const { dashboardId } = useParams<{ dashboardId: string }>();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dashboardInfo, setDashboardInfo] = useState<any>(null);
  const [loadingDashboard, setLoadingDashboard] = useState(true);
  const [showSignInOption, setShowSignInOption] = useState(false);

  // Form data
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });

  useEffect(() => {
    const loadDashboardInfo = async () => {
      if (!dashboardId) {
        setLoadingDashboard(false);
        return;
      }

      try {
        const result = await getDashboard(dashboardId);
        if (result.success) {
          setDashboardInfo(result.dashboard);
          
          // Pre-fill email from URL params if available
          const urlParams = new URLSearchParams(window.location.search);
          const email = urlParams.get('email');
          if (email) {
            setFormData(prev => ({ ...prev, email }));
          }
        } else {
          console.error('Dashboard load error:', result.error);
        }
      } catch (err) {
        console.error('Exception loading dashboard:', err);
      } finally {
        setLoadingDashboard(false);
      }
    };

    loadDashboardInfo();
  }, [dashboardId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    clearError();

    try {
      const success = await registerClientWithInvite(
        formData.email,
        formData.password,
        formData.name,
        dashboardId!
      );

      if (success) {
        navigate('/dashboard');
      } else {
        // Check if the error is about email already in use
        if (authError && (authError.includes('email already exists') || authError.includes('email-already-in-use'))) {
          setShowSignInOption(true);
        }
      }
    } catch (err) {
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSignInAndJoin = async () => {
    setLoading(true);
    clearError();

    try {
      const success = await signInAndJoinDashboard(
        formData.email,
        formData.password,
        dashboardId!
      );

      if (success) {
        navigate('/dashboard');
      }
    } catch (err) {
      console.error('Sign in and join error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (loadingDashboard) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-100 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading invitation...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Home className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AgentIQ</h1>
          <p className="text-gray-600">Complete your account setup</p>
        </div>

        {/* Invitation Info */}
        {dashboardInfo && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
              <div>
                <p className="text-sm font-medium text-green-800">You've been invited to collaborate</p>
                <p className="text-sm text-green-600">{dashboardInfo.title || 'Real Estate Dashboard'}</p>
                {dashboardInfo.agentName && (
                  <p className="text-xs text-green-600 mt-1">Agent: {dashboardInfo.agentName}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <div className="flex items-center justify-center mb-6">
            <UserPlus className="w-6 h-6 text-blue-600 mr-2" />
            <h2 className="text-2xl font-bold text-gray-900">Create Your Account</h2>
          </div>

          {authError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {authError}
              {showSignInOption && (
                <div className="mt-2">
                  <p className="mb-2 text-sm text-red-600">Would you like to sign in with your existing account and join this dashboard?</p>
                  <div className="flex gap-2">
                    <button
                      onClick={handleSignInAndJoin}
                      disabled={loading}
                      className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 disabled:opacity-50"
                    >
                      {loading ? 'Signing in...' : 'Sign In & Join Dashboard'}
                    </button>
                    <button
                      onClick={() => navigate('/login')}
                      className="px-3 py-1 bg-gray-200 text-gray-700 text-xs rounded hover:bg-gray-300"
                    >
                      Go to Login Page
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Create a secure password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating Account...' : 'Create Account & Join Dashboard'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              Already have an account?{' '}
              <button
                onClick={() => navigate('/login')}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Sign in here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvitePage;