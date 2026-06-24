import { ComparisonSection } from "./components/ComparisonSection";
import { FeaturesSection } from "./components/FeaturesSection";
import { FinalCTASection } from "./components/FinalCTASection";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { HowItWorksSection } from "./components/HowItWorksSection";
import { ProblemSection } from "./components/ProblemSection";
import { SecuritySection } from "./components/SecuritySection";
import { SocialProofSection } from "./components/SocialProofSection";
import { SolutionSection } from "./components/SolutionSection";
import { VideoSection } from "./components/VideoSection";

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <FeaturesSection />
        <VideoSection />
        <HowItWorksSection />
        <SocialProofSection />
        <ComparisonSection />
        <SecuritySection />
        <FinalCTASection />
      </main>
      <Footer />
    </div>
  );
}
