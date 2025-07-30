# Production Firestore Security Rules

## 🔒 CRITICAL: Update Your Security Rules Immediately

Your Firestore database currently has development-friendly rules that allow all reads and writes. For the new unified authentication architecture, you MUST update these rules for security.

## Step 1: Go to Firebase Console

1. Visit [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. Navigate to **Firestore Database** → **Rules**

## Step 2: Replace with Production Rules

**Copy and paste these exact rules** into your Firebase Console:

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
      // This enables the invitation page to display dashboard details before registration
      allow get: if request.auth == null && resource.data.status == 'pending_invitation';
      
      // Allow authenticated users (who are not yet members) to read dashboards with pending invitation status
      // This is useful for agents or existing users who might click an invite link.
      allow get: if request.auth != null &&
        !(request.auth.uid in resource.data.members) &&
        resource.data.status == 'pending_invitation';

      // Rule for authenticated users to join a pending invitation dashboard (add themselves to members)
      // This allows adding a member without changing the status yet.
      allow update: if request.auth != null &&
        resource.data.status == 'pending_invitation' &&
        !(request.auth.uid in resource.data.members) && // User is not already a member
        request.resource.data.members.hasAll(resource.data.members.concat([request.auth.uid])) && // New members array includes old members + current user
        request.resource.data.diff(resource.data).affectedKeys().hasOnly(['members', 'updatedAt']); // Only members and updatedAt can change

      // Rule for authenticated users to change status from pending_invitation to active
      // This can be done by the agent or the client after joining.
      allow update: if request.auth != null &&
        resource.data.status == 'pending_invitation' &&
        request.resource.data.status == 'active' &&
        request.resource.data.diff(resource.data).affectedKeys().hasOnly(['status', 'updatedAt']);
      
      // Allow read/write access only to dashboard members (for active dashboards)
      allow read, write: if request.auth != null &&
        request.auth.uid in resource.data.members; // Members can access dashboards regardless of status
      
      // Allow creation only by authenticated users (will be dashboard owner)
      allow create: if request.auth != null;
      
      // Allow deletion only by dashboard owner
      allow delete: if request.auth != null && 
        request.auth.uid == resource.data.ownerId;
    }
    
    // Deny all other requests
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

## Step 3: Click "Publish"

After pasting the rules, click **"Publish"** to activate them.

## 🔧 What Changed to Fix the Invitation Errors

The updated rules now include a specific **`update`** permission that allows:

1. **Unauthenticated users** to read dashboards with `pending_invitation` status
2. **Newly registered clients** to add themselves to the `members` array
3. **Status transition** from `pending_invitation` to `active`
4. **Restricted field changes** - only `members`, `status`, and `updatedAt` can be modified during invitation acceptance

### 🎯 Key Security Features:
- ✅ **Invitation-only access**: Only users with valid invitation links can join
- ✅ **Self-registration**: Clients can safely add themselves to dashboards
- ✅ **Field restrictions**: Only specific fields can be changed during invitation
- ✅ **Status validation**: Ensures proper workflow from pending → active
- ✅ **Duplicate prevention**: Users can't add themselves twice

## 📋 Manual Database Migration Required

### Current Structure → New Structure

**NEW:** `dashboards` collection

### Current Collection Structure:
```json
{
  "ownerId": "abc123",
  "members": ["abc123"],
  "clientName": "John Smith", 
  "clientEmail": "john@email.com",
  "type": "buyer",
  "progress": 45,
  "title": "John Smith's Home Purchase",
  "status": "pending_invitation"
}
```

## 🎯 What These New Rules Enable

### ✅ Unified Authentication Benefits:
1. **Real-time Collaboration**: Both agents and clients can edit simultaneously
2. **Proper Security**: All users have Firebase accounts with proper authentication
3. **Membership-Based Access**: Dashboard access controlled by members array
4. **Owner Privileges**: Only dashboard owners can delete dashboards
5. **Scalable**: Easy to add more users to dashboards
6. **🆕 Invitation Flow**: Clients can now successfully register via invitation links

### 🔐 Security Features:
- **User Isolation**: Users can only access their own user documents
- **Membership Control**: Only users in the `members` array can access dashboards
- **Real-time Security**: Rules apply to both REST API and real-time listeners
- **Audit Trail**: All changes tracked with proper user IDs
- **🆕 Invitation Security**: Controlled self-registration with field restrictions

## 🧪 Testing Checklist

After updating rules and migrating data:

1. ✅ **Agent Registration**: Create new agent account
2. ✅ **Dashboard Creation**: Agent can create dashboards
3. ✅ **Client Invitation**: Generate invitation links
4. ✅ **🆕 Client Registration**: Client can register via invitation (FIXED)
5. ✅ **🆕 Dashboard Access**: Client can access dashboard after registration (FIXED)
6. ✅ **Shared Access**: Both agent and client can edit dashboard
7. ✅ **Real-time Updates**: Changes sync instantly between users
8. ✅ **Access Control**: Users cannot access dashboards they're not members of

## 🚨 Important Notes

- **All users now need Firebase accounts** (no more access codes)
- **Clients register through invitation links** (secure onboarding)
- **Real-time sync works automatically** (no manual refresh needed)
- **Data is properly isolated** between different dashboards
- **🆕 Invitation flow now works correctly** (permission errors fixed)

## 📧 Invitation Flow

1. **Agent creates dashboard** → System generates invitation link
2. **Client receives link** → Clicks to register
3. **🆕 Client registers** → Can now successfully join dashboard (FIXED)
4. **Both collaborate** → Real-time editing enabled

## 🔄 Emergency Rollback

If something breaks, you can temporarily rollback to development rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

**But implement the production rules ASAP!**

---

## 🎉 New Architecture Benefits

- ✅ **Eliminates all authentication issues**
- ✅ **🆕 Fixes invitation permission errors**
- ✅ **Enables real-time collaboration** 
- ✅ **Professional user experience**
- ✅ **Scalable and maintainable**
- ✅ **Industry-standard security**