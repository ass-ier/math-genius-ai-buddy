
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, BookOpen, TrendingUp } from "lucide-react";
import { getRandomQuestions, Question } from "@/services/questionBank";
import React from "react";

interface MistakeReviewProps {
  onBack: () => void;
}

interface MistakeQuestion extends Question {
  userAnswer: string;
  dateAnswered: string;
  attempts: number;
}

export const MistakeReview = ({ onBack }: MistakeReviewProps) => {
  const [mistakes, setMistakes] = useState<MistakeQuestion[]>([]);
  const [selectedMistake, setSelectedMistake] = useState<MistakeQuestion | null>(null);

  useEffect(() => {
    // Generate some sample mistakes for demonstration
    const sampleQuestions = getRandomQuestions(8);
    const sampleMistakes: MistakeQuestion[] = sampleQuestions.map((q, index) => ({
      ...q,
      userAnswer: generateWrongAnswer(q.correct_answer),
      dateAnswered: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      attempts: Math.floor(Math.random() * 3) + 1
    }));
    
    setMistakes(sampleMistakes);
  }, []);

  const generateWrongAnswer = (correctAnswer: string): string => {
    const wrongAnswers = [
      String(parseInt(correctAnswer) + 1),
      String(parseInt(correctAnswer) - 1),
      String(parseInt(correctAnswer) * 2),
      "I don't know",
      "42",
      "0"
    ];
    return wrongAnswers[Math.floor(Math.random() * wrongAnswers.length)] || "Wrong answer";
  };

  const groupedMistakes = mistakes.reduce((acc, mistake) => {
    const topic = mistake.topic.charAt(0).toUpperCase() + mistake.topic.slice(1);
    if (!acc[topic]) acc[topic] = [];
    acc[topic].push(mistake);
    return acc;
  }, {} as Record<string, MistakeQuestion[]>);

  const getTopicColor = (topic: string) => {
    const colors = {
      'Arithmetic': 'bg-blue-100 text-blue-800',
      'Algebra': 'bg-green-100 text-green-800',
      'Geometry': 'bg-purple-100 text-purple-800',
      'Trigonometry': 'bg-orange-100 text-orange-800',
      'Calculus': 'bg-red-100 text-red-800'
    };
    return colors[topic as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  if (selectedMistake) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={() => setSelectedMistake(null)}>
            ← Back to Mistakes
          </Button>
          <Badge className={getTopicColor(selectedMistake.topic.charAt(0).toUpperCase() + selectedMistake.topic.slice(1))}>
            {selectedMistake.topic.charAt(0).toUpperCase() + selectedMistake.topic.slice(1)}
          </Badge>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-500" />
              Review Your Mistake
            </CardTitle>
            <CardDescription>
              Learn from this mistake to improve your understanding
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-2">Question:</h3>
              <p className="text-gray-700">{selectedMistake.question}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-red-50 p-4 rounded-lg">
                <h4 className="font-semibold text-red-800 mb-2">Your Answer:</h4>
                <p className="text-red-700">{selectedMistake.userAnswer}</p>
                <p className="text-sm text-red-600 mt-2">
                  Answered on {selectedMistake.dateAnswered}
                </p>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">Correct Answer:</h4>
                <p className="text-green-700 font-mono">{selectedMistake.correct_answer}</p>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Explanation:</h4>
              <p className="text-blue-700 whitespace-pre-wrap">{selectedMistake.explanation}</p>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-semibold text-yellow-800 mb-2">Hints to Remember:</h4>
              <ul className="list-disc list-inside text-yellow-700 space-y-1">
                {selectedMistake.hints.map((hint, index) => (
                  <li key={index}>{hint}</li>
                ))}
              </ul>
            </div>

            <div className="flex gap-3">
              <Button className="flex-1">
                Practice Similar Questions
              </Button>
              <Button variant="outline" className="flex-1">
                Mark as Understood
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onBack}>
          ← Back
        </Button>
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Mistake Review</h2>
          <p className="text-gray-600">Learn from your past mistakes</p>
        </div>
        <div></div>
      </div>

      {mistakes.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <TrendingUp className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Great job!</h3>
            <p className="text-gray-600">
              You haven't made any recent mistakes. Keep up the excellent work!
            </p>
            <Button className="mt-4" onClick={onBack}>
              Continue Learning
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Review Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-red-500">{mistakes.length}</div>
                  <div className="text-sm text-gray-600">Total Mistakes</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-500">{Object.keys(groupedMistakes).length}</div>
                  <div className="text-sm text-gray-600">Topics to Review</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-500">
                    {Math.round(mistakes.reduce((acc, m) => acc + m.attempts, 0) / mistakes.length)}
                  </div>
                  <div className="text-sm text-gray-600">Avg Attempts</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-500">
                    {Math.max(...mistakes.map(m => m.difficulty))}
                  </div>
                  <div className="text-sm text-gray-600">Highest Level</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {Object.entries(groupedMistakes).map(([topic, topicMistakes]) => (
            <Card key={topic}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{topic}</span>
                  <Badge className={getTopicColor(topic)}>
                    {topicMistakes.length} mistake{topicMistakes.length !== 1 ? 's' : ''}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topicMistakes.map((mistake) => (
                    <div
                      key={mistake.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => setSelectedMistake(mistake)}
                    >
                      <div className="flex-1">
                        <p className="font-medium truncate">{mistake.question}</p>
                        <p className="text-sm text-gray-600">
                          {mistake.dateAnswered} • Level {mistake.difficulty} • {mistake.attempts} attempt{mistake.attempts !== 1 ? 's' : ''}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Review
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
