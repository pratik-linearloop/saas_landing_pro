'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/common/Header';
import HeroSection from './HeroSection';
import ProblemSection from './ProblemSection';
import SolutionSection from './SolutionSection';
import BenefitsSection from './BenefitsSection';
import SocialProofSection from './SocialProofSection';
import PricingSection from './PricingSection';

interface LandingPageInteractiveProps {
  className?: string;
}

const LandingPageInteractive = ({ className = '' }: LandingPageInteractiveProps) => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-white">
        <div className="animate-pulse">
          <div className="h-16 bg-slate-200"></div>
          <div className="h-screen bg-slate-100"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-white ${className}`}>
      <Header />
      
      <main id="main-content" className="relative">
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <BenefitsSection />
        <SocialProofSection />
        <PricingSection />
      </main>
    </div>
  );
};

export default LandingPageInteractive;