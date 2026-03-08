import { NotFoundException } from '@nestjs/common';
import { ProjectsService } from './projects.service';

describe('ProjectsService', () => {
  const repo = {
    existsById: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  let service: ProjectsService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new ProjectsService(repo as any);
  });

  it('findAll delegates to repository', async () => {
    const projects = [{ id: '1', name: 'A' }];
    repo.findAll.mockResolvedValue(projects);

    await expect(service.findAll()).resolves.toEqual(projects);
    expect(repo.findAll).toHaveBeenCalledTimes(1);
  });

  it('create delegates to repository', async () => {
    const payload = { name: 'Project', description: 'Desc' };
    repo.create.mockResolvedValue({ id: '1', ...payload });

    await service.create(payload as any);

    expect(repo.create).toHaveBeenCalledWith(payload);
  });

  it('findById throws when project does not exist', async () => {
    repo.findById.mockResolvedValue(null);

    await expect(service.findById('missing-id')).rejects.toThrow(
      new NotFoundException('Project not found'),
    );
  });

  it('update throws when project does not exist', async () => {
    repo.existsById.mockResolvedValue(false);

    await expect(
      service.update('missing-id', { name: 'X', description: 'Y' } as any),
    ).rejects.toThrow(new NotFoundException('Project not found'));
  });

  it('remove throws when project does not exist', async () => {
    repo.existsById.mockResolvedValue(false);

    await expect(service.remove('missing-id')).rejects.toThrow(
      new NotFoundException('Project not found'),
    );
  });
});
