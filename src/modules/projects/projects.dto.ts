import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ProjectRequestDTO {
  @ApiProperty({ description: 'The name of the project' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'The description of the project', required: false })
  @IsString()
  description: string;
}
