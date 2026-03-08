import { Injectable, NotFoundException } from '@nestjs/common';
import { ProjectsRepository } from 'src/modules/projects/infra/repositories/projects.repository';
import { TasksRepository } from '../../infra/repositories/tasks.repository';

@Injectable()
export class ListTasksByProjectUseCase {
  constructor(
    private readonly tasksRepository: TasksRepository,
    private readonly projectsRepository: ProjectsRepository,
  ) {}

  async execute(projectId: string) {
    const projectExists = await this.projectsRepository.existsById(projectId);
    if (!projectExists) {
      throw new NotFoundException('Project not found');
    }

    return this.tasksRepository.findAllByProjectId(projectId);
  }
}
