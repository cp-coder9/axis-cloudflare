/**
 * Minimal real-world demo: One Durable Object instance per entity (User, ChatBoard), with Indexes for listing.
 */
import { IndexedEntity } from "./core-utils";
import type { User, Chat, ChatMessage, Project, TeamMember, FileObject, TimeLog, ClientMessage, Notification, Client } from "@shared/types";
import { MOCK_CHAT_MESSAGES, MOCK_CHATS, MOCK_USERS, MOCK_PROJECTS, MOCK_TEAM_MEMBERS, MOCK_FILES, MOCK_TIME_LOGS, MOCK_MESSAGES, MOCK_NOTIFICATIONS, MOCK_CLIENTS } from "@shared/mock-data";
// USER ENTITY: one DO instance per user
export class UserEntity extends IndexedEntity<User> {
  static readonly entityName = "user";
  static readonly indexName = "users";
  static readonly initialState: User = { id: "", name: "" };
  static seedData = MOCK_USERS;
}
// CHAT BOARD ENTITY: one DO instance per chat board, stores its own messages
export type ChatBoardState = Chat & { messages: ChatMessage[] };
const SEED_CHAT_BOARDS: ChatBoardState[] = MOCK_CHATS.map(c => ({
  ...c,
  messages: MOCK_CHAT_MESSAGES.filter(m => m.chatId === c.id),
}));
export class ChatBoardEntity extends IndexedEntity<ChatBoardState> {
  static readonly entityName = "chat";
  static readonly indexName = "chats";
  static readonly initialState: ChatBoardState = { id: "", title: "", messages: [] };
  static seedData = SEED_CHAT_BOARDS;
  async listMessages(): Promise<ChatMessage[]> {
    const { messages } = await this.getState();
    return messages;
  }
  async sendMessage(userId: string, text: string): Promise<ChatMessage> {
    const msg: ChatMessage = { id: crypto.randomUUID(), chatId: this.id, userId, text, ts: Date.now() };
    await this.mutate(s => ({ ...s, messages: [...s.messages, msg] }));
    return msg;
  }
}
// Architex Axis Entities
export class ProjectEntity extends IndexedEntity<Project> {
  static readonly entityName = "project";
  static readonly indexName = "projects";
  static readonly initialState: Project = {} as Project; // A bit of a hack for complex objects
  static seedData = MOCK_PROJECTS;
}
export class TeamMemberEntity extends IndexedEntity<TeamMember> {
  static readonly entityName = "teamMember";
  static readonly indexName = "teamMembers";
  static readonly initialState: TeamMember = {} as TeamMember;
  static seedData = MOCK_TEAM_MEMBERS;
}
export class ClientEntity extends IndexedEntity<Client> {
  static readonly entityName = "client";
  static readonly indexName = "clients";
  static readonly initialState: Client = {} as Client;
  static seedData = MOCK_CLIENTS;
}
export class FileObjectEntity extends IndexedEntity<FileObject> {
  static readonly entityName = "fileObject";
  static readonly indexName = "fileObjects";
  static readonly initialState: FileObject = {} as FileObject;
  static seedData = MOCK_FILES;
}
export class TimeLogEntity extends IndexedEntity<TimeLog> {
  static readonly entityName = "timeLog";
  static readonly indexName = "timeLogs";
  static readonly initialState: TimeLog = {} as TimeLog;
  static seedData = MOCK_TIME_LOGS;
}
export class ClientMessageEntity extends IndexedEntity<ClientMessage> {
  static readonly entityName = "clientMessage";
  static readonly indexName = "clientMessages";
  static readonly initialState: ClientMessage = {} as ClientMessage;
  static seedData = MOCK_MESSAGES;
}
export class NotificationEntity extends IndexedEntity<Notification> {
  static readonly entityName = "notification";
  static readonly indexName = "notifications";
  static readonly initialState: Notification = {} as Notification;
  static seedData = MOCK_NOTIFICATIONS;
}