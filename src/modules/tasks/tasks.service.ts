import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { TaskDTO } from './tasks.dto';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllByProjectId(projectId: string) {
    return this.prisma.task.findMany({
      where: {
        projectId,
      },
    });
  }

  async findById(projectId: string, id: string) {
    return this.prisma.task.findUnique({
      where: {
        projectId,
        id,
      },
    });
  }

  async create(projectId: string, data: TaskDTO) {
    return this.prisma.task.create({
      data: {
        ...data,
        projectId,
      },
    });
  }

  async update(projectId: string, id: string, data: TaskDTO) {
    return this.prisma.task.update({
      where: {
        projectId,
        id,
      },
      data,
    });
  }

  async delete(projectId: string, id: string) {
    return this.prisma.task.delete({
      where: {
        projectId,
        id,
      },
    });
  }
}
