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
import { ProjectsService } from '../../application/projects.service';
import { ProjectListItemDTO, ProjectRequestDTO } from '../../dto/projects.dto';

@Controller({
  version: '1',
  path: 'projects',
})
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
  async update(
    @Param('projectId', ParseUUIDPipe) projectId: string,
    @Body() data: ProjectRequestDTO,
  ) {
    return this.projectsService.update(projectId, data);
  }

  @Delete(':projectId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('projectId', ParseUUIDPipe) projectId: string) {
    return this.projectsService.remove(projectId);
  }
}
