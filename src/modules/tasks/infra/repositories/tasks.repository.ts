import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma/prisma.service';
import { TaskDTO } from '../../dto/tasks.dto';

@Injectable()
export class TasksRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAllByProjectId(projectId: string) {
    return this.prisma.task.findMany({
      where: {
        projectId,
      },
    });
  }

  findById(projectId: string, id: string) {
    return this.prisma.task.findUnique({
      where: {
        projectId,
        id,
      },
    });
  }

  create(projectId: string, data: TaskDTO) {
    return this.prisma.task.create({
      data: {
        ...data,
        projectId,
      },
    });
  }

  update(projectId: string, id: string, data: TaskDTO) {
    return this.prisma.task.update({
      where: {
        projectId,
        id,
      },
      data,
    });
  }

  delete(projectId: string, id: string) {
    return this.prisma.task.delete({
      where: {
        projectId,
        id,
      },
    });
  }
}
