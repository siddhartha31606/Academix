
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import AppLayout from "@/components/layout/AppLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import CourseBrowser from "./pages/courses/CourseBrowser";
import Notifications from "./pages/Notifications";
import ManageUsers from "./pages/admin/ManageUsers";
import Approvals from "./pages/admin/Approvals";
import Settings from "./pages/admin/Settings";
import CoursesManagement from "./pages/admin/CoursesManagement";
import Analytics from "./pages/Analytics";
import Submissions from "./pages/instructor/Submissions";
import Announcements from "./pages/instructor/Announcements";
import MyLearning from "./pages/student/MyLearning";
import Assignments from "./pages/student/Assignments";
import Grades from "./pages/student/Grades";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<AppLayout><Dashboard /></AppLayout>} />
            <Route path="/courses" element={<AppLayout><CourseBrowser /></AppLayout>} />
            <Route path="/my-courses" element={<AppLayout><CourseBrowser /></AppLayout>} />
            <Route path="/my-learning" element={<AppLayout><MyLearning /></AppLayout>} />
            <Route path="/content" element={<AppLayout><CourseBrowser /></AppLayout>} />
            <Route path="/approvals" element={<AppLayout><Approvals /></AppLayout>} />
            <Route path="/admin-courses" element={<AppLayout><CoursesManagement /></AppLayout>} />
            <Route path="/users" element={<AppLayout><ManageUsers /></AppLayout>} />
            <Route path="/analytics" element={<AppLayout><Analytics /></AppLayout>} />
            <Route path="/submissions" element={<AppLayout><Submissions /></AppLayout>} />
            <Route path="/announcements" element={<AppLayout><Announcements /></AppLayout>} />
            <Route path="/assignments" element={<AppLayout><Assignments /></AppLayout>} />
            <Route path="/grades" element={<AppLayout><Grades /></AppLayout>} />
            <Route path="/settings" element={<AppLayout><Settings /></AppLayout>} />
            <Route path="/notifications" element={<AppLayout><Notifications /></AppLayout>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
