# HomeTogether Setup Guide

## 🔧 Complete Setup Instructions

### 1. Clone and Install

```bash
git clone https://github.com/yourusername/hometogether.git
cd hometogether
npm install
```

### 2. Firebase Configuration

#### Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create new project
3. Enable Firestore Database
4. Enable Authentication (Email/Password)
5. Enable Cloud Functions

#### Get Firebase Config
1. Project Settings → General → Your apps
2. Add web app
3. Copy the config object
4. Create `.env` file from `.env.example`
5. Fill in your Firebase values

#### Deploy Security Rules
Copy the rules from `PRODUCTION_FIRESTORE_RULES.md` to your Firestore Rules tab in Firebase Console.

### 3. Contact Form Setup (Optional)

#### Brevo Email Service
1. Create account at [Brevo](https://www.brevo.com)
2. Get API key from account settings
3. Store in Google Cloud Secret Manager as `BREVO_API_KEY`

#### Update Email Addresses
In `functions/src/index.ts`, update:
- `sendSmtpEmail.sender.email` - Your verified sender email
- `sendSmtpEmail.to[0].email` - Your support email

#### Deploy Cloud Function
```bash
firebase deploy --only functions
```

### 4. Start Development

```bash
npm run dev
```

### 5. Deploy to Production

#### Option A: Netlify (Recommended)
1. Build the project: `npm run build`
2. Deploy `dist/` folder to Netlify
3. Set up custom domain if desired

#### Option B: Firebase Hosting
```bash
npm run build
firebase init hosting
firebase deploy
```

## 📋 Configuration Checklist

- [ ] Firebase project created
- [ ] Firestore security rules deployed
- [ ] Authentication enabled
- [ ] Environment variables configured
- [ ] Contact form emails updated (if using)
- [ ] Cloud Functions deployed (if using contact form)
- [ ] App deployed to hosting platform

## 🔒 Security Notes

- All Firebase config values in the code are public client keys (safe to expose)
- Sensitive API keys are stored in Google Cloud Secret Manager
- Firestore security rules provide comprehensive data protection
- No hardcoded secrets in the codebase

## 🐛 Troubleshooting

### Common Issues
1. **Authentication errors**: Verify Firebase config and auth domain
2. **Database permission denied**: Ensure Firestore rules are deployed
3. **Contact form not working**: Check Cloud Function URL and Brevo setup
4. **Invitation links broken**: Verify Firestore rules allow pending invitations

### Getting Help
- Check the browser console for error messages
- Verify Firebase project settings
- Ensure all environment variables are set
- Review the detailed setup in `FIREBASE_SETUP_INSTRUCTIONS.md`