import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Target, Clock, TrendingUp, BookOpen, Star, Brain, Calculator } from "lucide-react";

export const ProgressDashboard = () => {
  const [progressData, setProgressData] = useState({
    totalQuestions: 47,
    correctAnswers: 40,
    accuracy: 85,
    streak: 3,
    timeSpent: 120, // minutes
    topicsProgress: [
      { name: 'Algebra', progress: 75, mastery: 'Intermediate', questionsCompleted: 25, lastPracticed: '2024-01-15' },
      { name: 'Geometry', progress: 60, mastery: 'Beginner', questionsCompleted: 18, lastPracticed: '2024-01-14' },
      { name: 'Trigonometry', progress: 90, mastery: 'Advanced', questionsCompleted: 32, lastPracticed: '2024-01-13' },
      { name: 'Calculus', progress: 30, mastery: 'Beginner', questionsCompleted: 8, lastPracticed: '2024-01-10' },
      { name: 'Arithmetic', progress: 95, mastery: 'Advanced', questionsCompleted: 42, lastPracticed: '2024-01-15' }
    ],
    recentActivity: [
      { date: '2024-01-15', topic: 'Algebra', questions: 5, correct: 4, timeSpent: 12 },
      { date: '2024-01-14', topic: 'Geometry', questions: 3, correct: 3, timeSpent: 8 },
      { date: '2024-01-13', topic: 'Trigonometry', questions: 4, correct: 3, timeSpent: 15 },
      { date: '2024-01-12', topic: 'Algebra', questions: 6, correct: 5, timeSpent: 18 },
      { date: '2024-01-11', topic: 'Arithmetic', questions: 5, correct: 5, timeSpent: 10 }
    ],
    achievements: [
      { name: 'First Steps', description: 'Completed your first assessment', earned: true, earnedDate: '2024-01-10' },
      { name: 'Streak Master', description: '7-day practice streak', earned: false, progress: 3 },
      { name: 'Algebra Expert', description: '90% accuracy in algebra', earned: false, progress: 80 },
      { name: 'Speed Demon', description: 'Solved 10 questions in 5 minutes', earned: true, earnedDate: '2024-01-12' },
      { name: 'Perfect Score', description: 'Got 100% on any assessment', earned: false, progress: 0 },
      { name: 'Geometry Master', description: 'Complete 50 geometry problems', earned: false, progress: 18 }
    ],
    weeklyGoal: { target: 50, completed: 32 },
    studyStreak: { current: 3, longest: 7 }
  });

  const getMasteryColor = (mastery: string) => {
    switch (mastery) {
      case 'Advanced': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Beginner': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getWeakAreas = () => {
    return progressData.topicsProgress.filter(topic => topic.progress < 70);
  };

  const getTopPerformers = () => {
    return progressData.topicsProgress.filter(topic => topic.progress >= 80);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Learning Progress</h2>
        <p className="text-gray-600">Track your mathematics journey and achievements</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Questions Solved</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{progressData.totalQuestions}</div>
            <p className="text-xs text-muted-foreground">
              {progressData.correctAnswers} correct answers
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Accuracy Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{progressData.accuracy}%</div>
            <p className="text-xs text-muted-foreground">
              +2% from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{progressData.studyStreak.current} days</div>
            <p className="text-xs text-muted-foreground">
              Best: {progressData.studyStreak.longest} days
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Weekly Goal</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{progressData.weeklyGoal.completed}/{progressData.weeklyGoal.target}</div>
            <Progress 
              value={(progressData.weeklyGoal.completed / progressData.weeklyGoal.target) * 100} 
              className="mt-2" 
            />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="topics">Topics</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Weak Areas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-orange-500" />
                  Areas for Improvement
                </CardTitle>
                <CardDescription>Topics that need more practice</CardDescription>
              </CardHeader>
              <CardContent>
                {getWeakAreas().length === 0 ? (
                  <p className="text-center text-gray-500 py-4">Great job! No weak areas detected.</p>
                ) : (
                  <div className="space-y-3">
                    {getWeakAreas().map((topic, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                        <div>
                          <div className="font-medium text-orange-900">{topic.name}</div>
                          <div className="text-sm text-orange-700">{topic.progress}% complete</div>
                        </div>
                        <Button size="sm" variant="outline">
                          Practice Now
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Top Performers */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-green-500" />
                  Strong Areas
                </CardTitle>
                <CardDescription>Topics where you excel</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {getTopPerformers().map((topic, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div>
                        <div className="font-medium text-green-900">{topic.name}</div>
                        <div className="text-sm text-green-700">{topic.progress}% complete</div>
                      </div>
                      <Badge className="bg-green-100 text-green-800">
                        {topic.mastery}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="topics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Topic Mastery
              </CardTitle>
              <CardDescription>Your progress across different math topics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {progressData.topicsProgress.map((topic, index) => (
                  <div key={index} className="space-y-3 p-4 border rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-medium text-lg">{topic.name}</span>
                        <p className="text-sm text-gray-500">
                          {topic.questionsCompleted} questions • Last practiced: {topic.lastPracticed}
                        </p>
                      </div>
                      <Badge className={getMasteryColor(topic.mastery)}>
                        {topic.mastery}
                      </Badge>
                    </div>
                    <Progress value={topic.progress} className="h-3" />
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>{topic.progress}% complete</span>
                      <span>{100 - topic.progress}% remaining</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest practice sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {progressData.recentActivity.map((activity, index) => (
                  <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-blue-100 rounded-full">
                        <Calculator className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium">{activity.topic}</div>
                        <div className="text-sm text-gray-500">{activity.date}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">
                        {activity.correct}/{activity.questions} ({Math.round((activity.correct / activity.questions) * 100)}%)
                      </div>
                      <div className="text-sm text-gray-500">
                        {activity.timeSpent} min
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                Achievements
              </CardTitle>
              <CardDescription>Your learning milestones and goals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {progressData.achievements.map((achievement, index) => (
                  <div key={index} className={`p-4 rounded-lg border ${
                    achievement.earned ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                  }`}>
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-full ${
                        achievement.earned ? 'bg-green-500' : 'bg-gray-400'
                      }`}>
                        <Trophy className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className={`font-medium ${
                          achievement.earned ? 'text-green-900' : 'text-gray-700'
                        }`}>
                          {achievement.name}
                        </div>
                        <div className={`text-sm ${
                          achievement.earned ? 'text-green-700' : 'text-gray-500'
                        }`}>
                          {achievement.description}
                        </div>
                        {achievement.earned ? (
                          <Badge className="mt-2 bg-green-100 text-green-800">
                            Earned {achievement.earnedDate}
                          </Badge>
                        ) : achievement.progress !== undefined ? (
                          <div className="mt-2">
                            <Progress value={achievement.progress} className="h-2" />
                            <div className="text-xs text-gray-500 mt-1">
                              {achievement.progress}% complete
                            </div>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
