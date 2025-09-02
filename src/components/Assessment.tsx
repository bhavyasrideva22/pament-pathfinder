import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ArrowLeft, ArrowRight, Brain, Code, Target, Zap } from 'lucide-react';

interface Question {
  id: string;
  section: string;
  category: string;
  question: string;
  type: 'mcq' | 'likert' | 'scale';
  options?: string[];
  scale?: { min: number; max: number; labels: string[] };
}

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

const questions: Question[] = [
  // Psychometric Section
  {
    id: 'psych_1',
    section: 'Psychometric Assessment',
    category: 'Personality',
    question: 'I prefer working with structured, well-defined systems rather than ambiguous, creative tasks.',
    type: 'likert',
  },
  {
    id: 'psych_2',
    section: 'Psychometric Assessment',
    category: 'Interest',
    question: 'Which activity would you find most engaging?',
    type: 'mcq',
    options: [
      'Designing secure financial transaction flows',
      'Creating user interfaces for mobile apps',
      'Writing marketing copy for products',
      'Managing team projects and timelines'
    ]
  },
  {
    id: 'psych_3',
    section: 'Psychometric Assessment',
    category: 'Motivation',
    question: 'I enjoy learning about complex regulatory frameworks and compliance standards.',
    type: 'likert',
  },
  {
    id: 'psych_4',
    section: 'Psychometric Assessment',
    category: 'Cognitive Style',
    question: 'When solving problems, I prefer to:',
    type: 'mcq',
    options: [
      'Follow established methodologies and best practices',
      'Experiment with creative, unconventional approaches',
      'Collaborate extensively with others for diverse perspectives',
      'Research thoroughly before taking any action'
    ]
  },
  
  // Technical Section
  {
    id: 'tech_1',
    section: 'Technical Assessment',
    category: 'Programming Knowledge',
    question: 'What does PCI-DSS primarily regulate?',
    type: 'mcq',
    options: [
      'Credit card data security standards',
      'API rate limiting protocols',
      'Database backup procedures',
      'User authentication methods'
    ]
  },
  {
    id: 'tech_2',
    section: 'Technical Assessment',
    category: 'Systems Thinking',
    question: 'In a payment system, what is tokenization primarily used for?',
    type: 'mcq',
    options: [
      'Replacing sensitive card data with secure tokens',
      'Encrypting network communications',
      'Managing user authentication sessions',
      'Optimizing database query performance'
    ]
  },
  {
    id: 'tech_3',
    section: 'Technical Assessment',
    category: 'API Understanding',
    question: 'I am comfortable working with REST APIs and webhook implementations.',
    type: 'likert',
  },
  {
    id: 'tech_4',
    section: 'Technical Assessment',
    category: 'Financial Systems',
    question: 'Which of these is NOT a common payment gateway?',
    type: 'mcq',
    options: [
      'Stripe',
      'PayPal',
      'MongoDB',
      'Razorpay'
    ]
  },

  // WISCAR Section
  {
    id: 'wiscar_1',
    section: 'Career Readiness',
    category: 'Will',
    question: 'I am willing to invest 6-12 months learning payment technologies and regulations.',
    type: 'likert',
  },
  {
    id: 'wiscar_2',
    section: 'Career Readiness',
    category: 'Interest',
    question: 'How interested are you in the financial technology sector?',
    type: 'scale',
    scale: { min: 1, max: 10, labels: ['Not interested', 'Extremely interested'] }
  },
  {
    id: 'wiscar_3',
    section: 'Career Readiness',
    category: 'Cognitive',
    question: 'I can easily understand complex system architectures and data flows.',
    type: 'likert',
  },
  {
    id: 'wiscar_4',
    section: 'Career Readiness',
    category: 'Learning Ability',
    question: 'When faced with a new technology, I typically:',
    type: 'mcq',
    options: [
      'Dive deep into documentation and build test projects',
      'Watch tutorials and follow guided examples',
      'Ask colleagues and learn through collaboration',
      'Wait for formal training opportunities'
    ]
  }
];

const Assessment = ({ onComplete }: { onComplete: (results: AssessmentResults) => void }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const question = questions[currentQuestion];

  const handleAnswer = (value: string) => {
    const numericValue = question.type === 'mcq' ? parseInt(value) : parseInt(value);
    setAnswers({ ...answers, [question.id]: numericValue });
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResults();
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateResults = () => {
    // Simplified scoring algorithm
    const psychometricQuestions = questions.filter(q => q.section === 'Psychometric Assessment');
    const technicalQuestions = questions.filter(q => q.section === 'Technical Assessment');
    const wiscarQuestions = questions.filter(q => q.section === 'Career Readiness');

    const psychometricScore = psychometricQuestions.reduce((sum, q) => 
      sum + (answers[q.id] || 0), 0) / psychometricQuestions.length * 20;
    
    const technicalScore = technicalQuestions.reduce((sum, q) => 
      sum + (answers[q.id] || 0), 0) / technicalQuestions.length * 20;

    const wiscarScore = wiscarQuestions.reduce((sum, q) => 
      sum + (answers[q.id] || 0), 0) / wiscarQuestions.length * 20;

    const overall = (psychometricScore + technicalScore + wiscarScore) / 3;
    
    let recommendation: 'Yes' | 'Maybe' | 'No' = 'No';
    if (overall >= 75) recommendation = 'Yes';
    else if (overall >= 60) recommendation = 'Maybe';

    const results: AssessmentResults = {
      psychometricFit: psychometricScore,
      technicalReadiness: technicalScore,
      wiscar: {
        will: wiscarScore,
        interest: wiscarScore + 5,
        skill: technicalScore - 5,
        cognitive: psychometricScore,
        ability: wiscarScore + 3,
        realWorld: overall
      },
      overallScore: overall,
      recommendation
    };

    onComplete(results);
  };

  const getSectionIcon = (section: string) => {
    switch (section) {
      case 'Psychometric Assessment': return <Brain className="w-5 h-5" />;
      case 'Technical Assessment': return <Code className="w-5 h-5" />;
      case 'Career Readiness': return <Target className="w-5 h-5" />;
      default: return <Zap className="w-5 h-5" />;
    }
  };

  const renderQuestion = () => {
    switch (question.type) {
      case 'mcq':
        return (
          <RadioGroup 
            value={answers[question.id]?.toString()} 
            onValueChange={handleAnswer}
            className="space-y-4"
          >
            {question.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-3 p-4 rounded-lg bg-card/50 hover:bg-card/80 transition-smooth border border-border/50">
                <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );
      
      case 'likert':
      case 'scale':
        const labels = ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'];
        return (
          <RadioGroup 
            value={answers[question.id]?.toString()} 
            onValueChange={handleAnswer}
            className="space-y-3"
          >
            {labels.map((label, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-card/30 hover:bg-card/60 transition-smooth">
                <RadioGroupItem value={(index + 1).toString()} id={`scale-${index}`} />
                <Label htmlFor={`scale-${index}`} className="flex-1 cursor-pointer">
                  {label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            {getSectionIcon(question.section)}
            <span className="text-sm font-medium text-muted-foreground">
              {question.section}
            </span>
          </div>
          <h1 className="text-2xl font-bold mb-2">Digital Payments Architect Assessment</h1>
          <div className="flex items-center gap-4 max-w-md mx-auto">
            <span className="text-sm text-muted-foreground">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <Progress value={progress} className="flex-1" />
            <span className="text-sm text-muted-foreground">
              {Math.round(progress)}%
            </span>
          </div>
        </div>

        {/* Question Card */}
        <Card className="p-8 mb-8 bg-gradient-card border-border/50 shadow-card">
          <div className="mb-6">
            <div className="text-sm text-primary font-medium mb-3">
              {question.category}
            </div>
            <h2 className="text-xl font-semibold leading-relaxed">
              {question.question}
            </h2>
          </div>

          {renderQuestion()}
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={prevQuestion}
            disabled={currentQuestion === 0}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </Button>
          
          <Button 
            onClick={nextQuestion}
            disabled={!answers[question.id]}
            className="flex items-center gap-2 bg-gradient-primary hover:opacity-90"
          >
            {currentQuestion === questions.length - 1 ? 'Complete Assessment' : 'Next'}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Assessment;