import { Test, TestingModule } from '@nestjs/testing';
import { CreateTaskUseCase } from '../../application/use-cases/create-task.use-case';
import { DeleteTaskUseCase } from '../../application/use-cases/delete-task.use-case';
import { FindTaskUseCase } from '../../application/use-cases/find-task.use-case';
import { ListTasksByProjectUseCase } from '../../application/use-cases/list-tasks-by-project.use-case';
import { UpdateTaskUseCase } from '../../application/use-cases/update-task.use-case';
import { TasksController } from './tasks.controller';

describe('TasksController', () => {
  let controller: TasksController;

  const createTaskUseCase = { execute: jest.fn() };
  const updateTaskUseCase = { execute: jest.fn() };
  const deleteTaskUseCase = { execute: jest.fn() };
  const findTaskUseCase = { execute: jest.fn() };
  const listTasksByProjectUseCase = { execute: jest.fn() };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        { provide: CreateTaskUseCase, useValue: createTaskUseCase },
        { provide: UpdateTaskUseCase, useValue: updateTaskUseCase },
        { provide: DeleteTaskUseCase, useValue: deleteTaskUseCase },
        { provide: FindTaskUseCase, useValue: findTaskUseCase },
        {
          provide: ListTasksByProjectUseCase,
          useValue: listTasksByProjectUseCase,
        },
      ],
    }).compile();

    controller = module.get<TasksController>(TasksController);
  });

  it('create delegates to use case', async () => {
    const data = { title: 'Task', description: 'Desc' };
    createTaskUseCase.execute.mockResolvedValue({ id: '1', ...data });

    await controller.create('project-id', data as any);

    expect(createTaskUseCase.execute).toHaveBeenCalledWith('project-id', data);
  });
});
