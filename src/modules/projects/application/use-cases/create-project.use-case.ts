import { Injectable } from '@nestjs/common';
import { ProjectRequestDTO } from '../../dto/projects.dto';
import { ProjectsRepository } from '../../infra/repositories/projects.repository';

@Injectable()
export class CreateProjectUseCase {
  constructor(private readonly projectsRepository: ProjectsRepository) {}

  execute(data: ProjectRequestDTO) {
    return this.projectsRepository.create(data);
  }
}
