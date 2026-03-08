import { NotFoundException } from '@nestjs/common';
import { TaskPriority, TaskStatus } from '@prisma/client';
import { TasksService } from './tasks.service';

describe('TasksService', () => {
  const projectId = 'f44f58ac-bf13-4a58-a89b-024f3f1d2c2d';
  const taskId = 'd6ecef56-66fb-44d9-8d01-3067c7a2ec10';

  const taskData = {
    title: 'Task',
    description: 'Desc',
    status: TaskStatus.TODO,
    priority: TaskPriority.MEDIUM,
  };

  const taskRepo = {
    taskExists: jest.fn(),
    findAllByProjectId: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };
  const projectRepo = {
    existsById: jest.fn(),
  };

  let service: TasksService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new TasksService(taskRepo as any, projectRepo as any);
  });

  it('create: throws when project does not exist', async () => {
    projectRepo.existsById.mockResolvedValue(false);

    await expect(service.create(projectId, taskData as any)).rejects.toThrow(
      new NotFoundException('Project not found'),
    );
  });

  it('update: throws when task does not exist in project', async () => {
    projectRepo.existsById.mockResolvedValue(true);
    taskRepo.taskExists.mockResolvedValue(false);

    await expect(
      service.update(projectId, taskId, taskData as any),
    ).rejects.toThrow(new NotFoundException('Task not found'));
  });

  it('delete: validates project and task before deleting', async () => {
    projectRepo.existsById.mockResolvedValue(true);
    taskRepo.taskExists.mockResolvedValue(true);
    taskRepo.delete.mockResolvedValue(undefined);

    await service.delete(projectId, taskId);

    expect(projectRepo.existsById).toHaveBeenCalledWith(projectId);
    expect(taskRepo.taskExists).toHaveBeenCalledWith(projectId, taskId);
    expect(taskRepo.delete).toHaveBeenCalledWith(projectId, taskId);
  });

  it('findById: throws when repository returns null', async () => {
    projectRepo.existsById.mockResolvedValue(true);
    taskRepo.findById.mockResolvedValue(null);

    await expect(service.findById(projectId, taskId)).rejects.toThrow(
      new NotFoundException('Task not found'),
    );
  });
});
