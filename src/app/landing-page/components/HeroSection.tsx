'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

interface HeroSectionProps {
  className?: string;
}

interface CounterData {
  activeUsers: number;
  hoursSavedToday: number;
  averageROI: number;
}

const HeroSection = ({ className = '' }: HeroSectionProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [counters, setCounters] = useState<CounterData>({
    activeUsers: 0,
    hoursSavedToday: 0,
    averageROI: 0
  });

  const headlines = [
  "Save 20+ Hours Weekly with 10-Minute Setup",
  "Enterprise Automation Made Simple"];


  const [currentHeadline, setCurrentHeadline] = useState(0);

  useEffect(() => {
    setIsHydrated(true);

    // Animate counters
    const targetCounters = {
      activeUsers: 10247,
      hoursSavedToday: 1834,
      averageROI: 312
    };

    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;

      setCounters({
        activeUsers: Math.floor(targetCounters.activeUsers * progress),
        hoursSavedToday: Math.floor(targetCounters.hoursSavedToday * progress),
        averageROI: Math.floor(targetCounters.averageROI * progress)
      });

      if (step >= steps) {
        clearInterval(timer);
        setCounters(targetCounters);
      }
    }, stepDuration);

    // Headline rotation
    const headlineTimer = setInterval(() => {
      setCurrentHeadline((prev) => (prev + 1) % headlines.length);
    }, 4000);

    return () => {
      clearInterval(timer);
      clearInterval(headlineTimer);
    };
  }, []);

  if (!isHydrated) {
    return (
      <section className={`relative min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center ${className}`}>
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="h-16 bg-slate-200 rounded animate-pulse"></div>
              <div className="h-6 bg-slate-200 rounded animate-pulse"></div>
              <div className="flex gap-4">
                <div className="h-12 w-40 bg-slate-200 rounded animate-pulse"></div>
                <div className="h-12 w-40 bg-slate-200 rounded animate-pulse"></div>
              </div>
            </div>
            <div className="h-96 bg-slate-200 rounded animate-pulse"></div>
          </div>
        </div>
      </section>);

  }

  return (
    <section id="hero" className={`relative min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center ${className}`}>
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            {/* Dynamic Headlines */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
                <span className="block transition-all duration-500">
                  {headlines[currentHeadline]}
                </span>
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed">
                Join 10,000+ businesses automating workflows without complexity. 
                Get enterprise-level automation with small business simplicity.
              </p>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-6 text-sm text-slate-500">
              <div className="flex items-center space-x-2">
                <Icon name="CheckCircleIcon" size={16} className="text-green-500" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="ClockIcon" size={16} className="text-blue-500" />
                <span>Setup in 10 minutes</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="#signup"
                className="bg-primary hover:bg-blue-900 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 hover-lift focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 text-center">

                Start Free Trial
              </Link>
              <button
                onClick={() => setShowVideo(true)}
                className="bg-white hover:bg-slate-50 text-slate-700 border-2 border-slate-200 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 hover-lift focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 flex items-center justify-center space-x-2">

                <Icon name="PlayIcon" size={20} />
                <span>Watch 2-Minute Demo</span>
              </button>
            </div>

            {/* Live Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {counters.activeUsers.toLocaleString()}+
                </div>
                <div className="text-sm text-slate-600">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">
                  {counters.hoursSavedToday.toLocaleString()}
                </div>
                <div className="text-sm text-slate-600">Hours Saved Today</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-success">
                  {counters.averageROI}%
                </div>
                <div className="text-sm text-slate-600">Average ROI</div>
              </div>
            </div>
          </div>

          {/* Right Column - Hero Image */}
          <div className="relative">
            <div className="relative z-10">
              <AppImage
                src="https://images.unsplash.com/photo-1735469157670-1212e570eadc"
                alt="Modern office workspace with multiple monitors showing business automation dashboard and analytics"
                className="rounded-2xl shadow-2xl w-full h-96 object-cover" />

            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-4 z-20">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-slate-700">Live Dashboard</span>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-4 z-20">
              <div className="text-center">
                <div className="text-lg font-bold text-primary">98.7%</div>
                <div className="text-xs text-slate-600">Uptime</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {showVideo &&
      <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-slate-900">Product Demo</h3>
              <button
              onClick={() => setShowVideo(false)}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors">

                <Icon name="XMarkIcon" size={24} />
              </button>
            </div>
            <div className="aspect-video bg-slate-900 rounded-lg flex items-center justify-center">
              <div className="text-center text-white">
                <Icon name="PlayIcon" size={64} className="mx-auto mb-4 opacity-50" />
                <p className="text-lg">Demo Video Placeholder</p>
                <p className="text-sm opacity-75">2-minute product walkthrough</p>
              </div>
            </div>
          </div>
        </div>
      }

      {/* Background Decoration */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-blue-100 rounded-full opacity-50 blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-24 h-24 bg-orange-100 rounded-full opacity-50 blur-2xl"></div>
    </section>);

};

export default HeroSection;