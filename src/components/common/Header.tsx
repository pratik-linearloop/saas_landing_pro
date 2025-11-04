'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';


interface HeaderProps {
  className?: string;
}

interface NavigationItem {
  label: string;
  path: string;
  anchor: string;
}

const Header = ({ className = '' }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);

  const navigation: NavigationItem[] = [
    {
      label: 'Features',
      path: '#features',
      anchor: 'features'
    },
    {
      label: 'Benefits',
      path: '#benefits',
      anchor: 'benefits'
    },
    {
      label: 'Pricing',
      path: '#pricing',
      anchor: 'pricing'
    },
    {
      label: 'Customers',
      path: '#testimonials',
      anchor: 'testimonials'
    },
    {
      label: 'Demo',
      path: '#demo',
      anchor: 'demo'
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);

      // Update active section based on scroll position
      const sections = ['hero', 'features', 'benefits', 'pricing', 'testimonials', 'demo'];
      const sectionOffsets = {
        hero: 0,
        features: 800,
        benefits: 1600,
        pricing: 2400,
        testimonials: 3200,
        demo: 4000
      };

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (scrollPosition >= sectionOffsets[section as keyof typeof sectionOffsets] - 100) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (anchor: string) => {
    setIsMobileMenuOpen(false);
    setActiveSection(anchor);
    
    const element = document.getElementById(anchor);
    if (element) {
      const headerHeight = window.innerWidth >= 768 ? 64 : 56;
      const elementPosition = element.offsetTop - headerHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    
    // Prevent body scroll when mobile menu is open
    if (!isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  };

  useEffect(() => {
    // Cleanup body scroll lock on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <>
      <a href="#main-content" className="skip-nav">
        Skip to main content
      </a>
      
      <header 
        className={`fixed top-0 left-0 right-0 z-navigation transition-all duration-300 ${
          isScrolled ? 'glass-nav border-b border-slate-200' : 'bg-white/95 backdrop-blur-sm'
        } ${className}`}
        style={{ height: 'var(--nav-height-desktop)' }}
      >
        <div className="flex items-center justify-between h-full px-6 md:px-8 lg:px-12">
          {/* Logo */}
          <Link 
            href="/"
            className="flex items-center flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg"
            onClick={() => handleNavClick('hero')}
          >
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="RocketLaunchIcon" size={20} className="text-white" />
              </div>
              <span className="text-xl font-bold text-foreground">SaaS Landing Pro</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center justify-center flex-1 mx-12">
            <div className="flex items-center space-x-8">
              {navigation.map((item) => (
                <button
                  key={item.anchor}
                  onClick={() => handleNavClick(item.anchor)}
                  className={`nav-item px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                    activeSection === item.anchor
                      ? 'bg-primary text-primary-foreground'
                      : 'text-slate-700 hover:bg-blue-50 hover:text-primary'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center flex-shrink-0">
            <Link
              href="#signup"
              className="nav-cta bg-accent hover:bg-orange-700 text-accent-foreground px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200 hover-lift focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
              onClick={() => handleNavClick('signup')}
            >
              Start Free Trial
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden mobile-menu-toggle p-2 rounded-md hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            <div className={`hamburger w-6 h-6 flex flex-col justify-around ${isMobileMenuOpen ? 'open' : ''}`}>
              <span className={`w-full h-0.5 bg-slate-700 transition-all duration-300 ${
                isMobileMenuOpen ? 'rotate-45 translate-y-2.5' : ''
              }`} />
              <span className={`w-full h-0.5 bg-slate-700 transition-all duration-300 ${
                isMobileMenuOpen ? 'opacity-0' : ''
              }`} />
              <span className={`w-full h-0.5 bg-slate-700 transition-all duration-300 ${
                isMobileMenuOpen ? '-rotate-45 -translate-y-2.5' : ''
              }`} />
            </div>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <nav 
          className={`md:hidden fixed top-14 left-0 w-full h-screen bg-white z-mobile-overlay transition-transform duration-300 overflow-y-auto ${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          style={{ top: 'var(--nav-height-mobile)' }}
        >
          <div className="flex flex-col p-6 space-y-4">
            {navigation.map((item) => (
              <button
                key={item.anchor}
                onClick={() => handleNavClick(item.anchor)}
                className={`nav-item w-full text-left px-4 py-4 text-base font-medium rounded-md border-b border-slate-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                  activeSection === item.anchor
                    ? 'bg-primary text-primary-foreground'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
                style={{ minHeight: 'var(--touch-target-min)' }}
              >
                {item.label}
              </button>
            ))}
            
            <div className="pt-4">
              <Link
                href="#signup"
                className="nav-cta block w-full text-center bg-accent hover:bg-orange-700 text-accent-foreground px-6 py-4 rounded-lg text-base font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                onClick={() => handleNavClick('signup')}
                style={{ minHeight: 'var(--touch-target-min)' }}
              >
                Start Free Trial
              </Link>
            </div>
          </div>
        </nav>

        {/* Mobile Overlay */}
        {isMobileMenuOpen && (
          <div 
            className="md:hidden fixed inset-0 bg-black/50 z-[98]"
            style={{ top: 'var(--nav-height-mobile)' }}
            onClick={toggleMobileMenu}
            aria-hidden="true"
          />
        )}
      </header>

      {/* Content Offset */}
      <div 
        className="w-full"
        style={{ 
          height: 'var(--nav-height-desktop)',
          '@media (max-width: 768px)': {
            height: 'var(--nav-height-mobile)'
          }
        }}
      />
    </>
  );
};

export default Header;