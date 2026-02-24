import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ClipboardCheck } from 'lucide-react';
import { demoCourses } from '@/data/mock-data';
import { Course } from '@/types/lms';
import { useToast } from '@/hooks/use-toast';

const Approvals = () => {
  const { toast } = useToast();
  const [courses, setCourses] = useState(demoCourses);
  const pendingCourses = courses.filter(c => c.status === 'pending');
  const reviewedCourses = courses.filter(c => c.status === 'approved' || c.status === 'rejected');

  const handleApprove = (id) => {
    const course = courses.find(c => c.id === id);
    setCourses(prev => prev.map(c => c.id === id ? { ...c, status: 'approved' } : c));
    toast({ title: 'Course Approved', description: `"${course?.title}" is now approved.` });
  };

  const handleReject = (id) => {
    const course = courses.find(c => c.id === id);
    setCourses(prev => prev.map(c => c.id === id ? { ...c, status: 'rejected' } : c));
    toast({ title: 'Course Rejected', description: `"${course?.title}" has been rejected.`, variant: 'destructive' });
  };

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="mb-6">
        <h1 className="heading-lg text-gradient flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <ClipboardCheck className="h-6 w-6 text-primary" />
          </div>
          Course Approvals
        </h1>
        <p className="text-muted-foreground text-lg mt-2">Review and approve course submissions</p>
      </div>

      <Card className="card-base">
        <CardHeader>
          <CardTitle className="heading-sm">
            Pending Review ({pendingCourses.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {pendingCourses.length === 0 ? (
            <p className="text-muted-foreground">No courses pending review. All caught up! 🎉</p>
          ) : (
            <div className="space-y-4">
              {pendingCourses.map(course => (
                <div key={course.id} className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-all">
                  <div className="mb-4">
                    <h3 className="font-bold text-lg">{course.title}</h3>
                    <p className="text-sm text-muted-foreground">by {course.instructorName} · {course.category}</p>
                    <p className="text-foreground mt-3 leading-relaxed">{course.description}</p>
                    <p className="text-xs text-muted-foreground mt-3 font-medium">{course.lessonCount} lessons · Submitted {course.createdAt}</p>
                  </div>
                  <div className="flex gap-3">
                    <Button className="flex-1" onClick={() => handleApprove(course.id)}>Approve</Button>
                    <Button variant="destructive" className="flex-1" onClick={() => handleReject(course.id)}>Reject</Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {reviewedCourses.length > 0 && (
        <Card className="card-base">
          <CardHeader>
            <CardTitle className="heading-sm">Recently Reviewed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {reviewedCourses.slice(0, 5).map(course => (
                <div key={course.id} className="flex justify-between items-center py-3 border-b border-border last:border-b-0">
                  <div>
                    <p className="font-semibold text-foreground">{course.title}</p>
                    <p className="text-xs text-muted-foreground">by {course.instructorName}</p>
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-lg ${
                    course.status === 'approved' ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'
                  }`}>
                    {course.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Approvals;
