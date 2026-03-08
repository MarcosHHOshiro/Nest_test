import { Injectable, NotFoundException } from '@nestjs/common';
import { ProjectsRepository } from '../../infra/repositories/projects.repository';

@Injectable()
export class DeleteProjectUseCase {
  constructor(private readonly projectsRepository: ProjectsRepository) {}

  async execute(projectId: string) {
    const projectExists = await this.projectsRepository.existsById(projectId);
    if (!projectExists) {
      throw new NotFoundException('Project not found');
    }

    return this.projectsRepository.remove(projectId);
  }
}
