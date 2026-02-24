import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Settings as SettingsIcon, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Settings = () => {
  const { toast } = useToast();
  const [siteName, setSiteName] = useState('Academix');
  const [supportEmail, setSupportEmail] = useState('support@edumanage.com');
  const [enrollmentOpen, setEnrollmentOpen] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('platformSettings');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      setSiteName(settings.siteName || 'Academix');
      setSupportEmail(settings.supportEmail || 'support@edumanage.com');
      setEnrollmentOpen(settings.enrollmentOpen !== false);
      setEmailNotifications(settings.emailNotifications !== false);
      setMaintenanceMode(settings.maintenanceMode || false);
    }
  }, []);

  const handleSave = () => {
    const settings = {
      siteName,
      supportEmail,
      enrollmentOpen,
      emailNotifications,
      maintenanceMode,
    };
    localStorage.setItem('platformSettings', JSON.stringify(settings));
    toast({ title: 'Settings Saved', description: 'Platform settings have been updated successfully.' });
  };

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="mb-6">
        <h1 className="heading-lg text-gradient flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <SettingsIcon className="h-6 w-6 text-primary" />
          </div>
          Platform Settings
        </h1>
        <p className="text-muted-foreground text-lg mt-2">Configure your LMS platform</p>
      </div>

      <Card className="card-base">
        <CardHeader>
          <CardTitle className="heading-sm">General</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="siteName">Platform Name</Label>
            <Input
              id="siteName"
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="supportEmail">Support Email</Label>
            <Input
              id="supportEmail"
              value={supportEmail}
              onChange={(e) => setSupportEmail(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="card-base">
        <CardHeader>
          <CardTitle className="heading-sm">Features</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="enrollment">Open Enrollment</Label>
              <p className="text-sm text-muted-foreground">Allow new students to register</p>
            </div>
            <Switch
              id="enrollment"
              checked={enrollmentOpen}
              onCheckedChange={setEnrollmentOpen}
            />
          </div>
          <div className="flex items-center justify-between border-t pt-4">
            <div>
              <Label htmlFor="email">Email Notifications</Label>
              <p className="text-sm text-muted-foreground">Send email alerts for important events</p>
            </div>
            <Switch
              id="email"
              checked={emailNotifications}
              onCheckedChange={setEmailNotifications}
            />
          </div>
          <div className="flex items-center justify-between border-t pt-4">
            <div>
              <Label htmlFor="maintenance">Maintenance Mode</Label>
              <p className="text-sm text-muted-foreground">Temporarily disable the platform</p>
            </div>
            <Switch
              id="maintenance"
              checked={maintenanceMode}
              onCheckedChange={setMaintenanceMode}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end mt-6">
        <Button size="lg" onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Save Settings
        </Button>
      </div>
    </div>
  );
};

export default Settings;
