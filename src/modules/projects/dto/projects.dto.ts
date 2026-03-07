import { ApiProperty } from '@nestjs/swagger';
import { TaskPriority, TaskStatus } from '@prisma/client';
import { IsString } from 'class-validator';

export class ProjectRequestDTO {
  @ApiProperty({ description: 'The name of the project' })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The description of the project',
    required: false,
  })
  @IsString()
  description: string;
}

export class ProjectListItemDTO {
  @ApiProperty({ description: 'The unique identifier of the project' })
  id: string;
  @ApiProperty({ description: 'The name of the project' })
  name: string;
  @ApiProperty({
    description: 'The description of the project',
    required: false,
  })
  description: string;
  @ApiProperty({
    description: 'The date and time when the project was created',
  })
  createdAt: Date;
  @ApiProperty({
    description: 'The date and time when the project was last updated',
  })
  updatedAt: Date;
}

export class ProjectTaskDTO {
  @ApiProperty() id: string;
  @ApiProperty() title: string;
  @ApiProperty({ nullable: true, required: false }) description: string;
  @ApiProperty({ enum: TaskStatus, default: TaskStatus.TODO })
  status: string;
  @ApiProperty({ enum: TaskPriority, default: TaskPriority.MEDIUM })
  priority: string;
  @ApiProperty({ nullable: true, required: false, format: 'date-time' })
  dueDate: Date;
  @ApiProperty({ format: 'date-time' }) createdAt: Date;
  @ApiProperty({ format: 'date-time' }) updatedAt: Date;
}

export class ProjectFullDTO extends ProjectListItemDTO {
  @ApiProperty({ type: () => [ProjectTaskDTO] })
  tasks: ProjectTaskDTO[];
}
