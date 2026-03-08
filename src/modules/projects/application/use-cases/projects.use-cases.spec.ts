import { NotFoundException } from '@nestjs/common';
import { CreateProjectUseCase } from './create-project.use-case';
import { DeleteProjectUseCase } from './delete-project.use-case';
import { FindProjectUseCase } from './find-project.use-case';
import { ListProjectsUseCase } from './list-projects.use-case';
import { UpdateProjectUseCase } from './update-project.use-case';

describe('Projects use cases', () => {
  const repo = {
    existsById: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('ListProjectsUseCase delegates to repository', async () => {
    const useCase = new ListProjectsUseCase(repo as any);
    const projects = [{ id: '1', name: 'A' }];
    repo.findAll.mockResolvedValue(projects);

    await expect(useCase.execute()).resolves.toEqual(projects);
    expect(repo.findAll).toHaveBeenCalledTimes(1);
  });

  it('CreateProjectUseCase delegates to repository', async () => {
    const useCase = new CreateProjectUseCase(repo as any);
    const payload = { name: 'Project', description: 'Desc' };
    repo.create.mockResolvedValue({ id: '1', ...payload });

    await useCase.execute(payload as any);

    expect(repo.create).toHaveBeenCalledWith(payload);
  });

  it('FindProjectUseCase throws when project does not exist', async () => {
    const useCase = new FindProjectUseCase(repo as any);
    repo.findById.mockResolvedValue(null);

    await expect(useCase.execute('missing-id')).rejects.toThrow(
      new NotFoundException('Project not found'),
    );
  });

  it('UpdateProjectUseCase throws when project does not exist', async () => {
    const useCase = new UpdateProjectUseCase(repo as any);
    repo.existsById.mockResolvedValue(false);

    await expect(
      useCase.execute('missing-id', { name: 'X', description: 'Y' } as any),
    ).rejects.toThrow(new NotFoundException('Project not found'));
  });

  it('DeleteProjectUseCase throws when project does not exist', async () => {
    const useCase = new DeleteProjectUseCase(repo as any);
    repo.existsById.mockResolvedValue(false);

    await expect(useCase.execute('missing-id')).rejects.toThrow(
      new NotFoundException('Project not found'),
    );
  });
});
