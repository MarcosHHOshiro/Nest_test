import { TaskPriority, TaskStatus } from '@prisma/client';

export interface TaskEntity {
  id: string;
  projectId: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
