import { Test, TestingModule } from '@nestjs/testing';
import { CreateProjectUseCase } from '../../application/use-cases/create-project.use-case';
import { DeleteProjectUseCase } from '../../application/use-cases/delete-project.use-case';
import { FindProjectUseCase } from '../../application/use-cases/find-project.use-case';
import { ListProjectsUseCase } from '../../application/use-cases/list-projects.use-case';
import { UpdateProjectUseCase } from '../../application/use-cases/update-project.use-case';
import { ProjectsController } from './projects.controller';

describe('ProjectsController', () => {
  let controller: ProjectsController;

  const createProjectUseCase = { execute: jest.fn() };
  const updateProjectUseCase = { execute: jest.fn() };
  const deleteProjectUseCase = { execute: jest.fn() };
  const findProjectUseCase = { execute: jest.fn() };
  const listProjectsUseCase = { execute: jest.fn() };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectsController],
      providers: [
        { provide: CreateProjectUseCase, useValue: createProjectUseCase },
        { provide: UpdateProjectUseCase, useValue: updateProjectUseCase },
        { provide: DeleteProjectUseCase, useValue: deleteProjectUseCase },
        { provide: FindProjectUseCase, useValue: findProjectUseCase },
        { provide: ListProjectsUseCase, useValue: listProjectsUseCase },
      ],
    }).compile();

    controller = module.get<ProjectsController>(ProjectsController);
  });

  it('findAll delegates to use case', async () => {
    listProjectsUseCase.execute.mockResolvedValue([]);

    await controller.findAll();

    expect(listProjectsUseCase.execute).toHaveBeenCalledTimes(1);
  });
});
