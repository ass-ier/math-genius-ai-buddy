
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronLeft, 
  ChevronRight, 
  Brain, 
  Calculator, 
  BookOpen, 
  Trophy, 
  MessageCircle, 
  Target,
  Users,
  TrendingUp,
  Zap,
  Star,
  Code,
  Database,
  Smartphone,
  Globe,
  BarChart3,
  Lightbulb,
  Rocket,
  CheckCircle,
  ArrowRight
} from "lucide-react";

export const Presentation = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    // Slide 1: Title
    {
      title: "Math Genius AI",
      subtitle: "Revolutionizing Mathematics Education Through AI",
      type: "title",
      content: (
        <div className="text-center space-y-8">
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
                <Brain className="w-16 h-16 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                <Zap className="w-4 h-4 text-yellow-800" />
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Math Genius AI
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Your Personal AI-Powered Mathematics Tutor for Adaptive Learning and Mastery
            </p>
          </div>
          <div className="flex justify-center space-x-4">
            <Badge className="bg-blue-100 text-blue-800 px-4 py-2">AI-Powered</Badge>
            <Badge className="bg-green-100 text-green-800 px-4 py-2">Adaptive Learning</Badge>
            <Badge className="bg-purple-100 text-purple-800 px-4 py-2">Personalized</Badge>
          </div>
        </div>
      )
    },

    // Slide 2: Problem Statement
    {
      title: "Problem Statement",
      subtitle: "Challenges in Mathematics Education",
      type: "content",
      content: (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Target className="w-4 h-4 text-red-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">One-Size-Fits-All Approach</h3>
                <p className="text-gray-600">Traditional education doesn't adapt to individual learning speeds and styles</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Users className="w-4 h-4 text-red-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Limited Personal Attention</h3>
                <p className="text-gray-600">Large class sizes make it difficult for teachers to provide individualized support</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <TrendingUp className="w-4 h-4 text-red-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Lack of Real-time Feedback</h3>
                <p className="text-gray-600">Students often wait days or weeks to understand their mistakes</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Star className="w-4 h-4 text-red-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Math Anxiety</h3>
                <p className="text-gray-600">Fear and anxiety around mathematics hinder learning and performance</p>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-80 h-80 bg-gradient-to-br from-red-100 to-orange-100 rounded-3xl p-8 shadow-xl">
                <div className="text-center space-y-4">
                  <div className="text-6xl font-bold text-red-500">73%</div>
                  <p className="text-gray-700 font-medium">of students struggle with mathematics</p>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div>• Low engagement rates</div>
                    <div>• High dropout rates in STEM</div>
                    <div>• Widening achievement gaps</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },

    // Slide 3: Solution Proposed
    {
      title: "The Solution Proposed",
      subtitle: "AI-Powered Personalized Mathematics Education",
      type: "content",
      content: (
        <div className="space-y-8">
          <div className="text-center">
            <div className="inline-flex items-center space-x-4 bg-gradient-to-r from-blue-50 to-purple-50 px-8 py-4 rounded-2xl">
              <Brain className="w-12 h-12 text-blue-600" />
              <ArrowRight className="w-6 h-6 text-gray-400" />
              <Calculator className="w-12 h-12 text-green-600" />
              <ArrowRight className="w-6 h-6 text-gray-400" />
              <Trophy className="w-12 h-12 text-purple-600" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardContent className="p-0 text-center space-y-4">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-lg">AI Chat Tutor</h3>
                <p className="text-gray-600">Instant, intelligent responses to math questions with step-by-step explanations</p>
              </CardContent>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardContent className="p-0 text-center space-y-4">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-lg">Adaptive Assessments</h3>
                <p className="text-gray-600">Dynamic difficulty adjustment based on individual performance and learning patterns</p>
              </CardContent>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <CardContent className="p-0 text-center space-y-4">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-lg">Progress Tracking</h3>
                <p className="text-gray-600">Comprehensive analytics and insights into learning progress and areas for improvement</p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-2xl text-center">
            <h3 className="text-2xl font-bold mb-2">Our Mission</h3>
            <p className="text-lg opacity-90">
              To make mathematics accessible, engaging, and personalized for every learner through the power of AI
            </p>
          </div>
        </div>
      )
    },

    // Slide 4: Topics Covered and Features
    {
      title: "Topics Covered & Features",
      subtitle: "Comprehensive Mathematics Curriculum",
      type: "content",
      content: (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-6 text-center">Mathematics Topics</h3>
            <div className="space-y-4">
              {[
                { name: "Arithmetic", icon: Calculator, color: "bg-blue-500", desc: "Basic operations, fractions, decimals" },
                { name: "Algebra", icon: Brain, color: "bg-green-500", desc: "Equations, polynomials, factoring" },
                { name: "Geometry", icon: Target, color: "bg-purple-500", desc: "Shapes, area, volume, angles" },
                { name: "Trigonometry", icon: BookOpen, color: "bg-orange-500", desc: "Triangles, functions, identities" },
                { name: "Calculus", icon: Trophy, color: "bg-red-500", desc: "Derivatives, integrals, limits" }
              ].map((topic, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm border">
                  <div className={`w-12 h-12 ${topic.color} rounded-lg flex items-center justify-center`}>
                    <topic.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{topic.name}</h4>
                    <p className="text-sm text-gray-600">{topic.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-6 text-center">Key Features</h3>
            <div className="space-y-4">
              {[
                { feature: "Interactive Chat Interface", icon: MessageCircle },
                { feature: "Step-by-Step Solutions", icon: Lightbulb },
                { feature: "Multiple Difficulty Levels", icon: TrendingUp },
                { feature: "Mistake Review System", icon: CheckCircle },
                { feature: "Progress Analytics", icon: BarChart3 },
                { feature: "Quick Practice Sessions", icon: Zap },
                { feature: "User Authentication", icon: Users },
                { feature: "Topic-Based Learning", icon: BookOpen }
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-medium">{item.feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },

    // Slide 5: Personalization Logic
    {
      title: "Personalization Logic",
      subtitle: "How AI Adapts to Each Learner",
      type: "content",
      content: (
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
              <CardContent className="p-0 text-center space-y-4">
                <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-lg">Performance Analysis</h3>
                <p className="text-gray-600">Tracks accuracy, time spent, and learning patterns across all topics</p>
              </CardContent>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardContent className="p-0 text-center space-y-4">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-lg">Adaptive Difficulty</h3>
                <p className="text-gray-600">Automatically adjusts question difficulty based on student performance</p>
              </CardContent>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <CardContent className="p-0 text-center space-y-4">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto">
                  <Lightbulb className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-lg">Weak Area Focus</h3>
                <p className="text-gray-600">Identifies struggling topics and provides targeted practice sessions</p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg border">
            <h3 className="text-2xl font-bold text-center mb-6">Personalization Flow</h3>
            <div className="flex flex-wrap justify-center items-center space-x-4 text-center">
              <div className="flex flex-col items-center space-y-2">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">1</div>
                <span className="text-sm font-medium">Initial Assessment</span>
              </div>
              <ArrowRight className="text-gray-400" />
              <div className="flex flex-col items-center space-y-2">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">2</div>
                <span className="text-sm font-medium">Performance Tracking</span>
              </div>
              <ArrowRight className="text-gray-400" />
              <div className="flex flex-col items-center space-y-2">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">3</div>
                <span className="text-sm font-medium">AI Analysis</span>
              </div>
              <ArrowRight className="text-gray-400" />
              <div className="flex flex-col items-center space-y-2">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">4</div>
                <span className="text-sm font-medium">Adaptive Content</span>
              </div>
            </div>
          </div>
        </div>
      )
    },

    // Slide 6: Impact
    {
      title: "Impact",
      subtitle: "Transforming Mathematics Education",
      type: "content",
      content: (
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">Expected Outcomes</h3>
              {[
                { metric: "85%", desc: "Improvement in student engagement", color: "text-blue-600" },
                { metric: "70%", desc: "Reduction in math anxiety", color: "text-green-600" },
                { metric: "60%", desc: "Faster concept mastery", color: "text-purple-600" },
                { metric: "40%", desc: "Better test scores", color: "text-orange-600" }
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className={`text-4xl font-bold ${item.color}`}>{item.metric}</div>
                  <div className="text-gray-700">{item.desc}</div>
                </div>
              ))}
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold">Target Beneficiaries</h3>
              <div className="space-y-4">
                {[
                  { group: "Students", desc: "Personalized learning experience", icon: Users, color: "bg-blue-500" },
                  { group: "Teachers", desc: "Enhanced teaching tools and insights", icon: BookOpen, color: "bg-green-500" },
                  { group: "Parents", desc: "Track child's progress easily", icon: Star, color: "bg-purple-500" },
                  { group: "Institutions", desc: "Improved educational outcomes", icon: Globe, color: "bg-orange-500" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className={`w-10 h-10 ${item.color} rounded-full flex items-center justify-center`}>
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{item.group}</h4>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )
    },

    // Slide 7: Tech Stack
    {
      title: "Tech Stack",
      subtitle: "Modern, Scalable, and Reliable Technologies",
      type: "content",
      content: (
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-center">Frontend Technologies</h3>
              <div className="space-y-4">
                {[
                  { tech: "React 18", desc: "Modern UI library with hooks", icon: Code },
                  { tech: "TypeScript", desc: "Type-safe development", icon: Code },
                  { tech: "Tailwind CSS", desc: "Utility-first CSS framework", icon: Code },
                  { tech: "Shadcn/UI", desc: "Beautiful component library", icon: Code },
                  { tech: "Vite", desc: "Fast build tool and dev server", icon: Zap }
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm border">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{item.tech}</h4>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6 text-center">Backend & Services</h3>
              <div className="space-y-4">
                {[
                  { tech: "Supabase", desc: "Backend-as-a-Service platform", icon: Database },
                  { tech: "PostgreSQL", desc: "Reliable relational database", icon: Database },
                  { tech: "OpenAI API", desc: "AI-powered chat responses", icon: Brain },
                  { tech: "TanStack Query", desc: "Data fetching and caching", icon: Zap },
                  { tech: "Authentication", desc: "Secure user management", icon: Users }
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm border">
                    <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{item.tech}</h4>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-2xl text-center">
            <h3 className="text-xl font-bold mb-2">Architecture Benefits</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div>🚀 Fast Performance</div>
              <div>🔒 Enterprise Security</div>
              <div>📱 Responsive Design</div>
            </div>
          </div>
        </div>
      )
    },

    // Slide 8: Future Features
    {
      title: "Future Features",
      subtitle: "Roadmap for Enhanced Learning Experience",
      type: "content",
      content: (
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-6">Phase 1: Enhanced AI</h3>
              <div className="space-y-4">
                {[
                  { feature: "Voice Recognition", desc: "Speak math problems naturally", icon: MessageCircle },
                  { feature: "Handwriting Recognition", desc: "Write equations by hand", icon: BookOpen },
                  { feature: "Image Problem Solving", desc: "Upload photo of math problems", icon: Target },
                  { feature: "Advanced Explanations", desc: "Multiple solution methods", icon: Lightbulb }
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <item.icon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{item.feature}</h4>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6">Phase 2: Social Learning</h3>
              <div className="space-y-4">
                {[
                  { feature: "Peer Collaboration", desc: "Study groups and forums", icon: Users },
                  { feature: "Teacher Dashboard", desc: "Classroom management tools", icon: BarChart3 },
                  { feature: "Parent Portal", desc: "Monitor child's progress", icon: Star },
                  { feature: "Gamification", desc: "Badges, leaderboards, rewards", icon: Trophy }
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-green-50 rounded-lg">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <item.icon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{item.feature}</h4>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-6">Phase 3: Advanced Analytics</h3>
              <div className="space-y-4">
                {[
                  { feature: "Learning Analytics", desc: "Deep insights into learning patterns", icon: BarChart3 },
                  { feature: "Predictive Modeling", desc: "Forecast learning outcomes", icon: TrendingUp },
                  { feature: "Curriculum Mapping", desc: "Align with educational standards", icon: BookOpen },
                  { feature: "Performance Benchmarking", desc: "Compare with peer groups", icon: Target }
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-purple-50 rounded-lg">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <item.icon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{item.feature}</h4>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6">Phase 4: Platform Expansion</h3>
              <div className="space-y-4">
                {[
                  { feature: "Mobile App", desc: "Native iOS and Android apps", icon: Smartphone },
                  { feature: "Offline Mode", desc: "Practice without internet", icon: Globe },
                  { feature: "Multi-language Support", desc: "Support for various languages", icon: Globe },
                  { feature: "API Integration", desc: "Connect with school systems", icon: Code }
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-orange-50 rounded-lg">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <item.icon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{item.feature}</h4>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white p-6 rounded-2xl text-center">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <Rocket className="w-8 h-8" />
              <h3 className="text-2xl font-bold">Innovation Timeline</h3>
              <Rocket className="w-8 h-8" />
            </div>
            <div className="grid grid-cols-4 gap-4 text-sm">
              <div>Q1 2024<br/>Enhanced AI</div>
              <div>Q2 2024<br/>Social Learning</div>
              <div>Q3 2024<br/>Analytics</div>
              <div>Q4 2024<br/>Platform Expansion</div>
            </div>
          </div>
        </div>
      )
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const currentSlideData = slides[currentSlide];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="h-12 w-12 rounded-full"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <span className="text-lg font-medium">
              {currentSlide + 1} / {slides.length}
            </span>
            <Button
              variant="outline"
              onClick={nextSlide}
              disabled={currentSlide === slides.length - 1}
              className="h-12 w-12 rounded-full"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>

          <div className="flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Slide Content */}
        <Card className="min-h-[600px] shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-12">
            {currentSlideData.type === 'title' ? (
              <div className="h-full flex flex-col justify-center">
                {currentSlideData.content}
              </div>
            ) : (
              <div className="space-y-8">
                <div className="text-center space-y-2">
                  <h1 className="text-4xl font-bold text-gray-900">{currentSlideData.title}</h1>
                  <p className="text-xl text-gray-600">{currentSlideData.subtitle}</p>
                </div>
                <div className="mt-12">
                  {currentSlideData.content}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-center mt-8 space-x-4">
          <Button
            variant="outline"
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="px-6 py-2"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          <Button
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            className="px-6 py-2"
          >
            Next
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};
