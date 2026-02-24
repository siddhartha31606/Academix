import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { BookOpen, Search, Trash2 } from 'lucide-react';
import { demoCourses } from '@/data/mock-data';
import { useToast } from '@/hooks/use-toast';

const CoursesManagement = () => {
  const { toast } = useToast();
  const [courses, setCourses] = useState(demoCourses);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showCreate, setShowCreate] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newCategory, setNewCategory] = useState('Computer Science');
  const [newInstructor, setNewInstructor] = useState('Dr. James Wilson');

  const statusColors = {
    published: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    draft: 'bg-gray-100 text-gray-800',
    rejected: 'bg-red-100 text-red-800',
    approved: 'bg-emerald-100 text-emerald-800',
  };

  const filtered = courses.filter(c => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.instructorName.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleDelete = (courseId) => {
    const course = courses.find(c => c.id === courseId);
    setCourses(prev => prev.filter(c => c.id !== courseId));
    toast({ title: 'Course Deleted', description: `"${course?.title}" has been deleted.`, variant: 'destructive' });
  };

  const handleAddCourse = () => {
    if (!newTitle.trim() || !newDescription.trim()) {
      toast({ title: 'Error', description: 'Please fill in all fields.', variant: 'destructive' });
      return;
    }
    const newCourse = {
      id: `c${Date.now()}`,
      title: newTitle,
      description: newDescription,
      category: newCategory,
      instructorId: 'u2',
      instructorName: newInstructor,
      status: 'draft',
      tags: [],
      enrollmentCount: 0,
      lessonCount: 0,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };
    setCourses(prev => [...prev, newCourse]);
    setShowCreate(false);
    setNewTitle('');
    setNewDescription('');
    setNewCategory('Computer Science');
    setNewInstructor('Dr. James Wilson');
    toast({ title: 'Course Created', description: `"${newTitle}" has been created as draft.` });
  };

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="mb-6 flex justify-between items-start">
        <div>
          <h1 className="heading-lg text-gradient flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            Courses Management
          </h1>
          <p className="text-muted-foreground text-lg mt-2">{courses.length} total courses</p>
        </div>
        <Button size="lg" onClick={() => setShowCreate(true)}>
          + Create Course
        </Button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search courses by title or instructor..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="pending">Pending Review</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2">Course Title</th>
                  <th className="text-left py-3 px-2">Instructor</th>
                  <th className="text-left py-3 px-2">Category</th>
                  <th className="text-left py-3 px-2">Status</th>
                  <th className="text-left py-3 px-2">Enrollments</th>
                  <th className="text-left py-3 px-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(course => (
                  <tr key={course.id} className="border-b hover:bg-accent/50 transition">
                    <td className="py-3 px-2 font-medium">{course.title}</td>
                    <td className="py-3 px-2">{course.instructorName}</td>
                    <td className="py-3 px-2 text-muted-foreground">{course.category}</td>
                    <td className="py-3 px-2">
                      <Badge className={statusColors[course.status]}>
                        {course.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-2">{course.enrollmentCount}</td>
                    <td className="py-3 px-2">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" title="Delete" onClick={() => handleDelete(course.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No courses found matching your criteria.
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={showCreate} onOpenChange={setShowCreate}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Course</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Course Title</Label>
              <Input
                id="title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Enter course title"
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                placeholder="Enter course description"
                className="h-24"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={newCategory} onValueChange={setNewCategory}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Computer Science">Computer Science</SelectItem>
                    <SelectItem value="Web Development">Web Development</SelectItem>
                    <SelectItem value="Design">Design</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Cloud Computing">Cloud Computing</SelectItem>
                    <SelectItem value="Data Science">Data Science</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="instructor">Instructor</Label>
                <Select value={newInstructor} onValueChange={setNewInstructor}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Dr. James Wilson">Dr. James Wilson</SelectItem>
                    <SelectItem value="Prof. Bob Martinez">Prof. Bob Martinez</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreate(false)}>Cancel</Button>
            <Button onClick={handleAddCourse}>Create Course</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CoursesManagement;
