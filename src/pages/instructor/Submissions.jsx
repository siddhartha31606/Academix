import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { FileText, Plus } from 'lucide-react';
import { demoSubmissions, demoAssignments } from '@/data/mock-data';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Submissions = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [submissions, setSubmissions] = useState(demoSubmissions);
  const [gradingSub, setGradingSub] = useState(null);
  const [score, setScore] = useState('');
  const [feedback, setFeedback] = useState('');

  const pending = submissions.filter(s => s.status === 'submitted');
  const graded = submissions.filter(s => s.status === 'graded');
  const late = submissions.filter(s => s.status === 'late');

  const handleGrade = () => {
    if (!gradingSub || !score) return;
    const numScore = parseInt(score);
    if (isNaN(numScore) || numScore < 0 || numScore > 100) {
      toast({ title: 'Invalid Score', description: 'Enter 0-100.', variant: 'destructive' });
      return;
    }
    setSubmissions(prev => prev.map(s =>
      s.id === gradingSub.id ? { ...s, status: 'graded', grade: numScore, feedback } : s
    ));
    toast({ title: 'Graded', description: `${gradingSub.studentName} scored ${numScore}/100.` });
    setGradingSub(null);
    setScore('');
    setFeedback('');
  };

  const statusColors = {
    submitted: 'bg-info/10 text-info',
    graded: 'bg-success/10 text-success',
    late: 'bg-destructive/10 text-destructive',
  };

  const renderList = (subs) => (
    <Card className="card-base mb-6">
      <CardContent className="pt-6">
        {subs.length === 0 ? (
          <p className="text-muted-foreground text-sm">No submissions.</p>
        ) : (
          <div className="space-y-3">
            {subs.map(sub => (
              <div key={sub.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-all">
                <div>
                  <p className="font-medium">{sub.studentName}</p>
                  <p className="text-xs text-muted-foreground">Submitted {sub.submittedAt}</p>
                  {sub.grade !== undefined && <p className="text-sm mt-1">Score: {sub.grade}/100</p>}
                  {sub.feedback && <p className="text-sm text-muted-foreground mt-1">{sub.feedback}</p>}
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${statusColors[sub.status]}`}>
                    {sub.status}
                  </span>
                  {sub.status !== 'graded' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setGradingSub(sub);
                        setScore('');
                        setFeedback('');
                      }}
                    >
                      Grade
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="mb-6">
        <h1 className="heading-lg text-gradient">Submissions</h1>
        <p className="text-muted-foreground text-lg mt-2">Review and grade student submissions</p>
      </div>

      <h2 className="heading-sm text-foreground">Pending ({pending.length})</h2>
      {renderList(pending)}

      <h2 className="heading-sm text-foreground">Late ({late.length})</h2>
      {renderList(late)}

      <h2 className="heading-sm text-foreground">Graded ({graded.length})</h2>
      {renderList(graded)}

      <Dialog open={!!gradingSub} onOpenChange={() => setGradingSub(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Grade Submission</DialogTitle>
          </DialogHeader>

          {gradingSub && (
            <div className="space-y-4">
              <div>
                <Label>Grading {gradingSub.studentName}</Label>
              </div>

              <div>
                <Label htmlFor="score">Score (0-100)</Label>
                <Input
                  id="score"
                  type="number"
                  value={score}
                  onChange={(e) => setScore(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="feedback">Feedback</Label>
                <Textarea
                  id="feedback"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  rows={3}
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setGradingSub(null)}>
              Cancel
            </Button>
            <Button onClick={handleGrade}>
              Submit Grade
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Submissions;