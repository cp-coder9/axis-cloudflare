export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
// Minimal real-world chat example types (shared by frontend and worker)
export interface User {
  id: string;
  name: string;
}
export interface Chat {
  id: string;
  title: string;
}
export interface ChatMessage {
  id: string;
  chatId: string;
  userId: string;
  text: string;
  ts: number; // epoch millis
}
// Architex Axis Specific Types
export interface ClientProfile {
  id: string;
  name: string;
  contactPerson: string;
}
export interface TeamMember {
  id: string;
  name: string;
  role: 'Lead Architect' | 'Project Manager' | 'Interior Designer' | 'Structural Engineer' | 'Admin' | 'Freelancer';
  email: string;
  phone: string;
  avatarUrl: string;
}
export interface Project {
  id: string;
  name: string;
  client: ClientProfile;
  status: 'Planning' | 'In Progress' | 'Completed' | 'On Hold';
  budget: number;
  startDate: string;
  endDate: string;
  team: TeamMember[];
}
export interface FileObject {
  id: string;
  name: string;
  type: 'document' | 'image' | 'archive';
  size: number; // in bytes
  modifiedAt: string;
  projectId: string;
}
export interface AnalyticsData {
  projectCompletion: { month: string; completed: number; inProgress: number }[];
  financials: { month: string; revenue: number; expenses: number }[];
  teamCapacity: { name: string; billable: number; nonBillable: number }[];
}
// Freelancer Specific Types
export interface TimeLog {
  id: string;
  projectId: string;
  projectName: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: number; // in seconds
  description: string;
}
export interface Earning {
  id: string;
  date: string;
  projectId: string;
  description: string;
  amount: number;
  status: 'Paid' | 'Pending' | 'Overdue';
}
export interface Application {
  id: string;
  projectId: string;
  projectName: string;
  status: 'Submitted' | 'Viewed' | 'Accepted' | 'Rejected';
  date: string;
}
// Client Specific Types
export interface ClientMessage {
  id: string;
  senderId: string; // Can be a team member ID or 'client'
  senderName: string;
  senderAvatar: string;
  text: string;
  timestamp: string;
  isClient: boolean;
}
export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  type: 'milestone' | 'meeting';
  projectId: string;
}
// Word Assistant Types
export interface WordAssistantTemplate {
  id: string;
  title: string;
  description: string;
  icon: string; // Lucide icon name
}
export interface GeneratedDocument {
  title: string;
  content: string;
  generatedAt: string;
}
// New Types for Phase 5
export interface Notification {
  id: string;
  role: 'admin' | 'freelancer' | 'client';
  type: 'project' | 'payment' | 'message' | 'milestone' | 'alert' | 'info';
  title: string;
  description: string;
  timestamp: string;
  isRead: boolean;
}
export interface HelpArticle {
  id: string;
  category: string;
  question: string;
  answer: string;
}