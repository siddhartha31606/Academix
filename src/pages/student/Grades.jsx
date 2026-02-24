import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { demoSubmissions, demoAssignments, demoCourses } from '@/data/mock-data';
import { useAuth } from '@/contexts/AuthContext';

const Grades = () => {
  const { user } = useAuth();
  const mySubmissions = demoSubmissions.filter(s => s.studentId === user?.id);

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="mb-6">
        <h1 className="heading-lg text-gradient">My Grades</h1>
        <p className="text-muted-foreground text-lg mt-2">View your grades and feedback</p>
      </div>

      {mySubmissions.length === 0 ? (
        <Card className="card-base">
          <CardContent className="pt-12 pb-12 text-center">
            <p className="text-muted-foreground">No submissions yet.</p>
          </CardContent>
        </Card>
      ) : (
        <Card className="card-base">
          <CardContent className="pt-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2">Assignment</th>
                    <th className="text-left py-3 px-2">Course</th>
                    <th className="text-left py-3 px-2">Status</th>
                    <th className="text-left py-3 px-2">Grade</th>
                    <th className="text-left py-3 px-2">Feedback</th>
                  </tr>
                </thead>
                <tbody>
                  {mySubmissions.map(sub => {
                    const assignment = demoAssignments.find(a => a.id === sub.assignmentId);
                    const course = assignment ? demoCourses.find(c => c.id === assignment.courseId) : null;
                    const statusColors = {
                      submitted: 'bg-info/10 text-info',
                      graded: 'bg-success/10 text-success',
                      late: 'bg-destructive/10 text-destructive',
                    };
                    return (
                      <tr key={sub.id} className="border-b hover:bg-accent/50 transition">
                        <td className="py-3 px-2 font-medium">{assignment?.title || 'Unknown'}</td>
                        <td className="py-3 px-2">{course?.title || 'Unknown'}</td>
                        <td className="py-3 px-2">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${statusColors[sub.status]}`}>
                            {sub.status}
                          </span>
                        </td>
                        <td className="py-3 px-2 font-semibold">
                          {sub.grade !== undefined ? (
                            <span>{sub.grade}/100</span>
                          ) : (
                            <span className="text-muted-foreground">Pending</span>
                          )}
                        </td>
                        <td className="py-3 px-2 text-muted-foreground text-sm">{sub.feedback || '—'}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Grades;
