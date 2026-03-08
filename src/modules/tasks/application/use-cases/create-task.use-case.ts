import { Injectable, NotFoundException } from '@nestjs/common';
import { ProjectsRepository } from 'src/modules/projects/infra/repositories/projects.repository';
import { TaskDTO } from '../../dto/tasks.dto';
import { TasksRepository } from '../../infra/repositories/tasks.repository';

@Injectable()
export class CreateTaskUseCase {
  constructor(
    private readonly tasksRepository: TasksRepository,
    private readonly projectsRepository: ProjectsRepository,
  ) {}

  async execute(projectId: string, data: TaskDTO) {
    const projectExists = await this.projectsRepository.existsById(projectId);
    if (!projectExists) {
      throw new NotFoundException('Project not found');
    }

    return this.tasksRepository.create(projectId, data);
  }
}
