import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bell, Check } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const typeColors = {
  grade: 'bg-success/10 text-success',
  announcement: 'bg-info/10 text-info',
  enrollment: 'bg-primary/10 text-primary',
  approval: 'bg-warning/10 text-warning',
  general: 'bg-muted text-muted-foreground',
};

const Notifications = () => {
  const { notifications, markNotificationRead } = useAuth();

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="mb-6">
        <h1 className="heading-lg text-gradient">Notifications</h1>
        <p className="text-muted-foreground text-lg mt-2">Stay updated with your activity</p>
      </div>

      <Card className="card-base">
        <CardHeader>
          <CardTitle className="heading-sm flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Bell className="h-5 w-5 text-primary" />
            </div>
            All Notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          {notifications.length === 0 ? (
            <p className="text-muted-foreground">No notifications yet.</p>
          ) : (
            notifications.map(n => (
              <div key={n.id} className="flex items-center justify-between border-b pb-4 mb-4 last:border-b-0">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className={typeColors[n.type]}>
                      {n.type}
                    </Badge>
                    {!n.read && <span className="h-2 w-2 bg-primary rounded-full" />}
                  </div>
                  <h3 className="font-semibold">{n.title}</h3>
                  <p className="text-sm text-muted-foreground">{n.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{n.createdAt}</p>
                </div>
                {!n.read && (
                  <Button variant="ghost" size="sm" onClick={() => markNotificationRead(n.id)}>
                    <Check className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Notifications;
