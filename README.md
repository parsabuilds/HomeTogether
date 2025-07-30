# AgentIQ - Real Estate Platform

A comprehensive real estate platform that streamlines the home buying and selling process with intelligent tools, real-time collaboration, and guided workflows for agents and clients.

## 🚀 Features

### For Real Estate Agents
- **Client Dashboard Management**: Create and manage multiple client dashboards
- **Progress Tracking**: Monitor client progress through buying/selling journey
- **Document Management**: Centralized document storage and sharing
- **Analytics**: Track performance and client engagement

### For Home Buyers
- **Guided Process**: Step-by-step guidance through the home buying journey
- **Financial Tools**: Mortgage calculators and pre-approval tracking
- **Property Management**: Save, compare, and score potential properties
- **Real-time Collaboration**: Direct communication with your agent

### For Home Sellers
- **Market Analysis**: Comprehensive market insights and pricing strategies
- **Preparation Guides**: Home staging and improvement recommendations
- **Marketing Tools**: Professional listing management
- **Offer Management**: Track and manage multiple offers

## 🛠 Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Firebase (Firestore, Authentication)
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Build Tool**: Vite

## 🔒 Security

- **Authentication**: Firebase Authentication with email/password
- **Authorization**: Role-based access control (Agents vs Clients)
- **Data Protection**: Firestore security rules ensure data isolation
- **Client Access**: Secure access code system for client dashboards

## 🌐 Live Demo

Visit the live application: [https://myhomeflow.netlify.app](https://myhomeflow.netlify.app)

### Demo Accounts

**Agent Login:**
- Email: `agent@agentiq.com`
- Password: `password123`

**Client Registration:**
- Clients register via secure invitation links sent by agents
- Full Firebase authentication for all users
- Real-time collaboration between agents and clients

## 🏃‍♂️ Quick Start

### Prerequisites
- Node.js 18+
- Firebase project with Firestore and Authentication enabled

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/agentiq.git
   cd agentiq
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Firebase Setup**
   - Create a Firebase project at [https://console.firebase.google.com](https://console.firebase.google.com)
   - Enable Firestore Database and Authentication
   - Update `src/firebase/config.js` with your Firebase configuration

4. **Configure Environment Variables**
   ```bash
   cp .env.example .env
   # Edit .env with your Firebase configuration
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

## 🗃 Database Setup

### Firestore Collection

The application uses a unified Firestore collection:

#### `users`
```javascript
{
  uid: "user-auth-id",
  email: "agent@example.com",
  name: "John Agent",
  role: "agent",
  createdAt: "ISO-8601-timestamp",
  updatedAt: "ISO-8601-timestamp"
}
```

#### `dashboards`
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
  // Additional fields for form data, progress tracking, notes, etc.
}
```

### Security Rules

The application uses production-ready Firestore security rules that ensure:
- Users can only access their own data
- Agents can only manage their client dashboards
- Clients can access dashboards only with valid access codes
- All queries are properly authenticated and authorized

## 🏗️ Component Architecture

### Modular Design Principles
- **Step-Based Organization**: Components grouped by journey steps
- **Shared Components**: Reusable UI elements in dedicated shared folders  
- **Single Responsibility**: Each component focuses on one specific feature
- **TypeScript Interfaces**: Strong typing throughout the application
- **Separation of Concerns**: Clear distinction between data, UI, and business logic

### Benefits of Modular Structure
- **Maintainability**: Easy to locate and update specific features
- **Scalability**: New components can be added without affecting existing code
- **Team Development**: Multiple developers can work on different steps simultaneously
- **Testing**: Individual components can be tested in isolation
- **Code Reuse**: Shared components reduce duplication

### Component Communication
- **Props**: Data flows down from parent to child components
- **Callbacks**: Events bubble up to parent components
- **Context**: Authentication state shared globally
- **Firebase**: Real-time data synchronization between users

### File Organization Standards
- Maximum 200 lines per component file
- Clear naming conventions (PascalCase for components)
- Grouped imports (React, third-party, local)
- TypeScript interfaces defined at component level

## 📱 Application Structure

### High-Level Architecture
```
src/
├── components/                 # Modular component library
│   ├── buyer-dashboard/           # Buyer journey components
│   ├── seller-dashboard/          # Seller journey components
│   └── MonkeyAvatar.tsx          # Login page avatar component
├── contexts/                   # React contexts
│   └── AuthContext.tsx            # Authentication state management
├── firebase/                   # Firebase configuration
│   ├── config.ts                  # Firebase initialization
│   ├── auth.ts                    # Authentication functions
│   └── firestore.ts               # Database operations
├── pages/                      # Route components
│   ├── LandingPage.tsx            # Marketing landing page
│   ├── LoginPage.tsx              # Authentication
│   ├── InvitePage.tsx             # Client invitation registration
│   ├── DashboardPage.tsx          # Main dashboard management
│   ├── BuyerDashboard.tsx         # Buyer journey interface
│   └── SellerDashboard.tsx        # Seller journey interface
└── App.tsx                     # Main application component
```

### Buyer Dashboard Components
```
src/components/buyer-dashboard/
├── shared/                     # Shared components
│   ├── DashboardHeader.tsx        # Header with navigation & progress
│   ├── ProgressSidebar.tsx        # Step navigation sidebar  
│   └── NotesSection.tsx           # Reusable notes component
├── step-one/                   # Client Intake & Consultation
│   ├── BuyerIntakeSection.tsx     # Complete intake section
│   ├── BuyerRepoAgreement.tsx     # Agreement link component
│   └── IntakeForm.tsx             # Client intake form
├── step-two/                   # Financial Pre-Approval
│   ├── FinancialToolsSection.tsx  # Complete financial section
│   ├── MortgageFunFacts.tsx       # Educational content
│   └── PitiMortgageCalculator.tsx # PITI calculator
├── step-three/                 # House Hunting
│   ├── HouseHuntingSection.tsx    # Complete house hunting section
│   ├── OnlineSearchLinks.tsx      # Search website links
│   ├── PropertyCard.tsx           # Individual property display
│   ├── PropertyTracker.tsx        # Property management
│   └── SearchCriteriaTool.tsx     # Search criteria overview
├── step-four/                  # Offer & Negotiation
│   ├── CMAViewingArea.tsx         # CMA document sharing
│   ├── OfferDocumentLinks.tsx     # Required documents
│   ├── OfferNegotiationInfo.tsx   # Educational content
│   ├── OfferNegotiationSection.tsx # Complete offer section
│   ├── OfferTrackerTool.tsx       # Offer tracking
│   └── SimpleNetSheetEstimator.tsx # Cash-to-close calculator
├── step-five/                  # Under Contract & Inspections
│   ├── CriticalDateTrackerTool.tsx # Important deadlines
│   ├── DocumentHubTool.tsx        # Document link storage
│   ├── InspectionDiligenceSection.tsx # Complete inspection section
│   ├── InspectionDueDiligenceTrackerTool.tsx # Task management
│   ├── InspectionInfo.tsx         # Educational content
│   ├── RecommendedVendors.tsx     # Vendor contacts
│   └── RepairRequestBuilderTool.tsx # Repair request tracking
└── step-six/                   # Closing Process
    ├── ClosingContacts.tsx        # Key contact information
    ├── ClosingCostFinalizer.tsx   # LE vs CD comparison
    ├── ClosingInfo.tsx            # Educational content
    ├── ClosingProcessSection.tsx  # Complete closing section
    ├── FinalWalkthroughChecklistComponent.tsx # Pre-closing checklist
    ├── MovingDayPlannerTool.tsx   # Moving preparation
    └── UtilitiesTransferTrackerTool.tsx # Utility setup
```

### Seller Dashboard Components
```
src/components/seller-dashboard/
├── shared/                     # Shared components
│   ├── AccordionItem.tsx          # Reusable accordion component
│   └── SellerNotesSection.tsx     # Shared notes component
├── step-one/                   # Seller Consultation
│   ├── SellerConsultationSection.tsx # Complete consultation section
│   ├── SellerIntakeForm.tsx       # Seller intake form
│   └── SellerListingAgreement.tsx # Listing agreement component
├── step-two/                   # Market Analysis & Pricing
│   ├── MarketAnalysisSection.tsx  # Complete market analysis section
│   ├── MarketAnalysisCalculator.tsx # Home value estimator
│   └── SellingTipsAndInsights.tsx # Educational content
├── step-three/                 # Property Preparation
│   ├── PropertyPreparationSection.tsx # Complete preparation section
│   └── HomePreparationChecklist.tsx # Preparation checklist
├── step-four/                  # Marketing & Showings
│   ├── MarketingSection.tsx       # Complete marketing section
│   └── MarketingStrategyPlanner.tsx # Marketing channel planner
├── step-five/                  # Offers & Negotiation
│   ├── OfferNegotiationSection.tsx # Complete offer section
│   └── OfferManagementTool.tsx    # Offer tracking and management
└── step-six/                   # Closing Process
    ├── ClosingProcessSection.tsx # Complete closing section
    └── SellerClosingPlanner.tsx  # Closing checklist
```

## 🔐 Authentication & Authorization

### Agent Authentication
- Standard email/password authentication via Firebase Auth
- Agents can register directly through the application
- Full CRUD access to their client dashboards

### Client Access
- Secure invitation-based registration
- Clients register via invitation links sent by agents
- Full Firebase authentication for all users
- Membership-based dashboard access

## 🎨 Design System

The application uses a modern, professional design system built with Tailwind CSS:

- **Color Palette**: Blue primary, with secondary colors for different client types
- **Typography**: Clean, readable fonts with proper hierarchy
- **Components**: Consistent spacing, shadows, and interactions
- **Responsive**: Fully responsive design for all device sizes
- **Accessibility**: WCAG compliant with proper focus states and contrast

## 🚀 Deployment

The application is optimized for deployment on modern hosting platforms:

### Netlify (Recommended)
```bash
npm run build
# Deploy the dist/ folder to Netlify
```

### Vercel
```bash
npm run build
# Deploy using Vercel CLI or GitHub integration
```

### Firebase Hosting
```bash
npm run build
firebase init hosting
firebase deploy
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For support, email support@agentiq.com or create an issue in this repository.

## 🙏 Acknowledgments

- Built with [React](https://reactjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons by [Lucide](https://lucide.dev/)
- Backend by [Firebase](https://firebase.google.com/)
