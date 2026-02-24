import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { analyticsData } from '@/data/mock-data';
import { useAuth } from '@/contexts/AuthContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';

const CHART_COLORS = ['hsl(174, 62%, 32%)', 'hsl(38, 92%, 55%)', 'hsl(210, 80%, 55%)', 'hsl(152, 60%, 40%)', 'hsl(340, 65%, 55%)', 'hsl(270, 60%, 55%)'];

const Analytics = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">{isAdmin ? 'Platform Analytics' : 'Performance Analytics'}</h1>
        <p className="text-muted-foreground mt-1">{isAdmin ? 'Comprehensive platform metrics' : 'Track your course performance'}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Users', value: analyticsData.totalUsers.toLocaleString() },
          { label: 'Active Students', value: analyticsData.activeStudents.toLocaleString() },
          { label: 'Completion Rate', value: `${analyticsData.completionRate}%` },
          { label: 'Total Revenue', value: `$${(analyticsData.revenue / 1000).toFixed(1)}k` },
        ].map((stat, i) => (
          <Card key={i}>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="text-2xl font-bold mt-2">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Enrollment Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analyticsData.monthlyEnrollments || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="enrollments" stroke="hsl(210, 80%, 55%)" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analyticsData.userGrowth || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="users" fill="hsl(174, 62%, 32%)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Courses by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={analyticsData.coursesByCategory || []} cx="50%" cy="50%" label={(entry) => entry.category} outerRadius={100} fill="#8884d8" dataKey="value">
                  {(analyticsData.coursesByCategory || []).map((_, i) => (
                    <Cell key={`cell-${i}`} fill={CHART_COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
