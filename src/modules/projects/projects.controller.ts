import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { ProjectListItemDTO, ProjectRequestDTO } from './projects.dto';
import { ProjectsService } from './projects.service';

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

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const project = await this.projectsService.findById(id);
    if (!project) {
      throw new HttpException('Project not found', HttpStatus.NOT_FOUND);
    }
    return project;
  }

  @Post()
  @ApiResponse({
    type: [ProjectListItemDTO],
  })
  create(@Body() data: ProjectRequestDTO) {
    return this.projectsService.create(data);
  }

  @Put(':id')
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() data: ProjectRequestDTO) {
    const project = await this.projectsService.findById(id);
    if (!project) {
      throw new HttpException('Project not found', HttpStatus.NOT_FOUND);
    }
    return this.projectsService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    const project = await this.projectsService.findById(id);
    if (!project) {
      throw new HttpException('Project not found', HttpStatus.NOT_FOUND);
    }
    return this.projectsService.remove(id);
  }
}
