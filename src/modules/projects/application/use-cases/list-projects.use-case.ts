import { Injectable } from '@nestjs/common';
import { ProjectsRepository } from '../../infra/repositories/projects.repository';

@Injectable()
export class ListProjectsUseCase {
  constructor(private readonly projectsRepository: ProjectsRepository) {}

  execute() {
    return this.projectsRepository.findAll();
  }
}
