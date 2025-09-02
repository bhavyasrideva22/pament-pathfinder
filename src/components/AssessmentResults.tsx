import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle, 
  AlertCircle, 
  XCircle, 
  Brain, 
  Code, 
  Target,
  TrendingUp,
  BookOpen,
  Users,
  ArrowRight,
  Download
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

const ResultsDisplay = ({ results, onRestart }: { results: AssessmentResults; onRestart: () => void }) => {
  const getRecommendationIcon = () => {
    switch (results.recommendation) {
      case 'Yes': return <CheckCircle className="w-8 h-8 text-primary" />;
      case 'Maybe': return <AlertCircle className="w-8 h-8 text-yellow-500" />;
      case 'No': return <XCircle className="w-8 h-8 text-destructive" />;
    }
  };

  const getRecommendationColor = () => {
    switch (results.recommendation) {
      case 'Yes': return 'text-primary';
      case 'Maybe': return 'text-yellow-500';
      case 'No': return 'text-destructive';
    }
  };

  const getRecommendationText = () => {
    switch (results.recommendation) {
      case 'Yes': 
        return {
          title: 'Excellent Fit!',
          description: 'You have strong potential to succeed as a Digital Payments Architect. Your analytical skills, technical aptitude, and interest in the field align well with this career path.',
          nextSteps: [
            'Begin with PCI-DSS and payment security fundamentals',
            'Learn API integration with Stripe or similar platforms',
            'Study financial regulations (PSD2, KYC/AML)',
            'Build a portfolio project with payment integration'
          ]
        };
      case 'Maybe':
        return {
          title: 'Good Potential',
          description: 'You show promise for this field but may need to strengthen certain areas. Focus on the improvement areas highlighted below.',
          nextSteps: [
            'Strengthen your technical foundations in APIs',
            'Take an introductory fintech course',
            'Practice system design problems',
            'Network with professionals in payments industry'
          ]
        };
      case 'No':
        return {
          title: 'Consider Alternatives',
          description: 'While this specific role may not be ideal, consider related careers that might be a better fit for your profile.',
          nextSteps: [
            'Explore Business Analyst roles in fintech',
            'Consider Product Management in payments',
            'Look into Compliance or Risk Management',
            'Develop foundational technical skills first'
          ]
        };
    }
  };

  const recommendation = getRecommendationText();

  const alternativeCareers = [
    { title: 'Fintech Product Manager', description: 'Drive payment product strategy and roadmaps' },
    { title: 'API Integration Engineer', description: 'Focus on technical integrations and partnerships' },
    { title: 'Compliance Analyst', description: 'Ensure regulatory adherence in financial systems' },
    { title: 'Risk & Fraud Analyst', description: 'Develop systems to detect and prevent fraud' }
  ];

  const learningResources = [
    { title: 'Payment Systems Fundamentals', provider: 'Coursera', type: 'Course' },
    { title: 'PCI-DSS Implementation Guide', provider: 'PCI Security Standards', type: 'Documentation' },
    { title: 'Stripe Developer Documentation', provider: 'Stripe', type: 'Hands-on' },
    { title: 'Digital Payments Architecture', provider: 'Udemy', type: 'Course' }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle p-4">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Assessment Results</h1>
          <p className="text-muted-foreground">Digital Payments Architect Career Assessment</p>
        </div>

        {/* Main Recommendation */}
        <Card className="p-8 bg-gradient-card border-border/50 shadow-card">
          <div className="flex items-start gap-6">
            {getRecommendationIcon()}
            <div className="flex-1">
              <h2 className={`text-2xl font-bold mb-2 ${getRecommendationColor()}`}>
                {recommendation.title}
              </h2>
              <p className="text-lg mb-4 text-muted-foreground leading-relaxed">
                {recommendation.description}
              </p>
              <div className="flex items-center gap-4">
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  Overall Score: {Math.round(results.overallScore)}%
                </Badge>
                <Badge variant={results.recommendation === 'Yes' ? 'default' : results.recommendation === 'Maybe' ? 'secondary' : 'destructive'}>
                  {results.recommendation === 'Yes' ? 'Recommended' : results.recommendation === 'Maybe' ? 'Conditional' : 'Not Recommended'}
                </Badge>
              </div>
            </div>
          </div>
        </Card>

        {/* Detailed Scores */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 bg-gradient-card border-border/50">
            <div className="flex items-center gap-3 mb-4">
              <Brain className="w-6 h-6 text-primary" />
              <h3 className="font-semibold">Psychometric Fit</h3>
            </div>
            <div className="space-y-3">
              <Progress value={results.psychometricFit} className="h-3" />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Personality Match</span>
                <span className="font-medium">{Math.round(results.psychometricFit)}%</span>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-card border-border/50">
            <div className="flex items-center gap-3 mb-4">
              <Code className="w-6 h-6 text-primary" />
              <h3 className="font-semibold">Technical Readiness</h3>
            </div>
            <div className="space-y-3">
              <Progress value={results.technicalReadiness} className="h-3" />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Skills Assessment</span>
                <span className="font-medium">{Math.round(results.technicalReadiness)}%</span>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-card border-border/50">
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-6 h-6 text-primary" />
              <h3 className="font-semibold">Career Readiness</h3>
            </div>
            <div className="space-y-3">
              <Progress value={(results.wiscar.will + results.wiscar.interest + results.wiscar.ability) / 3} className="h-3" />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">WISCAR Score</span>
                <span className="font-medium">{Math.round((results.wiscar.will + results.wiscar.interest + results.wiscar.ability) / 3)}%</span>
              </div>
            </div>
          </Card>
        </div>

        {/* WISCAR Breakdown */}
        <Card className="p-8 bg-gradient-card border-border/50">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Detailed Analysis (WISCAR Framework)
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(results.wiscar).map(([key, value]) => (
              <div key={key} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="capitalize font-medium">{key === 'realWorld' ? 'Real World Fit' : key}</span>
                  <span className="text-sm font-medium">{Math.round(value)}%</span>
                </div>
                <Progress value={value} className="h-2" />
              </div>
            ))}
          </div>
        </Card>

        {/* Next Steps */}
        <Card className="p-8 bg-gradient-card border-border/50">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <ArrowRight className="w-5 h-5 text-primary" />
            Recommended Next Steps
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3 text-primary">Immediate Actions</h4>
              <ul className="space-y-2">
                {recommendation.nextSteps.map((step, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className="text-sm">{step}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-3 text-primary">Learning Resources</h4>
              <div className="space-y-3">
                {learningResources.map((resource, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                    <div>
                      <div className="font-medium text-sm">{resource.title}</div>
                      <div className="text-xs text-muted-foreground">{resource.provider}</div>
                    </div>
                    <Badge variant="outline" className="text-xs">{resource.type}</Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Alternative Careers */}
        {results.recommendation !== 'Yes' && (
          <Card className="p-8 bg-gradient-card border-border/50">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Alternative Career Paths
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {alternativeCareers.map((career, index) => (
                <div key={index} className="p-4 bg-muted/20 rounded-lg">
                  <h4 className="font-medium mb-2">{career.title}</h4>
                  <p className="text-sm text-muted-foreground">{career.description}</p>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Actions */}
        <div className="flex justify-center gap-4">
          <Button variant="outline" onClick={onRestart} className="flex items-center gap-2">
            Retake Assessment
          </Button>
          <Button className="flex items-center gap-2 bg-gradient-primary hover:opacity-90">
            <Download className="w-4 h-4" />
            Download Report
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResultsDisplay;