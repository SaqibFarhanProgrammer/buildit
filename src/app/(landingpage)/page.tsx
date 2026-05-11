import Features from '@/components/LandingPage/Feature';
import Footer from '@/components/LandingPage/Footer';
import Hero from '@/components/LandingPage/Hero';
import HowItWorks from '@/components/LandingPage/HowItWorks';
import Navbar from '@/components/LandingPage/Navbar';
import Pricing from '@/components/LandingPage/Priceing';
import UseCases from '@/components/LandingPage/UseCases';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <UseCases />
      <Features />
      <HowItWorks />
      <Pricing />
      <Footer />
    </main>
  );
}
