import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/core/database/prisma/prisma.module';
import { ProjectsModule } from '../projects/projects.module';
import { TasksService } from './application/tasks.service';
import { TasksController } from './infra/controllers/tasks.controller';
import { TasksRepository } from './infra/repositories/tasks.repository';

@Module({
  imports: [PrismaModule, ProjectsModule],
  controllers: [TasksController],
  providers: [TasksService, TasksRepository],
})
export class TasksModule {}
