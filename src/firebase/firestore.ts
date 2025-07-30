import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy,
  arrayUnion 
} from 'firebase/firestore';
import { db } from './config';

// Create a new dashboard
export const createDashboard = async (ownerId: string, dashboardData: any) => {
  try {
    const docRef = await addDoc(collection(db, 'dashboards'), {
      ...dashboardData,
      ownerId,
      members: [ownerId],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      progress: 0
    });
    
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error creating dashboard:', error);
    return { success: false, error: error.message };
  }
};

// Get dashboards for a user
export const getUserDashboards = async (userId: string) => {
  try {
    const q = query(
      collection(db, 'dashboards'),
      where('members', 'array-contains', userId)
    );
    
    const querySnapshot = await getDocs(q);
    const dashboards = [];
    
    querySnapshot.forEach((doc) => {
      dashboards.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    // Sort dashboards by createdAt in descending order (most recent first)
    dashboards.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return dateB - dateA;
    });
    
    return { success: true, dashboards };
  } catch (error) {
    console.error('Error getting dashboards:', error);
    return { success: false, error: error.message, dashboards: [] };
  }
};

// Get a specific dashboard
export const getDashboard = async (dashboardId: string) => {
  try {
    const docRef = doc(db, 'dashboards', dashboardId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { success: true, dashboard: { id: docSnap.id, ...docSnap.data() } };
    } else {
      return { success: false, error: 'Dashboard not found' };
    }
  } catch (error) {
    console.error('Error getting dashboard:', error);
    return { success: false, error: error.message };
  }
};

// Update a dashboard
export const updateDashboard = async (dashboardId: string, updateData: any) => {
  try {
    const docRef = doc(db, 'dashboards', dashboardId);
    await updateDoc(docRef, {
      ...updateData,
      updatedAt: new Date().toISOString()
    });
    
    return { success: true };
  } catch (error) {
    console.error('Error updating dashboard:', error);
    return { success: false, error: error.message };
  }
};

// Delete a dashboard
export const deleteDashboard = async (dashboardId: string) => {
  try {
    const docRef = doc(db, 'dashboards', dashboardId);
    await deleteDoc(docRef);
    
    return { success: true };
  } catch (error) {
    console.error('Error deleting dashboard:', error);
    return { success: false, error: error.message };
  }
};

// Add member to dashboard
export const addMemberToDashboard = async (dashboardId: string, userId: string) => {
  try {
    const docRef = doc(db, 'dashboards', dashboardId);
    await updateDoc(docRef, {
      members: arrayUnion(userId),
      updatedAt: new Date().toISOString()
    });
    
    return { success: true };
  } catch (error) {
    console.error('Error adding member to dashboard:', error);
    return { success: false, error: error.message };
  }
};

// Update dashboard status
export const updateDashboardStatus = async (dashboardId: string, status: string) => {
  try {
    const docRef = doc(db, 'dashboards', dashboardId);
    await updateDoc(docRef, {
      status,
      updatedAt: new Date().toISOString()
    });
    
    return { success: true };
  } catch (error) {
    console.error('Error updating dashboard status:', error);
    return { success: false, error: error.message };
  }
};