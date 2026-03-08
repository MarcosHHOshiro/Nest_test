import { Injectable, NotFoundException } from '@nestjs/common';
import { ProjectsRepository } from '../../infra/repositories/projects.repository';

@Injectable()
export class FindProjectUseCase {
  constructor(private readonly projectsRepository: ProjectsRepository) {}

  async execute(projectId: string) {
    const project = await this.projectsRepository.findById(projectId);
    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return project;
  }
}
