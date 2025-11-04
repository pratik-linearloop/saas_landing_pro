'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface ProblemSectionProps {
  className?: string;
}

interface PainPoint {
  id: string;
  title: string;
  description: string;
  icon: string;
  stats: {
    timeWasted: string;
    costImpact: string;
    frustrationLevel: string;
  };
}

const ProblemSection = ({ className = '' }: ProblemSectionProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [selectedPainPoint, setSelectedPainPoint] = useState('manual-data');

  const painPoints: PainPoint[] = [
    {
      id: 'manual-data',
      title: 'Manual Data Entry',
      description: 'Spending hours copying data between systems, prone to errors and delays',
      icon: 'DocumentTextIcon',
      stats: {
        timeWasted: '15+ hours/week',
        costImpact: '$2,400/month',
        frustrationLevel: 'Extremely High'
      }
    },
    {
      id: 'process-delays',
      title: 'Process Delays',
      description: 'Waiting for approvals and manual handoffs that slow down operations',
      icon: 'ClockIcon',
      stats: {
        timeWasted: '8+ hours/week',
        costImpact: '$1,800/month',
        frustrationLevel: 'Very High'
      }
    },
    {
      id: 'team-coordination',
      title: 'Team Coordination',
      description: 'Miscommunication and lack of visibility across departments',
      icon: 'UsersIcon',
      stats: {
        timeWasted: '12+ hours/week',
        costImpact: '$2,100/month',
        frustrationLevel: 'High'
      }
    }
  ];

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const selectedPain = painPoints.find(p => p.id === selectedPainPoint) || painPoints[0];

  if (!isHydrated) {
    return (
      <section className={`py-20 bg-white ${className}`}>
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <div className="h-12 bg-slate-200 rounded animate-pulse mx-auto mb-4 max-w-md"></div>
            <div className="h-6 bg-slate-200 rounded animate-pulse mx-auto max-w-2xl"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-48 bg-slate-200 rounded animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="problems" className={`py-20 bg-white ${className}`}>
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            Stop Wasting Time on Manual Processes
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Business leaders like you are losing valuable time and money on inefficient workflows. 
            Which of these challenges sounds most familiar?
          </p>
        </div>

        {/* Interactive Pain Point Selector */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {painPoints.map((painPoint) => (
            <button
              key={painPoint.id}
              onClick={() => setSelectedPainPoint(painPoint.id)}
              className={`p-6 rounded-xl border-2 transition-all duration-300 text-left hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                selectedPainPoint === painPoint.id
                  ? 'border-primary bg-blue-50 shadow-lg'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className={`p-3 rounded-lg ${
                  selectedPainPoint === painPoint.id ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                  <Icon name={painPoint.icon as any} size={24} />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">{painPoint.title}</h3>
              </div>
              <p className="text-slate-600 text-sm">{painPoint.description}</p>
            </button>
          ))}
        </div>

        {/* Selected Pain Point Details */}
        <div className="bg-slate-50 rounded-2xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left - Problem Amplification */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-red-100 rounded-lg">
                  <Icon name={selectedPain.icon as any} size={32} className="text-red-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">{selectedPain.title}</h3>
              </div>
              
              <p className="text-lg text-slate-700 leading-relaxed">
                {selectedPain.description}
              </p>

              {/* Impact Statistics */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-slate-900">The Real Cost:</h4>
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex justify-between items-center p-4 bg-white rounded-lg border border-slate-200">
                    <span className="text-slate-600">Time Wasted Weekly:</span>
                    <span className="font-semibold text-red-600">{selectedPain.stats.timeWasted}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-white rounded-lg border border-slate-200">
                    <span className="text-slate-600">Monthly Cost Impact:</span>
                    <span className="font-semibold text-red-600">{selectedPain.stats.costImpact}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-white rounded-lg border border-slate-200">
                    <span className="text-slate-600">Team Frustration:</span>
                    <span className="font-semibold text-red-600">{selectedPain.stats.frustrationLevel}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Visual Representation */}
            <div className="relative">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h4 className="text-lg font-semibold text-slate-900 mb-4">Current Workflow</h4>
                <div className="space-y-3">
                  {[
                    'Manual data collection',
                    'Email back-and-forth',
                    'Spreadsheet updates',
                    'Manual approvals',
                    'Status checking',
                    'Error corrections'
                  ].map((step, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                        <span className="text-red-600 font-semibold text-sm">{index + 1}</span>
                      </div>
                      <span className="text-slate-700">{step}</span>
                      <Icon name="ExclamationTriangleIcon" size={16} className="text-red-500" />
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex items-center space-x-2">
                    <Icon name="ClockIcon" size={20} className="text-red-600" />
                    <span className="font-semibold text-red-800">Total Time: {selectedPain.stats.timeWasted}</span>
                  </div>
                </div>
              </div>

              {/* Frustration Indicators */}
              <div className="absolute -top-2 -right-2 bg-red-500 text-white p-2 rounded-full animate-pulse">
                <Icon name="ExclamationTriangleIcon" size={16} />
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-lg text-slate-600 mb-6">
            Sound familiar? You're not alone. Thousands of businesses face these same challenges daily.
          </p>
          <p className="text-xl font-semibold text-slate-900">
            But what if there was a better way?
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;