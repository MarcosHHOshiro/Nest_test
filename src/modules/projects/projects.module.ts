import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/core/database/prisma/prisma.module';
import { ProjectsService } from './application/projects.service';
import { ProjectsController } from './infra/controllers/projects.controller';
import { ProjectsRepository } from './infra/repositories/projects.repository';

@Module({
  imports: [PrismaModule],
  controllers: [ProjectsController],
  providers: [ProjectsService, ProjectsRepository],
  exports: [ProjectsRepository],
})
export class ProjectsModule {}
