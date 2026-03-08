import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/core/database/prisma/prisma.module';
import { ProjectsModule } from '../projects/projects.module';
import { CreateTaskUseCase } from './application/use-cases/create-task.use-case';
import { DeleteTaskUseCase } from './application/use-cases/delete-task.use-case';
import { FindTaskUseCase } from './application/use-cases/find-task.use-case';
import { ListTasksByProjectUseCase } from './application/use-cases/list-tasks-by-project.use-case';
import { UpdateTaskUseCase } from './application/use-cases/update-task.use-case';
import { TasksController } from './infra/controllers/tasks.controller';
import { TasksRepository } from './infra/repositories/tasks.repository';

@Module({
  imports: [PrismaModule, ProjectsModule],
  controllers: [TasksController],
  providers: [
    CreateTaskUseCase,
    UpdateTaskUseCase,
    DeleteTaskUseCase,
    FindTaskUseCase,
    ListTasksByProjectUseCase,
    TasksRepository,
  ],
})
export class TasksModule {}
