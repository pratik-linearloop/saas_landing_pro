'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';


interface SolutionSectionProps {
  className?: string;
}

interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  icon: string;
  automated: boolean;
}

const SolutionSection = ({ className = '' }: SolutionSectionProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [activeDemo, setActiveDemo] = useState('workflow');
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  const workflowSteps: WorkflowStep[] = [
    {
      id: 'data-collection',
      title: 'Data Collection',
      description: 'Automatically gather data from multiple sources',
      icon: 'DocumentArrowDownIcon',
      automated: true
    },
    {
      id: 'processing',
      title: 'Processing',
      description: 'Smart algorithms process and validate information',
      icon: 'CogIcon',
      automated: true
    },
    {
      id: 'approval',
      title: 'Approval',
      description: 'Automated routing to appropriate stakeholders',
      icon: 'CheckCircleIcon',
      automated: true
    },
    {
      id: 'notification',
      title: 'Notification',
      description: 'Real-time updates to all relevant team members',
      icon: 'BellIcon',
      automated: true
    }
  ];

  const sampleData = [
    { name: 'Customer Order', type: 'order', status: 'pending' },
    { name: 'Invoice Request', type: 'finance', status: 'processing' },
    { name: 'Support Ticket', type: 'support', status: 'resolved' }
  ];

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleDragStart = (itemId: string) => {
    setDraggedItem(itemId);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  if (!isHydrated) {
    return (
      <section className={`py-20 bg-gradient-to-br from-blue-50 to-slate-50 ${className}`}>
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <div className="h-12 bg-slate-200 rounded animate-pulse mx-auto mb-4 max-w-md"></div>
            <div className="h-6 bg-slate-200 rounded animate-pulse mx-auto max-w-2xl"></div>
          </div>
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="h-96 bg-slate-200 rounded animate-pulse"></div>
            <div className="h-96 bg-slate-200 rounded animate-pulse"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="solution" className={`py-20 bg-gradient-to-br from-blue-50 to-slate-50 ${className}`}>
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            Introducing Automated Workflow Magic
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Transform your chaotic manual processes into streamlined, automated workflows 
            that save time, reduce errors, and boost productivity.
          </p>
        </div>

        {/* Split-Screen Comparison */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Left - Manual Workflow (Chaotic) */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-red-100 rounded-lg">
                <Icon name="ExclamationTriangleIcon" size={24} className="text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900">Before: Manual Chaos</h3>
            </div>

            <div className="space-y-4">
              {[
                { step: 'Receive email request', time: '5 min', issues: 'Easy to miss' },
                { step: 'Manual data entry', time: '20 min', issues: 'Error-prone' },
                { step: 'Find approver', time: '15 min', issues: 'Delays common' },
                { step: 'Wait for response', time: '2-3 days', issues: 'No visibility' },
                { step: 'Manual follow-up', time: '10 min', issues: 'Forgotten tasks' },
                { step: 'Update spreadsheet', time: '5 min', issues: 'Version conflicts' }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-red-200 rounded-full flex items-center justify-center">
                      <span className="text-red-700 text-xs font-semibold">{index + 1}</span>
                    </div>
                    <span className="text-slate-700">{item.step}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-red-600">{item.time}</div>
                    <div className="text-xs text-red-500">{item.issues}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-red-100 rounded-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-700">3+ Days</div>
                <div className="text-sm text-red-600">Average completion time</div>
              </div>
            </div>
          </div>

          {/* Right - Automated Workflow */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-green-200">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-green-100 rounded-lg">
                <Icon name="CheckCircleIcon" size={24} className="text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900">After: Automated Flow</h3>
            </div>

            <div className="space-y-4">
              {workflowSteps.map((step, index) => (
                <div key={step.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-green-200 rounded-full flex items-center justify-center">
                      <Icon name="CheckIcon" size={12} className="text-green-700" />
                    </div>
                    <div>
                      <div className="text-slate-700 font-medium">{step.title}</div>
                      <div className="text-xs text-slate-500">{step.description}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-green-600">Instant</div>
                    <div className="text-xs text-green-500">Automated</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-green-100 rounded-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-700">10 Minutes</div>
                <div className="text-sm text-green-600">Average completion time</div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Demo Builder */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold text-slate-900 mb-4">
              Try Our Drag & Drop Workflow Builder
            </h3>
            <p className="text-slate-600">
              See how easy it is to automate your processes with our visual workflow builder
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Sample Data */}
            <div className="space-y-4">
              <h4 className="font-semibold text-slate-900">Sample Data</h4>
              <div className="space-y-2">
                {sampleData.map((item, index) => (
                  <div
                    key={index}
                    draggable
                    onDragStart={() => handleDragStart(item.name)}
                    onDragEnd={handleDragEnd}
                    className={`p-3 bg-slate-100 rounded-lg border-2 border-dashed border-slate-300 cursor-move transition-all duration-200 hover:bg-slate-200 ${
                      draggedItem === item.name ? 'opacity-50' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Icon name="DocumentIcon" size={16} className="text-slate-500" />
                      <span className="text-sm font-medium text-slate-700">{item.name}</span>
                    </div>
                    <div className="text-xs text-slate-500 mt-1">Type: {item.type}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Workflow Builder */}
            <div className="space-y-4">
              <h4 className="font-semibold text-slate-900">Workflow Steps</h4>
              <div className="space-y-2">
                {workflowSteps.map((step, index) => (
                  <div key={step.id} className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center space-x-2">
                      <Icon name={step.icon as any} size={16} className="text-blue-600" />
                      <span className="text-sm font-medium text-slate-700">{step.title}</span>
                    </div>
                    <div className="text-xs text-slate-500 mt-1">{step.description}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Output */}
            <div className="space-y-4">
              <h4 className="font-semibold text-slate-900">Automated Output</h4>
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="CheckCircleIcon" size={16} className="text-green-600" />
                  <span className="text-sm font-medium text-green-700">Process Complete</span>
                </div>
                <div className="text-xs text-green-600 space-y-1">
                  <div>✓ Data validated automatically</div>
                  <div>✓ Approvals routed instantly</div>
                  <div>✓ Notifications sent to team</div>
                  <div>✓ Reports updated in real-time</div>
                </div>
              </div>
              
              <div className="text-center p-4 bg-slate-50 rounded-lg">
                <div className="text-lg font-bold text-primary">98.7%</div>
                <div className="text-xs text-slate-600">Accuracy Rate</div>
              </div>
            </div>
          </div>

          {/* Demo CTA */}
          <div className="text-center mt-8">
            <button className="bg-primary hover:bg-blue-900 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 hover-lift focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
              Build Your First Workflow
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;