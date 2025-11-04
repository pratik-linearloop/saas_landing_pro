'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface PricingSectionProps {
  className?: string;
}

interface PricingTier {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  features: string[];
  highlighted: boolean;
  cta: string;
  badge?: string;
  maxUsers: number;
  maxWorkflows: number;
}

const PricingSection = ({ className = '' }: PricingSectionProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [teamSize, setTeamSize] = useState(10);
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 32,
    seconds: 45
  });

  const pricingTiers: PricingTier[] = [
    {
      id: 'starter',
      name: 'Starter',
      price: billingCycle === 'monthly' ? 29 : 290,
      originalPrice: billingCycle === 'monthly' ? 39 : 390,
      description: 'Perfect for small teams getting started with automation',
      features: [
        'Up to 5 team members',
        '10 automated workflows',
        'Basic integrations',
        'Email support',
        'Mobile app access',
        '1GB storage'
      ],
      highlighted: false,
      cta: 'Start Free Trial',
      maxUsers: 5,
      maxWorkflows: 10
    },
    {
      id: 'professional',
      name: 'Professional',
      price: billingCycle === 'monthly' ? 79 : 790,
      originalPrice: billingCycle === 'monthly' ? 99 : 990,
      description: 'Ideal for growing businesses with complex workflows',
      features: [
        'Up to 25 team members',
        'Unlimited workflows',
        'Advanced integrations',
        'Priority support',
        'Advanced analytics',
        '10GB storage',
        'Custom branding',
        'API access'
      ],
      highlighted: true,
      cta: 'Start Free Trial',
      badge: 'Most Popular',
      maxUsers: 25,
      maxWorkflows: -1
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: billingCycle === 'monthly' ? 199 : 1990,
      originalPrice: billingCycle === 'monthly' ? 249 : 2490,
      description: 'For large organizations with enterprise requirements',
      features: [
        'Unlimited team members',
        'Unlimited workflows',
        'All integrations',
        'Dedicated support',
        'Advanced security',
        'Unlimited storage',
        'White-label solution',
        'Custom development',
        'SLA guarantee'
      ],
      highlighted: false,
      cta: 'Contact Sales',
      maxUsers: -1,
      maxWorkflows: -1
    }
  ];

  useEffect(() => {
    setIsHydrated(true);
    
    // Countdown timer
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;
        
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
          if (minutes < 0) {
            minutes = 59;
            hours--;
            if (hours < 0) {
              hours = 23;
              days--;
              if (days < 0) {
                // Reset to 3 days when countdown ends
                return { days: 2, hours: 23, minutes: 59, seconds: 59 };
              }
            }
          }
        }
        
        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const calculatePrice = (basePrice: number) => {
    if (teamSize <= 5) return basePrice;
    if (teamSize <= 25) return Math.round(basePrice * 1.5);
    return Math.round(basePrice * 2.5);
  };

  const savings = billingCycle === 'yearly' ? '20%' : '0%';

  if (!isHydrated) {
    return (
      <section className={`py-20 bg-white ${className}`}>
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <div className="h-12 bg-slate-200 rounded animate-pulse mx-auto mb-4 max-w-md"></div>
            <div className="h-6 bg-slate-200 rounded animate-pulse mx-auto max-w-2xl"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-96 bg-slate-200 rounded animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="pricing" className={`py-20 bg-white ${className}`}>
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            Start with a 14-day free trial. No credit card required. 
            Cancel anytime with full money-back guarantee.
          </p>

          {/* Limited Time Offer Banner */}
          <div className="bg-gradient-to-r from-accent to-orange-700 text-white p-4 rounded-lg mb-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-center space-x-4">
              <Icon name="FireIcon" size={24} className="text-orange-200" />
              <div className="text-center">
                <div className="font-semibold">Limited Time: 25% Off First Year!</div>
                <div className="text-sm opacity-90">Offer expires in:</div>
              </div>
            </div>
            <div className="flex justify-center space-x-4 mt-2">
              <div className="text-center">
                <div className="text-lg font-bold">{timeLeft.days}</div>
                <div className="text-xs">Days</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold">{timeLeft.hours}</div>
                <div className="text-xs">Hours</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold">{timeLeft.minutes}</div>
                <div className="text-xs">Min</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold">{timeLeft.seconds}</div>
                <div className="text-xs">Sec</div>
              </div>
            </div>
          </div>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4">
            <span className={`text-sm ${billingCycle === 'monthly' ? 'text-slate-900 font-semibold' : 'text-slate-500'}`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
              className={`relative w-14 h-7 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                billingCycle === 'yearly' ? 'bg-primary' : 'bg-slate-300'
              }`}
            >
              <div className={`absolute w-5 h-5 bg-white rounded-full top-1 transition-transform duration-200 ${
                billingCycle === 'yearly' ? 'translate-x-8' : 'translate-x-1'
              }`} />
            </button>
            <span className={`text-sm ${billingCycle === 'yearly' ? 'text-slate-900 font-semibold' : 'text-slate-500'}`}>
              Yearly
            </span>
            {billingCycle === 'yearly' && (
              <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full">
                Save 20%
              </span>
            )}
          </div>
        </div>

        {/* Team Size Calculator */}
        <div className="bg-slate-50 rounded-2xl p-8 mb-12">
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              Calculate Your Custom Pricing
            </h3>
            <p className="text-slate-600">Adjust team size to see personalized pricing</p>
          </div>
          
          <div className="max-w-md mx-auto">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Team Size: {teamSize} {teamSize === 1 ? 'member' : 'members'}
            </label>
            <input
              type="range"
              min="1"
              max="100"
              value={teamSize}
              onChange={(e) => setTeamSize(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-sm text-slate-500 mt-1">
              <span>1</span>
              <span>50</span>
              <span>100+</span>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {pricingTiers.map((tier) => (
            <div
              key={tier.id}
              className={`relative rounded-2xl p-8 transition-all duration-300 hover:shadow-xl ${
                tier.highlighted
                  ? 'bg-primary text-white shadow-2xl transform scale-105 border-2 border-primary'
                  : 'bg-white border-2 border-slate-200 hover:border-slate-300'
              }`}
            >
              {/* Badge */}
              {tier.badge && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-accent text-white px-4 py-2 rounded-full text-sm font-semibold">
                    {tier.badge}
                  </span>
                </div>
              )}

              {/* Header */}
              <div className="text-center mb-8">
                <h3 className={`text-2xl font-bold mb-2 ${
                  tier.highlighted ? 'text-white' : 'text-slate-900'
                }`}>
                  {tier.name}
                </h3>
                <p className={`text-sm ${
                  tier.highlighted ? 'text-blue-100' : 'text-slate-600'
                }`}>
                  {tier.description}
                </p>
              </div>

              {/* Pricing */}
              <div className="text-center mb-8">
                <div className="flex items-baseline justify-center space-x-2">
                  {tier.originalPrice && (
                    <span className={`text-lg line-through ${
                      tier.highlighted ? 'text-blue-200' : 'text-slate-400'
                    }`}>
                      ${tier.originalPrice}
                    </span>
                  )}
                  <span className={`text-4xl font-bold ${
                    tier.highlighted ? 'text-white' : 'text-slate-900'
                  }`}>
                    ${calculatePrice(tier.price)}
                  </span>
                  <span className={`text-sm ${
                    tier.highlighted ? 'text-blue-100' : 'text-slate-600'
                  }`}>
                    /{billingCycle === 'monthly' ? 'month' : 'year'}
                  </span>
                </div>
                {billingCycle === 'yearly' && (
                  <div className={`text-sm mt-2 ${
                    tier.highlighted ? 'text-blue-100' : 'text-green-600'
                  }`}>
                    Save ${Math.round(calculatePrice(tier.price) * 12 * 0.2)} annually
                  </div>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {tier.features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <Icon 
                      name="CheckIcon" 
                      size={16} 
                      className={`mt-1 flex-shrink-0 ${
                        tier.highlighted ? 'text-blue-200' : 'text-green-500'
                      }`} 
                    />
                    <span className={`text-sm ${
                      tier.highlighted ? 'text-blue-50' : 'text-slate-600'
                    }`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button className={`w-full py-4 px-6 rounded-lg font-semibold transition-all duration-200 hover-lift focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                tier.highlighted
                  ? 'bg-white text-primary hover:bg-slate-50 focus:ring-white' :'bg-primary text-white hover:bg-blue-900 focus:ring-primary'
              }`}>
                {tier.cta}
              </button>

              {/* Trial Info */}
              <div className={`text-center mt-4 text-xs ${
                tier.highlighted ? 'text-blue-100' : 'text-slate-500'
              }`}>
                14-day free trial • No credit card required
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="bg-slate-50 rounded-2xl p-8">
          <h3 className="text-2xl font-semibold text-slate-900 text-center mb-8">
            Frequently Asked Questions
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">
                  Can I change plans anytime?
                </h4>
                <p className="text-slate-600 text-sm">
                  Yes! You can upgrade, downgrade, or cancel your plan at any time. 
                  Changes take effect immediately with prorated billing.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">
                  What's included in the free trial?
                </h4>
                <p className="text-slate-600 text-sm">
                  Full access to Professional plan features for 14 days. 
                  No credit card required, no setup fees.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">
                  Do you offer refunds?
                </h4>
                <p className="text-slate-600 text-sm">
                  Yes, we offer a 30-day money-back guarantee. 
                  If you're not satisfied, we'll refund your payment in full.
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">
                  Is there a setup fee?
                </h4>
                <p className="text-slate-600 text-sm">
                  No setup fees, no hidden costs. The price you see is what you pay. 
                  All features are included in your plan.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">
                  How secure is my data?
                </h4>
                <p className="text-slate-600 text-sm">
                  Enterprise-grade security with SOC 2 compliance, SSL encryption, 
                  and regular security audits. Your data is safe with us.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">
                  Need a custom plan?
                </h4>
                <p className="text-slate-600 text-sm">
                  Contact our sales team for custom enterprise solutions, 
                  volume discounts, and specialized requirements.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-semibold text-slate-900 mb-4">
            Ready to Transform Your Business?
          </h3>
          <p className="text-slate-600 mb-8">
            Join thousands of businesses already saving time and money with automation.
          </p>
          <button className="bg-primary hover:bg-blue-900 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 hover-lift focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
            Start Your Free Trial Today
          </button>
          <p className="text-sm text-slate-500 mt-4">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;