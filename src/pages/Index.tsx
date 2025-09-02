import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Assessment from '@/components/Assessment';
import ResultsDisplay from '@/components/AssessmentResults';
import { 
  CreditCard, 
  Shield, 
  Zap, 
  TrendingUp, 
  Users, 
  CheckCircle,
  ArrowRight,
  Brain,
  Target,
  Clock
} from 'lucide-react';

interface AssessmentResults {
  psychometricFit: number;
  technicalReadiness: number;
  wiscar: {
    will: number;
    interest: number;
    skill: number;
    cognitive: number;
    ability: number;
    realWorld: number;
  };
  overallScore: number;
  recommendation: 'Yes' | 'Maybe' | 'No';
}

type AppState = 'landing' | 'assessment' | 'results';

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>('landing');
  const [results, setResults] = useState<AssessmentResults | null>(null);

  const handleStartAssessment = () => {
    setCurrentState('assessment');
  };

  const handleAssessmentComplete = (assessmentResults: AssessmentResults) => {
    setResults(assessmentResults);
    setCurrentState('results');
  };

  const handleRestart = () => {
    setResults(null);
    setCurrentState('landing');
  };

  if (currentState === 'assessment') {
    return <Assessment onComplete={handleAssessmentComplete} />;
  }

  if (currentState === 'results' && results) {
    return <ResultsDisplay results={results} onRestart={handleRestart} />;
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">
              Career Assessment Platform
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Should You Become a{' '}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Digital Payments Architect?
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Discover if your personality, skills, and interests align with a career in designing 
              secure, scalable digital payment systems. Get personalized insights in just 15 minutes.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                size="lg" 
                onClick={handleStartAssessment}
                className="bg-gradient-primary hover:opacity-90 shadow-elegant text-lg px-8 py-4"
              >
                Start Assessment
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                Learn More
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-8 text-center">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                <span className="text-sm">~15 minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-primary" />
                <span className="text-sm">Science-based</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                <span className="text-sm">Personalized results</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* What You'll Learn */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">What This Assessment Covers</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="p-6 bg-gradient-card border-border/50 shadow-card hover:shadow-elegant transition-smooth">
            <Brain className="w-10 h-10 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-3">Psychometric Analysis</h3>
            <p className="text-muted-foreground">
              Evaluate personality traits, cognitive preferences, and motivational drivers 
              using validated psychological frameworks.
            </p>
          </Card>
          
          <Card className="p-6 bg-gradient-card border-border/50 shadow-card hover:shadow-elegant transition-smooth">
            <Shield className="w-10 h-10 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-3">Technical Readiness</h3>
            <p className="text-muted-foreground">
              Assess your current knowledge of payment systems, security protocols, 
              and technical architecture concepts.
            </p>
          </Card>
          
          <Card className="p-6 bg-gradient-card border-border/50 shadow-card hover:shadow-elegant transition-smooth">
            <TrendingUp className="w-10 h-10 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-3">Career Fit Analysis</h3>
            <p className="text-muted-foreground">
              WISCAR framework analysis covering Will, Interest, Skill, Cognitive ability, 
              and Real-world alignment.
            </p>
          </Card>
        </div>
      </div>

      {/* Role Overview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">What is a Digital Payments Architect?</h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Digital Payments Architects design and implement secure, scalable payment systems 
              that process millions of transactions daily. They work at the intersection of finance, 
              technology, and security.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Design end-to-end payment flows and integrations</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Ensure compliance with financial regulations (PCI-DSS, PSD2)</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Build scalable, real-time transaction infrastructure</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Implement fraud detection and security measures</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4 bg-gradient-card border-border/50 text-center">
              <CreditCard className="w-8 h-8 text-primary mx-auto mb-2" />
              <h4 className="font-semibold mb-1">Payment Gateways</h4>
              <p className="text-sm text-muted-foreground">Stripe, PayPal, Square</p>
            </Card>
            <Card className="p-4 bg-gradient-card border-border/50 text-center">
              <Shield className="w-8 h-8 text-primary mx-auto mb-2" />
              <h4 className="font-semibold mb-1">Security Standards</h4>
              <p className="text-sm text-muted-foreground">PCI-DSS, 3DS2, Tokenization</p>
            </Card>
            <Card className="p-4 bg-gradient-card border-border/50 text-center">
              <Zap className="w-8 h-8 text-primary mx-auto mb-2" />
              <h4 className="font-semibold mb-1">Real-time Systems</h4>
              <p className="text-sm text-muted-foreground">APIs, Webhooks, Microservices</p>
            </Card>
            <Card className="p-4 bg-gradient-card border-border/50 text-center">
              <Users className="w-8 h-8 text-primary mx-auto mb-2" />
              <h4 className="font-semibold mb-1">Collaboration</h4>
              <p className="text-sm text-muted-foreground">Banks, PSPs, Regulators</p>
            </Card>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card className="p-12 bg-gradient-primary text-center border-0 shadow-elegant">
          <h2 className="text-3xl font-bold text-primary-foreground mb-4">
            Ready to Discover Your Career Path?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Get personalized insights, detailed scoring, and actionable recommendations 
            based on validated career assessment frameworks.
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            onClick={handleStartAssessment}
            className="text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-smooth"
          >
            Take the Assessment Now
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Index;
