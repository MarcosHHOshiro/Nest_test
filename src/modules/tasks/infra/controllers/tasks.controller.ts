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
import { CreateTaskUseCase } from '../../application/use-cases/create-task.use-case';
import { DeleteTaskUseCase } from '../../application/use-cases/delete-task.use-case';
import { FindTaskUseCase } from '../../application/use-cases/find-task.use-case';
import { ListTasksByProjectUseCase } from '../../application/use-cases/list-tasks-by-project.use-case';
import { UpdateTaskUseCase } from '../../application/use-cases/update-task.use-case';
import { TaskDTO } from '../../dto/tasks.dto';

@Controller({
  version: '1',
  path: 'projects/:projectId/tasks',
})
export class TasksController {
  constructor(
    private readonly createTaskUseCase: CreateTaskUseCase,
    private readonly updateTaskUseCase: UpdateTaskUseCase,
    private readonly deleteTaskUseCase: DeleteTaskUseCase,
    private readonly findTaskUseCase: FindTaskUseCase,
    private readonly listTasksByProjectUseCase: ListTasksByProjectUseCase,
  ) {}

  @Get()
  findAllByProjectId(@Param('projectId', ParseUUIDPipe) projectId: string) {
    return this.listTasksByProjectUseCase.execute(projectId);
  }

  @Post()
  create(
    @Param('projectId', ParseUUIDPipe) projectId: string,
    @Body() data: TaskDTO,
  ) {
    return this.createTaskUseCase.execute(projectId, data);
  }

  @Get(':taskId')
  findOne(
    @Param('taskId', ParseUUIDPipe) taskId: string,
    @Param('projectId', ParseUUIDPipe) projectId: string,
  ) {
    return this.findTaskUseCase.execute(projectId, taskId);
  }

  @Put(':taskId')
  update(
    @Param('taskId', ParseUUIDPipe) taskId: string,
    @Param('projectId', ParseUUIDPipe) projectId: string,
    @Body() data: TaskDTO,
  ) {
    return this.updateTaskUseCase.execute(projectId, taskId, data);
  }

  @Delete(':taskId')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(
    @Param('taskId', ParseUUIDPipe) taskId: string,
    @Param('projectId', ParseUUIDPipe) projectId: string,
  ) {
    return this.deleteTaskUseCase.execute(projectId, taskId);
  }
}
