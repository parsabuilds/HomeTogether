# Firebase Setup Instructions for AgentIQ

## Step 1: Create Firebase Project

1. **Go to Firebase Console**
   - Visit [https://console.firebase.google.com/](https://console.firebase.google.com/)
   - Sign in with your Google account

2. **Create New Project**
   - Click "Create a project"
   - Enter project name: `agentiq-app` (or your preferred name)
   - Choose whether to enable Google Analytics (recommended)
   - Click "Create project"

## Step 2: Set Up Authentication

1. **Enable Authentication**
   - In your Firebase project, click "Authentication" in the left sidebar
   - Click "Get started"
   - Go to "Sign-in method" tab

2. **Enable Email/Password Authentication**
   - Click on "Email/Password"
   - Toggle "Enable" to ON
   - Click "Save"

3. **Configure Authorized Domains (Optional)**
   - Add your production domain when you deploy
   - `localhost` is already authorized for development

## Step 3: Create Firestore Database

1. **Initialize Firestore**
   - Click "Firestore Database" in the left sidebar
   - Click "Create database"

2. **Choose Security Rules**
   - Select "Start in test mode" for development
   - Choose your preferred location (closest to your users)
   - Click "Done"

3. **Set Up Security Rules**
   Replace the default rules with the production-ready rules from PRODUCTION_FIRESTORE_RULES.md:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read/write their own user document
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Unified dashboard access with membership-based security
    match /dashboards/{dashboardId} {
      // Allow unauthenticated users to read dashboards with pending invitation status
      allow get: if request.auth == null && resource.data.status == 'pending_invitation';
      
      // Allow authenticated users to join pending invitation dashboards
      allow update: if request.auth != null &&
        resource.data.status == 'pending_invitation' &&
        !(request.auth.uid in resource.data.members) &&
        request.resource.data.members.hasAll(resource.data.members.concat([request.auth.uid]));
      
      // Allow read/write access only to dashboard members
      allow read, write: if request.auth != null && 
        request.auth.uid in resource.data.members;
      allow create: if request.auth != null;
      allow delete: if request.auth != null && 
        request.auth.uid == resource.data.ownerId;
    }
  }
}
```

## Step 4: Get Firebase Configuration

1. **Add Web App**
   - Click the gear icon (Project settings)
   - Scroll down to "Your apps"
   - Click the web icon `</>`
   - Enter app nickname: "AgentIQ Web App"
   - Click "Register app"

2. **Copy Configuration**
   - Copy the `firebaseConfig` object
   - Replace the placeholder values in `src/firebase/config.js`

## Step 5: Database Structure

Your Firestore database will have this unified collection structure:

### Collection: `users`
```javascript
{
  uid: "user-auth-id",
  email: "agent@example.com",
  name: "John Agent",
  role: "agent", // or "client"
  createdAt: "2024-01-15T10:30:00Z",
  updatedAt: "2024-01-15T10:30:00Z"
}
```

### Collection: `dashboards`
```javascript
{
  ownerId: "agent-user-id",
  members: ["agent-user-id", "client-user-id"],
  title: "John Smith's Home Purchase",
  clientName: "Jane Smith",
  clientEmail: "jane@example.com",
  clientPhone: "(555) 123-4567",
  agentName: "Sarah Johnson",
  type: "buyer", // or "seller"
  status: "active", // or "pending_invitation"
  createdAt: "2024-01-15T10:30:00Z",
  updatedAt: "2024-01-15T10:30:00Z",
  progress: 65,
  
  // Additional fields for form data, progress tracking, notes, etc.
  // Structure varies based on dashboard type and implementation
}
```

## Step 6: Install Firebase Dependencies

Run this command in your project:
```bash
npm install firebase
```

## Step 7: Update AuthContext

The AuthContext is already properly configured with Firebase authentication:

```javascript
import { auth } from '../firebase/config';
import { registerAgent, signInUser, signOutUser } from '../firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';

// All authentication functions are properly implemented
```

## Step 8: Environment Variables (Optional but Recommended)

1. **Create `.env` file** in your project root:
```
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef
```

2. **Update config.ts** to use environment variables:
```javascript
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  // ... other config values
};
```

## Step 9: Testing

1. **Test Agent Registration/Login**
   - Create an agent account
   - Verify user document is created in Firestore

2. **Test Dashboard Creation**
   - Create a dashboard as an agent
   - Verify document appears in `dashboards` collection

3. **Test Client Invitation Flow**
   - Generate an invitation link
   - Register a client account via the invitation
   - Verify client can access their dashboard

## Step 10: Deploy (When Ready)

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Initialize Firebase Hosting**
   ```bash
   firebase init hosting
   ```

3. **Build and Deploy**
   ```bash
   npm run build
   firebase deploy
   ```

## Security Considerations

1. **Update Firestore Rules** for production (see Step 3)
2. **Use Environment Variables** for sensitive config
3. **Enable App Check** for additional security
4. **Set up proper user roles** and permissions
5. **Implement data validation** on the client side

## Backup Strategy

1. **Enable Firestore Backups** in Firebase Console
2. **Export data regularly** for additional safety
3. **Monitor usage** and set up billing alerts

This setup provides a robust, scalable foundation for your AgentIQ application with proper security and data structure.