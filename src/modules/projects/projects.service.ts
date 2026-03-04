import { Injectable } from '@nestjs/common';
import { ProjectRequestDTO } from './projects.dto';

@Injectable()
export class ProjectsService {
  findAll() {
    return ['test 1', 'test 2'];
  }

  findById(id: string) {
    return `Project ${id}`;
  }

  create(data: ProjectRequestDTO) {
    return data;
  }

  update(id: string, data: ProjectRequestDTO) {}

  remove(id: string) {}
}
