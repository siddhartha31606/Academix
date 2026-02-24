import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, FileText, BookOpen, FolderOpen, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const ContentCreatorDashboard = () => {
  const { toast } = useToast();
  const [showUpload, setShowUpload] = useState(false);
  const [fileName, setFileName] = useState('');
  const [fileType, setFileType] = useState('pdf');
  const [fileCourse, setFileCourse] = useState('');
  const [uploads, setUploads] = useState([
    { name: 'ML Chapter 5 Slides.pdf', course: 'Introduction to Machine Learning', date: '2025-03-10', type: 'pdf' },
    { name: 'React Hooks Video.mp4', course: 'Advanced React Patterns', date: '2025-03-08', type: 'video' },
    { name: 'DSA Practice Problems.pdf', course: 'Data Structures & Algorithms', date: '2025-03-05', type: 'pdf' },
    { name: 'Cloud Architecture Diagram.png', course: 'Cloud Architecture with AWS', date: '2025-03-01', type: 'resource' },
  ]);

  const handleUpload = () => {
    if (!fileName.trim()) return;
    const newUpload = {
      name: fileName,
      course: fileCourse || 'Unassigned',
      date: new Date().toISOString().split('T')[0],
      type: fileType,
    };
    setUploads(prev => [newUpload, ...prev]);
    setShowUpload(false);
    setFileName('');
    setFileCourse('');
    toast({ title: 'Content Uploaded', description: `"${fileName}" has been added to the library.` });
  };

  const handleDelete = (index) => {
    const item = uploads[index];
    setUploads(prev => prev.filter((_, i) => i !== index));
    toast({ title: 'Content Removed', description: `"${item.name}" has been deleted.` });
  };

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="mb-6 flex justify-between items-start">
        <div>
          <h1 className="heading-lg text-gradient flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Upload className="h-6 w-6 text-primary" />
            </div>
            Content Creator Hub
          </h1>
          <p className="text-muted-foreground text-lg mt-2">Upload and manage course materials</p>
        </div>
        <Button size="lg" onClick={() => setShowUpload(true)}>
          <Upload className="h-4 w-4 mr-2" />
          Upload Content
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        {[
          { label: 'Total Uploads', value: uploads.length, icon: FileText, color: 'text-primary' },
          { label: 'Linked Courses', value: 6, icon: BookOpen, color: 'text-info' },
          { label: 'Storage Used', value: '2.4 GB', icon: FolderOpen, color: 'text-accent' },
        ].map((stat, i) => (
          <Card key={i} className="card-base hover:shadow-md transition-all">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{stat.label}</p>
                  <p className="text-3xl font-bold mt-2">{stat.value}</p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="card-base">
        <CardHeader>
          <CardTitle className="heading-sm">Content Library</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-2">File Name</th>
                  <th className="text-left py-2 px-2">Course</th>
                  <th className="text-left py-2 px-2">Date Added</th>
                  <th className="text-left py-2 px-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {uploads.map((upload, i) => (
                  <tr key={i} className="border-b hover:bg-accent transition">
                    <td className="py-3 px-2 flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      {upload.name}
                    </td>
                    <td className="py-3 px-2 text-muted-foreground">{upload.course}</td>
                    <td className="py-3 px-2 text-muted-foreground">{upload.date}</td>
                    <td className="py-3 px-2">
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(i)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={showUpload} onOpenChange={setShowUpload}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Content</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="fileName">File Name</Label>
              <Input
                id="fileName"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                placeholder="Enter file name"
              />
            </div>
            <div>
              <Label htmlFor="fileType">Content Type</Label>
              <Select value={fileType} onValueChange={setFileType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF Document</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                  <SelectItem value="resource">Resource</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="fileCourse">Linked Course (optional)</Label>
              <Input
                id="fileCourse"
                value={fileCourse}
                onChange={(e) => setFileCourse(e.target.value)}
                placeholder="Course name"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowUpload(false)}>Cancel</Button>
            <Button onClick={handleUpload}>Upload</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContentCreatorDashboard;
