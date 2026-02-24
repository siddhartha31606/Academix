import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  LayoutDashboard, BookOpen, Users, Settings, LogOut, Bell,
  GraduationCap, FileText, ClipboardCheck, BarChart3
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const AppSidebar = () => {
  const { user, logout, unreadCount } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const roleNavItems = {
    admin: [
      { to: '/dashboard', icon: <LayoutDashboard className="h-4 w-4" />, label: 'Dashboard' },
      { to: '/users', icon: <Users className="h-4 w-4" />, label: 'Manage Users' },
      { to: '/admin-courses', icon: <BookOpen className="h-4 w-4" />, label: 'Courses' },
      { to: '/approvals', icon: <ClipboardCheck className="h-4 w-4" />, label: 'Approvals' },
      { to: '/analytics', icon: <BarChart3 className="h-4 w-4" />, label: 'Analytics' },
      { to: '/settings', icon: <Settings className="h-4 w-4" />, label: 'Settings' },
    ],
    instructor: [
      { to: '/dashboard', icon: <LayoutDashboard className="h-4 w-4" />, label: 'Dashboard' },
      { to: '/my-courses', icon: <BookOpen className="h-4 w-4" />, label: 'My Courses' },
      { to: '/submissions', icon: <FileText className="h-4 w-4" />, label: 'Submissions' },
      { to: '/announcements', icon: <Bell className="h-4 w-4" />, label: 'Announcements' },
      { to: '/analytics', icon: <BarChart3 className="h-4 w-4" />, label: 'Performance' },
    ],
    student: [
      { to: '/dashboard', icon: <LayoutDashboard className="h-4 w-4" />, label: 'Dashboard' },
      { to: '/courses', icon: <BookOpen className="h-4 w-4" />, label: 'Browse Courses' },
      { to: '/my-learning', icon: <GraduationCap className="h-4 w-4" />, label: 'My Learning' },
      { to: '/assignments', icon: <ClipboardCheck className="h-4 w-4" />, label: 'Assignments' },
      { to: '/grades', icon: <BarChart3 className="h-4 w-4" />, label: 'Grades' },
    ],
    content_creator: [
      { to: '/dashboard', icon: <LayoutDashboard className="h-4 w-4" />, label: 'Dashboard' },
      { to: '/content', icon: <FileText className="h-4 w-4" />, label: 'Content Library' },
      { to: '/courses', icon: <BookOpen className="h-4 w-4" />, label: 'Courses' },
    ],
  };

  const navItems = roleNavItems[user.role] || [];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="w-64 border-r bg-sidebar text-sidebar-foreground flex flex-col h-screen shadow-md">

      <div className="px-6 py-5 border-b border-sidebar-border font-display font-bold text-xl text-sidebar-primary flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-sidebar-primary/20 flex items-center justify-center">
          <BookOpen className="w-5 h-5 text-sidebar-primary" />
        </div>
        Academix
      </div>

      <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
        {navItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-150',
                isActive
                  ? 'bg-sidebar-accent text-sidebar-primary font-semibold shadow-sm'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
              )
            }
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <NavLink
        to="/notifications"
        className={({ isActive }) =>
          cn(
            'flex items-center gap-3 px-4 py-3 mx-3 rounded-lg text-sm font-medium transition-all duration-150 mb-3',
            isActive
              ? 'bg-sidebar-accent text-sidebar-primary font-semibold'
              : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
          )
        }
      >
        <Bell className="h-4 w-4" />
        <span>Notifications</span>
        {unreadCount > 0 && (
          <span className="ml-auto bg-accent text-accent-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </NavLink>

      <div className="p-4 border-t border-sidebar-border space-y-3">
        <div className="px-2">
          <p className="text-xs font-semibold text-sidebar-foreground/70 uppercase tracking-wide mb-1">Account</p>
          <p className="text-sm font-semibold text-sidebar-foreground truncate">{user.name}</p>
          <p className="text-xs text-sidebar-foreground/60 capitalize">{user.role.replace('_', ' ')}</p>
        </div>
        <Button 
          variant="ghost" 
          onClick={handleLogout} 
          className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-primary transition-all duration-150"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </div>

    </aside>
  );
};

export default AppSidebar;