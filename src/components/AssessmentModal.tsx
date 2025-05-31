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
import { getQuestionsByTopic, Question } from "@/services/questionBank";
import React from "react";

interface AssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
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

  const normalize = (str: string) =>
    str.toLowerCase()
      .replace(/\s+/g, '')
      .replace(/=/g, '')
      .replace(/[()]/g, '')
      .replace(/^x/, '')
      .trim();

  const answersMatch = (userAnswer: string, correctAnswer: string) => {
    return normalize(userAnswer) === normalize(correctAnswer);
  };

  const startAssessment = async () => {
    setIsLoading(true);
    try {
      const assessmentQuestions = getQuestionsByTopic(selectedTopic, parseInt(selectedDifficulty), 5);
      
      if (assessmentQuestions.length === 0) {
        toast({
          title: "No questions available",
          description: "No questions found for this topic and difficulty level.",
          variant: "destructive",
        });
        return;
      }

      setQuestions(assessmentQuestions);
      setUserAnswers(new Array(assessmentQuestions.length).fill(''));
      setStep('assessment');
      setCurrentQuestionIndex(0);
      setSelectedAnswer('');
      setShowHints(false);
    } catch (error) {
      console.error('Error loading questions:', error);
      toast({
        title: "Error",
        description: "Failed to load assessment questions. Please try again.",
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
      if (answersMatch(userAnswers[index] || '', question.correct_answer)) {
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
                {isLoading ? 'Loading Questions...' : 'Start Assessment'}
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
              <CardContent>
                <p className="mb-4 text-lg font-semibold">{questions[currentQuestionIndex].question}</p>

                <textarea
                  className="w-full border rounded p-2"
                  rows={2}
                  value={selectedAnswer}
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                  placeholder="Enter your answer here"
                />

                <div className="mt-4 flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowHints(!showHints)}
                  >
                    <Lightbulb className="mr-2 h-4 w-4" />
                    {showHints ? "Hide Hints" : "Show Hints"}
                  </Button>
                </div>

                {showHints && (
                  <ul className="mt-3 list-disc list-inside text-sm text-gray-600">
                    {questions[currentQuestionIndex].hints.map((hint, idx) => (
                      <li key={idx}>{hint}</li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button
                variant="outline"
                disabled={currentQuestionIndex === 0}
                onClick={() => {
                  setCurrentQuestionIndex(currentQuestionIndex - 1);
                  setSelectedAnswer(userAnswers[currentQuestionIndex - 1] || '');
                  setShowHints(false);
                }}
              >
                Previous
              </Button>
              <Button onClick={submitAnswer}>
                {currentQuestionIndex === questions.length - 1 ? 'Submit' : 'Next'}
              </Button>
            </div>
          </div>
        )}

        {step === 'results' && (
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <Trophy className="text-yellow-500" size={24} />
              <h2 className="text-2xl font-bold">Your Score: {calculateScore()}%</h2>
            </div>

            {questions.map((question, index) => {
              const isCorrect = answersMatch(userAnswers[index] || '', question.correct_answer);
              return (
                <Card key={index} className="border">
                  <CardHeader className="flex justify-between items-center">
                    <CardTitle>{`Question ${index + 1}`}</CardTitle>
                    {isCorrect ? (
                      <CheckCircle className="text-green-600" />
                    ) : (
                      <XCircle className="text-red-600" />
                    )}
                  </CardHeader>
                  <CardContent>
                    <p className="mb-2 font-semibold">{question.question}</p>
                    <p><strong>Your answer:</strong> {userAnswers[index] || "(No answer)"}</p>
                    <p><strong>Correct answer:</strong> {question.correct_answer}</p>
                    <p className="mt-2 text-sm italic">{question.explanation}</p>
                  </CardContent>
                </Card>
              );
            })}

            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={resetAssessment}>Try Again</Button>
              <Button onClick={onClose}>Close</Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
