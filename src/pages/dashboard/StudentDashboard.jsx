import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Clock, Award, TrendingUp, Bell } from 'lucide-react';
import { demoEnrollments, demoCourses, demoSubmissions, demoNotifications } from '@/data/mock-data';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const myEnrollments = demoEnrollments.filter(e => e.userId === user?.id).map(e => ({
    ...e,
    course: demoCourses.find(c => c.id === e.courseId),
  }));

  const avgProgress = myEnrollments.length > 0
    ? Math.round(myEnrollments.reduce((sum, e) => sum + e.progress, 0) / myEnrollments.length)
    : 0;

  const recentGrades = demoSubmissions.filter(s => s.studentId === user?.id && s.status === 'graded');

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="mb-8">
        <h1 className="heading-lg text-gradient">Welcome, {user?.name?.split(' ')[0]}! 👋</h1>
        <p className="text-muted-foreground text-lg mt-2">Track your learning progress and stay motivated</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: 'Enrolled Courses', value: myEnrollments.length, icon: BookOpen, color: 'text-primary' },
          { label: 'Avg Progress', value: `${avgProgress}%`, icon: TrendingUp, color: 'text-success' },
          { label: 'Assignments Due', value: 2, icon: Clock, color: 'text-warning' },
          { label: 'Certificates', value: 1, icon: Award, color: 'text-accent' },
        ].map((stat, i) => (
          <Card key={i} className="card-base hover:shadow-md transition-all">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{stat.label}</p>
                  <p className="text-3xl font-bold mt-2">{stat.value}</p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="card-base">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="heading-sm">Continue Learning</CardTitle>
                <Button variant="outline" onClick={() => navigate('/my-learning')} className="text-xs">View All</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {myEnrollments.length > 0 ? (
                  myEnrollments.map(enrollment => (
                    <div key={enrollment.id} onClick={() => navigate('/my-learning')} className="card-hover">
                      <div className="mb-3">
                        <h3 className="font-semibold text-foreground">{enrollment.course?.title}</h3>
                        <p className="text-xs text-muted-foreground">{enrollment.course?.instructorName}</p>
                      </div>
                      <Progress value={enrollment.progress} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-2 font-medium">{enrollment.progress}% Complete</p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-8">No courses yet. Start learning today!</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="card-base">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg font-semibold">Recent Grades</CardTitle>
                <Button variant="outline" size="sm" onClick={() => navigate('/grades')} className="text-xs">All</Button>
              </div>
            </CardHeader>
            <CardContent>
              {recentGrades.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-6">No graded submissions yet.</p>
              ) : (
                <div className="space-y-4">
                  {recentGrades.map(g => (
                    <div key={g.id} className="border-l-4 border-accent pl-4">
                      <p className="text-xs text-muted-foreground">Assignment #{g.assignmentId.slice(1)}</p>
                      <p className="font-bold text-2xl text-primary mt-1">{g.grade}/100</p>
                      <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{g.feedback}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="card-base">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {demoNotifications.filter(n => n.userId === user?.id).slice(0, 3).length > 0 ? (
                  demoNotifications.filter(n => n.userId === user?.id).slice(0, 3).map(n => (
                    <div key={n.id} className="text-sm pb-3 border-b last:border-b-0 last:pb-0">
                      <p className="font-semibold text-foreground">{n.title}</p>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{n.message}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">No new notifications</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
