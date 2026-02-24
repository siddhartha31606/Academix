import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { BookOpen, Users, FileText, TrendingUp, Plus, X } from 'lucide-react';
import { demoCourses, demoSubmissions } from '@/data/mock-data';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Course, Submission } from '@/types/lms';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';

const InstructorDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [courses, setCourses] = useState(demoCourses);
  const [submissions, setSubmissions] = useState(demoSubmissions);
  const [showNewCourse, setShowNewCourse] = useState(false);
  const [newCourseTitle, setNewCourseTitle] = useState('');
  const [newCourseDesc, setNewCourseDesc] = useState('');
  const [gradingSubmission, setGradingSubmission] = useState(null);
  const [gradeScore, setGradeScore] = useState('');
  const [gradeFeedback, setGradeFeedback] = useState('');

  const myCourses = courses.filter(c => c.instructorId === user?.id);
  const pendingSubmissions = submissions.filter(s => s.status === 'submitted');
  const totalStudents = myCourses.reduce((sum, c) => sum + c.enrollmentCount, 0);

  const coursePerformance = myCourses.filter(c => c.status === 'published').map(c => ({
    name: c.title.length > 20 ? c.title.slice(0, 20) + '…' : c.title,
    students: c.enrollmentCount,
  }));

  const statusColors = {
    published: 'bg-success/10 text-success',
    draft: 'bg-muted text-muted-foreground',
    pending: 'bg-warning/10 text-warning',
  };

  const handleCreateCourse = () => {
    if (!newCourseTitle.trim()) return;
    const newCourse = {
      id: `c${Date.now()}`,
      title: newCourseTitle,
      description: newCourseDesc,
      instructorId: user?.id || '',
      instructorName: user?.name || '',
      status: 'draft',
      category: 'General',
      tags: [],
      enrollmentCount: 0,
      lessonCount: 0,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };
    setCourses(prev => [...prev, newCourse]);
    setShowNewCourse(false);
    setNewCourseTitle('');
    setNewCourseDesc('');
    toast({ title: 'Course Created', description: `"${newCourseTitle}" saved.` });
  };

  const handleGrade = () => {
    if (!gradingSubmission || !gradeScore) return;
    const score = parseInt(gradeScore);
    if (isNaN(score) || score < 0 || score > 100) {
      toast({ title: 'Invalid Score', description: 'Please enter a score between 0 and 100.', variant: 'destructive' });
      return;
    }
    setSubmissions(prev => prev.map(s =>
      s.id === gradingSubmission.id ? { ...s, status: 'graded', grade: score, feedback: gradeFeedback } : s
    ));
    toast({ title: 'Submission Graded', description: `${gradingSubmission.studentName} received ${score}/100.` });
    setGradingSubmission(null);
    setGradeScore('');
    setGradeFeedback('');
  };

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">Instructor Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage your courses and students</p>
        </div>
        <Button size="lg" onClick={() => setShowNewCourse(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Course
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'My Courses', value: myCourses.length, icon: BookOpen, color: 'text-primary' },
          { label: 'Total Students', value: totalStudents, icon: Users, color: 'text-info' },
          { label: 'Pending Reviews', value: pendingSubmissions.length, icon: FileText, color: 'text-warning' },
          { label: 'Avg. Completion', value: '72%', icon: TrendingUp, color: 'text-success' },
        ].map((stat, i) => (
          <Card key={i}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color} opacity-50`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Students per Course</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={coursePerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="students" fill="hsl(210, 80%, 55%)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>My Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {myCourses.map(course => (
                  <div key={course.id} onClick={() => navigate('/my-courses')} className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-accent transition">
                    <div>
                      <h3 className="font-semibold">{course.title}</h3>
                      <p className="text-sm text-muted-foreground">{course.lessonCount} lessons · {course.enrollmentCount} students</p>
                    </div>
                    <Badge className={course.status === 'published' ? 'bg-green-500' : 'bg-yellow-500'}>
                      {course.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Submissions to Review
            </CardTitle>
          </CardHeader>
          <CardContent>
            {pendingSubmissions.length === 0 ? (
              <p className="text-sm text-muted-foreground">All submissions reviewed! 🎉</p>
            ) : (
              <div className="space-y-2">
                {pendingSubmissions.map(sub => (
                  <div key={sub.id} className="text-sm border-b pb-2 last:border-b-0">
                    <p className="font-semibold">{sub.studentName}</p>
                    <p className="text-xs text-muted-foreground">Submitted {sub.submittedAt}</p>
                    <Button variant="outline" size="sm" className="mt-2 w-full" onClick={() => { setGradingSubmission(sub); setGradeScore(''); setGradeFeedback(''); }}>Grade</Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Dialog open={showNewCourse} onOpenChange={setShowNewCourse}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Course</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="courseTitle">Course Title</Label>
              <Input
                id="courseTitle"
                value={newCourseTitle}
                onChange={(e) => setNewCourseTitle(e.target.value)}
                placeholder="Enter course title"
              />
            </div>
            <div>
              <Label htmlFor="courseDesc">Description</Label>
              <Textarea
                id="courseDesc"
                value={newCourseDesc}
                onChange={(e) => setNewCourseDesc(e.target.value)}
                rows={3}
                placeholder="Course description"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewCourse(false)}>Cancel</Button>
            <Button onClick={handleCreateCourse}>Create Course</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!gradingSubmission} onOpenChange={() => setGradingSubmission(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Grade Submission</DialogTitle>
          </DialogHeader>
          {gradingSubmission && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">Grading {gradingSubmission.studentName}'s submission</p>
              <div>
                <Label htmlFor="gradeScore">Score (0-100)</Label>
                <Input
                  id="gradeScore"
                  type="number"
                  value={gradeScore}
                  onChange={(e) => setGradeScore(e.target.value)}
                  placeholder="0"
                />
              </div>
              <div>
                <Label htmlFor="gradeFeedback">Feedback</Label>
                <Textarea
                  id="gradeFeedback"
                  value={gradeFeedback}
                  onChange={(e) => setGradeFeedback(e.target.value)}
                  rows={3}
                  placeholder="Provide feedback..."
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setGradingSubmission(null)}>Cancel</Button>
            <Button onClick={handleGrade}>Submit Grade</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InstructorDashboard;
