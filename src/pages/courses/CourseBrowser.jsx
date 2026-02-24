import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, BookOpen, Users, Clock } from 'lucide-react';
import { demoCourses } from '@/data/mock-data';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Course } from '@/types/lms';

const CourseBrowser = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [enrolledIds, setEnrolledIds] = useState(new Set());
  const { user } = useAuth();
  const { toast } = useToast();

  const publishedCourses = demoCourses.filter(c => c.status === 'published');
  const categories = [...new Set(publishedCourses.map(c => c.category))];

  const filtered = publishedCourses.filter(c => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.description.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === 'all' || c.category === category;
    return matchSearch && matchCategory;
  });

  const categoryColors = {
    'Computer Science': 'bg-primary/10 text-primary',
    'Web Development': 'bg-info/10 text-info',
    'Design': 'bg-accent/10 text-accent-foreground',
    'Marketing': 'bg-success/10 text-success',
    'Cloud Computing': 'bg-chart-5/10 text-chart-5',
  };

  const handleEnroll = (course) => {
    setEnrolledIds(prev => new Set(prev).add(course.id));
    toast({
      title: 'Enrolled Successfully!',
      description: `You are now enrolled in "${course.title}".`,
    });
  };

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="mb-6">
        <h1 className="heading-lg text-gradient">Browse Courses</h1>
        <p className="text-muted-foreground text-lg mt-2">Discover courses to advance your skills</p>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map(cat => (
              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(course => {
          const isEnrolled = enrolledIds.has(course.id);
          return (
            <Card key={course.id} className="card-hover">
              <CardContent className="pt-6">
                <div className="mb-4">
                  <div className={`text-xs font-bold uppercase tracking-wide mb-2 px-2 py-1 rounded-lg w-fit ${
                    categoryColors[course.category] || 'bg-muted text-foreground'
                  }`}>
                    {course.category}
                  </div>
                  <h3 className="font-bold text-lg mb-3 leading-tight">{course.title}</h3>
                  <p className="text-sm text-foreground mb-4 line-clamp-3">{course.description}</p>
                  <div className="flex gap-4 text-xs text-muted-foreground mb-4">
                    <div className="flex items-center gap-1.5">
                      <Users className="h-4 w-4" />
                      <span className="font-medium">{course.enrollmentCount}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4" />
                      <span className="font-medium">{course.lessonCount} lessons</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground font-medium">by {course.instructorName}</p>
                </div>
                <Button
                  className="w-full"
                  variant={isEnrolled ? "outline" : "default"}
                  onClick={(e) => { e.stopPropagation(); handleEnroll(course); }}
                >
                  {isEnrolled ? '✓ Enrolled' : 'Enroll Now'}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <Card className="card-base col-span-full">
          <CardContent className="pt-12 pb-12 text-center">
            <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
            <p className="text-muted-foreground">No courses found matching your criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CourseBrowser;
