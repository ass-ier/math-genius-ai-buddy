
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { LucideIcon } from "lucide-react";

interface Topic {
  id: string;
  name: string;
  icon: LucideIcon;
  color: string;
}

interface TopicSelectorProps {
  topics: Topic[];
}

export const TopicSelector = ({ topics }: TopicSelectorProps) => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const topicDetails = {
    arithmetic: {
      description: "Basic mathematical operations, fractions, decimals, and percentages",
      subtopics: ["Addition & Subtraction", "Multiplication & Division", "Fractions", "Decimals", "Percentages"],
      difficulty: "Beginner",
      progress: 95,
      questionsAvailable: 150
    },
    algebra: {
      description: "Variables, equations, polynomials, and algebraic expressions",
      subtopics: ["Linear Equations", "Quadratic Equations", "Polynomials", "Factoring", "Systems of Equations"],
      difficulty: "Intermediate",
      progress: 75,
      questionsAvailable: 200
    },
    geometry: {
      description: "Shapes, angles, area, volume, and spatial relationships",
      subtopics: ["Basic Shapes", "Area & Perimeter", "Volume", "Angles", "Coordinate Geometry"],
      difficulty: "Intermediate",
      progress: 60,
      questionsAvailable: 180
    },
    trigonometry: {
      description: "Triangles, trigonometric functions, and periodic relationships",
      subtopics: ["Right Triangles", "Unit Circle", "Trigonometric Functions", "Identities", "Applications"],
      difficulty: "Advanced",
      progress: 90,
      questionsAvailable: 120
    },
    calculus: {
      description: "Limits, derivatives, integrals, and applications",
      subtopics: ["Limits", "Derivatives", "Integrals", "Applications", "Series"],
      difficulty: "Advanced",
      progress: 30,
      questionsAvailable: 160
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStartPractice = (topicId: string) => {
    console.log(`Starting practice for topic: ${topicId}`);
    // Here you would typically navigate to the practice session
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Choose Your Topic</h2>
        <p className="text-gray-600">Select a math topic to focus your practice session</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map((topic) => {
          const details = topicDetails[topic.id as keyof typeof topicDetails];
          const IconComponent = topic.icon;
          
          return (
            <Card 
              key={topic.id} 
              className={`cursor-pointer transition-all hover:shadow-lg ${
                selectedTopic === topic.id ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => setSelectedTopic(selectedTopic === topic.id ? null : topic.id)}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${topic.color}`}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  {topic.name}
                </CardTitle>
                <CardDescription>{details.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Badge className={getDifficultyColor(details.difficulty)}>
                      {details.difficulty}
                    </Badge>
                    <span className="text-sm text-gray-500">
                      {details.questionsAvailable} questions
                    </span>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Your Progress</span>
                      <span>{details.progress}%</span>
                    </div>
                    <Progress value={details.progress} className="h-2" />
                  </div>

                  {selectedTopic === topic.id && (
                    <div className="mt-4 space-y-3 animate-fadeIn">
                      <div>
                        <h4 className="font-medium text-sm mb-2">Subtopics:</h4>
                        <div className="flex flex-wrap gap-1">
                          {details.subtopics.map((subtopic, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {subtopic}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStartPractice(topic.id);
                          }}
                          className="flex-1"
                          size="sm"
                        >
                          Start Practice
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={(e) => {
                            e.stopPropagation();
                            console.log(`Taking assessment for ${topic.id}`);
                          }}
                          className="flex-1"
                          size="sm"
                        >
                          Take Assessment
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Practice Section */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Quick Practice Options</CardTitle>
          <CardDescription>Jump into targeted practice sessions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <div className="text-lg font-semibold">Mixed Review</div>
              <div className="text-sm text-gray-500">Questions from all topics</div>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <div className="text-lg font-semibold">Weak Areas</div>
              <div className="text-sm text-gray-500">Focus on challenging topics</div>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <div className="text-lg font-semibold">Review Mistakes</div>
              <div className="text-sm text-gray-500">Retry previously incorrect questions</div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
