import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { 
  Home, 
  Users, 
  TrendingUp, 
  Shield, 
  ArrowRight, 
  CheckCircle, 
  Star,
  UserPlus,
  MessageSquare,
  Calendar,
  FileText,
  Zap,
  Building,
  Crown,
  Check,
  X,
  Play,
  ChevronRight,
  BarChart3,
  Clock,
  Globe
} from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();
  const [showVideoModal, setShowVideoModal] = useState(false);

  const features = [
    {
      icon: Users,
      title: "Real-Time Collaboration",
      description: "Agents and clients work together in shared dashboards with live updates"
    },
    {
      icon: BarChart3,
      title: "Progress Tracking",
      description: "Visual progress bars and checklists keep everyone on the same page"
    },
    {
      icon: MessageSquare,
      title: "Smart Communication",
      description: "Built-in notes and comments eliminate endless email chains"
    },
    {
      icon: Shield,
      title: "Professional Tools",
      description: "Mortgage calculators, document sharing, and vendor management"
    },
    {
      icon: Clock,
      title: "Save Time",
      description: "Automate follow-ups and reduce back-and-forth communication"
    },
    {
      icon: Globe,
      title: "Work Anywhere",
      description: "Cloud-based platform accessible from any device, anywhere"
    }
  ];

  const steps = [
    {
      number: 1,
      title: "Create & Invite",
      description: "Agent creates a personalized dashboard and sends secure invitation to client",
      icon: UserPlus,
      color: "from-blue-500 to-cyan-500"
    },
    {
      number: 2,
      title: "Real-Time Collaboration",
      description: "Both work together through every step of the buying/selling process",
      icon: Users,
      color: "from-green-500 to-emerald-500"
    },
    {
      number: 3,
      title: "Close More Deals",
      description: "Stay organized, build trust, and deliver exceptional service",
      icon: TrendingUp,
      color: "from-purple-500 to-violet-500"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Mitchell",
      role: "Real Estate Agent",
      company: "Keller Williams",
      text: "AgentIQ has transformed how I work with clients. The real-time collaboration keeps everyone engaged and informed throughout the entire process.",
      rating: 5
    },
    {
      name: "Mike Chen",
      role: "First-Time Buyer",
      text: "Having my own dashboard made the home buying process so much less stressful. I could see our progress and communicate with my agent easily.",
      rating: 5
    },
    {
      name: "Lisa Rodriguez",
      role: "Broker Owner",
      company: "Elite Properties",
      text: "Our agents love AgentIQ. It's helped them close 20% more deals while spending less time on administrative tasks.",
      rating: 5
    }
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "Free",
      period: "forever",
      description: "Perfect for trying out AgentIQ",
      features: [
        "1 active dashboard",
        "Basic progress tracking",
        "Client collaboration",
        "Email support",
        "Mobile responsive"
      ],
      limitations: [
        "Limited to 1 client at a time",
        "Basic features only"
      ],
      buttonText: "Start Free",
      buttonStyle: "border-2 border-blue-600 text-blue-600 hover:bg-blue-50",
      popular: false
    },
    {
      name: "Professional",
      price: "$9.99",
      period: "per month",
      description: "Everything you need to scale your business",
      features: [
        "Unlimited dashboards",
        "All dashboard features",
        "Real-time collaboration",
        "Basic tools included",
        "Priority support",
        "Mobile app access"
      ],
      limitations: [],
      buttonText: "Start 14-Day Free Trial",
      buttonStyle: "bg-blue-600 text-white hover:bg-blue-700",
      popular: true
    },
    {
      name: "Brokerage",
      price: "$99", 
      period: "per month",
      description: "For teams and brokerages (up to 40 agents)",
      features: [
        "Everything in Professional",
        "Up to 40 agent accounts",
        "Team analytics dashboard",
        "Centralized management",
        "Bulk client invitations",
        "Team performance tracking",
        "Dedicated account manager",
        "Training & onboarding"
      ],
      limitations: [],
      buttonText: "Contact Sales",
      buttonStyle: "bg-gray-800 text-white hover:bg-gray-900",
      popular: false
    }
  ];

  // Smooth scroll function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="flex items-center">
                <img src="/logo.png" alt="HomeTogether" className="w-14 h-14 md:w-14 md:h-14 object-contain" onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.nextElementSibling?.classList.remove('hidden');
                }} />
                <Home className="w-8 h-8 md:w-10 md:h-10 text-gray-700 hidden" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                HomeTogether
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('how-it-works')} className="text-gray-600 hover:text-gray-800 font-medium">How It Works</button>
              <button onClick={() => scrollToSection('features')} className="text-gray-600 hover:text-gray-800 font-medium">Features</button>
              <button onClick={() => scrollToSection('pricing')} className="text-gray-600 hover:text-gray-800 font-medium">Pricing</button>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => navigate('/login', { state: { activeTab: 'login' } })}
                className="text-gray-600 hover:text-gray-800 font-medium px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Log In
              </button>
              <button
                onClick={() => navigate('/login', { state: { activeTab: 'register' } })}
                className="hidden md:inline-flex bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium"
              >
                Get Started Free
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32 lg:pb-20">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-800 text-sm font-medium mb-8">
              <Star className="w-4 h-4 mr-2 fill-current" />
              Trusted by 1,000+ Real Estate Professionals
            </div>
            
            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Stop Losing Clients<br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Start Collaborating
              </span>
            </h1>
            
            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
              Have a question about HomeTogether? Need help getting started? 
              Want to share feedback? We're here to help and would love to hear from you.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <button
                onClick={() => navigate('/login', { state: { activeTab: 'register' } })}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-semibold text-lg flex items-center justify-center group"
              >
                Start Your Free Dashboard
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
             <button 
               onClick={() => setShowVideoModal(true)}
               className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 font-semibold text-lg flex items-center justify-center"
             >
                <Play className="w-5 h-5 mr-2" />
                Watch 2-Min Demo
              </button>
            </div>

            {/* Social Proof */}
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <div className="text-sm text-gray-500 font-medium">TRUSTED BY AGENTS AT</div>
              <div className="flex items-center space-x-8">
                <span className="text-lg font-bold text-gray-400">Keller Williams</span>
                <span className="text-lg font-bold text-gray-400">RE/MAX</span>
                <span className="text-lg font-bold text-gray-400">Coldwell Banker</span>
                <span className="text-lg font-bold text-gray-400">Century 21</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              How HomeTogether Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple, powerful, and designed for the way real estate professionals actually work
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {steps.map((step, index) => {
              return (
                <div key={step.number} className="relative">
                  <div className="text-center relative z-10">
                    <div className={`w-20 h-20 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                      <span className="text-3xl font-bold text-white">{step.number}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* App Screenshot */}
          <div className="hidden lg:block text-center mt-16">
            <div className="max-w-5xl mx-auto">
              <div className="relative inline-block">
                {/* Gradient Border Container */}
                <div className="p-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-2xl shadow-2xl">
                  <div className="bg-white rounded-xl p-4 shadow-lg">
                    <img 
                      src="/app-screenshot.png" 
                      alt="HomeTogether Dashboard Screenshot" 
                      className="w-full h-auto rounded-lg shadow-lg"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://images.pexels.com/photos/7414289/pexels-photo-7414289.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop';
                      }}
                    />
                  </div>
                </div>
                
                {/* Floating Badge */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-white px-6 py-2 rounded-full shadow-lg border border-gray-200">
                    <span className="text-sm font-semibold text-gray-800">See HomeTogether in Action</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Everything You Need to Win
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Powerful tools designed specifically for real estate professionals who want to deliver exceptional client experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Loved by Real Estate Pros
            </h2>
            <p className="text-xl text-gray-600">
              See what agents and clients are saying about HomeTogether
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl border border-blue-100">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 italic mb-6 leading-relaxed">"{testimonial.text}"</p>
                <div>
                  <p className="font-bold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                  {testimonial.company && (
                    <p className="text-sm text-blue-600 font-medium">{testimonial.company}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Start free, then choose the plan that grows with your business. No hidden fees, cancel anytime.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {pricingPlans.map((plan, index) => (
              <div key={index} className={`bg-white rounded-2xl shadow-xl border-2 p-8 relative ${
                plan.popular ? 'border-blue-500 scale-105' : 'border-gray-200'
              }`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-bold flex items-center">
                      <Crown className="w-4 h-4 mr-2" />
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                  <div className="mb-6">
                    <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                    {plan.period && <span className="text-gray-600 ml-2">/{plan.period}</span>}
                  </div>
                  <button 
                    onClick={() => plan.buttonText === 'Contact Sales' ? navigate('/contact') : navigate('/login', { state: { activeTab: 'register' } })}
                    className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${plan.buttonStyle}`}
                  >
                    {plan.buttonText}
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">What's included:</h4>
                    <ul className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {plan.limitations.length > 0 && (
                    <div className="pt-4 border-t border-gray-200">
                      <h4 className="font-semibold text-gray-900 mb-3">Limitations:</h4>
                      <ul className="space-y-2">
                        {plan.limitations.map((limitation, limitIndex) => (
                          <li key={limitIndex} className="flex items-start">
                            <X className="w-4 h-4 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-600 text-sm">{limitation}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Pricing FAQ */}
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              <strong>Questions about pricing?</strong> We're here to help.
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-600">
              <div className="flex items-center">
                <Check className="w-4 h-4 text-green-500 mr-2" />
                No setup fees
              </div>
              <div className="flex items-center">
                <Check className="w-4 h-4 text-green-500 mr-2" />
                Cancel anytime
              </div>
              <div className="flex items-center">
                <Check className="w-4 h-4 text-green-500 mr-2" />
                14-day free trial
              </div>
              <div className="flex items-center">
                <Check className="w-4 h-4 text-green-500 mr-2" />
                30-day money back guarantee
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Real Estate Business?
          </h2>
          <p className="text-xl text-blue-100 mb-10 leading-relaxed">
            Join thousands of successful agents who've already discovered the power of real-time collaboration. 
            Start your free dashboard today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/login', { state: { activeTab: 'register' } })}
              className="bg-white text-blue-600 px-8 py-4 rounded-xl hover:bg-gray-50 transition-all duration-200 font-semibold text-lg flex items-center justify-center group"
            >
              Start Your Free Dashboard
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
              onClick={() => setShowVideoModal(true)}
          <p className="text-blue-100 text-sm mt-6">
            No credit card required • Setup in under 2 minutes • 14-day free trial
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="flex items-center">
                  <img src="/logo.png" alt="HomeTogether" className="w-19 h-16 object-contain" onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.nextElementSibling?.classList.remove('hidden');
                  }} />
                  <Home className="w-10 h-10 text-gray-700 hidden" />
                </div>
                <span className="text-2xl font-bold">HomeTogether</span>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                The collaborative real estate platform that helps agents deliver exceptional client experiences 
                and close more deals.
              </p>
              <div className="text-gray-400 text-sm">
                <p>&copy; 2025 HomeTogether. All rights reserved.</p>
                <p className="mt-2">Built for real estate professionals, by real estate professionals.</p>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => scrollToSection('how-it-works')} className="hover:text-white transition-colors">How It Works</button></li>
                <li><button onClick={() => scrollToSection('features')} className="hover:text-white transition-colors">Features</button></li>
                <li><button onClick={() => scrollToSection('pricing')} className="hover:text-white transition-colors">Pricing</button></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => navigate('/contact')} className="hover:text-white transition-colors">Contact Us</button></li>
                <li><button onClick={() => navigate('/contact')} className="hover:text-white transition-colors">Help Center</button></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

      {/* Video Modal */}
      {showVideoModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setShowVideoModal(false)}
        >
          <div 
            className="relative w-full max-w-4xl mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowVideoModal(false)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X size={32} />
            </button>
            
            {/* Video Container */}
            <div className="bg-black rounded-lg overflow-hidden shadow-2xl">
              <video
                src="/demo-video.mp4"
                controls
                autoPlay
                className="w-full aspect-video"
                onError={(e) => {
                  console.error('Video failed to load:', e);
                  alert('Sorry, the demo video could not be loaded. Please try again later.');
                  setShowVideoModal(false);
                }}
              >
                Your browser does not support the video tag.
              </video>
            </div>
            
            {/* Video Title */}
            <div className="text-center mt-4">
              <h3 className="text-white text-xl font-semibold">HomeTogether Demo</h3>
              <p className="text-gray-300 text-sm mt-1">See how real estate collaboration works</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;