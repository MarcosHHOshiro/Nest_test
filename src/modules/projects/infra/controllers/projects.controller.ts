import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { CreateProjectUseCase } from '../../application/use-cases/create-project.use-case';
import { DeleteProjectUseCase } from '../../application/use-cases/delete-project.use-case';
import { FindProjectUseCase } from '../../application/use-cases/find-project.use-case';
import { ListProjectsUseCase } from '../../application/use-cases/list-projects.use-case';
import { UpdateProjectUseCase } from '../../application/use-cases/update-project.use-case';
import { ProjectListItemDTO, ProjectRequestDTO } from '../../dto/projects.dto';

@Controller({
  version: '1',
  path: 'projects',
})
export class ProjectsController {
  constructor(
    private readonly createProjectUseCase: CreateProjectUseCase,
    private readonly updateProjectUseCase: UpdateProjectUseCase,
    private readonly deleteProjectUseCase: DeleteProjectUseCase,
    private readonly findProjectUseCase: FindProjectUseCase,
    private readonly listProjectsUseCase: ListProjectsUseCase,
  ) {}

  @Get()
  @ApiResponse({
    type: [ProjectListItemDTO],
  })
  findAll() {
    return this.listProjectsUseCase.execute();
  }

  @Get(':projectId')
  @ApiResponse({
    type: ProjectListItemDTO,
  })
  findOne(@Param('projectId', ParseUUIDPipe) projectId: string) {
    return this.findProjectUseCase.execute(projectId);
  }

  @Post()
  @ApiResponse({
    type: [ProjectListItemDTO],
  })
  create(@Body() data: ProjectRequestDTO) {
    return this.createProjectUseCase.execute(data);
  }

  @Put(':projectId')
  update(
    @Param('projectId', ParseUUIDPipe) projectId: string,
    @Body() data: ProjectRequestDTO,
  ) {
    return this.updateProjectUseCase.execute(projectId, data);
  }

  @Delete(':projectId')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('projectId', ParseUUIDPipe) projectId: string) {
    return this.deleteProjectUseCase.execute(projectId);
  }
}
