import type { Metadata } from 'next';
import LandingPageInteractive from './components/LandingPageInteractive';

export const metadata: Metadata = {
  title: 'Landing Page - SaaS Landing Pro',
  description: 'Transform your business with enterprise-level automation made simple. Save 20+ hours weekly with 10-minute setup. Join 10,000+ businesses automating workflows without complexity.',
};

export default function LandingPage() {
  return <LandingPageInteractive />;
}