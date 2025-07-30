import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  updateProfile 
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { auth, db } from './config';
import { updateDashboardStatus } from './firestore';

// Register new agent
export const registerAgent = async (email, password, name) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Update the user's display name
    await updateProfile(user, { displayName: name });
    
    // Create user document in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      email: email,
      name: name,
      role: 'agent',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    
    return { success: true, user: { id: user.uid, email, name, role: 'agent' } };
  } catch (error) {
    console.error('Registration error:', error);
    
    // Handle specific Firebase auth errors
    if (error.code === 'auth/email-already-in-use') {
      return { success: false, error: 'An account with this email already exists. Please sign in instead.', code: 'auth/email-already-in-use' };
    } else if (error.code === 'auth/weak-password') {
      return { success: false, error: 'Password should be at least 6 characters long.', code: 'auth/weak-password' };
    } else if (error.code === 'auth/invalid-email') {
      return { success: false, error: 'Please enter a valid email address.', code: 'auth/invalid-email' };
    } else if (error.code === 'auth/operation-not-allowed') {
      return { success: false, error: 'Email/password accounts are not enabled. Please contact support.', code: 'auth/operation-not-allowed' };
    }
    
    return { success: false, error: error.message || 'Registration failed. Please try again.', code: error.code };
  }
};

// Register new client (through invitation)
export const registerClient = async (email, password, name, invitationToken) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Update the user's display name
    await updateProfile(user, { displayName: name });
    
    // Create user document in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      email: email,
      name: name,
      role: 'client',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    
    // Add client to dashboard members using invitation token
    if (invitationToken) {
      await updateDoc(doc(db, 'dashboards', invitationToken), {
        members: arrayUnion(user.uid),
        updatedAt: new Date().toISOString()
      });
      
      // Update dashboard status to active after successful client registration
      await updateDashboardStatus(invitationToken, 'active');
    }
    
    return { success: true, user: { id: user.uid, email, name, role: 'client' } };
  } catch (error) {
    console.error('Client registration error:', error);
    
    // Handle specific Firebase auth errors
    if (error.code === 'auth/email-already-in-use') {
      return { success: false, error: 'An account with this email already exists. Please sign in instead.' };
    } else if (error.code === 'auth/weak-password') {
      return { success: false, error: 'Password should be at least 6 characters long.' };
    } else if (error.code === 'auth/invalid-email') {
      return { success: false, error: 'Please enter a valid email address.' };
    } else if (error.code === 'auth/operation-not-allowed') {
      return { success: false, error: 'Email/password accounts are not enabled. Please contact support.' };
    }
    
    return { success: false, error: error.message || 'Registration failed. Please try again.' };
  }
};

// Unified sign in for all users
export const signInUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Get user data from Firestore
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    if (userDoc.exists()) {
      const userData = userDoc.data();
      return { 
        success: true, 
        user: { 
          id: user.uid, 
          email: user.email, 
          name: userData.name, 
          role: userData.role,
          firebaseUid: user.uid
        } 
      };
    } else {
      throw new Error('User account not found. Please contact your administrator.');
    }
  } catch (error) {
    console.log('Firebase auth error details:', {
      code: error.code,
      message: error.message,
      email: email
    });
    
    if (error.code === 'auth/user-not-found') {
      return { success: false, error: 'No account found with this email address. Please check your email or register for a new account.' };
    } else if (error.code === 'auth/wrong-password') {
      return { success: false, error: 'Incorrect password. Please check your password and try again.' };
    } else if (error.code === 'auth/invalid-credential') {
      return { success: false, error: 'Invalid email or password. Please double-check your login credentials.' };
    } else if (error.code === 'auth/invalid-email') {
      return { success: false, error: 'Invalid email address format. Please enter a valid email.' };
    } else if (error.code === 'auth/missing-password') {
      return { success: false, error: 'Password is required. Please enter your password.' };
    } else if (error.code === 'auth/missing-email') {
      return { success: false, error: 'Email is required. Please enter your email address.' };
    } else if (error.code === 'auth/user-disabled') {
      return { success: false, error: 'This account has been disabled. Please contact support.' };
    } else if (error.code === 'auth/too-many-requests') {
      return { success: false, error: 'Too many failed login attempts. Please wait a few minutes before trying again.' };
    } else if (error.code === 'auth/network-request-failed') {
      return { success: false, error: 'Network error. Please check your internet connection and try again.' };
    }
    
    return { success: false, error: error.message || 'Login failed due to an unexpected error. Please try again.' };
  }
};

// Sign out
export const signOutUser = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    console.error('Sign out error:', error);
    return { success: false, error: error.message };
  }
};

// Generate invitation link for clients
export const generateInvitationLink = (dashboardId, clientEmail) => {
  const baseUrl = window.location.origin;
  const invitationUrl = `${baseUrl}/invite/${dashboardId}${clientEmail ? `?email=${encodeURIComponent(clientEmail)}` : ''}`;
  return invitationUrl;
};