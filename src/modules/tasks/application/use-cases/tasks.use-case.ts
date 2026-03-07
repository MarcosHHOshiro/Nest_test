import { Injectable } from '@nestjs/common';
import { TaskDTO } from '../../dto/tasks.dto';
import { TasksRepository } from '../../infra/repositories/tasks.repository';

@Injectable()
export class TasksService {
  constructor(private readonly tasksRepository: TasksRepository) {}

  findAllByProjectId(projectId: string) {
    return this.tasksRepository.findAllByProjectId(projectId);
  }

  findById(projectId: string, id: string) {
    return this.tasksRepository.findById(projectId, id);
  }

  create(projectId: string, data: TaskDTO) {
    return this.tasksRepository.create(projectId, data);
  }

  update(projectId: string, id: string, data: TaskDTO) {
    return this.tasksRepository.update(projectId, id, data);
  }

  delete(projectId: string, id: string) {
    return this.tasksRepository.delete(projectId, id);
  }
}
