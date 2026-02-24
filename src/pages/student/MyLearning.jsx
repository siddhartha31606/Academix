import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { BookOpen, Play } from 'lucide-react';
import { demoEnrollments, demoCourses, demoLessons } from '@/data/mock-data';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

const MyLearning = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [enrollments, setEnrollments] = useState(
    demoEnrollments.filter(e => e.userId === user?.id).map(e => ({
      ...e,
      course: demoCourses.find(c => c.id === e.courseId),
      lessons: demoLessons.filter(l => l.courseId === e.courseId),
    }))
  );

  const [completedLessons, setCompletedLessons] = useState(
    new Set(demoLessons.filter(l => l.completed).map(l => l.id))
  );

  const handleCompleteLesson = (lessonId, courseId) => {
    setCompletedLessons(prev => {
      const next = new Set(prev);
      next.add(lessonId);
      return next;
    });
    toast({ title: 'Lesson Complete!', description: 'Keep up the great work! 🎉' });
  };

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="mb-6">
        <h1 className="heading-lg text-gradient">My Learning</h1>
        <p className="text-muted-foreground text-lg mt-2">Continue where you left off</p>
      </div>

      {enrollments.length === 0 ? (
        <Card className="card-base">
          <CardContent className="pt-12 pb-12 text-center">
            <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-4">You haven't enrolled in any courses yet.</p>
            <Button onClick={() => window.location.href = '/courses'}>Browse Courses</Button>
          </CardContent>
        </Card>
      ) : (
        enrollments.map(enrollment => (
          <Card key={enrollment.id} className="card-base hover:shadow-md transition-all">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="heading-sm">{enrollment.course?.title}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">{enrollment.course?.instructorName} · {enrollment.course?.category}</p>
                </div>
                <Badge className="bg-primary/20 text-primary text-xs font-semibold">{enrollment.progress}% complete</Badge>
              </div>
              <Progress value={enrollment.progress} className="mt-4" />
            </CardHeader>
            <CardContent>
              {enrollment.lessons.length === 0 ? (
                <p className="text-muted-foreground">No lessons available yet.</p>
              ) : (
                <div className="space-y-3">
                  {enrollment.lessons.map(lesson => {
                    const isComplete = completedLessons.has(lesson.id);
                    return (
                      <div key={lesson.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-all">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                            isComplete ? 'bg-success/20 text-success' : 'bg-primary/10 text-primary'
                          }`}>
                            {isComplete ? '✓' : lesson.order}
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{lesson.title}</p>
                            <p className="text-xs text-muted-foreground">{lesson.contentType}{lesson.duration ? ` · ${lesson.duration}` : ''}</p>
                          </div>
                        </div>
                        {!isComplete && (
                          <Button size="sm" onClick={() => handleCompleteLesson(lesson.id, enrollment.courseId)} className="whitespace-nowrap">
                            <Play className="h-4 w-4 mr-2" />
                            Start
                          </Button>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default MyLearning;
