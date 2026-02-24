import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { FileText, Upload } from 'lucide-react';
import { demoAssignments, demoCourses, demoSubmissions } from '@/data/mock-data';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Assignments = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [submittedIds, setSubmittedIds] = useState(
    new Set(demoSubmissions.filter(s => s.studentId === user?.id).map(s => s.assignmentId))
  );
  const [submitting, setSubmitting] = useState(null);
  const [submissionText, setSubmissionText] = useState('');

  const handleSubmit = (assignmentId) => {
    setSubmittedIds(prev => new Set(prev).add(assignmentId));
    setSubmitting(null);
    setSubmissionText('');
    toast({ title: 'Assignment Submitted!', description: 'Your submission has been received.' });
  };

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="mb-6">
        <h1 className="heading-lg text-gradient">Assignments</h1>
        <p className="text-muted-foreground text-lg mt-2">View and submit your assignments</p>
      </div>

      <div className="space-y-4">
        {demoAssignments.map(assignment => {
          const course = demoCourses.find(c => c.id === assignment.courseId);
          const isSubmitted = submittedIds.has(assignment.id);
          const isPastDue = new Date(assignment.dueDate) < new Date();
          return (
            <Card key={assignment.id} className="card-base hover:shadow-md transition-all">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{assignment.title}</h3>
                        <p className="text-xs text-muted-foreground">{course?.title}</p>
                      </div>
                    </div>
                    <p className="text-sm text-foreground mb-4 leading-relaxed">{assignment.description}</p>
                    <div className="flex gap-6 text-sm">
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Due Date</p>
                        <p className="text-foreground font-medium mt-1">{assignment.dueDate}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Max Score</p>
                        <p className="text-foreground font-medium mt-1">{assignment.maxScore}</p>
                      </div>
                    </div>
                  </div>
                  <div className="pl-4 flex flex-col items-end gap-2">
                    {isSubmitted ? (
                      <div className="px-3 py-1.5 bg-success/10 border border-success/30 rounded-lg text-sm font-semibold text-success">
                        ✓ Submitted
                      </div>
                    ) : isPastDue ? (
                      <div className="px-3 py-1.5 bg-warning/10 border border-warning/30 rounded-lg text-sm font-semibold text-warning">
                        Past Due
                      </div>
                    ) : (
                      <Button onClick={() => setSubmitting(assignment.id)} className="whitespace-nowrap">
                        <Upload className="h-4 w-4 mr-2" />
                        Submit
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Dialog open={!!submitting} onOpenChange={() => setSubmitting(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Submit Assignment</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="work">Your Work</Label>
              <Textarea
                id="work"
                value={submissionText}
                onChange={(e) => setSubmissionText(e.target.value)}
                rows={5}
                placeholder="Enter your assignment response..."
              />
            </div>
            <p className="text-xs text-muted-foreground">In a production app, you would also upload files here.</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSubmitting(null)}>Cancel</Button>
            <Button onClick={() => submitting && handleSubmit(submitting)}>Submit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Assignments;
