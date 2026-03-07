import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/core/database/prisma/prisma.module';
import { TasksService } from './application/use-cases/tasks.use-case';
import { TasksController } from './infra/controllers/tasks.controller';
import { TasksRepository } from './infra/repositories/tasks.repository';

@Module({
  imports: [PrismaModule],
  controllers: [TasksController],
  providers: [TasksService, TasksRepository],
})
export class TasksModule {}
