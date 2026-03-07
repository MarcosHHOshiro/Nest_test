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
  UseInterceptors,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { ValidateResourcesIds } from 'src/core/common/decorators/validate-resources-ids.decorator';
import { ValidateResourcesIdInterceptor } from 'src/core/common/interceptors/validate-resources-id.interceptor';
import {
  ProjectListItemDTO,
  ProjectRequestDTO,
} from '../../dto/projects.dto';
import { ProjectsService } from '../../application/use-cases/projects.use-case';

@Controller({
  version: '1',
  path: 'projects',
})
@UseInterceptors(ValidateResourcesIdInterceptor)
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  @ApiResponse({
    type: [ProjectListItemDTO],
  })
  findAll() {
    return this.projectsService.findAll();
  }

  @Get(':projectId')
  @ApiResponse({
    type: ProjectListItemDTO,
  })
  @ValidateResourcesIds()
  async findOne(@Param('projectId', ParseUUIDPipe) projectId: string) {
    const project = await this.projectsService.findById(projectId);

    return project;
  }

  @Post()
  @ApiResponse({
    type: [ProjectListItemDTO],
  })
  create(@Body() data: ProjectRequestDTO) {
    return this.projectsService.create(data);
  }

  @Put(':projectId')
  @ValidateResourcesIds()
  async update(
    @Param('projectId', ParseUUIDPipe) projectId: string,
    @Body() data: ProjectRequestDTO,
  ) {
    return this.projectsService.update(projectId, data);
  }

  @Delete(':projectId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ValidateResourcesIds()
  async remove(@Param('projectId', ParseUUIDPipe) projectId: string) {
    return this.projectsService.remove(projectId);
  }
}
