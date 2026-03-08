import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from '../../application/tasks.service';
import { TasksController } from './tasks.controller';

describe('TasksController', () => {
  let controller: TasksController;

  const service = {
    findAllByProjectId: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [{ provide: TasksService, useValue: service }],
    }).compile();

    controller = module.get<TasksController>(TasksController);
  });

  it('create delegates to service', async () => {
    const data = { title: 'Task', description: 'Desc' };
    service.create.mockResolvedValue({ id: '1', ...data });

    await controller.create('project-id', data as any);

    expect(service.create).toHaveBeenCalledWith('project-id', data);
  });
});
