export const demoUsers = [
  { id: 'u1', email: 'admin@edumanage.com', name: 'Sarah Chen', role: 'admin', createdAt: '2024-01-15' },
  { id: 'u2', email: 'instructor@edumanage.com', name: 'Dr. James Wilson', role: 'instructor', createdAt: '2024-02-01' },
  { id: 'u3', email: 'student@edumanage.com', name: 'Alex Rivera', role: 'student', createdAt: '2024-03-10' },
  { id: 'u4', email: 'creator@edumanage.com', name: 'Maya Patel', role: 'content_creator', createdAt: '2024-02-20' },
  { id: 'u5', email: 'jane@student.com', name: 'Jane Cooper', role: 'student', createdAt: '2024-04-01' },
  { id: 'u6', email: 'bob@instructor.com', name: 'Prof. Bob Martinez', role: 'instructor', createdAt: '2024-01-20' },
  { id: 'u7', email: 'emma@student.com', name: 'Emma Thompson', role: 'student', createdAt: '2024-05-15' },
  { id: 'u8', email: 'liam@student.com', name: 'Liam O\'Brien', role: 'student', createdAt: '2024-06-01' },
];

export const demoCourses = [
  { id: 'c1', title: 'Introduction to Machine Learning', description: 'Learn the fundamentals of ML with hands-on projects covering supervised and unsupervised learning, neural networks, and real-world applications.', instructorId: 'u2', instructorName: 'Dr. James Wilson', status: 'published', category: 'Computer Science', tags: ['AI', 'Python', 'Data Science'], enrollmentCount: 234, lessonCount: 24, createdAt: '2024-03-01', updatedAt: '2024-06-15' },
  { id: 'c2', title: 'Advanced React Patterns', description: 'Master advanced React patterns including compound components, render props, hooks composition, and performance optimization techniques.', instructorId: 'u2', instructorName: 'Dr. James Wilson', status: 'published', category: 'Web Development', tags: ['React', 'JavaScript', 'Frontend'], enrollmentCount: 189, lessonCount: 18, createdAt: '2024-04-10', updatedAt: '2024-07-20' },
  { id: 'c3', title: 'Data Structures & Algorithms', description: 'Comprehensive DSA course covering arrays, trees, graphs, dynamic programming, and competitive programming techniques.', instructorId: 'u6', instructorName: 'Prof. Bob Martinez', status: 'published', category: 'Computer Science', tags: ['DSA', 'Algorithms', 'Programming'], enrollmentCount: 312, lessonCount: 32, createdAt: '2024-02-15', updatedAt: '2024-05-10' },
  { id: 'c4', title: 'UX Design Fundamentals', description: 'Learn user experience design principles, wireframing, prototyping, and user research methodologies.', instructorId: 'u6', instructorName: 'Prof. Bob Martinez', status: 'pending', category: 'Design', tags: ['UX', 'UI', 'Design'], enrollmentCount: 0, lessonCount: 15, createdAt: '2024-07-01', updatedAt: '2024-07-01' },
  { id: 'c5', title: 'Cloud Architecture with AWS', description: 'Design and deploy scalable cloud solutions using AWS services including EC2, S3, Lambda, and more.', instructorId: 'u2', instructorName: 'Dr. James Wilson', status: 'draft', category: 'Cloud Computing', tags: ['AWS', 'Cloud', 'DevOps'], enrollmentCount: 0, lessonCount: 8, createdAt: '2024-08-01', updatedAt: '2024-08-01' },
  { id: 'c6', title: 'Digital Marketing Mastery', description: 'Complete digital marketing course covering SEO, social media marketing, email campaigns, and analytics.', instructorId: 'u6', instructorName: 'Prof. Bob Martinez', status: 'published', category: 'Marketing', tags: ['SEO', 'Marketing', 'Social Media'], enrollmentCount: 156, lessonCount: 20, createdAt: '2024-03-20', updatedAt: '2024-06-25' },
  { id: 'c7', title: 'Python for Data Analysis', description: 'Master Python programming for data analysis, visualization, and statistical computing with pandas and matplotlib.', instructorId: 'u2', instructorName: 'Dr. James Wilson', status: 'approved', category: 'Data Science', tags: ['Python', 'Data Analysis', 'Pandas'], enrollmentCount: 98, lessonCount: 16, createdAt: '2024-05-01', updatedAt: '2024-07-10' },
];

export const demoLessons = [
  { id: 'l1', courseId: 'c1', title: 'What is Machine Learning?', contentType: 'video', duration: '15:30', order: 1, completed: true },
  { id: 'l2', courseId: 'c1', title: 'Supervised vs Unsupervised Learning', contentType: 'video', duration: '22:45', order: 2, completed: true },
  { id: 'l3', courseId: 'c1', title: 'Linear Regression Deep Dive', contentType: 'video', duration: '30:00', order: 3, completed: false },
  { id: 'l4', courseId: 'c1', title: 'Python for ML - Setup Guide', contentType: 'pdf', order: 4, completed: false },
  { id: 'l5', courseId: 'c2', title: 'Compound Components Pattern', contentType: 'video', duration: '25:00', order: 1, completed: true },
  { id: 'l6', courseId: 'c2', title: 'Custom Hooks Composition', contentType: 'video', duration: '20:15', order: 2, completed: false },
];

export const demoEnrollments = [
  { id: 'e1', userId: 'u3', courseId: 'c1', progress: 42, enrolledAt: '2024-04-01' },
  { id: 'e2', userId: 'u3', courseId: 'c2', progress: 67, enrolledAt: '2024-05-15' },
  { id: 'e3', userId: 'u3', courseId: 'c3', progress: 15, enrolledAt: '2024-06-01' },
  { id: 'e4', userId: 'u5', courseId: 'c1', progress: 88, enrolledAt: '2024-03-20' },
  { id: 'e5', userId: 'u7', courseId: 'c2', progress: 33, enrolledAt: '2024-06-10' },
  { id: 'e6', userId: 'u8', courseId: 'c1', progress: 55, enrolledAt: '2024-05-01' },
  { id: 'e7', userId: 'u5', courseId: 'c6', progress: 72, enrolledAt: '2024-04-15' },
];

export const demoAssignments = [
  { id: 'a1', courseId: 'c1', title: 'Build a Linear Regression Model', description: 'Implement linear regression from scratch using Python and NumPy.', dueDate: '2025-03-15', maxScore: 100 },
  { id: 'a2', courseId: 'c2', title: 'Create a Compound Component Library', description: 'Build a reusable compound component following the patterns taught.', dueDate: '2025-03-20', maxScore: 100 },
  { id: 'a3', courseId: 'c1', title: 'Classification Project', description: 'Build a classification model using a real-world dataset.', dueDate: '2025-04-01', maxScore: 100 },
];

export const demoSubmissions = [
  { id: 's1', assignmentId: 'a1', studentId: 'u3', studentName: 'Alex Rivera', status: 'graded', grade: 92, feedback: 'Excellent implementation! Clean code with good documentation.', submittedAt: '2025-03-12' },
  { id: 's2', assignmentId: 'a1', studentId: 'u5', studentName: 'Jane Cooper', status: 'submitted', submittedAt: '2025-03-14' },
  { id: 's3', assignmentId: 'a2', studentId: 'u3', studentName: 'Alex Rivera', status: 'submitted', submittedAt: '2025-03-18' },
  { id: 's4', assignmentId: 'a1', studentId: 'u8', studentName: 'Liam O\'Brien', status: 'late', submittedAt: '2025-03-17' },
];

export const demoNotifications = [
  { id: 'n1', userId: 'u3', title: 'Assignment Graded', message: 'Your submission for "Build a Linear Regression Model" has been graded. Score: 92/100', read: false, createdAt: '2025-03-13', type: 'grade' },
  { id: 'n2', userId: 'u3', title: 'New Announcement', message: 'Dr. James Wilson posted a new announcement in Machine Learning.', read: false, createdAt: '2025-03-10', type: 'announcement' },
  { id: 'n3', userId: 'u3', title: 'Enrollment Confirmed', message: 'You have been enrolled in Data Structures & Algorithms.', read: true, createdAt: '2025-06-01', type: 'enrollment' },
  { id: 'n4', userId: 'u1', title: 'Course Pending Approval', message: 'UX Design Fundamentals is awaiting your approval.', read: false, createdAt: '2025-07-01', type: 'approval' },
  { id: 'n5', userId: 'u2', title: 'New Submission', message: 'Jane Cooper submitted "Build a Linear Regression Model".', read: false, createdAt: '2025-03-14', type: 'general' },
];

export const demoAnnouncements = [
  { id: 'ann1', courseId: 'c1', instructorId: 'u2', instructorName: 'Dr. James Wilson', title: 'Mid-term Project Guidelines', content: 'Please review the updated mid-term project guidelines. The deadline has been extended by one week.', createdAt: '2025-03-10' },
  { id: 'ann2', courseId: 'c2', instructorId: 'u2', instructorName: 'Dr. James Wilson', title: 'Live Q&A Session', content: 'Join us for a live Q&A session this Friday at 3 PM EST. We will cover compound components in depth.', createdAt: '2025-03-08' },
];

export const analyticsData = {
  totalUsers: 1247,
  totalCourses: 48,
  totalEnrollments: 3892,
  activeStudents: 876,
  completionRate: 68,
  revenue: 124500,
  monthlyEnrollments: [
    { month: 'Jan', enrollments: 245 },
    { month: 'Feb', enrollments: 312 },
    { month: 'Mar', enrollments: 398 },
    { month: 'Apr', enrollments: 356 },
    { month: 'May', enrollments: 421 },
    { month: 'Jun', enrollments: 489 },
    { month: 'Jul', enrollments: 534 },
    { month: 'Aug', enrollments: 478 },
  ],
  coursesByCategory: [
    { category: 'Computer Science', value: 15 },
    { category: 'Web Development', value: 12 },
    { category: 'Design', value: 8 },
    { category: 'Marketing', value: 6 },
    { category: 'Cloud Computing', value: 4 },
    { category: 'Data Science', value: 3 },
  ],
  userGrowth: [
    { month: 'Jan', users: 890 },
    { month: 'Feb', users: 945 },
    { month: 'Mar', users: 1020 },
    { month: 'Apr', users: 1078 },
    { month: 'May', users: 1134 },
    { month: 'Jun', users: 1189 },
    { month: 'Jul', users: 1223 },
    { month: 'Aug', users: 1247 },
  ],
};
