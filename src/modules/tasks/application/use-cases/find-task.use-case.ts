import { Injectable, NotFoundException } from '@nestjs/common';
import { ProjectsRepository } from 'src/modules/projects/infra/repositories/projects.repository';
import { TasksRepository } from '../../infra/repositories/tasks.repository';

@Injectable()
export class FindTaskUseCase {
  constructor(
    private readonly tasksRepository: TasksRepository,
    private readonly projectsRepository: ProjectsRepository,
  ) {}

  async execute(projectId: string, taskId: string) {
    const projectExists = await this.projectsRepository.existsById(projectId);
    if (!projectExists) {
      throw new NotFoundException('Project not found');
    }

    const task = await this.tasksRepository.findById(projectId, taskId);
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }
}
