import type { User, Chat, ChatMessage, Project, TeamMember, ClientProfile, FileObject, AnalyticsData, TimeLog, Earning, Application, ClientMessage, CalendarEvent, Notification, HelpArticle } from './types';
export const MOCK_USERS: User[] = [
  { id: 'u1', name: 'User A' },
  { id: 'u2', name: 'User B' }
];
export const MOCK_CHATS: Chat[] = [
  { id: 'c1', title: 'General' },
];
export const MOCK_CHAT_MESSAGES: ChatMessage[] = [
  { id: 'm1', chatId: 'c1', userId: 'u1', text: 'Hello', ts: Date.now() },
];
export const MOCK_CLIENTS: ClientProfile[] = [
  { id: 'client-1', name: 'Innovate Corp', contactPerson: 'Alice Johnson' },
  { id: 'client-2', name: 'FutureScape Ltd.', contactPerson: 'Bob Williams' },
  { id: 'client-3', name: 'DesignWorks', contactPerson: 'Charlie Brown' },
];
export const MOCK_TEAM_MEMBERS: TeamMember[] = [
  { id: 'tm-1', name: 'Elena Rodriguez', role: 'Lead Architect', email: 'elena.r@architex.com', phone: '555-0101', avatarUrl: 'https://i.pravatar.cc/150?u=tm-1' },
  { id: 'tm-2', name: 'Marcus Chen', role: 'Project Manager', email: 'marcus.c@architex.com', phone: '555-0102', avatarUrl: 'https://i.pravatar.cc/150?u=tm-2' },
  { id: 'tm-3', name: 'Sophie Dubois', role: 'Interior Designer', email: 'sophie.d@architex.com', phone: '555-0103', avatarUrl: 'https://i.pravatar.cc/150?u=tm-3' },
  { id: 'tm-4', name: 'Liam O\'Connell', role: 'Structural Engineer', email: 'liam.o@architex.com', phone: '555-0104', avatarUrl: 'https://i.pravatar.cc/150?u=tm-4' },
  { id: 'tm-5', name: 'Aya Al-Jamil', role: 'Admin', email: 'aya.a@architex.com', phone: '555-0105', avatarUrl: 'https://i.pravatar.cc/150?u=tm-5' },
];
export const MOCK_PROJECTS: Project[] = [
  { id: 'proj-1', name: 'Downtown Tower', client: MOCK_CLIENTS[0], status: 'In Progress', budget: 75000000, startDate: '2023-01-15', endDate: '2024-12-31', team: [MOCK_TEAM_MEMBERS[0], MOCK_TEAM_MEMBERS[1]] },
  { id: 'proj-2', name: 'Suburban Villa', client: MOCK_CLIENTS[1], status: 'Completed', budget: 11250000, startDate: '2022-06-01', endDate: '2023-05-30', team: [MOCK_TEAM_MEMBERS[2]] },
  { id: 'proj-3', name: 'City Museum', client: MOCK_CLIENTS[2], status: 'Planning', budget: 180000000, startDate: '2024-03-01', endDate: '2026-01-01', team: [MOCK_TEAM_MEMBERS[0], MOCK_TEAM_MEMBERS[3]] },
  { id: 'proj-4', name: 'Coastal Residence', client: MOCK_CLIENTS[0], status: 'In Progress', budget: 18750000, startDate: '2023-09-10', endDate: '2024-10-25', team: [MOCK_TEAM_MEMBERS[0], MOCK_TEAM_MEMBERS[2]] },
  { id: 'proj-5', name: 'Tech Park Office', client: MOCK_CLIENTS[1], status: 'On Hold', budget: 127500000, startDate: '2023-02-20', endDate: '2025-06-30', team: [MOCK_TEAM_MEMBERS[1], MOCK_TEAM_MEMBERS[3]] },
];
export const MOCK_FILES: FileObject[] = [
  { id: 'file-1', name: 'Initial Blueprints.pdf', type: 'document', size: 5242880, modifiedAt: '2024-05-10T10:00:00Z', projectId: 'proj-1' },
  { id: 'file-2', name: 'Lobby-Render.jpg', type: 'image', size: 2097152, modifiedAt: '2024-05-12T14:30:00Z', projectId: 'proj-1' },
  { id: 'file-3', name: 'Structural-Calcs.zip', type: 'archive', size: 10485760, modifiedAt: '2024-04-20T09:00:00Z', projectId: 'proj-3' },
  { id: 'file-4', name: 'Client-Contract.docx', type: 'document', size: 153600, modifiedAt: '2024-01-10T11:00:00Z', projectId: 'proj-1' },
  { id: 'file-5', name: 'Site-Photos.zip', type: 'archive', size: 25165824, modifiedAt: '2024-03-15T16:45:00Z', projectId: 'proj-4' },
];
export const MOCK_ANALYTICS_DATA: AnalyticsData = {
  projectCompletion: [
    { month: 'Jan', completed: 2, inProgress: 5 },
    { month: 'Feb', completed: 3, inProgress: 6 },
    { month: 'Mar', completed: 4, inProgress: 4 },
    { month: 'Apr', completed: 5, inProgress: 3 },
    { month: 'May', completed: 6, inProgress: 2 },
    { month: 'Jun', completed: 7, inProgress: 3 },
  ],
  financials: [
    { month: 'Jan', revenue: 400000, expenses: 240000 },
    { month: 'Feb', revenue: 300000, expenses: 139800 },
    { month: 'Mar', revenue: 500000, expenses: 380000 },
    { month: 'Apr', revenue: 478000, expenses: 290800 },
    { month: 'May', revenue: 689000, expenses: 480000 },
    { month: 'Jun', revenue: 539000, expenses: 380000 },
  ],
  teamCapacity: MOCK_TEAM_MEMBERS.map(tm => ({
    name: tm.name,
    billable: Math.floor(Math.random() * 120) + 40,
    nonBillable: Math.floor(Math.random() * 40) + 10,
  })),
};
export const MOCK_TIME_LOGS: TimeLog[] = [
  { id: 'tl-1', projectId: 'proj-1', projectName: 'Downtown Tower', date: '2024-07-19', startTime: '09:00', endTime: '12:30', duration: 12600, description: 'Drafting initial floor plans.' },
  { id: 'tl-2', projectId: 'proj-4', projectName: 'Coastal Residence', date: '2024-07-19', startTime: '13:30', endTime: '17:00', duration: 12600, description: 'Client meeting and revisions.' },
  { id: 'tl-3', projectId: 'proj-1', projectName: 'Downtown Tower', date: '2024-07-18', startTime: '10:00', endTime: '16:00', duration: 21600, description: '3D modeling of the facade.' },
];
export const MOCK_EARNINGS: Earning[] = [
  { id: 'earn-1', date: '2024-07-15', projectId: 'proj-2', description: 'Milestone 3 Payment', amount: 25000, status: 'Paid' },
  { id: 'earn-2', date: '2024-07-20', projectId: 'proj-1', description: 'June Timesheet', amount: 42000, status: 'Pending' },
  { id: 'earn-3', date: '2024-06-15', projectId: 'proj-4', description: 'Milestone 1 Payment', amount: 18000, status: 'Paid' },
  { id: 'earn-4', date: '2024-05-15', projectId: 'proj-2', description: 'Milestone 2 Payment', amount: 22000, status: 'Paid' },
];
export const MOCK_APPLICATIONS: Application[] = [
  { id: 'app-1', projectId: 'proj-3', projectName: 'City Museum', status: 'Submitted', date: '2024-07-10' },
  { id: 'app-2', projectId: 'proj-5', projectName: 'Tech Park Office', status: 'Viewed', date: '2024-07-05' },
];
export const MOCK_MESSAGES: ClientMessage[] = [
  { id: 'msg-1', senderId: 'tm-2', senderName: 'Marcus Chen', senderAvatar: MOCK_TEAM_MEMBERS[1].avatarUrl, text: 'Hi Alice, just wanted to give you a quick update. The revised floor plans are now available in the files section.', timestamp: '2024-07-20T10:00:00Z', isClient: false },
  { id: 'msg-2', senderId: 'client', senderName: 'Alice Johnson', senderAvatar: 'https://i.pravatar.cc/150?u=client-1', text: 'Thanks, Marcus! I\'ll take a look this afternoon.', timestamp: '2024-07-20T10:05:00Z', isClient: true },
  { id: 'msg-3', senderId: 'tm-2', senderName: 'Marcus Chen', senderAvatar: MOCK_TEAM_MEMBERS[1].avatarUrl, text: 'Great. Let me know if you have any feedback. We\'re on track for the milestone next week.', timestamp: '2024-07-20T10:06:00Z', isClient: false },
  { id: 'msg-4', senderId: 'client', senderName: 'Alice Johnson', senderAvatar: 'https://i.pravatar.cc/150?u=client-1', text: 'Sounds good. Can we schedule a brief call for Monday to discuss?', timestamp: '2024-07-20T14:30:00Z', isClient: true },
];
export const MOCK_CALENDAR_EVENTS: CalendarEvent[] = [
  { id: 'evt-1', title: 'Foundation Pouring', date: '2024-08-05', type: 'milestone', projectId: 'proj-1' },
  { id: 'evt-2', title: 'Weekly Sync', date: '2024-08-08', type: 'meeting', projectId: 'proj-1' },
  { id: 'evt-3', title: 'Interior Design Review', date: '2024-08-15', type: 'meeting', projectId: 'proj-4' },
  { id: 'evt-4', title: 'Framing Complete', date: '2024-08-20', type: 'milestone', projectId: 'proj-4' },
];
export const MOCK_NOTIFICATIONS: Notification[] = [
  { id: 'notif-1', role: 'admin', type: 'alert', title: 'Project "Downtown Tower" is over budget.', description: 'The projected cost has exceeded the budget by 5%.', timestamp: '2024-07-21T09:00:00Z', isRead: false },
  { id: 'notif-2', role: 'freelancer', type: 'payment', title: 'Payment Received', description: 'You have received a payment of R25,000 for "Suburban Villa".', timestamp: '2024-07-20T15:30:00Z', isRead: false },
  { id: 'notif-3', role: 'client', type: 'milestone', title: 'Milestone Achieved', description: 'The "Structural Frame" for "Downtown Tower" is now complete.', timestamp: '2024-07-19T11:00:00Z', isRead: true },
  { id: 'notif-4', role: 'freelancer', type: 'message', title: 'New Message from Marcus Chen', description: 'Regarding the "Coastal Residence" project...', timestamp: '2024-07-21T10:15:00Z', isRead: false },
  { id: 'notif-5', role: 'client', type: 'message', title: 'New Message from Elena Rodriguez', description: 'Here are the updated renders you requested...', timestamp: '2024-07-21T11:45:00Z', isRead: false },
  { id: 'notif-6', role: 'admin', type: 'info', title: 'New Freelancer Joined', description: 'Liam O\'Connell has joined the team as a Structural Engineer.', timestamp: '2024-07-18T14:00:00Z', isRead: true },
];
export const MOCK_HELP_ARTICLES: HelpArticle[] = [
  { id: 'help-1', category: 'Getting Started', question: 'How do I create a new project?', answer: 'To create a new project, navigate to the "Projects" page from the main dashboard and click the "New Project" button. Fill in the required details in the dialog that appears.' },
  { id: 'help-2', category: 'Billing', question: 'How do I view my payment history?', answer: 'As a freelancer, you can view your complete payment history on the "Earnings" page. It provides a detailed table of all transactions.' },
  { id: 'help-3', category: 'Time Tracking', question: 'Can I add time manually?', answer: 'Yes. On the "Timer & Tracking" page, there is a "Manual Entry" tab where you can add time for work that was completed without using the live timer.' },
  { id: 'help-4', category: 'Account', question: 'How do I change my password?', answer: 'You can change your password from the "Settings" page. Navigate to the "Security" tab and you will find the option to update your password.' },
];