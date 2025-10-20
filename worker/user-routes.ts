import { Hono } from "hono";
import type { Env } from './core-utils';
import { ProjectEntity, TeamMemberEntity, FileObjectEntity, TimeLogEntity, ClientMessageEntity, NotificationEntity } from "./entities";
import { ok, bad, notFound, isStr } from './core-utils';
import { MOCK_ANALYTICS_DATA, MOCK_CLIENTS, MOCK_TEAM_MEMBERS } from "@shared/mock-data";
import { Project, TimeLog, ClientMessage } from "@shared/types";
export function userRoutes(app: Hono<{ Bindings: Env }>) {
  // Seed data on startup
  app.use('*', async (c, next) => {
    await Promise.all([
      ProjectEntity.ensureSeed(c.env),
      TeamMemberEntity.ensureSeed(c.env),
      FileObjectEntity.ensureSeed(c.env),
      TimeLogEntity.ensureSeed(c.env),
      ClientMessageEntity.ensureSeed(c.env),
      NotificationEntity.ensureSeed(c.env),
    ]);
    await next();
  });
  // --- Architex Axis Admin Routes (Live Data) ---
  app.get('/api/projects', async (c) => {
    const { items } = await ProjectEntity.list(c.env);
    return ok(c, items);
  });
  app.post('/api/projects', async (c) => {
    const body = await c.req.json();
    if (!isStr(body.name) || !isStr(body.startDate) || !isStr(body.endDate) || !body.budget || !isStr(body.clientId) || !Array.isArray(body.teamMemberIds)) {
      return bad(c, 'Invalid project data');
    }
    const client = MOCK_CLIENTS.find(client => client.id === body.clientId);
    const team = MOCK_TEAM_MEMBERS.filter(member => body.teamMemberIds.includes(member.id));
    if (!client) {
      return notFound(c, 'Client not found');
    }
    if (team.length !== body.teamMemberIds.length) {
      return notFound(c, 'One or more team members not found');
    }
    const newProject: Project = {
      id: `proj-${crypto.randomUUID().slice(0, 8)}`,
      name: body.name,
      client: client,
      status: 'Planning',
      budget: Number(body.budget),
      startDate: body.startDate,
      endDate: body.endDate,
      team: team,
    };
    await ProjectEntity.create(c.env, newProject);
    return ok(c, newProject);
  });
  app.get('/api/team', async (c) => {
    const { items } = await TeamMemberEntity.list(c.env);
    return ok(c, items);
  });
  app.get('/api/files', async (c) => {
    const { items } = await FileObjectEntity.list(c.env);
    return ok(c, items);
  });
  app.get('/api/analytics', (c) => {
    return ok(c, MOCK_ANALYTICS_DATA);
  });
  app.get('/api/clients', (c) => {
    return ok(c, MOCK_CLIENTS);
  });
  app.get('/api/users', async (c) => {
    const { items } = await TeamMemberEntity.list(c.env);
    return ok(c, items);
  });
  // --- Freelancer Routes ---
  app.get('/api/timelogs', async (c) => {
    const { items } = await TimeLogEntity.list(c.env);
    return ok(c, items);
  });
  app.post('/api/timelogs', async (c) => {
    const body = await c.req.json();
    const newLog: TimeLog = {
      id: `tl-${crypto.randomUUID().slice(0, 8)}`,
      ...body,
    };
    await TimeLogEntity.create(c.env, newLog);
    return ok(c, newLog);
  });
  // --- Client Routes ---
  app.get('/api/messages', async (c) => {
    const { items } = await ClientMessageEntity.list(c.env);
    // sort by timestamp
    items.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
    return ok(c, items);
  });
  app.post('/api/messages', async (c) => {
    const body = await c.req.json();
    const newMessage: ClientMessage = {
      id: `msg-${crypto.randomUUID().slice(0, 8)}`,
      senderId: 'client',
      senderName: 'Alice Johnson',
      senderAvatar: 'https://i.pravatar.cc/150?u=client-1',
      isClient: true,
      timestamp: new Date().toISOString(),
      ...body,
    };
    await ClientMessageEntity.create(c.env, newMessage);
    return ok(c, newMessage);
  });
  // --- AI Word Assistant (Mock) ---
  app.post('/api/admin/word-assistant/generate', async (c) => {
    const { templateId, projectName } = await c.req.json();
    if (!templateId || !projectName) return bad(c, 'Template and project name required');
    // Simulate AI generation delay
    await new Promise(res => setTimeout(res, 1500));
    const content = `This is a mock AI-generated document for the '${projectName}' project, using the '${templateId}' template. The content would be dynamically generated here based on project data and the selected template. For example, a project proposal would include sections like Introduction, Scope of Work, Timeline, and Budget, populated with relevant details.`;
    return ok(c, {
      title: `Generated ${templateId} for ${projectName}`,
      content: content,
      generatedAt: new Date().toISOString(),
    });
  });
  // --- Notifications Route ---
  app.get('/api/notifications', async (c) => {
    const role = c.req.query('role');
    let { items } = await NotificationEntity.list(c.env);
    if (role) {
      items = items.filter(notification => notification.role === role || notification.role === 'all');
    }
    items.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    return ok(c, items);
  });
}