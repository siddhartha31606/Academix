import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Megaphone, Plus } from 'lucide-react';
import { demoAnnouncements, demoCourses } from '@/data/mock-data';
import { useAuth } from '@/contexts/AuthContext';
import { Announcement } from '@/types/lms';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Announcements = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [announcements, setAnnouncements] = useState(demoAnnouncements);
  const [showNew, setShowNew] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [courseId, setCourseId] = useState('');

  const myCourses = demoCourses.filter(c => c.instructorId === user?.id);

  const handlePost = () => {
    if (!title.trim() || !content.trim()) return;
    const newAnn = {
      id: `ann${Date.now()}`,
      courseId: courseId || myCourses[0]?.id || '',
      instructorId: user?.id || '',
      instructorName: user?.name || '',
      title,
      content,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setAnnouncements(prev => [newAnn, ...prev]);
    setShowNew(false);
    setTitle('');
    setContent('');
    setCourseId('');
    toast({ title: 'Announcement Posted', description: 'Students have been notified.' });
  };

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="mb-6 flex justify-between items-start">
        <div>
          <h1 className="heading-lg text-gradient flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Megaphone className="h-6 w-6 text-primary" />
            </div>
            Announcements
          </h1>
          <p className="text-muted-foreground text-lg mt-2">Post updates for your students</p>
        </div>
        <Button size="lg" onClick={() => setShowNew(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Announcement
        </Button>
      </div>

      <div className="space-y-4">
        {announcements.map(ann => (
          <Card key={ann.id} className="card-base hover:shadow-md transition-all">
            <CardHeader>
              <CardTitle className="heading-sm">{ann.title}</CardTitle>
              <p className="text-sm text-muted-foreground mt-2">{ann.instructorName} · {ann.createdAt}</p>
            </CardHeader>
            <CardContent>
              <p className="text-foreground leading-relaxed">{ann.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={showNew} onOpenChange={setShowNew}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Announcement</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="course">Course</Label>
              <Select value={courseId} onValueChange={setCourseId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a course" />
                </SelectTrigger>
                <SelectContent>
                  {myCourses.map(c => (
                    <SelectItem key={c.id} value={c.id}>{c.title}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Announcement title"
              />
            </div>
            <div>
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={4}
                placeholder="Write your announcement..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNew(false)}>Cancel</Button>
            <Button onClick={handlePost}>Post</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Announcements;
