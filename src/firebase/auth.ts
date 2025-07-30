import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  type AuthError
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { auth, db } from './config';
import { updateDashboardStatus } from './firestore';

/**
 * A centralized function to convert Firebase Auth error codes into user-friendly messages.
 * @param {AuthError} error - The error object from Firebase.
 * @returns {{message: string, code: string}} - An object containing the user-friendly message and the original error code.
 */
const getAuthErrorMessage = (error: AuthError) => {
  console.error('Firebase Auth Error:', error.code, error.message);
  let message = 'An unexpected error occurred. Please try again.';
  switch (error.code) {
    case 'auth/invalid-email':
      message = 'Please enter a valid email address.';
      break;
    case 'auth/weak-password':
      message = 'Your password must be at least 6 characters long.';
      break;
    case 'auth/email-already-in-use':
      message = 'An account with this email already exists. Please sign in or use a different email.';
      break;
    case 'auth/user-not-found':
      message = 'No account found with this email address. Please check your email or register.';
      break;
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      message = 'Incorrect email or password. Please check your credentials and try again.';
      break;
    case 'auth/user-disabled':
      message = 'This account has been disabled. Please contact support.';
      break;
    case 'auth/too-many-requests':
      message = 'Access to this account has been temporarily disabled due to many failed login attempts. Please try again later.';
      break;
    case 'auth/network-request-failed':
      message = 'Network error. Please check your internet connection and try again.';
      break;
    case 'auth/operation-not-allowed':
      message = 'Email/password accounts are not enabled. Please contact support.';
      break;
    case 'auth/missing-password':
        message = 'Password is required. Please enter your password.';
        break;
    case 'auth/missing-email':
        message = 'Email is required. Please enter your email address.';
        break;
    default:
        // Use Firebase's message for any unhandled errors, or fall back to a generic one.
        message = error.message || 'An unexpected authentication error occurred.';
  }
  console.log('Formatted error message:', message); // ADD THIS
  return { message, code: error.code };
};

/**
 * Registers a new agent user.
 * @returns {Promise<{success: boolean, user?: object, error?: string, code?: string}>}
 */
export const registerAgent = async (email, password, name) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await updateProfile(user, { displayName: name });

    const userDocRef = doc(db, 'users', user.uid);
    await setDoc(userDocRef, {
      uid: user.uid,
      email: email,
      name: name,
      role: 'agent',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });

    return { success: true, user: { id: user.uid, email, name, role: 'agent' } };
  } catch (error) {
    const { message, code } = getAuthErrorMessage(error as AuthError);
    console.log('registerAgent returning error:', { message, code }); // ADD THIS
    return { success: false, error: message, code: code };
  }
};

/**
 * Registers a new client user via an invitation.
 * @returns {Promise<{success: boolean, user?: object, error?: string, code?: string}>}
 */
export const registerClient = async (email, password, name, invitationToken) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await updateProfile(user, { displayName: name });

    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      email: email,
      name: name,
      role: 'client',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });

    if (invitationToken) {
      await updateDoc(doc(db, 'dashboards', invitationToken), {
        members: arrayUnion(user.uid),
        updatedAt: new Date().toISOString()
      });
      await updateDashboardStatus(invitationToken, 'active');
    }

    return { success: true, user: { id: user.uid, email, name, role: 'client' } };
  } catch (error) {
    const { message, code } = getAuthErrorMessage(error as AuthError);
    return { success: false, error: message, code: code };
  }
};

/**
 * Signs in any user (agent or client).
 * @returns {Promise<{success: boolean, user?: object, error?: string, code?: string}>}
 */
export const signInUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

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
      // This case is rare if registration always creates a user doc, but it's good practice to handle it.
      throw new Error('User data not found in the database. Please contact support.');
    }
  } catch (error) {
    // If the error is not a standard AuthError, it might be the custom one from the try block.
    if (error instanceof Error && !(error as AuthError).code) {
        return { success: false, error: error.message };
    }
    const { message, code } = getAuthErrorMessage(error as AuthError);
    return { success: false, error: message, code: code };
  }
};

/**
 * Signs out the current user.
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export const signOutUser = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    const { message } = getAuthErrorMessage(error as AuthError);
    return { success: false, error: message };
  }
};

/**
 * Generates an invitation link for clients.
 * @param {string} dashboardId - The ID of the dashboard to join.
 * @param {string} [clientEmail] - Optional email to pre-fill.
 * @returns {string} The full invitation URL.
 */
export const generateInvitationLink = (dashboardId, clientEmail) => {
  const baseUrl = window.location.origin;
  const invitationUrl = `${baseUrl}/invite/${dashboardId}${clientEmail ? `?email=${encodeURIComponent(clientEmail)}` : ''}`;
  return invitationUrl;
};
