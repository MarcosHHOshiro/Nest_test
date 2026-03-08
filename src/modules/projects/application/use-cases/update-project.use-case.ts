import { Injectable, NotFoundException } from '@nestjs/common';
import { ProjectRequestDTO } from '../../dto/projects.dto';
import { ProjectsRepository } from '../../infra/repositories/projects.repository';

@Injectable()
export class UpdateProjectUseCase {
  constructor(private readonly projectsRepository: ProjectsRepository) {}

  async execute(projectId: string, data: ProjectRequestDTO) {
    const projectExists = await this.projectsRepository.existsById(projectId);
    if (!projectExists) {
      throw new NotFoundException('Project not found');
    }

    return this.projectsRepository.update(projectId, data);
  }
}
