import { Injectable, NotFoundException } from '@nestjs/common';
import { ProjectsRepository } from 'src/modules/projects/infra/repositories/projects.repository';
import { TaskDTO } from '../dto/tasks.dto';
import { TasksRepository } from '../infra/repositories/tasks.repository';

@Injectable()
export class TasksService {
  constructor(
    private readonly tasksRepository: TasksRepository,
    private readonly projectsRepository: ProjectsRepository,
  ) {}

  async findAllByProjectId(projectId: string) {
    await this.ensureProjectExists(projectId);

    return this.tasksRepository.findAllByProjectId(projectId);
  }

  async findById(projectId: string, id: string) {
    await this.ensureProjectExists(projectId);

    const task = await this.tasksRepository.findById(projectId, id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }

  async create(projectId: string, data: TaskDTO) {
    await this.ensureProjectExists(projectId);

    return this.tasksRepository.create(projectId, data);
  }

  async update(projectId: string, id: string, data: TaskDTO) {
    await this.ensureProjectExists(projectId);
    await this.ensureTaskExists(projectId, id);

    return this.tasksRepository.update(projectId, id, data);
  }

  async delete(projectId: string, id: string) {
    await this.ensureProjectExists(projectId);
    await this.ensureTaskExists(projectId, id);

    return this.tasksRepository.delete(projectId, id);
  }

  private async ensureProjectExists(projectId: string) {
    const projectExists = await this.projectsRepository.existsById(projectId);
    if (!projectExists) {
      throw new NotFoundException('Project not found');
    }
  }

  private async ensureTaskExists(projectId: string, id: string) {
    const taskExists = await this.tasksRepository.taskExists(projectId, id);
    if (!taskExists) {
      throw new NotFoundException('Task not found');
    }
  }
}
