import { Injectable } from '@nestjs/common';
import { ProjectRequestDTO } from '../../dto/projects.dto';
import { ProjectsRepository } from '../../infra/repositories/projects.repository';

@Injectable()
export class ProjectsService {
  constructor(private readonly projectsRepository: ProjectsRepository) {}

  findAll() {
    return this.projectsRepository.findAll();
  }

  findById(id: string) {
    return this.projectsRepository.findById(id);
  }

  create(data: ProjectRequestDTO) {
    return this.projectsRepository.create(data);
  }

  update(id: string, data: ProjectRequestDTO) {
    return this.projectsRepository.update(id, data);
  }

  remove(id: string) {
    return this.projectsRepository.remove(id);
  }
}
