
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Lightbulb, Trophy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface AssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Question {
  question: string;
  correct_answer: string;
  explanation: string;
  hints: string[];
}

export const AssessmentModal = ({ isOpen, onClose }: AssessmentModalProps) => {
  const [step, setStep] = useState<'setup' | 'assessment' | 'results'>('setup');
  const [selectedTopic, setSelectedTopic] = useState('algebra');
  const [selectedDifficulty, setSelectedDifficulty] = useState('2');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [showHints, setShowHints] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const topics = [
    { id: 'arithmetic', name: 'Arithmetic', description: 'Basic operations, fractions, decimals' },
    { id: 'algebra', name: 'Algebra', description: 'Variables, equations, polynomials' },
    { id: 'geometry', name: 'Geometry', description: 'Shapes, area, volume, angles' },
    { id: 'trigonometry', name: 'Trigonometry', description: 'Triangles, sin, cos, tan' },
    { id: 'calculus', name: 'Calculus', description: 'Derivatives, integrals, limits' }
  ];

  const difficulties = [
    { value: '1', label: 'Beginner', description: 'Basic concepts and simple problems' },
    { value: '2', label: 'Intermediate', description: 'Standard difficulty with some complexity' },
    { value: '3', label: 'Advanced', description: 'Challenging problems requiring deep understanding' }
  ];

  const startAssessment = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-questions', {
        body: {
          topic: selectedTopic,
          difficulty: parseInt(selectedDifficulty),
          count: 5
        }
      });

      if (error) throw error;

      setQuestions(data.questions);
      setUserAnswers(new Array(data.questions.length).fill(''));
      setStep('assessment');
    } catch (error) {
      console.error('Error generating questions:', error);
      toast({
        title: "Error",
        description: "Failed to generate assessment questions. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const submitAnswer = () => {
    if (!selectedAnswer.trim()) {
      toast({
        title: "Please provide an answer",
        description: "Enter your answer before proceeding.",
        variant: "destructive",
      });
      return;
    }

    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = selectedAnswer;
    setUserAnswers(newAnswers);
    setSelectedAnswer('');
    setShowHints(false);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setStep('results');
    }
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((question, index) => {
      if (userAnswers[index].toLowerCase().trim() === question.correct_answer.toLowerCase().trim()) {
        correct++;
      }
    });
    return Math.round((correct / questions.length) * 100);
  };

  const resetAssessment = () => {
    setStep('setup');
    setCurrentQuestionIndex(0);
    setSelectedAnswer('');
    setUserAnswers([]);
    setQuestions([]);
    setShowHints(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>AI Assessment</DialogTitle>
          <DialogDescription>
            Take a personalized math assessment to test your knowledge
          </DialogDescription>
        </DialogHeader>

        {step === 'setup' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Choose Your Topic</h3>
              <RadioGroup value={selectedTopic} onValueChange={setSelectedTopic}>
                <div className="grid grid-cols-1 gap-3">
                  {topics.map((topic) => (
                    <div key={topic.id} className="flex items-center space-x-3 border rounded-lg p-3">
                      <RadioGroupItem value={topic.id} id={topic.id} />
                      <Label htmlFor={topic.id} className="flex-1 cursor-pointer">
                        <div className="font-medium">{topic.name}</div>
                        <div className="text-sm text-gray-500">{topic.description}</div>
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Select Difficulty Level</h3>
              <RadioGroup value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <div className="space-y-3">
                  {difficulties.map((difficulty) => (
                    <div key={difficulty.value} className="flex items-center space-x-3 border rounded-lg p-3">
                      <RadioGroupItem value={difficulty.value} id={difficulty.value} />
                      <Label htmlFor={difficulty.value} className="flex-1 cursor-pointer">
                        <div className="font-medium">{difficulty.label}</div>
                        <div className="text-sm text-gray-500">{difficulty.description}</div>
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>

            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={onClose}>Cancel</Button>
              <Button onClick={startAssessment} disabled={isLoading}>
                {isLoading ? 'Generating Questions...' : 'Start Assessment'}
              </Button>
            </div>
          </div>
        )}

        {step === 'assessment' && questions.length > 0 && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <Badge variant="secondary">
                Question {currentQuestionIndex + 1} of {questions.length}
              </Badge>
              <Progress value={((currentQuestionIndex + 1) / questions.length) * 100} className="w-48" />
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Problem {currentQuestionIndex + 1}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-lg">{questions[currentQuestionIndex]?.question}</p>
                
                <div>
                  <Label htmlFor="answer">Your Answer:</Label>
                  <input
                    id="answer"
                    type="text"
                    value={selectedAnswer}
                    onChange={(e) => setSelectedAnswer(e.target.value)}
                    className="w-full mt-2 p-2 border rounded-md"
                    placeholder="Enter your answer here..."
                  />
                </div>

                <div className="flex justify-between">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowHints(!showHints)}
                    className="flex items-center gap-2"
                  >
                    <Lightbulb className="h-4 w-4" />
                    {showHints ? 'Hide Hints' : 'Show Hints'}
                  </Button>
                  <Button onClick={submitAnswer}>
                    {currentQuestionIndex === questions.length - 1 ? 'Finish Assessment' : 'Next Question'}
                  </Button>
                </div>

                {showHints && (
                  <Card className="bg-yellow-50 border-yellow-200">
                    <CardContent className="pt-4">
                      <h4 className="font-medium mb-2">Hints:</h4>
                      <ul className="list-disc list-inside space-y-1">
                        {questions[currentQuestionIndex]?.hints?.map((hint, index) => (
                          <li key={index} className="text-sm">{hint}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {step === 'results' && (
          <div className="space-y-6">
            <div className="text-center">
              <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Assessment Complete!</h3>
              <div className="text-3xl font-bold text-blue-600 mb-4">
                Score: {calculateScore()}%
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Review Your Answers:</h4>
              {questions.map((question, index) => {
                const isCorrect = userAnswers[index]?.toLowerCase().trim() === question.correct_answer.toLowerCase().trim();
                return (
                  <Card key={index} className={`border-l-4 ${isCorrect ? 'border-l-green-500' : 'border-l-red-500'}`}>
                    <CardContent className="pt-4">
                      <div className="flex items-start gap-3">
                        {isCorrect ? (
                          <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-500 mt-1" />
                        )}
                        <div className="flex-1">
                          <p className="font-medium mb-2">{question.question}</p>
                          <div className="text-sm space-y-1">
                            <p><strong>Your Answer:</strong> {userAnswers[index] || 'No answer provided'}</p>
                            <p><strong>Correct Answer:</strong> {question.correct_answer}</p>
                            {!isCorrect && (
                              <div className="mt-2 p-2 bg-blue-50 rounded">
                                <p><strong>Explanation:</strong> {question.explanation}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={resetAssessment}>
                Take Another Assessment
              </Button>
              <Button onClick={onClose}>
                Close
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
