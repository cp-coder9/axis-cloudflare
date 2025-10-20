import '@/lib/errorReporter';
import { enableMapSet } from "immer";
enableMapSet();
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { RouteErrorBoundary } from '@/components/RouteErrorBoundary';
import '@/index.css'
import App from '@/App';
import { HomePage } from '@/pages/HomePage'
import { DashboardLayout } from '@/components/layout/DashboardLayout';
// Admin Imports
import { AdminSidebar } from '@/components/nav/AdminSidebar';
import AdminDashboardPage from '@/pages/admin/DashboardPage';
import AdminProjectsPage from '@/pages/admin/ProjectsPage';
import AdminTeamPage from '@/pages/admin/TeamPage';
import AdminDataLibraryPage from '@/pages/admin/DataLibraryPage';
import AdminAnalyticsPage from '@/pages/admin/AnalyticsPage';
import WordAssistantPage from '@/pages/admin/WordAssistantPage';
import AdminReportsPage from '@/pages/admin/ReportsPage';
import AdminSettingsPage from '@/pages/admin/SettingsPage';
import AdminHelpPage from '@/pages/admin/HelpPage';
import AdminSearchPage from '@/pages/admin/SearchPage';
// Freelancer Imports
import { FreelancerSidebar } from '@/components/nav/FreelancerSidebar';
import FreelancerDashboardPage from '@/pages/freelancer/FreelancerDashboard';
import FreelancerTimerPage from '@/pages/freelancer/TimerPage';
import FreelancerProjectsPage from '@/pages/freelancer/ProjectsPage';
import FreelancerEarningsPage from '@/pages/freelancer/EarningsPage';
import FreelancerApplicationsPage from '@/pages/freelancer/ApplicationsPage';
import FreelancerSettingsPage from '@/pages/freelancer/SettingsPage';
import FreelancerNotificationsPage from '@/pages/freelancer/NotificationsPage';
import FreelancerProfilePage from '@/pages/freelancer/ProfilePage';
// Client Imports
import { ClientSidebar } from '@/components/nav/ClientSidebar';
import ClientDashboardPage from '@/pages/client/ClientDashboard';
import ClientProjectsPage from '@/pages/client/ProjectsPage';
import ClientMessagesPage from '@/pages/client/MessagesPage';
import ClientFilesPage from '@/pages/client/FilesPage';
import ClientCalendarPage from '@/pages/client/CalendarPage';
import ClientNotificationsPage from '@/pages/client/NotificationsPage';
import ClientSettingsPage from '@/pages/client/SettingsPage';
import ClientSupportPage from '@/pages/client/SupportPage';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <RouteErrorBoundary />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "admin",
        element: <DashboardLayout sidebar={<AdminSidebar />} />,
        children: [
          { path: "", element: <Navigate to="dashboard" replace /> },
          { path: "dashboard", element: <AdminDashboardPage /> },
          { path: "projects", element: <AdminProjectsPage /> },
          { path: "team", element: <AdminTeamPage /> },
          { path: "analytics", element: <AdminAnalyticsPage /> },
          { path: "data-library", element: <AdminDataLibraryPage /> },
          { path: "reports", element: <AdminReportsPage /> },
          { path: "word-assistant", element: <WordAssistantPage /> },
          { path: "settings", element: <AdminSettingsPage /> },
          { path: "help", element: <AdminHelpPage /> },
          { path: "search", element: <AdminSearchPage /> },
        ],
      },
      {
        path: "freelancer",
        element: <DashboardLayout sidebar={<FreelancerSidebar />} />,
        children: [
          { path: "", element: <Navigate to="dashboard" replace /> },
          { path: "dashboard", element: <FreelancerDashboardPage /> },
          { path: "timer", element: <FreelancerTimerPage /> },
          { path: "projects", element: <FreelancerProjectsPage /> },
          { path: "earnings", element: <FreelancerEarningsPage /> },
          { path: "applications", element: <FreelancerApplicationsPage /> },
          { path: "settings", element: <FreelancerSettingsPage /> },
          { path: "notifications", element: <FreelancerNotificationsPage /> },
          { path: "profile", element: <FreelancerProfilePage /> },
        ],
      },
      {
        path: "client",
        element: <DashboardLayout sidebar={<ClientSidebar />} />,
        children: [
          { path: "", element: <Navigate to="dashboard" replace /> },
          { path: "dashboard", element: <ClientDashboardPage /> },
          { path: "projects", element: <ClientProjectsPage /> },
          { path: "messages", element: <ClientMessagesPage /> },
          { path: "files", element: <ClientFilesPage /> },
          { path: "calendar", element: <ClientCalendarPage /> },
          { path: "notifications", element: <ClientNotificationsPage /> },
          { path: "settings", element: <ClientSettingsPage /> },
          { path: "support", element: <ClientSupportPage /> },
        ],
      },
    ],
  },
]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </StrictMode>,
)