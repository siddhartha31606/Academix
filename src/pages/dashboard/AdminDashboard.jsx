import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, BookOpen, TrendingUp, DollarSign, ClipboardCheck, ChevronRight } from 'lucide-react';
import { analyticsData, demoCourses } from '@/data/mock-data';
import { Course } from '@/types/lms';
import { useToast } from '@/hooks/use-toast';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const CHART_COLORS = [
  'hsl(174, 62%, 32%)',
  'hsl(38, 92%, 55%)',
  'hsl(210, 80%, 55%)',
  'hsl(152, 60%, 40%)',
  'hsl(340, 65%, 55%)',
  'hsl(270, 60%, 55%)',
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [courses, setCourses] = useState(demoCourses);
  const pendingCourses = courses.filter(c => c.status === 'pending');

  const handleApprove = (courseId) => {
    setCourses(prev => prev.map(c => c.id === courseId ? { ...c, status: 'approved' } : c));
    const course = courses.find(c => c.id === courseId);
    toast({ title: 'Course Approved', description: `"${course?.title}" has been approved and published.` });
  };

  const handleReject = (courseId) => {
    setCourses(prev => prev.map(c => c.id === courseId ? { ...c, status: 'rejected' } : c));
    const course = courses.find(c => c.id === courseId);
    toast({ title: 'Course Rejected', description: `"${course?.title}" has been rejected.`, variant: 'destructive' });
  };

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="mb-8">
        <h1 className="heading-lg text-gradient">Platform Dashboard</h1>
        <p className="text-muted-foreground text-lg mt-2">Overview, analytics, and management tools</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: 'Total Users', value: analyticsData.totalUsers.toLocaleString(), icon: Users, change: '+12%', color: 'text-primary' },
          { label: 'Total Courses', value: analyticsData.totalCourses, icon: BookOpen, change: '+8%', color: 'text-info' },
          { label: 'Enrollments', value: analyticsData.totalEnrollments.toLocaleString(), icon: TrendingUp, change: '+23%', color: 'text-success' },
          { label: 'Revenue', value: `$${(analyticsData.revenue / 1000).toFixed(1)}k`, icon: DollarSign, change: '+18%', color: 'text-accent' },
        ].map((stat, i) => (
          <Card key={i} className="card-base hover:shadow-md transition-all">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{stat.label}</p>
                  <p className="text-3xl font-bold mt-2">{stat.value}</p>
                  <p className="text-xs text-success font-semibold mt-3">{stat.change} this month</p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Card className="card-base">
          <CardHeader>
            <CardTitle className="heading-sm flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              User Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-5">Manage platform users, roles, and permissions.</p>
            <Button onClick={() => navigate('/users')} className="w-full">
              Manage Users
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </CardContent>
        </Card>

        <Card className="card-base">
          <CardHeader>
            <CardTitle className="heading-sm flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Course Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-5">Review, edit, and manage all courses on the platform.</p>
            <Button onClick={() => navigate('/admin-courses')} className="w-full">
              Manage Courses
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="card-base">
          <CardHeader>
            <CardTitle className="heading-sm">Monthly Enrollments</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analyticsData.monthlyEnrollments}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="enrollments" stroke="hsl(220, 90%, 56%)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="card-base">
          <CardHeader>
            <CardTitle className="heading-sm">User Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analyticsData.userGrowth}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="users" fill="hsl(220, 90%, 56%)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 card-base">
          <CardHeader>
            <CardTitle className="heading-sm">Courses by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={analyticsData.coursesByCategory} cx="50%" cy="50%" label={(entry) => entry.category} outerRadius={100} fill="#8884d8" dataKey="value">
                  {analyticsData.coursesByCategory.map((_, i) => (
                    <Cell key={`cell-${i}`} fill={CHART_COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="card-base">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="heading-sm flex items-center gap-2">
                <ClipboardCheck className="h-5 w-5 text-primary" />
                Approvals
              </CardTitle>
              <Badge variant="outline" className="text-xs">{pendingCourses.length}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            {pendingCourses.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">All courses reviewed! ✨</p>
            ) : (
              <div className="space-y-3">
                {pendingCourses.slice(0, 3).map(course => (
                  <div key={course.id} className="text-sm border-b pb-3 last:border-b-0">
                    <p className="font-semibold text-foreground">{course.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">by {course.instructorName}</p>
                    <div className="flex gap-2 mt-3">
                      <Button variant="outline" size="sm" className="flex-1 text-xs" onClick={() => handleApprove(course.id)}>Approve</Button>
                      <Button variant="destructive" size="sm" className="flex-1 text-xs" onClick={() => handleReject(course.id)}>Reject</Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
