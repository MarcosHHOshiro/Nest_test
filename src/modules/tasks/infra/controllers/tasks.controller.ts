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
import { ValidateResourcesIds } from 'src/core/common/decorators/validate-resources-ids.decorator';
import { ValidateResourcesIdInterceptor } from 'src/core/common/interceptors/validate-resources-id.interceptor';
import { TaskDTO } from '../../dto/tasks.dto';
import { TasksService } from '../../application/use-cases/tasks.use-case';

@Controller({
  version: '1',
  path: 'projects/:projectId/tasks',
})
@UseInterceptors(ValidateResourcesIdInterceptor)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @ValidateResourcesIds()
  findAllByProjectId(@Param('projectId', ParseUUIDPipe) projectId: string) {
    return this.tasksService.findAllByProjectId(projectId);
  }

  @Post()
  @ValidateResourcesIds()
  create(
    @Param('projectId', ParseUUIDPipe) projectId: string,
    @Body() data: TaskDTO,
  ) {
    return this.tasksService.create(projectId, data);
  }

  @Get(':taskId')
  @ValidateResourcesIds()
  findOne(
    @Param('taskId', ParseUUIDPipe) taskId: string,
    @Param('projectId', ParseUUIDPipe) projectId: string,
  ) {
    return this.tasksService.findById(projectId, taskId);
  }

  @Put(':taskId')
  @ValidateResourcesIds()
  update(
    @Param('taskId', ParseUUIDPipe) taskId: string,
    @Param('projectId', ParseUUIDPipe) projectId: string,
    @Body() data: TaskDTO,
  ) {
    return this.tasksService.update(projectId, taskId, data);
  }

  @Delete(':taskId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ValidateResourcesIds()
  delete(
    @Param('taskId', ParseUUIDPipe) taskId: string,
    @Param('projectId', ParseUUIDPipe) projectId: string,
  ) {
    return this.tasksService.delete(projectId, taskId);
  }
}
