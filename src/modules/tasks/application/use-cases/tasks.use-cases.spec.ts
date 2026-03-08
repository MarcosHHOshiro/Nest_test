import { NotFoundException } from '@nestjs/common';
import { TaskPriority, TaskStatus } from '@prisma/client';
import { CreateTaskUseCase } from './create-task.use-case';
import { DeleteTaskUseCase } from './delete-task.use-case';
import { FindTaskUseCase } from './find-task.use-case';
import { ListTasksByProjectUseCase } from './list-tasks-by-project.use-case';
import { UpdateTaskUseCase } from './update-task.use-case';

describe('Tasks use cases', () => {
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

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('CreateTaskUseCase: throws when project does not exist', async () => {
    const useCase = new CreateTaskUseCase(taskRepo as any, projectRepo as any);
    projectRepo.existsById.mockResolvedValue(false);

    await expect(useCase.execute(projectId, taskData as any)).rejects.toThrow(
      new NotFoundException('Project not found'),
    );
  });

  it('UpdateTaskUseCase: throws when task does not exist in project', async () => {
    const useCase = new UpdateTaskUseCase(taskRepo as any, projectRepo as any);
    projectRepo.existsById.mockResolvedValue(true);
    taskRepo.taskExists.mockResolvedValue(false);

    await expect(
      useCase.execute(projectId, taskId, taskData as any),
    ).rejects.toThrow(new NotFoundException('Task not found'));
  });

  it('DeleteTaskUseCase: validates project and task before deleting', async () => {
    const useCase = new DeleteTaskUseCase(taskRepo as any, projectRepo as any);
    projectRepo.existsById.mockResolvedValue(true);
    taskRepo.taskExists.mockResolvedValue(true);
    taskRepo.delete.mockResolvedValue(undefined);

    await useCase.execute(projectId, taskId);

    expect(projectRepo.existsById).toHaveBeenCalledWith(projectId);
    expect(taskRepo.taskExists).toHaveBeenCalledWith(projectId, taskId);
    expect(taskRepo.delete).toHaveBeenCalledWith(projectId, taskId);
  });

  it('FindTaskUseCase: throws when repository returns null', async () => {
    const useCase = new FindTaskUseCase(taskRepo as any, projectRepo as any);
    projectRepo.existsById.mockResolvedValue(true);
    taskRepo.findById.mockResolvedValue(null);

    await expect(useCase.execute(projectId, taskId)).rejects.toThrow(
      new NotFoundException('Task not found'),
    );
  });

  it('ListTasksByProjectUseCase: validates project before listing', async () => {
    const useCase = new ListTasksByProjectUseCase(
      taskRepo as any,
      projectRepo as any,
    );
    projectRepo.existsById.mockResolvedValue(true);
    taskRepo.findAllByProjectId.mockResolvedValue([]);

    await useCase.execute(projectId);

    expect(projectRepo.existsById).toHaveBeenCalledWith(projectId);
    expect(taskRepo.findAllByProjectId).toHaveBeenCalledWith(projectId);
  });
});
