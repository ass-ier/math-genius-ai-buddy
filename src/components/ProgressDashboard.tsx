
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Trophy, Target, Clock, TrendingUp, BookOpen, Star } from "lucide-react";

export const ProgressDashboard = () => {
  const progressData = {
    totalQuestions: 47,
    correctAnswers: 40,
    accuracy: 85,
    streak: 3,
    timeSpent: 120, // minutes
    topicsProgress: [
      { name: 'Algebra', progress: 75, mastery: 'Intermediate' },
      { name: 'Geometry', progress: 60, mastery: 'Beginner' },
      { name: 'Trigonometry', progress: 90, mastery: 'Advanced' },
      { name: 'Calculus', progress: 30, mastery: 'Beginner' },
      { name: 'Arithmetic', progress: 95, mastery: 'Advanced' }
    ],
    recentActivity: [
      { date: '2024-01-15', topic: 'Algebra', questions: 5, correct: 4 },
      { date: '2024-01-14', topic: 'Geometry', questions: 3, correct: 3 },
      { date: '2024-01-13', topic: 'Trigonometry', questions: 4, correct: 3 },
      { date: '2024-01-12', topic: 'Algebra', questions: 6, correct: 5 }
    ],
    achievements: [
      { name: 'First Steps', description: 'Completed your first assessment', earned: true },
      { name: 'Streak Master', description: '7-day practice streak', earned: false },
      { name: 'Algebra Expert', description: '90% accuracy in algebra', earned: false },
      { name: 'Speed Demon', description: 'Solved 10 questions in 5 minutes', earned: true }
    ]
  };

  const getMasteryColor = (mastery: string) => {
    switch (mastery) {
      case 'Advanced': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Beginner': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
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
            <div className="text-2xl font-bold">{progressData.streak} days</div>
            <p className="text-xs text-muted-foreground">
              Keep it up!
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Time Spent</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.floor(progressData.timeSpent / 60)}h {progressData.timeSpent % 60}m</div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Topic Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Topic Mastery
          </CardTitle>
          <CardDescription>Your progress across different math topics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {progressData.topicsProgress.map((topic, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{topic.name}</span>
                  <Badge className={getMasteryColor(topic.mastery)}>
                    {topic.mastery}
                  </Badge>
                </div>
                <Progress value={topic.progress} className="h-2" />
                <div className="text-sm text-gray-500 text-right">
                  {topic.progress}% complete
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest practice sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {progressData.recentActivity.map((activity, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium">{activity.topic}</div>
                    <div className="text-sm text-gray-500">{activity.date}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{activity.correct}/{activity.questions}</div>
                    <div className="text-sm text-gray-500">
                      {Math.round((activity.correct / activity.questions) * 100)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              Achievements
            </CardTitle>
            <CardDescription>Your learning milestones</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {progressData.achievements.map((achievement, index) => (
                <div key={index} className={`flex items-center gap-3 p-3 rounded-lg ${
                  achievement.earned ? 'bg-green-50 border border-green-200' : 'bg-gray-50'
                }`}>
                  <div className={`p-2 rounded-full ${
                    achievement.earned ? 'bg-green-500' : 'bg-gray-400'
                  }`}>
                    <Trophy className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className={`font-medium ${
                      achievement.earned ? 'text-green-900' : 'text-gray-600'
                    }`}>
                      {achievement.name}
                    </div>
                    <div className={`text-sm ${
                      achievement.earned ? 'text-green-700' : 'text-gray-500'
                    }`}>
                      {achievement.description}
                    </div>
                  </div>
                  {achievement.earned && (
                    <Badge className="bg-green-100 text-green-800">Earned</Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
