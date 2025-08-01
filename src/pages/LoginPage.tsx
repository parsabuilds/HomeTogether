import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Eye, EyeOff, ArrowLeft, UserPlus, Mail } from 'lucide-react';
import MonkeyAvatar from '../components/MonkeyAvatar';
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register, error: authError, success: authSuccess, clearError, clearSuccess } = useAuth();
  
  // Set initial tab based on navigation state
  const initialTab = location.state?.activeTab === 'register' ? 'register' : 'login';
  const [activeTab, setActiveTab] = useState<'login' | 'register'>(initialTab);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  // Form data
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });

  // Clear any existing errors when switching tabs or changing input
  React.useEffect(() => {
    clearError();
    clearSuccess();
  }, [activeTab, clearError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    clearError();
    clearSuccess();

    try {
      let success = false;
      
      if (activeTab === 'register') {
        success = await register(formData.email, formData.password, formData.name);
      } else {
        success = await login(formData.email, formData.password);
      }

      if (success) {
        // Small delay to show success message before navigation
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      }
      // Error handling is now done in the auth context
    } catch (err) {
      console.error('Form submission error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Only clear errors after user has typed something substantial
    if (value.length > 2) {
      clearError();
      clearSuccess();
    }
  };

  const handlePasswordFocus = () => {
    setIsPasswordFocused(true);
  };

  const handlePasswordBlur = () => {
    setIsPasswordFocused(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <MonkeyAvatar
            isPasswordFocused={isPasswordFocused}
            isShowingPassword={showPassword}
            emailValue={formData.email}
            onEmailFocus={() => {}}
            onEmailBlur={() => {}}
            onPasswordFocus={handlePasswordFocus}
            onPasswordBlur={handlePasswordBlur}
          />
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                HomeTogether
              </span>
        </div>

        {/* Tab Navigation */}
        <div className="flex mb-6 bg-gray-200 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('login')}
            className={`flex-1 py-2.5 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'login'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setActiveTab('register')}
            className={`flex-1 py-2.5 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'register'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Register
          </button>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <div className="flex items-center justify-center mb-6">
            {activeTab === 'login' ? (
             <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 mr-2" />
            ) : (
             <UserPlus className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 mr-2" />
            )}
           <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              {activeTab === 'login' ? 'Welcome Back' : 'Create Account'}
            </h2>
          </div>

          {/* Success Message */}
          {authSuccess && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p>{authSuccess}</p>
                  <p className="text-xs text-green-600 mt-1">Redirecting to dashboard...</p>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {authError && (
            <div className="mb-6 p-4 bg-red-50 border-2 border-red-300 rounded-lg shadow-sm">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-red-500 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="font-bold text-red-800 text-base">
                    {activeTab === 'login' ? 'Sign In Failed' : 'Registration Failed'}
                  </p>
                  <p className="mt-2 text-red-700 text-sm leading-relaxed">{authError}</p>
                  <p className="mt-3 text-red-600 text-xs">
                    💡 <strong>Tip:</strong> Check your email and password are correct, or try registering if you don't have an account.
                  </p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {activeTab === 'register' && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required={activeTab === 'register'}
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Enter your full name"
                />
              </div>
            )}

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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
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
                  onFocus={handlePasswordFocus}
                  onBlur={handlePasswordBlur}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  tabIndex={-1}                             // button itself won’t grab focus
                  onMouseDown={(e) => {                    // ↓ keep focus on the input
                    e.preventDefault();                    // stop the blur event
                    setShowPassword((prev) => !prev);      // toggle
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>

              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !!authSuccess}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  {activeTab === 'login' ? 'Signing in...' : 'Creating account...'}
                </div>
              ) : authSuccess ? (
                <div className="flex items-center justify-center">
                  <svg className="h-5 w-5 text-white mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Success! Redirecting...
                </div>
              ) : (
                activeTab === 'login' ? 'Sign In' : 'Create Account'
              )}
            </button>
          </form>

          {activeTab === 'login' && (
            <div className="mt-6 text-center">
              <p className="text-gray-600 text-sm">
                Don't have an account?{' '}
                <button
                  onClick={() => setActiveTab('register')}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Register here
                </button>
              </p>
            </div>
          )}

          {activeTab === 'register' && (
            <div className="mt-6 text-center">
              <p className="text-gray-600 text-sm">
                Already have an account?{' '}
                <button
                  onClick={() => setActiveTab('login')}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Sign in here
                </button>
              </p>
            </div>
          )}
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <button
            onClick={() => navigate('/')}
            className="text-gray-600 hover:text-gray-800 font-medium flex items-center justify-center"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;