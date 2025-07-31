# HomeTogether - Real Estate Collaboration Platform

🏡 A comprehensive real estate platform that streamlines the home buying and selling process with intelligent tools, real-time collaboration, and guided workflows for agents and clients.

**🌐 Live Demo:** [https://hometogether.app](https://hometogether.app)

## 🚀 Features

### For Real Estate Agents
- **Client Dashboard Management**: Create and manage multiple client dashboards
- **Progress Tracking**: Monitor client progress through buying/selling journey  
- **Document Management**: Centralized document storage and sharing
- **Real-time Collaboration**: Work simultaneously with clients
- **Invitation System**: Secure client onboarding via invitation links

### For Home Buyers
- **Guided Process**: Step-by-step guidance through the home buying journey
- **Financial Tools**: Mortgage calculators and pre-approval tracking
- **Property Management**: Save, compare, and score potential properties
- **Real-time Collaboration**: Direct communication with your agent
- **Progress Tracking**: Visual progress indicators and checklists

### For Home Sellers
- **Market Analysis**: Comprehensive market insights and pricing strategies
- **Preparation Guides**: Home staging and improvement recommendations
- **Marketing Tools**: Professional listing management and strategy planning
- **Offer Management**: Track and manage multiple offers
- **Timeline Management**: Organized selling process with clear milestones

## 🛠 Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Firebase (Firestore, Authentication, Cloud Functions)
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Build Tool**: Vite
- **Deployment**: Netlify
- **Email Service**: Brevo (for contact forms)

## 🏗️ Project Structure

```
src/
├── components/                 # Modular component library
│   ├── buyer-dashboard/        # Buyer journey components
│   │   ├── shared/            # Shared dashboard components
│   │   ├── step-one/          # Client Intake & Consultation
│   │   ├── step-two/          # Financial Pre-Approval
│   │   ├── step-three/        # House Hunting
│   │   ├── step-four/         # Offer & Negotiation
│   │   ├── step-five/         # Under Contract & Inspections
│   │   └── step-six/          # Closing Process
│   ├── seller-dashboard/      # Seller journey components
│   │   ├── shared/            # Shared seller components
│   │   ├── step-one/          # Seller Consultation
│   │   ├── step-two/          # Market Analysis & Pricing
│   │   ├── step-three/        # Property Preparation
│   │   ├── step-four/         # Marketing & Showings
│   │   ├── step-five/         # Offers & Negotiation
│   │   └── step-six/          # Closing Process
│   └── MonkeyAvatar.tsx       # Animated login avatar
├── contexts/                  # React contexts
│   └── AuthContext.tsx        # Authentication state management
├── firebase/                  # Firebase configuration
│   ├── config.ts              # Firebase initialization
│   ├── auth.ts                # Authentication functions
│   └── firestore.ts           # Database operations
├── pages/                     # Route components
│   ├── LandingPage.tsx        # Marketing landing page
│   ├── LoginPage.tsx          # Authentication
│   ├── InvitePage.tsx         # Client invitation registration
│   ├── ContactUsPage.tsx      # Contact form
│   ├── DashboardPage.tsx      # Main dashboard management
│   ├── BuyerDashboard.tsx     # Buyer journey interface
│   └── SellerDashboard.tsx    # Seller journey interface
├── utils/                     # Utility functions
└── App.tsx                    # Main application component
```

## 🔐 Security & Authentication

### Unified Authentication Architecture
- **Firebase Authentication**: Secure email/password authentication for all users
- **Role-based Access**: Agents vs Clients with appropriate permissions
- **Invitation-based Registration**: Secure client onboarding system
- **Real-time Security**: Firestore security rules ensure proper data isolation

### Data Protection
- **Production Firestore Rules**: Comprehensive security rules (see `PRODUCTION_FIRESTORE_RULES.md`)
- **User Isolation**: Users can only access their own data
- **Membership-based Dashboards**: Dashboard access controlled by membership arrays
- **Secure API**: Cloud Functions with proper authentication

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Firebase project with Firestore and Authentication enabled

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/hometogether.git
   cd hometogether
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Firebase Setup**
   
   Create a Firebase project at [Firebase Console](https://console.firebase.google.com):
   - Enable **Firestore Database** 
   - Enable **Authentication** (Email/Password)
   - Enable **Cloud Functions** (for contact form)
   - Follow detailed setup in `FIREBASE_SETUP_INSTRUCTIONS.md`

4. **Configure Environment Variables**
   
   Update `src/firebase/config.ts` with your Firebase configuration:
   ```javascript
   const firebaseConfig = {
     apiKey: "your-api-key",
     authDomain: "your-project.firebaseapp.com",
     projectId: "your-project-id",
     storageBucket: "your-project.appspot.com", 
     messagingSenderId: "123456789",
     appId: "your-app-id"
   };
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

## 📊 Database Schema

### Firestore Collections

#### `users`
```javascript
{
  uid: "firebase-auth-uid",
  email: "user@example.com", 
  name: "John Doe",
  role: "agent" | "client",
  createdAt: "ISO-timestamp",
  updatedAt: "ISO-timestamp"
}
```

#### `dashboards`
```javascript
{
  ownerId: "agent-user-id",
  members: ["agent-uid", "client-uid"],
  title: "John's Home Purchase",
  type: "buyer" | "seller", 
  status: "active" | "pending_invitation",
  clientName: "John Smith",
  clientEmail: "john@email.com",
  agentName: "Jane Agent",
  progress: 65,
  
  // Step-specific data
  clientData: { /* intake form data */ },
  notes: { /* step-specific notes */ },
  progressData: { /* completion tracking */ },
  // Additional fields vary by dashboard type
}
```

## 🔧 Configuration & Setup

### Required Configuration Updates

1. **Contact Form Email Setup** (`functions/src/index.ts`)
   ```typescript
   // Update these email addresses:
   sendSmtpEmail.sender = { 
     name: 'HomeTogether Contact Form', 
     email: 'your-verified-sender@yourdomain.com' // Your verified Brevo sender
   };
   sendSmtpEmail.to = [{ 
     name: 'Your Support Team', 
     email: 'support@yourdomain.com' // Your support email
   }];
   ```

2. **Brevo API Key Setup**
   - Create account at [Brevo](https://www.brevo.com)
   - Generate API key
   - Store in Google Cloud Secret Manager as `BREVO_API_KEY`

3. **Firestore Security Rules**
   - Deploy production rules from `PRODUCTION_FIRESTORE_RULES.md`
   - Essential for security and proper invitation flow

## 🚀 Deployment

### Netlify (Current)
The app is deployed at [https://hometogether.app](https://hometogether.app)

To deploy your own instance:
```bash
npm run build
# Deploy dist/ folder to Netlify
```

### Firebase Hosting (Alternative)
```bash
npm run build
firebase init hosting
firebase deploy
```

## 🎨 Design System

### Component Architecture
- **Modular Design**: Each step is a separate component group
- **Shared Components**: Reusable UI elements across dashboards
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Real-time Updates**: Live collaboration features

### Visual Design
- **Color Palette**: Blue primary with step-specific accent colors
- **Typography**: Clean, readable font hierarchy
- **Micro-interactions**: Hover states and smooth transitions
- **Accessibility**: WCAG compliant design

## 🧪 Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Adding New Features
1. Create components in appropriate step directories
2. Follow existing naming conventions
3. Use TypeScript interfaces for type safety
4. Add to dashboard sections via main dashboard files

## 📋 Demo Accounts

**Agent Registration:**
- Register directly at [https://hometogether.app/login](https://hometogether.app/login)
- Choose "Register" tab
- Full access to create and manage client dashboards

**Client Access:**
- Clients register via invitation links sent by agents
- Full Firebase authentication for all users
- Real-time collaboration with agents

## 🔒 Security Best Practices

### Implemented Security
- ✅ Firebase Authentication for all users
- ✅ Firestore security rules with proper user isolation
- ✅ Invitation-based client registration
- ✅ Real-time security with membership validation
- ✅ Secure API endpoints with authentication

### Recommended Additional Security
- Enable Firebase App Check for additional API protection
- Implement rate limiting on Cloud Functions
- Add input validation and sanitization
- Set up monitoring and alerting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Maintain component modularity (max 200 lines per file)
- Use proper React hooks and context patterns
- Write meaningful commit messages
- Test thoroughly before submitting PR

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

- **Live Demo**: [https://hometogether.app](https://hometogether.app)
- **Issues**: Create an issue in this repository
- **Documentation**: See `FIREBASE_SETUP_INSTRUCTIONS.md` for detailed setup

## 🙏 Acknowledgments

- **React Ecosystem**: Built with React 18 and modern hooks
- **Firebase**: Comprehensive backend services
- **Tailwind CSS**: Beautiful, responsive styling
- **Lucide Icons**: Clean, consistent iconography
- **Netlify**: Fast, reliable hosting platform

---

**Built for real estate professionals who want to deliver exceptional client experiences through modern technology and seamless collaboration.**