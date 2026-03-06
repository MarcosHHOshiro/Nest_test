import { ApiProperty } from '@nestjs/swagger';
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
