import { Injectable, NotFoundException } from '@nestjs/common';
import { ProjectRequestDTO } from '../dto/projects.dto';
import { ProjectsRepository } from '../infra/repositories/projects.repository';

@Injectable()
export class ProjectsService {
  constructor(private readonly projectsRepository: ProjectsRepository) {}

  findAll() {
    return this.projectsRepository.findAll();
  }

  async findById(id: string) {
    const project = await this.projectsRepository.findById(id);
    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return project;
  }

  create(data: ProjectRequestDTO) {
    return this.projectsRepository.create(data);
  }

  async update(id: string, data: ProjectRequestDTO) {
    await this.ensureExists(id);

    return this.projectsRepository.update(id, data);
  }

  async remove(id: string) {
    await this.ensureExists(id);

    return this.projectsRepository.remove(id);
  }

  private async ensureExists(id: string) {
    const projectExists = await this.projectsRepository.existsById(id);
    if (!projectExists) {
      throw new NotFoundException('Project not found');
    }
  }
}
