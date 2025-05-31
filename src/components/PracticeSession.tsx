
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Lightbulb, Trophy, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getQuestionsByTopic, Question } from "@/services/questionBank";
import React from "react";

interface PracticeSessionProps {
  topicId: string;
  topicName: string;
  difficulty: number;
  onComplete: (results: { correct: number; total: number; timeSpent: number }) => void;
  onBack: () => void;
}

export const PracticeSession = ({ topicId, topicName, difficulty, onComplete, onBack }: PracticeSessionProps) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [startTime] = useState(Date.now());
  const [sessionComplete, setSessionComplete] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const practiceQuestions = getQuestionsByTopic(topicId, difficulty, 10);
    if (practiceQuestions.length === 0) {
      toast({
        title: "No questions available",
        description: `No questions found for ${topicName} at this difficulty level.`,
        variant: "destructive",
      });
      onBack();
      return;
    }
    setQuestions(practiceQuestions);
    setUserAnswers(new Array(practiceQuestions.length).fill(''));
  }, [topicId, difficulty, topicName, onBack, toast]);

  const normalize = (str: string) =>
    str.toLowerCase()
      .replace(/\s+/g, '')
      .replace(/=/g, '')
      .replace(/[()]/g, '')
      .replace(/^x/, '')
      .trim();

  const isCorrect = (userAnswer: string, correctAnswer: string) => {
    return normalize(userAnswer) === normalize(correctAnswer);
  };

  const handleAnswerSubmit = () => {
    if (!currentAnswer.trim()) {
      toast({
        title: "Please provide an answer",
        description: "Enter your answer before proceeding.",
        variant: "destructive",
      });
      return;
    }

    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = currentAnswer;
    setUserAnswers(newAnswers);
    setShowResult(true);
  };

  const handleNextQuestion = () => {
    setShowResult(false);
    setShowHints(false);
    setCurrentAnswer('');
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      completeSession();
    }
  };

  const completeSession = () => {
    const correctCount = questions.reduce((count, question, index) => {
      return count + (isCorrect(userAnswers[index] || '', question.correct_answer) ? 1 : 0);
    }, 0);
    
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    
    onComplete({
      correct: correctCount,
      total: questions.length,
      timeSpent
    });
    
    setSessionComplete(true);
  };

  const resetSession = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers(new Array(questions.length).fill(''));
    setCurrentAnswer('');
    setShowResult(false);
    setShowHints(false);
    setSessionComplete(false);
  };

  if (questions.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>Loading practice questions...</p>
        </div>
      </div>
    );
  }

  if (sessionComplete) {
    const correctCount = questions.reduce((count, question, index) => {
      return count + (isCorrect(userAnswers[index] || '', question.correct_answer) ? 1 : 0);
    }, 0);
    const percentage = Math.round((correctCount / questions.length) * 100);

    return (
      <div className="space-y-6">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <Trophy className="h-6 w-6 text-yellow-500" />
              Practice Complete!
            </CardTitle>
            <CardDescription>
              {topicName} - Level {difficulty}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="text-4xl font-bold text-blue-600">{percentage}%</div>
            <p className="text-gray-600">
              You got {correctCount} out of {questions.length} questions correct
            </p>
            <div className="flex gap-3 justify-center">
              <Button onClick={resetSession}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
              <Button variant="outline" onClick={onBack}>
                Back to Topics
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onBack}>
          ← Back to Topics
        </Button>
        <Badge variant="secondary">
          Question {currentQuestionIndex + 1} of {questions.length}
        </Badge>
      </div>

      <Progress value={progress} className="h-2" />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{topicName} Practice</span>
            <Badge>Level {difficulty}</Badge>
          </CardTitle>
          <CardDescription>
            Answer the question below and click submit
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-lg font-semibold">
            {currentQuestion.question}
          </div>

          <textarea
            className="w-full border rounded p-3 min-h-[80px]"
            value={currentAnswer}
            onChange={(e) => setCurrentAnswer(e.target.value)}
            placeholder="Enter your answer here..."
            disabled={showResult}
          />

          {!showResult && (
            <div className="flex items-center gap-3">
              <Button onClick={handleAnswerSubmit}>
                Submit Answer
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowHints(!showHints)}
              >
                <Lightbulb className="h-4 w-4 mr-2" />
                {showHints ? "Hide Hints" : "Show Hints"}
              </Button>
            </div>
          )}

          {showHints && (
            <div className="bg-yellow-50 p-3 rounded-lg">
              <h4 className="font-semibold text-yellow-800 mb-2">Hints:</h4>
              <ul className="list-disc list-inside text-sm text-yellow-700 space-y-1">
                {currentQuestion.hints.map((hint, index) => (
                  <li key={index}>{hint}</li>
                ))}
              </ul>
            </div>
          )}

          {showResult && (
            <div className="space-y-4">
              <div className={`flex items-center gap-2 p-3 rounded-lg ${
                isCorrect(currentAnswer, currentQuestion.correct_answer)
                  ? 'bg-green-50 text-green-800'
                  : 'bg-red-50 text-red-800'
              }`}>
                {isCorrect(currentAnswer, currentQuestion.correct_answer) ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  <XCircle className="h-5 w-5" />
                )}
                <span className="font-semibold">
                  {isCorrect(currentAnswer, currentQuestion.correct_answer) ? 'Correct!' : 'Incorrect'}
                </span>
              </div>

              {!isCorrect(currentAnswer, currentQuestion.correct_answer) && (
                <div className="bg-blue-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Correct Answer:</h4>
                  <p className="text-blue-700">{currentQuestion.correct_answer}</p>
                </div>
              )}

              <div className="bg-gray-50 p-3 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">Explanation:</h4>
                <p className="text-gray-700 whitespace-pre-wrap">{currentQuestion.explanation}</p>
              </div>

              <Button onClick={handleNextQuestion} className="w-full">
                {currentQuestionIndex === questions.length - 1 ? 'Complete Practice' : 'Next Question'}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
