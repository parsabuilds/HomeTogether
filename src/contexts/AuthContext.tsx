import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/config';
import { registerAgent, registerClient, signInUser, signOutUser } from '../firebase/auth';
import { addMemberToDashboard, updateDashboardStatus } from '../firebase/firestore';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'agent' | 'client';
  firebaseUid: string;
}

interface AuthContextType {
  currentUser: User | null;
  userRole: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  registerClientWithInvite: (email: string, password: string, name: string, invitationToken: string) => Promise<boolean>;
  signInAndJoinDashboard: (email: string, password: string, dashboardId: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
  error: string | null;
  clearError: () => void;
  success: string | null;
  clearSuccess: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const clearError = () => {
    setError(null);
  };

  const clearSuccess = () => {
    setSuccess(null);
  };
  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // User is signed in, get additional data from Firestore
        const savedUser = localStorage.getItem('agentiq_user');
        const savedRole = localStorage.getItem('agentiq_role');
        
        if (savedUser && savedRole) {
          setCurrentUser(JSON.parse(savedUser));
          setUserRole(savedRole);
        }
      } else {
        // User is signed out
        setCurrentUser(null);
        setUserRole(null);
        localStorage.removeItem('agentiq_user');
        localStorage.removeItem('agentiq_role');
      }
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);
      
      const result = await signInUser(email, password);
      
      if (result.success && result.user) {
        const user: User = {
          id: result.user.id,
          email: result.user.email,
          name: result.user.name,
          role: result.user.role as 'agent' | 'client',
          firebaseUid: result.user.firebaseUid
        };
        
        setCurrentUser(user);
        setUserRole(result.user.role);
        
        localStorage.setItem('agentiq_user', JSON.stringify(user));
        localStorage.setItem('agentiq_role', result.user.role);
        
        setSuccess(`Welcome back, ${user.name}!`);
        return true;
      } else {
        // Enhanced error handling with more details
        const errorMessage = result.error || 'Login failed. Please check your credentials and try again.';
        console.error('Login failed:', errorMessage);
        
        setError(errorMessage);
        
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      const errorMessage = 'An unexpected error occurred. Please check your internet connection and try again.';
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      console.log('Starting registration for:', email); // ADD THIS
      
      const result = await registerAgent(email, password, name);

      console.log('Registration result:', result); // ADD THIS
      
      if (result.success && result.user) {
        const user: User = {
          id: result.user.id,
          email: result.user.email,
          name: result.user.name,
          role: result.user.role as 'agent' | 'client',
          firebaseUid: result.user.id
        };
        
        setCurrentUser(user);
        setUserRole('agent');
        
        localStorage.setItem('agentiq_user', JSON.stringify(user));
        localStorage.setItem('agentiq_role', 'agent');
        
        setSuccess(`Account created successfully! Welcome to AgentIQ, ${user.name}!`);
        return true;
      } else {
        // Enhanced error handling with more details
        const errorMessage = result.error || 'Registration failed. Please check your information and try again.';
        console.error('Registration failed:', errorMessage);

        console.log('Setting error state to:', errorMessage); // ADD THIS
        setError(errorMessage);

        // Verify error was set
        setTimeout(() => {
          console.log('Error state after setError:', error); // ADD THIS
        }, 100);
        
        return false;
      }
    } catch (error) {
      console.error('Registration error:', error);
      const errorMessage = 'An unexpected error occurred during registration. Please check your internet connection and try again.';
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const registerClientWithInvite = async (email: string, password: string, name: string, invitationToken: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);
      
      const result = await registerClient(email, password, name, invitationToken);
      
      if (result.success && result.user) {
        const user: User = {
          id: result.user.id,
          email: result.user.email,
          name: result.user.name,
          role: result.user.role as 'agent' | 'client',
          firebaseUid: result.user.id
        };
        
        setCurrentUser(user);
        setUserRole('client');
        
        localStorage.setItem('agentiq_user', JSON.stringify(user));
        localStorage.setItem('agentiq_role', 'client');
        
        setSuccess(`Welcome to AgentIQ, ${user.name}! Your account has been created and you've been added to the dashboard.`);
        return true;
      } else {
        // If email already exists, automatically try to sign in and join dashboard
        if (result.code === 'auth/email-already-in-use') {
          console.log('Email already exists, attempting to sign in and join dashboard...');
          setError('An account with this email already exists. Please use your existing password to join the dashboard.');
          // Don't automatically try to sign in - let user enter their password
          return false;
        }
        
        console.error('Client registration failed:', result.error);
        // Store error for UI to display
        setError(result.error || 'Client registration failed. Please try again.');
        return false;
      }
    } catch (error) {
      console.error('Client registration error:', error);
      setError('An unexpected error occurred. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signInAndJoinDashboard = async (email: string, password: string, dashboardId: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);
      
      const result = await signInUser(email, password);
      
      if (result.success && result.user) {
        const user: User = {
          id: result.user.id,
          email: result.user.email,
          name: result.user.name,
          role: result.user.role as 'agent' | 'client',
          firebaseUid: result.user.firebaseUid
        };
        
        setCurrentUser(user);
        setUserRole(result.user.role);
        
        localStorage.setItem('agentiq_user', JSON.stringify(user));
        localStorage.setItem('agentiq_role', result.user.role);
        
        // Add user to dashboard and update status to active
        await addMemberToDashboard(dashboardId, result.user.id);
        await updateDashboardStatus(dashboardId, 'active');
        
        setSuccess(`Welcome back, ${user.name}! You've been successfully added to the dashboard.`);
        return true;
      } else {
        console.error('Sign in and join failed:', result.error);
        setError(result.error || 'Sign in failed. Please try again.');
        return false;
      }
    } catch (error) {
      console.error('Sign in and join error:', error);
      setError('An unexpected error occurred. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setError(null);
      setSuccess(null);
      await signOutUser();
      setCurrentUser(null);
      setUserRole(null);
      localStorage.removeItem('agentiq_user');
      localStorage.removeItem('agentiq_role');
      setSuccess('You have been successfully signed out.');
    } catch (error) {
      console.error('Logout error:', error);
      setError('Error signing out. Please try again.');
    }
  };

  const value = {
    currentUser,
    userRole,
    login,
    register,
    registerClientWithInvite,
    signInAndJoinDashboard,
    logout,
    loading,
    error,
    clearError,
    success,
    clearSuccess
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};