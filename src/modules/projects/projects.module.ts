import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/core/database/prisma/prisma.module';
import { CreateProjectUseCase } from './application/use-cases/create-project.use-case';
import { DeleteProjectUseCase } from './application/use-cases/delete-project.use-case';
import { FindProjectUseCase } from './application/use-cases/find-project.use-case';
import { ListProjectsUseCase } from './application/use-cases/list-projects.use-case';
import { UpdateProjectUseCase } from './application/use-cases/update-project.use-case';
import { ProjectsController } from './infra/controllers/projects.controller';
import { ProjectsRepository } from './infra/repositories/projects.repository';

@Module({
  imports: [PrismaModule],
  controllers: [ProjectsController],
  providers: [
    CreateProjectUseCase,
    UpdateProjectUseCase,
    DeleteProjectUseCase,
    FindProjectUseCase,
    ListProjectsUseCase,
    ProjectsRepository,
  ],
  exports: [ProjectsRepository],
})
export class ProjectsModule {}
