import { useAuth } from '@/contexts/AuthContext';
import AdminDashboard from './AdminDashboard';
import InstructorDashboard from './InstructorDashboard';
import StudentDashboard from './StudentDashboard';
import ContentCreatorDashboard from './ContentCreatorDashboard';

const Dashboard = () => {
  const { user } = useAuth();

  switch (user?.role) {
    case 'admin': return <AdminDashboard />;
    case 'instructor': return <InstructorDashboard />;
    case 'student': return <StudentDashboard />;
    case 'content_creator': return <ContentCreatorDashboard />;
    default: return <StudentDashboard />;
  }
};

export default Dashboard;
