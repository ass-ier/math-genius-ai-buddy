import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, Calculator, BookOpen, Trophy, MessageCircle, Target, LogOut, User } from "lucide-react";
import { AssessmentModal } from "@/components/AssessmentModal";
import { ChatInterface } from "@/components/ChatInterface";
import { ProgressDashboard } from "@/components/ProgressDashboard";
import { TopicSelector } from "@/components/TopicSelector";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);
  const { user, signOut } = useAuth();

  const mathTopics = [
    { id: 'arithmetic', name: 'Arithmetic', icon: Calculator, color: 'bg-blue-500' },
    { id: 'algebra', name: 'Algebra', icon: Brain, color: 'bg-green-500' },
    { id: 'geometry', name: 'Geometry', icon: Target, color: 'bg-purple-500' },
    { id: 'trigonometry', name: 'Trigonometry', icon: BookOpen, color: 'bg-orange-500' },
    { id: 'calculus', name: 'Calculus', icon: Trophy, color: 'bg-red-500' }
  ];

  const handleSignOut = async () => {
    await signOut();
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'chat':
        return <ChatInterface />;
      case 'progress':
        return <ProgressDashboard />;
      case 'topics':
        return <TopicSelector topics={mathTopics} />;
      default:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Welcome to Math Genius AI
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Your personal AI-powered math tutor. Practice, learn, and excel in mathematics with adaptive assessments and personalized guidance.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setIsAssessmentOpen(true)}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-6 w-6 text-blue-500" />
                    AI Assessment
                  </CardTitle>
                  <CardDescription>
                    Take a dynamic assessment tailored to your skill level
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Start Assessment</Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveSection('chat')}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-6 w-6 text-green-500" />
                    AI Chat Tutor
                  </CardTitle>
                  <CardDescription>
                    Ask questions and get step-by-step solutions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">Open Chat</Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveSection('topics')}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-6 w-6 text-purple-500" />
                    Topic Practice
                  </CardTitle>
                  <CardDescription>
                    Focus on specific math topics and domains
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">Browse Topics</Button>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Practice</CardTitle>
                  <CardDescription>5-minute daily math workout</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Today's streak</span>
                      <Badge variant="secondary">3 days</Badge>
                    </div>
                    <Button className="w-full">Start Daily Practice</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Your Progress</CardTitle>
                  <CardDescription>Track your learning journey</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Questions solved</span>
                      <Badge>47</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Accuracy rate</span>
                      <Badge variant="secondary">85%</Badge>
                    </div>
                    <Button variant="outline" className="w-full" onClick={() => setActiveSection('progress')}>
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold text-blue-600">Math Genius AI</h1>
            <div className="hidden md:flex space-x-6">
              <Button 
                variant={activeSection === 'dashboard' ? 'default' : 'ghost'}
                onClick={() => setActiveSection('dashboard')}
              >
                Dashboard
              </Button>
              <Button 
                variant={activeSection === 'chat' ? 'default' : 'ghost'}
                onClick={() => setActiveSection('chat')}
              >
                AI Tutor
              </Button>
              <Button 
                variant={activeSection === 'topics' ? 'default' : 'ghost'}
                onClick={() => setActiveSection('topics')}
              >
                Topics
              </Button>
              <Button 
                variant={activeSection === 'progress' ? 'default' : 'ghost'}
                onClick={() => setActiveSection('progress')}
              >
                Progress
              </Button>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <User className="h-4 w-4" />
              <span>{user?.email}</span>
            </div>
            <Button variant="outline" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {renderActiveSection()}
      </main>

      {/* Assessment Modal */}
      <AssessmentModal 
        isOpen={isAssessmentOpen} 
        onClose={() => setIsAssessmentOpen(false)} 
      />
    </div>
  );
};

export default Index;
