'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface BenefitsSectionProps {
  className?: string;
}

interface Benefit {
  id: string;
  title: string;
  description: string;
  icon: string;
  metrics: {
    primary: string;
    secondary: string;
    improvement: string;
  };
  demo: {
    type: 'calculator' | 'timer' | 'preview';
    data: any;
  };
}

const BenefitsSection = ({ className = '' }: BenefitsSectionProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [activeBenefit, setActiveBenefit] = useState('productivity');
  const [calculatorValues, setCalculatorValues] = useState({
    employees: 10,
    hourlyRate: 25,
    hoursPerWeek: 20
  });

  const benefits: Benefit[] = [
    {
      id: 'productivity',
      title: 'Massive Productivity Gains',
      description: 'Eliminate repetitive tasks and focus on what matters most to your business growth.',
      icon: 'RocketLaunchIcon',
      metrics: {
        primary: '20+ Hours',
        secondary: 'Saved Weekly',
        improvement: '300% Faster'
      },
      demo: {
        type: 'calculator',
        data: {
          baseHours: 20,
          savedPercentage: 85
        }
      }
    },
    {
      id: 'cost-reduction',
      title: 'Significant Cost Reduction',
      description: 'Reduce operational costs while improving accuracy and reducing human errors.',
      icon: 'CurrencyDollarIcon',
      metrics: {
        primary: '$2,400',
        secondary: 'Monthly Savings',
        improvement: '40% Cost Cut'
      },
      demo: {
        type: 'calculator',
        data: {
          monthlySavings: 2400,
          yearlyROI: 312
        }
      }
    },
    {
      id: 'implementation',
      title: 'Lightning-Fast Implementation',
      description: 'Get up and running in minutes, not months. No technical expertise required.',
      icon: 'BoltIcon',
      metrics: {
        primary: '10 Minutes',
        secondary: 'Setup Time',
        improvement: '95% Faster'
      },
      demo: {
        type: 'preview',
        data: {
          steps: ['Connect', 'Configure', 'Activate', 'Automate']
        }
      }
    }
  ];

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const calculateSavings = () => {
    const { employees, hourlyRate, hoursPerWeek } = calculatorValues;
    const weeklySavings = employees * hourlyRate * (hoursPerWeek * 0.85);
    const monthlySavings = weeklySavings * 4.33;
    const yearlySavings = monthlySavings * 12;
    
    return {
      weekly: Math.round(weeklySavings),
      monthly: Math.round(monthlySavings),
      yearly: Math.round(yearlySavings)
    };
  };

  const activeBenefitData = benefits.find(b => b.id === activeBenefit) || benefits[0];
  const savings = calculateSavings();

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
              <div key={i} className="h-64 bg-slate-200 rounded animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="benefits" className={`py-20 bg-white ${className}`}>
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            Transform Your Business Operations
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Join thousands of businesses already experiencing dramatic improvements in 
            productivity, cost savings, and operational efficiency.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit) => (
            <div
              key={benefit.id}
              className={`group cursor-pointer transition-all duration-300 ${
                activeBenefit === benefit.id ? 'transform -translate-y-2' : ''
              }`}
              onClick={() => setActiveBenefit(benefit.id)}
            >
              <div className={`p-8 rounded-2xl border-2 transition-all duration-300 hover:shadow-xl ${
                activeBenefit === benefit.id
                  ? 'border-primary bg-blue-50 shadow-lg'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}>
                {/* Icon */}
                <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 ${
                  activeBenefit === benefit.id
                    ? 'bg-primary text-white' :'bg-slate-100 text-slate-600 group-hover:bg-slate-200'
                }`}>
                  <Icon name={benefit.icon as any} size={32} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-slate-900 mb-4">
                  {benefit.title}
                </h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  {benefit.description}
                </p>

                {/* Metrics */}
                <div className="space-y-2">
                  <div className="flex items-baseline space-x-2">
                    <span className={`text-2xl font-bold ${
                      activeBenefit === benefit.id ? 'text-primary' : 'text-slate-900'
                    }`}>
                      {benefit.metrics.primary}
                    </span>
                    <span className="text-slate-600 text-sm">{benefit.metrics.secondary}</span>
                  </div>
                  <div className={`text-sm font-medium ${
                    activeBenefit === benefit.id ? 'text-green-600' : 'text-slate-500'
                  }`}>
                    {benefit.metrics.improvement}
                  </div>
                </div>

                {/* Hover Indicator */}
                <div className={`mt-6 flex items-center space-x-2 text-sm transition-all duration-300 ${
                  activeBenefit === benefit.id
                    ? 'text-primary opacity-100' :'text-slate-400 opacity-0 group-hover:opacity-100'
                }`}>
                  <span>Explore interactive demo</span>
                  <Icon name="ArrowRightIcon" size={16} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Demo Section */}
        <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-8 md:p-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Benefit Details */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-primary rounded-xl">
                  <Icon name={activeBenefitData.icon as any} size={32} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">{activeBenefitData.title}</h3>
              </div>

              <p className="text-lg text-slate-700 leading-relaxed">
                {activeBenefitData.description}
              </p>

              {/* Customer Quote */}
              <div className="bg-white p-6 rounded-xl border border-slate-200">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center">
                    <Icon name="UserIcon" size={24} className="text-slate-500" />
                  </div>
                  <div>
                    <blockquote className="text-slate-700 italic mb-2">
                      "This solution saved us over 25 hours per week and reduced our operational costs by 45%. 
                      The ROI was immediate and the implementation was surprisingly simple."
                    </blockquote>
                    <div className="text-sm">
                      <div className="font-semibold text-slate-900">Sarah Chen</div>
                      <div className="text-slate-600">Operations Manager, TechFlow Inc.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Interactive Calculator */}
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h4 className="text-xl font-semibold text-slate-900 mb-6">
                Calculate Your Savings
              </h4>

              <div className="space-y-6">
                {/* Input Controls */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Number of Employees
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="100"
                      value={calculatorValues.employees}
                      onChange={(e) => setCalculatorValues(prev => ({
                        ...prev,
                        employees: parseInt(e.target.value)
                      }))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-sm text-slate-500 mt-1">
                      <span>1</span>
                      <span className="font-semibold text-primary">{calculatorValues.employees}</span>
                      <span>100</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Average Hourly Rate ($)
                    </label>
                    <input
                      type="range"
                      min="15"
                      max="100"
                      value={calculatorValues.hourlyRate}
                      onChange={(e) => setCalculatorValues(prev => ({
                        ...prev,
                        hourlyRate: parseInt(e.target.value)
                      }))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-sm text-slate-500 mt-1">
                      <span>$15</span>
                      <span className="font-semibold text-primary">${calculatorValues.hourlyRate}</span>
                      <span>$100</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Manual Hours per Week
                    </label>
                    <input
                      type="range"
                      min="5"
                      max="40"
                      value={calculatorValues.hoursPerWeek}
                      onChange={(e) => setCalculatorValues(prev => ({
                        ...prev,
                        hoursPerWeek: parseInt(e.target.value)
                      }))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-sm text-slate-500 mt-1">
                      <span>5h</span>
                      <span className="font-semibold text-primary">{calculatorValues.hoursPerWeek}h</span>
                      <span>40h</span>
                    </div>
                  </div>
                </div>

                {/* Results */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg">
                  <h5 className="font-semibold text-slate-900 mb-4">Your Potential Savings:</h5>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-lg font-bold text-green-600">${savings.weekly.toLocaleString()}</div>
                      <div className="text-xs text-slate-600">Weekly</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-green-600">${savings.monthly.toLocaleString()}</div>
                      <div className="text-xs text-slate-600">Monthly</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-green-600">${savings.yearly.toLocaleString()}</div>
                      <div className="text-xs text-slate-600">Yearly</div>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <button className="w-full bg-primary hover:bg-blue-900 text-white py-3 rounded-lg font-semibold transition-all duration-200 hover-lift focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                  Start Saving Today
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;