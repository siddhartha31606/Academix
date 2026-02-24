// Type definitions objects for documentation purposes
// These define the shape of data structures used throughout the application

export const userTypes = {
  admin: 'admin',
  instructor: 'instructor',
  student: 'student',
  content_creator: 'content_creator'
};

// Alias for role imports
export const UserRole = userTypes;

export const User = {};
export const Course = {};
export const Enrollment = {};
export const Assignment = {};
export const Submission = {};
export const Notification = {};
export const Announcement = {};
export const Lesson = {};
export const Quiz = {};
export const QuizAttempt = {};