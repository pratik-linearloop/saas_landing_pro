'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

interface SocialProofSectionProps {
  className?: string;
}

interface Testimonial {
  id: string;
  name: string;
  title: string;
  company: string;
  content: string;
  rating: number;
  metrics: {
    timeSaved: string;
    costReduction: string;
    roi: string;
  };
  avatar: string;
  hasVideo: boolean;
  linkedinVerified: boolean;
}

interface CompanyLogo {
  name: string;
  logo: string;
  useCase: string;
  industry: string;
}

const SocialProofSection = ({ className = '' }: SocialProofSectionProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [hoveredLogo, setHoveredLogo] = useState<string | null>(null);

  const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    title: 'Operations Manager',
    company: 'TechFlow Inc.',
    content: 'This platform transformed our entire workflow. We went from spending 30 hours a week on manual processes to just 3 hours. The ROI was immediate and the team loves how simple it is to use.',
    rating: 5,
    metrics: {
      timeSaved: '27 hours/week',
      costReduction: '45%',
      roi: '320%'
    },
    avatar: "https://images.unsplash.com/photo-1648134859175-78b41b4db186",
    hasVideo: true,
    linkedinVerified: true
  },
  {
    id: '2',
    name: 'Marcus Rodriguez',
    title: 'CEO',
    company: 'GrowthLab',
    content: 'The implementation was incredibly smooth. Within 10 minutes, we had our first automated workflow running. Six months later, we\'ve saved over $50,000 in operational costs.',
    rating: 5,
    metrics: {
      timeSaved: '22 hours/week',
      costReduction: '38%',
      roi: '285%'
    },
    avatar: "https://images.unsplash.com/photo-1648134859211-4a1b57575f4e",
    hasVideo: false,
    linkedinVerified: true
  },
  {
    id: '3',
    name: 'Emily Watson',
    title: 'Department Head',
    company: 'Innovate Solutions',
    content: 'What impressed me most was how quickly our team adopted the platform. No training needed - it\'s that intuitive. Our productivity has increased by 300% and errors have virtually disappeared.',
    rating: 5,
    metrics: {
      timeSaved: '35 hours/week',
      costReduction: '52%',
      roi: '410%'
    },
    avatar: "https://images.unsplash.com/photo-1637324498252-fc85386a6090",
    hasVideo: true,
    linkedinVerified: true
  }];


  const companyLogos: CompanyLogo[] = [
  { name: 'TechFlow Inc.', logo: 'https://via.placeholder.com/120x60/3B82F6/FFFFFF?text=TechFlow', useCase: 'Automated customer onboarding workflows', industry: 'Technology' },
  { name: 'GrowthLab', logo: 'https://via.placeholder.com/120x60/10B981/FFFFFF?text=GrowthLab', useCase: 'Streamlined project management processes', industry: 'Consulting' },
  { name: 'Innovate Solutions', logo: 'https://via.placeholder.com/120x60/F59E0B/FFFFFF?text=Innovate', useCase: 'Automated reporting and analytics', industry: 'Software' },
  { name: 'DataCorp', logo: 'https://via.placeholder.com/120x60/8B5CF6/FFFFFF?text=DataCorp', useCase: 'Compliance and audit automation', industry: 'Finance' },
  { name: 'CloudTech', logo: 'https://via.placeholder.com/120x60/EF4444/FFFFFF?text=CloudTech', useCase: 'Infrastructure monitoring workflows', industry: 'Cloud Services' },
  { name: 'StartupX', logo: 'https://via.placeholder.com/120x60/06B6D4/FFFFFF?text=StartupX', useCase: 'Sales pipeline automation', industry: 'Startup' }];


  const securityBadges = [
  { name: 'SOC 2 Type II', icon: 'ShieldCheckIcon', description: 'Security & Availability' },
  { name: 'GDPR Compliant', icon: 'LockClosedIcon', description: 'Data Protection' },
  { name: 'SSL Encrypted', icon: 'KeyIcon', description: 'Data in Transit' },
  { name: 'ISO 27001', icon: 'DocumentCheckIcon', description: 'Information Security' }];


  useEffect(() => {
    setIsHydrated(true);

    // Auto-rotate testimonials
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  if (!isHydrated) {
    return (
      <section className={`py-20 bg-slate-50 ${className}`}>
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <div className="h-12 bg-slate-200 rounded animate-pulse mx-auto mb-4 max-w-md"></div>
            <div className="h-6 bg-slate-200 rounded animate-pulse mx-auto max-w-2xl"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="h-64 bg-slate-200 rounded animate-pulse"></div>
            <div className="h-64 bg-slate-200 rounded animate-pulse"></div>
          </div>
        </div>
      </section>);

  }

  const currentTestimonial = testimonials[activeTestimonial];

  return (
    <section id="testimonials" className={`py-20 bg-slate-50 ${className}`}>
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            Trusted by 10,000+ Businesses Worldwide
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            See how companies like yours are transforming their operations and achieving 
            remarkable results with our automation platform.
          </p>
        </div>

        {/* Featured Testimonial */}
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg mb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Testimonial Content */}
            <div className="space-y-6">
              {/* Rating */}
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) =>
                <Icon key={i} name="StarIcon" size={20} className="text-yellow-400 fill-current" />
                )}
                <span className="ml-2 text-sm text-slate-600">5.0 out of 5</span>
              </div>

              {/* Quote */}
              <blockquote className="text-xl text-slate-700 leading-relaxed">
                "{currentTestimonial.content}"
              </blockquote>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-4 py-6 border-t border-b border-slate-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{currentTestimonial.metrics.timeSaved}</div>
                  <div className="text-sm text-slate-600">Time Saved</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{currentTestimonial.metrics.costReduction}</div>
                  <div className="text-sm text-slate-600">Cost Reduction</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">{currentTestimonial.metrics.roi}</div>
                  <div className="text-sm text-slate-600">ROI Increase</div>
                </div>
              </div>

              {/* Author */}
              <div className="flex items-center space-x-4">
                <AppImage
                  src={currentTestimonial.avatar}
                  alt={`Professional headshot of ${currentTestimonial.name}, ${currentTestimonial.title} at ${currentTestimonial.company}`}
                  className="w-16 h-16 rounded-full object-cover" />

                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="font-semibold text-slate-900">{currentTestimonial.name}</h4>
                    {currentTestimonial.linkedinVerified &&
                    <Icon name="CheckBadgeIcon" size={16} className="text-blue-500" />
                    }
                  </div>
                  <p className="text-slate-600">{currentTestimonial.title}</p>
                  <p className="text-sm text-slate-500">{currentTestimonial.company}</p>
                </div>
                {currentTestimonial.hasVideo &&
                <button
                  onClick={() => setShowVideoModal(true)}
                  className="ml-auto p-3 bg-primary hover:bg-blue-900 text-white rounded-full transition-all duration-200 hover-lift focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">

                    <Icon name="PlayIcon" size={20} />
                  </button>
                }
              </div>
            </div>

            {/* Right - Testimonial Navigation */}
            <div className="space-y-4">
              {testimonials.map((testimonial, index) =>
              <button
                key={testimonial.id}
                onClick={() => setActiveTestimonial(index)}
                className={`w-full p-4 rounded-lg border-2 text-left transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                index === activeTestimonial ?
                'border-primary bg-blue-50' : 'border-slate-200 bg-white hover:border-slate-300'}`
                }>

                  <div className="flex items-center space-x-3">
                    <AppImage
                    src={testimonial.avatar}
                    alt={`Professional headshot of ${testimonial.name}`}
                    className="w-10 h-10 rounded-full object-cover" />

                    <div className="flex-1">
                      <div className="font-medium text-slate-900">{testimonial.name}</div>
                      <div className="text-sm text-slate-600">{testimonial.company}</div>
                    </div>
                    {testimonial.hasVideo &&
                  <Icon name="PlayCircleIcon" size={20} className="text-slate-400" />
                  }
                  </div>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Company Logos */}
        <div className="mb-16">
          <h3 className="text-center text-lg font-semibold text-slate-900 mb-8">
            Trusted by leading companies across industries
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {companyLogos.map((company, index) =>
            <div
              key={index}
              className="relative group cursor-pointer"
              onMouseEnter={() => setHoveredLogo(company.name)}
              onMouseLeave={() => setHoveredLogo(null)}>

                <div className="bg-white p-4 rounded-lg border border-slate-200 hover:border-slate-300 transition-all duration-200 hover:shadow-md">
                  <AppImage
                  src={company.logo}
                  alt={`${company.name} company logo`}
                  className="w-full h-12 object-contain opacity-60 hover:opacity-100 transition-opacity duration-200" />

                </div>
                
                {/* Hover Tooltip */}
                {hoveredLogo === company.name &&
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 p-3 bg-slate-900 text-white text-sm rounded-lg shadow-lg z-10 whitespace-nowrap">
                    <div className="font-medium">{company.useCase}</div>
                    <div className="text-slate-300 text-xs">{company.industry}</div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900"></div>
                  </div>
              }
              </div>
            )}
          </div>
        </div>

        {/* Security & Trust Badges */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-center text-xl font-semibold text-slate-900 mb-8">
            Enterprise-Grade Security & Compliance
          </h3>
          <div className="grid md:grid-cols-4 gap-6">
            {securityBadges.map((badge, index) =>
            <div key={index} className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name={badge.icon as any} size={32} className="text-green-600" />
                </div>
                <h4 className="font-semibold text-slate-900 mb-2">{badge.name}</h4>
                <p className="text-sm text-slate-600">{badge.description}</p>
              </div>
            )}
          </div>
        </div>

        {/* Video Modal */}
        {showVideoModal &&
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-hidden">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-slate-900">Customer Success Story</h3>
                <button
                onClick={() => setShowVideoModal(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors">

                  <Icon name="XMarkIcon" size={24} />
                </button>
              </div>
              <div className="aspect-video bg-slate-900 rounded-lg flex items-center justify-center">
                <div className="text-center text-white">
                  <Icon name="PlayIcon" size={64} className="mx-auto mb-4 opacity-50" />
                  <p className="text-lg">Customer Testimonial Video</p>
                  <p className="text-sm opacity-75">{currentTestimonial.name} - {currentTestimonial.company}</p>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </section>);

};

export default SocialProofSection;